const creature = document.getElementById('creature');

let ferret = [];
let deceased = ["", "", "", "", ""];

const addToEnd = document.getElementById('addToEnd');
const removeFromEnd = document.getElementById('removeFromEnd');

const save = document.getElementById('save');

const segment = document.getElementById('segment');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const clearButton = document.getElementById('clearButton');

const graveyard = document.getElementById('graveyard');
const creations = document.getElementById('creations');

addButton.addEventListener('click', (e) => {
    if(addToEnd.checked) {
        ferret.push(segment.value);
    } else {
        ferret.unshift(segment.value);
    }
    creature.innerText = ferret.join(" => ");
    e.preventDefault();
});

removeButton.addEventListener('click', (e) => {
    if(removeFromEnd.checked) {
        ferret.pop();
    } else {
        ferret.shift();
    }
    creature.innerText = ferret.join(" => ");
    e.preventDefault();
});

clearButton.addEventListener('click', (e) => {
    if(save.checked && ferret.join(" => ").trim()) {
        deceased.unshift(ferret.join(" => "));
        deceased.pop();
        graveyard.style.display = 'block';
        creations.innerHTML = "<p>The <strong>five most recent</strong> saved creations are recorded here.</p>";
        for(let i = 0; i < deceased.length; i++) {
            creations.innerHTML += `${deceased[i]}<br /><br />`;
        }
    }
    creature.innerText = "";
    ferret.length = 0; // Help from FCC
    e.preventDefault();
});