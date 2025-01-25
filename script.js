const creature = document.getElementById('creature'); // Displays the "creature" the user creates

let ferret = []; // Holds the elements that make up the current creation
let deceased = ["", "", "", "", ""]; // Used to hold the five most recent creations

const addToEnd = document.getElementById('addToEnd'); // Add to end radio button
const removeFromEnd = document.getElementById('removeFromEnd'); // Remove from end radio button

const save = document.getElementById('save'); // Checkbox with the id of "save"

const segment = document.getElementById('segment');
const addButton = document.getElementById('addButton'); // Button used to add a segment to the ferret array
const removeButton = document.getElementById('removeButton'); // Button used to remove a segment from the ferret array
const reverseButton = document.getElementById('reverseButton');
const clearButton = document.getElementById('clearButton'); // Button used to clear the ferret array

const graveyard = document.getElementById('graveyard'); // Used to store the five most recently saved deleted creations
const creations = document.getElementById('creations'); // Stores the five most recently saved deleted creations

addButton.addEventListener('click', (e) => {
    if(segment.value.trim()) { // Ensures an empty value is not being entered
        if(addToEnd.checked) { // Executes if the "Add to End" radio button is checked when the "Add Item" button is clicked
            ferret.push(segment.value); // Adds the element to the end of the ferret array
        } else { // Executes if the "Add to Start" radio button is checked when the "Add Item" button is clicked
            ferret.unshift(segment.value); // Adds the element to the beginning of the ferret array
        }
    } else {
        alert("Please type in a segment to be added.");
    }
    creature.innerHTML = `<p class="creature">${ferret.join("=>")}</p>`; // Updates the creature to hold the new ferret array contents
    segment.value = "";
    e.preventDefault(); // Used to prevent page refreshing
});

removeButton.addEventListener('click', (e) => {
    if (ferret.length > 0) {
        if(removeFromEnd.checked) { // Executes if the "Remove From End" radio button is checked when the "Remove Item" button is clicked
            ferret.pop(); // Removes the element at the end of the ferret array
        } else { // Executes if the "Remove From Start" radio button is checked when the "Remove Item" button is clicked
            ferret.shift(); // Removes the element at the beginning of the ferret array
        }

        if (ferret.length > 0) {
            creature.innerHTML = `<p class="creature">${ferret.join("=>")}</p>`;
        } else {
            creature.innerHTML = "";
        }
    }
    else {
        alert("No items to be removed - add some items first!");
    }
    e.preventDefault();
});

reverseButton.addEventListener('click', (e) => {
    if (ferret.length > 0) {
        ferret = ferret.reverse();
        creature.innerHTML = `<p class="creature">${ferret.join("=>")}</p>`;
    } else {
        alert("No creature to be reversed - add some items first!");
    }
    e.preventDefault();
});

clearButton.addEventListener('click', (e) => {
    if(save.checked && ferret.join(" => ").trim()) {
        deceased.unshift(ferret.join(" => ")); // Adds the newest creation to the start of the deceased array
        deceased.pop(); // Gets rid of the oldest creation
        graveyard.style.display = 'block'; // This causes the "graveyard" section to now be displayed
        creations.innerHTML = `<p class="notice">The <strong>five most recent</strong> saved creations are recorded here.</p>`;
        for(let i = 0; i < deceased.length; i++) {
            creations.innerHTML += `<p class="creature">${deceased[i]}</p><br />`;
        }
        alert("Creation saved to graveyard!");
    }
    creature.innerText = ""; // Resets the "creature"
    ferret.length = 0; // Help from FCC
    e.preventDefault();
});