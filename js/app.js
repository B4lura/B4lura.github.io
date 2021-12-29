var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: "Code Menu App", // App name
  theme: "auto", // Automatic theme detection
  el: "#app", // App root element

  id: "io.framework7.myapp", // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },

  theme: "md",
});

//===========================================================================================================================================================================================================================
/* Your app custom javascript below */
//===========================================================================================================================================================================================================================
let filter = true;
//initialize app
function init() {
  console.log("init() called!");
  showAllergies();
  showDiets();
  displayOrders();
}

//cart holds last number of items upon refresh.
onLoadOrderNumbers();
// loadTo("orderHistory");
//===========================================================================================================================================================================================================================

//show bottom toolbar
function showToolbar() {
  console.log("showToolbar() called!");
  document.getElementById("common-toolbar").style.display = "block";
}

//===========================================================================================================================================================================================================================

//hide bottom toolbar
function hideToolbar() {
  console.log("hideToolbar() called!");
  document.getElementById("common-toolbar").style.display = "none";
}

//===========================================================================================================================================================================================================================

let currentTab;
let currentLink;

//show tab menu in dish overview
function displayMenuTabs() {
  console.log("displayMenuTabs() called!");
  document.getElementById("menu-chips").innerHTML = ` `;
  menuTabs.forEach((menuTabs) => {
    document.getElementById(
      "menu-chips"
    ).innerHTML += `<a href="#${menuTabs.link}" class="chip tab-link tab-link-active chip-margin" onclick="showDishes('${menuTabs.name}','${menuTabs.link}')">
         <div class="chip-label">${menuTabs.name}</div>
      </a>`;
  });
  //show antipasti tab at beginning
  showDishes("Antipasti", "antipasti");
}

function showDishesFilter() {
  showDishes(currentTab, currentLink);
}

//===========================================================================================================================================================================================================================

//load allergy chips into app
function showAllergies() {
  console.log("showAllergies() called!");
  document.getElementById("allergy-cards").innerHTML = ` `;
  allergies.forEach((allergies) => {
    document.getElementById(
      "allergy-cards"
    ).innerHTML += `<div class="allergy-align">
    <img class="allergy-image" src="assets/scrim.png" alt="image" width="103" height="103" id="${allergies.name}" onclick="switchAllergy('${allergies.name}', '${allergies.name.imgSrc}' )" />
    <p class="diet-description">${allergies.name}</p>
    </div>`;
  });
}

//save selected allergies
function saveAllergies() {
  var selectedAllergies = document.querySelectorAll("allergy-image");
  console.log(selectedAllergies);
}

//===========================================================================================================================================================================================================================

//load diet cards into app
function showDiets() {
  console.log("showDiets() called!");
  document.getElementById("diet-cards").innerHTML = ``;
  diet.forEach((diet) => {
    document.getElementById("diet-cards").innerHTML += `<div class="diet-align">
          <img class="diet-image" src="assets/scrim.png" alt="image" width="103" height="103" id="${diet.name}" onclick="switchDiet('${diet.name}', '${diet.imgSrc}' )" />
          <p class="diet-description">${diet.name}</p>
      </div>`;
  });
}

//===========================================================================================================================================================================================================================

