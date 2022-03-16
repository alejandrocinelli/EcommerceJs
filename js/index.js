const CART = []
let CARTJSON = []

pedirData() // es el render de los productos

PedirData2() // es guardar los datos del json en un array 

setTimeout(AddProduct,1000) // con esto sumo productos.. le tuve que dar un tiempo sino no andaba


async function PedirData2() 
{
const response = await fetch('/js/data.json')
const data2 = await response.json()
data2.forEach(element => CARTJSON.push(element));

} 






