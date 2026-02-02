# 🚀 Cum pui site-ul pe GitHub Pages

## Pași Simpli (5 minute)

### 1️⃣ Schimbă numele repo-ului

Deschide `next.config.mjs` și schimbă:

```javascript
const repo = "date-invite"; // ← pune numele tău de repo aici
```

**Exemplu:** Dacă repo-ul tău se numește `invitatie-ana`, scrie:
```javascript
const repo = "invitatie-ana";
```

### 2️⃣ Creează repo pe GitHub

- Intră pe github.com
- New repository
- Nume: `date-invite` (sau ce nume vrei)
- **Public** ✅
- NU bifa "Add README"
- Create repository

### 3️⃣ Urcă codul

În terminal (în folderul proiectului):

```bash
git init
git add .
git commit -m "Invitație gata"
git branch -M main
git remote add origin https://github.com/USERNAME/date-invite.git
git push -u origin main
```

**Înlocuiește:**
- `USERNAME` cu username-ul tău GitHub
- `date-invite` cu numele repo-ului tău

### 4️⃣ Activează GitHub Pages

Pe GitHub, în repo-ul tău:

1. Settings (sus dreapta)
2. Pages (meniu stânga)
3. Source: **GitHub Actions** (nu "Deploy from branch")
4. Save

### 5️⃣ Așteaptă 2-3 minute

- Actions (tab sus) → vezi build-ul
- Când e verde ✅ → gata!
- Link: `https://USERNAME.github.io/date-invite/`

---

## 🧪 Test înainte să urci

Vrei să vezi cum arată înainte?

```bash
npm install
npm run build
npx serve out
```

Deschide linkul → dacă merge aici, merge și pe GitHub Pages.

---

## ❓ Probleme?

### "Page not found" după deploy
- Verifică că ai pus numele corect în `next.config.mjs`
- Verifică că Source e "GitHub Actions" (nu "branch")

### Animațiile nu merg
- Nu se întâmplă! Toate animațiile sunt CSS/React → merg 100%

### Vreau alt nume de repo
1. Schimbă în `next.config.mjs`: `const repo = "nume-nou"`
2. Commit + push
3. Așteaptă rebuild (automat)

---

## 🔥 Alternativă: Vercel (mai simplu)

Dacă GitHub Pages e complicat:

1. Intră pe vercel.com
2. Import Git Repository
3. Selectează repo-ul
4. Deploy
5. Gata! Link instant.

**Avantaj:** Nu trebuie să configurezi nimic, merge direct.