//load order contents into order-list
function displayOrders() {
  console.log("displayOrders() called!");
  let orderList = document.getElementById("order-list");
  let orderButton = document.getElementById("order-button");
  let orderItems = localStorage.getItem("dishesInOrder");
  let orderTotal = localStorage.getItem("totalCost");
  let orderNumber = localStorage.getItem("orderNumbers");
  let pastOrdersItems = localStorage.getItem("pastOrders");

  orderTotal = parseFloat(orderTotal);
  orderItems = JSON.parse(orderItems);
  orderNumber = JSON.parse(orderNumber);
  pastOrdersItems = JSON.parse(pastOrdersItems);

  if (orderNumber > 0 && orderItems != null) {
    //grab total from pastOrders
    let totalPastOrders = loadTo("pastOrders");

    //putting relevant stuff on orderList
    orderList.innerHTML = "";

    Object.values(orderItems).map((item) => {
      orderList.innerHTML +=
        '<li class="swipeout"><div class="item-content swipeout-content"><div class="item-media serving-counter"><!-- serving - counter --><i class="icon f7-icons if-not-md"><span class="badge color-blue" id="serving-count1">' +
        item.inOrder +
        '</span></i><i class="icon material-icons md-only"><span class="badge color-blue" id="serving-count2">' +
        item.inOrder +
        '</span></i></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' +
        item.name +
        '</div><div class="item-after order-price">' +
        (item.inOrder * item.price).toFixed(2) +
        '€</div></div><div class="item-subtitle">' +
        item.tab +
        '</div></div><div class="swipeout-actions-right"><a href="#" @click=${more}>Edit</a><a href="#" class="swipeout-delete" onclick="deleteDish(dishes[' +
        (item.id - 1) +
        ']);">Delete</a></div></div></li><li>';
    });

    orderList.innerHTML += `<li>
    <div class="item-content">
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title" id="sub-total">Subtotal</div>
          <div class="item-after" id="sub-price">${orderTotal.toFixed(
            2
          )} €</div>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="item-content">
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title" id="total">Total</div>
          <div class="item-after" id="price">${(
            orderTotal + totalPastOrders
          ).toFixed(2)} €</div>
        </div>
        <div class="item-subtitle">Subtotal + Past Orders</div>
      </div>
    </div>
  </li>`;
    orderButton.classList.add("tab-link");
  } else {
    orderButton.classList.remove("tab-link");
    orderList.innerHTML = ``;
    orderList.innerHTML += "Your current order is empty!";
  }

  loadTo("pastOrders");
}

//load display overview page contents
function displayOverview() {
  console.log("displayOverview()  called!");
  let overviewPage = document.getElementById("overview");
  let orderTotal = localStorage.getItem("totalCost");
  orderTotal = JSON.parse(orderTotal);

  if (orderTotal == null) {
    //to prevent "null" error when order button is pressed
    //and there are no dishes on the list
    orderTotal = 0.0;
  }

  overviewPage.innerHTML = ``;
  overviewPage.innerHTML += `<div class="block">
    <div class="block block-strong">
      <p>Your dishes are being prepared</p>
      <p>
        <span class="progressbar-infinite"></span>
      </p>
    </div>
  </div>
  <div class="block">
    <div class="block-title">
      Subtotal
      <span style="float: right">${orderTotal.toFixed(2)} €</span>
    </div>
  </div>

  <div class="block">
    <a
      href="#view-payment"
      class="col button button-large button-fill button-raised tab-link"
      id="pay-button"
      onclick="displayPayment();"
      onclick="setItems('doesntMatter', 'overviewScreen');
      deleteDish('All');loadTo('orderHistory');"
      >Pay Now</a
    >
  </div>
  <div class="block">
    <a
      href="#view-homescreen"
      class="col button button-large button-fill button-raised tab-link"
      id="paylater-button"
      onclick="setItems('doesntMatter', 'overviewScreen');
      deleteDish('All');loadTo('pastOrders');"
      >Pay Later</a
    >
  </div>`;
  document.getElementById("prep").innerHTML = `<div class="block block-strong">
  <p>Your dishes are being prepared</p>
  <p>
    <span class="progressbar-infinite"></span>
  </p>
</div>`;
}

//===========================================================================================================================================================================================================================
var allergyArray = [];
//switch Allergy status
function switchAllergy(allergy, imageSrc) {
  console.log("switchAllergy(allergy, imageSrc)   called!");
  var img = document.getElementById(allergy).src;
  if (img.indexOf("assets/Selected") != -1) {
    document.getElementById(allergy).src = "assets/scrim.png";
    allergyArray.forEach((element) => {
      if (element == allergy) {
        allergyArray = allergyArray.filter((element) => element !== allergy);
      }
    });
  } else {
    document.getElementById(allergy).src = "assets/Selected.png";
    allergyArray.push(allergy);
  }
}

//switch Diet status
function switchDiet(diet, imageSrc) {
  console.log("switchDiet(diet, imageSrc)   called!");
  var img = document.getElementById(diet).src;
  if (img.indexOf("assets/Selected") != -1) {
    document.getElementById(diet).src = "assets/scrim.png";
  } else {
    document.getElementById(diet).src = "assets/Selected.png";
  }
}

//===========================================================================================================================================================================================================================

