import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async getFormattedTextFromUrl(url: string): Promise<string> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const content = await page.evaluate(() => {
      function extractText(node: Node): string {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          return text ? text + '\n' : '';
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          const style = window.getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') return '';

          let text = '';
          for (const child of node.childNodes) {
            text += extractText(child);
          }

          const blockTags = ['P', 'DIV', 'SECTION', 'ARTICLE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'];
          if (blockTags.includes(element.tagName)) {
            text += '\n';
          }

          return text;
        }

        return '';
      }

      return extractText(document.body).replace(/\n{2,}/g, '\n').trim();
    });

    await browser.close();
    return content;
  }
}