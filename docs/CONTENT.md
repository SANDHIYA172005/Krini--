# Krini Crude: website content, page by page

Everything the site says, page by page, generated from the content files in `src/content` (`site.ts`, `catalogue.ts`, `articles.ts`, `process.ts`, `pages.ts`). Facts about Krini Crude come from krinicrude.com. Items in **[TBC: …]** are placeholders for facts the live site doesn't state; they show on the site as dashed "TBC" chips until they are filled in. The complete list is at the end.

Don't edit this file by hand: change the content files, then regenerate it with the command at the top of `scripts/content-doc.ts`.

## Company details used across the site

- Name: Krini Crude · Quality Industrial Solutions
- Phone: +91 8015343987 · WhatsApp: +91 8015343987 (https://wa.me/918015343987)
- Email: info@krinicrude.com
- Office: 95/20B, Gujji Main Road, Anna Nagar East, Chennai - 600102, Tamil Nadu, India
- Factory: Ground Floor, 161A, Krini Crude, Chinakoladi Lakshmi Nagar, Tiruverkadu, Chennai, Tiruvallur - 600077, Tamil Nadu, India
- Hours: **[TBC: Office hours]**
- Menu (as on krinicrude.com): Home · About Us · Lubricants ▾ · Construction ▾ · Aerosols ▾ · button "Enquire now" (opens the Enquire Now pop-up)
  - Lubricants: Cutting Oil · Soluble Cutting Oil · Rust Preventive Oil · Hydraulic Oil · Gear Oil · Engine Oil
  - Construction: Shuttering Oil › (Silease 360, Magic Oil, Nikri 30, Nikri AL) · Shuttering Grease › (Krini Shuttering Grease, Repel Shuttering Grease)
  - Aerosols: Vibrant Colour Sprays › (Black (Glossy/Matt), Any RAL Shades, Galva Zinc Spray, Relese Anti-Spatter Spray) · Lock Bond Adhesive Spray › (Lock-Bond Adhesive 400ml)
- Enquiry types (what an Enquire button can be about; it goes into the message): Enquiry · Request a quote · Private label · Custom formulation · Enquiry: Lubricants & Greases · Enquiry: Construction Chemicals · Enquiry: Aerosols

## Enquire Now pop-up (every page but Contact)

Word for word as on krinicrude.com. Every "Enquire now" button opens it; without JavaScript the buttons go to the Contact page's form, which is the same form.

- **Enquire Now**
- Fill in your details and we’ll get back to you shortly
- Name * ("Your full name") · Contact Number * ("10-digit mobile number") · Message / Product Enquiry * ("Tell us about your requirements…")
- Buttons: Submit Enquiry · Send on WhatsApp (opens WhatsApp with the enquiry written out) · Close (×; Esc or a click outside also closes it)
- A button that names a product or a kind of enquiry (a quote, private label, a product line) writes it into the message first, e.g. "Request a quote / Product: Hydraulic Oil", and the visitor can change it.
- Checks: Please enter your name. Please enter a 10-digit mobile number. Please tell us about your requirements. (the contact number may be typed with spaces, +91 or a leading 0)
- Sent: "Thank you. We’ll get back to you shortly." · until an enquiry endpoint is configured (NEXT_PUBLIC_ENQUIRY_ENDPOINT): "Online enquiries aren’t connected yet. Please send it on WhatsApp, email info@krinicrude.com or call +91 80153 43987." · if sending fails: "Your enquiry could not be sent. Please send it on WhatsApp, email info@krinicrude.com or call +91 80153 43987."

## Search titles and descriptions

Every page has its own title, description, address (canonical), share picture (1200×630) and structured data.

| Page | Address | Title | Description |
| --- | --- | --- | --- |
| home | / | Lubricant & Construction Chemical Manufacturer, Chennai \| Krini Crude (69) | ISO certified lubricant manufacturer in Chennai: 1-COOL cutting oils, hydraulic, gear & engine oils, greases, shuttering oil, aerosol sprays and private label. (159) |
| about | /about | About Krini Crude \| Industrial Lubricants Manufacturer, Chennai (63) | One of India’s leading makers of lubricants, construction chemicals and aerosols. ISO certified, with R&D overseen by our Director, in Chennai. (143) |
| services | /services | Private Label & Custom Formulation Manufacturing \| Krini Crude (62) | Manufacturing, R&D, custom formulations and private label lubricants, construction chemicals and aerosols for brands in India and across the globe. (147) |
| products | /products | Products: Lubricants, Construction Chemicals & Aerosols \| Krini Crude (69) | 70+ products made in Chennai: 1-COOL cutting oils and coolants, hydraulic, gear and engine oils, shuttering and mold release oils, and aerosol sprays. (150) |
| line:lubricants | /products/lubricants | Cutting Oils, Coolants, Hydraulic, Gear & Engine Oils \| Krini Crude (67) | 1-COOL neat and soluble cutting oils, rust preventives, hydraulic oil 32/46/68, gear oil 90 to 320 and engine oils 15W40, 20W40, 5W30. Made in Chennai. (151) |
| line:construction-chemicals | /products/construction-chemicals | Shuttering Oil, Mold Release Oil & Greases Manufacturer \| Krini Crude (69) | Shuttering oil and grease, mold release oil and grease for formwork and precast concrete, made in Chennai for building and infrastructure projects. (147) |
| line:aerosols | /products/aerosols | Spray Paints, Galva Zinc, Anti-Spatter & Adhesive Sprays \| Krini Crude (70) | Spray paints in black or any RAL shade, galva zinc, silicone-free anti-spatter, Lock Bond adhesive and release sprays, made by Krini Crude, Chennai. (148) |
| process | /how-its-made | How Lubricants Are Made: From Crude Oil to the Drum \| Krini Crude (65) | How crude oil becomes a lubricant: formed underground, drilled, refined into base oil, then blended with additives, tested and packed at our Chennai factory. (157) |
| blog | /blog | Guides to Lubricants, Construction Chemicals & Aerosols \| Krini Crude (69) | Practical guides on cutting oils and coolants, oil grades, shuttering and mold release, anti-spatter sprays, lubricant storage and private label. (145) |
| article:neat-vs-soluble-cutting-oil | /blog/neat-vs-soluble-cutting-oil | Neat or soluble cutting oil? How to choose a metalworking fluid \| Krini Crude (77) | Neat oils lubricate, soluble oils cool. How to decide which suits your machining, and how to keep a coolant healthy once it is in the machine. (142) |
| article:oil-grades-hydraulic-gear-engine | /blog/oil-grades-hydraulic-gear-engine | Hydraulic, gear and engine oil grades: what the numbers mean \| Krini Crude (74) | 32, 46 and 68; 90 and 140; 220 and 320; 15W40. How each grading system works, how to choose the grade your machine needs, and the signs an oil needs attention. (159) |
| article:shuttering-oil-mold-release-concrete-finish | /blog/shuttering-oil-mold-release-concrete-finish | Shuttering oil and mold release: how to get a clean concrete finish \| Krini Crude (81) | What release agents do, how to choose between oil and grease, and the site habits that give clean concrete faces and longer-lasting formwork. (141) |
| article:storing-handling-industrial-lubricants | /blog/storing-handling-industrial-lubricants | Storing and handling industrial lubricants: a practical checklist \| Krini Crude (79) | Most lubrication problems start before the oil reaches the machine. Simple rules for storing drums, dispensing oil and keeping it clean. (136) |
| article:anti-spatter-spray-welding | /blog/anti-spatter-spray-welding | Anti-spatter spray: cleaner welds and less grinding \| Krini Crude (65) | Why weld spatter sticks, how an anti-spatter spray stops it, and why silicone-free matters when parts will be painted or powder coated. (135) |
| article:private-label-lubricants-manufacturing | /blog/private-label-lubricants-manufacturing | Private label lubricants: how manufacturing under your brand works \| Krini Crude (80) | From brief to a packed product with your name on it: the steps, what to prepare, and the questions to ask a manufacturer. (121) |
| contact | /contact | Contact Krini Crude \| Enquiries, Quotes & Private Label, Chennai (64) | Call +91 80153 43987, WhatsApp or email info@krinicrude.com. Office in Anna Nagar East, Chennai; factory in Tiruverkadu. Send an enquiry or request a quote. (156) |

---

## 1. Home (/)

### Hero: from rust to radiance
- One 8-second Google Flow film in a single take, played by scrolling (the section is eight screens tall and stays on screen): golden oil pours over a rusty gear shaft, a thick coat of grease follows, a spray can mists it, and the camera pulls back to the gear. Reduced motion or no JavaScript: one screen, the film's last frame with the name, the promise and the buttons.
- **h1**: a small line over the name, Lubricant manufacturer in Chennai (for search: what Krini Crude is and where) · **Krini Crude** · Premium Quality Industrial Solutions (as on the live site); under it: Innovation & Excellence in Manufacturing
- Under that, three pills, each a jump to its part of the film (without JavaScript, a link to its page): Lubricants · Greases · Aerosols
- Then, each over its own part of the film (01 / 03 …): **Lubricants & oils**: Cutting oil, soluble cutting oil, rust preventive, hydraulic, gear and engine oils, for automotive, industrial and specialty applications. Spec: Hydraulic 32 / 46 / 68; Gear 90 / 140 / 220 / 320; Engine 15W40 / 20W40 / 5W30 (View lubricants) · **Greases**: Greases stay in place where an oil would run off: for bearings, joints and slides. Spec: Greases Bearings / Joints / Slides; Shuttering Krini / Repel; Mold release Precast moulds (View greases) · **Aerosols & sprays**: Colour, zinc, adhesive, anti-spatter and release sprays for industrial maintenance, automotive care and specialty applications. Spec: Colour Black / Any RAL / Galva zinc; Lock Bond Adhesive, 400 ml; Anti-spatter Silicone-free (View aerosols)
- End: **Engineered for Performance** · 70+ products for 1000+ clients across India, made at our Chennai factory under our brand or yours. · buttons: View products · Get a quote
- Beside it (larger screens): the steps (Krini Crude · Lubricants · Greases · Aerosols · Get started), each a jump to its step, and Skip intro (to the next section)

### What we make
- **Lubricants, greases and aerosols.**
- Made at our factory in Tiruverkadu, Chennai: 1-COOL cutting oils and coolants, rust preventives, hydraulic, gear and engine oils; greases for bearings, formwork and precast moulds; and aerosol sprays for painting, welding and maintenance.
- 01 **Lubricants & oils** (still from the film: "Golden lubricating oil pouring over a rusted gear shaft") · 1-COOL Metal Working Fluid Series · Premium quality lubricants and greases for automotive, industrial, and specialty applications. · Cutting oil: Neat / Broaching / Gear hobbing / Stamping / Drawing; Coolants: Aquacut 150 / AL 5000 / AL 7000; Rust preventive: Dewatering / Oil based; Hydraulic: 32 / 46 / 68; Gear: 90 / 140 / 220 / 320; Engine: 15W40 / 20W40 / 5W30 · View lubricants → /products/lubricants
- 02 **Greases** (still from the film: "A thick coat of industrial grease over the teeth of a steel gear") · Greases and release greases · Greases stay in place where an oil would run off: for bearings, joints and slides. · Greases: Bearings / Joints / Slides; Shuttering grease: Krini / Repel; Mold release grease: Precast moulds · View greases → /products/lubricants#greases
- 03 **Aerosols & sprays** (still from the film: "A fine aerosol spray misting the teeth of a greased gear") · Aerosol Sprays · Advanced aerosol products for industrial maintenance, automotive care, and specialty applications. · Colour sprays: Black, glossy / matt / Any RAL shade; Galva zinc: Zinc coating spray; Lock Bond: Adhesive, 400 ml; Anti-spatter: Silicone-free; Release spray: Moulds and surfaces · View aerosols → /products/aerosols
- Under the cards: Stills from the film above, generated with Google Flow (Veo): illustrations, not Krini Crude's plant or products

### Expertise
- **Welcome to Krini Crude**
- Krini Crude is one of the leading manufacturers of premium quality industrial products in India. With extensive manufacturing experience, we have developed a distinguished reputation as proud pioneers in lubricants, construction chemicals, and aerosol manufacturing. We are manufacturing a range of standard, speciality and niche market products using own and customer specified formulations. Our markets include industrial, automotive, marine, construction, infrastructure, and more specialist sectors.
- **Research & Development**: We are strong in R&D, with our Director personally overseeing the Research & Development operations. Our team comprises well-trained and technically strong staff and employees who are dedicated to innovation and excellence. We have given our products to corporate clients for rebranding, and with our extensive experience in this field, we can offer tailor-made products and comprehensive after-sales support for our valuable clients.
- **Private label manufacturing**: We also offer private label manufacturing to well recognized brands in the automotive aftermarket, construction industry, MRO, and general industrial categories and independent marketing companies across the globe. At Krini Crude, we are committed to investing substantially in Research & Development, acquiring modern technologies and geographical expansion.
- Markets we supply: Industrial · Automotive · Marine · Construction · Infrastructure · Specialist sectors

### Our Product Range (the showroom)
- **Complete industrial solutions**
- 70+ products for 1000+ clients across India, made at our Chennai factory under our brand or yours.
- Buttons: View products · Get a quote
- 01 **Lubricants**: Premium quality lubricants and greases for automotive, industrial, and specialty applications. Our lubricants ensure optimal performance and longevity. Products: Cutting Oil, Soluble Cutting Oil, Rust Preventive Oil, Hydraulic Oil, Gear Oil, Engine Oil · View lubricants → /products/lubricants
- 02 **Construction**: High-performance construction chemicals and solutions for infrastructure, building, and civil engineering projects. Built for durability and strength. Products: Shuttering Oil, Shuttering Grease, Mold Release Oil, Mold Release Grease · View construction → /products/construction-chemicals
- 03 **Aerosols**: Advanced aerosol products for industrial maintenance, automotive care, and specialty applications. Engineered for precision and efficiency. Products: Vibrant Colour Sprays, Lock Bond Adhesive Spray, Anti-Spatter Spray, Release Spray · View aerosols → /products/aerosols

### Industry we serve
- **Delivering end to end lubricant solutions**
- **Auto Assembly**: We make speciality lubricants for companies involved in the manufacture of motor vehicles, including most components, such as engines and bodies, for passenger cars and commercial vehicles.
- **Auto Component**: We make lubricants for companies involved in the manufacture of auto components such as engine parts, drive transmission & steering parts, body and chassis components.
- **Construction Industry**: Mold release with excellent tribology chemistry. Formulated not just as physical release but also chemically engineered for superior performance and concrete finish.
- **Powder Coating & Paint Industries**: Colour matched as per powder coating or any RAL shades. Custom colour solutions tailored to your specific requirements.

### Figures (the live site's own, shown without a source line)
- 70+ Product Range · All Major States in India: Coverage · 1,000+ Happy Clients · ISO Certified Company: Certification

### Services
- **From formulation to finished product.**
- Made at our factory in Tiruverkadu, Chennai. Our Director personally oversees Research & Development, and we keep investing in R&D, modern technology and geographical expansion.
- **Manufacturing**: Standard, speciality and niche-market products across lubricants, construction chemicals and aerosols. (phones: "Lubricants, construction chemicals and aerosols.")
- **Research & Development**: R&D operations overseen personally by our Director, with continued investment in modern technology. (phones: "Overseen personally by our Director.")
- **Customised Formulation**: Products built on our own formulations or on formulations specified by the customer. (phones: "Our formulations, or yours.")
- **Private Label**: Manufacturing for recognised brands and independent marketing companies across the globe. (phones: "For brands and marketing companies worldwide.")
- **Quality Control**: An ISO certified company, with after-sales support on every product we supply. (phones: "ISO certified, with after-sales support.")
- **Your brand. Our formulation floor.** We manufacture for recognised brands and independent marketing companies across the globe, from formulation to a packed product in your livery. · buttons: How private label works · Discuss private label

### From the blog
- **Guides for the shop floor and the site.** · the three newest guides · button: All articles

### Questions
- **Questions buyers ask.** What we make, where we make it and how to buy it, in brief.
1. **Is Krini Crude a manufacturer?** Yes. Krini Crude is an ISO certified manufacturer of lubricants, greases, construction chemicals and aerosol sprays: more than 70 products, made at our factory in Tiruverkadu, Chennai, to our own formulations or to yours. (About Krini Crude → /about)
2. **Where are your office and factory?** Our office is at 95/20B, Gujji Main Road, Anna Nagar East, Chennai 600102, and our factory at 161A, Chinakoladi Lakshmi Nagar, Tiruverkadu, Chennai 600077, Tamil Nadu. We supply all major states in India. (Contact and directions → /contact)
3. **Which lubricants and oils do you make?** Our 1-COOL metalworking fluid series: cutting oils (neat, broaching, gear hobbing, stamping and drawing oils), soluble cutting oils (Aquacut 150, AL 5000 and AL 7000 coolants), dewatering and oil-based rust preventive oils, hydraulic oil in grades 32, 46 and 68, gear oil in 90, 140, 220 and 320, and engine oil in 15W40, 20W40 and 5W30. (View lubricants → /products/lubricants)
4. **Do you make shuttering oil and mold release agents?** Yes. Shuttering oils (Silease 360, Magic Oil, Nikri 30 and Nikri AL), shuttering greases (Krini and Repel), and mold release oils and greases for precast moulds. They stop concrete sticking, so formwork strips cleanly and can be used again. (View construction chemicals → /products/construction-chemicals)
5. **Which aerosol sprays do you make?** Colour spray paints in black (glossy or matt) or any RAL shade, which we can match to your powder coating; Galva zinc spray; a silicone-free anti-spatter spray for welding; Lock Bond adhesive spray in 400 ml cans; and release sprays. (View aerosols → /products/aerosols)
6. **Can you make products under our brand?** Yes. We offer private label manufacturing, to our formulations or yours, for brands in the automotive aftermarket, construction, MRO and general industrial categories, and for marketing companies across the globe. (How private label works → /services#private-label)
7. **Which industries do you supply?** Auto assembly and auto component makers, construction, and the powder coating and paint industries, as well as industrial, automotive, marine and infrastructure customers: more than 1000 clients across India.

### Enquiries
- **Let’s build performance.** Tell us the products, quantities and application, or the product you want made under your brand. · Enquire now · Call · WhatsApp
- Under the phone and email (home page only), each opening its map: Office 95/20B, Gujji Main Road, Anna Nagar East, Chennai - 600102, Tamil Nadu, India · Factory Ground Floor, 161A, Krini Crude, Chinakoladi Lakshmi Nagar, Tiruverkadu, Chennai, Tiruvallur - 600077, Tamil Nadu, India

---

## 2. About (/about)

### Header
- About Us
- **h1: About Krini Crude**
- Quality Industrial Solutions
- Buttons: Talk to our team · View products
- Beside the picture, a turning seal: Innovation & excellence in manufacturing
- Facts: Chennai Office & factory · ISO Certified company · 70+ Products · 1000+ Happy clients

### Expertise
- **Welcome to Krini Crude**
- Quote: “A distinguished reputation as proud pioneers in lubricants, construction chemicals and aerosol manufacturing.”
- Krini Crude is one of the leading manufacturers of premium quality industrial products in India. With extensive manufacturing experience, we have developed a distinguished reputation as proud pioneers in lubricants, construction chemicals, and aerosol manufacturing. We are manufacturing a range of standard, speciality and niche market products using own and customer specified formulations. Our markets include industrial, automotive, marine, construction, infrastructure, and more specialist sectors.
- We are strong in R&D, with our Director personally overseeing the Research & Development operations. Our team comprises well-trained and technically strong staff and employees who are dedicated to innovation and excellence. We have given our products to corporate clients for rebranding, and with our extensive experience in this field, we can offer tailor-made products and comprehensive after-sales support for our valuable clients.
- We also offer private label manufacturing to well recognized brands in the automotive aftermarket, construction industry, MRO, and general industrial categories and independent marketing companies across the globe. At Krini Crude, we are committed to investing substantially in Research & Development, acquiring modern technologies and geographical expansion.
- Our three lines: Lubricants & Greases · Construction Chemicals · Aerosols (each links to its page)
- Markets we supply: Industrial · Automotive · Marine · Construction · Infrastructure · Specialist sectors

### Vision & mission
- Our vision: **Innovation and excellence in manufacturing.**
- Our mission (what we are committed to, in our own words):
  1. **Research & development**: Invest substantially in R&D, overseen by our Director.
  2. **Modern technology**: Keep acquiring modern technologies.
  3. **Reach**: Expand geographically: all major states in India today, brands across the globe.
  4. **Support**: Give every client tailor-made products and comprehensive after-sales support.
- Both are drawn from krinicrude.com's own words (its home page line and what its About page says Krini Crude is committed to). Replace them with Krini Crude's formal vision and mission statements, if it has them.

### Research & development: From the Director’s desk
- **Formulation is where the work starts.**
- **[TBC: Director’s photograph, 4:5]** · **[TBC: Director’s name]**, Director, Krini Crude
- Our Director personally oversees Research & Development, with a well-trained, technically strong team dedicated to innovation and excellence.
- **[TBC: Director’s message, 60 to 100 words]**
1. **Our formulations**: Standard, speciality and niche-market products, made to formulations developed by our own team. (phones, side by side: "Developed by our own team")
2. **Your formulation**: Products made to formulations specified by our customers. (phones, side by side: "Specified by you")
3. **Tailor-made**: Tailor-made formulations for corporate clients, for products they sell under their own brand. (phones, side by side: "For your own brand")

### What you can count on
- **Six things every client gets.** What stays the same on every order, whichever of our 70+ products it is and whoever’s name is on the label.
- KC–01 **Own and customer formulations**: Standard, speciality and niche-market products, made to our formulations or to yours.
- KC–02 **R&D led by our Director**: Research & Development overseen personally by our Director, with a technically strong team.
- KC–03 **ISO certified**: An ISO certified company. **[TBC: ISO standard and certificate number]**
- KC–04 **Your brand**: Private label manufacturing and products for rebranding, for brands across the globe.
- KC–05 **After-sales support**: Comprehensive after-sales support for every client.
- KC–06 **Across India**: Supplying all major states in India, with 1000+ happy clients.

### In figures
- **The numbers behind the name.** 70+ Product Range · All Major States in India: Coverage · 1,000+ Happy Clients · ISO Certified Company: Certification

### How we work
- **From enquiry to after-sales.** · button: Private label, step by step
1. **Enquiry**: Tell us the application, the products and the quantities, or the product you want under your brand.
2. **Formulation**: Our formulation or yours, with our R&D team, overseen by our Director.
3. **Manufacturing**: Made at our factory in Tiruverkadu, Chennai.
4. **Supply**: Under our brand or yours, to all major states in India.
5. **After-sales**: Comprehensive after-sales support for every client.

### Where we are
- **An office in Anna Nagar, a factory in Tiruverkadu.**
- Office address: 95/20B, Gujji Main Road, Anna Nagar East, Chennai - 600102, Tamil Nadu, India · Get directions
- Factory address: Ground Floor, 161A, Krini Crude, Chinakoladi Lakshmi Nagar, Tiruverkadu, Chennai, Tiruvallur - 600077, Tamil Nadu, India · Get directions

### Questions, answered.
1. **What does Krini Crude manufacture?** Lubricants and greases (including the 1-COOL metalworking fluid series), construction chemicals (shuttering and mold release oils and greases) and aerosol products (spray paints, anti-spatter, adhesive and release sprays): 70+ products in all.
2. **Where is Krini Crude based?** Our office is at 95/20B, Gujji Main Road, Anna Nagar East, Chennai 600102, and our factory is in Chinakoladi Lakshmi Nagar, Tiruverkadu, Chennai 600077, Tamil Nadu.
3. **Is Krini Crude ISO certified?** Yes, Krini Crude is an ISO certified company.
4. **Which markets do you supply?** Industrial, automotive, marine, construction, infrastructure and more specialist sectors, across all major states in India.
5. **Can you make products to our formulation or under our brand?** Yes. We manufacture to our own formulations and to formulations specified by customers, and we offer private label manufacturing and products for rebranding.

Closing band: as on Home.

---

## 3. Services (/services)

### Header
- Services
- **h1: Manufacturing, formulation and private label, under one roof.**
- From your brief to a finished, packed product: we manufacture our own range, make products to your formulation and produce for brands to sell under their own name.
- Facts: 05 Services · 03 Ways to work with us · R&D Overseen by our Director · ISO Certified company
- Buttons: Discuss private label · Discuss a formulation
- Picture: production hall (AI-generated visualisation)

### What we do
- **Five services, one factory.**
- Made at our factory in Tiruverkadu, Chennai. Our Director personally oversees Research & Development, and we keep investing in R&D, modern technology and geographical expansion.
1. **Manufacturing** (picture card, number 01): Standard, speciality and niche-market products across lubricants, construction chemicals and aerosols. Covers: Metalworking fluids and industrial oils (the 1-COOL series), greases; Shuttering and mold release oils and greases; Aerosol spray paints, anti-spatter, adhesive and release sprays. Phones: "Lubricants, construction chemicals and aerosols." · Enquire (Request a quote)
2. **Research & Development** (picture card, number 02): R&D operations overseen personally by our Director, with continued investment in modern technology. Covers: A well-trained, technically strong team; Continued investment in R&D and modern technology. Phones: "Overseen personally by our Director." · Enquire (Custom formulation)
3. **Customised Formulation** (picture card, number 03): Products built on our own formulations or on formulations specified by the customer. Covers: Tailor-made products for corporate clients; Spray colours matched to any RAL shade or to your powder coating. Phones: "Our formulations, or yours." · Enquire (Custom formulation)
4. **Private Label** (picture card, number 04): Manufacturing for recognised brands and independent marketing companies across the globe. Covers: Products for rebranding; Automotive aftermarket, construction, MRO and general industrial. Phones: "For brands and marketing companies worldwide." · Enquire (Private label)
5. **Quality Control** (picture card, number 05): An ISO certified company, with after-sales support on every product we supply. Covers: Comprehensive after-sales support. **[TBC: ISO standard and certificate number]** Phones: "ISO certified, with after-sales support." · Enquire (Enquiry)
6. **Tell us what you need.** Products and quantities, a formulation, or a product under your brand. · Enquire

### Private label & customised manufacturing
- **Your brand. Our formulation floor.**
- We manufacture for well-recognised brands in the automotive aftermarket, construction, MRO and general industrial categories, and for independent marketing companies across the globe.
1. **Raw materials**: Base oils, additives and components selected for the application.
2. **Formulation**: Our formulation or yours, specified with our R&D team.
3. **Testing**: Batches checked against the agreed specification before release.
4. **Manufacturing**: Blended and produced at our factory in Tiruverkadu, Chennai.
5. **Packaging**: Filled and packed in your brand’s livery.
6. **Finished product**: Delivered ready for market, with after-sales support.
- Sectors we manufacture for: Automotive aftermarket · Construction industry · MRO · General industrial

### Ways to work with us
- **Three ways to work with Krini Crude.**
1. **From our range**: 70+ standard, speciality and niche-market products across lubricants, construction chemicals and aerosols. · View products
2. **To your formulation**: Products made to formulations specified by you, or tailor-made with our R&D team. · Discuss a formulation
3. **Under your brand**: Private label manufacturing and products for rebranding, with after-sales support. · Discuss private label

### Questions, answered.
1. **Do you offer private label manufacturing?** Yes. We manufacture for well-recognised brands in the automotive aftermarket, construction, MRO and general industrial categories, and for independent marketing companies across the globe.
2. **Can you manufacture to our own formulation?** Yes. We make products to our own formulations and to formulations specified by our customers, and our R&D team can develop tailor-made products.
3. **Who oversees your R&D?** Our Director personally oversees our Research & Development operations.
4. **Can you match a spray colour to our powder coating?** Yes. Our colour sprays can be matched to a powder coating or to any RAL shade.
5. **Do you provide after-sales support?** Yes, we offer comprehensive after-sales support for every client.

Closing band: **Planning a product under your brand?** Tell us about the product, the market it is for, pack sizes and volumes, and whether you have a formulation.

---

## 4. Products (/products)

### Header
- Products · 70+ products
- **h1: Industrial lubricants, construction chemicals and aerosol sprays.**
- Standard, speciality and niche-market products in three lines, made at our factory in Chennai to our formulations or to yours, and available under your brand.
- Facts: 03 Product lines · 70+ Products · 1-COOL Metalworking fluid series · RAL Any shade, in our colour sprays
- Buttons: Request a quote · All products · the three lines as pictures, each opening its page

### Our Product Range
- **Complete industrial solutions** Standard, speciality and niche-market products, made to our formulations or to yours.
- **01 Lubricants & Greases**: Premium quality lubricants and greases for automotive, industrial, and specialty applications. Our lubricants ensure optimal performance and longevity. Products: Cutting Oil, Soluble Cutting Oil, Rust Preventive Oil, Hydraulic Oil, Gear Oil, Engine Oil, Greases · View lubricants · Enquire
- **02 Construction Chemicals**: High-performance construction chemicals and solutions for infrastructure, building, and civil engineering projects. Built for durability and strength. Products: Shuttering Oil, Shuttering Grease, Mold Release Oil, Mold Release Grease · View construction · Enquire
- **03 Aerosols**: Advanced aerosol products for industrial maintenance, automotive care, and specialty applications. Engineered for precision and efficiency. Products: Vibrant Colour Sprays, Lock Bond Adhesive Spray, Anti-Spatter Spray, Release Spray · View aerosols · Enquire

### Every product at a glance
- **Find a product by name or grade.** Products, variants and grades as listed on krinicrude.com. Ask us for the technical data sheet of any product.

- As cards, with a bar to show one line at a time: All · Lubricants & Greases · Construction Chemicals · Aerosols. Each card: the line, the product, its variants or grades, Enquire.

| Product | Variants & grades | Line |
| --- | --- | --- |
| Cutting Oil | Neat cutting oil · Broaching · Gear hobbing · Stamping · Drawing oil | Lubricants & Greases |
| Soluble Cutting Oil | Mineral coolant oil · Semi-synthetic coolant oil | Lubricants & Greases |
| Rust Preventive Oil | Dewatering RP oil · Oil based RP oil | Lubricants & Greases |
| Hydraulic Oil | 32 · 46 · 68 | Lubricants & Greases |
| Gear Oil | 90 · 140 · 220 · 320 | Lubricants & Greases |
| Engine Oil | 15W40 · 20W40 · 5W30 | Lubricants & Greases |
| Greases | Ask us | Lubricants & Greases |
| Shuttering Oil | Ask us | Construction Chemicals |
| Shuttering Grease | Ask us | Construction Chemicals |
| Mold Release Oil | Ask us | Construction Chemicals |
| Mold Release Grease | Ask us | Construction Chemicals |
| Vibrant Colour Sprays | Black (glossy / matt) · Any RAL shade · Galva zinc spray | Aerosols |
| Lock Bond Adhesive Spray | 400 ml | Aerosols |
| Anti-Spatter Spray | Ask us | Aerosols |
| Release Spray | Ask us | Aerosols |

### Guides
- **Choosing and using our products.** One guide for each line.

### Questions, answered.
1. **How many products do you make?** More than 70, across lubricants and greases, construction chemicals and aerosols.
2. **Do you supply outside Tamil Nadu?** Yes. We supply all major states in India, and we manufacture private label products for brands and marketing companies across the globe.
3. **How do I get a quote?** Send us an enquiry with the products, quantities, application and delivery location, or call +91 80153 43987.

Closing band: **Need a price or a sample?** Send us the products, grades, quantities and delivery location, and we will come back with a quote.

---

## 5. Lubricants & Greases (/products/lubricants)

### Header (on navy)
- 01 · 1-COOL Metal Working Fluid Series
- **h1: 1-COOL metalworking fluids and industrial lubricants.**
- Premium quality lubricants and greases for automotive, industrial, and specialty applications. Our lubricants ensure optimal performance and longevity.
- Buttons: Enquire now · Request a quote
- In this range: 01.01 Cutting Oil · 01.02 Soluble Cutting Oil · 01.03 Rust Preventive Oil · 01.04 Hydraulic Oil · 01.05 Gear Oil · 01.06 Engine Oil · 01.07 Greases (links to each product)
- Share picture: /images/og-lubricants.jpg

### Products
- **The lubricants & greases range.** Cutting Oil • Soluble Cutting Oil • Rust Preventive • Hydraulic • Gear • Engine Oils
- Each product as a data sheet: its number and name, what it does, then rows for its grades (as tiles) or variants, the products available under it, typical uses and highlights; at its foot, Enquire and what is still to be confirmed.

**01.01 Cutting Oil** · Neat cutting oil · Broaching · Gear hobbing · Stamping · Drawing oil

Neat (straight) cutting oils are used undiluted. They lubricate the contact between tool and workpiece, which reduces friction and tool wear and helps give a good surface finish.
- Typical uses: Machining where lubrication at the cutting edge matters most; Broaching and gear hobbing; Stamping and drawing of sheet metal
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Cutting Oil named in the message)

**01.02 Soluble Cutting Oil** · Mineral coolant oil · Semi-synthetic coolant oil

Soluble cutting oils are mixed with water to make a coolant. The coolant carries heat away from the cutting zone, lubricates, flushes away chips and helps protect parts and machines from rust.
- Available products (as listed on krinicrude.com): **1-COOL Aquacut 150**: Mineral Coolant Oil · **1-COOL AL 5000**: Multimetal Semisynthetic Coolant Oil · **1-COOL AL 7000**: Premium Semi Synthetic Coolant Oil
- Typical uses: Turning, milling, drilling and other machining with a coolant system; Operations where cooling matters as much as lubrication
- **[TBC: Technical data sheet]** · **[TBC: Recommended mixing ratio]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Soluble Cutting Oil named in the message)

