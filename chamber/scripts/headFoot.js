const date = new Date().getFullYear();
document.querySelector("#currentYear").textContent = date;

document.querySelector("#lastModified").textContent = document.lastModified;

const burberMenu = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

burberMenu.addEventListener('click', () => {
    burberMenu.classList.toggle('open');
    navigation.classList.toggle('open');
});

