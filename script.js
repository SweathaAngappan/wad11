// --- Common Time Display ---
function updateDateTime() {
  const now = new Date();
  document.getElementById("currentTime").textContent =
    now.toLocaleString();
}
setInterval(updateDateTime, 1000);


// --- Show Username if available ---
const userDisplay = document.getElementById("currentUser");
const savedUser = JSON.parse(localStorage.getItem("user"));
if (userDisplay && savedUser) userDisplay.textContent = savedUser.name;


// --- USER PAGE LOGIC ---
const userForm = document.getElementById("userForm");
if (userForm) {
  const saveBtn = document.getElementById("saveBtn");
  const editBtn = document.getElementById("editBtn");
  const inputs = userForm.querySelectorAll("input, select");


  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser) {
    document.getElementById("username").value = existingUser.name;
    document.getElementById("email").value = existingUser.email;
    document.getElementById("role").value = existingUser.role;
    inputs.forEach((el) => (el.disabled = true));
    editBtn.style.display = "inline-block";
  }


  userForm.addEventListener("input", () => {
    saveBtn.disabled = !userForm.checkValidity();
  });


  editBtn.addEventListener("click", () => {
    inputs.forEach((el) => (el.disabled = false));
    editBtn.style.display = "none";
  });


  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById("username").value.trim(),
      email: document.getElementById("email").value.trim(),
      role: document.getElementById("role").value,
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("User details saved!");
    location.reload();
  });
}


// --- ADD EXPENSE PAGE ---
const expenseForm = document.getElementById("expenseForm");
if (expenseForm) {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").setAttribute("max", today);
  document.getElementById("date").setAttribute("min", "2024-10-01");


  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const exp = {
      amount: document.getElementById("amount").value,
      category: document.getElementById("category").value,
      date: document.getElementById("date").value,
    };
    const arr = JSON.parse(localStorage.getItem("expenses")) || [];
    arr.push(exp);
    localStorage.setItem("expenses", JSON.stringify(arr));
    alert("Expense saved successfully!");
  });


  document.getElementById("addMore").addEventListener("click", () => {
    expenseForm.reset();
  });
}


// --- SUMMARY PAGE ---
const summaryTable = document.getElementById("summaryTable");
if (summaryTable) {
  const userInfo = document.getElementById("userInfo");
  if (savedUser) {
    userInfo.innerHTML = `<b>User:</b> ${savedUser.name} | <b>Role:</b> ${savedUser.role} | <b>Email:</b> ${savedUser.email}`;
  }


  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const tbody = summaryTable.querySelector("tbody");
  let total = 0;


  expenses.forEach((e) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${e.amount}</td><td>${e.category}</td><td>${e.date}</td>`;
    tbody.appendChild(row);
    total += parseFloat(e.amount);
  });


  document.getElementById("total").textContent = `Total Expense: ₹${total.toFixed(2)}`;
}


// --- Exit & Navigation ---
function exitApp() {
  alert("Exiting Application (data preserved in localStorage).");
  window.close();
}
function goHome() {
  window.location.href = "index.html";
}


