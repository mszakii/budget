currencyValue = 18.75;


if (localStorage.getItem("money")) {
  value.innerHTML = `${localStorage.money}£`;
  
  dollar.innerHTML = `${Math.round(localStorage.money / currencyValue)}$`;
} else {
  localStorage.setItem("money", 0);
}


minus.onclick = function () {
  if (localStorage.getItem("money")) {
    
    localStorage.money = Number(localStorage.money) - 25;
    
    value.innerHTML = `${localStorage.money}£`;
    
    dollar.innerHTML = `${Math.round(localStorage.money / currencyValue)}$`;
  } else {
    localStorage.setItem("money", 0);
  }
};

plus.onclick = function () {
  if (localStorage.getItem("money")) {
    
    localStorage.money = Number(localStorage.money) + 25;
    
    value.innerHTML = `${localStorage.money}£`;
    
    dollar.innerHTML = `${Math.round(localStorage.money / currencyValue)}$`;
  } else {
    localStorage.setItem("money", 0);
  }
};



// new card

let date = Date().slice(0, 15);

let time = Date().slice(16, 21);

let investSt = 0;

let cardList = [];

if (localStorage.getItem("card")) {
  cardList = JSON.parse(localStorage.getItem("card"));
}

function budget(valueX) {
  localStorage.money = Number(localStorage.money) + Number(valueX);
    
  value.innerHTML = `${localStorage.money}£`;
    
  dollar.innerHTML = `${Math.round(localStorage.money / currencyValue)}$`;
}

getSavedCards();

newCard.onclick = function () {
  if (newCash.value != "") {
    createCard(newCash.value, type.value, Date().slice(16, 21), date);
    newCash.value = "";
  }
}

function createCard(v, t, ti, d) {
  const card = {
    id: Date.now(),
    value: v,
    type: t,
    time: ti,
    date: d,
  };
  // push card to cardList
  cardList.push(card);
  addCardToPage(cardList);
  // update balance
  if (card.type.slice(0, 6) != "invest") {
    budget(card.value);
  }
  // save card
  saveCard(cardList);
}

function addCardToPage(cardList) {
  cards.innerHTML = "";
  // create
  cardList.forEach((card) => {
    let div = document.createElement("div");
    div.className = "card";
    // create l and r
    let right = document.createElement("div");
    let left = document.createElement("div");
    right.className = "right";
    
    div.appendChild(left);
    right.className = "right";
    div.appendChild(right);
    // label
    let label = document.createElement("div");
    label.className = "label";
    label.appendChild(document.createTextNode(card.type));
    left.appendChild(label);
    // value
    let value = document.createElement("div");
    value.className = "value";
    value.appendChild(document.createTextNode(`${card.value}£`));
    left.appendChild(value);
    // time
    let time = document.createElement("div");
    time.className = "time";
    time.appendChild(document.createTextNode(card.time));
    left.appendChild(time);
    // icon
    let icon = document.createElement("i");
    // icon change
    if (card.type.slice(0,6) == "invest") {
      if (card.value >= 0) {
        icon.className = "fa fa-arrow-trend-up plant";
      } else {
        icon.className = "fa fa-arrow-trend-down danger";
      }
      investPlus(card.value);
    } else if (card.type.slice(0,8) == "cash out") {
      icon.className = "fa fa-coins danger";
    } else if (card.type == "") {
      card.type = "balance";
      
      if (card.value >= 0) {
        icon.className = "fa fa-coins warning";
      } else {
        icon.className = "fa fa-coins danger";
      }
      // budget(card.value); // old
    } else {
      if (card.value >= 0) {
        icon.className = "fa fa-coins warning";
      } else {
        icon.className = "fa fa-coins danger";
      }
    }
    right.appendChild(icon);
    // date
    let dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.appendChild(document.createTextNode(card.date));
    right.appendChild(dateEl);
    
    // add card to page
    cards.appendChild(div);
  });
}

function saveCard(cardList) {
  let memory = localStorage.setItem("card", JSON.stringify(cardList));
}

function getSavedCards() {
  let memory = localStorage.getItem("card");
  if (memory) {
    let cardR = JSON.parse(memory);
    addCardToPage(cardR);
  }
}

// invest
function investPlus(value) {
  investSt = +investSt + +value;
  invest.innerHTML = investSt;
  if (investSt > 0) {
    trend.className = "fa fa-arrow-trend-up";
    trend.style.color = "var(--plant)";
  } else {
    trend.className = "fa fa-arrow-trend-down";
    trend.style.color = "var(--danger)";
  }
}
