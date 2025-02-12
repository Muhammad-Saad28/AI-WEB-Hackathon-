document.addEventListener("DOMContentLoaded", loadInventory);

function addItem() {
    let itemName = document.getElementById("item-name").value.trim();
    let itemExpiry = document.getElementById("item-expiry").value;

    if (!itemName || !itemExpiry) {
        alert("Please enter both item name and expiration date.");
        return;
    }

    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push({ name: itemName, expiry: itemExpiry });
    localStorage.setItem("inventory", JSON.stringify(inventory));

    loadInventory();
    document.getElementById("item-name").value = "";
    document.getElementById("item-expiry").value = "";
}

function loadInventory() {
    let inventoryTable = document.querySelector("#inventory-table tbody");
    inventoryTable.innerHTML = "";
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    inventory.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.expiry} ${checkExpiry(item.expiry)}</td>
            <td>
                <button class="edit" onclick="editItem(${index})">Edit</button>
                <button class="delete" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    });
}

function checkExpiry(expiryDate) {
    let today = new Date().toISOString().split("T")[0];
    return expiryDate < today ? "⚠️ Expired!" : (expiryDate === today ? "⚠️ Expires Today!" : "");
}

function editItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    let item = inventory[index];

    let newName = prompt("Edit item name:", item.name);
    let newExpiry = prompt("Edit expiration date (YYYY-MM-DD):", item.expiry);

    if (newName && newExpiry) {
        inventory[index] = { name: newName, expiry: newExpiry };
        localStorage.setItem("inventory", JSON.stringify(inventory));
        loadInventory();
    }
}

function deleteItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    loadInventory();
}

document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Internal Links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetSection = document.querySelector(this.getAttribute("href"));
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Highlight Active Page in Navbar
    function setActiveNav() {
        const currentPath = window.location.pathname.split("/").pop();
        document.querySelectorAll("nav a").forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    setActiveNav();
});

// Function to add an item to the inventory
function addItem() {
    // Get input values
    const itemName = document.getElementById('item-name').value;
    const itemExpiry = document.getElementById('item-expiry').value;

    // Validate inputs
    if (!itemName || !itemExpiry) {
        alert("Please fill in both fields.");
        return;
    }

    // Create a new row for the inventory table
    const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert item name and expiration date cells
    const itemCell = newRow.insertCell(0);
    const expiryCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);

    // Set the text content for the item and expiry cells
    itemCell.textContent = itemName;
    expiryCell.textContent = itemExpiry;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        newRow.remove();
    };

    // Append the delete button to the action cell
    actionCell.appendChild(deleteButton);

    // Clear the input fields after adding the item
    document.getElementById('item-name').value = '';
    document.getElementById('item-expiry').value = '';
}

// Optional: If you want to allow the user to press Enter to add an item
document.getElementById('item-expiry').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});
