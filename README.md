# Date Invite - Invitație Interactivă

Proiect Next.js cu animații și interactivitate, optimizat pentru GitHub Pages.

## 🚀 Deploy pe GitHub Pages

### Opțiunea 1: Deploy Automat (Recomandat)

1. **Creează repo pe GitHub:**
   - Nume: `date-invite`
   - Public
   - NU adăuga README/gitignore

2. **Urcă codul:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/date-invite.git
   git push -u origin main
   ```

3. **Activează GitHub Pages:**
   - Settings → Pages
   - Source: **GitHub Actions**
   - Save

4. **Gata!** 
   - Link: `https://USERNAME.github.io/date-invite/`
   - Se actualizează automat la fiecare push

### Opțiunea 2: Deploy Manual

1. **Build local:**
   ```bash
   npm install
   npm run build
   ```

2. **Urcă doar folderul `out/`:**
   - Creează repo `date-invite` (Public)
   - Urcă tot ce e în `out/` în root-ul repo-ului
   - Settings → Pages → Deploy from branch → main → / (root)

## ⚙️ Configurare

**IMPORTANT:** Schimbă numele repo-ului în `next.config.mjs`:

```javascript
const repo = "date-invite"; // ← schimbă cu numele tău de repo
```

## ✅ Ce merge pe GitHub Pages

- ✔️ Toate animațiile CSS (@keyframes, Tailwind)
- ✔️ Animații React (useState, onClick)
- ✔️ Interactivitate client-side
- ✔️ Design complet identic cu Vercel

## ❌ Ce NU merge

- ❌ API routes (`/api`)
- ❌ Server actions
- ❌ Server-side rendering (SSR)

**Proiectul tău e 100% client-side → totul merge perfect!**

## 🧪 Test Local

```bash
npm run build
npx serve out
```

Deschide linkul → dacă merge local, merge și pe GitHub Pages.

## 📝 Note

- Folderul `out/` se generează automat la build
- `.nojekyll` e necesar pentru Next.js pe Pages
- GitHub Actions face deploy automat la fiecare commit
