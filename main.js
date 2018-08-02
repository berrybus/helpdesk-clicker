var session = {
  cookies: cookies,
  cursors: cursors,
  juniors: juniors,
  seniors: seniors,
  customers: customers,
  stock: stock,
  rate: rate,
  pets: pets,
  name: name
}

var cookies = 0;
var cursors = 0;
var juniors = 0;
var seniors = 0;
var customers = 1;
var stock = 0;
var rate = 1;
var pets = Array(10).fill(0);
var setOne = false;
var setTwo = false;
var setThree = false;
var name = "Company";

function cookieClick(number) {
  console.log(rate);
  var num = number * rate;
  if (num <= stock) {
    cookies += num;
    stock -= num;
    document.getElementById("cookies").innerHTML = cookies; 
    document.getElementById("stock").innerHTML = stock;
  }
};

function buyCursor() {
  var cursorCost = Math.floor(10 * Math.pow(1.35, cursors));
  if (cookies >= cursorCost) {
    cursors += 1;
    cookies -= cursorCost
    document.getElementById("cursors").innerHTML = cursors;
    document.getElementById("cookies").innerHTML = cookies;
    var nextCost = Math.floor(10*Math.pow(1.35, cursors));
    document.getElementById("cursorCost").innerHTML = nextCost;
    document.getElementById("news").innerHTML = "You decide to hire an intern. Hopefully they don't screw up.";
  }
  else {
    document.getElementById("news").innerHTML = "Even the intern refuses to work for that price.";
  }
};

function buyJunior() {
  var juniorCost = Math.floor(100 * Math.pow(1.3, juniors));
  if (cookies >= juniorCost) {
    juniors += 1;
    cookies -= juniorCost
    document.getElementById("juniors").innerHTML = juniors;
    document.getElementById("cookies").innerHTML = cookies;
    var nextCost = Math.floor(100*Math.pow(1.3, juniors));
    document.getElementById("juniorCost").innerHTML = nextCost;
    document.getElementById("news").innerHTML = "This junior IT pro looks promising. Here's to hoping they last longer than the last one!";
  }
  else {
    document.getElementById("news").innerHTML = "The new applicant is desperate, but not that desperate.";
  }
};

function buySenior() {
  var seniorCost = Math.floor(1000 * Math.pow(1.2, seniors));
  if (cookies >= seniorCost) {
    seniors += 1;
    cookies -= seniorCost
    document.getElementById("seniors").innerHTML = seniors;
    document.getElementById("cookies").innerHTML = cookies;
    var nextCost = Math.floor(1000*Math.pow(1.2, seniors));
    document.getElementById("seniorCost").innerHTML = nextCost;
    document.getElementById("news").innerHTML = "You hired a new senior IT pro. They basically already know the ropes, but you have a sneaking suspicion that they're trying to steal your job.";
  }
  else {
    document.getElementById("news").innerHTML = "That kind of money gets you about half a taquito at the gas station. Try again.";
  }
};

function buyRate() {
  var rateCost = Math.floor(500 * Math.pow(2, rate));
  if (cookies >= rateCost) {
    cookies -= rateCost;
    rate += 1;
    document.getElementById("cookies").innerHTML = cookies;
    var nextCost = Math.floor(500*Math.pow(2, rate));
    document.getElementById("rateCost").innerHTML = nextCost;
    document.getElementById("news").innerHTML = "You invest some money in a training plan for all your employees. Their productivity goes up!";
  }
  else {
    document.getElementById("news").innerHTML = "You might as well just save that money for tonight.";
  }
};

function buyExpand() {
  var expandCost = Math.floor(100 * Math.pow(1.01, customers));
  if (cookies >= expandCost) {
    customers += Math.floor(Math.random() * 50);
    cookies -= expandCost;
    document.getElementById("customers").innerHTML = customers;
    document.getElementById("cookies").innerHTML = cookies;
    var nextCost = Math.floor(100*Math.pow(1.01, customers));
    document.getElementById("expandCost").innerHTML = nextCost;
    document.getElementById("news").innerHTML = "Finally, you can upgrade your old office. It was getting pretty stuffy in there. New clients are eyeing your business as well.";
  }
  else {
    document.getElementById("news").innerHTML = "Who do you think you're fooling with that payment?";
  }
};

