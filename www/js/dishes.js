//create dishes here http://www.da-fausto.de/download/Da%20Fausto_Menu_eng.pdf
const dishes = [
  //Antipasti -----------------------------------------------------------------------
  {
    id: "1",
    inOrder: 0,
    name: "Carpaccio of duck",
    tab: "Antipasti",
    imgSrc: "assets/Duck_Carpaccio.png",
    price: 13.8,
    description: "Fresh Carpaccio of duck breast filet with rocket, Parmesan",
    ingredients: ["Duck", "Rocket", "Parmesan"],
    addOns: ["extra Rocket", "extra Parmesan", "Capers"],
    dietCompatible: [false, true, false, true, false, false, false], //Vegetarian, glutenfree, vegan, halal, kosher, prescetarian, lactose
  },
  {
    id: "2",
    inOrder: 0,
    name: "Vitello tonnato",
    tab: "Antipasti",
    imgSrc: "assets/vitello_tonnato.jpg",
    price: 12.95,
    description:
      "Thinly sliced veal cooked in a vegetable broth and white wine with tuna sauce and capers",
    ingredients: ["Veal", "Capers", "Wine", "Fish", "Egg", "Sulfites"],
    addOns: ["no Wine", "no Capers", "Parmesan"],
    dietCompatible: [false, true, false, false, false, false, true],
  },
  {
    id: "3",
    inOrder: 0,
    name: "Insalata di mare",
    tab: "Antipasti",
    imgSrc: "assets/Insalatadimare.jpg",
    price: 15.5,
    description: "Seafood salad with squid, shrimp, carrots and rocket",
    ingredients: [
      "Squid",
      "Shrimp",
      "Carrot",
      "Rocket",
      "Crustaceans",
      "Soy",
      "Mollusc",
      "Sulfites",
    ],
    addOns: ["extra Rocket", "extra Squid", "extra Shrimp"],
    dietCompatible: [false, true, false, false, false, true, true],
  },
  //Salads --------------------------------------------------------------------
  {
    id: "4",
    inOrder: 0,
    name: "Insalata mista",
    tab: "Salads",
    imgSrc: "assets/Insalatamista.jpg",
    price: 7.5,
    description: "Mixed green, carrots, tomatoes and cucumber ",
    ingredients: ["Carrot", "Tomato", "Cucumber"],
    addOns: ["Eggplant", "Red Bell Pepper", "Corn"],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  {
    id: "5",
    inOrder: 0,
    name: "Mozzarella con pomodoro",
    tab: "Salads",
    imgSrc: "assets/Mozzarellapomodoro.jpg",
    price: 9.9,
    description: "Mozzarella with fresh tomatoes and basil ",
    ingredients: ["Mozarella", "Tomato", "Basil", "Balsamico"],
    addOns: ["no Basil", "no Balsamico", "Pepper"],
    dietCompatible: [true, true, false, true, true, true, false],
  },
  {
    id: "6",
    inOrder: 0,
    name: "Antipasti di verdura",
    tab: "Salads",
    imgSrc: "assets/Grilled_vegetable_antipasti.jpg",
    price: 12.5,
    description: "Grilled antipasti vegetables",
    ingredients: ["Carrot", "Tomato", "Eggplant", "Zucchini", "Olive Oil"],
    addOns: ["red Bell Pepper", "Corn", "Parmesan"],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  //Pizza ---------------------------------------------------------------
  {
    id: "7",
    inOrder: 0,
    name: "Pizza alla Marinara",
    tab: "Pizza",
    imgSrc: "assets/PizzaMare.jpg",
    price: 10.8,
    description:
      "Pizza alla Marinara with tomatoes, cheese, calamari, shrimp, mussels, garlic",
    ingredients: [
      "Cheese",
      "Tomato",
      "Calamari",
      "Shrimp",
      "Mussels",
      "Garlic",
      "Crustaceans",
      "Fish",
      "Celery",
      "Mollusc",
      "Sulfites",
    ],
    addOns: ["Corn", "no Garlic", "extra Cheese"],
    dietCompatible: [false, false, false, true, false, true, false],
  },
  {
    id: "8",
    inOrder: 0,
    name: "Pizza Salami",
    tab: "Pizza",
    imgSrc: "assets/Salamipizza.jpg",
    price: 8.95,
    description: "Pizza Salami with tomatoes, cheese, salami",
    ingredients: ["Cheese", "Tomato", "Salami"],
    addOns: ["extra Cheese"],
    dietCompatible: [false, false, false, true, true, false, false],
  },
  {
    id: "9",
    inOrder: 0,
    name: "Pizza Regina Vegano",
    tab: "Pizza",
    imgSrc: "assets/PizzaRegina.jpg",
    price: 9.8,
    description: "Pizza with artichokes or green chili peppers",
    ingredients: ["Artichokes", "Tomato", "Chili", "Sulfites"],
    addOns: ["no Artichokes", "no Chili", "Cheese"],
    dietCompatible: [true, false, true, true, true, true, true],
  },
  //Pasta --------------------------------------------------------------------------
  {
    id: "10",
    inOrder: 0,
    name: "Tagliatelle with salmon",
    tab: "Pasta",
    imgSrc: "assets/TagliatelleLachs.jpg",
    price: 13.9,
    description: "Tagliatelle with salmon and zucchini in lobster-sauce",
    ingredients: ["Salmon", "Zucchini", "Lobster", "Noodles", "Egg"],
    addOns: ["Parmesan"],
    dietCompatible: [false, false, false, true, false, true, true],
  },
  {
    id: "11",
    inOrder: 0,
    name: "Ravioli con spinaci e ricotta",
    tab: "Pasta",
    imgSrc: "assets/Ravioli.jpg",
    price: 12.5,
    description: "Homemade Ravioli with spinach and ricotta cheese",
    ingredients: ["Noodles", "Spinach", "Ricotta", "Egg"],
    addOns: ["Parmesan"],
    dietCompatible: [true, false, false, false, true, true, false],
  },
  {
    id: "12",
    inOrder: 0,
    name: "Tagliatelle con anatra",
    tab: "Pasta",
    imgSrc: "assets/TagliatelleDuck.jpg",
    price: 13.5,
    description: "Ribbon noodles with duck ragout",
    ingredients: ["Noodles", "Duck", "Celery", "Egg"],
    addOns: ["Parmesan", "Chives"],
    dietCompatible: [false, false, false, false, false, false, false],
  },
  //Fish ---------------------------------------------------------------------
  {
    id: "13",
    inOrder: 0,
    name: "Gamberoni all'aglio e peperoncino",
    tab: "Fish",
    imgSrc: "assets/Gamberoni.jpg",
    price: 29.9,
    description:
      "King prawns with garlic, red chili pepper with boiled potatoes and vegetables",
    ingredients: [
      "Prawns",
      "Garlic",
      "Chili",
      "Potato",
      "Tomato",
      "Zucchini",
      "Carrot",
      "Crustaceans",
    ],
    addOns: ["no Garlic", "no Chili"],
    dietCompatible: [false, true, false, true, false, true, true],
  },
  {
    id: "14",
    inOrder: 0,
    name: "Sogliola alla griglia",
    tab: "Fish",
    imgSrc: "assets/GrilledSole.png",
    price: 32,
    description: "Grilled sole with boiled potatoes and vegetables",
    ingredients: ["Sole", "Potato", "Tomato", "Zucchini", "Carrot"],
    addOns: [],
    dietCompatible: [false, true, false, true, false, true, true],
  },
  {
    id: "15",
    inOrder: 0,
    name: "Gilthead",
    tab: "Fish",
    imgSrc: "assets/Gilthead.jpg",
    price: 22.5,
    description:
      "Gilthead seabream in mustard-sauce with boiled potatoes and vegetables",
    ingredients: ["Gilthead", "Potato", "Tomato", "Zucchini", "Carrot"],
    addOns: [],
    dietCompatible: [false, true, false, false, false, true, true], //Vegetarian, glutenfree, vegan, halal, kosher, prescetarian, lactosefree
  },
  //Meat -----------------------------------------------------------------
  {
    id: "16",
    inOrder: 0,
    name: "Straccetti alla Romana",
    tab: "Meat",
    imgSrc: "assets/Straccetti.png",
    price: 29.5,
    description:
      "Thin stripes of beef with garlic and red chili pepper served with fried potatoes and vegetables",
    ingredients: [
      "Beef",
      "Potato",
      "Tomato",
      "Zucchini",
      "Carrot",
      "Garlic",
      "Chili",
    ],
    addOns: ["no Garlic", "no Chili"],
    dietCompatible: [false, true, false, false, false, false, true],
  },
  {
    id: "17",
    inOrder: 0,
    name: "Veal with gorgonzola",
    tab: "Meat",
    imgSrc: "assets/VealGorgonzola.jpg",
    price: 23.8,
    description:
      "Medaillon of veal in gorgonzola-sauce served with fried potatoes and vegetables",
    ingredients: [
      "Veal",
      "Potato",
      "Tomato",
      "Zucchini",
      "Carrot",
      "Gorgonzola",
    ],
    addOns: [],
    dietCompatible: [false, true, false, false, false, false, false],
  },
  //Dessert -----------------------------------------------------------
  {
    id: "18",
    inOrder: 0,
    name: "Tiramisu speciale",
    tab: "Dessert",
    imgSrc: "assets/Tiramisu.jpg",
    price: 7.2,
    description: "Tiramisu with almond sponge",
    ingredients: ["Almond", "Egg", "Peanut", "Nuts", "Alcohol"],
    addOns: ["no Almonds", "extra Almonds"],
    dietCompatible: [true, false, false, true, false, true, false],
  },
  {
    id: "19",
    inOrder: 0,
    name: "Mousse au chocolat",
    tab: "Dessert",
    imgSrc: "assets/Mousse.jpg",
    price: 6.8,
    description: "",
    ingredients: ["Egg", "Nuts"],
    addOns: ["Mint"],
    dietCompatible: [true, false, false, true, false, true, false],
  },
  {
    id: "20",
    inOrder: 0,
    name: "Panna cotta",
    tab: "Dessert",
    imgSrc: "assets/PannaCotta.jpg",
    price: 6.8,
    description: "",
    ingredients: ["Cream", "Strawberry"],
    addOns: ["extra Strawberry Sauce"],
    dietCompatible: [true, true, false, true, true, true, false],
  },
  //Hot Drinks ------------------------------------------------------------
  {
    id: "21",
    inOrder: 0,
    name: "Espresso",
    tab: "Hot Drinks",
    imgSrc: "assets/Espresso.jpg",
    price: 2.65,
    description: "",
    ingredients: [],
    addOns: [],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  {
    id: "22",
    inOrder: 0,
    name: "Cappuccino",
    tab: "Hot Drinks",
    imgSrc: "assets/Cappuccino.jpg",
    price: 3.8,
    description: "",
    ingredients: [],
    addOns: [],
    dietCompatible: [true, true, true, true, true, true, false], //Vegetarian, glutenfree, vegan, halal, kosher, prescetarian, lactosefree
  },
  {
    id: "23",
    inOrder: 0,
    name: "Tea",
    tab: "Hot Drinks",
    imgSrc: "assets/Tea.png",
    price: 2.95,
    description: "",
    ingredients: [],
    addOns: ["Peppermint", "Apple", "Wild Berries", "Camomile", "Earl Grey"],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  //Soft Drink -------------------------------------------------------
  {
    id: "24",
    inOrder: 0,
    name: "Cola",
    tab: "Soft drinks",
    imgSrc: "assets/coca_cola.jpg",
    price: 2.95,
    description: "",
    ingredients: [],
    addOns: ["Lemon"],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  {
    id: "25",
    inOrder: 0,
    name: "Apple Juice",
    tab: "Soft drinks",
    imgSrc: "assets/AppleJuice.jpg",
    price: 2.95,
    description: "",
    ingredients: ["Apple"],
    addOns: [],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  {
    id: "26",
    inOrder: 0,
    name: "Orange Juice",
    tab: "Soft drinks",
    imgSrc: "assets/OrangeJuice.jpg",
    price: 2.95,
    description: "",
    ingredients: ["Orange"],
    addOns: [],
    dietCompatible: [true, true, true, true, true, true, true],
  },
  //Alcoholic drinks ----------------------------------------------------
  {
    id: "27",
    inOrder: 0,
    name: "Spaten Helles from draft",
    tab: "Alcoholic drinks",
    imgSrc: "assets/Spaten.jpg",
    price: 4.75,
    description: "Spaten Helles from draft 0,5l",
    ingredients: ["Alcohol"],
    addOns: [],
    dietCompatible: [true, true, true, false, true, true, true],
  },
  {
    id: "28",
    inOrder: 0,
    name: "Lambrusco",
    tab: "Alcoholic drinks",
    imgSrc: "assets/Lambrusco.jpg",
    price: 6.95,
    description: "Red wine 0.25l",
    ingredients: ["Alcohol"],
    addOns: [],
    dietCompatible: [true, true, true, false, true, true, true],
  },
  {
    id: "29",
    inOrder: 0,
    name: "Chivas regal",
    tab: "Alcoholic drinks",
    imgSrc: "assets/Chivas.png",
    price: 16,
    description: "Whisky 40%Vol 4cl",
    ingredients: ["Alcohol"],
    addOns: [],
    dietCompatible: [true, true, true, false, true, true, true],
  },
];