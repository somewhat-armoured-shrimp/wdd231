const placesURL = 'https://somewhat-armoured-shrimp.github.io/wdd231/project/data/cards.json';
const placesBox = document.querySelector('#places-box');

async function getPlaces() {
    try {
        const response = await fetch(placesURL);
        if (response.ok) {
            const data = await response.json();
            displayCards(data.places);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displayCards = (places) => {
    places.forEach(place => {
        const card = document.createElement('div');
        const nameImg = document.createElement('div');
        const contactInfo = document.createElement('div');

        const name = document.createElement('h2');
        const image = document.createElement('img');

        name.textContent = place.name;
        // MAKE SURE EVERYONE HAS A CORRECT AND EXISTING PHOTO
        image.setAttribute('src', `${place.photo}`);
        image.setAttribute('alt', `${place.name}`);
        image.setAttribute('width', '419');
        image.setAttribute('height', '252');
        image.setAttribute('loading', 'lazy');

        const address = document.createElement('address');
        const phone = document.createElement('p');
        const email = document.createElement('p');

        address.textContent = place.address;
        phone.textContent = place.phone;
        email.textContent = place.email;

        card.classList.add('contact-card');
        nameImg.classList.add('name-img');
        contactInfo.classList.add('contact-info');

        nameImg.appendChild(name);
        nameImg.appendChild(image);

        contactInfo.appendChild(address);
        contactInfo.appendChild(phone);
        contactInfo.appendChild(email);

        card.appendChild(nameImg);
        card.appendChild(contactInfo);

        placesBox.appendChild(card);
    });
}

getPlaces();