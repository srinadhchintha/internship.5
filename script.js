let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(button) {
  const card = button.parentElement;
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseFloat(card.dataset.price);
  const img = card.querySelector("img").src;

  cart.push({ id, name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Show Cart Items
if (document.getElementById("cart-items")) {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceEl.textContent = "";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price;

      const itemHTML = `
        <div class="product-card">
          <img src="${item.img}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <button class="btn" onclick="removeFromCart(${index})">Remove</button>
          <button class="btn" onclick="buyNow('${item.name}')">Buy Now</button>
        </div>
      `;
      cartItemsDiv.innerHTML += itemHTML;
    });

    totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function buyNow(productName) {
  // Show the modal
  document.getElementById("buyNowModal").style.display = "flex";

  // Store product name if you want to use it in thank you or receipt
  localStorage.setItem("lastOrdered", productName);
}

// Close modal on outside click
window.onclick = function (e) {
  const modal = document.getElementById("buyNowModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Handle checkout form submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;
      const payment = document.getElementById("paymentMethod").value;

      if (!name || !email || !address || !payment) {
        alert("Please fill in all fields.");
        return;
      }

      alert(`Thank you, ${name}! Your order has been placed successfully.`);
      localStorage.removeItem("cart");
      document.getElementById("buyNowModal").style.display = "none";
      location.reload(); // reload cart page
    });
  }
});


  renderCart();
}
