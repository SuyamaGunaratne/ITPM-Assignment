const { test, expect } = require('@playwright/test');

test.describe('SwiftTranslator Automation Tests', () => {

    test.beforeEach(async ({ page }) => {
        // We increase the timeout and wait until the page is fully loaded
        await page.goto('https://www.swifttranslator.com/', { 
            waitUntil: 'domcontentloaded', 
            timeout: 60000 
        });
    });

    test('Pos_Fun_0004: Convert a simple sentence', async ({ page }) => {
        // Use a more generic locator: find a textarea that is visible
        const inputArea = page.locator('textarea#input_area');
        const outputArea = page.locator('textarea#output_area');

        // Verify the element exists before interacting
        await expect(inputArea).toBeVisible({ timeout: 15000 });
        
        // Type the text
        await inputArea.fill('api paasal yanavaa.');

        // The site converts as you type, so we wait briefly for the output
        await page.waitForTimeout(1000); 

        // Get the value and check it
        const result = await outputArea.inputValue();
        expect(result).toBe('අපි පාසල් යනවා.');
    });

    test('Pos_UI_0002: Output area should clear when input is deleted', async ({ page }) => {
        const inputArea = page.locator('textarea#input_area');
        const outputArea = page.locator('textarea#output_area');

        await inputArea.fill('test');
        await page.waitForTimeout(500);
        await inputArea.fill('');
        await page.waitForTimeout(500);
        
        await expect(outputArea).toHaveValue('');
    });
});

