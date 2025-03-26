let categories = JSON.parse(localStorage.getItem("categories")) || [];
function saveToLocalStorage() { localStorage.setItem("categories", JSON.stringify(categories)); }
function renderTable(filteredData = categories) {
    const table = document.getElementById("categoryTable");
    table.innerHTML = "";
    filteredData.forEach((cat, index) => {
        table.innerHTML += `
                <tr>
                    <td>${cat.code}</td>
                    <td>${cat.name}</td>
                    <td>${cat.status === "active" ? '<span class="status-active">● Đang hoạt động</span>' : '<span class="status-inactive">● Ngừng hoạt động</span>'}</td>
                    <td>
                        <button class="icon-btn edit" onclick="editCategory(${index})"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn delete" onclick="deleteCategory(${index})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    });
}
document.getElementById("statusFilter").addEventListener("change", function () {
    const filter = this.value;
    const filtered = categories.filter(cat => filter === "all" || cat.status === filter);
    renderTable(filtered);
});
document.getElementById("searchInput").addEventListener("input", function () {
    const text = this.value.toLowerCase();
    const filtered = categories.filter(cat => cat.name.toLowerCase().includes(text));
    renderTable(filtered);
});
document.getElementById("categoryForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const code = document.getElementById("categoryCode").value;
    const name = document.getElementById("categoryName").value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const index = document.getElementById("editIndex").value;
    if (index === "") { categories.push({ code, name, status }); }
    else { categories[index] = { code, name, status }; }
    saveToLocalStorage();
    renderTable();
    bootstrap.Modal.getInstance(document.getElementById("categoryModal")).hide();
});
function deleteCategory(index) {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
        categories.splice(index, 1);
        saveToLocalStorage();
        renderTable();
    }
}
function editCategory(index) {
    const cat = categories[index];
    document.getElementById("categoryCode").value = cat.code;
    document.getElementById("categoryName").value = cat.name;
    document.getElementById("editIndex").value = index;
    document.getElementById(cat.status === "active" ? "statusActive" : "statusInactive").checked = true;
    document.getElementById("categoryModalLabel").textContent = "Chỉnh sửa danh mục";
    new bootstrap.Modal(document.getElementById("categoryModal")).show();
}
renderTable();
