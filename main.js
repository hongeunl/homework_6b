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
  var savedCartArray = JSON.parse(localStorage.getItem("savedCartArray") || "[]");
  savedCartArray.push(newItem);
  localStorage.setItem("savedCartArray", JSON.stringify(savedCartArray));
  updateCartNum();
}

//Update the number of items in the cart//
function updateCartNum() {
  var savedCartArray = JSON.parse(localStorage.getItem("savedCartArray") || "[]");
  var numItemsCart = savedCartArray.length;
  if (numItemsCart > 0) {
    var cartNum = document.getElementById("cartNumUpdate");
    cartNum.innerHTML = numItemsCart;
  }
}

//Update & display items on the cart page//
function updateCartItems(){
  var savedCartArray = JSON.parse(localStorage.getItem("savedCartArray") || "[]");
  var cartContainer = document.getElementById("cartfeed");
  if (savedCartArray.length == 0) {
    document.getElementById("cartfeed").innerHTML = "The cart is empty!";
  }
  for (let i=0; i<savedCartArray.length; i++) {
    cartContainer.innerHTML += `
      <div class="cart-item-container">
        <h2>`+ "x " + savedCartArray[i].quant+`</h2>
        <h3>`+ savedCartArray[i].name+`</h3>
        <h4>w/ `+ savedCartArray[i].glaze+`</h4>
        <h5>`+ savedCartArray[i].subtotal+`</h5>
        <h6 onclick="removeItemFromCart(`+i+`)">x</h6>
      </div>
    `;
  }
}
updateCartItems();

//Remove items in the cart with the 'x'//
function removeItemFromCart(position){
  var savedCartArray = JSON.parse(localStorage.getItem("savedCartArray") || "[]");
  savedCartArray.splice(position,1);
  localStorage.setItem("savedCartArray", JSON.stringify(savedCartArray));
  location.reload();
}

//Get rid of all items in the cart//
function clearFeed() {
  localStorage.setItem("savedCartArray", JSON.stringify([]));
  location.reload();
}