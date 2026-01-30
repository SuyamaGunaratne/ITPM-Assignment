// @ts-check

import { test, expect } from '@playwright/test';

test.describe('SwiftTranslator Automation Tests', () => {

    const tests = [

        { id: "Pos_Fun_0001", input: "api paasal yanavaa.", expected: "අපි පාසල් යනවා." },
        { id: "Pos_Fun_0002", input: "mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.", expected: "මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නෑ." },
        { id: "Pos_Fun_0003", input: "oyaa enavaanam mama balan innavaa.", expected: "ඔයා එනවානම් මම බලන් ඉන්නවා." },
        { id: "Pos_Fun_0004", input: "oyaata kohomadha?", expected: "ඔයාට කොහොමද?" },
        { id: "Pos_Fun_0005", input: "issarahata yanna.", expected: "ඉස්සරහට යන්න." },
        { id: "Pos_Fun_0006", input: "api heta enavaa.", expected: "අපි හෙට එනවා." },
        { id: "Pos_Fun_0007", input: "api heta ennee naehae.", expected: "අපි හෙට එන්නේ නැහැ." },
        { id: "Pos_Fun_0008", input: "suba udhaeesanak!", expected: "සුභ උදෑසනක්!" },
        { id: "Pos_Fun_0009", input: "karuNaakaralaa eka poddak balanna.", expected: "කරුණාකරලා එක පොඩ්ඩක් බලන්න." },
        { id: "Pos_Fun_0010", input: "mata nidhimathayi.", expected: "මට නිදිමතයි." },
        { id: "Pos_Fun_0011", input: "hariyata vaeda.", expected: "හරියට වැඩ." },
        { id: "Pos_Fun_0012", input: "mama iiyee gedhara giyaa.", expected: "මම ඊයේ ගෙදර ගියා." },
        { id: "Pos_Fun_0013", input: "mama heta enavaa.", expected: "මම හෙට එනවා." },
        { id: "Pos_Fun_0014", input: "oyaa enavadha?", expected: "ඔයා එනවද?" },
        { id: "Pos_Fun_0015", input: "api yamu.", expected: "අපි යමු." },
        { id: "Pos_Fun_0016", input: "Zoom meeting ekak thiyennee.", expected: "Zoom meeting එකක් තියෙන්නේ." },
        { id: "Pos_Fun_0017", input: "siiyaa Colombo yanna hadhannee.", expected: "සීයා Colombo යන්න හදන්නේ." },
        { id: "Pos_Fun_0018", input: "mata OTP eka SMS karanna.", expected: "මට OTP එක SMS කරන්න." },
        { id: "Pos_Fun_0019", input: "oyaata kohomadha?!", expected: "ඔයාට කොහොමද?!" },
        { id: "Pos_Fun_0020", input: "Rs. 1500 dhenna. 7.30 AM ta enna.", expected: "Rs. 1500 දෙන්න. 7.30 AM ට එන්න." },
        { id: "Pos_Fun_0021", input: "ela machan supiri!", expected: "එල මචන් සුපිරි!" },
        { id: "Pos_Fun_0022", input: "mama gedhara yanavaa.\noyaa enavadha?", expected: "මම ගෙදර යනවා.\nඔයා එනවද?" },
        { id: "Pos_Fun_0023", input: "mama gedhara yanavaa. mata bath oonee. api passe kathaa karamu.", expected: "මම ගෙදර යනවා. මට බත් ඕනේ. අපි පස්සේ කතා කරමු." },
        { id: "Pos_Fun_0024", input: "karuNaakara eeka dhenavadha?", expected: "කරුණාකර ඒක දෙනවද?" },

        // Negative functional test cases (Neg_Fun_xxxx)
        { id: "Neg_Fun_0001", input: "mamagedharayanawa", expected: "මමගෙදරයනවා" },               // garbled expected
        { id: "Neg_Fun_0002", input: "adoo vaedak baaragaththaanam eeka hariyata karapanko bQQ.", expected: "අඩෝ වැඩක් බාරගත්තානම් ඒක හරියට කරපන්කෝ බෝ." }, // likely incorrect
        { id: "Neg_Fun_0003", input: "mama   gedhara   yanavaa.", expected: "මම   ගෙදර   යනවා." },  // spaces may collapse
        { id: "Neg_Fun_0004", input: "tika tika.", expected: "ටික ටික." },                         // repetition may fail
        { id: "Neg_Fun_0005", input: "Rs.1500 oone.", expected: "Rs.1500 ඕනේ." },                   // format may break
        { id: "Neg_Fun_0006", input: "WhatsApp karanna.", expected: "WhatsApp කරන්න." },            // brand may be altered
        { id: "Neg_Fun_0007", input: "ela machan! supiri!!", expected: "එල මචන්! සුපිරි!!" },      // slang may be partially wrong
        { id: "Neg_Fun_0008", input: "mama gedhara yanavaa.   oyaa enavadha?", expected: "මම ගෙදර යනවා.   ඔයා එනවද?" }, // multiple spaces
        { id: "Neg_Fun_0009", input: "appatasiri, mata beheth bonna amathaka vunaa kiyahankoo.", expected: "අප්පටසිරි, මට බෙහෙත් බොන්න අමතක වුණා කියහන්කෝ." }, // slang issue
        { id: "Neg_Fun_0010", input: "mama gedhara yanawaa mama gedhara yanawaa mama gedhara yanawaa mama gedhara yanawaa mama gedhara yanawaa.", expected: "very long repeated text" } // possible truncation / lag

    ];

    test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
        await page.goto('https://www.swifttranslator.com/');
    });

    for (const scenario of tests) {
        test(`Functional Test ${scenario.input}`, async ({ page }) => {
          const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
          const outputField = page.locator('div.whitespace-pre-wrap').nth(0);
    
          // Steps for functional test cases [cite: 303-305]
          await inputField.fill(scenario.input);
          
          // Wait for the real-time conversion to update [cite: 304, 372]
          await page.waitForTimeout(2000); 
    
          const actualOutput = await outputField.innerText();
          // Log the actual output for debugging
          console.log(`Test ${scenario.id} | Input: ${scenario.input} | Expected: ${scenario.expected} | Actual: '${actualOutput.trim()}'`);
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
