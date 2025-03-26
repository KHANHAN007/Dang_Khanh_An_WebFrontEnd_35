const employees = JSON.parse(localStorage.getItem("employees")) || [
    { id: 1, name: "Nguyễn Văn A", position: "Developer" },
    { id: 2, name: "Trần Thị B", position: "Designer" },
    { id: 3, name: "Phạm Văn C", position: "Project Manager" },
    { id: 4, name: "Lê Thị D", position: "QA Engineer" },
    { id: 5, name: "Vũ Văn E", position: "DevOps" }
];
let currentPage = 1;
const rowsPerPage = 3;
function addEmployee() {
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    if (name && position) {
        employees.push({ id: employees.length + 1, name, position });
        localStorage.setItem("employees", JSON.stringify(employees));
        document.getElementById("name").value = "";
        document.getElementById("position").value = "";
        displayEmployees();
    }
}
function displayEmployees() {
    const table = document.getElementById("employeeTable");
    table.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const employeesToDisplay = employees.slice(start, end);

    employeesToDisplay.forEach((emp, index) => {
        const row = `
            <tr>
                <td>${start + index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
    updatePagination();
}
function updatePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(employees.length / rowsPerPage);
    pagination.innerHTML += `<button onclick="changePage(-1)" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button onclick="goToPage(${i})" ${currentPage === i ? 'style="font-weight: bold; background-color:#007BFF; color: white"' : ''}>${i}</button>`;
    }
    pagination.innerHTML += `<button onclick="changePage(1)" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
}
function changePage(direction) {
    currentPage += direction;
    displayEmployees();
}
function goToPage(page) {
    currentPage = page;
    displayEmployees();
}
window.onload = function () {
    displayEmployees();
};
