# ✅ Checklist Deploy GitHub Pages

## Înainte de deploy

- [ ] Am schimbat `const repo = "date-invite"` în `next.config.mjs` cu numele meu de repo
- [ ] Am creat repo pe GitHub (Public)
- [ ] Am rulat `git init` și `git add .`
- [ ] Am făcut commit: `git commit -m "Initial commit"`
- [ ] Am adăugat remote: `git remote add origin https://github.com/USERNAME/REPO.git`
- [ ] Am făcut push: `git push -u origin main`

## Pe GitHub

- [ ] Am intrat în Settings → Pages
- [ ] Am selectat Source: **GitHub Actions** (NU "Deploy from branch")
- [ ] Am așteptat 2-3 minute
- [ ] Am verificat Actions → build-ul e verde ✅
- [ ] Am deschis linkul: `https://USERNAME.github.io/REPO/`

## Verificare finală

- [ ] Site-ul se încarcă
- [ ] Animațiile merg (sparkles, bow, confetti)
- [ ] Click pe organe funcționează
- [ ] Totul arată ca în v0/Vercel

## Dacă ceva nu merge

1. **Verifică Actions tab** → vezi eroarea exactă
2. **Verifică numele repo** în `next.config.mjs`
3. **Verifică Source** e "GitHub Actions" (nu branch)
4. **Așteaptă** → uneori durează 5 minute prima dată

## 🎉 Gata!

Linkul tău: `https://USERNAME.github.io/REPO/`

Trimite-l cui vrei! 💝
