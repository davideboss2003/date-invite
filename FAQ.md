# ❓ Întrebări Frecvente

## Merg toate animațiile?

**DA! 100%** ✅

Toate animațiile rămân EXACT la fel:
- ✔️ Sparkles, confetti, bow
- ✔️ Fade in/out
- ✔️ Hover effects
- ✔️ Click pe organe
- ✔️ Flip cards
- ✔️ Toate animațiile CSS și React

**De ce?** Pentru că:
- Toate animațiile sunt client-side (CSS + JavaScript)
- GitHub Pages servește HTML/CSS/JS normal
- Browser-ul nu știe diferența între Vercel și Pages

## Rămâne la fel ca în v0?

**DA!** Design-ul, culorile, spacing-ul, totul identic.

Singura diferență:
- URL-ul: `https://USERNAME.github.io/date-invite/` (în loc de vercel.app)

## Ce NU merge pe GitHub Pages?

Doar lucruri server-side:
- ❌ API routes (`/api/...`)
- ❌ Server actions
- ❌ Server-side rendering (SSR)
- ❌ Database connections

**Proiectul tău NU folosește nimic din astea** → totul merge! ✅

## Cum știu sigur că merge?

Test local:

```bash
npm run build
npx serve out
```

Dacă merge local → merge și pe GitHub Pages (garantat).

## GitHub Pages vs Vercel?

| Feature | GitHub Pages | Vercel |
|---------|--------------|--------|
| Animații | ✅ | ✅ |
| Design | ✅ | ✅ |
| Gratis | ✅ | ✅ |
| Setup | 5 min | 2 min |
| Custom domain | ✅ | ✅ |
| Server-side | ❌ | ✅ |

**Pentru invitația ta:** ambele sunt perfecte!

## Pot schimba repo-ul după?

DA! Pași:

1. Schimbă în `next.config.mjs`:
   ```javascript
   const repo = "nume-nou";
   ```

2. Commit + push:
   ```bash
   git add .
   git commit -m "Update repo name"
   git push
   ```

3. Așteaptă rebuild (automat)

## Cum actualizez site-ul?

Super simplu:

1. Faci modificări în cod
2. `git add .`
3. `git commit -m "Update"`
4. `git push`
5. Așteaptă 2-3 minute → site actualizat automat!

## Pot avea domeniu custom?

DA! (ex: `invitatie.ro`)

1. Cumperi domeniu
2. Settings → Pages → Custom domain
3. Adaugi CNAME record la provider-ul de domeniu
4. Gata!

## Costă ceva?

**ZERO lei!** 💰

- GitHub Pages: gratis
- GitHub Actions: gratis (2000 minute/lună)
- Hosting: gratis
- SSL (HTTPS): gratis

## Cât durează deploy-ul?

- Prima dată: 3-5 minute
- Următoarele: 2-3 minute
- Vercel: 1-2 minute (mai rapid, dar ambele ok)

## Pot vedea cine intră pe site?

GitHub Pages nu are analytics built-in, dar poți adăuga:
- Google Analytics (gratis)
- Vercel Analytics (gratis pe Vercel)
- Plausible, Fathom, etc.

## Ce fac dacă nu merge?

1. **Verifică Actions tab** pe GitHub → vezi eroarea
2. **Verifică `next.config.mjs`** → numele repo corect?
3. **Verifică Pages settings** → Source = "GitHub Actions"?
4. **Așteaptă 5 minute** → uneori durează
5. **Întreabă pe chat** → îți ajut!

## Alternativa simplă?

Dacă GitHub Pages pare complicat:

**Vercel** (2 pași):
1. vercel.com → Import repo
2. Deploy → Gata!

Ambele sunt ok, Vercel e mai rapid de configurat.
