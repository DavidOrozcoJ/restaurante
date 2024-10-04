document.addEventListener("DOMContentLoaded", () => {
    const menuItemsContainer = document.getElementById("menu-items");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    let cart = [];

    // URL de la API de Google Sheets
    const apiURL = 'https://script.google.com/macros/s/AKfycbwFpvkvT3Mah5n6a8r5-i_kNvF2YgIAhNuUJyhZGkNHAYlh4tE1pE7avvAveIlMH25L6g/exec';

    // Función para cargar productos desde Google Sheets
    function loadMenuItems(category = 'platos-principales') {  
        // Realizar la solicitud GET a la API
        fetch(apiURL)
            .then(response => response.json()) // Parsear la respuesta a formato JSON
            .then(data => {
                const menuItems = data.data; // Obtener los productos del JSON
                displayMenuItems(menuItems, category); // Mostrar productos por categoría
            })
            .catch(error => console.error('Error al cargar los productos:', error)); // Manejo de errores
    }

    // Función para mostrar productos filtrados por categoría
    function displayMenuItems(menuItems, category) {
        menuItemsContainer.innerHTML = "";  // Limpiar el contenedor de productos
        let filteredItems = menuItems.filter(item => item.category === category);  // Filtrar por categoría

        if (filteredItems.length === 0) {
            // Si no hay productos en la categoría seleccionada, mostrar un mensaje
            menuItemsContainer.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
        } else {
            // Si hay productos, los mostramos uno por uno
            filteredItems.forEach(item => {
                const menuItemDiv = document.createElement("div");
                menuItemDiv.classList.add("menu-item");
                menuItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Precio: $${parseFloat(item.price).toFixed(2)}</p>
                    <button class="add-to-cart-btn">Agregar al Carrito</button>
                `;
                // Agregar evento para añadir el producto al carrito
                menuItemDiv.querySelector(".add-to-cart-btn").addEventListener("click", () => {
                    addToCart(item); // Llamar a la función para añadir el producto al carrito
                });
                menuItemsContainer.appendChild(menuItemDiv); // Añadir el producto al contenedor de productos
            });
        }
    }

    // Función para agregar productos al carrito
    function addToCart(item) {
        // Verificar si el producto ya está en el carrito
        let found = false;
        cart.forEach(cartItem => {
            if (cartItem.name === item.name) {
                // Si el producto ya está en el carrito, aumentar su cantidad
                cartItem.quantity += 1;
                found = true;
            }
        });

        // Si el producto no está en el carrito, lo añadimos con cantidad = 1
        if (!found) {
            item.quantity = 1;
            cart.push(item);
        }

        updateCart(); // Actualizar la visualización del carrito
    }

    // Función para eliminar productos del carrito
    function removeFromCart(index) {
        // Eliminar el producto seleccionado del carrito
        cart.splice(index, 1);
        updateCart(); // Actualizar el carrito después de eliminar
    }

    // Función para actualizar el carrito visualmente
    function updateCart() {
        cartItemsContainer.innerHTML = "";  // Limpiar el contenedor del carrito
        let total = 0;

        if (cart.length === 0) {
            // Si el carrito está vacío, mostramos un mensaje
            cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
        } else {
            // Si hay productos en el carrito, los mostramos con su cantidad
            cart.forEach((item, index) => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                let itemTotal = item.price * item.quantity; // Calcular el total por producto
                total += itemTotal; // Sumar al total general del carrito
                cartItemDiv.innerHTML = `
                    <p>${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}</p>
                    <button class="remove-from-cart-btn">Eliminar</button>
                `;
                // Agregar evento para eliminar el producto del carrito
                cartItemDiv.querySelector(".remove-from-cart-btn").addEventListener("click", () => {
                    removeFromCart(index);
                });
                cartItemsContainer.appendChild(cartItemDiv); // Añadir el producto al contenedor del carrito
            });
        }
        // Actualizar el total del carrito
        cartTotal.textContent = total.toFixed(2);
    }

    // Evento para capturar los datos del formulario y el carrito al hacer clic en "Realizar Pedido"
    checkoutBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón

        // Capturar los datos del cliente desde el formulario
        const customerName = document.getElementById("name").value;
        const customerPhone = document.getElementById("phone").value;
        const customerAddress = document.getElementById("address").value;

        // Verificar que los campos de datos del cliente no estén vacíos y que haya productos en el carrito
        if (!customerName || !customerPhone || !customerAddress || cart.length === 0) {
            alert("Por favor, completa todos los campos y añade productos al carrito.");
            return;
        }

        // Preparar los datos del pedido en formato JSON
        const orderData = {
            customer: {
                name: customerName,
                phone: customerPhone,
                address: customerAddress
            },
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: parseFloat(cartTotal.textContent)
        };

        // Enviar los datos del pedido mediante POST a la misma URL
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData), // Enviar el pedido en formato JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Pedido realizado:', data);
            alert("Pedido realizado con éxito.");
            cart = [];  // Limpiar el carrito
            updateCart();  // Actualizar el carrito vacío
        })
        .catch((error) => {
            console.error('Error al realizar el pedido:', error);
        });
    });

    // Evento para ir al carrito cuando se hace clic en "HAZ TU PEDIDO"
    document.getElementById('haz-tu-pedido-btn').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('cart-items').scrollIntoView({ behavior: 'smooth' });
    });

    // Evento para mostrar el menú de platos principales
    document.getElementById('menu-btn').addEventListener('click', (event) => {
        event.preventDefault();
        loadMenuItems('platos-principales');  // Mostrar los platos principales
        document.getElementById('platos-principales').scrollIntoView({ behavior: 'smooth' });
    });

    // Cargar los productos cuando se selecciona una categoría
    document.getElementById('entradas-btn').addEventListener('click', () => {
        loadMenuItems('entradas');  // Mostrar entradas
    });
    document.getElementById('platos-principales-btn').addEventListener('click', () => {
        loadMenuItems('platos-principales');  // Mostrar platos principales
    });
    document.getElementById('bebidas-btn').addEventListener('click', () => {
        loadMenuItems('bebidas');  // Mostrar bebidas
    });
    document.getElementById('postres-btn').addEventListener('click', () => {
        loadMenuItems('postres');  // Mostrar postres
    });

    // Cargar productos por defecto al iniciar la página (platos principales)
    loadMenuItems();
});
