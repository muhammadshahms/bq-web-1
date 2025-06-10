// Register
function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  localStorage.setItem("user_" + username, password);
  alert("Registered successfully!");
  window.location.href = "login.html";
}

// Login
function loginUser(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const storedPass = localStorage.getItem("user_" + username);
  if (storedPass === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

// Cart
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  let total = 0;
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "bg-white p-4 shadow rounded flex justify-between items-center";
    div.innerHTML = `
      <div>
        <h3 class="font-bold">${item.name}</h3>
        <p>$${item.price}</p>
      </div>
      <button onclick="removeFromCart(${index})" class="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Load cart on cart.html
if (document.location.pathname.includes("cart.html")) {
  loadCart();
}
