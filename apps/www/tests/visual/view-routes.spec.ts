import { expect, test } from '@playwright/test';

const targets = [
  'button',
  'dialog',
  'dropdown-menu',
  'voice-assistant-01',
  'workspace-quick-actions-01',
] as const;

for (const name of targets) {
  test(`view route visual: ${name}`, async ({ page }) => {
    await page.goto(`/view/${name}`);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
      const style = document.createElement('style');
      style.innerHTML =
        '* { animation: none !important; transition: none !important; }';
      document.head.append(style);
    });
    await expect(page).toHaveScreenshot(`view-${name}.png`, {
      maxDiffPixelRatio: 0.01,
      fullPage: true,
    });
  });
}
