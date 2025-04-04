import { places } from "../data/places.mjs";

const banner = document.querySelector('.page-visits');
const xButton = document.querySelector('#x-button');

xButton.addEventListener('click', () => {
    banner.classList.add('closed');
});

const visits = document.querySelector('#visits');
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

// rggGRGRGRAAAAAAAAAAHHHHHHHHHHHHH is it works??? I DON'T KNOW :3

// testers that I hope are equivalent 😀
// const theDateToday = new Date();
// const currentDate = new Date(Date.UTC(theDateToday.getFullYear(), 3, 4));
// console.log(currentDate);

// // new date
const currentDate = new Date();

// set the key-value stuff
localStorage.setItem("lastVisit", currentDate);
// get value from key and store it in variable
const storedDate = localStorage.getItem("lastVisit");

// if storedDate is true or exists or whatever
if (storedDate) {
    // lastVisit is stored string date but now it's a real date 
    const lastVisit = new Date(storedDate);
    // initialise another new date because timeDifference ghosts currentDate because it's useless now
    const todaysDate = new Date();

    // subtract to find the time difference because milliseconds and that's how you do differences
    const timeDifference = todaysDate - lastVisit;
    // then turn the time into days by dividing timeDifference by the number of 
    // milliseconds there are in a day (1000*60*60*24) and round it to the nearest 1
    const daysDifference = Math.round(timeDifference / 86400000);

    // self explanatory
    if (daysDifference === 1) {
        visits.textContent = `You last visited ${daysDifference} day ago.`;
    } else if (daysDifference < 1) {
        if (numVisits == 0) {
            visits.textContent = `Welcome! Let us know if you have any questions.`;
        } else {
            visits.textContent = `Back so soon? lol`;
        }
    }
    
    else {
        visits.textContent = `You last visited ${daysDifference} days ago.`;
    }

}

// gotta make sure your new visit is the last visit
localStorage.setItem("lastVisit", new Date());

numVisits++;
localStorage.setItem("numVisits-ls", numVisits);


const allCards = document.querySelector('.figures');

places.forEach(place => {
    const card = document.createElement('div');
    const figure = document.createElement('figure');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    const description = document.createElement('p');
    const address = document.createElement('address');
    const learnMore = document.createElement('button');

    name.textContent = `${place.name}`;

    image.setAttribute('src', `${place.photoURL}`);
    image.setAttribute('alt', `photo of ${place.name}`);
    image.setAttribute('width', '300');
    image.setAttribute('height', '200');
    image.setAttribute('loading', 'lazy');

    description.textContent = `${place.description}`;
    address.textContent = `${place.address}`;
    learnMore.textContent = `Learn More`;

    figure.appendChild(image);
    figure.appendChild(name);
    figure.appendChild(address);
    figure.appendChild(learnMore);
    figure.appendChild(description);

    card.appendChild(figure);
    allCards.appendChild(card);
});
