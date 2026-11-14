// Everything a client might want to change lives here.
// Images come from DummyJSON's sample recipe photos (test data, swap before launch).

const dj = (n) => `https://cdn.dummyjson.com/recipe-images/${n}.webp`;
export const introImage = dj(9);

export const brand = {
  name: "Your Company",
  logo: null, // e.g. "/logo.png" (file in /public). null = text wordmark from `name`
  phone: "00000 00000",
  email: "contact@example.com",
  offer: { bold: "Upto Rs. 200 OFF", rest: "on the First Order. T&C apply" },
};

// `to` is a route. "/#products" means "home page, products section".
export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Order Now", to: "/store-locator" },
  { label: "Contact", to: "/contact" },
  { label: "Speciality Cakes", to: "/products?section=Desserts" },
  { label: "Blogs", to: "/blogs" },
  { label: "Festive Gifting", to: "/products?section=Featured%20Items" },
];

export const heroSlides = [
  {
    title: "Gifts That Make Them Smile",
    sub: "THE SWEETEST UPGRADE FOR YOUR FESTIVE GIFTING.",
    cta: "ORDER NOW",
    bg: "linear-gradient(135deg, #C98B69, #A8613F)",
    image: dj(23),
  },
  {
    title: "Brownies Baked Fresh Daily",
    sub: "WARM, FUDGY AND READY WHEN YOU ARE.",
    cta: "ORDER NOW",
    bg: "linear-gradient(135deg, #D9A66F, #9C6A3C)",
    image: dj(3),
    align: "left",
  },
];

export const intro = {
  title: "Food of The Gods, Freshly Baked!",
  text: "Since 2004, we’ve been serving our guests the best quality treats, traditionally made and presented with care.",
  features: [
    { title: "Authentic Recipes", text: "Our products are based on traditional home-style recipes using fresh ingredients." },
    { title: "Baked with Love", text: "Our passion for baking is poured into every recipe, serving smiles on a plate." },
    { title: "Committed to Quality", text: "From our kitchen operations to our guest services, we always prioritize quality." },
    { title: "Honestly Priced", text: "We constantly strive to offer the best products at the right prices." },
  ],
};

export const categories = [
  { label: "Pizza", tone: "#F3D9B8", image: dj(1) },
  { label: "Pasta", tone: "#EFE2D0", image: dj(4) },
  { label: "Salads", tone: "#E5EFD0", image: dj(6) },
  { label: "Cookies", tone: "#E8D7CE", image: dj(3) },
  { label: "Desserts", tone: "#F6D4CF", image: dj(23) },
  { label: "Curries", tone: "#F5DFC4", image: dj(21) },
  { label: "Smoothies", tone: "#CFE3F3", image: dj(25) },
  { label: "Street food", tone: "#D9D2D2", image: dj(26) },
];

export const promo = {
  title: "From Cravings to Savings!",
  text: "Earn brownie points every time you order and redeem them on your next order!",
  cta: "Start Earning",
};

export const testimonials = [
  { quote: "The chocolate truffle here is unforgettable. A must-visit for anyone with a sweet tooth.", name: "Priya Sharma, Mumbai" },
  { quote: "Ordered a hamper for my sister and the packaging alone made her day.", name: "Rohan Mehta, Pune" },
  { quote: "Fresh, never too sweet, and the delivery was right on time.", name: "Ananya Das, Kolkata" },
];

export const cta = {
  title: "Like Our Products?",
  text: "Treat yourself to your favourite products or surprise your loved ones with an edible gift.",
  button: "Know More",
};

