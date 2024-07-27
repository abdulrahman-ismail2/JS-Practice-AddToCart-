// feteh the json file (as you fetching an api)
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.products);
    // console.log(typeof data.products);
    data.products.forEach((element) => {
      // console.log(element);
      document.querySelector(
        ".products"
      ).innerHTML += `<div class="item" key=${element.id}>
          <div class="img">
            <img src=${element.image} alt="" />
          </div>
          <h3 class="name">${element.name}</h3>
          <p class="price">${element.price} Dollor</p>
          <p>
            Desc :${element.description}
          </p>
          <span>Rate :${element.rate}</span>
          <button class="add button">add to cart</button>
        </div>`;
    });
    let btns = document.getElementsByClassName("add");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", (e) => {
        item = e.target.closest(".item");
        // calling the function
        let { prodName, prodPrice } = addToCart();
        // the function here return the prodName , prodPrice like you sayy
        // let { prodName, prodPrice } = { prodName, prodPrice };
        let name = item.querySelector(".name").textContent;
        // prodName has been come from the addToCart function
        prodName.innerHTML += name;
        let priceDollor = item
          .querySelector(".price")
          .textContent.replace("Dollor", "$");
        // prodPrice has been come from the addToCart function
        prodPrice.innerHTML += priceDollor;
        // calling empty message
        updateEmptyCartMessage();
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
  });

document.querySelector(".header span").addEventListener("click", (e) => {
  document.querySelector(".header span").innerHTML = "Wth you didddd... jk :)";
  document.querySelector(".popup").classList.toggle("view");
});

let li = document.createElement("li");
let ul = document.getElementsByClassName("ul");

function addToCart() {
  let cartArr = [];
  let cartItems = document.getElementById("cartItems");
  let listItem = document.createElement("li");
  listItem.classList.add("li");
  let prodName = document.createElement("span");
  prodName.classList.add("prod-name");
  let prodPrice = document.createElement("span");
  prodPrice.classList.add("prod-img");
  listItem.appendChild(prodName);
  listItem.appendChild(prodPrice);
  cartItems.appendChild(listItem);
  cartArr.push(prodName);
  function updateCartSum() {
    // loop on the lis
    let items = cartItems.getElementsByClassName("li");
    for (let i = 0; i < items.length; i++) {
      // get all the prod prices
      let priceItem = items[i].querySelector(".prod-img");
      let price = parseInt(priceItem.innerText.replace("$", "").trim());
      var total = total + price;
    }
    console.log(total)
  }
  updateCartSum();
  return { prodName, prodPrice, listItem };
}

function updateEmptyCartMessage() {
  let cartItems = document.getElementById("cartItems");
  let emptyCartMessage = document.getElementById("emptyCartMessage");
  // childElementCount === 0 (same)
  if (cartItems.children.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }
}
