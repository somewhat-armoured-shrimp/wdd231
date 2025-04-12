import { prompts } from '../data/prompts.mjs';
import { articleData } from '../data/prompts.mjs';

/*
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCMQgHKlsLWRWgUBYz5-Ig-QdnS36HAr3Q" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
	"contents": [
	  {
		"parts": [
		  {
			"text": "Explain how AI works in a few words"
		  }
		]
	  }
	]
  }'   
*/

const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCMQgHKlsLWRWgUBYz5-Ig-QdnS36HAr3Q";

async function aiFetch(prompt) {
	try {
		// time to uhhhh frick around idk
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"contents": [
					{
						"parts": [
							{
								"text": prompt
							}
						]
					}
				]
			})
		});

		if (response.ok) {
			const data = await response.json();
			return data.candidates[0].content.parts[0].text;
		} else {
			console.error(await response.text());
		}
	} catch (error) {
		console.error(error);
	}
	return 'This is not working dawg';
}

const newsCards = document.querySelector('#news-cards');
const article = document.querySelector('#article');
const newsCardAnchor = document.querySelectorAll('.news-card a');



const signupModal = document.querySelector('#signup-box');
const closeButton = document.querySelector('#close-button');

async function displayArticle(articleNum) {
	newsCards.style.display = 'none';
	document.querySelector('#news-h1').style.display = 'none';

	const disclaimer = document.querySelector('#article-p');
	disclaimer.innerHTML = `<em>(Note: These stories are AI generated <strong>upon loading</strong>. Any formatting problems or random markdown spots are not my fault. I tried to mitigate them, I'm sorry.)</em>`;

	const response = await aiFetch(prompts[articleNum]);
	article.innerHTML = `<h2>${articleData[articleNum]}</h2>${response}`;
}

// make sure window.location.search is NOT an empty string, otherwise you'll
// always be 'logged in'.
if (window.location.search !== '') {
	const yourEmail = new URLSearchParams(window.location.search);
	const emailString = yourEmail.toString();

	localStorage.setItem('signedIn', emailString);
}

newsCardAnchor.forEach(anchor => {
	anchor.addEventListener('click', (event) => {
		if (localStorage.getItem('signedIn') !== null) {
			const id = event.currentTarget.id;
			// currentTarget and target have very important 
			// distictions holy moly
			displayArticle(Number(id));
		} else {
			signupModal.showModal();
		}
	});
	closeButton.addEventListener('click', () => {
		signupModal.close();
	});
});

