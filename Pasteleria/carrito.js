// ============================================
// CARGAR CARRITO
// ============================================
console.log("carrito.js funcionando");
let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// ============================================
// BOTONES "AGREGAR AL CARRITO"
// ============================================

const botonesAgregar =
    document.querySelectorAll(".btn-agregar");


botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const tarjeta =
            boton.closest(".producto");


        const codigo =
            tarjeta.querySelector(".codigo").textContent;


        const nombre =
            tarjeta.querySelector("h3").textContent;


        const precioTexto =
            tarjeta.querySelector(".precio").textContent;


        const precio =
            Number(precioTexto.replace(/\D/g, ""));

        const imagen =
            tarjeta.querySelector("img").src;


        const productoExistente =
            carrito.find(function (producto) {

                return producto.codigo === codigo;

            });


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            const producto = {

                codigo: codigo,
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad: 1

            };


            carrito.push(producto);

        }


        guardarCarrito();

        actualizarCantidadCarrito();

    });

});


// ============================================
// GUARDAR CARRITO
// ============================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// ============================================
// ACTUALIZAR NÚMERO DEL NAVBAR
// ============================================

function actualizarCantidadCarrito() {

    const cantidadCarrito =
        document.querySelector("#cantidad-carrito");


    if (cantidadCarrito) {

        let cantidadTotal = 0;


        carrito.forEach(function (producto) {

            cantidadTotal += producto.cantidad;

        });


        cantidadCarrito.textContent =
            cantidadTotal;

    }

}


// ============================================
// MOSTRAR PRODUCTOS EN carrito.html
// ============================================

function mostrarCarrito() {

    const contenedor =
        document.querySelector("#productos-carrito");


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    // CARRITO VACÍO
    if (carrito.length === 0) {

        contenedor.innerHTML =
            "<p>Tu carrito está vacío.</p>";

        actualizarTotal();

        return;
    }


    // MOSTRAR PRODUCTOS
    carrito.forEach(function (producto) {

        const productoHTML =
            document.createElement("div");


        productoHTML.classList.add("producto-carrito");


        productoHTML.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="imagen-carrito"
            >


            <div class="info-carrito">

                <h3>
                    ${producto.nombre}
                </h3>


                <p>
                    Código: ${producto.codigo}
                </p>


                <p>
                    Precio:
                    $${producto.precio.toLocaleString("es-CL")}
                </p>


                <div class="cantidad-producto">

                    <button
                        class="btn btn-cantidad"
                        onclick="disminuirCantidad('${producto.codigo}')"
                    >
                        −
                    </button>


                    <span>
                        ${producto.cantidad}
                    </span>


                    <button
                        class="btn btn-cantidad"
                        onclick="aumentarCantidad('${producto.codigo}')"
                    >
                        +
                    </button>

                </div>


                <p class="subtotal">

                    Subtotal:

                    $${(
                        producto.precio *
                        producto.cantidad
                    ).toLocaleString("es-CL")}

                </p>


                <button
                    class="btn btn-eliminar"
                    onclick="eliminarProducto('${producto.codigo}')"
                >
                    Eliminar
                </button>

            </div>
        `;


        contenedor.appendChild(productoHTML);

    });


    actualizarTotal();
}
function aumentarCantidad(codigo) {

    const producto =
        carrito.find(function (producto) {

            return producto.codigo === codigo;

        });


    if (producto) {

        producto.cantidad++;

        guardarCarrito();

        mostrarCarrito();

        actualizarCantidadCarrito();

    }
}
function disminuirCantidad(codigo) {

    const producto =
        carrito.find(function (producto) {

            return producto.codigo === codigo;

        });


    if (producto && producto.cantidad > 1) {

        producto.cantidad--;

        guardarCarrito();

        mostrarCarrito();

        actualizarCantidadCarrito();

    }
}
function eliminarProducto(codigo) {

    carrito = carrito.filter(function (producto) {

        return producto.codigo !== codigo;

    });


    guardarCarrito();

    mostrarCarrito();

    actualizarCantidadCarrito();
}

// ============================================
// CALCULAR TOTAL
// ============================================

function actualizarTotal() {

    const totalCarrito =
        document.querySelector("#total-carrito");


    if (!totalCarrito) {
        return;
    }


    let total = 0;


    carrito.forEach(function (producto) {

        total +=
            producto.precio *
            producto.cantidad;

    });


    totalCarrito.textContent =
        "$" + total.toLocaleString("es-CL");

}


// ============================================
// EJECUTAR AL CARGAR LA PÁGINA
// ============================================

actualizarCantidadCarrito();

mostrarCarrito();