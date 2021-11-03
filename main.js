//Change to different images when glaze is selected//
function changeImage(value) {
  if (value == "none") {
    document.getElementById("roll-image").src = "cinnamonroll_large.png"
  }
  if (value == "sugar-milk") {
    document.getElementById("roll-image").src = "cinnamonroll_large_sugar.png"
  }
  if (value == "vanilla-milk") {
    document.getElementById("roll-image").src = "cinnamonroll_large_vanilla.png"
  }
  if (value == "double-chocolate") {
    document.getElementById("roll-image").src = "cinnamonroll_large_chocolate.png"
  }
  changeTotalPrice(document.getElementById("quantity").value);
}

//Update total price when glaze and quantity are selected//
function changeTotalPrice(quantity) {
  var chosenGlaze = document.querySelector('input[name="glaze"]:checked').value;
  if (chosenGlaze == "none") {
    let totalPrice = 3.25*quantity;
    document.getElementById("rollprice").innerHTML = "$" + totalPrice.toFixed(2);
  }
  else {
    let totalPrice = (3.25+0.50)*quantity;
    document.getElementById("rollprice").innerHTML = "$" + totalPrice.toFixed(2);
  }
}

var cartArray = [];

//A new constructor//
function Roll(name, glaze, subtotal, quant) {
  this.name = name;
  this.glaze = glaze;
  this.subtotal = subtotal;
  this.quant = quant;
}

//Create an array of rolls that are put into the cart//
function addToCart(flavor) {
  thisGlaze = document.querySelector('input[name="glaze"]:checked').value;
  thisSubtotal = document.getElementById("rollprice").textContent;
  thisQuant = document.getElementById("quantity").value;
  thisFlavor = flavor;

  newItem = new Roll(thisFlavor, thisGlaze, thisSubtotal, thisQuant);
  cartArray.push(newItem);
  localStorage.setItem("savedCartArray", JSON.stringify(cartArray));
  updateCartNum();

}

//Update the number of items in the cart//
function updateCartNum() {
  var numItemsCart = cartArray.length;
  if (numItemsCart > 0) {
    var cartNum = document.getElementById("cartNumUpdate");
    cartNum.innerHTML = numItemsCart;
  }
}

function onLoad() {
  var savedCartArray = JSON.parse(localStorage.getItem("savedCartArray"));
  updateCartItems(savedCartArray);
}

//Update items in the cart page//
function updateCartItems(savedCartArray) {
  //Update flavor//
  var numItemsCart = savedCartArray.length;
  for (let i=0; i < numItemsCart; i++) {
    var itemContainer = document.createElement("div");
    itemContainer.className = "cart-item-container" + i;
    let itemNamePlace = document.createElement("h3");
    let itemName = document.createTextNode(savedCartArray[i].name);
    itemNamePlace.appendChild(itemName);
    itemContainer.appendChild(itemNamePlace);
    document.getElementsByClassName("cart")[0].appendChild(itemContainer);


    //Update glaze //
    let itemGlazePlace = document.createElement("h4");
    let itemGlaze = document.createTextNode(savedCartArray[i].glaze);
    itemGlazePlace.appendChild(itemGlaze);
    itemContainer.appendChild(itemGlazePlace);

    //Update quantity //
    let itemQuantPlace = document.createElement("h5");
    let itemQuant = document.createTextNode(savedCartArray[i].quant);
    itemQuantPlace.appendChild(itemQuant);
    itemContainer.appendChild(itemQuantPlace); 

    //Create x button //
    let xButtonPlace = document.createElement("h6");
    let xButton = document.createTextNode("X");
    xButtonPlace.appendChild(xButton);
    itemContainer.appendChild(xButton);
  

    //Update subtotal //
    let itemSubtotalPlace = document.createElement("h6");
    let itemSubtotal = document.createTextNode(savedCartArray[i].subtotal);
    itemQuantPlace.appendChild(itemSubtotal);
    itemContainer.appendChild(itemSubtotalPlace); 

  }
  return itemContainer;
}


function saveToLocal() {
  localStorage.setItem("Item", JSON.stringify(newItem));
}
