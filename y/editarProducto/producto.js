document.addEventListener('DOMContentLoaded', () => {
    const productImage = document.getElementById('productImage');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const editImageButton = document.getElementById('editImageButton');
    const editDescriptionButton = document.getElementById('editDescriptionButton');
    const editPriceButton = document.getElementById('editPriceButton');
    const updateImageButton = document.getElementById('updateImageButton');
    const updateDescriptionButton = document.getElementById('updateDescriptionButton');
    const updatePriceButton = document.getElementById('updatePriceButton');
    const volver = document.getElementById('volver');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    localStorage.setItem('productId', productId);

    // Obtener los datos del producto desde el servidor y actualizar la página
    fetch(`https://matiasgasparg1.pythonanywhere.com/producto/${productId}`)
        .then(response => response.json())
        .then(productData => {
            productData.imagenes.forEach(imageUrl => {
                const imageElement = document.createElement('img');
                imageElement.onload = function() {
                    // Reducir el tamaño a 150x150 píxeles
                    this.width = 250;
                    this.height = 250;
                };
                imageElement.src = imageUrl;
                imageContainer.appendChild(imageElement);

            // Actualiza los valores en la página con los datos obtenidos del servidor
            productDescription.textContent = productData.descripcion;
            productPrice.textContent = `$${productData.precio}`;
        });
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
            // Manejo de errores aquí (por ejemplo, mostrar un mensaje al usuario)
        });

    // Abre el modal cuando se hace clic en el botón de edición de imagen
    editImageButton.addEventListener('click', () => {
        imageModal.style.display = 'block';
    });

    // Cierra el modal cuando se hace clic en la "X"
    closeModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    // Event listener para la edición de la descripción del producto
    editDescriptionButton.addEventListener('click', () => {
        const newDescription = prompt('Ingrese la nueva descripción del producto:');
        if (newDescription !== null) {
            updateProductField('descripcion', newDescription);
        }
    });

    // Event listener para la edición del precio del producto
    editPriceButton.addEventListener('click', () => {
        const newPrice = prompt('Ingrese el nuevo precio del producto:');
        if (newPrice !== null) {
            updateProductField('precio', newPrice);
        }
    });

    // Función para actualizar un campo del producto en el servidor
    function updateProductField(field, value) {
        const url = `https://matiasgasparg1.pythonanywhere.com/producto/${productId}`;
        const data = {
            field: field,
            value: value
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result); // Agrega este console.log para ver la respuesta del servidor
            if (result.message.includes('actualizado exitosamente')) {
                alert('Producto actualizado exitosamente.');
                location.reload(); // Recargar la página para mostrar los cambios actualizados
            } else {
                alert('Error al actualizar producto.');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud. Consulta la consola para más detalles.');
        });
    }

    volver.addEventListener('click', () => {
        location.href = '../index.html';
    });
});
