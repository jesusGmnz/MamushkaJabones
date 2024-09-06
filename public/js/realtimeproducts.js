const socketClient = io()

socketClient.on("enviodeproducts", (obj) => {
    updateProductList(obj)
})


function updateProductList(productList) {

    const productsDiv = document.getElementById('list-products')

    let productosHTML = "";

    productList.forEach((product) => {
        productosHTML += `<div class="inicio-productos contenedor">
            <div class="contenedor-inicio-producto">
                    <div class="oferta-1">
                        <h4 class="card-title text-white">${product.title}</h4>
                        <ul class="card-text">
                            <li>code: ${product.code}</li>
                            <li>id: ${product._id}</li>
                            <li>description: ${product.description}</li>
                            <li>price: $${product.price}</li>
                            <li>category: ${product.category}</li>
                            <li>status: ${product.status}</li>
                            <li>stock: ${product.stock}</li>
                        thumbnail: <img src="${product.thumbnail}" alt="img" class="img-thumbnail img-fluid">        
                        </ul>
                        <button type="button" class="btn" onclick="deleteProduct('${String(product._id)}')">Eliminar</button>
                    </div>
            </div>
    </div>
</div>`;
});

    productsDiv.innerHTML = productosHTML;
}


let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked; // Obtén el valor del checkbox

    socketClient.emit("addProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
        status, // Agrega el campo status al objeto enviado al servidor

    });

    form.reset();
});



//para eliminar por ID
document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = deleteidinput.value;
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
})



//para eliminar el producto directamente 
function deleteProduct(productId) {
    socketClient.emit("deleteProduct", productId);
}