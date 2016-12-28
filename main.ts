import { Observable } from 'rxjs';

let output = document.getElementById("output"),
	button = document.getElementById("button");
let click = Observable.fromEvent(button, "click")

function load(url: string) {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener("load", () => {
		console.log('xhr.responseText', xhr.responseText)
		let movies = JSON.parse(xhr.responseText);

		movies.forEach((movie) => {
			let div = document.createElement("div");
			div.innerText = movie.title;
			output.appendChild(div);
		})
	})

	xhr.open("GET", url);
	xhr.send();
}


click.subscribe(
	e => load("movies.json"),
	(e) => {
		console.log(`error: ${e}`);
	},
	() => {
		console.log('complete');
	}
);