**01.03 Rust Preventive Oil** · Dewatering RP oil · Oil based RP oil

Rust preventive oils leave a protective film on metal parts between operations, in storage and in transit. Dewatering types first displace water from freshly washed or machined parts.
- Typical uses: Protecting machined components between operations; Storage and shipment of steel parts; Parts that come out of washing or water-based coolant
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Rust Preventive Oil named in the message)

**01.04 Hydraulic Oil** · 32 · 46 · 68

Hydraulic oils transmit power in hydraulic systems while lubricating pumps, valves and cylinders. The grade is the oil's viscosity: choose the one your equipment maker recommends for your operating temperatures.
- Typical uses: Hydraulic presses and injection moulding machines; Machine tool hydraulics; Mobile and industrial hydraulic equipment
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Hydraulic Oil named in the message)

**01.05 Gear Oil** · 90 · 140 · 220 · 320

Gear oils lubricate gearboxes and gear drives, keeping a film of oil between meshing teeth under load to reduce wear, heat and noise.
- Typical uses: Industrial gearboxes and gear drives; Automotive and equipment gear assemblies, as specified by the manufacturer
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Gear Oil named in the message)

**01.06 Engine Oil** · 15W40 · 20W40 · 5W30

Engine oils lubricate, clean and cool internal combustion engines. Use the grade your vehicle or engine manufacturer specifies.
- Typical uses: Petrol and diesel engines, in the grade the engine maker specifies
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Engine Oil named in the message)

