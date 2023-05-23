import { productoServices } from "../servicios/producto-servicios.js";
import { formatPrice } from "../formatterPrices.js";

const getProducts = (name, price, imageUrl, id) => {
  const card = document.createElement("div");

  const contenido = `
    <div class="producto">
        <div class="container">
            <button class="buttonDelete" type="button">
            <i class="fa-sharp fa-solid fa-trash"></i>
            </button>
            
            <a href="edit-product.html?id=${id}">
            
              <button class="buttonEdit" type="button">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            
            </a>
        </div>
        
        <img src="${imageUrl}" class="producto-img" alt="img">
        <h1 class="product-name"> ${name} </h1>
        <p class="precio">${formatPrice(price)}</p>
    </div>
    `;
  card.innerHTML = contenido;
  card.dataset.id = id;
  return card;
};

const productos = document.querySelector("[data-allProducts]");

productos.addEventListener("click", async (evento) => {
  let deleteButton = evento.target.className === "deleteImage";
  if (deleteButton) {
    const producto = evento.target.closest("[data-id]");
    let id = producto.dataset.id;
    productoServices
      .deleteProducto(id)
      .then((res) => {
        producto.remove();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
});

const render = async () => {
  try {
    const listaProductos = await productoServices.listaProductos();

    listaProductos.forEach((producto) => {
      productos.appendChild(
        getProducts(
          producto.name,
          producto.price,
          producto.imageUrl,
          producto.id
        )
      );
    });
  } catch (err) {
    console.log(err);
  }
};

render();
