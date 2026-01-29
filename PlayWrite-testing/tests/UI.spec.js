import {test, expect} from '@playwright/test';

// use to test real-time UI behavior (give the output without clicking any button)
test.describe('UI Automation Tests', () => {

    test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
        await page.goto('https://www.swifttranslator.com/');
    });

    //Real-time feel" test — detect change during / shortly after typing
    test('real time translation check - detects output change', async ({ page }) => {
    // Wait for visible title to confirm page is usable
    await expect(page.getByText('Singlish ↔ English Translator')).toBeVisible({
      timeout: 20000
    });

    // More reliable input locator (placeholder is case-sensitive in some browsers)
    const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');  // i = case-insensitive

    await expect(inputField).toBeVisible({ timeout: 15000 });
    await inputField.waitFor({ state: 'visible' });

    // Output: target the container, then look for meaningful child
    // This avoids empty direct textContent on wrapper div
    const outputContainer = page.locator('div.whitespace-pre-wrap').nth(0);
    await expect(outputContainer).toBeVisible({ timeout: 10000 });

    // Prefer child element that likely holds actual text
    const outputArea = outputContainer.locator('p, span, div:not(.whitespace-pre-wrap)').first();

    // Fallback: if no child matches, use container itself
    const effectiveOutput = (await outputArea.count() > 0) ? outputArea : outputContainer;

    // Capture initial state
    const before = (await effectiveOutput.textContent() || '').trim();
    console.log('Initial output:', before || '(empty)');

    // Type something reasonably long to trigger translation
    const testText = 'mama gedara yanawa mama gedara yanna one';
    await inputField.fill(testText);

    // Give debounce/network time before polling starts
    await page.waitForTimeout(2500);

    // Poll until output changes meaningfully
    await expect(async () => {
      const now = (await effectiveOutput.textContent() || '').trim();
      console.log('Polling output:', now.substring(0, 60) + (now.length > 60 ? '...' : ''));

      return now !== before && now.length > 8;
    }).toPass({
      timeout: 25000,       // total max wait
      intervals: [800],     // check every 800 ms
    });

    const finalText = (await effectiveOutput.textContent() || '').trim();
    console.log('Final output after change:', finalText);

    expect(finalText.length).toBeGreaterThan(10); // basic sanity
    // Optional: expect(finalText).toContain('ගෙදර');  // if you know part of expected Sinhala
  });

});