**01.07 Greases**

Greases are lubricants thickened to stay in place where an oil would run off, for bearings, joints and slides that are not in a circulating oil system.
- **[TBC: Grease types and grades]**
- Button: Enquire (opens the form with "Enquiry: Lubricants & Greases" chosen and Greases named in the message)

**Your formulation: Need something not listed here?** We manufacture to our own formulations and to formulations specified by customers, and make products for brands to sell under their own name.
- Buttons: Discuss a formulation (enquiry: Custom formulation) · Private label → /services#private-label

### Industries we serve
- **Where our lubricants & greases work.**
- **Auto Assembly**: We make speciality lubricants for companies involved in the manufacture of motor vehicles, including most components, such as engines and bodies, for passenger cars and commercial vehicles.
- **Auto Component**: We make lubricants for companies involved in the manufacture of auto components such as engine parts, drive transmission & steering parts, body and chassis components.

### Guides
- **Choosing and using lubricants & greases.** Neat or soluble cutting oil? How to choose a metalworking fluid · Hydraulic, gear and engine oil grades: what the numbers mean · Storing and handling industrial lubricants: a practical checklist

### Questions, answered.
1. **What is the difference between neat and soluble cutting oil?** Neat cutting oil is used undiluted and mainly lubricates the cut. Soluble cutting oil is mixed with water into a coolant that cools as well as lubricates. The right choice depends on the operation, the material and your machines; our team can advise.
2. **Which grades of hydraulic, gear and engine oil do you make?** Hydraulic oil in grades 32, 46 and 68; gear oil in grades 90, 140, 220 and 320; engine oil in 15W40, 20W40 and 5W30.
3. **What is 1-COOL?** 1-COOL is Krini Crude's metalworking fluid series: cutting oils, soluble cutting oils (coolants), rust preventive, hydraulic, gear and engine oils.
4. **Can you make a lubricant to our own formulation or under our brand?** Yes. We manufacture to our own formulations and to formulations specified by customers, and we make products for brands to sell under their own name.

