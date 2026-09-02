# NailCocktales Hand and Foot Spa - Web Application

A booking & landing page web application for **NailCocktales Hand and Foot Spa**, featuring a glassmorphic design system matching the brand aesthetic (serene teal, warm mocha brown, and luxury calligraphy accents).

---

## 🌟 Features

- **Customer Landing Page**:
  - Full services & price list menu with category filters and default spa photos.
  - Interactive booking modal (no customer account/login required).
  - Generates unique reference code (e.g. `NC-892410`).
  - Track booking lookup & 1-click self-service cancellation with reason.
  - Configurable contact info and social media icons (Facebook, Instagram, TikTok, WhatsApp).
- **Owner & Admin Management Portal (`#/admin`)**:
  - Google Account sign-in & staff email login.
  - Interactive appointment calendar (Month, Day, Agenda views).
  - Automated alerts for appointments 1 day before (24h) and 4 hours before.
  - Real-time customer cancellation notices with reason.
  - Services catalog CRUD with custom photo upload / URL support.
  - Salon settings and social media manager.
  - Shareable public customer landing page link.

---

## 🚀 How to Publish as a Separate Web App in Google AI Studio

1. Open [Google AI Studio](https://aistudio.google.com/) in your browser.
2. Navigate to **Build mode** (or click **+ New App**).
3. Set the **App Name** to: `NailCocktales` *(keep it separate from Moonrace Studios)*.
4. Click **Publish** in the top-right corner.
5. Select **Google Cloud Run Starter Tier** or enter your custom subdomain (e.g. `nailcocktales.ai.studio`).
6. Click **Confirm** to generate your live public URL!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Build for production
npm run build
```
