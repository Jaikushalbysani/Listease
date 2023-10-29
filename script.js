// Initialize the lists array with data from localStorage or an empty array
let lists = JSON.parse(localStorage.getItem('lists')) || [];

// Function to create a new list
function createList() {
    const listNameInput = document.getElementById('list-name');
    const listName = listNameInput.value.trim();

    if (listName === '') {
        alert('Please enter a list name.');
        return;
    }

    // Create a new list object
    const newList = {
        name: listName,
        items: []
    };

    // Add the new list to the array
    lists.push(newList);

    // Clear the input field
    listNameInput.value = '';

    // Save the updated lists to localStorage
    saveLists();

    // Render the lists
    renderLists();
}

// Function to toggle task completion
function toggleTaskCompletion(listIndex, itemIndex) {
    const list = lists[listIndex];
    list.items[itemIndex].completed = !list.items[itemIndex].completed;

    // Save the updated lists to localStorage
    saveLists();

    // Render the updated list items
    renderListItems(listIndex);
}

// Function to remove a task
function removeTask(listIndex, itemIndex) {
    lists[listIndex].items.splice(itemIndex, 1);

    // Save the updated lists to localStorage
    saveLists();

    // Render the updated list items
    renderListItems(listIndex);
}

// Function to render the lists
function renderLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';

    lists.forEach((list, index) => {
        const listDiv = document.createElement('div');
        listDiv.classList.add('list');
        listDiv.innerHTML = `
            <h2>${list.name}</h2>
            <ul id="list-${index}">
            </ul>
            <input type="text" id="item-${index}" class="add-item-input" placeholder="   Add item">
            <button class="add-button" onclick="addItem(${index})">Add</button>
            <button class="remove-button" onclick="removeList(${index})">Remove List</button>
        `;

        const itemInput = listDiv.querySelector(`#item-${index}`);

        // Set the current list index and input field for adding tasks
        itemInput.addEventListener('focus', () => setCurrentList(index, itemInput));

        // Append the list to the container
        listsContainer.appendChild(listDiv);

        // Render list items
        renderListItems(index);
    });
}

// Function to add an item to a list
function addItem(listIndex) {
    const itemInput = document.getElementById(`item-${listIndex}`);
    const itemText = itemInput.value.trim();

    if (itemText === '') {
        return; // Don't proceed if the input is empty
    }

    const list = lists[listIndex];
    list.items.push({ text: itemText, completed: false });

    // Clear the input field
    itemInput.value = '';

    // Save the updated lists to localStorage
    saveLists();

    // Render list items
    renderListItems(listIndex);
}

// Function to remove a list
function removeList(listIndex) {
    lists.splice(listIndex, 1);

    // Save the updated lists to localStorage
    saveLists();

    // Render the updated lists
    renderLists();
}

// Function to render the items in a list
function renderListItems(listIndex) {
    const list = lists[listIndex];
    const listElement = document.getElementById(`list-${listIndex}`);
    listElement.innerHTML = '';

    list.items.forEach((item, itemIndex) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed || false;
        checkbox.classList.add('checkbox-style'); // Add the class for styling
        checkbox.addEventListener('change', () => toggleTaskCompletion(listIndex, itemIndex));

        const label = document.createElement('label');
        label.textContent = item.text;
        label.style.textDecoration = item.completed ? 'line-through' : 'none';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-item-button';
        removeButton.addEventListener('click', () => removeTask(listIndex, itemIndex));

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(removeButton);

        listElement.appendChild(listItem);
    });
}

// Function to save the lists to localStorage
function saveLists() {
    localStorage.setItem('lists', JSON.stringify(lists));
}

// Initial rendering of lists
renderLists();