//show dishes in tabs
function showDishes(tabName, tabLink) {
  currentTab = tabName;
  currentLink = tabLink;
  console.log("showDishes(tabName, tabLink)  called!");
  //loads id's of different tabs
  dishes.forEach((dishes) => {
    if (dishes.tab === tabName) {
      document.getElementById(
        "tab-dishes"
      ).innerHTML = `<div id="${tabLink}" class="page-content tab">
                <div id="innertab" class="block full-width" style="margin: 0;">
                </div>
        </div>`;
      document.getElementById(tabLink).style.display = "block";
    }
  });
  //update contents of each tab to the according dishes, depending on if the filter is on or off
  if (filter) {
    dishes.forEach((dishes, index) => {
      if (
        dishes.tab === tabName &&
        dishes.ingredients.filter((element) => allergyArray.includes(element))
          .length == 0
      ) {
        document.getElementById(
          "innertab"
        ).innerHTML += `<div class="card demo-card-header-pic">            
              <div href="#view-detailed-view" onclick="loadDetailedView(dishes[${index}]);" style="background-image: url(${
          dishes.imgSrc
        });" class="card-header tab-link full-width align-items-flex-end"> 
              </div>        
              <div class="card-content card-content-padding">
                <p>${dishes.name}<span class="material-icons add_btns ${
          dishes.id
        }" style="float: right;" onclick="addDish(dishes[${index}],'dishoverview');">add_box</span></p>
                <p class="date">${dishes.price.toFixed(2)} €</p>                
              </div>    
            </div>
            <div class="block">
            <a
              href="#view-order"
              class="col button button-large button-fill button-raised tab-link"
              id="viewOrder-button"
              >view-order</a
            >
          </div>`;
      }
    });
  } else {
    dishes.forEach((dishes, index) => {
      if (dishes.tab === tabName) {
        document.getElementById(
          "innertab"
        ).innerHTML += `<div class="card demo-card-header-pic">            
            <div href="#view-detailed-view" onclick="loadDetailedView(dishes[${index}]);" style="background-image: url(${
          dishes.imgSrc
        });" class="card-header tab-link full-width align-items-flex-end"> 
            </div>        
            <div class="card-content card-content-padding">
              <p>${dishes.name}<span class="material-icons add_btns ${
          dishes.id
        }" style="float: right;" onclick="addDish(dishes[${index}],'dishoverview');">add_box</span></p>
              <p class="date">${dishes.price.toFixed(2)} €</p>                
            </div>    
          </div>
          <div class="block">
          <a
            href="#view-order"
            class="col button button-large button-fill button-raised tab-link"
            id="viewOrder-button"
            >view-order</a
          >
        </div>`;
      }
    });
  }
}
//===========================================================================================================================================================================================================================

// update the number of items / item-count in the order-list and save to local storage
function increaseOrderNumbers(dish, from) {
  console.log("increaseOrderNumbers(dish, from) called!");
  let dishNumbers = localStorage.getItem("orderNumbers");
  let detailedItem = localStorage.getItem("tempDetailedView");
  let stepperValue = document.getElementById("stepper-value");
  stpValueInt = parseInt(stepperValue.value);

  dishNumbers = parseInt(dishNumbers);
  detailedItem = JSON.parse(detailedItem);

  if (from == "dishoverview") {
    if (dishNumbers) {
      localStorage.setItem("orderNumbers", dishNumbers + 1);
      document.getElementById("count1").innerHTML = dishNumbers + 1;
      document.getElementById("count2").innerHTML = dishNumbers + 1;
    } else {
      localStorage.setItem("orderNumbers", 1);
      document.getElementById("count1").innerHTML = 1;
      document.getElementById("count2").innerHTML = 1;
    }
    //set dish into dishesInOrder, as accessed from dishoverview
    setItems(dish, "dishoverview");
  } else if (from == "detailedView") {
    if (dishNumbers) {
      localStorage.setItem("orderNumbers", dishNumbers + stpValueInt);
      document.getElementById("count1").innerHTML = dishNumbers + stpValueInt;
      document.getElementById("count2").innerHTML = dishNumbers + stpValueInt;
    } else {
      localStorage.setItem("orderNumbers", stpValueInt);
      document.getElementById("count1").innerHTML = stpValueInt;
      document.getElementById("count2").innerHTML = stpValueInt;
    }
    //set dish into dishesInOrder, as accessed from detailedView
    setItems(dish, "detailedView");
  }
}
//===========================================================================================================================================================================================================================

