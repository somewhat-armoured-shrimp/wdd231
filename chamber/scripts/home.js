const weatherIcon = document.querySelector('#weather-emoji');
const temp = document.querySelector('#temperature');
const description = document.querySelector('#description');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#humidity');

const forecast = document.querySelector('#forecast');

const currentURL = 'https://api.openweathermap.org/data/2.5/weather?lat=52.20&lon=0.13&appid=031dfdd54bbcc6d19831160030dce525&units=metric';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=52.20&lon=0.13&appid=031dfdd54bbcc6d19831160030dce525&units=metric';

async function apiFetch() {
    try {
        const response = await fetch(currentURL);
        const forecastResponse = await fetch(forecastURL);
        if (response.ok && forecastResponse.ok) {
            const data = await response.json();
            const forecastData = await forecastResponse.json();
            console.log(data);

            displayResults(data);
            displayForecast(forecastData);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    high.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;C`;
    low.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // searching through MDN for 2 hours got me nothing so screw 
    // it man heres a split and a map. It'll get all the words, even the biggest words - there's all kinds of words. big words and even little words - but we have the best words. 
    const words = desc.split(' ');

    desc = words.map(word => {
        return word[0].toUpperCase() + word.slice(1);
    }).join(' ');
    // AHHHHHHHHHHHHHHHHHH

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    description.textContent = desc;
}

// listen man i did wdd230, i can explain all this in a second because
// i wrote it with my cold dead hands
function displayForecast(forecastData) {
    // new date
    const tomorrow = new Date();
    // make it tomorrow by adding one to the date
    tomorrow.setDate(tomorrow.getDate() + 1);
    // set tomorrows time to 00:00 because all you did is add 24 hours
    tomorrow.setHours(0, 0, 0, 0);
    // DT format needs to be adjusted (shave off weird zeros)
    const tomorrowDT = Math.floor((tomorrow).getTime() / 1000);

    // filter out every record (timestamp i believe) that is before tomorrow
    const filteredDT = forecastData.list.filter((record) => record.dt >= tomorrowDT);

    // array for the three days i'll be needing
    const days = [];
    // slice filtered days into equal, usable timeframes
    const day1 = filteredDT.slice(1, 9);
    const day2 = filteredDT.slice(9, 17);
    const day3 = filteredDT.slice(17, 25);

    days.push(day1);
    days.push(day2);
    days.push(day3);

    // then for those three days make these cards.
    days.forEach(day => {
        // Math.min(...[1,2,3]) = Math.min(1, 2, 3) for this
        const tempMin = Math.min(...day.map(record => record.main.temp_min));
        const tempMax = Math.max(...day.map(record => record.main.temp_max));

        const div = document.createElement('div');
        const icons = document.createElement('img');
        const maxmin = document.createElement('p');

        const iconsrc = `https://openweathermap.org/img/wn/${day[4].weather[0].icon}.png`;
        maxmin.innerHTML = `<span id="max">${Math.round(tempMax)}</span>&#xB0; ${Math.round(tempMin)}&#xB0;`;

        icons.setAttribute('src', iconsrc);
        icons.setAttribute('alt', day[4].weather[0].main);
        div.classList.add('forecast-tings');

        div.appendChild(icons);
        div.appendChild(maxmin);
        forecast.appendChild(div);
    });
}

const spotlight = document.querySelector('.spotlight');
const membersURL = 'https://somewhat-armoured-shrimp.github.io/wdd231/chamber/data/members.json';

async function getMembers() {
    const response = await fetch(membersURL);
    const data = await response.json();
    console.log(data);
    displayRandomSpotlight(data.companies);
}

const displayRandomSpotlight = (companies) => {
    // make new empty array
    const topMembers = [];
    // fill it with only silver and gold members
    companies.forEach(company => {
        if (company.membershipLevel !== 'Member') {
            topMembers.push(company);
        }
    });

    // use the shuffle function and use it on my top members.
    shuffle(topMembers);

    // after that, make display array, and push the first three members of the 
    // shuffled array into display array.
    const displayedMembers = [];
    displayedMembers.push(topMembers[0]);
    displayedMembers.push(topMembers[1]);
    displayedMembers.push(topMembers[2]);

    // for each of those displayed members, make this card.
    displayedMembers.forEach(member => {
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const memberName = document.createElement('h3');
        const tagline = document.createElement('span');
        const cardContent = document.createElement('div');
        const companyLogo = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const siteLink = document.createElement('a');

        memberName.textContent = `${member.name}`;
        tagline.textContent = `${member.tagline}`;
        companyLogo.textContent = `${member.icon}`;
        address.textContent = `ADDRESS: ${member.address}`;
        phone.textContent = `PHONE: ${member.phone}`;
        siteLink.textContent = `${member.siteURL}`;

        companyLogo.setAttribute('src', `${member.icon}`);
        companyLogo.setAttribute('alt', `${member.name} Logo`);
        siteLink.setAttribute('href', `${member.siteURL}`);

        cardHeader.appendChild(memberName);
        cardHeader.appendChild(tagline);
        cardContent.appendChild(companyLogo);
        cardContent.appendChild(address);
        cardContent.appendChild(phone);
        cardContent.appendChild(siteLink);

        cardHeader.classList.add('spotHeader');
        cardContent.classList.add('spotContent');
        card.classList.add('spotCard');

        card.appendChild(cardHeader);
        card.appendChild(cardContent);

        spotlight.appendChild(card);
    });
}

function shuffle(companies) {
    let currentIndex = companies.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [companies[currentIndex], companies[randomIndex]] = [
            companies[randomIndex], companies[currentIndex]];
    }
}

apiFetch();
getMembers();
