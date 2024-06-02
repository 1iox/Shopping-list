class ItemList {
    constructor() {
        // Get the list container element by its ID
        this.itemListElement = document.getElementById("item-list");
    }

    // Method to add a new item to the list
    addItem(itemInput) {
        // Create a new list item element
        const newItem = document.createElement("li");
        // Set the text content of the new item
        newItem.textContent = itemInput;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.className = "remove-item btn-link text-red";
        removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        // Add click event listener to the remove button to remove the item when clicked
        removeButton.addEventListener("click", () => this.removeItem(newItem));

        // Append the remove button to the new item
        newItem.appendChild(removeButton);
        // Append the new item to the list container
        this.itemListElement.appendChild(newItem);
    }

    // Method to remove an item from the list
    removeItem(itemElement) {
        itemElement.remove();
    }

    // Method to clear all items from the list
    clearAll() {
        this.itemListElement.innerHTML = "";
    }
}

class FormHandler {
    constructor(itemList) {
        this.itemList = itemList;
        // Add submit event listener to the form to handle form submission
        document.getElementById("item-form").addEventListener("submit", this.handleSubmit.bind(this));
        // Add click event listener to the clear button to handle clearing the list
        document.getElementById("clear").addEventListener("click", this.clearAll.bind(this));
    }

    // Method to handle form submission
    handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const itemInput = document.getElementById("item-input").value.trim();
        if (itemInput !== "") {
            // If input is not empty, add the item to the list
            this.itemList.addItem(itemInput);
            document.getElementById("item-input").value = ""; // Clear the input field after adding the item
        } else {
            // Show an alert if the input is empty
            alert("This input can't be empty");
        }
    }

    // Method to clear all items from the list
    clearAll() {
        this.itemList.clearAll();
    }
}

// Event listener for the DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Create instances of ItemList and FormHandler classes
    const itemList = new ItemList();
    const formHandler = new FormHandler(itemList);
});

class Filter {
    // Future functionality for filtering items will be added here
}