//add dish to order-List and save in local storage
function setItems(dish, from) {
  console.log("setItems(dish, from) called!");
  let orderItems = localStorage.getItem("dishesInOrder");
  let orderHistoryItems = localStorage.getItem("orderHistory");
  let pastOrdersItems = localStorage.getItem("pastOrders");
  let detailedItem = localStorage.getItem("tempDetailedView");
  let totalCost = localStorage.getItem("totalCost");

  stepperValue = document.getElementById("stepper-value");
  detailedItem = JSON.parse(detailedItem);
  orderItems = JSON.parse(orderItems);
  orderHistoryItems = JSON.parse(orderHistoryItems);
  pastOrdersItems = JSON.parse(pastOrdersItems);
  totalCost = JSON.parse(totalCost);

  stpValueInt = parseInt(stepperValue.value);

  if (from == "dishoverview") {
    if (orderItems != null) {
      if (orderItems[dish.id] == undefined) {
        orderItems = { ...orderItems, [dish.id]: dish };
      }
      orderItems[dish.id].inOrder += 1;
    } else {
      dish.inOrder = 1;
      orderItems = {
        [dish.id]: dish,
      };
    }

    localStorage.setItem("dishesInOrder", JSON.stringify(orderItems));
  } else if (from == "detailedView") {
    if (orderItems != null) {
      if (orderItems[dish.id] == undefined) {
        // //first time: therefore make sure .inOrder still zero
        dish.inOrder = 0;
        orderItems = { ...orderItems, [dish.id]: dish };
      }
      orderItems[dish.id].inOrder += stpValueInt;
    } else {
      dish.inOrder = 1;
      orderItems = {
        [dish.id]: dish,
      };
      orderItems[dish.id].inOrder += stpValueInt - 1;
    }

    localStorage.setItem("dishesInOrder", JSON.stringify(orderItems));
  } else if (from == "paymentScreen") {
    if (orderHistoryItems != undefined) {
      orderHistoryItems = {
        ...orderHistoryItems,
        [Object.keys(orderHistoryItems).length + 1]: orderItems,
        [Object.keys(orderHistoryItems).length + 2]: totalCost,
      };
    } else {
      orderHistoryItems = {
        [1]: orderItems,
        [2]: totalCost,
      };
    }

    localStorage.setItem("orderHistory", JSON.stringify(orderHistoryItems));
  } else if (from == "overviewScreen") {
    if (pastOrdersItems != undefined) {
      pastOrdersItems = {
        ...pastOrdersItems,
        [Object.keys(pastOrdersItems).length + 1]: orderItems,
        [Object.keys(pastOrdersItems).length + 2]: totalCost,
      };
    } else {
      pastOrdersItems = {
        [1]: orderItems,
        [2]: totalCost,
      };
    }

    localStorage.setItem("pastOrders", JSON.stringify(pastOrdersItems));
  }
}

//===========================================================================================================================================================================================================================
function deleteDish(dish) {
  subTotalCost(dish);
  console.log("deleteDish(dish) called!");
  let dishNumbers = localStorage.getItem("orderNumbers");
  let orderItems = localStorage.getItem("dishesInOrder");
  dishNumbers = parseInt(dishNumbers);

  orderItems = JSON.parse(orderItems);
  if (dish == "All") {
    //hard reset everything to be safe
    dishes.forEach((dish) => {
      dish.inOrder = 0;
    });
    localStorage.setItem("orderNumbers", 0);
    document.getElementById("count1").innerHTML = 0;
    document.getElementById("count2").innerHTML = 0;
    window.localStorage.removeItem("dishesInOrder");
  } else {
    let littleOrderNumber = dishNumbers - orderItems[dish.id].inOrder;
    if (littleOrderNumber > 0) {
      //decrement the small counter on order-icon
      localStorage.setItem(
        "orderNumbers",
        dishNumbers - orderItems[dish.id].inOrder
      );
      document.getElementById("count1").innerHTML =
        dishNumbers - orderItems[dish.id].inOrder;
      document.getElementById("count2").innerHTML =
        dishNumbers - orderItems[dish.id].inOrder;
    } else {
      localStorage.setItem("orderNumbers", 0);
      document.getElementById("count1").innerHTML = 0;
      document.getElementById("count2").innerHTML = 0;
    }

    //delete from local storage
    dish.inOrder = 0;
    delete orderItems[dish.id];

    orderItems = { ...orderItems };

    localStorage.setItem("dishesInOrder", JSON.stringify(orderItems));
  }

  displayOrders();
}
//===========================================================================================================================================================================================================================
//add item to order: wrapper
function addDish(dish, from) {
  console.log("addDish(dish) called!");
  //from dishoverview
  if (from == "dishoverview") {
    increaseOrderNumbers(dish, "dishoverview");
    addTotalCost(dish, "dishoverview");
  } else if (from == "detailedView") {
    //from detailedview
    increaseOrderNumbers(dish, "detailedView");
    addTotalCost(dish, "detailedView");
    viewOrderBtn();
  }

  displayOrders();
}