function buyPet() {
  if (cookies >= 5000) {
    cookies -= 5000;
    document.getElementById("cookies").innerHTML = cookies;
    var success = Math.random();
    if (success < .30) {
      var which = Math.floor(Math.random() * 10);
      pets[which] = 1;
      console.log(pets);
      document.getElementById("news").innerHTML = "You found a cute critter!";
    }
    else {
      document.getElementById("news").innerHTML = "You went to the animal shelter and all they did was scratch at you. Better luck next time.";
    }
  }
};

function buyStore() {
  if (cookies >= 2999999) {
    allOnes = true
    for (var i = 0; i < 10; i++) {
      if (pets[i] == 0)
      {
        allOnes = false;
      }
    }
    if (allOnes) {
      cookies -= 2999999;
      document.getElementById("cookies").innerHTML = cookies;
      document.getElementById("win").setAttribute("class", "modal is-active");
    }
    else {
      document.getElementById("news").innerHTML = "You feel as if something is missing...";
    }
  }
  else {
    document.getElementById("news").innerHTML = "You can't buy that with pocket change!";
  }
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("session"));
  if (typeof savegame.cookies !== "undefined") {
    cookies = savegame.cookies;
  }
  if (typeof savegame.cursors !== "undefined") {
    cursors = savegame.cursors;
  }
  if (typeof savegame.juniors !== "undefined") {
    juniors = savegame.juniors;
  }
  if (typeof savegame.seniors !== "undefined") {
    seniors = savegame.seniors;
  }
  if (typeof savegame.customers !== "undefined") {
    customers = savegame.customers;
  }
  if (typeof savegame.stock !== "undefined") {
    stock = savegame.stock;
  }
  if (typeof savegame.rate !== "undefined") {
    rate = savegame.rate;
  }
  if (typeof savegame.pets !== "undefined") {
    pets = savegame.pets;
  }
  if (typeof savegame.name !== "undefined") {
    name = savegame.name;
  }
  console.log(savegame);
};

function save() {
  session.cookies = cookies;
  session.cursors = cursors;
  session.juniors = juniors;
  session.seniors = seniors;
  session.customers = customers;
  session.stock = stock;
  session.rate = rate;
  session.pets = pets;
  session.name = name;
  localStorage.setItem("session", JSON.stringify(session));
};

function showPets() {
  for (var i = 0; i < 10; i++) {
    var unique = "p" + i;
    if (pets[i] == 0) {
      document.getElementById(unique).style.display = "none";
    }
    else {
      document.getElementById(unique).style.display = "block";
    }
  }
  document.getElementById("displayPets").setAttribute("class", "modal is-active");
};

function hidePets() {
  document.getElementById("displayPets").setAttribute("class", "modal");
};

function showWelcome() {
  document.getElementById("welcome").setAttribute("class", "modal is-active");
};

function startGame() {
  name = document.getElementById('nameInput').value;
  document.getElementById("welcome").setAttribute("class", "modal");
  var displayName = "Help Desk Clicker - " + name;
  console.log(displayName);
  document.getElementById("titleName").innerHTML = displayName;
};

function continueGame() {
  document.getElementById("win").setAttribute("class", "modal");
};

function deleteData() {
  localStorage.removeItem("session");
  location.reload();
};


