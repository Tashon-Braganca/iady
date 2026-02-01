# Cozy Distance: Valentine's Website for Adyasha

This project is a deeply personal, interactive Valentine's Day website built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 How to Run Locally

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Set Password:**
    Create a `.env.local` file in the root directory:
    ```env
    SITE_PASSWORD="i love you"
    ```
3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
4.  **Open in Browser:**
    Go to `http://localhost:3000`.

## 📦 Deployment (Vercel)

1.  **Push to GitHub:**
    Initialize a repo and push this code.
2.  **Import to Vercel:**
    - Go to Vercel Dashboard -> Add New -> Project.
    - Import your GitHub repository.
3.  **Environment Variables:**
    - In Vercel Project Settings -> Environment Variables, add:
      - `SITE_PASSWORD` = `i love you`
4.  **Deploy:**
    Click **Deploy**.

## 🎨 Customization (IMPORTANT)

All content is managed in **`content/siteData.ts`**. Open this file to edit:

- **Texts:** Change "Adyasha", "My First Hope", love letters, timeline dates.
- **Levels:** Add/remove levels, change icons, descriptions, and modal content.
- **Images:** Replace placeholder URLs with your real photos (e.g., `/photos/us1.jpg`).
- **Music:** Place your `theme.mp3` file in `public/audio/`.

### Folder Structure for Assets

- **Photos:** Put your images in `public/photos/`.
- **Videos:** Put videos in `public/videos/`.
- **Audio:** Put `theme.mp3` in `public/audio/`.
- **Finale:** Put `aot.jpg` in `public/final/`.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Confetti:** canvas-confetti
