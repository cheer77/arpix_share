# Arpix Share

Сайт українського beauty-бренду **ARPIKS** — nail матеріали + догляд.  
Pixel-perfect верстка за макетом Figma, viewport 1440px.

---

## Технологічний стек

| Категорія       | Технології                                 |
|-----------------|-------------------------------------------|
| **Збірка**      | [Vite 6](https://vitejs.dev/)             |
| **Стилі**       | SCSS (sass-embedded)                      |
| **Мова**        | Vanilla JS (ES Modules)                   |
| **Шрифти**      | Google Fonts — Manrope, Bad Script        |
| **Іконки**      | [Phosphor Icons](https://phosphoricons.com/) (CDN) |

---

## Швидкий старт

```bash
# Клонування
git clone <repo-url>
cd arpix_share

# Встановлення залежностей
npm install

# Запуск dev-сервера (http://localhost:3000)
npm run dev

# Збірка production
npm run build

# Превью production-збірки
npm run preview
```

---

## Структура проекту

```
arpix_share/
├── index.html                   # Головна сторінка (всі секції)
├── vite.config.js               # Конфіг Vite (SCSS, aliases, порт)
├── package.json
│
├── src/
│   ├── main.js                  # Entry point: імпорти SCSS + JS модулів
│   │
│   ├── scss/                    # Глобальні стилі
│   │   ├── main.scss            # Базові стилі, reset, utility-класи
│   │   └── abstracts/
│   │       ├── _variables.scss  # Design tokens (кольори, шрифти, spacing)
│   │       └── _mixins.scss     # Міксіни (breakpoints, container, buttons)
│   │
│   ├── components/              # Стилі + JS компонентів
│   │   ├── header/              # header.scss + header.js
│   │   ├── hero/                # hero.scss
│   │   ├── benefits/            # benefits.scss
│   │   ├── about/               # about.scss
│   │   ├── hits/                # hits.scss
│   │   ├── life/                # life.scss
│   │   ├── features/            # features.scss
│   │   ├── dealers/             # dealers.scss
│   │   ├── club/                # club.scss
│   │   ├── offer/               # offer.scss
│   │   └── footer/              # footer.scss
│   │
│   └── assets/
│       ├── fonts/               # Кастомні шрифти (поки порожня)
│       ├── icons/               # SVG іконки (logo.svg, dot-green.svg, ...)
│       └── images/              # PNG зображення (hero, products, banners)
│
└── dist/                        # Production build (після npm run build)
```

---

## Секції сторінки

| # | Секція       | CSS клас    | Опис                                                     |
|---|-------------|-------------|----------------------------------------------------------|
| 1 | Header      | `.header`   | Абсолютно позиціонована над Hero (`position: absolute`), прозорий фон |
| 2 | Hero        | `.hero`     | Контейнер 1420×722, відцентрований у `max-width: 1440px`. Продукт позиціонований `top: 8px; right: 72px;` |
| 3 | Benefits    | `.benefits` | 4 flex-картки з зображеннями 248px і описами              |
| 4 | About       | `.about`    | Заголовок, 2 колонки тексту (526+306px), банер 279px      |
| 5 | Hits        | `.hits`     | Хіти продукції — картки `.product-card` 318px             |
| 6 | Life        | `.life`     | Lifestyle фото-сітка з різними розмірами                  |
| 7 | Features    | `.features` | Продукт по центру, 6 feature-точок абсолютно              |
| 8 | Dealers     | `.dealers`  | Full-width: зображення — контент — зображення             |
| 9 | Club        | `.club`     | Ліва панель (teal, контент), права панель (банер)         |
| 10| Offer       | `.offer`    | Логотип ARPIKS + текст + CTA                             |
| 11| Footer      | `.footer`   | 5 колонок + нижній рядок (лого, політика, платежі, ©)    |

---

## Design Tokens

### Кольори

| Токен                  | Значення  | Призначення                |
|-----------------------|-----------|---------------------------|
| `$color-text`         | `#111822` | Основний текст             |
| `$color-text-secondary`| `#6b6b6b`| Вторинний текст            |
| `$color-accent`       | `#143c3d` | Dark-teal (Club панель, CTA)|
| `$color-white`        | `#ffffff` | Білий фон                  |
| `$color-black`        | `#1a1a1a` | Footer фон                 |
| `$color-border`       | `#e0e0e0` | Рамки елементів            |
| `$color-btn-shadow`   | `#2d4748` | Тінь кнопок                |

### Шрифти

| Змінна          | Шрифт                              | Використання              |
|-----------------|-------------------------------------|--------------------------|
| `$font-primary` | Manrope, sans-serif                 | Основний текст            |
| `$font-heading` | Trivia Grotesk X2, Inter, sans-serif| Заголовки (uppercase)     |
| `$font-accent`  | Bad Script, cursive                 | Акцентний текст           |

> ⚠️ **Trivia Grotesk X2** — потребує завантаження файлів `.woff2`/`.ttf` у `src/assets/fonts/` та підключення через `@font-face`. Поки працює fallback на Inter.

### Breakpoints

| Міксін          | Мінімальна ширина | Використання    |
|-----------------|-------------------|-----------------|
| `@include tablet`     | 768px      | Планшети        |
| `@include desktop`    | 1024px     | Десктоп         |
| `@include desktop-lg` | 1280px     | Великий десктоп |
| `@include desktop-xl` | 1440px     | Основний макет  |

### Контейнер

| Параметр              | Значення   |
|-----------------------|-----------|
| `$container-max`      | 1440px    |
| `$container-padding`  | 72px      |
| `$container-padding-tablet` | 40px |
| `$container-padding-mobile` | 20px |

### Border Radius

| Токен          | Значення |
|----------------|---------|
| `$radius-sm`   | 4px     |
| `$radius-md`   | 8px     |
| `$radius-12`   | 12px    |
| `$radius-15`   | 15px    |
| `$radius-25`   | 25px    |
| `$radius-80`   | 80px    |
| `$radius-200`  | 200px   |
| `$radius-full` | 9999px  |

---

## Utility-класи

```scss
// index.html — готові класи для кнопок
.btn-primary       // Заливка $color-accent, 80px radius, тінь
.btn-outline       // Прозора з рамкою
.btn-outline-dark   // Прозора з темною рамкою і стрілкою

// Container
.container          // Центрований з max-width і адаптивними padding

// Секція
.section            // Стандартний вертикальний padding секції
```

---

## Vite конфігурація

```js
// vite.config.js — ключові налаштування
{
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // Автоматичний @use abstracts у кожному SCSS файлі
        additionalData: '@use "src/scss/abstracts" as *;'
      }
    }
  },
  resolve: {
    alias: { '@': './src' }
  },
  server: { port: 3000 }
}
```

Завдяки `additionalData` всі variables та mixins доступні у кожному `.scss` файлі без ручного імпорту.

---

## Зображення

| Файл                | Секція    | Розмір    |
|---------------------|-----------|-----------|
| `hero-bg.png`       | Hero      | ~4.8 MB   |
| `hero-product.png`  | Hero      | ~2.9 MB   |
| `about-banner.png`  | About     | ~3.9 MB   |
| `benefit-1..4.png`  | Benefits  | ~0.4-0.9 MB |
| `product-1..4.png`  | Hits      | ~20-470 KB |
| `life-img1..6.png`  | Life      | ~70 KB-2.7 MB |
| `dealer-left.png`   | Dealers   | ~1.9 MB   |
| `dealer-right.png`  | Dealers   | ~2.9 MB   |
| `club-bg.png`       | Club      | ~2.1 MB   |
| `features-product.png`| Features| ~1.7 MB   |

---

## TODO

- [ ] Завантажити шрифт **Trivia Grotesk X2** (.woff2/.ttf) → `src/assets/fonts/`
- [ ] Підключити через `@font-face` у `main.scss`
- [ ] Додати SVG іконки: `visa.svg`, `applepay.svg`, `mastercard.svg`
- [ ] Додати SVG іконки соціальних мереж (Telegram, WhatsApp, YouTube, Instagram, Facebook)
- [ ] Оптимізувати зображення (конвертація в WebP, стиснення)
- [ ] Адаптивна верстка (mobile-first) для всіх секцій
- [ ] Фавікон
