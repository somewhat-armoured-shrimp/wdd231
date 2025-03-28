const formLoaded = document.querySelector('#timestamp');
const currentDateTime = new Date();

formLoaded.value = currentDateTime;

console.log(document.getElementById("timestamp").value);

const perkModal = document.querySelector('#perk-desc');
const closeButton = document.querySelector('#close-button');
const perkDesc = document.querySelector('#perk-desc div');

nonprofitMore.addEventListener('click', () => {
    perkModal.showModal();
    perkDesc.innerHTML = `<span>Nonprofit Organisation</span>
    <p>Feels good to do good. No fees. You get a discount on events (like probably for free or something) and training.</p>
    <p>£0.00 monthly fee probably idk. do i look like i know what i'm talking about?</p>`;
});

bronzeMore.addEventListener('click', () => {
    perkModal.showModal();
    perkDesc.innerHTML = `<span>Bronze Membership</span>
    <p>Feels less good because you pay some money. But you also get training for soft skills. Nobody does this one.</p>
    <p>£69999.99 monthly fee</p>`;
});

silverMore.addEventListener('click', () => {
    perkModal.showModal();
    perkDesc.innerHTML = `<span>Silver Membership</span>
    <p>Feels pretty OK. You get a random spotlight on the front page, training, and a small discount on events.</p>
    <p>£80000.00 monthly fee</p>`;
});

goldMore.addEventListener('click', () => {
    perkModal.showModal();
    perkDesc.innerHTML = `<span>Gold Membership</span>
    <p>Feels the worst overall. You get random spotlight advertising on the front page, training, and a large discount on events.</p>
    <p>£100000.00 monthly fee</p>`;
});

closeButton.addEventListener('click', () => {
    perkModal.close();
})

