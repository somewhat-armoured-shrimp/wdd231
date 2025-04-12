const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const description = document.querySelector('#description');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const feelsLike = document.querySelector('#feels-like');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-75.25&lon=-0.07&units=imperial&appid=031dfdd54bbcc6d19831160030dce525';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    high.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;F`;
    low.innerHTML = `Low: ${Math.round(data.main.temp_max)}&deg;F`;
    feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&deg;F`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    const words = desc.split(' ');

    desc = words.map(word => {
        return word[0].toUpperCase() + word.slice(1);
    }).join(' ');

    description.innerHTML = `${desc}`;
}

apiFetch();