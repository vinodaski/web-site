const product = [
  {id: 1, name:"TaTa salt", Image:"https://m.media-amazon.com/images/I/61T0qHpR6FL._AC_UL320_.jpg", price: 250},
  {id: 2, name:"selfie stick", Image:"https://m.media-amazon.com/images/I/61ZiuwP9xpL._AC_UY218_.jpg", price: 800},
  {id: 3, name:"fan", Image:"https://m.media-amazon.com/images/I/51kNHlJki9L._AC_UY218_.jpg", price: 12000},
  {id: 4, name:"rolex watch", Image:"https://m.media-amazon.com/images/I/71zqDrcg0pS._AC_UL320_.jpg", price: 100999},
  {id: 5, name:"Tv", Image:"https://m.media-amazon.com/images/I/717oSOB4hCL._AC_UY218_.jpg", price: 80000},
  {id: 6, name:"mobile", Image:"https://m.media-amazon.com/images/I/619oqSJVY5L._AC_UY218_.jpg", price: 105580},
  {id: 7, name:"Ear budos", Image:"https://m.media-amazon.com/images/I/41nuqDNy9mL._AC_SY200_.jpg", price: 5000},
]

// Render Products
function renderProducts(products, productList) {
  const container = document.getElementById(productList);
  container.innerHTML = "";
  products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");
      productDiv.innerHTML = `
          <img src="${product.Image}" alt="${product.name}"/>
          <h3>${product.name}</h3>
          <h2>${product.price}</h2>
          <button onclick="addToCart(${product.id})"> Add to cart</button>
      `;
      container.appendChild(productDiv);
  })
}

if (document.getElementById("productList")) renderProducts(product, "productList");

// Search functionality
function searchProducts(query) {
  const filteredProducts = product.filter(product =>
      product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  renderProducts(filteredProducts, "productList");
}

// Add Event Listener to Search Button
document.getElementById("searchButton")?.addEventListener("click", () => {
  const query = document.getElementById("productSearch").value;
  searchProducts(query);
});

// Sorting functionality
function sortProducts(criteria) {
  if (criteria === "price") {
      return product.sort((a, b) => a.price - b.price);
  }
  return product;
}

// Adding Event Listener for Sorting
document.getElementById("sortOptions")?.addEventListener("change", (event) => {
  const sortedProducts = sortProducts(event.target.value);
  renderProducts(sortedProducts, "productList");
});

// Add to Cart functionality
function addToCart(productId) {
  const products = product.find(p => p.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${products.name} is added to cart`);
  renderCart();
}

// Render items in Cart
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  if (cart.length === 0) {
      container.innerHTML = "<h1>Your Cart is Empty</h1>";
  }
  cart.forEach(item => {
      const cartDiv = document.createElement("div");
      cartDiv.classList.add("cart-item");
      cartDiv.innerHTML = `
          <img src="${item.Image}" alt="${item.name}"/>
          <h3>${item.name}</h3>
          <h2>${item.price}</h2>
          <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      container.appendChild(cartDiv);
  });
}

// Remove from Cart functionality
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // Re-render the cart after removing an item
}

// Initial Rendering of Products and Cart
if (document.getElementById("productList")) renderProducts(product, "productList");
if (document.getElementById("cartItems")) renderCart();
