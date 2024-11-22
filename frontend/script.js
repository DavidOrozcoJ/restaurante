document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const menuItemsContainer = document.getElementById("menu-items");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const ordersList = document.getElementById("orders-list");

    // Función para obtener el menú del backend
    async function fetchMenu(category) {
        const response = await fetch("http://localhost:3000/api/menu");
        const data = await response.json();
        displayMenuItems(data[category]);
    }

    // Mostrar los elementos del menú
    function displayMenuItems(items) {
        menuItemsContainer.innerHTML = "";
        items.forEach(item => {
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

    // Funciones del carrito
    function addToCart(item) {
        cart.push(item);
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
                cart.splice(index, 1);
                updateCart();
            });
            cartItemsContainer.appendChild(cartItemDiv);
        });
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    // Función para realizar el pedido
    document.getElementById("checkout-btn").addEventListener("click", async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        const pedido = {
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price, 0),
            cliente: {
                nombre: prompt("Ingrese su nombre:"),
                telefono: prompt("Ingrese su teléfono:")
            }
        };

        const response = await fetch("http://localhost:3000/api/pedido", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            alert("Pedido realizado con éxito!");
            cart.length = 0;
            updateCart();
        } else {
            alert("Hubo un error al realizar el pedido.");
        }
    });

    // Autenticación básica
    document.getElementById("submit-login-btn").addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            alert("Inicio de sesión exitoso");
            document.getElementById("login-section").style.display = "none";
            document.getElementById("admin-section").style.display = "block";
            fetchPedidos();
        } else {
            alert("Credenciales incorrectas");
        }
    });

    // Obtener los pedidos del backend
    async function fetchPedidos() {
        const response = await fetch("http://localhost:3000/api/pedidos");
        const pedidos = await response.json();
        ordersList.innerHTML = pedidos.map(pedido => `
            <div>
                <h3>Pedido #${pedido.id}</h3>
                <p>Cliente: ${pedido.cliente.nombre}</p>
                <p>Total: $${pedido.total.toFixed(2)}</p>
                <p>Estado: ${pedido.estado}</p>
                <button onclick="actualizarEstado(${pedido.id})">Marcar como Atendido</button>
            </div>
        `).join("");
    }

    // Actualizar estado del pedido
    window.actualizarEstado = async (id) => {
        await fetch(`http://localhost:3000/api/pedido/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "atendido" })
        });
        alert("Estado del pedido actualizado");
        fetchPedidos();
    };
});
