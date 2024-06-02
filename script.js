/**
 * Author: Ruan S
 * Description: Code to add element to a shopping list, clear all element or only one and filter
 * the list of elements
 */
// Define a class to manage the shopping list
class ShoppingList {
    constructor() {
        // Initialize an empty array to hold the list items
        this.itemList = [];
        // Get the HTML element representing the list container
        this.itemListElement = document.getElementById("item-list");
        // Get the filter input element
        this.filterInput = document.getElementById('filter');
        // Get the clear button element
        this.clearButton = document.getElementById("clear");
        // Set up event listeners for form submission, clearing the list, and filtering items
        this.setupEventListeners();
        this.checkUi(); // Check UI initially to set initial visibility
    }

    // Set up event listeners for form submission, clearing the list, and filtering items
    setupEventListeners() {
        document.getElementById("item-form").addEventListener("submit", this.addItem.bind(this));
        this.clearButton.addEventListener("click", this.clearAll.bind(this));
        this.filterInput.addEventListener('input', this.filterItems.bind(this));
    }

    // Method to add a new item to the list
    addItem(event) {
        event.preventDefault();
        // Get the input value and trim any leading or trailing spaces
        const itemInput = document.getElementById("item-input").value.trim();
        // Check if the input is not empty
        if (itemInput !== "") {
            // Add the item to the list
            this.itemList.push(itemInput);
            // Render the updated list
            this.renderItems();
            // Clear the input field after adding the item
            document.getElementById("item-input").value = "";
        } else {
            // Show an alert if the input is empty
            alert("This input can't be empty");
        }
    }

    // Method to remove an item from the list
    removeItem(index) {
        this.itemList.splice(index, 1);
        this.renderItems();
    }

    // Method to clear all items from the list
    clearAll() {
        this.itemList = [];
        this.renderItems();
    }

    // Method to filter items based on user input
    filterItems() {
        // Get the filter value and convert it to lowercase for case-insensitive matching
        const filterValue = this.filterInput.value.toLowerCase();
        // Loop through each item in the list
        this.itemList.forEach((item, index) => {
            // Convert item name to lowercase for comparison
            const itemName = item.toLowerCase();
            // Get the HTML element representing the item
            const itemElement = this.itemListElement.children[index];
            // Check if the item matches the filter value
            if (itemName.includes(filterValue)) {
                // Show the item if it matches
                itemElement.style.display = "";
            } else {
                // Hide the item if it doesn't match
                itemElement.style.display = 'none';
            }
        });
    }

    // Method to render the list of items
    renderItems() {
        // Clear the existing list
        this.itemListElement.innerHTML = "";
        // Loop through each item in the list
        this.itemList.forEach((item, index) => {
            // Create a new list item element
            const newItem = document.createElement("li");
            // Set the text content of the new item
            newItem.textContent = item;
            // Create a remove button for the item
            const removeButton = document.createElement("button");
            removeButton.className = "remove-item btn-link text-red";
            removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            // Add click event listener to the remove button to remove the item when clicked
            removeButton.addEventListener("click", () => this.removeItem(index));
            // Append the remove button to the new item
            newItem.appendChild(removeButton);
            // Append the new item to the list container
            this.itemListElement.appendChild(newItem);
        });
        // Update UI after rendering items
        this.checkUi();
    }

    // Method to check UI state and update visibility of clear button and filter input
    checkUi() {
        if (this.itemList.length === 0) {
            // Hide clear button and filter input if list is empty
            this.clearButton.style.display = 'none';
            document.getElementById("filter").style.display = 'none';
        } else {
            // Show clear button and filter input if list is not empty
            this.clearButton.style.display = 'block';
            document.getElementById("filter").style.display = 'block';
        }
    }
}

// Event listener for the DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Create an instance of the ShoppingList class
    const shoppingList = new ShoppingList();
});