### More from Krini Crude
- **Our other product lines.** Construction Chemicals · Aerosols

Closing band: **Tell us what you need.** Send us the lubricants & greases you need, with grades, quantities, application and delivery location.

---

## 6. Construction Chemicals (/products/construction-chemicals)

### Header (on navy)
- 02 · Construction Chemicals
- **h1: Shuttering and mold release oils and greases for concrete.**
- High-performance construction chemicals and solutions for infrastructure, building, and civil engineering projects. Built for durability and strength.
- Buttons: Enquire now · Request a quote
- In this range: 02.01 Shuttering Oil · 02.02 Shuttering Grease · 02.03 Mold Release Oil · 02.04 Mold Release Grease (links to each product)
- Share picture: /images/og-construction.jpg

### Products
- **The construction chemicals range.** Shuttering Oil • Shuttering Grease • Mold Release Solutions
- Each product as a data sheet: its number and name, what it does, then rows for its grades (as tiles) or variants, the products available under it, typical uses and highlights; at its foot, Enquire and what is still to be confirmed.

**02.01 Shuttering Oil**

Applied to formwork (shuttering) before the concrete is poured, shuttering oil leaves a release film so the formwork strips cleanly without concrete sticking to it, which protects the concrete surface and helps the formwork last for more pours.
- Available products (as listed on krinicrude.com): **Repel Shuttering Oil**: Premium Shuttering Oil Suitable for Aluminium & All Formworks · **Magic Shuttering Oil**: Suitable for Aluminium, MS, Plywood & All Formworks · **Silease 360 Shuttering Oil**: Suitable for Precast Shuttering Oil · **Nikri AL Shuttering Oil**: Cost Effective Mivan & Other Formworks · **Nikri 30 Shuttering Oil**: Cost Effective MS, Plywood & Road Projects Shuttering Oil
- Typical uses: Steel, plywood and other formwork on building and infrastructure sites
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Construction Chemicals" chosen and Shuttering Oil named in the message)