// ---------- About page ----------
export const about = {
  intro: [
    "Cocoa & Co. takes its name from the Greek words for ‘food of the gods’, befitting our indulgent range of brownies, cakes, desserts, chocolates, breads and savouries.",
    "From our humble beginnings in 2004, when the first store opened its doors in a busy city market, we’ve grown into a chain of patisseries with stores in over 30 cities.",
    "Our mission is to spread happiness by serving smiles on a plate, and this journey continues as we open new patisseries across the country.",
  ],
  // Swap these for real store photos. Sample images only.
  gallery: [dj(23), dj(3), dj(25), dj(6), dj(1)].map((image, i) => ({
    image,
    alt: `Sample store photo ${i + 1}`,
  })),
  promises: [
    { icon: "cake", title: "Authentic Recipes", text: "Our products are based on traditional home-style recipes, using fresh ingredients." },
    { icon: "heart", title: "Baked with Love", text: "Our passion for baking is poured into every recipe, serving smiles on a plate everyday." },
    { icon: "tag", title: "Honestly Priced", text: "We constantly strive to offer the best products at the right prices." },
    { icon: "shield", title: "Committed to Quality", text: "From our ingredients to our kitchen operations & guest services, we always prioritize quality." },
  ],
  team: [
    {
      name: "Alex Morgan",
      role: "Chief Executive Officer",
      tone: "#D9D2D2",
      image: null,
      bio: "With over 20 years of international management experience, Alex has a track record of increasing sales and growing the bottom line while driving operational excellence across every store. Alex leads the company’s expansion plans and its guest-first culture.",
    },
    {
      name: "Sam Rivera",
      role: "Head — Production, Product Development & Innovation",
      tone: "#E8D7CE",
      image: null,
      bio: "With over 18 years of culinary and F&B experience, Sam heads Production and New Product Development. A graduate of a leading hospitality school, Sam has trained in kitchens across three continents and leads the team behind every new recipe.",
    },
  ],
};

export const footer = {
  ai: ["ChatGPT", "Claude", "Perplexity", "Google AI"],
  payments: ["Mastercard", "GPay", "Paytm", "Visa", "UPI"],
  links: [
    "Store Locator", "Privacy Policy", "Terms & Conditions", "Nutritional Information",
    "FAQs", "CSR", "Promo Codes", "Refund Policy", "Cookie Policy", "Sitemap",
    "Our Story", "Corporate Gifting", "Manufacturing Units", "Whistle Blower Policy",
  ],
};

