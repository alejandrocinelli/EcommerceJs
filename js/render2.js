const lista = document.getElementById('render')

const pedirData = async () => {
  const resp = await fetch('/js/data.json')
  const data = await resp.json()

  let htmlRend = ""
  data.forEach(product => {
    htmlRend += `
    <style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      
      .container {
        padding: 10px 10px;
        margin: 50px 50px;
        margin-left: 50px;
        margin-right: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .containerBelleza {
        min-height: 100vh;
       /* display: flex;*/
        display: inline-block;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      
      }
      
      .containerBelleza .cardbell {
        position: relative;
        width: 300px;
        height: 750px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        margin: 30px;
        border-radius: 10px;
        overflow: hidden;
      
      
      }
      
      .containerBelleza .cardbell .imgBox img {
      
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .containerBelleza .cardbell .contentBox {
        bottom: 0;
        padding: 20px;
        text-align: center;
      
      }
      
      .containerBelleza .cardbell .contentBox p {
        text-align: center;
        padding: 0px 0 5px 0;
      
      }
      
      .containerBelleza .cardbell .contentBox button {
        background-color: rgb(255, 255, 254);
        text-decoration: none;
        display: inline-block;
        color: #111;
        border: 1px solid;
        padding: 5px 15px;
        border-radius: 5px;
        transition: 0.3s;
      }
      
      .containerBelleza .cardbell .contentBox button:hover:hover {
        background-color: #007bff;
        color: white;
        border: 1px solid black;
      }
        }
      </style>
    <div class="containerBelleza">
            <div class="cardbell">
              <div class="imgBox">
                <img src="${product.img}" alt=""></div>
    
    
              <div class="contentBox">
                <h2> ${product.name} </h2>
                <P> ${product.descripcion}
                </P>
                <p class="price"> $ ${product.price} </p>
                <button class="addCart" id=" ${product.id} ">Comprar</button>
              </div>
            </div>
    
          </div>
    
    `
  })
  lista.innerHTML = htmlRend
}

function AddProduct() {

  const btnAddCarts = document.querySelectorAll('.addCart')
  btnAddCarts.forEach((addtocartboton) => { 
    addtocartboton.addEventListener('click', addtocartclicked)

  });

  function addtocartclicked(event) {
    const button = event.target.id;
    
    const product = CARTJSON.find(p => p.id == button)

    const productInCart = CART.find(p => p.id == button)


    if (productInCart) {
      productInCart.add()
    } else {
      const productCart = new ProductCart(product)
      CART.push(productCart)
    }

    swal("Usted Agrego un nuevo Articulo al carrito");

    showProductCarts()

  }
}

function plusCart() {


  let buttonPlusCart = document.getElementsByClassName("sumar btn btn-outline-danger btn-sm")

  for (const deleteFromCart of buttonPlusCart) {

    deleteFromCart.addEventListener('click', plusCartEvent)
  }


  function plusCartEvent(event) {

    const buttonPlusCartEvent = parseInt(event.target.id.split('-')[1])

    const InCartP = () => {
      const InCart = CART.find(p => p.id == buttonPlusCartEvent)
      InCart.add()
      showProductCarts()
    }
    InCartP()

  }

}

function minusCart() {

  let buttonPlusCart = document.getElementsByClassName("eliminar btn btn-outline-danger btn-sm")

  for (const deleteFromCart of buttonPlusCart) {

    deleteFromCart.addEventListener('click', minusCartEvent) 
  }

  function minusCartEvent(event) {

    const buttonMinusCartEvent = parseInt(event.target.id.split('-')[1])


    const InCartM = () => {
      const InCart = CART.find(p => p.id == buttonMinusCartEvent)

      InCart.rest()

      showProductCarts()
    }
    InCartM()

  }
}

const showProductCarts = () => {
  const divCart = document.getElementById("tbody")
  let htmlListProducts = ""

  const Ver = CART.find(p => p.quantity == 0)
  if (Ver) {
    let idx0 = CART.indexOf(Ver)

    CART.splice(idx0, 1)

  }


  CART.forEach(product => {
    htmlListProducts += `

        <tr>
        <td> ${product.id}</td>
        <td>${product.name}</td>
        <td>${product.unit_price}</td>
        <td> ${product.quantity} </td>
        <td> ${product.total}  </td>
        <td><button class="eliminar btn btn-outline-danger btn-sm" data-index-number=="" id="d-${product.id}"> - </button>
        <button class="sumar btn btn-outline-danger btn-sm" data-index-number=="" id="p-${product.id}"> + </button>
        </td>
              </tr>
        
        `
  })

  divCart.innerHTML = htmlListProducts

  QtyOnCart()
  subtotal()
  setTimeout(plusCart, 400)
  setTimeout(minusCart, 450)
  
}

function subtotal() { // funcion para sumar los precios de todos los productos en el carrito 

  let totalCarrito = 0
  let ICart = document.getElementById("subTotalModal")
  let ivaCarroto = document.getElementById("totalModal")


  if (CART.length == 0) {
    ICart.innerHTML = "0"
    ivaCarroto.innerHTML = "0"
  } else {

    for (const Tot of CART) {

      totalCarrito += Tot.total
      ICart.innerHTML = totalCarrito
      ivaCarroto.innerHTML = (totalCarrito * (1.21)).toFixed(2)
    }
  }

}

const QtyOnCart = () => { // funcion para contar productos en el carrito 

  let CarrtitoQty = 0
  let qtyCarrito = document.getElementById("totalQty")

  if (CART.length == 0) {
    qtyCarrito.innerHTML = "0"
  } else {
    for (const tot2 of CART) {
      CarrtitoQty += tot2.quantity
      qtyCarrito.innerHTML = CarrtitoQty
    }
  }
}