**02.02 Shuttering Grease**

A release agent for formwork in grease form. Ask our team whether an oil or a grease suits your formwork, surface and site conditions.
- Available products (as listed on krinicrude.com): **Krini Shuttering Grease**: Mold Release Grease · **Repel Shuttering Grease**: Premium Mold Release Grease
- Typical uses: Formwork on building and infrastructure sites
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Construction Chemicals" chosen and Shuttering Grease named in the message)

**02.03 Mold Release Oil**

Mold (mould) release oil is applied to moulds so that cast concrete units come away cleanly, with a good surface finish, and the moulds can be reused.
- Typical uses: Precast concrete moulds; Moulded concrete products
- Highlights (as published by Krini Crude): Formulated not just as physical release but also chemically engineered for superior performance and concrete finish.
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Construction Chemicals" chosen and Mold Release Oil named in the message)

**02.04 Mold Release Grease**

Mould release in grease form, for moulds and conditions where a grease is preferred to an oil.
- Typical uses: Precast concrete moulds
- Highlights (as published by Krini Crude): Formulated not just as physical release but also chemically engineered for superior performance and concrete finish.
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Construction Chemicals" chosen and Mold Release Grease named in the message)

**Your formulation: Need something not listed here?** We manufacture to our own formulations and to formulations specified by customers, and make products for brands to sell under their own name.
- Buttons: Discuss a formulation (enquiry: Custom formulation) · Private label → /services#private-label

### Industries we serve
- **Where our construction chemicals work.**
- **Construction Industry**: Mold release with excellent tribology chemistry. Formulated not just as physical release but also chemically engineered for superior performance and concrete finish.

### Guides
- **Choosing and using construction chemicals.** Shuttering oil and mold release: how to get a clean concrete finish

### Questions, answered.
1. **What is shuttering oil used for?** Shuttering oil is applied to formwork before concrete is poured. It stops the concrete sticking, so the formwork strips cleanly, the concrete keeps a clean face and the formwork can be reused.
2. **What is the difference between shuttering oil and mold release oil?** Both are release agents. Shuttering oil is used on site formwork; mold release oil is used on moulds, typically for precast concrete. We make both, in oil and grease form.
3. **Should I use a release oil or a release grease?** It depends on the formwork or mould, the surface and how the product will be applied. Tell us about your application and our team will recommend one.

### More from Krini Crude
- **Our other product lines.** Lubricants & Greases · Aerosols

Closing band: **Tell us what you need.** Send us the construction chemicals you need, with grades, quantities, application and delivery location.

---

## 7. Aerosols (/products/aerosols)

### Header (on navy)
- 03 · Aerosol Sprays
- **h1: Aerosol spray paints, anti-spatter, adhesive and release sprays.**
- Advanced aerosol products for industrial maintenance, automotive care, and specialty applications. Engineered for precision and efficiency.
- Buttons: Enquire now · Request a quote
- In this range: 03.01 Vibrant Colour Sprays · 03.02 Lock Bond Adhesive Spray · 03.03 Anti-Spatter Spray · 03.04 Release Spray (links to each product)
- Share picture: /images/og-aerosols.jpg

### Products
- **The aerosols range.** Vibrant Colour Sprays • Adhesive Sprays • Industrial Solutions
- Each product as a data sheet: its number and name, what it does, then rows for its grades (as tiles) or variants, the products available under it, typical uses and highlights; at its foot, Enquire and what is still to be confirmed.

**03.01 Vibrant Colour Sprays** · Black (glossy / matt) · Any RAL shade · Galva zinc spray

