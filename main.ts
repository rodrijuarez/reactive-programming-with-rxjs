import { Observable } from 'rxjs';

let output = document.getElementById("output"),
	button = document.getElementById("button");
let click = Observable.fromEvent(button, "click")

function load(url: string) {
	return Observable
		.defer(() => {
			return Observable
				.fromPromise(fetch(url).then(r => r.json()))
				.retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
		});
}

function renderMovies(movies) {
	movies.forEach((movie) => {
		let div = document.createElement("div");
		div.innerText = movie.title;
		output.appendChild(div);
	})
}

function retryStrategy({attempts = 4, delay = 1000}) {
	return function(errors: Observable<any>) {
		return errors
			.scan((acc, value) => {
				return acc + 1;
			}, 0)
			.takeWhile(acc => acc < attempts)
			.delay(delay);
	}
}


click.flatMap(e => load("movies.json"))
	.subscribe(renderMovies,
	(e) => {
		console.log(`error: ${e}`);
	},
	() => {
		console.log('complete');
	}
	);