//calculate total order cost: addition
function addTotalCost(dish, from) {
  console.log("addTotalCost(dish) called!");
  let orderCost = localStorage.getItem("totalCost");
  let stepperValue = document.getElementById("stepper-value");
  stpValueInt = parseInt(stepperValue.value);

  if (from == "dishoverview") {
    if (orderCost != null) {
      orderCost = parseFloat(orderCost);
      localStorage.setItem("totalCost", orderCost + dish.price);
    } else {
      localStorage.setItem("totalCost", dish.price);
    }
  } else if (from == "detailedView") {
    if (orderCost != null) {
      orderCost = parseFloat(orderCost);
      localStorage.setItem("totalCost", orderCost + dish.price * stpValueInt);
    } else {
      localStorage.setItem("totalCost", dish.price * stpValueInt);
    }
  }
}

//calculate total order cost: subtraction
function subTotalCost(dish) {
  console.log("subTotalCost(dish) called!");
  let orderCost = localStorage.getItem("totalCost");
  let orderItems = localStorage.getItem("dishesInOrder");

  orderItems = JSON.parse(orderItems);
  orderCost = parseFloat(orderCost);

  if (dish == "All") {
    localStorage.setItem("totalCost", 0.0);
  } else {
    let bill =
      orderCost - orderItems[dish.id].inOrder * orderItems[dish.id].price;
    if (bill > 0) {
      localStorage.setItem(
        "totalCost",
        orderCost - orderItems[dish.id].inOrder * orderItems[dish.id].price
      );
    } else {
      localStorage.setItem("totalCost", 0.0);
    }
  }
}
//===========================================================================================================================================================================================================================

//cart holds last number of items upon refresh.
function onLoadOrderNumbers() {
  console.log("onLoadOrderNumbers() called!");
  let dishNumbers = localStorage.getItem("orderNumbers");
  if (dishNumbers) {
    document.getElementById("count1").innerHTML = dishNumbers;
    document.getElementById("count2").innerHTML = dishNumbers;
  }
}

//===========================================================================================================================================================================================================================

//load unique detailed-view based on card clicked in dishoverview

function loadDetailedView(plate) {
  setDetailed(plate);
  console.log("loadDetailedView(plate) called!");
  let detailedViewImg = document.querySelector(".detailed-img");
  let detailedViewTitle = document.querySelector(".detailed-title");
  let detailedViewDesc = document.querySelector(".detailed-desc");
  let addToOrderBtn = document.querySelector(".detailedBtn-block");
  let stepperDown = document.querySelector(".stepper-button-minus");
  let stepperUp = document.querySelector(".stepper-button-plus");
  let detailedItems = localStorage.getItem("tempDetailedView");
  let stepperValue = document.getElementById("stepper-value");

  detailedItems = JSON.parse(detailedItems);
  stpValueInt = parseInt(stepperValue.value);

  //load rest of elements on page: using data from local storage
  Object.values(detailedItems).map((detailed) => {
    detailedViewImg.src = `${detailed.imgSrc}`;
    detailedViewTitle.innerHTML = `${detailed.name}`;
    detailedViewDesc.innerHTML = `${detailed.description}`;
    //add-to-order button
    updateDetailedPrice();
  });
  //update button price when stepper is pressed
  stepperDown.addEventListener("click", () => {
    updateDetailedPrice();
  });
  stepperUp.addEventListener("click", () => {
    updateDetailedPrice();
  });
}

