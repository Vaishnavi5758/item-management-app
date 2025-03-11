console.log("Hello from script");
const apiBase = 'http://localhost:3000/api/items';

//dropdown
async function loadItemTypes() {
    try {
        const response = await fetch(`${apiBase}/types`);
        if (!response.ok) throw new Error("Failed to load item types!");

        const itemTypes = await response.json();
        const itemTypeSelect = document.getElementById("itemType");

        itemTypeSelect.innerHTML = "";

        
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Item Type";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        itemTypeSelect.appendChild(defaultOption);

        itemTypes.forEach(type => {
            const option = document.createElement("option");
            option.value = type.id;
            option.textContent = type.type_name;
            itemTypeSelect.appendChild(option);
        });

    } catch (error) {
        alert(error.message);
    }
}

//load items in tabe
async function loadItems() {
    try {
        const response = await fetch(`${apiBase}`);
        if (!response.ok) throw new Error("Failed to load items!");

        const items = await response.json();
        const tableBody = document.getElementById("itemsTable");
        tableBody.innerHTML = "";

        items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.ItemType?.type_name || "N/A"}</td>
                <td>${item.purchase_date}</td>
                <td>${item.stock_available ? "✔️" : "❌"}</td>
                <td>
                    <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        alert(error.message);
    }
}

//form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById("itemId").value;
    const name = document.getElementById("name").value;
    const itemTypeId = document.getElementById("itemType").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const stockAvailable = document.getElementById("stockAvailable").checked;

    console.log("purchase Date>>>>",purchaseDate)
    
    // if (purchaseDate.includes("/")) {
    //     let [day, month, year] = purchaseDate.split("/");
    //     purchaseDate = `${year}-${month}-${day}`;
    // }

    const method = id ? "PUT" : "POST";
    const url = id ? `${apiBase}/${id}` : `${apiBase}`;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, item_type_id: itemTypeId, purchase_date: purchaseDate, stock_available: stockAvailable })
        });

        if (!response.ok) throw new Error(`Error ${id ? "updating" : "adding"} item.`);

        alert(`Item ${id ? "updated" : "added"} successfully!`);
        loadItems();
        document.getElementById("itemForm").reset();
        document.getElementById("itemId").value = "";
    } catch (error) {
        alert(error.message);
    }
}

//delete item
async function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        try {
            const response = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete item.");

            loadItems();
        } catch (error) {
            alert(error.message);
        }
    }
}

//edit item
async function editItem(id) {
    try {
        const response = await fetch(`${apiBase}/${id}`);
        if (!response.ok) throw new Error("Error fetching item details.");

        const item = await response.json();

        document.getElementById("itemId").value = item.id;
        document.getElementById("name").value = item.name;
        document.getElementById("itemType").value = item.item_type_id;
        document.getElementById("purchaseDate").value = item.purchase_date;
        document.getElementById("stockAvailable").checked = item.stock_available;
    } catch (error) {
        alert(error.message);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadItemTypes();
    loadItems();
    document.getElementById("itemForm").addEventListener("submit", handleFormSubmit);
});