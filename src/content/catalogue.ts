/**
 * The product catalogue: three product lines and the products in each.
 *
 * Product names, variants and grades are as published on krinicrude.com
 * (home page and the /lubricants, /construction and /aerosols pages, read
 * September and October 2026), and so are the lines' descriptions, the
 * pages' series names and the "Available products" in `range` (word for
 * word). The `about` and `uses`
 * lines explain in general terms what each type of product is for; they make
 * no claim about Krini Crude's own specifications. Anything the live site does
 * not state (technical data, pack sizes) is a placeholder().
 */
import { placeholder, type Placeholder } from "./placeholder";

export type Product = {
  id: string;
  name: string;
  /** Variants or grades, as listed on krinicrude.com. */
  variants?: string[];
  /** "Available products" under this category on krinicrude.com: each name and its description, word for word. */
  range?: { name: string; text: string }[];
  /** What this type of product does, in general terms. */
  about: string;
  /** Typical uses, in general terms. */
  uses?: string[];
  /** Krini Crude's own published claims for the product. */
  claims?: string[];
  /** Missing facts, shown as TBC chips. */
  tbc?: Placeholder[];
};

export type Line = {
  id: "lubricants" | "construction" | "aerosols";
  slug: string;
  index: string;
  title: string;
  short: string;
  /** The line's description on krinicrude.com (home page, "Our Product Range"), word for word. */
  description: string;
  /** The line's own page on krinicrude.com: its title and the line under it, word for word. */
  series: string;
  strap: string;
  image: string;
  imageAlt: string;
  seo: { title: string; description: string };
  /** The page's h1 (the paragraph under it is the description, above). */
  heading: string;
  products: Product[];
  /** Industries on krinicrude.com that this line serves (ids in site.industries). */
  industries: string[];
  faq: { q: string; a: string }[];
};

const TDS = placeholder("Technical data sheet");

