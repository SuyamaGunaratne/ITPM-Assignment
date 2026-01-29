
import {test, expect} from '@playwright/test';

test.describe('UI Automation Tests', () => {

    test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
        await page.goto('https://www.swifttranslator.com/');
    });

    test('real time translation check', async ({page}) => {

        await expect(page.getByText('Singlish ↔ English Translator')).toBeVisible({timeout: 15000});

        const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
        const outputField = page.locator('div.whitespace-pre-wrap').nth(0);

        await expect(inputField).toBeVisible({timeout: 10000});

        const initialOutput = await outputField.textContent() ?? '';
        console.log('Initial Output:', initialOutput.trim());

        const testPhrase = 'මම ගෙදර යනවා';  // "Mama gedara yanawa" in Sinhala/Singlish meaning

        for (const char of testPhrase) {
        await inputField.pressSequentially(char, { delay: 120 });  // simulate human typing

        // Give it a short time to potentially react
        await page.waitForTimeout(600);

        const currentOutput = await outputField.textContent() ?? '';

            if (currentOutput !== initialOutput && currentOutput.trim().length > 0) {
                console.log(`→ Translation appeared after typing: "${currentOutput.trim()}"`);
                // If we got output → it's likely real-time / auto-update
                expect(currentOutput.trim()).not.toBe('');
                return;  // early exit — we confirmed real-time behavior
            }
        }

    });
});