Aerosol spray paints for touch-up, marking and finishing. Colours can be matched to a powder coating or to any RAL shade.
- Available products (as listed on krinicrude.com): **Black (Glossy/Matt)**: High-quality black spray paint in glossy and matt finishes · **Any RAL Shades**: Custom shade available in any RAL colour · **Galva Zinc Spray**: Bright galvanizing zinc coating spray
- Typical uses: Touching up powder-coated and painted parts; Marking and finishing in maintenance and production
- **[TBC: Can sizes]**
- Button: Enquire (opens the form with "Enquiry: Aerosols" chosen and Vibrant Colour Sprays named in the message)

**03.02 Lock Bond Adhesive Spray** · 400 ml

A multi-purpose industrial adhesive in an aerosol, for bonding in production and maintenance.
- Available products (as listed on krinicrude.com): **Lock-Bond Adhesive Spray 400ml**: Multi-purpose adhesive spray, lasts longer, non-toxic, ozone friendly, CFC and lead free
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Aerosols" chosen and Lock Bond Adhesive Spray named in the message)

**03.03 Anti-Spatter Spray**

Sprayed on the work and on fixtures and nozzles before welding, anti-spatter leaves a thin film so weld spatter does not stick, which saves grinding and clean-up.
- Available products (as listed on krinicrude.com): **Relese Anti-Spatter Spray**: Anti-spatter spray, lasts longer, silicone-free
- Typical uses: MIG / MAG welding in fabrication shops; Protecting jigs, fixtures and torch nozzles
- **[TBC: Technical data sheet]**
- Button: Enquire (opens the form with "Enquiry: Aerosols" chosen and Anti-Spatter Spray named in the message)

**03.04 Release Spray**

A release agent in aerosol form, for quick, even application on moulds and surfaces.
- **[TBC: Applications and technical data]**
- Button: Enquire (opens the form with "Enquiry: Aerosols" chosen and Release Spray named in the message)

**Your formulation: Need something not listed here?** We manufacture to our own formulations and to formulations specified by customers, and make products for brands to sell under their own name.
- Buttons: Discuss a formulation (enquiry: Custom formulation) · Private label → /services#private-label

### Industries we serve
- **Where our aerosols work.**
- **Powder Coating & Paint Industries**: Colour matched as per powder coating or any RAL shades. Custom colour solutions tailored to your specific requirements.

### Guides
- **Choosing and using aerosols.** Anti-spatter spray: cleaner welds and less grinding

### Questions, answered.
1. **Can you match a spray paint to our powder coating colour?** Yes. Our colour sprays can be matched to a powder coating or to any RAL shade.
2. **Is your anti-spatter spray silicone-free?** Yes. Our anti-spatter spray is silicone-free, which matters when welded parts are going to be painted or powder coated.
3. **What sizes does Lock Bond adhesive spray come in?** Lock Bond Adhesive Spray comes in a 400 ml can.

### More from Krini Crude
- **Our other product lines.** Lubricants & Greases · Construction Chemicals

Closing band: **Tell us what you need.** Send us the aerosols you need, with grades, quantities, application and delivery location.

---

## 8. How it’s made (/how-its-made)

Linked from the home page, the Products page and the footer.

### Header
- How it’s made
- **h1: From crude oil to the drum.**
- Every lubricant starts as crude oil, deep underground. It is drilled, shipped and refined into base oil, then blended with additives, tested and packed. The last two steps happen at our factory in Tiruverkadu, Chennai. Here is the whole journey.
- Facts: 10 Steps · 4 Places · Chennai Blended & packed
- Buttons: Follow the journey · Discuss a formulation

### The journey
- **Ten steps, four places.**
- Note under the heading: AI-generated illustrations, not footage of our plant
- A film frame stays in place while the steps scroll past (on the left on larger screens, at the top on phones); the step being read shows its clip. Under the frame, a bar of the ten steps grouped by place; each one scrolls to its step.

**In nature** · Underground, over millions of years

- **01 Formed underground**: Over millions of years, the remains of tiny sea plants and animals settle on the seabed and are buried under mud and rock. As they sink deeper, heat and pressure slowly turn them into crude oil. *(Clip: Plankton drifting down through blue-green water onto the seabed.)*
- **02 Trapped in rock**: Oil is lighter than water, so it creeps upward through porous rock such as sandstone until it meets a layer it cannot pass, like shale or salt. There it gathers in a reservoir, often with gas above it and water below. *(Clip: Amber crude oil seeping between the grains of porous rock.)*

**At the oilfield** · Oilfields around the world

- **03 Found and drilled**: Geologists map the rock layers with seismic surveys to find these traps. A rig then drills a well down to the reservoir, often kilometres deep, lining it with steel casing as it goes. *(Clip: A drilling rig lit up at dusk in the desert.)*
- **04 Brought to the surface**: At first the reservoir’s own pressure pushes the oil up the well; later, pumps lift it. At the surface, the crude is separated from the gas, water and sand that come up with it. *(Clip: A pumpjack rocking on an oilfield at golden hour.)*
- **05 Shipped to a refinery**: The crude travels by pipeline and by tanker ship to a refinery, often from the other side of the world. *(Clip: A crude oil tanker sailing on a calm sea at sunrise.)*

**At the refinery** · Oil refineries

- **06 Separated by heat**: At the refinery, the crude is washed to remove salt, heated to around 350–400 °C and fed into a distillation column. The vapour rises and cools, and each part condenses at its own height: gases at the top, then petrol, kerosene and diesel, with a heavy residue at the bottom. *(Clip: A refinery’s distillation columns lit up at night.)*
- **07 Split again, under vacuum**: The residue goes to a second column under vacuum. At low pressure it boils at lower temperatures, so it separates without breaking down, into the heavy distillates that lubricant base oils are made from. *(Clip: A vacuum distillation column and its pipework against an evening sky.)*
- **08 Refined into base oil**: These distillates are refined again: aromatics are taken out so the oil holds its thickness as temperatures change, wax so it still flows in the cold, and a final treatment with hydrogen improves its colour and stability. Newer refineries use hydrocracking to make even purer base oils. *(Clip: Pale golden base oil being poured into a glass beaker.)*

**At our plant** · Tiruverkadu, Chennai

- **09 Blended to the formulation**: At our factory, base oil is measured out with the additives each formulation calls for (anti-wear, anti-rust and anti-oxidation additives in hydraulic and gear oils, for example; emulsifiers that let soluble cutting oils mix with water) and blended until uniform. **[TBC: Where our base oils come from]** · **[TBC: Our blending process and equipment]** *(Clip: Golden oil swirling in a stainless-steel blending tank as an additive pours in.)*
- **10 Tested, filled and dispatched**: Each batch is checked against its specification before it is filled, labelled and dispatched to customers across India: under the Krini Crude name or, for private label, under yours. **[TBC: Tests run on each batch]** · **[TBC: Pack sizes]** *(Clip: Filling nozzles pouring golden oil into drums on a filling line.)*

### Product by product
- **What changes from line to line.** The base oil and the additives depend on the job the product has to do.
- **Hydraulic, gear and engine oils** (lubricants): Base oil of the right viscosity grade, with additives against wear, rust, oxidation and foaming. Engine oils also carry detergents that keep the engine clean.
- **1-COOL cutting oils** (lubricants): Neat cutting oils are used as they are, with additives for heavy cuts. Soluble cutting oils carry emulsifiers, so they mix with water into a coolant, and corrosion inhibitors that protect the work.
- **Greases** (lubricants): Base oil thickened into a soft solid, so it stays where it is put.
- **Shuttering and mold release oils** (construction): Oil carrying release agents that leave a thin film on the formwork, so the concrete comes away cleanly.
- **Aerosol sprays** (aerosols): Paint, adhesive, anti-spatter or release liquid, sealed in a can with a propellant that delivers it as a fine spray.

### Questions, answered.
1. **What is base oil?** The refined oil that makes up most of a finished lubricant. Mineral base oils are refined from crude oil; synthetic ones are made chemically. Additives are blended in to give each product the properties its job needs.
2. **What do additives do?** They give oil properties base oil does not have on its own: protection against wear, rust and oxidation, resistance to foaming, the ability to mix with water in soluble cutting oils, or a clean release from formwork in shuttering oils.
3. **What does ISO VG 68 mean?** It is a viscosity grade: the oil’s viscosity at 40 °C is 68 cSt, within 10% either way (61.2 to 74.8 cSt). Hydraulic oils are commonly sold as ISO VG 32, 46 and 68.
4. **Where are Krini Crude’s products made?** At our factory in Tiruverkadu, Chennai. Our office is in Anna Nagar East, Chennai.
5. **Can you make a product to our formulation?** Yes. We make products to our own formulations or to formulations you specify, and we manufacture private label products under your brand.

