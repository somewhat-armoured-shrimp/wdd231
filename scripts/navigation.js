const burberMenu = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const nonNav = document.querySelector('.non-nav');

burberMenu.addEventListener('click', () => {
    burberMenu.classList.toggle('open');
    navigation.classList.toggle('open');
    nonNav.classList.toggle('open');
});