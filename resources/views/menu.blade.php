<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Pergola</title>
    <!-- Enlace al archivo CSS -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body>
    <header>
        <div class="logo">
            <img src="{{ asset('images/logo.png') }}" alt="La Pergola Logo">
        </div>
        <nav>
            <button class="menu-toggle" aria-label="Abrir menú">
                ☰
            </button>
            <ul>
                <li><a href="#" id="haz-tu-pedido-btn">HAZ TU PEDIDO</a></li>
                <li><a href="#">CLUB La Pergola</a></li>
                <li><a href="#platos-principales" id="menu-btn">MENÚ</a></li>
                <li><a href="#">UBICACIONES</a></li>
                <li><a href="#">EVENTOS</a></li>
                <li><a href="#">ÚNETE A LA BANDA</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="section">
            <div class="section-title">NOSOTROS</div>
            <div class="section-content">
                <h2>¡Esto es La Pergola!</h2>
                <p>Nuestra historia comenzó con el deseo de crear un lugar especial, dando vida al primer La Pergola en un rincón de la ciudad. Desde el principio, nuestra pasión ha sido ofrecer más que comida: buscamos brindar una experiencia íntima y personal. Creemos que cada comida debe ser una celebración individual, por eso ofrecemos porciones diseñadas para uno y solo un tamaño de pizza. Esta elección refleja nuestro compromiso de proporcionar una experiencia personalizada, donde cada bocado resuena con el bienestar y la satisfacción personal.</p>
            </div>
        </section>

        <section class="menu-section">
            <h2>Categorías del Menú</h2>
            <div class="menu-categories">
                <button class="category-btn" id="entradas-btn" data-category="entradas">Entradas</button>
                <button class="category-btn" id="platos-principales-btn" data-category="platos-principales">Platos Principales</button>
                <button class="category-btn" id="bebidas-btn" data-category="bebidas">Bebidas</button>
                <button class="category-btn" id="postres-btn" data-category="postres">Postres</button>
            </div>
            <div class="menu-items" id="menu-items">
              
            </div>
        </section>

        <section id="platos-principales" class="menu-section">
            <h2>Platos Principales</h2>
            <div class="menu-items" id="menu-items-principales">
              <!-- Los elementos de los platos principales se cargarán aquí mediante JavaScript -->
            </div>
        </section>

        <section class="cart-section">
            <h2>Tu Carrito</h2>
            <div id="cart-items">
            </div>
            <div class="cart-total">
                <p>Total: $<span id="cart-total">0.00</span></p>
            </div>

            <!-- Aquí agregamos el formulario para capturar los datos del cliente -->
            <div class="customer-info">
                <h3>Datos del Cliente</h3>
                <form id="customer-form">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="phone">Teléfono:</label>
                    <input type="tel" id="phone" name="phone" required>

                    <label for="address">Dirección:</label>
                    <input type="text" id="address" name="address" required>
                </form>
            </div>
            
            <!-- Botón para realizar el pedido -->
            <button id="checkout-btn">Realizar Pedido</button>
        </section>
        


    </main>

    <footer>
        <section class="team-section">
            <h2>Equipo Desarrollador</h2>
            <ul>
                <li>David Orozco</li>
                <li>Anthony Nope</li>
                <li>Gabriel Gonzalez</li>
            </ul>
        </section>
        <p>&copy; 1979 La Pergola. Todos los derechos reservados.</p>
    </footer>

    <!-- Enlace al archivo JS -->
    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>