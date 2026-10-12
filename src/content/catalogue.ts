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

export type ProductRangeItemDetails = {
  image?: string;
  imageAlt?: string;
  description?: string;
  purpose?: string[];
  coverage?: string;
  coverageNote?: string;
  benefits?: string[];
  properties?: {
    property: string;
    value: string;
    spec?: string;
  }[];
  propertiesPendingNote?: string;
  application?: string[];
  packing?: string;
  storage?: string;
  shelfLife?: string;
  note?: string;
  pdsRevision?: string;
  status?: "verified" | "pending";
  purposeTitle?: string;
  applicationTitle?: string;
  dilution?: string;
  dilutionNote?: string;
  dilutionRatios?: {
    operation: string;
    ratio: string;
  }[];
  metaLine?: string;
  reportUrl?: string;
  reportLabel?: string;
  reportKicker?: string;
  reportButtonText?: string;
};

export type ProductRangeItem = {
  name: string;
  text: string;
  details?: ProductRangeItemDetails;
};

export type Product = {
  id: string;
  name: string;
  /** Variants or grades, as listed on krinicrude.com. */
  variants?: string[];
  /** "Available products" under this category on krinicrude.com: each name and its description, word for word. */
  range?: ProductRangeItem[];
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
          {
            name: "1-COOL Aquacut 150",
            text: "Premium mineral coolant cutting fluid developed for light to heavy duty machining and grinding.",
            details: {
              status: "verified",
              pdsRevision: "PDS 2024",
              image: "/images/1-cool-aquacut-150.webp",
              imageAlt: "1-COOL Aquacut 150 mineral coolant container and sample emulsion",
              description:
                "1-COOL AQUACUT 150 is a premium mineral coolant cutting fluid developed for use in light to heavy duty machining of ferrous and non-ferrous metal alloys, as well as general purpose grinding. Formulated with special lubricity and E.P. additives and rust inhibitors, it delivers extended sump life and improved tool longevity.",
              metaLine:
                "Key benefits · Technical properties · Dilution ratios · Mixing guidelines · Storage & handling · Packing",
              dilution: "3% – 8%",
              dilutionNote: "Grinding (3–5%), General Machining (5–6%), Heavy Duty (5–8%)",
              purposeTitle: "Suitable Operations & Material Compatibility",
              purpose: [
                "Light to heavy duty machining operations",
                "General purpose metal grinding",
                "Cast Iron",
                "Ferrous & non-ferrous metal alloys",
                "Stainless Steels",
                "Turning, milling, drilling & sawing",
              ],
              benefits: [
                "Excellent cooling and lubricating properties for superior surface finish",
                "High resistance to bacterial attack, reducing foul odour and maximizing coolant life",
                "Forms a highly stable milky emulsion even in hard water conditions",
                "Offers excellent rust and corrosion protection for multi-metal components",
                "Nitrite and chlorine free, ensuring an environmentally safe workspace",
                "Significantly extends sump life while minimizing cutting tool wear",
              ],
              properties: [
                { property: "Appearance (Concentrate)", value: "Clear brown transparent", spec: "Visual" },
                { property: "Emulsion Appearance", value: "Milky White", spec: "Diluted in water" },
                { property: "Density @ 29.5 °C", value: "0.840 g/ml", spec: "Standard density" },
                { property: "Thermal Stability Test", value: "Passes", spec: "Stable thermal profile" },
                { property: "Cast Iron Corrosion Test", value: "No rust", spec: "@ 3%, 200 ppm (IP 287)" },
                { property: "pH (5% dilution)", value: "9.4", spec: "In distilled water" },
                { property: "Refractometer Reading Factor", value: "1.0", spec: "Direct reading" },
              ],
              dilutionRatios: [
                { operation: "Surface & Cylindrical Grinding", ratio: "3 – 5 %" },
                { operation: "General Machining (Turning / Milling)", ratio: "5 – 6 %" },
                { operation: "Heavy Duty Cutting & Broaching", ratio: "5 – 8 %" },
              ],
              applicationTitle: "Mixing Guidelines & Sump Management",
              application: [
                "While mixing, always add coolant oil to water and never the reverse, agitating continuously to ensure a homogenous milky emulsion.",
                "Use good quality water. Deionized (D.I.) water provides extended sump life, as high water hardness and chlorides reduce emulsion life and corrosion inhibition.",
                "Always thoroughly clean and sterilize the machine sump before charging with fresh coolant mixture.",
                "Check emulsion concentration regularly using a refractometer (multiplication factor: 1.0) and top up with premixed coolant rather than pure water.",
              ],
              packing: "Standard packing: 20 L pails & 210 L industrial steel drums",
              storage:
                "Store indoors in original tightly sealed containers between 5 °C and 40 °C. Protect from freezing and direct exposure to intense heat or rain.",
              shelfLife: "12 months from date of manufacture when stored in unopened containers",
              note: "Typical values based on laboratory batch testing (PDS Rev. 2024). Technical values are typical and not a sales specification.",
            },
          },
          {
            name: "1-COOL AL 5000",
            text: "High-performance semi-synthetic, environment friendly cutting fluid for light to heavy duty machining and grinding.",
            details: {
              status: "verified",
              pdsRevision: "PDS 2026",
              image: "/images/1-cool-al-5000.webp",
              imageAlt: "1-COOL AL 5000 semi-synthetic coolant container during CNC milling",
              description:
                "1-COOL AL 5000 is a semi-synthetic, environment friendly cutting fluid developed for use in light to heavy duty machining of ferrous and non-ferrous metal alloys. It is also suitable for general purpose grinding. Formulated with special lubricity and E.P. additives and rust inhibitors, it delivers extended sump life, reduced downtime, and improved tool longevity.",
              metaLine:
                "Key benefits · Technical properties · Dilution ratios · Mixing guidelines · Storage & handling · Packing",
              dilution: "3% – 12%",
              dilutionNote: "Grinding (3–5%), General Machining (4–5%), Heavy Duty (6–12%)",
              purposeTitle: "Suitable Operations & Material Compatibility",
              purpose: [
                "Light to heavy duty machining operations",
                "General purpose metal grinding",
                "Cast Iron",
                "Ferrous and Non-ferrous Alloys",
                "Stainless Steels",
                "Turning, milling, drilling & sawing",
              ],
              benefits: [
                "Excellent cooling and lubricating properties for precision surface finish",
                "Pleasant odour of the emulsions, making it highly user friendly",
                "High resistance to bacterial attack, reducing odour and maximizing coolant life",
                "Forms a stable emulsion even in hard water conditions",
                "Offers excellent rust protection of ferrous components",
                "Reduces machine downtime and maintenance costs",
                "Nitrite and chlorine free, hence environmentally safe",
              ],
              properties: [
                { property: "Appearance (Concentrate)", value: "Clear Amber fluid", spec: "Visual inspection" },
                { property: "Emulsion Appearance", value: "Translucent to off white", spec: "Diluted in water" },
                { property: "Density @ 29.5 °C", value: "0.970 g/ml", spec: "Standard density" },
                { property: "Thermal Stability Test", value: "Passes", spec: "Stable thermal profile" },
                { property: "Cast Iron Corrosion Test", value: "No rust", spec: "@ 3%, 200 ppm (IP 287)" },
                { property: "pH (10% dilution)", value: "9.6", spec: "In distilled water" },
                { property: "Refractometer Reading Factor", value: "1.4", spec: "Refractometer multiplier" },
              ],
              dilutionRatios: [
                { operation: "Surface & Cylindrical Grinding", ratio: "3 – 5 %" },
                { operation: "General Machining (Turning / Milling)", ratio: "4 – 5 %" },
                { operation: "Heavy Duty Machining & Cutting", ratio: "6 – 12 %" },
              ],
              applicationTitle: "Mixing Guidelines & Sump Management",
              application: [
                "While mixing, always add oil to water and never the reverse, agitating thoroughly to form a stable translucent emulsion.",
                "Use good quality water. Deionized (D.I.) water gives extended sump life, as high hardness and chlorides reduce product life and corrosion inhibition.",
                "Ensure machine sumps are thoroughly cleaned and sterilized before charging with fresh coolant mixture.",
                "Check emulsion concentration regularly using a refractometer (multiplication factor: 1.4) and replenish with premixed emulsion rather than pure water.",
              ],
              packing: "Standard packing: 26 L pails & 210 L industrial steel drums",
              storage:
                "Store indoors in original tightly closed containers between 5 °C and 40 °C. Protect from freezing and direct exposure to intense heat or rain.",
              shelfLife: "12 months from date of manufacture when stored in unopened containers",
              note: "Typical values based on laboratory batch testing (PDS Rev. 2026). Technical values are typical and not a sales specification.",
            },
          },
          { name: "1-COOL AL 7000", text: "Premium Semi Synthetic Coolant Oil" },
        ],
        about:
          "Soluble cutting oils are mixed with water to make a coolant. The coolant carries heat away from the cutting zone, lubricates, flushes away chips and helps protect parts and machines from rust.",
        uses: ["Turning, milling, drilling and other machining with a coolant system", "Operations where cooling matters as much as lubrication"],
        tbc: [TDS],
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
          {
            name: "Silease 360 Shuttering Oil",
            text: "Precast shuttering oil and mould release agent for precast concrete production.",
            details: {
              status: "verified",
              pdsRevision: "Rev. 09/2026",
              image: "/images/silease-360.webp",
              imageAlt: "Silease 360 Precast Shuttering Oil product sample",
              description:
                "SILEASE 360 is a ready-to-use mould release oil developed for precast concrete production. It forms a uniform release film on the formwork, supports clean demoulding and helps reduce surface pinholes and honeycombing when applied correctly.",
              purpose: [
                "Precast concrete production",
                "Mild steel moulds",
                "Plywood formwork",
                "FRP formwork",
                "Vertical and horizontal precast moulding",
              ],
              coverage: "40 m²/L",
              coverageNote:
                "Average coverage. Actual coverage may vary with formwork porosity, surface condition and application method.",
              benefits: [
                "Helps minimise pinholes and improves the appearance of precast concrete surfaces",
                "Provides clean and easy demoulding with reduced concrete adhesion to formwork",
                "Promotes a uniform surface finish without adversely affecting concrete colour",
                "Suitable for vertical and horizontal precast moulding applications",
                "Ready to use and economical due to high spreading coverage",
              ],
              properties: [
                { property: "Appearance", value: "Milky / Ivory Emulsion", spec: "Visual inspection" },
                { property: "Viscosity, B4 cup", value: "Typical: 100 seconds", spec: "Specification: 30–200 seconds" },
                { property: "Density at 15 °C", value: "Approx. 0.90 g/mL", spec: "Specification: >0.866 g/mL" },
                { property: "Suitable formwork", value: "Mild steel, plywood and FRP", spec: "Precast moulds" },
                { property: "Coverage", value: "Average 40 m²/L", spec: "Typical site rate" },
              ],
              application: [
                "Clean the formwork and remove concrete residue, rust, dust, water and excess oil.",
                "Apply a very thin, uniform film by fine spray, lint-free cloth, roller or suitable applicator.",
                "Avoid puddles and over-application; wipe off excess oil before placing reinforcement or concrete.",
                "For new or highly absorbent plywood, conduct a small site trial and adjust the application rate.",
              ],
              packing: "Standard packing: 200 L barrel",
              storage:
                "Store in the original closed container in a cool, dry, well-ventilated area away from heat and direct sunlight. Use appropriate gloves and eye protection. Avoid prolonged skin contact. Refer to the Safety Data Sheet before use.",
              shelfLife: "6 months from date of manufacture when stored as recommended",
              note: "Typical values are not guaranteed specifications. Suitability and coverage should be confirmed by a site trial under actual conditions. For industrial use only.",
            },
          },
          {
            name: "Magic Shuttering Oil",
            text: "High-performance release oil for Mivan aluminium formwork, MS, plywood and all formworks.",
            details: {
              status: "verified",
              pdsRevision: "Rev. 09/2026",
              image: "/images/magic-shuttering-oil.webp",
              imageAlt: "Magic Shuttering Oil laboratory sample in hydrometer cylinder",
              description:
                "Magic Shuttering Oil is a ready-to-use release oil developed for Mivan aluminium formwork. It forms a thin, uniform release film that supports clean demoulding, smooth concrete finishes and efficient reuse of formwork when applied correctly.",
              purpose: [
                "Mivan aluminium formwork",
                "Mild steel (MS) formwork",
                "Plywood formwork",
                "Building and infrastructure site formwork",
              ],
              coverage: "30–40 m²/L",
              coverageNote:
                "Average coverage. Actual coverage may vary with formwork porosity, surface condition and application method.",
              benefits: [
                "Excellent release performance on Mivan aluminium formwork",
                "Clean demoulding with reduced adhesion to the formwork",
                "Promotes a smooth and uniform concrete surface finish",
                "Helps reduce concrete build-up and simplifies cleaning",
                "Ready to use with economical spreading coverage",
              ],
              properties: [
                { property: "Appearance", value: "Brown transparent liquid", spec: "Visual inspection" },
                { property: "Kinematic viscosity at 40 °C", value: "Typical: 32 cSt", spec: "Specification: >12 cSt" },
                { property: "Density at 15 °C", value: "Typical: 0.88 g/mL", spec: "Specification: >0.80 g/mL" },
                { property: "Flash point, Pensky-Martens", value: "Typical: 180 °C", spec: "Specification: >100 °C" },
                { property: "Coverage", value: "30–40 m²/L", spec: "Typical site rate" },
              ],
              application: [
                "Clean the formwork and remove concrete residue, rust, dust, water and excess oil.",
                "Apply a very thin, uniform film by fine spray, lint-free cloth, roller or suitable applicator.",
                "Avoid puddles and over-application; wipe off excess oil before placing reinforcement or concrete.",
                "Conduct a small site trial to establish the optimum application rate for site conditions.",
              ],
              packing: "Standard packing: 200 L barrel",
              storage:
                "Store in the original closed container in a cool, dry, well-ventilated area away from heat and direct sunlight. Use appropriate gloves and eye protection. Avoid prolonged skin contact. Refer to the Safety Data Sheet before use.",
              shelfLife: "12 months from date of manufacture when stored as recommended",
              reportUrl: "/documents/magic-shuttering-oil-test-report-oct-2026.pdf",
              reportLabel: "View original report (Sri Sai Test Report Oct 2026)",
              note: "Typical values are not guaranteed specifications. Suitability and coverage should be confirmed by a site trial under actual conditions. For industrial use only.",
            },
          },
          {
            name: "Nikri 30 Shuttering Oil",
            text: "Cost Effective MS, Plywood & Road Projects Shuttering Oil",
          },
          {
            name: "Nikri AL Shuttering Oil",
            text: "Emulsion-based concrete formwork release agent for Mivan aluminium, MS, plywood and FRP formwork.",
            details: {
              status: "verified",
              pdsRevision: "NIKRI AL / 2026",
              image: "/images/nikri-al.webp",
              imageAlt: "Nikri AL Emulsion Based Shuttering Oil product sample and barrel",
              description:
                "NIKRI AL is an emulsion-based shuttering oil that forms a uniform release film between concrete and formwork, supporting cleaner stripping and a smoother concrete finish.",
              purpose: [
                "Mivan aluminium formwork",
                "Mild steel (MS) formwork",
                "Plywood formwork",
                "FRP (Fibre-reinforced plastic) formwork",
                "Compatible architectural formwork",
              ],
              benefits: [
                "Promotes easy demoulding and reduces concrete adhesion",
                "Helps minimise pinholes on concrete surfaces",
                "Supports smoother, cleaner concrete finishes",
                "Recommended for Mivan aluminium, MS, plywood and FRP formwork",
              ],
              properties: [
                { property: "Appearance", value: "Ivory, non-transparent", spec: "Visual inspection" },
                { property: "Density at 15 °C", value: "0.90 g/mL", spec: "Typical (MTC batch KN/AL/09)" },
                { property: "Viscosity, B4 cup", value: "100 seconds", spec: "Standard flow cup test" },
                { property: "Flash point", value: "Not applicable", spec: "Emulsion-based formulation" },
              ],
              application: [
                "Prepare: Clean and dry the formwork; remove concrete, dust, rust flakes and excess oil.",
                "Mix: Stir the emulsion thoroughly before use.",
                "Apply: Spray, roll, brush or wipe on a thin, continuous, uniform film.",
                "Best result: Remove pools and runs; use only the minimum quantity required for complete coverage.",
              ],
              packing: "Standard packing: 200 L barrel (custom packaging on request)",
              storage:
                "Store tightly closed in a cool, dry and well-ventilated place. Protect from freezing and excessive heat. Use suitable gloves and eye protection. Avoid prolonged skin contact and inhalation of mist. Trial application is recommended before full-scale use.",
              shelfLife: "6 months from date of manufacture when stored as recommended",
              reportUrl: "/documents/nikri-al-shuttering-oil-mtc-march-2025.pdf",
              reportLabel: "View original report (MTC March 2025)",
              note: "Typical values based on MTC batch KN/AL/09, September 2026. Values are indicative and not a sales specification. Technical values are typical and not a sales specification.",
            },
          },
        ],
        about:
          "Applied to formwork (shuttering) before the concrete is poured, shuttering oil leaves a release film so the formwork strips cleanly without concrete sticking to it, which protects the concrete surface and helps the formwork last for more pours.",
      },
      {
        id: "shuttering-grease",
        name: "Shuttering Grease",
        range: [
          {
            name: "Krini Shuttering Grease",
            text: "Heavy-duty calcium-based shuttering grease for wall ties, sleeves and structural formwork.",
            details: {
              status: "verified",
              pdsRevision: "PDS - Calcium Based",
              image: "/images/krini-shuttering-grease.webp",
              imageAlt: "Krini Shuttering Grease product container and sample tub",
              description:
                "KRINI SHUTTERING GREASE is a calcium and oil-based release grease formulated for easy application and smooth demoulding. Ideal for wall ties, sleeves, and critical corner structures where oil runoff occurs.",
              purpose: [
                "Wall ties, sleeves and shuttering joints",
                "Critical and corner formwork structures",
                "Heavy-duty infrastructure formwork",
                "Building and structural shuttering works",
              ],
              benefits: [
                "Provides easy application and user friendly (non-hazardous)",
                "Provides smooth release from wall ties, sleeves and other shuttering works",
                "Used as mold release agent for critical or corner structures where oil performance is low",
                "Non-stainable finishing on concrete surfaces",
                "Does not leave any residue or powder after demolding",
              ],
              properties: [
                { property: "Appearance", value: "Grease", spec: "Calcium & oil based" },
                { property: "Colour", value: "Brown", spec: "Visual inspection" },
                { property: "Relative Density", value: "0.910", spec: "Standard density" },
                { property: "Drop Point", value: "100 °C", spec: "MTC Batch KN/SG/07" },
                { property: "Flash Point", value: ">230 °C (230 °C MTC)", spec: "Non-combustible" },
                { property: "Boiling Point", value: ">300 °C", spec: "Stable thermal profile" },
                { property: "Solubility", value: "Insoluble in water", spec: "Water resistant film" },
              ],
              application: [
                "Ensure formwork, wall ties, or sleeves are clean and free of heavy debris and loose rust flakes.",
                "Apply a thin, continuous and uniform film of grease using a brush, cloth, or applicator.",
                "Pay special attention to corners, joints, and critical sections prone to concrete sticking.",
                "Avoid excessive grease buildup; remove heavy runs before concrete pouring.",
              ],
              packing: "Standard packing: 20 kg buckets & 180 kg drums",
              storage:
                "Store in original tightly closed containers in a cool, dry place. Avoid excessive heat for prolonged periods of time.",
              shelfLife: "12 months from date of manufacture when stored as recommended",
              reportUrl: "/documents/krini-shuttering-grease-mtc-july-2025.pdf",
              reportLabel: "View original report (MTC July 2025)",
              note: "Stable under normal temperature conditions. Typical values based on MTC Batch KN/SG/07, July 2025. Technical values are typical and not a sales specification.",
            },
          },
          {
            name: "Repel Shuttering Grease",
            text: "Premium calcium-based shuttering grease for wall ties, sleeves and complex formwork.",
            details: {
              status: "verified",
              pdsRevision: "PDS - Calcium Based",
              image: "/images/repel-shuttering-grease.webp",
              imageAlt: "Repel Shuttering Grease product container and sample tub",
              description:
                "REPEL SHUTTERING GREASE is a high-performance calcium and oil-based release grease formulated for easy application and smooth demoulding. Ideal for wall ties, sleeves, and critical corner structures where oil runoff occurs.",
              purpose: [
                "Wall ties, sleeves and shuttering joints",
                "Critical and corner formwork structures",
                "Complex architectural shapes and precast moulds",
                "Building and infrastructure formwork",
              ],
              benefits: [
                "Provides easy application and user friendly (non-hazardous)",
                "Provides smooth release from wall ties, sleeves and other shuttering works",
                "Used as mold release agent for critical or corner structures where oil performance is low",
                "Non-stainable finishing on concrete surfaces",
                "Does not leave any residue or powder after demolding",
              ],
              properties: [
                { property: "Appearance", value: "Grease", spec: "Calcium & oil based" },
                { property: "Colour", value: "Ivory (Half white) / Light Yellow", spec: "Visual" },
                { property: "Relative Density", value: "0.910", spec: "Standard density" },
                { property: "Drop Point", value: "100 °C", spec: "MTC Batch KN/RG/09" },
                { property: "Flash Point", value: ">230 °C (220 °C MTC)", spec: "Non-combustible" },
                { property: "Boiling Point", value: ">300 °C", spec: "Stable thermal profile" },
                { property: "Solubility", value: "Insoluble in water", spec: "Water resistant film" },
              ],
              application: [
                "Ensure formwork, wall ties, or sleeves are clean and free of heavy debris and loose rust flakes.",
                "Apply a thin, continuous and uniform film of grease using a brush, cloth, or applicator.",
                "Pay special attention to corners, joints, and critical sections prone to concrete sticking.",
                "Avoid excessive grease buildup; remove heavy runs before concrete pouring.",
              ],
              packing: "Standard packing: 20 kg buckets & 180 kg drums (3,000 kg batch capacity)",
              storage:
                "Store in original tightly closed containers in a cool, dry place. Avoid excessive heat for prolonged periods of time.",
              shelfLife: "12 months from date of manufacture when stored as recommended",
              reportUrl: "/documents/repel-shuttering-grease-mtc-sep-2026.pdf",
              reportLabel: "View original report (MTC Sep 2026 - 3,000 KGS)",
              note: "Stable under normal temperature conditions. Typical values based on MTC Batch KN/RG/09, September 2026. Technical values are typical and not a sales specification.",
            },
          },
        ],
        about:
          "A release agent for formwork in grease form. Ask our team whether an oil or a grease suits your formwork, surface and site conditions.",
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
