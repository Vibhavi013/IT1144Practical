let cart = [];

function saveCart() {
    localStorage.setItem('trendyShopCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('trendyShopCart');
    if (saved) {
        cart = JSON.parse(saved);
    } else {
        cart = [];
    }
}

function updateCart() {
    const count = document.getElementById('cartCount');
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    const footerTotal = document.getElementById('footerTotal');
    const checkoutList = document.getElementById('checkoutList');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (count) count.textContent = cart.length;

    if (cartList) {
        if (cart.length === 0) {
            cartList.innerHTML = '<li class="empty">Your cart is empty</li>';
        } else {
            let html = '';
            cart.forEach((item, index) => {
                html += `
                    <li>
                        <span>${item.name} <strong>$${item.price.toFixed(2)}</strong></span>
                        <button class="remove-btn" data-index="${index}">✕</button>
                    </li>
                `;
            });
            cartList.innerHTML = html;

            cartList.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const i = parseInt(this.dataset.index);
                    cart.splice(i, 1);
                    saveCart();
                    updateCart();
                });
            });
        }
    }

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (footerTotal) footerTotal.textContent = total.toFixed(2);

    if (checkoutList) {
        if (cart.length === 0) {
            checkoutList.innerHTML = '<li>Your cart is empty</li>';
        } else {
            let html = '';
            cart.forEach(item => {
                html += `
                    <li>
                        <span>${item.name}</span>
                        <span>$${item.price.toFixed(2)}</span>
                    </li>
                `;
            });
            checkoutList.innerHTML = html;
        }
    }

    if (checkoutTotal) checkoutTotal.textContent = total.toFixed(2);
}

function openCart() {
    document.getElementById('cartModal').classList.add('open');
    updateCart();
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('open');
}

function goToCheckout() {
    closeCart();
    window.location.href = 'checkout.html';
}

function placeOrder(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    alert('Order placed successfully! Total: $' + total.toFixed(2));
    cart = [];
    saveCart();
    updateCart();
    document.getElementById('orderForm').reset();
    window.location.href = 'index.html';
}

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('trendyShopTheme', 'dark');
        themeBtn.textContent = '☀️ Light';
    } else {
        localStorage.setItem('trendyShopTheme', 'light');
        themeBtn.textContent = '🌙 Dark';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('trendyShopTheme');
    const themeBtn = document.getElementById('themeBtn');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '☀️ Light';
    } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.textContent = '🌙 Dark';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    loadTheme();
    updateCart();

    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            cart.push({ name, price });
            saveCart();
            updateCart();

            const original = this.textContent;
            this.textContent = '✓ added';
            setTimeout(() => { this.textContent = original; }, 700);
        });
    });

    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeCart();
        });
    }
});