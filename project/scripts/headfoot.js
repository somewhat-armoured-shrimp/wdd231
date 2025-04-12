const burberMenu = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

burberMenu.addEventListener('click', () => {
    burberMenu.classList.toggle('open');
    navigation.classList.toggle('open');
});