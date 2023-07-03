let subir = document.getElementById("presentacion");
subir.innerHTML += "<h2>Bienvenidx, ingrese su nombre</h2>";

const formNombre = document.getElementById("formulario");
const nombre = document.getElementById("nombreUsuario");
const dni = document.getElementById("dniUsuario");
const boton = document.getElementById("btnEnvio");

const comida = document.getElementById("select-comida");
const bebida = document.getElementById("select-bebida");

const PRODUCTOS_COMIDAS = []
const PRODUCTOS_BEBIDAS =[]

const menu = async () => {
  try{
    const resultado = await fetch('./productos.json')
    const datos = await resultado.json();
    datos.comidas.forEach(e => {
      let objetos = {
        comida: e.comida,
        precio: e.precio
      }
      PRODUCTOS_COMIDAS.push(objetos)
      console.log(PRODUCTOS_COMIDAS)
    })
    datos.bebidas.forEach(e => {
      let objetos = {
        bebida: e.bebida,
        precio: e.precio
      }
      PRODUCTOS_BEBIDAS.push(objetos)
    });
    agregarOpcionesComidas()
    agregarOpcionesBebidas()
  }catch (error) {
    console.error("error,",error)
  }

}



const agregarOpcionesComidas = () => {
  const menu_comida = document.getElementById("select-comida")
  PRODUCTOS_COMIDAS.forEach((producto) => {
  const opcion = document.createElement('option')
  opcion.value = producto.precio
  opcion.textContent = producto.comida  
  menu_comida.appendChild(opcion)
  });
}

const agregarOpcionesBebidas = () => {
  const menu_bebida = document.getElementById("select-bebida")
  PRODUCTOS_BEBIDAS.forEach((producto) => {
    const opcion = document.createElement('option')
    opcion.value = producto.precio
    opcion.textContent = producto.bebida  
    menu_bebida.appendChild(opcion)
  });
}
function reconocerCliente() {
  let documento = dni.value
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === documento) {
      console.log("usuario ya registrado");
    } else {
      console.log("usuario nuevo");
    }
  }
}

nombre.onmousedown = () => {
  console.log("down");
};

nombre.onkeyup = () => {
  console.log("keyup");
};

formNombre.onsubmit = (e) => {
  e.preventDefault()
  let infoUsuario = e.target;
  let nombreUsuario = infoUsuario.querySelector("#nombreUsuario").value;
  let apellido = document.getElementById("apellidoUsuario").value;
  localStorage.setItem("nombre", nombreUsuario);

  let mensaje = localStorage.getItem("nombre");
  console.log(mensaje);

  const usuario = { id: 4, Nombre: nombreUsuario + " " + apellido };
  const enJSON = JSON.stringify(usuario);
  localStorage.setItem("usuario", enJSON);

  let parseado1 = JSON.parse(enJSON);
  localStorage.setItem("usuarioID", parseado1.id);

  let valorDni = dni.value;
  localStorage.setItem("D.N.I", valorDni);

  let valorComida = comida.value;
  localStorage.setItem("Comida", valorComida);

  let valorBebida = bebida.value;
  localStorage.setItem("Bebida", valorBebida);
};

boton.onclick = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Su pedido fue enviado',
    showConfirmButton: false,
    timer: 2500
  })

}


reconocerCliente();
menu()