function updateDetailedPrice() {
  console.log("updateDetailedPrice() called!");
  let addToOrderBtn = document.querySelector(".detailedBtn-block");
  let detailedItems = localStorage.getItem("tempDetailedView");
  let stepperValue = document.getElementById("stepper-value");

  detailedItems = JSON.parse(detailedItems);
  stpValueInt = parseInt(stepperValue.value);

  Object.values(detailedItems).map((detailed) => {
    let buttonPrice = parseFloat(detailed.price * stpValueInt);
    //add-to-order button
    addToOrderBtn.innerHTML = `<div class="block">
    <a
      onclick="addDish(dishes[${detailed.id - 1}],'detailedView');"
      href="#view-dishoverview"
      class="col button button-large button-fill button-raised tab-link"
      id="add-button"
      >Add to order - ${buttonPrice.toFixed(2)} €
    </a>
  </div>`;
  });
}

//===========================================================================================================================================================================================================================

//reveal view-order button, after "add-to-order" is pressed (//Not the best implementation)
function viewOrderBtn() {
  console.log("viewOrderBtn() called!");
  document.getElementById("viewOrder-button").style.display = "initial";
  setTimeout(unviewOrderBtn, 10000); //hide view-order button after 10 seconds (10000/1000)
}

function unviewOrderBtn() {
  console.log("unviewOrderBtn() called!");
  document.getElementById("viewOrder-button").style.display = "none";
}

//===========================================================================================================================================================================================================================

//temporarily store the dish clicked in dishoverview, to later load it into detailed-view
function setDetailed(dish) {
  console.log("setDetailed(dish) called!");
  let currentDish = localStorage.getItem("tempDetailedView");
  currentDish = JSON.parse(currentDish);

  currentDish = {
    [dish.id]: dish,
  };
  console.log(`${dish.name}.inOrder = `, dish.inOrder);
  //whenever you enter detailed-view from dish-card:
  //set the temp in-Order to 1. So it matches the serving minimum
  currentDish[dish.id].inOrder = 1;

  localStorage.setItem("tempDetailedView", JSON.stringify(currentDish));
}

//===========================================================================================================================================================================================================================

function displayPayment() {
  console.log("displayPayment() called!");
  let paymentList = document.querySelector(".payment-card");
  let paymentPrice = document.querySelector(".payment-price");
  let orderItems = localStorage.getItem("dishesInOrder");
  let orderTotal = localStorage.getItem("totalCost");

  orderTotal = parseFloat(orderTotal);
  orderItems = JSON.parse(orderItems);

  paymentList.innerHTML = "";
  paymentPrice.innerHTML = "";

  Object.values(orderItems).map((item) => {
    dishPrice = item.inOrder * item.price;

    paymentList.innerHTML += `<span class="dish">${
      item.name
    }</span><span class="price">${dishPrice.toFixed(2)} €</span><br />`;
  });

  paymentPrice.innerHTML += `${orderTotal.toFixed(2)} €`;
}

