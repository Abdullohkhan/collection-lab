# Collection Lab

**O'zbekcha** | [English](#english) | [Русский](#русский)

Statik veb-saytlar to'plami (monorepo). Har bir sayt `sites/` ichida **mustaqil** papka: o'z `vendor/` (CDN yo'q), rasmlari, tarjimalari bor, shuning uchun bittasini alohida yuklab olish yoki ochish mumkin.

| Sayt | Papka | Texnologiya |
|---|---|---|
| OJJO: zargarlik | `sites/ojjo` | HTML, CSS, JS, Bootstrap 5.3.8 |
| Frap: santexnika | `sites/frap` | HTML, CSS, JS |
| BR Architects | `sites/br-architects` | HTML, CSS, JS |
| Creative Studio | `sites/creative-studio` | HTML, Tailwind CSS 4.3.3, JS |

**Imkoniyatlar:** 3 til (o'zbek: standart, ingliz, rus), dark/light rejim (tizim sozlamasidan boshlanadi, tanlov `localStorage`da saqlanadi), responsive (telefon, planshet, desktop), lokal kutubxonalar (internetsiz ishlaydi), demo aloqa ma'lumotlari.

## Bitta saytni yuklab olish
- Jonli sahifadan: bosh sahifadagi **ZIP yuklab olish** tugmasi (`downloads/<nom>.zip`).
- Git bilan: `git clone --depth 1 --filter=blob:none --sparse https://github.com/Abdullohkhan/collection-lab` so'ng `git sparse-checkout set sites/ojjo`.
- Yoki GitHub'da papkani ochib, kerakli fayllarni yuklab oling.

## Mahalliy ishga tushirish
```bash
python3 -m http.server 8000   # so'ng http://localhost:8000
```
Umumiy fayllar (`_shared/core.js|css`, `_shared/vendor/`) o'zgarsa: `python3 _shared/sync.py` har bir saytga nusxalaydi.

## GitHub Pages
Sozlamalar → Pages → **Source: GitHub Actions**. `main`ga push qilinganda `.github/workflows/pages.yml` saytni va ZIP'larni joylaydi: `https://abdullohkhan.github.io/collection-lab/`. Repo **public** bo'lsa bepul ishlaydi (private repo uchun bepul planda Pages yo'q).

## English
A monorepo of static websites. Each site under `sites/` is a **standalone** folder with its own `vendor/` (no CDN), images and translations, so you can open or download any one of them alone.

**Features:** 3 languages (Uzbek default, English, Russian), dark/light mode (starts from the system preference, saved in `localStorage`), responsive layouts, local libraries (works offline), fictional demo contact details.

**Download a single site:** use the **Download ZIP** button on the live home page (`downloads/<name>.zip`), or `git clone --depth 1 --filter=blob:none --sparse <repo>` then `git sparse-checkout set sites/ojjo`.

**Run locally:** `python3 -m http.server 8000`. After editing `_shared/`, run `python3 _shared/sync.py` to copy it into every site.

**GitHub Pages:** Settings → Pages → **Source: GitHub Actions**. Pushing to `main` deploys the site and the ZIPs via `.github/workflows/pages.yml`. Free for public repos only.

## Русский
Монорепозиторий статических сайтов. Каждый сайт в `sites/` — **самостоятельная** папка со своим `vendor/` (без CDN), картинками и переводами, поэтому любой можно открыть или скачать отдельно.

**Возможности:** 3 языка (узбекский по умолчанию, английский, русский), тёмная/светлая тема (по системной настройке, выбор хранится в `localStorage`), адаптивная вёрстка, локальные библиотеки (работает офлайн), вымышленные демо-контакты.

**Скачать один сайт:** кнопка **Скачать ZIP** на главной странице (`downloads/<имя>.zip`) или `git clone --depth 1 --filter=blob:none --sparse <repo>`, затем `git sparse-checkout set sites/ojjo`.

**Локальный запуск:** `python3 -m http.server 8000`. После правок `_shared/` выполните `python3 _shared/sync.py`, чтобы скопировать их во все сайты.

**GitHub Pages:** Settings → Pages → **Source: GitHub Actions**. Push в `main` публикует сайт и ZIP-архивы через `.github/workflows/pages.yml`. Бесплатно только для публичных репозиториев.

---
Developed by [t.me/Abdulloh_77700](https://t.me/Abdulloh_77700)
