const cards = [
  {
    id: 1,
    name: "F-16 Fighting Falcon",
    image: "images/f16.jpg",
    categories: {
      Speed: 2410,
      Power: 29000,
      "Service Ceiling": 15240,
      "Flight Range": 4220
    }
  },
  {
    id: 2,
    name: "F-22 Raptor",
    image: "images/f22.jpg",
    categories: {
      Speed: 2410,
      Power: 35000,
      "Service Ceiling": 20000,
      "Flight Range": 2960
    }
  },
  {
    id: 3,
    name: "MiG-29 Fulcrum",
    image: "images/mig29.jpg",
    categories: {
      Speed: 2450,
      Power: 25000,
      "Service Ceiling": 18000,
      "Flight Range": 1430
    }
  },
  {
    id: 4,
    name: "Su-27 Flanker",
    image: "images/su27.jpg",
    categories: {
      Speed: 2500,
      Power: 24500,
      "Service Ceiling": 19000,
      "Flight Range": 3500
    }
  },
  {
    id: 5,
    name: "Eurofighter Typhoon",
    image: "images/typhoon.jpg",
    categories: {
      Speed: 2495,
      Power: 32000,
      "Service Ceiling": 19000,
      "Flight Range": 2900
    }
  },
  {
    id: 6,
    name: "Dassault Rafale",
    image: "images/rafale.jpg",
    categories: {
      Speed: 1912,
      Power: 24000,
      "Service Ceiling": 15000,
      "Flight Range": 3700
    }
  },
  {
    id: 7,
    name: "F-35 Lightning II",
    image: "images/f35.jpg",
    categories: {
      Speed: 1930,
      Power: 43000,
      "Service Ceiling": 15240,
      "Flight Range": 2200
    }
  },
  {
    id: 8,
    name: "JAS 39 Gripen",
    image: "images/gripen.jpg",
    categories: {
      Speed: 2200,
      Power: 18000,
      "Service Ceiling": 15000,
      "Flight Range": 3200
    }
  },
  {
    id: 9,
    name: "F-15 Eagle",
    image: "images/f15.jpg",
    categories: {
      Speed: 2655,
      Power: 29000,
      "Service Ceiling": 20000,
      "Flight Range": 3400
    }
  },
  {
    id: 10,
    name: "MiG-31 Foxhound",
    image: "images/mig31.jpg",
    categories: {
      Speed: 3000,
      Power: 33000,
      "Service Ceiling": 21000,
      "Flight Range": 3500
    }
  },
  {
    id: 11,
    name: "F-14 Tomcat",
    image: "images/f14.jpg",
    categories: {
      Speed: 2500,
      Power: 32000,
      "Service Ceiling": 17000,
      "Flight Range": 3330
    }
  },
  {
    id: 12,
    name: "Su-35",
    image: "images/su35.jpg",
    categories: {
      Speed: 2500,
      Power: 28000,
      "Service Ceiling": 18000,
      "Flight Range": 3600
    }
  },
  {
    id: 13,
    name: "F-4 Phantom II",
    image: "images/f4.jpg",
    categories: {
      Speed: 2420,
      Power: 25000,
      "Service Ceiling": 18000,
      "Flight Range": 2400
    }
  },
  {
    id: 14,
    name: "Mirage 2000",
    image: "images/mirage2000.jpg",
    categories: {
      Speed: 2400,
      Power: 21000,
      "Service Ceiling": 17000,
      "Flight Range": 1400
    }
  },
  {
    id: 15,
    name: "Tornado IDS",
    image: "images/tornado.jpg",
    categories: {
      Speed: 2500,
      Power: 25000,
      "Service Ceiling": 15240,
      "Flight Range": 3900
    }
  },
  {
    id: 16,
    name: "F-5 Tiger II",
    image: "images/f5.jpg",
    categories: {
      Speed: 1520,
      Power: 8500,
      "Service Ceiling": 15240,
      "Flight Range": 1300
    }
  },
  {
    id: 17,
    name: "J-20 Mighty Dragon",
    image: "images/j20.jpg",
    categories: {
      Speed: 2100,
      Power: 30000,
      "Service Ceiling": 19000,
      "Flight Range": 1600
    }
  },
  {
    id: 18,
    name: "F-104 Starfighter",
    image: "images/f104.jpg",
    categories: {
      Speed: 2400,
      Power: 16000,
      "Service Ceiling": 15800,
      "Flight Range": 1600
    }
  },
  {
    id: 19,
    name: "Su-57 Felon",
    image: "images/su57.jpg",
    categories: {
      Speed: 2600,
      Power: 35000,
      "Service Ceiling": 20000,
      "Flight Range": 3500
    }
  },
  {
    id: 20,
    name: "AV-8B Harrier II",
    image: "images/harrier.jpg",
    categories: {
      Speed: 1170,
      Power: 22000,
      "Service Ceiling": 15240,
      "Flight Range": 2100
    }
  },
  {
    id: 21,
    name: "Lockheed SR-71",
    image: "images/sr71.jpg",
    categories: {
      Speed: 3540,
      Power: 34000,
      "Service Ceiling": 26000,
      "Flight Range": 5400
    }
  },
  {
    id: 22,
    name: "A-10 Thunderbolt",
    image: "images/a10.jpg",
    categories: {
      Speed: 706,
      Power: 18000,
      "Service Ceiling": 13700,
      "Flight Range": 3700
    }
  },
  {
    id: 23,
    name: "FA-18 Super Hornet",
    image: "images/fa18.jpg",
    categories: {
      Speed: 1915,
      Power: 29000,
      "Service Ceiling": 15240,
      "Flight Range": 2200
    }
  },
  {
    id: 24,
    name: "HAL Tejas",
    image: "images/tejas.jpg",
    categories: {
      Speed: 2040,
      Power: 17000,
      "Service Ceiling": 16000,
      "Flight Range": 1800
    }
  },
  {
    id: 25,
    name: "J-10",
    image: "images/j10.jpg",
    categories: {
      Speed: 2120,
      Power: 23000,
      "Service Ceiling": 18000,
      "Flight Range": 1600
    }
  },
  {
    id: 26,
    name: "J-31",
    image: "images/j31.jpg",
    categories: {
      Speed: 1930,
      Power: 20000,
      "Service Ceiling": 18000,
      "Flight Range": 1400
    }
  }
];