export const lines: Line[] = [
  {
    id: "lubricants",
    slug: "lubricants",
    index: "01",
    title: "Lubricants & Greases",
    short: "Lubricants",
    description:
      "Premium quality lubricants and greases for automotive, industrial, and specialty applications. Our lubricants ensure optimal performance and longevity.",
    series: "1-COOL Metal Working Fluid Series",
    strap: "Cutting Oil • Soluble Cutting Oil • Rust Preventive • Hydraulic • Gear • Engine Oils",
    image: "/images/lubricants.webp",
    imageAlt: "A drop of amber lubricant stretching from a steel nozzle",
    seo: {
      title: "Cutting Oils, Coolants, Hydraulic, Gear & Engine Oils | Krini Crude",
      description:
        "1-COOL neat and soluble cutting oils, rust preventives, hydraulic oil 32/46/68, gear oil 90 to 320 and engine oils 15W40, 20W40, 5W30. Made in Chennai.",
    },
    heading: "1-COOL metalworking fluids and industrial lubricants.",
    products: [
      {
        id: "cutting-oil",
        name: "Cutting Oil",
        variants: ["Neat cutting oil", "Broaching", "Gear hobbing", "Stamping", "Drawing oil"],
        about:
          "Neat (straight) cutting oils are used undiluted. They lubricate the contact between tool and workpiece, which reduces friction and tool wear and helps give a good surface finish.",
        uses: ["Machining where lubrication at the cutting edge matters most", "Broaching and gear hobbing", "Stamping and drawing of sheet metal"],
        tbc: [TDS],
      },
      {
        id: "soluble-cutting-oil",
        name: "Soluble Cutting Oil",
        variants: ["Mineral coolant oil", "Semi-synthetic coolant oil"],
        range: [
          { name: "1-COOL Aquacut 150", text: "Mineral Coolant Oil" },
          { name: "1-COOL AL 5000", text: "Multimetal Semisynthetic Coolant Oil" },
          { name: "1-COOL AL 7000", text: "Premium Semi Synthetic Coolant Oil" },
        ],
        about:
          "Soluble cutting oils are mixed with water to make a coolant. The coolant carries heat away from the cutting zone, lubricates, flushes away chips and helps protect parts and machines from rust.",
        uses: ["Turning, milling, drilling and other machining with a coolant system", "Operations where cooling matters as much as lubrication"],
        tbc: [TDS, placeholder("Recommended mixing ratio")],
      },
      {
        id: "rust-preventive-oil",
        name: "Rust Preventive Oil",
        variants: ["Dewatering RP oil", "Oil based RP oil"],
        about:
          "Rust preventive oils leave a protective film on metal parts between operations, in storage and in transit. Dewatering types first displace water from freshly washed or machined parts.",
        uses: ["Protecting machined components between operations", "Storage and shipment of steel parts", "Parts that come out of washing or water-based coolant"],
        tbc: [TDS],
      },
      {
        id: "hydraulic-oil",
        name: "Hydraulic Oil",
        variants: ["32", "46", "68"],
        about:
          "Hydraulic oils transmit power in hydraulic systems while lubricating pumps, valves and cylinders. The grade is the oil's viscosity: choose the one your equipment maker recommends for your operating temperatures.",
        uses: ["Hydraulic presses and injection moulding machines", "Machine tool hydraulics", "Mobile and industrial hydraulic equipment"],
        tbc: [TDS],
      },
      {
        id: "gear-oil",
        name: "Gear Oil",
        variants: ["90", "140", "220", "320"],
        about:
          "Gear oils lubricate gearboxes and gear drives, keeping a film of oil between meshing teeth under load to reduce wear, heat and noise.",
        uses: ["Industrial gearboxes and gear drives", "Automotive and equipment gear assemblies, as specified by the manufacturer"],
        tbc: [TDS],
      },
      {
        id: "engine-oil",
        name: "Engine Oil",
        variants: ["15W40", "20W40", "5W30"],
        about:
          "Engine oils lubricate, clean and cool internal combustion engines. Use the grade your vehicle or engine manufacturer specifies.",
        uses: ["Petrol and diesel engines, in the grade the engine maker specifies"],
        tbc: [TDS],
      },
      {
        id: "greases",
        name: "Greases",
        about:
          "Greases are lubricants thickened to stay in place where an oil would run off, for bearings, joints and slides that are not in a circulating oil system.",
        tbc: [placeholder("Grease types and grades")],
      },
    ],
    industries: ["auto-assembly", "auto-component"],
    faq: [
      {
        q: "What is the difference between neat and soluble cutting oil?",
        a: "Neat cutting oil is used undiluted and mainly lubricates the cut. Soluble cutting oil is mixed with water into a coolant that cools as well as lubricates. The right choice depends on the operation, the material and your machines; our team can advise.",
      },
      {
        q: "Which grades of hydraulic, gear and engine oil do you make?",
        a: "Hydraulic oil in grades 32, 46 and 68; gear oil in grades 90, 140, 220 and 320; engine oil in 15W40, 20W40 and 5W30.",
      },
      {
        q: "What is 1-COOL?",
        a: "1-COOL is Krini Crude's metalworking fluid series: cutting oils, soluble cutting oils (coolants), rust preventive, hydraulic, gear and engine oils.",
      },
      {
        q: "Can you make a lubricant to our own formulation or under our brand?",
        a: "Yes. We manufacture to our own formulations and to formulations specified by customers, and we make products for brands to sell under their own name.",
      },
    ],
  },
  {
    id: "construction",
    slug: "construction-chemicals",
    index: "02",
    title: "Construction Chemicals",
    short: "Construction",
    description:
      "High-performance construction chemicals and solutions for infrastructure, building, and civil engineering projects. Built for durability and strength.",
    series: "Construction Chemicals",
    strap: "Shuttering Oil • Shuttering Grease • Mold Release Solutions",
    image: "/images/construction.webp",
    imageAlt: "Release oil sprayed onto steel formwork beside rebar at dusk",
    seo: {
      title: "Shuttering Oil, Mold Release Oil & Greases Manufacturer | Krini Crude",
      description:
        "Shuttering oil and grease, mold release oil and grease for formwork and precast concrete, made in Chennai for building and infrastructure projects.",
    },
    heading: "Shuttering and mold release oils and greases for concrete.",
    products: [
      {
        id: "shuttering-oil",
        name: "Shuttering Oil",
        range: [
          { name: "Repel Shuttering Oil", text: "Premium Shuttering Oil Suitable for Aluminium & All Formworks" },
          { name: "Magic Shuttering Oil", text: "Suitable for Aluminium, MS, Plywood & All Formworks" },
          { name: "Silease 360 Shuttering Oil", text: "Suitable for Precast Shuttering Oil" },
          { name: "Nikri AL Shuttering Oil", text: "Cost Effective Mivan & Other Formworks" },
          { name: "Nikri 30 Shuttering Oil", text: "Cost Effective MS, Plywood & Road Projects Shuttering Oil" },
        ],
        about:
          "Applied to formwork (shuttering) before the concrete is poured, shuttering oil leaves a release film so the formwork strips cleanly without concrete sticking to it, which protects the concrete surface and helps the formwork last for more pours.",
        uses: ["Steel, plywood and other formwork on building and infrastructure sites"],
        tbc: [TDS],
      },
      {
        id: "shuttering-grease",
        name: "Shuttering Grease",
        range: [
          { name: "Krini Shuttering Grease", text: "Mold Release Grease" },
          { name: "Repel Shuttering Grease", text: "Premium Mold Release Grease" },
        ],
        about:
          "A release agent for formwork in grease form. Ask our team whether an oil or a grease suits your formwork, surface and site conditions.",
        uses: ["Formwork on building and infrastructure sites"],
        tbc: [TDS],
      },
      {
        id: "mold-release-oil",
        name: "Mold Release Oil",
        about:
          "Mold (mould) release oil is applied to moulds so that cast concrete units come away cleanly, with a good surface finish, and the moulds can be reused.",
        uses: ["Precast concrete moulds", "Moulded concrete products"],
        claims: ["Formulated not just as physical release but also chemically engineered for superior performance and concrete finish."],
        tbc: [TDS],
      },
      {
        id: "mold-release-grease",
        name: "Mold Release Grease",
        about: "Mould release in grease form, for moulds and conditions where a grease is preferred to an oil.",
        uses: ["Precast concrete moulds"],
        claims: ["Formulated not just as physical release but also chemically engineered for superior performance and concrete finish."],
        tbc: [TDS],
      },
    ],
    industries: ["construction"],
    faq: [
      {
        q: "What is shuttering oil used for?",
        a: "Shuttering oil is applied to formwork before concrete is poured. It stops the concrete sticking, so the formwork strips cleanly, the concrete keeps a clean face and the formwork can be reused.",
      },
      {
        q: "What is the difference between shuttering oil and mold release oil?",
        a: "Both are release agents. Shuttering oil is used on site formwork; mold release oil is used on moulds, typically for precast concrete. We make both, in oil and grease form.",
      },
      {
        q: "Should I use a release oil or a release grease?",
        a: "It depends on the formwork or mould, the surface and how the product will be applied. Tell us about your application and our team will recommend one.",
      },
    ],
  },
  {
    id: "aerosols",
    slug: "aerosols",
    index: "03",
    title: "Aerosols",
    short: "Aerosols",
    description:
      "Advanced aerosol products for industrial maintenance, automotive care, and specialty applications. Engineered for precision and efficiency.",
    series: "Aerosol Sprays",
    strap: "Vibrant Colour Sprays • Adhesive Sprays • Industrial Solutions",
    image: "/images/aerosols.webp",
    imageAlt: "Aerosol can releasing a back-lit mist over a welded steel plate",
    seo: {
      title: "Spray Paints, Galva Zinc, Anti-Spatter & Adhesive Sprays | Krini Crude",
      description:
        "Spray paints in black or any RAL shade, galva zinc, silicone-free anti-spatter, Lock Bond adhesive and release sprays, made by Krini Crude, Chennai.",
    },
    heading: "Aerosol spray paints, anti-spatter, adhesive and release sprays.",
    products: [
      {
        id: "colour-sprays",
        name: "Vibrant Colour Sprays",
        variants: ["Black (glossy / matt)", "Any RAL shade", "Galva zinc spray"],
        about:
          "Aerosol spray paints for touch-up, marking and finishing. Colours can be matched to a powder coating or to any RAL shade.",
        uses: ["Touching up powder-coated and painted parts", "Marking and finishing in maintenance and production"],
        range: [
          { name: "Black (Glossy/Matt)", text: "High-quality black spray paint in glossy and matt finishes" },
          { name: "Any RAL Shades", text: "Custom shade available in any RAL colour" },
          { name: "Galva Zinc Spray", text: "Bright galvanizing zinc coating spray" },
        ],
        tbc: [placeholder("Can sizes")],
      },
      {
        id: "lock-bond-adhesive-spray",
        name: "Lock Bond Adhesive Spray",
        variants: ["400 ml"],
        about: "A multi-purpose industrial adhesive in an aerosol, for bonding in production and maintenance.",
        range: [{ name: "Lock-Bond Adhesive Spray 400ml", text: "Multi-purpose adhesive spray, lasts longer, non-toxic, ozone friendly, CFC and lead free" }],
        tbc: [TDS],
      },
      {
        id: "anti-spatter-spray",
        name: "Anti-Spatter Spray",
        about:
          "Sprayed on the work and on fixtures and nozzles before welding, anti-spatter leaves a thin film so weld spatter does not stick, which saves grinding and clean-up.",
        uses: ["MIG / MAG welding in fabrication shops", "Protecting jigs, fixtures and torch nozzles"],
        range: [{ name: "Relese Anti-Spatter Spray", text: "Anti-spatter spray, lasts longer, silicone-free" }],
        tbc: [TDS],
      },
      {
        id: "release-spray",
        name: "Release Spray",
        about: "A release agent in aerosol form, for quick, even application on moulds and surfaces.",
        tbc: [placeholder("Applications and technical data")],
      },
    ],
    industries: ["paint"],
    faq: [
      {
        q: "Can you match a spray paint to our powder coating colour?",
        a: "Yes. Our colour sprays can be matched to a powder coating or to any RAL shade.",
      },
      {
        q: "Is your anti-spatter spray silicone-free?",
        a: "Yes. Our anti-spatter spray is silicone-free, which matters when welded parts are going to be painted or powder coated.",
      },
      {
        q: "What sizes does Lock Bond adhesive spray come in?",
        a: "Lock Bond Adhesive Spray comes in a 400 ml can.",
      },
    ],
  },
];

export const lineById = (id: Line["id"]) => lines.find((l) => l.id === id)!;
export const lineBySlug = (slug: string) => lines.find((l) => l.slug === slug);