// ---------- Store locator ----------
// Sample branches. opens/closes are 24h "HH:MM" in India time. lat/lng place the map pin.
const PH = brand.phone;
export const stores = [
  { id: "mum-chembur", area: "Chembur", city: "Mumbai", phone: PH, lat: 19.0522, lng: 72.9005, opens: "09:00", closes: "23:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: true },
  { id: "mum-bandra", area: "Bandra West", city: "Mumbai", phone: PH, lat: 19.0596, lng: 72.8295, opens: "08:00", closes: "01:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: true },
  { id: "mum-powai", area: "Powai", city: "Mumbai", phone: PH, lat: 19.1176, lng: 72.906, opens: "10:00", closes: "22:00", delivery: true, pickup: false, vegOnly: true, isNew: true, directPay: false },
  { id: "blr-hsr", area: "HSR Layout", city: "Bengaluru", phone: PH, lat: 12.9116, lng: 77.6474, opens: "09:00", closes: "23:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: true },
  { id: "blr-indiranagar", area: "Indiranagar", city: "Bengaluru", phone: PH, lat: 12.9784, lng: 77.6408, opens: "09:00", closes: "23:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: false },
  { id: "blr-sarjapur", area: "Sarjapur Road", city: "Bengaluru", phone: PH, lat: 12.901, lng: 77.687, opens: "10:00", closes: "22:00", delivery: true, pickup: true, vegOnly: false, isNew: true, directPay: true },
  { id: "del-cp", area: "Connaught Place", city: "Delhi", phone: PH, lat: 28.6315, lng: 77.2167, opens: "10:00", closes: "23:00", delivery: false, pickup: true, vegOnly: false, isNew: false, directPay: true },
  { id: "del-saket", area: "Saket", city: "Delhi", phone: PH, lat: 28.5245, lng: 77.2066, opens: "09:00", closes: "22:00", delivery: true, pickup: true, vegOnly: true, isNew: false, directPay: false },
  { id: "del-dwarka", area: "Dwarka", city: "Delhi", phone: PH, lat: 28.5921, lng: 77.046, opens: "10:00", closes: "22:00", delivery: true, pickup: true, vegOnly: false, isNew: true, directPay: false },
  { id: "kol-park", area: "Park Street", city: "Kolkata", phone: PH, lat: 22.5535, lng: 88.352, opens: "09:00", closes: "23:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: true },
  { id: "kol-saltlake", area: "Salt Lake", city: "Kolkata", phone: PH, lat: 22.5867, lng: 88.417, opens: "10:00", closes: "22:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: false },
  { id: "che-tnagar", area: "T. Nagar", city: "Chennai", phone: PH, lat: 13.0418, lng: 80.2341, opens: "09:00", closes: "23:00", delivery: true, pickup: true, vegOnly: false, isNew: false, directPay: true },
  { id: "che-adyar", area: "Adyar", city: "Chennai", phone: PH, lat: 13.0067, lng: 80.257, opens: "10:00", closes: "22:00", delivery: true, pickup: false, vegOnly: false, isNew: true, directPay: false },
];

// ---------- Contact page ----------
export const contact = {
  company: "Cocoa & Co. Foods Private Limited",
  address: ["12/34, Sample Industrial Road, Sample Nagar,", "Mumbai - 400000,", "Maharashtra, India"],
  officer: { name: "Ms. Jane Doe", role: "General Counsel & Company Secretary" },
};

// ---------- Blog ----------
// Sample articles. date is ISO (YYYY-MM-DD). body is one string per paragraph.
export const posts = [
  {
    slug: "easter-dessert-ideas",
    title: "Best Easter Dessert Ideas for Home Celebrations",
    date: "2026-06-04",
    mins: 5,
    image: dj(23),
    body: [
      "Easter tables are at their best when dessert feels playful. A light sponge with pastel icing, a tray of brownies cut into small squares, or a simple cheesecake with fresh berries all work for a crowd.",
      "Plan one showpiece and a few easy extras. Guests remember the centrepiece, and the extras keep everyone happy while it is being cut.",
    ],
  },
  {
    slug: "holi-celebration-ideas",
    title: "Holi Celebration Ideas & Gift Inspiration",
    date: "2026-06-02",
    mins: 4,
    image: dj(3),
    body: [
      "Holi is about colour, and sweets are no exception. Bright layered cakes, jars of cookies and boxed treats make easy gifts for neighbours and friends.",
      "Pack gifts in sturdy boxes, since the day tends to be messy. A small handwritten note goes a long way.",
    ],
  },
  {
    slug: "how-to-eat-a-croissant",
    title: "How to Eat a Croissant & Appreciate Every Layer",
    date: "2026-05-28",
    mins: 3,
    image: dj(25),
    body: [
      "A good croissant is shatteringly crisp outside and soft inside. Eat it fresh, ideally within a few hours of baking.",
      "Tear it rather than slicing it. You will see the honeycomb of layers, and every piece carries a bit of crust.",
    ],
  },
  {
    slug: "gift-hampers-under-1000",
    title: "Best Gift Hampers Under Rs. 1,000",
    date: "2026-05-20",
    mins: 4,
    image: dj(6),
    body: [
      "A good hamper does not need to be expensive. Mix one hero item with two or three small ones, such as a loaf cake, a pack of cookies and a chocolate bar.",
      "Keep the theme simple, like coffee and chocolate or tea-time, so the box feels chosen rather than assembled.",
    ],
  },
  {
    slug: "ways-to-enjoy-biscuits",
    title: "Different Ways to Enjoy Biscuits & Cookies",
    date: "2026-05-12",
    mins: 3,
    image: dj(1),
    body: [
      "Cookies are not just for dunking. Crumble them over ice cream, sandwich two with a spoon of spread, or use them as the base of a quick no-bake dessert.",
      "Store them airtight and warm them briefly before serving. It brings back the just-baked texture.",
    ],
  },
  {
    slug: "all-about-dark-chocolate",
    title: "Everything to Know About Dark Chocolate",
    date: "2026-05-05",
    mins: 6,
    image: dj(9),
    body: [
      "The percentage on a dark chocolate bar tells you how much of it comes from cocoa. Higher numbers taste more bitter and less sweet.",
      "Start around 60 percent and work upwards. Pair it with fruit, nuts or coffee to bring out different flavours.",
    ],
  },
];