document.addEventListener("DOMContentLoaded", () => {
    const menuItems = {
        entradas: [
            { name: "Ensalada César", price: 5.99 },
            { name: "Sopa de Tomate", price: 4.99 },
        ],
        "platos-principales": [
            { name: "Pasta Alfredo", price: 12.99 },
            { name: "Bistec", price: 15.99 },
        ],
        bebidas: [
            { name: "Coca-Cola", price: 1.99 },
            { name: "Agua Mineral", price: 1.49 },
        ],
        postres: [
            { name: "Cheesecake", price: 3.99 },
            { name: "Brownie", price: 3.49 },
        ]
    };

    const cart = [];
    const menuItemsContainer = document.getElementById("menu-items");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            displayMenuItems(category);
        });
    });

    function displayMenuItems(category) {
        menuItemsContainer.innerHTML = "";
        menuItems[category].forEach(item => {
            const menuItemDiv = document.createElement("div");
            menuItemDiv.classList.add("menu-item");
            menuItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>Precio: $${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn">Agregar al Carrito</button>
            `;
            menuItemDiv.querySelector(".add-to-cart-btn").addEventListener("click", () => {
                addToCart(item);
            });
            menuItemsContainer.appendChild(menuItemDiv);
        });
    }

    function addToCart(item) {
        cart.push(item);
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button class="remove-from-cart-btn">Eliminar</button>
            `;
            cartItemDiv.querySelector(".remove-from-cart-btn").addEventListener("click", () => {
                removeFromCart(index);
            });
            cartItemsContainer.appendChild(cartItemDiv);
        });
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    document.getElementById("checkout-btn").addEventListener("click", () => {
        alert("Pedido realizado con éxito!");
        // Aquí puedes enviar el pedido a un servidor si fuera necesario.
    });
});

