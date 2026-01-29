// @ts-check

import { test, expect } from '@playwright/test';



test.describe('SwiftTranslator Automation Tests', () => {

    const tests = [
        { input: "ammaa", expected: "අම්මා" },
        { input: "kathaa karanna", expected: "කතා කරන්න" },
        { input: "magee nama nimal", expected: "මගේ නම නිමල්" },
        { input: "oyaa kohomadha?", expected: "ඔයා කොහොමද?" },
        { input: "api gedhara yanawaa", expected: "අපි ගෙදර යනwආ" },
        { input: "mama Sinhala kathaa karanawa", expected: "මම Sinhala කතා කරනwඅ" },
    ];

    test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
        await page.goto('https://www.swifttranslator.com/');
    });

    for (const scenario of tests) {
        test(`Functional Test ${scenario.input}`, async ({ page }) => {
          const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
          const outputField = page.locator('.whitespace-pre-wrap').nth(0);
    
          // Steps for functional test cases [cite: 303-305]
          await inputField.fill(scenario.input);
          
          // Wait for the real-time conversion to update [cite: 304, 372]
          await page.waitForTimeout(2000); 
    
          const actualOutput = await outputField.innerText();
          // Log the actual output for debugging
          //console.log(`Test ${scenario.id} | Input: ${scenario.input} | Expected: ${scenario.expected} | Actual: '${actualOutput.trim()}'`);
          // Assert that the generated output matches your expected output
          expect(actualOutput.trim()).toBe(scenario.expected);
        });
    }

        // test('Test 0001', async ({ page }) => {
    // // Assertions use the expect API.
    //     await expect(page).toHaveURL('https://www.swifttranslator.com/');
        
    //     const input = "ammaa";
    //     const expectedOutput = "අම්මා";

    //     const inputfield = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    //     const outputfield = page.locator('div.whitespace-pre-wrap').nth(0);

    //     await inputfield.click();
    //     await inputfield.pressSequentially(input, { delay: 100 });

    //     await page.waitForTimeout(2000); // wait for translation to complete

    //     const actualOutput = await outputfield.innerText();
    //     expect(actualOutput).toBe(expectedOutput);
    // });

});
