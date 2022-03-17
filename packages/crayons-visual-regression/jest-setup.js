/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
import 'babel-polyfill';
import { setupJestScreenshot } from 'jest-screenshot';
jest.retryTimes(2);
setupJestScreenshot({
    colorThreshold: 0,
    pixelThresholdAbsolute: 1,
});

const puppeteer_minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--single-process',
  '--password-store=basic',
  '--use-mock-keychain',
];

beforeAll(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      pipe: true,
      userDataDir: './puppeteer.data.store',
      args: puppeteer_minimal_args,
    });
    global.browser = browser;
    const page = await browser.newPage();
    global.page = page;
  } catch (err) {
    console.error('Unable to start puppeteer.', err);
  }
});

afterAll(() => {
  if (global.browser) global.browser.close();
});

beforeEach(async () => {
  jest.resetModules();
});

jest.setTimeout(160000);
