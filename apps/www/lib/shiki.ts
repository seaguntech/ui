import { codeToHtml } from 'shiki';

export async function highlightCode(code: string, lang = 'tsx') {
  return await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });
}
