const creature = document.getElementById('creature'); // Displays the "creature" the user creates

let ferret = []; // Holds the elements that make up the current creation
let deceased = ["", "", "", "", ""]; // Used to hold the five most recent creations

const addToEnd = document.getElementById('addToEnd'); // Add to end radio button
const removeFromEnd = document.getElementById('removeFromEnd'); // Remove from end radio button

const save = document.getElementById('save'); // Checkbox with the id of "save"

const segment = document.getElementById('segment');
const addButton = document.getElementById('addButton'); // Button used to add a segment to the ferret array
const removeButton = document.getElementById('removeButton'); // Button used to remove a segment from the ferret array
const reverseButton = document.getElementById('reverseButton'); // Button used to reverse the order of segments in a creation
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
    <ol>
        <li>Click the "Add Segment" button.</li><br />
        <li>Type something into the input field on the right of the "Segment to be added:" text.</li><br />
        <li>
            To add a segment to the start of your creation, click the radio button on the left of the "Add to Start" text (Note: This button is checked by default.).<br /><br />
            To add a segment to the end of your creation, click the radio button on the left of the "Add to End" text.
        </li><br />
        <li>Click the "Add a Segment to my Creation" button to add a segment to your creation.</li>
    </ol>
    <p class="notice">
        Note: The maximum number of segments a creation can have is 25.
    </p>

    <h3>To remove a segment:</h3>
    <ol>
        <li>Click the "Remove Segment" button.</li><br />
        <li>
            To remove a segment from the start of your creation, click the radio button on the left of the "Remove From Start" text (Note: This button is checked by default.).<br /><br />
            To remove a segment from the end of your creation, click the radio button on the left of the "Remove From End" text.
        </li><br />
        <li>Click the "Remove a Segment from my Creation" button to remove a segment from your creation.</li>
    </ol>

    <h3>To reverse a creation:</h3>
    <p class="notice">
        To reverse a creation, simply click the "Reverse Creation" button. To reverse a creation, it must have at least two segments.
    </p>

    <h3>To destroy a creation:</h3>
    <ol>
        <li>Click the "Destroy Creation" button.</li><br />
        <li>If you would like to save your creation to the graveway, ensure the checkbox to the right of the text "Save my creation before clearing" is checked.</li><br />
        <li>Click the "Destroy my Creation" button to destroy your creation.</li>
    </ol>

    <h3>About the Graveyard:</h3>
    <p class="notice">
        The graveyard saves the five most recently-deleted creations that were saved. If there are currently five creations to the graveyard 
        and another creation is saved to the graveyard, the oldest creation in the graveyard will be erased.
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

/* Changes what the modal displays depending on which button is clicked */

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
    if (ferret.length >= 25) { // Checks if the creation has 25 or more segments
        alert("Maximum creation length of 25 reached.");
    } else if(segment.value.trim()) { // Ensures an empty value is not being entered
        if(addToEnd.checked) { // Executes if the "Add to End" radio button is checked when the "Add Item" button is clicked
            ferret.push(segment.value); // Adds the element to the end of the ferret array
        } else { // Executes if the "Add to Start" radio button is checked when the "Add Item" button is clicked
            ferret.unshift(segment.value); // Adds the element to the beginning of the ferret array
        }
        creature.innerHTML = `<p class="creature">${ferret.join("<=>")}</p>`; // Updates the creature to hold the new ferret array contents
        segment.value = "";
    } else {
        alert("Please type in a segment to be added.");
    }
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
    } else {
        alert("No items to be removed - add some segments first!");
    }
    e.preventDefault();
});

reverseButton.addEventListener('click', (e) => {
    if (ferret.length > 1) { // Will only reverse if the creation has at least two segments
        ferret = ferret.reverse();
        creature.innerHTML = `<p class="creature">${ferret.join("<=>")}</p>`;
    } else if (ferret.length == 1) { // Reversing is not necessary if there is only one segment
        alert("Only one segment - no reversing necessary.");
    } else {
        alert("No creation to be reversed - add some segments first!");
    }
    e.preventDefault();
});

clearButton.addEventListener('click', (e) => {
    if(save.checked && ferret.join("<=>").trim() && ferret.length > 0) {
        deceased.unshift(ferret.join("<=>")); // Adds the newest creation to the start of the deceased array
        deceased.pop(); // Gets rid of the oldest creation
        graveyard.style.display = 'block'; // This causes the "graveyard" section to now be displayed
        creations.innerHTML = `<p class="notice">The <strong>five most recent</strong> saved creations are recorded here.</p>`;
        for(let i = 0; i < deceased.length; i++) {
            creations.innerHTML += `<p class="creature">${deceased[i]}</p><br />`;
        }
        alert("Creation saved to graveyard!");
        creature.innerText = ""; // Resets the "creature"
        ferret.length = 0; // Help from FCC
    } else if (ferret.length < 1) {
        alert("No creation to be destroyed - add some segments first!");
    } else {
        creature.innerText = ""; // Resets the "creature"
        ferret.length = 0; // Help from FCC
    }
    e.preventDefault();
});