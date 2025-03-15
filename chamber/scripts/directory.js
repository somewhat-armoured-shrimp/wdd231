const membersURL = 'https://somewhat-armoured-shrimp.github.io/wdd231/chamber/data/members.json';
const cardsGrid = document.querySelector('.cards');

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displayMemberCards(data.companies);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displayMemberCards = (companies) => {
    companies.forEach((company) => {
        const card = document.createElement('section');
        const companyName = document.createElement('h2');
        const companyLogo = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const membershipLevel = document.createElement('p');
        const siteLink = document.createElement('a');

        companyName.textContent = `${company.name}`;
        companyLogo.textContent = `${company.icon}`;
        membershipLevel.textContent = `${company.membershipLevel}`;
        address.textContent = `${company.address}`;
        phone.textContent = `${company.phone}`;
        siteLink.textContent = `${company.siteURL}`;

        card.classList.add('member-card');

        companyLogo.setAttribute('src', `${company.icon}`);
        companyLogo.setAttribute('alt', `${company.companyName} Logo`);
        companyLogo.setAttribute('width', '240');
        companyLogo.setAttribute('height', '120');
        siteLink.setAttribute('href', `${company.siteURL}`);

        card.appendChild(companyName);
        card.appendChild(companyLogo);
        card.appendChild(address);
        card.appendChild(membershipLevel);
        card.appendChild(phone);
        card.appendChild(siteLink);

        cardsGrid.appendChild(card);
    });
}

const gridbutton = document.querySelector('#grid');
const listbutton = document.querySelector('#list');
const display = document.querySelector('article');

gridbutton.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
});

listbutton.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
});

getMembers();