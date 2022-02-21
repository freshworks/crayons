import 'babel-polyfill';
import puppeteer from 'puppeteer';
import { setupJestScreenshot } from 'jest-screenshot';

setupJestScreenshot({
    colorThreshold: 0,
});

beforeAll(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        global.browser = browser;
    } catch (err) {
        console.error('Unable to start puppeteer.', err);
    }
});

afterAll(() => {
    global.browser.close();
});

beforeEach(async () => {
    const page = await browser.newPage();
    global.page = page;
});

jest.setTimeout(60000);
