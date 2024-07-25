// JavaScript para manejar el modal de productos y añadir al carrito
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('#productoModal .producto .btn');
    const viewCartButton = document.getElementById('view-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Eliminar</button>`;
            cartItemsContainer.appendChild(li);
            total += item.price;
        });

        cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
        setupRemoveItemButtons();
    }

    function setupRemoveItemButtons() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.producto');
            const name = product.querySelector('h3').innerText;
            const price = parseFloat(product.querySelector('span').innerText.replace('$', ''));

            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));

            // Uso de SweetAlert para notificar al usuario
            swal({
                title: "Producto añadido",
                text: `${name} ha sido añadido al carrito.`,
                icon: "success",
                button: "Aceptar",
            });
        });
    });

    viewCartButton.addEventListener('click', () => {
        $('#productoModal').modal('hide');
        $('#carritoModal').modal('show');
        updateCartDisplay();
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        updateCartDisplay();
    });

    updateCartDisplay();
});
