document.addEventListener("DOMContentLoaded", () => {
    const menuItems = {
        entradas: [
            { name: "Ensalada César", price: 5.99, image: "/imagenes/Pizza/ensalada cesar.png" },
            { name: "Sopa de Tomate", price: 4.99, image: "/imagenes/Pizza/Sopa de tomate.png" },
        ],
        "platos-principales": [
            { name: "BBQ y Tocineta", price: 14.99, image: "/imagenes/Pizza/Bacon & BBQ.png" },
            { name: "Pollo y Piña", price: 15.99, image: "/imagenes/Pizza/chiken & pineapple.png" },
            { name: "Salchicha y Tocineta", price: 16.99, image: "/imagenes/Pizza/Bacon & sausage.png" },
            { name: "Jamon y cangrejo", price: 16.99, image: "/imagenes/Pizza/Ham and Crab stick.png" },
            { name: "Hawaiana", price: 15.99, image: "/imagenes/Pizza/Hawaiian.png" },
            { name: "Margarita", price: 13.99, image: "/imagenes/Pizza/magherita.png" },
            { name: "Pepperoni", price: 13.99, image: "/imagenes/Pizza/Pepporoni.png" },
            { name: "Puerco deluxe", price: 18.99, image: "/imagenes/Pizza/Pork deluxe.png" },
            { name: "Marina", price: 19.99, image: "/imagenes/Pizza/Super Seafood.png" },
            { name: "Vegana", price: 20.99, image: "/imagenes/Pizza/Veggie.png" },
            { name: "Coreana", price: 17.99, image: "/imagenes/Pizza/Tom Yung goon.png" },
        ],
        bebidas: [
            { name: "Coca-Cola", price: 1.99, image: "/imagenes/Pizza/coca.png" },
            { name: "Agua Mineral", price: 1.49, image: "/imagenes/Pizza/agua.png" },
        ],
        postres: [
            { name: "Cheesecake", price: 3.99, image: "/imagenes/Pizza/cheesecake.png" },
            { name: "Brownie", price: 3.49, image: "/imagenes/Pizza/brownie.png" },
        ]
    };

    const cart = [];
    const menuItemsContainer = document.getElementById("menu-items");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function displayMenuItems(category) {
        menuItemsContainer.innerHTML = "";
        menuItems[category].forEach(item => {
            const menuItemDiv = document.createElement("div");
            menuItemDiv.classList.add("menu-item");
            menuItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
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

    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            displayMenuItems(category);
        });
    });

    document.getElementById("menu-btn").addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        displayMenuItems("platos-principales");
        document.getElementById("platos-principales").scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('haz-tu-pedido-btn').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('cart-items').scrollIntoView({ behavior: 'smooth' });
    });
    

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
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
    
});