window.onload = function() {
  var tier1 = document.getElementsByClassName("tierOne");
  for (var i = 0; i < tier1.length; i++) {
    tier1[i].style.display = "none";
  }
  var tier2 = document.getElementsByClassName("tierTwo");
  for (var i = 0; i < tier2.length; i++) {
    tier2[i].style.display = "none";
  }
  var tier3 = document.getElementsByClassName("tierThree");
  for (var i = 0; i < tier3.length; i++) {
    tier3[i].style.display = "none";
  }
  if (localStorage.getItem("session") === null) {
      showWelcome();
  }
  else {
    load();
    document.getElementById("cursors").innerHTML = cursors;
    document.getElementById("juniors").innerHTML = juniors;
    document.getElementById("seniors").innerHTML = seniors;
    document.getElementById("cookies").innerHTML = cookies;
    document.getElementById("stock").innerHTML = stock;
    document.getElementById("customers").innerHTML = customers;
  
    var nextCost = Math.floor(10*Math.pow(1.35, cursors));
    document.getElementById("cursorCost").innerHTML = nextCost;
    nextCost = Math.floor(100*Math.pow(1.3, juniors));
    document.getElementById("juniorCost").innerHTML = nextCost;
    nextCost = Math.floor(1000*Math.pow(1.2, seniors));
    document.getElementById("seniorCost").innerHTML = nextCost;
    nextCost = Math.floor(100*Math.pow(1.01, customers));
    document.getElementById("expandCost").innerHTML = nextCost;
    nextCost = Math.floor(500*Math.pow(2, rate));
    document.getElementById("rateCost").innerHTML = nextCost;
    var displayName = "Help Desk Clicker - " + name;
    console.log(displayName);
    document.getElementById("titleName").innerHTML = displayName;
  }
};

window.setInterval(function() {
  var c = 0;
  if (customers <= 50)
  {
    c += 3;
  }
  else if (customers <= 300)
  {
    c += 6;
  }
  var a = Math.floor((Math.random() * 3) + 1) * Math.floor(Math.pow(1.012, customers));
  stock += a + c;
  document.getElementById("stock").innerHTML = stock;
  cookieClick(cursors);
  cookieClick(juniors * 5);
  cookieClick(juniors * 15);
  
  if (cookies >= 200 && !setOne) {
    setOne = true;
    var tier1 = document.getElementsByClassName("tierOne");
    for (var i=0; i < tier1.length; i++) {
      tier1[i].style.display = "flex";
    }
  }
  
  if (cookies >= 1500 && !setTwo) {
    setTwo = true;
    var tier2 = document.getElementsByClassName("tierTwo");
    for (var i=0; i < tier2.length; i++) {
      tier2[i].style.display = "flex";
    }
  }
  
  if (cookies >= 300000 && !setThree) {
    setThree = true;
    var tier3 = document.getElementsByClassName("tierThree");
    for (var i=0; i < tier3.length; i++) {
      tier3[i].style.display = "flex";
    }
  }
}, 500);

window.setInterval(function() {
  save();
}, 5000);

window.setInterval(function() {
  var a = Math.floor(Math.random() * 100);
  if (a < 20) {
    document.getElementById("news").innerHTML = "You've done enough work today. You get some coffee.";
  }
  else if (a < 30) {
    document.getElementById("news").innerHTML = "Nice! Your online advertising worked. Some new clients come in.";
    customers += 10;
    document.getElementById("customers").innerHTML = customers;
    var nextCost = Math.floor(100*Math.pow(1.01, customers));
    document.getElementById("expandCost").innerHTML = nextCost;
  }
  else if (a < 35) {
    var fail = 1 - Math.pow(.99, cursors);
    var bar = Math.random();
    if (bar < fail) {
      document.getElementById("news").innerHTML = "Looks like your interns broke something! You lost some time and money in the process of trying to fix it.";
      cookies -= Math.floor(Math.random() * 100);
      document.getElementById("cookies").innerHTML = cookies;
    }
  }
  else if (a < 40) {
    document.getElementById("news").innerHTML = "Your boss thinks you've been doing a fine job today. You get a small bonus. Sweet!";
    cookies += Math.floor(Math.random() * 50);
    document.getElementById("cookies").innerHTML = cookies;
  }
  else if (a < 60) {
    if (cookies < 200) {
      document.getElementById("news").innerHTML = "You groan angrily at your small income. Doesn't anyone appreciate IT these days?";
    }
    else if (cookies < 1000) {
      document.getElementById("news").innerHTML = "Hey, your business is coming along. You got some customers and a steady supply of tickets to fix. Now get back to work!";
    }
    else if (cookies < 4000) {
      document.getElementById("news").innerHTML = "Your boss says you're doing a great job! But he still won't give you that raise.";
    }
    else {
      if (customers < 50) {
        document.getElementById("news").innerHTML = "You got a good amount of money, but shouldn't you invest in more clients?";
      }
      else {
        document.getElementById("news").innerHTML = "Your business is going fantastic! Keep up the good work, champ.";
      }
    }
  }
}, 10000);