Closing band: **Need a lubricant made to order?** Tell us the product, the grade and the quantity, or send us your formulation.

---

## 9. Blog (/blog)

- Blog
- **h1: Notes from the formulation floor.**
- Practical guides from the Krini Crude team on choosing, using and looking after lubricants, construction chemicals and aerosols.
- Filter by topic: All · Lubricants · Construction chemicals · Aerosols · Private label
- Featured guide (the first, across the full width): Neat or soluble cutting oil? How to choose a metalworking fluid
- Each card carries its topic as a badge on its picture.
- Closing band: **Need a product recommendation?** Tell us the machine, the material or the job, and our team will suggest a product.

### On every article
- Side box: **Need a product recommendation? Talk to our team.** Tell us the machine, the material or the job, and our team will suggest a product. · Send an enquiry · Call · WhatsApp · the product line the guide is about
- Footnote: This article is general guidance. Always follow the equipment maker’s recommendations and the product’s technical and safety data sheets.
- **More guides.** · All articles

### 9.1 Neat or soluble cutting oil? How to choose a metalworking fluid

*Lubricants · **[TBC: Publication date]** · 2 min read · By the Krini Crude team* · /blog/neat-vs-soluble-cutting-oil

**Summary:** Neat oils lubricate, soluble oils cool. How to decide which suits your machining, and how to keep a coolant healthy once it is in the machine.

The fluid at the cutting edge decides a surprising amount: how long tools last, the finish on the part, how often the machine stops, and how pleasant the shop is to work in. Most machining fluids fall into two families, and the first choice is between them.

**Neat cutting oils**

Neat, or straight, cutting oils are used as supplied, without water. Their strength is lubrication: they keep a film between the tool and the workpiece, which reduces friction and wear and helps give a fine surface finish.

- Operations with heavy cutting forces or low speeds, where lubrication matters more than cooling
- Broaching, gear hobbing, threading and similar operations
- Forming work such as stamping and drawing, which uses dedicated oils

Because they are not mixed, neat oils are simple to manage: there is no concentration to check. They do not carry heat away as well as a water-based coolant, and they need good mist extraction.

**Soluble cutting oils (coolants)**

Soluble oils are concentrates that are mixed with water to make a coolant. Water is very good at carrying heat away, so a coolant cools the cutting zone while the oil in it lubricates, flushes away chips and helps protect parts and machines from rust.

- Mineral soluble oils form a milky emulsion with a relatively high oil content.
- Semi-synthetic coolants contain less mineral oil and form a finer emulsion.

Coolants suit higher-speed turning, milling and drilling, where heat is the main problem, and machines with a central coolant system.

**How to choose**

- Start with the operation and the material: what limits tool life today, heat or friction?
- Check what the machine builder recommends, and whether the machine is set up for oil or for coolant.
- Think about the whole system: sump size, filtration, how chips are handled and how used fluid will be disposed of.
- Run a trial on one machine before you change the whole shop, and record tool life and finish before and after.

**Keeping a coolant healthy**

Most coolant problems, from smell to rust to short tool life, come from the concentration drifting or contamination building up.

- Mix the concentrate into water, not water into the concentrate, at the ratio on the product’s data sheet.
- Check the concentration regularly with a refractometer, and top up with premixed coolant rather than plain water.
- Skim off tramp oil that leaks in from slideways and hydraulics.
- Keep sumps clean, and clean the system thoroughly when the coolant is changed.

> Tip: Ask for the product’s technical data sheet before a trial: it gives the mixing ratio and the concentration range to aim for.

### 9.2 Hydraulic, gear and engine oil grades: what the numbers mean

*Lubricants · **[TBC: Publication date]** · 2 min read · By the Krini Crude team* · /blog/oil-grades-hydraulic-gear-engine

**Summary:** 32, 46 and 68; 90 and 140; 220 and 320; 15W40. How each grading system works, how to choose the grade your machine needs, and the signs an oil needs attention.

The number on a drum of oil is its viscosity grade: a measure of how thick the oil is, and so of the film it can hold between moving parts. Hydraulic, gear and engine oils are graded on different scales, though, so the same number does not mean the same thing on each.

**Hydraulic oils: ISO grades 32, 46 and 68**

Hydraulic oils, like most industrial oils, carry ISO viscosity grades (ISO VG). The number is the oil’s typical kinematic viscosity, in mm²/s (centistokes), at 40 °C: the higher the number, the thicker the oil.

- ISO VG 32 flows most easily. It suits cooler conditions and systems designed for a thinner oil.
- ISO VG 46 is a common middle ground for many industrial machines.
- ISO VG 68 holds a thicker film, for warmer running conditions and systems designed for it.

**Gear oils: 90 and 140, or 220 and 320**

Gear oils are graded in two ways. Grades such as 90 and 140 are on the SAE scale for gear oils, used mainly for automotive-type gear assemblies. Industrial gearboxes are usually specified in ISO grades such as 220 and 320, on the same scale as hydraulic oils.

The SAE gear oil scale is separate from the SAE engine oil scale, so their numbers cannot be compared: at operating temperature, a 90 gear oil is roughly as thick as a 40 or 50 engine oil.

**Engine oils: 15W40, 20W40 and 5W30**

Most engine oils are multigrades. The number before the W (for winter) describes the oil when cold: the lower it is, the more easily the oil flows at a cold start. The number after it is the oil’s viscosity grade at operating temperature.

- 15W40 and 20W40 are both 40 grades once the engine is warm; 15W40 flows more easily when cold.
- 5W30 flows most easily at a cold start of the three, and is a thinner 30 grade when warm.
- Always use the grade the vehicle or engine maker specifies.

**Choosing the right grade**

- Start with the equipment maker’s recommendation, in the manual or on the machine’s plate.
- Consider the temperature the oil actually runs at, not only the temperature of the room.
- Do not mix grades or different types of oil. If you change products, drain and flush the system as its maker recommends.

**Signs the oil needs attention**

- Milky oil has taken in water.
- Foam in a tank or sump points to air getting in, or to contamination.
- Dark oil with a burnt smell points to overheating, or to oil that has aged.
- Sluggish or jerky hydraulics, or gears running noisier or hotter than usual, are reasons to check both the oil and the machine.

Krini Crude makes hydraulic oil in grades 32, 46 and 68, gear oil in 90, 140, 220 and 320, and engine oil in 15W40, 20W40 and 5W30.

> Tip: Label each machine with the oil and the grade it uses, so the right one goes in every time.

### 9.3 Shuttering oil and mold release: how to get a clean concrete finish

*Construction chemicals · **[TBC: Publication date]** · 2 min read · By the Krini Crude team* · /blog/shuttering-oil-mold-release-concrete-finish

**Summary:** What release agents do, how to choose between oil and grease, and the site habits that give clean concrete faces and longer-lasting formwork.

Concrete bonds to almost anything it sets against. A release agent on the formwork or mould stops that bond, so the form strips cleanly, the concrete keeps a sound, even face, and the formwork can be used again.

**Shuttering oil or mold release?**

- Shuttering oil and shuttering grease are used on formwork on site: walls, columns, slabs and beams.
- Mold release oil and grease are used on moulds, typically for precast concrete units and products.

Both come as oils and as greases. Which suits you depends on the formwork or mould material, the orientation of the surface and how you apply it. Tell your supplier about the job and ask for a recommendation.

**Before you apply**

- Clean the formwork: remove old concrete, dust, rust and debris.
- Repair damaged faces. A release agent cannot hide a poor surface.
- Keep release agent off the reinforcement: on steel bars it weakens the bond between steel and concrete.

**Applying it**

- Apply a thin, even coat. Too much can pool, stain the concrete or leave blemishes on its surface.
- Cover the whole face, including edges and corners.
- Keep treated forms clean and dry until the pour, protected from rain and dust.
- Pour within the time the product’s data sheet allows after application.

**After striking**

Clean the formwork as soon as it is struck, before any residue hardens, and store it flat and covered. Well-kept formwork gives better faces and lasts for more pours.

> Tip: For exposed architectural concrete, trial the release agent on a sample panel before the first pour.

### 9.4 Storing and handling industrial lubricants: a practical checklist

*Lubricants · **[TBC: Publication date]** · 2 min read · By the Krini Crude team* · /blog/storing-handling-industrial-lubricants

**Summary:** Most lubrication problems start before the oil reaches the machine. Simple rules for storing drums, dispensing oil and keeping it clean.

A lubricant can leave the factory in perfect condition and still fail in service, because water, dust or another oil got into it on the way to the machine. Good storage and handling cost little and protect every litre you buy.

