// 🛍 Quick Shop Popup Functionality
const quickShopBtns = document.querySelectorAll('.quick-shop');
const popupOverlay = document.querySelector('.popup-overlay');
const closePopup = document.getElementById('closePopup');

const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupName');
const popupPrice = document.getElementById('popupPrice');
const popupOldPrice = document.getElementById('popupCutPrice');
const popupDesc = document.getElementById('popupDesc');
const popupQty = document.getElementById('popupQty');
const popupSize = document.getElementById('popupSize');

let basePrice = 0;
let oldPrice = 0;

// 🟢 Open Popup
quickShopBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card-container');

    // 🔹 Card elements se data lena
    const imgElement = card.querySelector("img");
    const nameElement = card.querySelector("h4");
    const descElement = card.querySelector("p");

    // 🔹 Popup me content set karna
    popupImg.src = imgElement.src;
    popupTitle.textContent = nameElement.textContent;
    popupDesc.textContent = descElement.textContent;

    // 🔹 Set base price from card dataset if exists
    basePrice = parseInt(card.dataset.price) || 999;
    oldPrice = parseInt(card.dataset.oldPrice) || 1200;

    popupQty.value = 1;       // Reset quantity
    popupSize.value = "1kg";  // Default size

    updatePrice(); // Initial price update
    popupOverlay.style.display = 'flex';
  });
});

// ❌ Close Popup
closePopup.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
});
if(popupOverlay){
  popupOverlay.addEventListener('click', (e) => {
    if(e.target === popupOverlay) popupOverlay.style.display = 'none';
  });
}

// ➕➖ Quantity & Size change price update
function updatePrice(){
  const qty = parseInt(popupQty.value) || 1;
  const size = popupSize.value;

  let sizeFactor = 1;
  if(size === "250g") sizeFactor = 0.25;
  else if(size === "500g") sizeFactor = 0.5;
  else if(size === "1kg") sizeFactor = 1;

  const newPrice = Math.round(basePrice * sizeFactor * qty);
  const newOldPrice = oldPrice ? Math.round(oldPrice * sizeFactor * qty) : 0;

  popupPrice.textContent = `Rs. ${newPrice}`;
  popupOldPrice.textContent = newOldPrice ? `Rs. ${newOldPrice}` : '';
}

popupQty.addEventListener('input', updatePrice);
popupSize.addEventListener('change', updatePrice);

// 🛒 Add to Cart
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.getElementById('addToCartBtn');

  addToCartBtn.addEventListener('click', () => {
    const name = popupTitle.textContent;
    const image = popupImg.src;
    const description = popupDesc.textContent;

    const priceText = popupPrice.textContent;
    const price = parseInt(priceText.replace('Rs. ', '').trim());

    const quantity = parseInt(popupQty.value);
    const size = popupSize.value;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if same product + size already exists
    const existingIndex = cart.findIndex(item => item.name === name && item.size === size);
    if(existingIndex >= 0){
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ name, image, description, price, quantity, size });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} ${size} ${name} added to cart!`);

    popupOverlay.style.display = 'none';
  });
});
