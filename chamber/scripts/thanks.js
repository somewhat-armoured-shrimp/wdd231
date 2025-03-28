const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

document.querySelector('#thankies').innerHTML = `
    <p>THANK YOU <span>${myInfo.get('firstname')} ${myInfo.get('lastname')}</span></p>
    <p>YOUR EMAIL <span>${myInfo.get('email')}</span></p>
    <p>YOUR PHONE <span>${myInfo.get('phone')}</span></p>
    <p>MAY GOD HAVE MERCY ON <span>${myInfo.get('business')}</span></p>
    <p>FILLED ${myInfo.get('timestamp')}</p>`;
