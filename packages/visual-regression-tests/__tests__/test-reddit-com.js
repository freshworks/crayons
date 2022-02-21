describe("reddit.com", () => {
    async function dismissWelcomeNotice() {
        const button = await page.$("body > div.content > section > a.listingsignupbar__close");
        if (!button) { return; }
        await button.click();
        await page.waitFor(200);
    }

    describe("/new", () => {
        it("looks as expected", async () => {
            await page.goto("https://www.reddit.com/new/");
            await dismissWelcomeNotice();
            expect(await page.screenshot()).toMatchImageSnapshot();
        });
    });

    describe("/aww", () => {
        it("looks the same", async () => {
            await page.goto("https://www.reddit.com/r/aww/new/");
            await dismissWelcomeNotice();
            page.setViewport({ width: 1920, height: 1080 });
            expect(await page.screenshot()).toMatchImageSnapshot();
            await page.click("#header-bottom-left > ul > li.selected > a");
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            expect(await page.screenshot()).toMatchImageSnapshot();
        });
    });

    describe("/all", () => {
        it("looks the same", async () => {
            await page.goto("https://www.reddit.com/r/all/new/");
            await dismissWelcomeNotice();
            page.setViewport({ width: 1280, height: 720 });
            expect(await page.screenshot()).toMatchImageSnapshot({ path: `${__dirname}/../reddit-all.png` });
        });
    });
});
