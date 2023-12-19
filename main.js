// JavaScript Code
//1 Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let CloseCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//2 Close Cart
CloseCart.onclick = () => {
  cart.classList.remove("active");
};

//3 Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//4 Making Function
function ready() {
  // Remove Item From Card
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //5 Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //6 add to Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // Buy Button Work
  document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click", buyButtonClicked);
}
 // Buy Button 
 function buyButtonClicked() {
alert("Your Order is placed")
var cartContent = document.getElementsByClassName("cart-content")[0];
while (cartContent.hasChildNodes()) {
  cartContent.removeChild(cartContent.firstChild);
}
  updatetotal();
 }

  //7 Remove Item From Card
  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
  }

  //8 Quantity Changes
  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatetotal();
  }

  //9 Add To Cart
  function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector(".product-title").innerText;
    var price = shopProducts.querySelector(".price").innerText;
    var productImg = shopProducts.querySelector("img").src;

    addProductToCart(title, price, productImg);
    updatetotal();
  }

  function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.querySelector(".cart-content");
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === title) {
        alert("You have already added this item to the cart");
        return;
      }
    }

    var cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <!-- Remove Cart-->
      <i class="bx bxs-trash-alt cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);

    updatetotal();
  }

  //10 Update Total
  function updatetotal() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.querySelector(".cart-price");
      var quantityElement = cartBox.querySelector(".cart-quantity");
      var price = parseFloat(priceElement.innerText.replace("MRO", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }

    document.querySelector(".total-price").innerText = total + "MRO";
  }
