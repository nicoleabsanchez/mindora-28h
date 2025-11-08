# 🚀 GitHub Pages Deployment Guide

## ✅ Setup Complete!

I've configured your project for GitHub Pages deployment. Here's what I did:

### Changes Made:

1. ✅ Updated `vite.config.ts` - Added base path for GitHub Pages
2. ✅ Updated `package.json` - Added deployment scripts
3. ✅ Installed `gh-pages` package

---

## 📝 Step-by-Step Deployment Instructions

### Step 1: Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit with beautiful garden SVGs"
```

### Step 2: Create GitHub Repository

1. Go to GitHub.com
2. Click the **+** icon → **New repository**
3. Name it: `mindora-28h` (must match the repo name in vite.config.ts)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click **Create repository**

### Step 3: Connect Your Local Repo to GitHub

```bash
git remote add origin https://github.com/nicoleabsanchez/mindora-28h.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:

- Build your app (`npm run build`)
- Create a `gh-pages` branch
- Deploy the `dist` folder to GitHub Pages

### Step 5: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 6: Wait & Visit Your Site

After 1-2 minutes, your site will be live at:

**https://nicoleabsanchez.github.io/mindora-28h/**

---

## 🔄 How to Update Your Deployed Site

Whenever you make changes:

```bash
# 1. Commit your changes
git add .
git commit -m "Your update message"
git push

# 2. Deploy to GitHub Pages
npm run deploy
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

---

## ⚠️ Important Notes

### If Your Repo Name is Different:

If your GitHub repository has a different name, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/your-actual-repo-name/", // Change this
  // ...
});
```

### If You Want a Custom Domain:

1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings in your domain provider

### Troubleshooting

**404 Error or Blank Page?**

- Check that `base` in `vite.config.ts` matches your repo name exactly
- Make sure GitHub Pages is enabled and using the `gh-pages` branch

**Images/Assets Not Loading?**

- All assets should use relative paths
- Vite automatically handles this with the `base` config

**Build Errors?**

- Run `npm run build` locally first to catch errors
- Check the console for specific error messages

---

## 📱 Testing Locally Before Deploy

To test how your site will look on GitHub Pages:

```bash
npm run build
npm run preview
```

This will serve your production build locally at `http://localhost:4173/mindora-28h/`

---

## 🎉 You're All Set!

Your beautiful garden app with SVG assets is ready to be deployed to GitHub Pages!

**Quick Deploy Checklist:**

- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages in repository settings
- [ ] Visit your live site!

Need help? Let me know! 🌿✨
