export const SITE = {
  name: "Thirumalaai Traders",
  tagline: "Serving Quality. Delivering Trust.",
  positioning:
    "Nourishing Communities, Empowering Institutions – Your Trusted Wholesale Partner for School, College & Industrial Canteens.",
  description:
    "Thirumalaai Traders is a trusted wholesale grocery supplier in Erode with 25+ years of experience serving schools, colleges, industries, mills, grocery shops and bulk customers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.thirumalaaitraders.com",
  email: "thirumalaaigroupofcompanies@gmail.com",
  whatsapp: "919384482007",
  whatsappMessage:
    "Hello Thirumalaai Traders, I would like to enquire about wholesale grocery products.",
  officePhone: "93844 82007",
  address: {
    line1: "Varakappar Street, Janakiammal Layout,",
    line2: "Karungalpalayam, Erode,",
    state: "Tamil Nadu – 638003, India",
  },
} as const;

export const MANAGEMENT = [
  { name: "R. Muniappan", role: "Managing Director", phone: "98426 98877" },
  { name: "R. Sakthivel", role: "Director", phone: "98426 92007" },
];

export const OFFICE = [{ name: "Office", role: "", phone: "93844 82007" }];

export const SALES_TEAM = [
  { name: "Karthik", role: "Sales Manager", phone: "77086 87365" },
  { name: "Praveen Kumar", role: "Sales Manager", phone: "99658 38751" },
  { name: "Gunotham", role: "Regional Sales Manager", phone: "98402 48877" },
];

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/industries-we-serve", label: "Industries" },
  { href: "/wholesale-supply", label: "Wholesale" },
  { href: "/why-choose-us", label: "Why Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/products", label: "Products" },
  { href: "/industries-we-serve", label: "Industries We Serve" },
  { href: "/wholesale-supply", label: "Wholesale Supply" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/quality", label: "Quality" },
  { href: "/clients", label: "Clients" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const CUSTOMER_TYPES = [
  "School",
  "College",
  "Industrial Canteen",
  "Mill",
  "Factory",
  "Grocery Shop",
  "Distributor",
  "Bulk Buyer",
  "Other",
] as const;

export const ENQUIRY_STATUSES = ["New", "Contacted", "In Progress", "Converted", "Closed"] as const;

export const INDUSTRIES = [
  {
    title: "School Canteens",
    desc: "Reliable grocery supply for school canteens, with consistent quality and scheduled deliveries.",
  },
  {
    title: "College Canteens",
    desc: "Bulk grocery requirements for college kitchens and canteens, supplied at competitive wholesale prices.",
  },
  {
    title: "Industrial Canteens",
    desc: "Regular, dependable supply for employee and industrial kitchens of every scale.",
  },
  {
    title: "Mill Canteens",
    desc: "Consistent grocery supply supporting mill operations and their workforce.",
  },
  {
    title: "Factories",
    desc: "Bulk food and grocery requirements for factories, delivered on schedule.",
  },
  {
    title: "Grocery Shops",
    desc: "Wholesale supply for retail grocery businesses with flexible order quantities.",
  },
  {
    title: "Bulk Customers",
    desc: "Flexible, large-volume supply arrangements for bulk and institutional buyers.",
  },
] as const;

export const WHY_CHOOSE_US = [
  { title: "25+ Years of Experience", desc: "Over two decades of wholesale grocery supply expertise." },
  { title: "Trusted by 1000+ Customers", desc: "Long-standing relationships across institutions and businesses." },
  { title: "Specialized in Canteen & Institutional Supplies", desc: "Deep understanding of institutional kitchen requirements." },
  { title: "Consistent Quality Assurance", desc: "Careful sourcing and quality checks on every consignment." },
  { title: "Competitive Wholesale Prices", desc: "Value-driven pricing built for volume purchasing." },
  { title: "Timely Delivery", desc: "Dependable delivery schedules you can plan around." },
  { title: "Bulk Supply Capability", desc: "Capacity to fulfil large and recurring orders." },
  { title: "Hygienic Packing", desc: "Clean, careful packing that protects product quality." },
  { title: "Trusted Brands", desc: "Established, reliable product brands sourced responsibly." },
  { title: "Dedicated Customer Support", desc: "A responsive sales team that knows your business." },
  { title: "Long-Term Partnerships", desc: "We grow with our customers, year after year." },
  { title: "Flexible Supply for Small & Bulk Orders", desc: "Order quantities tailored to your requirement." },
] as const;

export const CLIENTS = [
  "Sagar",
  "CMS",
  "Erode Sengunthar Engineering College",
  "Pallavaa Group",
  "SPK",
  "PSG College",
  "Hindusthan College",
  "Best Corporation",
  "SCM Mills",
  "SKL Mill",
] as const;

export const FAQS = [
  {
    q: "Do you supply in bulk?",
    a: "Yes. Bulk supply is our core business. We serve institutions, canteens, mills, factories and retail businesses with large-volume and recurring grocery requirements.",
  },
  {
    q: "Do you supply to colleges?",
    a: "Yes, we are specialised suppliers to college canteens and kitchens, including several leading institutions in the region.",
  },
  {
    q: "Do you supply to school canteens?",
    a: "Yes. We provide reliable, regular grocery supply to school canteens with quality products suited to institutional kitchens.",
  },
  {
    q: "Do you supply to industrial canteens?",
    a: "Yes. Industrial canteens are one of our key segments, with scheduled deliveries and consistent supply for employee kitchens.",
  },
  {
    q: "Do you supply grocery shops?",
    a: "Yes. We are a wholesale source for retail grocery shops, offering competitive wholesale pricing across our product range.",
  },
  {
    q: "Can we request wholesale pricing?",
    a: "Yes. Please submit an enquiry through our website, call our office or message us on WhatsApp with your requirements and we will share our wholesale price list.",
  },
  {
    q: "Do you provide regular supply?",
    a: "Yes. We support scheduled, recurring supply arrangements for canteens and institutions so your kitchen never runs short.",
  },
  {
    q: "Do you deliver within Erode?",
    a: "Yes, we deliver across Erode including Karungalpalayam and surrounding areas. For locations outside Erode, please contact our sales team to discuss your requirement.",
  },
  {
    q: "Can we enquire for large quantities?",
    a: "Absolutely. Large-quantity enquiries are welcome. Share your approximate quantity and delivery location and our team will respond with details.",
  },
  {
    q: "How can we contact the sales team?",
    a: "You can call our office at 93844 82007, reach our sales managers directly through the numbers on our Contact page, email us, or send us a WhatsApp message.",
  },
] as const;

export const VISION =
  "To become one of the most trusted and preferred wholesale grocery partners for institutions, industries, canteens and businesses by consistently delivering quality products, dependable service and value-driven solutions.";

export const MISSION = [
  "Supply quality grocery and food products at competitive wholesale prices.",
  "Ensure timely and reliable delivery for regular and bulk requirements.",
  "Serve the specific requirements of institutional, industrial and retail customers.",
  "Build long-term relationships based on trust, quality and service.",
  "Continuously expand product availability and supply capabilities.",
] as const;

export const CORE_VALUES = [
  { title: "Quality", desc: "Focus on supplying reliable and quality products." },
  { title: "Trust", desc: "Building long-term relationships through dependable business practices." },
  { title: "Reliability", desc: "Ensuring consistent supply and timely delivery." },
  { title: "Customer Partnership", desc: "Understanding and supporting the requirements of every customer." },
  { title: "Value", desc: "Providing competitive wholesale pricing and dependable service." },
] as const;
