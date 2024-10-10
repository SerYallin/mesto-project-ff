import puppeteer from "puppeteer";
import { resolve } from "node:path"

const APP = "../index.html";

let page;
let browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    defaultViewport: null,
    args:[
      '--start-maximized' // you can also use '--start-fullscreen'
    ]
  });
  page = await browser.newPage();
  await page.goto("file://" + resolve(__dirname, APP));
});

describe("Loading list", () => {
  test("Is correct loading", async () => {
    console.log(page.window);
    await page.waitForSelector('.card');
    const cards = await page.$$('.card');
    expect(cards.length).toBe(
      6
    );
  });

  test("Remove card", async () => {
    await page.waitForSelector('.card');
    const card = await page.$$('.card__delete-button');
    await card[0].click();
    const cards = await page.$$('.card');
    expect(cards.length).toBe(
      5
    );
  });
});

afterAll(() => {
  browser.close();
});

