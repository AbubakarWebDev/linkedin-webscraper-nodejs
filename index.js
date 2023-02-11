let puppeteer = require('puppeteer');
let cheerio = require('cheerio');
require('dotenv').config()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const EMAIL = process.env.username;
const PASSWORD = process.env.password;
const EMAIL_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const SUBMIT_SELECTOR = 'div.login__form_action_container > button';
const LINKEDIN_LOGIN_URL = 'https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin';

if (process.argv[2] !== undefined) {
    (() => {
        puppeteer.launch({ headless: false })
            .then(async (browser) => {
                let page = await browser.newPage()
                page.setViewport({ width: 1366, height: 768 });
                await page.goto(LINKEDIN_LOGIN_URL, { waitUntil: 'domcontentloaded' })
                await page.click(EMAIL_SELECTOR)
                await page.keyboard.type(EMAIL);
                await page.click(PASSWORD_SELECTOR);
                await page.keyboard.type(PASSWORD);
                await page.click(SUBMIT_SELECTOR);
                await sleep(20000);

                let data = [];

                for (let i = 1; i <= 10; i++) {
                    let url = `https://www.linkedin.com/search/results/people/?keywords=${process.argv[2]}&page=${i}`;

                    await page.goto(url, {
                        waitUntil: 'domcontentloaded',
                        timeout: 0,
                    });

                    const content = await page.content();
                    const $ = cheerio.load(content);
                    
                    $(".entity-result__content").each(function (i, elem) {
                        let title = $(this).find('.entity-result__title-text .app-aware-link span[aria-hidden="true"]').text().replace(/[\r\n]/gm, '').trim();

                        let url = $(this).find('.entity-result__title-text .app-aware-link').attr('href').split('?')[0];
                        
                        let subtitle = $(this).find('.entity-result__primary-subtitle').text().replace(/[\r\n]/gm, '').trim();

                        data.push({
                            name: title,
                            profile: url,
                            designation: subtitle,
                        });
                    });
                }

                console.log(data);
            })
            .catch((err) => {
                console.log(" CAUGHT WITH AN ERROR ", err);
            });
    })()
} else {
    console.log("Please Enter Keyoword For Search!");
}