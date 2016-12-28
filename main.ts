import { Observable } from 'rxjs';

let output = document.getElementById("output"),
	button = document.getElementById("button");
let click = Observable.fromEvent(button, "click")

function load(url: string) {
	return Observable.create(observer => {
		let xhr = new XMLHttpRequest();

		xhr.addEventListener("load", () => {
			let data = JSON.parse(xhr.responseText);
			observer.next(data);
			observer.complete();
		})

		xhr.open("GET", url);
		xhr.send();
	})
}

function renderMovies(movies) {
	movies.forEach((movie) => {
		let div = document.createElement("div");
		div.innerText = movie.title;
		output.appendChild(div);
	})
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