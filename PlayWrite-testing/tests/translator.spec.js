// @ts-check
import { test, expect } from '@playwright/test';

test('Convert simple Singlish → Sinhala', async ({ page }) => {
    // 1. Open translator
    await page.goto('https://www.swifttranslator.com/');

    // 2. Type Singlish sentence
    await page.fill('textarea', 'oba kohomadha?');

    // 3. Wait a bit for translation to appear
    await page.waitForTimeout(1000); 

    // 4. Read output text
    const sinOutput = await page.textContent('.output-text');

    // 5. Validate Sinhala output contains expected text
    expect(sinOutput).toContain('ඔබ');
});

// test('Clear input field behavior', async ({ page }) => {
//     await page.goto('https://www.swifttranslator.com/');
//     await page.fill('textarea', 'ammaata suba dawasak');
//     await page.waitForTimeout(1000);

//     // Clear field
//     await page.fill('textarea', '');

//     // After clear, confirm output becomes empty
//     const sinOutput = await page.textContent('.output-text');
//     expect(sinOutput.trim()).toBe('');
// });


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
