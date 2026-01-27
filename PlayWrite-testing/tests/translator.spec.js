// @ts-check

import { test, expect } from '@playwright/test';

test.describe('SwiftTranslator Automation Tests', () => {

    test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
        await page.goto('https://www.swifttranslator.com/');
    });

    test('Test 0001', async ({ page }) => {
    // Assertions use the expect API.
        await expect(page).toHaveURL('https://www.swifttranslator.com/');
        
        const input = "ammaa";
        const expectedOutput = "අම්මා";

        const inputfield = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
        const outputfield = page.locator('div.whitespace-pre-wrap').nth(0);

        await inputfield.click();
        await inputfield.pressSequentially(input, { delay: 100 });

        await page.waitForTimeout(2000); // wait for translation to complete

        const actualOutput = await outputfield.innerText();
        expect(actualOutput).toBe(expectedOutput);
    });

    test('Test 0002', async ({ page }) => {

        await expect(page).toHaveURL('https://www.swifttranslator.com/');

        const input = "kathaa karanna";
        const expectedOutput = "කතා කරන්න";

        const inputfield = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
        const outputfield = page.locator('div.whitespace-pre-wrap').nth(0);

        await inputfield.click();
        await inputfield.pressSequentially(input, { delay: 100 });

        await page.waitForTimeout(2000); // wait for translation to complete

        const actualOutput = await outputfield.innerText();
        expect(actualOutput).toBe(expectedOutput);

    });


    test('Test 0003', async ({ page }) => {
    });


});
