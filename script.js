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

const addButtonWindow = document.getElementById('addButtonWindow');
const removeButtonWindow = document.getElementById('removeButtonWindow');
const clearButtonWindow = document.getElementById('clearButtonWindow');

const modalTitle = document.getElementById('modalTitle');

const addForm = document.getElementById('addForm');
const removeForm = document.getElementById('removeForm');
const destroyCreation = document.getElementById('destroyCreation');

/* Code from https://www.w3schools.com/howto/howto_css_modals.asp */

var modal = document.getElementById('instructionModal');
var instructionButton = document.getElementById('instructionButton');
let modalBody = document.getElementById('modal-body');

var span = document.getElementsByClassName("close")[0];

instructionButton.onclick = function () {
    modal.style.display = "block";
    modalTitle.innerText = "Instructions";
    modalBody.innerHTML = `
    <p class="notice">Ever wanted to create a chain of mumbo-jumbo for no concrete reason? DaisyChain lets you do just that!</p>

    <h3>To add a segment:</h3>
    <p class="notice">
        1. Type something into the input field on the right of the "Segment to be added:" text.<br /><br />
        2a. To add a segment to the start of your creature, click the radio button on the left of the "Add to Start" text (Note: This button is checked by default.).<br /><br />
        2b. To add a segment to the end of your creature, click the radio button on the left of the "Add to End" text.<br /><br />
        3. Click the "Add a Segment to my Creation" button to add a segment to your creature.
    </p>

    <h3>To remove a segment:</h3>
    <p class="notice">
        1a. To remove a segment from the start of your creature, click the radio button on the left of the "Remove From Start" text (Note: This button is checked by default.).<br /><br />
        1b. To remove a segment from the end of your creature, click the radio button on the left of the "Remove From End" text.<br /> <br />
        2. Click the "Remove a Segment from my Creation" button to remove a segment from your creation.
    </p>

    <h3>To reverse a creation:</h3>
    <p class="notice">
        To reverse a creation, simply click the cyan "Reverse Creation" button.
    </p>

    <h3>To destroy a creation:</h3>
    <p class="notice">
        1. If you would like to save your creation to the graveway, ensure the checkbox to the right of the text "Save my creation before clearing" is checked.<br /><br />
        2. Click the "Destroy my Creation" button to destroy your creation.
    </p>
    `;
    addForm.style.display = 'none';
    removeForm.style.display = 'none';
    destroyCreation.style.display = 'none';
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* End of modal code */

addButtonWindow.addEventListener('click', (e) => {
    modal.style.display = "block";
    modalTitle.innerText = "Add a Segment";
    modalBody.innerHTML = "";
    addForm.style.display = 'block';
    removeForm.style.display = 'none';
    destroyCreation.style.display = 'none';
})

removeButtonWindow.addEventListener('click', (e) => {
    modal.style.display = 'block';
    modalTitle.innerText = "Remove a Segment";
    modalBody.innerHTML = "";
    addForm.style.display = 'none';
    removeForm.style.display = 'block';
    destroyCreation.style.display = 'none';
})

clearButtonWindow.addEventListener('click', (e) => {
    modal.style.display = 'block';
    modalTitle.innerText = "Destroy your Creation";
    modalBody.innerHTML = "";
    addForm.style.display = 'none';
    removeForm.style.display = 'none';
    destroyCreation.style.display = 'block';
})

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
    creature.innerHTML = `<p class="creature">${ferret.join("<=>")}</p>`; // Updates the creature to hold the new ferret array contents
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
            creature.innerHTML = `<p class="creature">${ferret.join("<=>")}</p>`;
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
        creature.innerHTML = `<p class="creature">${ferret.join("<=>")}</p>`;
    } else {
        alert("No creature to be reversed - add some items first!");
    }
    e.preventDefault();
});

clearButton.addEventListener('click', (e) => {
    if(save.checked && ferret.join(" => ").trim() && ferret.length > 0) {
        deceased.unshift(ferret.join(" => ")); // Adds the newest creation to the start of the deceased array
        deceased.pop(); // Gets rid of the oldest creation
        graveyard.style.display = 'block'; // This causes the "graveyard" section to now be displayed
        creations.innerHTML = `<p class="notice">The <strong>five most recent</strong> saved creations are recorded here.</p>`;
        for(let i = 0; i < deceased.length; i++) {
            creations.innerHTML += `<p class="creature">${deceased[i]}</p><br />`;
        }
        alert("Creation saved to graveyard!");
    } else if (ferret.length < 1) {
        alert("No creature to be destroyed - add some items first!");
    } else {
        creature.innerText = ""; // Resets the "creature"
        ferret.length = 0; // Help from FCC
    }
    e.preventDefault();
});