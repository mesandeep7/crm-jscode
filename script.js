let customersData = [
];

function loadCustomerDataFromLocalStorage() {
    const storedCustomers = localStorage.getItem("customersData");
    if (storedCustomers) {
        return JSON.parse(storedCustomers);
    } else {
        return [];
    }
}

function saveCustomerDataToLocalStorage() {
    localStorage.setItem("customersData", JSON.stringify(customersData));
}

function populateCustomerTable() {
    const tableBody = document.querySelector("table tbody");

    tableBody.innerHTML = "";

    customersData.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>
            <button onclick="editCustomer('${customer.email}')">Update</button>
            <button onclick="deleteCustomer('${customer.email}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function ViewAddingCustomerForm() {
    const DivOverlaySec = document.getElementById("DivOverlaySec");
    DivOverlaySec.style.display = "block";
}

function hidesAddingCustomerForm() {
    const DivOverlaySec = document.getElementById("DivOverlaySec");
    DivOverlaySec.style.display = "none";
}

document.getElementById("FormAddCustomerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    customersData.push({ firstName, lastName, email });

    saveCustomerDataToLocalStorage();

    populateCustomerTable();

    document.getElementById("FormAddCustomerForm").reset();
    hidesAddingCustomerForm();
});

function deleteCustomer(email) {
    const index = customersData.findIndex((customer) => customer.email === email);

    if (index !== -1) {
        customersData.splice(index, 1);

        saveCustomerDataToLocalStorage();

        populateCustomerTable();

        hidesEditedCustomerForm();
    }
}

function showEditCustomerForm(email) {
    const customer = customersData.find((customer) => customer.email === email);
    if (customer) {
        document.getElementById("editFirstName").value = customer.firstName;
        document.getElementById("editLastName").value = customer.lastName;
        document.getElementById("editEmail").value = customer.email;
        const editFormOverlay = document.getElementById("editCustomerFormOverlay");
        editFormOverlay.style.display = "block";
        editFormOverlay.onsubmit = function (e) {
            e.preventDefault();
            const editedFirstName = document.getElementById("editFirstName").value;
            const editedLastName = document.getElementById("editLastName").value;
            const editedEmail = document.getElementById("editEmail").value;

            customer.firstName = editedFirstName;
            customer.lastName = editedLastName;
            customer.email = editedEmail;

            saveCustomerDataToLocalStorage();

            populateCustomerTable();

            hidesEditedCustomerForm();
        };
    }
}

function hidesEditedCustomerForm() {
    const editFormOverlay = document.getElementById("editCustomerFormOverlay");
    editFormOverlay.style.display = "none";
}

function editCustomer(email) {
    showEditCustomerForm(email);
}

document.addEventListener("DOMContentLoaded", function () {
    customersData = loadCustomerDataFromLocalStorage();
    populateCustomerTable();
});