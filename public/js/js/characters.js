const selectElement = document.querySelector('characterSelection');
selectElement.addEventListener('submit', (event) => {
    req.session.characterID = `${event.target.value}`;
    console.log(req.session.characterID);
});