**Storage**

- Store lubricants indoors, in a cool, dry, well-ventilated place, away from direct sun, heat and sources of ignition.
- Keep containers closed until they are needed.
- Store drums on their side with the bungs at the 3 and 9 o’clock positions, or covered if they stand upright, so that rainwater cannot collect on top and be drawn in.
- Keep drums off the floor, on racks or pallets.
- Use the oldest stock first, and keep labels clean and readable.

**Dispensing**

- Use clean, dedicated containers, pumps and funnels for each product, and label them.
- Never mix products unless the supplier confirms they are compatible.
- Wipe drum tops and fill points before opening them.
- Filter oil into hydraulic systems when the equipment maker recommends it.

**Safety and the environment**

- Keep the safety data sheet for every product where it is stored and used.
- Wear suitable gloves and eye protection when handling lubricants.
- Keep spill kits to hand and clean up spills at once.
- Collect used oil separately and dispose of it through an authorised recycler.

> Tip: One mislabelled container can put the wrong oil into a machine. Label everything, including transfer cans.

### 9.5 Anti-spatter spray: cleaner welds and less grinding

*Aerosols · **[TBC: Publication date]** · 2 min read · By the Krini Crude team* · /blog/anti-spatter-spray-welding

**Summary:** Why weld spatter sticks, how an anti-spatter spray stops it, and why silicone-free matters when parts will be painted or powder coated.

Every MIG / MAG weld throws out small droplets of molten metal. Where they land on the workpiece, on fixtures or on the torch nozzle, they fuse on and have to be chipped or ground off: time, abrasives and sometimes damaged surfaces.

**How anti-spatter works**

An anti-spatter spray leaves a thin film on the surface. Spatter that lands on the film cannot fuse to the metal underneath, so it brushes or wipes off instead of being ground away. The same film protects jigs, fixtures and nozzles.

**Why silicone-free matters**

Silicone residues are hard to remove and can cause defects such as craters and poor adhesion in paint and powder coating. If welded parts are going to be painted or powder coated, choose a silicone-free anti-spatter spray. Krini Crude’s anti-spatter spray is silicone-free.

**How to use it**

- Shake the can well.
- Spray a light, even coat on the surfaces around the joint, on fixtures and on the nozzle, from the distance given on the can.
- Let the solvent flash off before you strike an arc.
- Reapply as the film wears off during long runs.

**Safety**

Aerosols are pressurised and usually flammable. Spray before welding, never onto hot work or near an arc. Work with good ventilation, and store cans away from heat and direct sun.

> Tip: A light coat is enough. More spray does not mean more protection, only more to clean off.

### 9.6 Private label lubricants: how manufacturing under your brand works

*Private label · **[TBC: Publication date]** · 2 min read · By the Krini Crude team* · /blog/private-label-lubricants-manufacturing

**Summary:** From brief to a packed product with your name on it: the steps, what to prepare, and the questions to ask a manufacturer.

Private label manufacturing lets a brand sell lubricants, construction chemicals or aerosols under its own name without building a factory. The manufacturer formulates, tests, blends and packs; the brand keeps the customer.

Krini Crude manufactures for well-recognised brands in the automotive aftermarket, construction, MRO and general industrial categories, and for independent marketing companies across the globe.

**How it works**

1. Brief and product selection: the applications, the markets and the standards the product must meet.
2. Formulation: an existing formulation from the manufacturer’s range, or one you specify, refined with their R&D team.
3. Testing: samples and batches checked against the agreed specification.
4. Manufacturing: blending and production at the manufacturer’s plant.
5. Packaging: filled and packed in your containers and livery.
6. Delivery and support: finished product delivered ready for market, with after-sales support.

**What to prepare**

- The applications and customers the product is for
- Any specifications or standards the product must meet
- Pack sizes, container types, and your artwork and labels
- Expected volumes and timelines
- The label information required where the product will be sold

**Questions to ask a manufacturer**

- Can you make it to our formulation, or develop one with us?
- How is each batch tested, and what records do we receive?
- Which pack sizes and containers can you fill?
- What are your minimum order quantities and lead times?
- Which quality certifications do you hold?
- What after-sales support do you provide?

> Tip: Agree the specification in writing before the first batch: it is the reference for every batch that follows.

---

## 10. Contact (/contact)

Kept short: four ways to reach the team, the form, where to find us.

- Contact
- **h1: Contact Krini Crude.**
- Tell us the products and quantities you need, or the product you want made under your brand.
- Call +91 8015343987 · WhatsApp: Chat with us · Email info@krinicrude.com · Visit: Anna Nagar East

### The enquiry form (Enquire Now)
- The same form as the pop-up on every other page (see "Enquire Now pop-up" above).
- Enquire buttons on this page scroll to it. Links from other pages (without JavaScript) arrive as e.g. /contact?type=Enquiry%3A%20Lubricants%20%26%20Greases&product=Hydraulic%20Oil#enquiry, and what they are about goes into the message.

### Visit us
- Office address: 95/20B, Gujji Main Road, Anna Nagar East, Chennai - 600102, Tamil Nadu, India · Directions
- Factory address: Ground Floor, 161A, Krini Crude, Chinakoladi Lakshmi Nagar, Tiruverkadu, Chennai, Tiruvallur - 600077, Tamil Nadu, India · Directions
- Hours: **[TBC: Office hours]**

---

## Footer (every page except Contact)
- Krini Crude · Quality Industrial Solutions
- Links: About Us · Our Products · Contact Us
- +91 8015343987 · info@krinicrude.com
- © 2026 Krini Crude. All rights reserved. · Back to top

## Structured data (JSON-LD)

Every page: Organization (name, address, office and factory, phone, email, contact point) and WebSite, plus:

- Home: WebPage, FAQPage (the questions buyers ask)
- About: AboutPage, BreadcrumbList, FAQPage
- Services: WebPage, BreadcrumbList, Service ×5, FAQPage
- Products: CollectionPage, BreadcrumbList, ItemList (the three lines), FAQPage
- Each product line: CollectionPage, BreadcrumbList, ItemList (its products), FAQPage
- Blog: CollectionPage, BreadcrumbList, Blog with a BlogPosting per article
- Each article: WebPage, BreadcrumbList, BlogPosting (datePublished is added once the date is set)
- How it’s made: WebPage, BreadcrumbList, FAQPage
- Contact: ContactPage, BreadcrumbList

Canonical addresses use https://www.krinicrude.com. Sitemap: https://www.krinicrude.com/sitemap.xml (all 16 pages). To add once supplied: the logo (a square PNG, 112 px or larger) and social profiles (sameAs) on the Organization.

## Placeholders to supply before launch

- **Office hours**: Contact page
- **Director’s name**: About page, from the Director's desk
- **Director’s message, 60 to 100 words**: About page, from the Director's desk
- **Director’s photograph, 4:5**: About page, from the Director's desk
- **ISO standard and certificate number**: About page, values; Services page, quality control
- **Technical data sheet**: Lubricants & Greases: Cutting Oil; Lubricants & Greases: Soluble Cutting Oil; Lubricants & Greases: Rust Preventive Oil; Lubricants & Greases: Hydraulic Oil; Lubricants & Greases: Gear Oil; Lubricants & Greases: Engine Oil; Construction Chemicals: Shuttering Oil; Construction Chemicals: Shuttering Grease; Construction Chemicals: Mold Release Oil; Construction Chemicals: Mold Release Grease; Aerosols: Lock Bond Adhesive Spray; Aerosols: Anti-Spatter Spray
- **Recommended mixing ratio**: Lubricants & Greases: Soluble Cutting Oil
- **Grease types and grades**: Lubricants & Greases: Greases
- **Can sizes**: Aerosols: Vibrant Colour Sprays
- **Applications and technical data**: Aerosols: Release Spray
- **Where our base oils come from**: How it’s made: 09 Blended to the formulation
- **Our blending process and equipment**: How it’s made: 09 Blended to the formulation
- **Tests run on each batch**: How it’s made: 10 Tested, filled and dispatched
- **Pack sizes**: How it’s made: 10 Tested, filled and dispatched
- **Publication date**: Article: Neat or soluble cutting oil? How to choose a metalworking fluid; Article: Hydraulic, gear and engine oil grades: what the numbers mean; Article: Shuttering oil and mold release: how to get a clean concrete finish; Article: Storing and handling industrial lubricants: a practical checklist; Article: Anti-spatter spray: cleaner welds and less grinding; Article: Private label lubricants: how manufacturing under your brand works
- **Logo** for search results (structured data) and **social profiles**: not on the live site
- **Enquiry endpoint**: where the form sends (NEXT_PUBLIC_ENQUIRY_ENDPOINT)
