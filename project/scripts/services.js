const servicesURL = 'https://somewhat-armoured-shrimp.github.io/wdd231/project/data/cards.json';
const contactCardsBox = document.querySelector('#contact-cards');

async function getServices() {
    try {
        const response = await fetch(servicesURL);
        if (response.ok) {
            const data = await response.json();
            displayDynamicCards(data.services);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displayDynamicCards = (services) => {
    services.forEach(service => {
        const card = document.createElement('div');
        const nameImg = document.createElement('div');
        const contactInfo = document.createElement('div');

        const name = document.createElement('h2');
        const image = document.createElement('img');

        name.textContent = service.name;
        // MAKE SURE EVERYONE HAS A CORRECT AND EXISTING PHOTO
        image.setAttribute('src', `${service.photo}`);
        image.setAttribute('alt', `${service.name}`);
        image.setAttribute('width', '419');
        image.setAttribute('height', '252');
        image.setAttribute('loading', 'lazy');

        const address = document.createElement('address');
        const phone = document.createElement('p');
        const email = document.createElement('p');

        address.textContent = service.address;
        phone.textContent = service.phone;
        email.textContent = service.email;

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

        contactCardsBox.appendChild(card);
    });
}

getServices();