//load orders to:pastOrders/orderHistory
function loadTo(to) {
  console.log("loadTo() called!");
  let orderHistoryList = document.getElementById("orderHistory-list");
  let pastOrdersList = document.getElementById("pastOrders-list");
  let orderItems = localStorage.getItem("dishesInOrder");
  let orderHistoryItems = localStorage.getItem("orderHistory");
  let pastOrdersItems = localStorage.getItem("pastOrders");
  let orderTotal = localStorage.getItem("totalCost");

  orderTotal = parseFloat(orderTotal);
  orderItems = JSON.parse(orderItems);
  orderHistoryItems = JSON.parse(orderHistoryItems);
  pastOrdersItems = JSON.parse(pastOrdersItems);

  if (to == "orderHistory") {
    if (orderHistoryItems != null) {
      console.log("On my way to orderHistory!");
      orderHistoryList.innerHTML = "";

      Object.entries(orderHistoryItems).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        //print string on all even numbers
        if (key % 2 == 0) {
          orderHistoryList.innerHTML += `<li>
        <div class="item-content">
          <div class="item-media detailed">
            <img
              src="assets/26167838_318335158650239_7907250422230334682_n.jpg"
              width="61"
            />
          </div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Pizza Regina</div>
              <a
                href="#"
                class="
                  col
                  button button-small button-round button-outline
                  order-again
                "
                >Order Again</a
              >
            </div>
            <div class="item-subtitle">${value} €</div>
            <div class="item-after">Order #${key / 2}</div>
          </div>
        </div>
      </li>`;
        }
      });
    } else {
      console.log("On my way to back home!");
      orderHistoryList.innerHTML = ``;
      orderHistoryList.innerHTML = "Ordered and paid dishes go here!";
    }
  } else if (to == "pastOrders") {
    //summing all orderTotals(in pastOrders) and storing value
    let totalPastOrders = 0;
    if (pastOrdersItems != null) {
      console.log("On my way to pastOrders!");
      pastOrdersList.innerHTML = "";

      Object.entries(pastOrdersItems).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        //print string on all even numbers
        if (key % 2 == 0) {
          //sum the total
          totalPastOrders += value;

          pastOrdersList.innerHTML += `<li>
    <div class="item-content">
      <div class="item-media detailed">
        <img
          src="assets/26167838_318335158650239_7907250422230334682_n.jpg"
          width="61"
        />
      </div>
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title">Pizza Regina</div>
          <a
            href="#"
            class="
              col
              button button-small button-round button-outline
              order-again
            "
            >Pay now</a
          >
        </div>
        <div class="item-subtitle">${value} €</div>
        <div class="item-after">Order #${key / 2}</div>
      </div>
    </div>
  </li>`;
        }
      });

      pastOrdersList.innerHTML += `<li>
    <div class="item-content">
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title" id="totalPast">Subtotal</div>
          <div class="item-after" id="totalPastPrice">${totalPastOrders.toFixed(
            2
          )} €</div>
        </div>
      </div>
    </div>
  </li>`;
    } else {
      console.log("On my way to back home!");
      pastOrdersList.innerHTML = ``;
      pastOrdersList.innerHTML = "Ordered but unpaid dishes go here!";
      totalPastOrders = 0;
    }
    return totalPastOrders;
  }
}

//===========================================================================================================================================================================================================================

//change "call-a-waiter"/"d-n-d" button state after clicked (//Not the best implementation)
function changeButtonState(button) {
  console.log("changeButtonState(button) called!");
  let btn = document.querySelector(button);
  let pressed = btn.style.backgroundColor === "red";

  if (button == ".call-a-waiter") {
    if (pressed) {
      app.dialog.confirm(
        "Waiter will no longer come",
        "Do you want to cancel?",
        () => {
          //change colour to green
          btn.style.backgroundColor = "#bbd01b";
          //change opacity
          btn.style.opacity = "1";
        }
      );
    } else {
      //alert
      app.dialog.alert(
        "A waiter will be with you soon",
        "Waiter has been called"
      );

      //change colour to red
      btn.style.backgroundColor = "red";
      //change opacity
      btn.style.opacity = "0.5";
    }
  } else {
    if (pressed) {
      app.dialog.confirm(
        "Warning: you can be bothered again",
        "Do you want to disable?",
        () => {
          //change colour to green
          btn.style.backgroundColor = "#bbd01b";
          //change opacity
          btn.style.opacity = "1";
        }
      );
    } else {
      //alert
      app.dialog.alert(
        "A waiter wont bother you anymore",
        "Do Not Disturb Mode Enabled"
      );

      //change colour to red
      btn.style.backgroundColor = "red";
      //change opacity
      btn.style.opacity = "0.5";
    }
  }
}

//===========================================================================================================================================================================================================================

//show check-in status on homescreen
function showCheckIn() {
  console.log("showCheckIn()called!");
  document.getElementById("checkin").innerHTML = `
  Checked into table 4
  `;
}

//===========================================================================================================================================================================================================================

//toggle Filter for dishes
function toggleFilter() {
  filter = filter ? false : true;
}

document.getElementById('dishesmenu')
.addEventListener("click", function(event) {
  if (allergyArray.length != 0){
    app.dialog.alert('Only dishes that comply with you dietary need are shown. To turn this off press the filter icon at the top of the screen');
  }
}, {once: true});
