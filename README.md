# 🦷 Nagpur Smile Care Clinic — Premium Dental Clinic Website

A modern, fully responsive dental clinic website template built with React, TypeScript, and Tailwind CSS. Designed as a showcase template for local dental clinics in India.

## 🌐 Live Demo
[View Live Site](https://ais-pre-lsfhg4ml75a77wgcn77jn4-249111359685.asia-east1.run.app)

## ✨ Features
- **WhatsApp Booking Form** — Patient fills name, selects service, doctor, date and time. Clicking Book opens WhatsApp with a pre-formatted message automatically
- **Animated UI** — Smooth transitions powered by Framer Motion
- **6 Dental Services** — Each with pricing, benefits, and quick-book button
- **2 Doctor Profiles** — With specialties, education, schedule, and languages
- **Patient Testimonials** — Star ratings with treatment details
- **FAQ Accordion** — Animated expand/collapse answers
- **Active Nav Highlighting** — Nav links highlight as you scroll
- **Announcement Bar** — Special offer banner at the top
- **Fully Responsive** — Works perfectly on mobile, tablet, and desktop
- **Professional Footer** — Clinic hours, address, Google Maps link

## 🛠️ Built With

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI Framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Vite** | Build tool |

## 📁 Project Structure
```
nagpur-dental-care/
├── public/
│   └── images/             # Clinic and doctor photos
├── src/
│   ├── App.tsx             # Main component with all sections
│   ├── data.ts             # All clinic content (easy to edit)
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles + Tailwind config
├── index.html
├── vite.config.ts
└── package.json
```

## 🚀 Run Locally
Prerequisites: Node.js 18+

```bash
# Clone the repo
git clone https://github.com/VaibhAv-K20/Nagpur-dental-care.git

# Navigate into project
cd Nagpur-dental-care

# Install dependencies
npm install

# Start dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Customizing for a Client
All clinic content lives in one file — `src/data.ts`. To adapt this template for any dental clinic just update:

```typescript
// 1. Contact details
export const CLINIC_CONTACT = {
  phone: "+91 XXXXXXXXXX",
  whatsapp: "+91XXXXXXXXXX",
  email: "hello@yourclinic.com",
  address: "Your clinic address here",
  ...
}

// 2. Doctor profiles
export const DOCTORS = [ ... ]

// 3. Services & pricing
export const SERVICES = [ ... ]

// 4. Patient testimonials
export const TESTIMONIALS = [ ... ]

// 5. FAQs
export const FAQS = [ ... ]
```
Then replace the images in `public/images/` with the client's actual photos.

Total customization time: ~30 minutes.

## 📦 Build for Production
```bash
npm run build
```
Output goes to the `dist/` folder — ready to upload to any hosting provider.

## 💡 Hosting Options

| Option | Cost | Best For |
| :--- | :--- | :--- |
| **GitHub Pages** | Free | Demo / Portfolio |
| **Netlify** | Free | Client delivery |
| **Vercel** | Free | Client delivery |
| **Hostinger** | ~₹99/month | Client who wants cPanel |

## 📸 Screenshots
Hero section, services grid, doctor profiles, WhatsApp booking form

*(Add screenshots here after deployment)*

## 👨‍💻 Developer
Built by **Vaibhav** — freelance web developer based in Nagpur, Maharashtra.

Open to building websites for local businesses. Reach out on [GitHub](https://github.com/VaibhAv-K20).

## 📄 License
This project is a showcase template. Feel free to use it as a base for client projects.
