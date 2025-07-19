# scrapper

> 🧠 A NestJS module and standalone utility to extract visible, formatted text (without HTML) from web pages using Puppeteer.

## ✨ Features

- Extracts **visible** text (ignores hidden content).
- Preserves structure (`<h1>`, `<p>`, etc.) with newlines.
- Works as a **NestJS module** OR a **standalone Node.js function**.
- Can be used inside **n8n custom function**.

## 🚀 Installation

```bash
npm i @solunertech/scrapper
```

## 📦 Usage in NestJS

```ts
import { ScraperModule } from 'scrapper';

@Module({
  imports: [ScraperModule],
})
export class AppModule {}
```

```ts
import { ScraperService } from 'scrapper';

constructor(private readonly scraper: ScraperService) {}

const text = await this.scraper.getFormattedTextFromUrl('https://example.com');
```

## 🔧 Usage in Node.js / n8n

```ts
const { getFormattedTextFromUrl } = require('scrapper');

(async () => {
  const text = await getFormattedTextFromUrl('https://example.com');
  console.log(text);
})();
```

## 🧑‍💻 License

MIT