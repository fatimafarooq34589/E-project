document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutSection = document.getElementById('checkoutSection');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const checkoutForm = document.getElementById('checkoutForm');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalEl.textContent = 'Rs. 0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>Price: Rs. ${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}">
                    <button data-index="${index}" class="remove-btn">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalEl.textContent = `Rs. ${total}`;
        attachQuantityEvents();
        attachRemoveEvents();
    }

    function attachQuantityEvents() {
        const qtyInputs = document.querySelectorAll('.cart-item-actions input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                let val = parseInt(e.target.value);
                if (val < 1) val = 1;
                cart[index].quantity = val;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    function attachRemoveEvents() {
        const removeBtns = document.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        checkoutSection.style.display = 'block';
        window.scrollTo({ top: checkoutSection.offsetTop, behavior: 'smooth' });
    });

    // Checkout form submit
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customerName').value;
        const address = document.getElementById('customerAddress').value;
        const phone = document.getElementById('customerPhone').value;
        if (!name || !address || !phone) return;

        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        renderCart();

        // Show confirmation
        checkoutSection.style.display = 'none';
        orderConfirmation.style.display = 'block';
    });

    renderCart();
});
const goBackBtn = document.getElementById('goBackBtn');
if (goBackBtn) {
  goBackBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // ya jo tumhara home page ka path hai
  });
}
