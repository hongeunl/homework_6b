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

var savedCartArray = JSON.parse(localStorage.getItem("savedCartArray"));

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
  savedCartArray.push(newItem);
  localStorage.setItem("savedCartArray", JSON.stringify(savedCartArray));
  updateCartNum();

}

//Update the number of items in the cart//
function updateCartNum() {
  var numItemsCart = savedCartArray.length;
  if (numItemsCart > 0) {
    var cartNum = document.getElementById("cartNumUpdate");
    cartNum.innerHTML = numItemsCart;
  }
}

function onLoad() {
  updateCartItems(savedCartArray);
  for (let i = 0; i < savedCartArray.length; i++) {
    document.getElementById("delete"+i).addEventListener("click", function() {
      let newArray = savedCartArray.splice(i,1);
      localStorage.setItem("savedCartArray", JSON.stringify(newArray));
      updateCartItems(savedCartArray);
  });
}
}


//Update items in the cart page//
function updateCartItems(savedCartArray) {
  //Update flavor//
  var numItemsCart = savedCartArray.length;
  for (let i = 0; i < numItemsCart; i++) {
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
    let itemQuantPlace = document.createElement("select");
    //Add quantity options //
    let numOption1 = document.createElement("option");
    numOption1.value = "1";
    numOption1.text = "1";
    let numOption2 = document.createElement("option");
    numOption2.value = "3";
    numOption2.text = "3";
    let numOption3 = document.createElement("option");
    numOption3.value = "6";
    numOption3.text = "6";
    let numOption4 = document.createElement("option");
    numOption4.value = "12";
    numOption4.text = "12";
    //Match the quantity options with what the user selected //
    let itemQuant = savedCartArray[i].quant;
    if (itemQuant == numOption1.text) {
      numOption1.selected = true;
    }
    else if (itemQuant == numOption2.text) {
      numOption2.selected = true;
    }
    else if (itemQuant == numOption3.text) {
      numOption3.selected = true;
    }
    else if (itemQuant == numOption4.text) {
      numOption4.selected = true;
    }
    itemQuantPlace.appendChild(numOption1);
    itemQuantPlace.appendChild(numOption2);
    itemQuantPlace.appendChild(numOption3);
    itemQuantPlace.appendChild(numOption4);
/*  let itemQuant = document.createTextNode(savedCartArray[i].quant);
    itemQuantPlace.appendChild(itemQuant); */
    itemContainer.appendChild(itemQuantPlace);

    //Create x button //
    let xButtonPlace = document.createElement("button");
    xButtonPlace.className = "deleteButton";
    xButtonPlace.id = "delete" + i;
    // let xButton = document.createTextNode("X");
    xButtonPlace.innerHTML = "X";
    // xButtonPlace.appendChild(xButton);
    itemContainer.appendChild(xButtonPlace);
  

    //Update subtotal //
    let itemSubtotalPlace = document.createElement("h5");
    let itemSubtotal = document.createTextNode(savedCartArray[i].subtotal);
    itemQuantPlace.appendChild(itemSubtotal);
    itemContainer.appendChild(itemSubtotalPlace);

  }
}




