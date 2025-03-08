
export interface CarType {
  id: number;
  name: string;
  category: string;
  price: number;
  perDay: boolean;
  image: string;
  images?: string[];
  specs: string[];
  description?: string;
  features?: string[];
  availableDates?: string[];
  locations?: string[];
}

export const luxuryCars: CarType[] = [
  {
    id: 1,
    name: "Lamborghini Aventador",
    category: "Supercar",
    price: 50000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1770&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=1664&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1770&auto=format&fit=crop"
    ],
    specs: ["700+ HP", "0-100 km/h: 2.9s", "Top Speed: 350 km/h"],
    description: "Experience the raw power and cutting-edge design of the Lamborghini Aventador. This legendary supercar combines blistering performance with unmistakable Italian styling to create an unforgettable driving experience.",
    features: [
      "V12 engine",
      "Carbon fiber monocoque",
      "Scissor doors",
      "Four-wheel drive",
      "Advanced aerodynamics"
    ],
    locations: ["Mumbai", "Delhi", "Bangalore"]
  },
  {
    id: 2,
    name: "Rolls-Royce Phantom",
    category: "Luxury Sedan",
    price: 35000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1631295387882-d88acfaa7473?q=80&w=1770&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631295387882-d88acfaa7473?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1635701712050-daecaca280d6?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1769&auto=format&fit=crop"
    ],
    specs: ["V12 Engine", "Handcrafted Interior", "Starlight Headliner"],
    description: "The epitome of luxury motoring, the Rolls-Royce Phantom delivers an unmatched experience of serenity and prestige. Handcrafted with the finest materials and meticulous attention to detail, the Phantom offers supreme comfort for both driver and passengers.",
    features: [
      "Bespoke interior",
      "Acoustic insulation",
      "Rear-hinged coach doors",
      "Hand-polished exterior",
      "Custom veneer options"
    ],
    locations: ["Delhi", "Mumbai", "Hyderabad"]
  },
  {
    id: 3,
    name: "Ferrari 488 Spider",
    category: "Convertible",
    price: 45000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1770&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622199678883-497bd9276e80?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592805723127-004b174a1798?q=80&w=1770&auto=format&fit=crop"
    ],
    specs: ["670 HP", "0-100 km/h: 3.0s", "Twin-Turbo V8"],
    description: "Feel the wind in your hair and the thrill of Ferrari's engineering excellence in the 488 Spider. With its retractable hardtop and race-derived performance, this convertible supercar delivers breathtaking acceleration and precise handling.",
    features: [
      "Retractable hardtop",
      "Flat-plane crank V8",
      "Side slip control system",
      "Forged wheels",
      "Carbon-ceramic brakes"
    ],
    locations: ["Goa", "Mumbai", "Chennai"]
  },
  {
    id: 4,
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    price: 30000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1770&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626650156807-4a4e841e3757?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506719040632-7d586470c936?q=80&w=2010&auto=format&fit=crop"
    ],
    specs: ["W12 Engine", "Hand-stitched Leather", "All-Wheel Drive"],
    description: "The Bentley Continental GT perfectly balances opulent luxury with sporting performance. This grand tourer combines exquisite craftsmanship with powerful dynamics to create the ideal companion for cross-country journeys in ultimate comfort and style.",
    features: [
      "Diamond-quilted leather seats",
      "Rotating dashboard display",
      "Naim audio system",
      "Active all-wheel drive",
      "Air suspension"
    ],
    locations: ["Delhi", "Jaipur", "Udaipur"]
  },
  {
    id: 5,
    name: "Aston Martin DBS",
    category: "Sports Car",
    price: 40000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1576220258822-153a71c0d3e4?q=80&w=1964&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576220258822-153a71c0d3e4?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1770&auto=format&fit=crop"
    ],
    specs: ["715 HP", "0-100 km/h: 3.4s", "V12 Engine"],
    description: "The Aston Martin DBS represents the pinnacle of British automotive design and engineering. This grand tourer combines aggressive styling with refined performance to deliver an exhilarating driving experience wrapped in luxurious comfort.",
    features: [
      "Carbon fiber body panels",
      "Adaptive suspension",
      "Brembo carbon ceramic brakes",
      "Hand-stitched leather interior",
      "Bang & Olufsen sound system"
    ],
    locations: ["Mumbai", "Pune", "Bangalore"]
  },
  {
    id: 6,
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    price: 25000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1550949392-8f8ede557fa4?q=80&w=1770&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550949392-8f8ede557fa4?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551359725-68bb93e5aab9?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559416523-4e07fbe5ef56?q=80&w=1771&auto=format&fit=crop"
    ],
    specs: ["V8 Supercharged", "Air Suspension", "All-Terrain Capability"],
    description: "The Range Rover Autobiography represents the ultimate luxury SUV experience. Combining off-road capability with opulent comfort, this flagship model delivers serene transportation across any landscape while cocooning occupants in lavish surroundings.",
    features: [
      "Semi-aniline leather seats",
      "Executive Class rear seating",
      "Meridian Signature sound system",
      "Terrain Response 2",
      "Activity Key"
    ],
    locations: ["Delhi", "Chandigarh", "Jaipur", "Mumbai"]
  },
  {
    id: 7,
    name: "Mercedes-AMG GT",
    category: "Sports Car",
    price: 35000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1770&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605515298946-d0f7396bc814?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-4849ff89d366?q=80&w=1770&auto=format&fit=crop"
    ],
    specs: ["500+ HP", "0-100 km/h: 3.8s", "Twin-Turbo V8"],
    description: "The Mercedes-AMG GT combines distinctive styling with breathtaking performance. With its long hood, set-back cabin, and muscular rear haunches, this front-mid-engine sports car delivers both visual drama and exhilarating driving dynamics.",
    features: [
      "AMG SPEEDSHIFT transmission",
      "Active aerodynamics",
      "AMG RIDE CONTROL suspension",
      "Burmester surround sound",
      "Race mode"
    ],
    locations: ["Bangalore", "Hyderabad", "Chennai"]
  },
  {
    id: 8,
    name: "Porsche 911 Turbo S",
    category: "Sports Car",
    price: 38000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=1771&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=1771&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop"
    ],
    specs: ["650 HP", "0-100 km/h: 2.7s", "All-Wheel Drive"],
    description: "The iconic Porsche 911 Turbo S represents the pinnacle of sports car engineering. With its distinctive silhouette and blistering performance, this everyday supercar delivers precision handling, relentless acceleration, and surprising practicality.",
    features: [
      "Twin-turbocharged flat-six engine",
      "Porsche Active Suspension Management",
      "Rear-axle steering",
      "Sport Chrono Package",
      "Carbon ceramic brakes"
    ],
    locations: ["Mumbai", "Delhi", "Bangalore"]
  }
];
