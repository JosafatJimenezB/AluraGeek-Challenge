//GET
const listaProductos = () =>
  fetch("https://db-alurageek.onrender.com/producto")
    .then((resposta) => resposta.json())
    .catch((error) => console.log(error));

const listarUnProducto = (id) => {
  return fetch(
    `https://db-alurageek.onrender.com/producto/producto/${id}`
  ).then((respuesta) => {
    return respuesta.json();
  });
};

//POST
const creaProdutos = (name, imageUrl, price) => {
  return fetch(`https://db-alurageek.onrender.com/producto/producto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      price,
    }),
  }).then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.body;
    }
    throw new Error("No fué posible crear un producto");
  });
};

// PUT/PATCH
const alteraProducto = async (id, name, price, description) => {
  return fetch(`https://db-alurageek.onrender.com/producto/producto/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      description,
    }),
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .catch((error) => console.log(error));
};

// DELETE
const deleteProducto = async (id) => {
  return await fetch(
    `https://db-alurageek.onrender.com/producto/producto/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const productoServices = {
  listaProductos,
  listarUnProducto,
  creaProdutos,
  alteraProducto,
  deleteProducto,
};
