const yourInfo = new URLSearchParams(window.location.search);
console.log(yourInfo);

document.querySelector('#thankuwu').innerHTML = `
    <p>Your email: <span>${yourInfo.get('email')}</span>.</p> <p>I assure you that nothing bad will happen to it. :)</p>
    <p>Yeah it's janky but the only web dev in town quit and vowed never to touch the site again.</p>`;