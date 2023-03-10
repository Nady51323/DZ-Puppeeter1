let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 45000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 45000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 45000);
});

describe("Security page", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/security");
  });

  test("The title", async () => {
    const title3 = await page.title();
    expect(title3).toEqual("GitHub Security · GitHub");
  }, 45000);

  test("The first link attribute in security", async () => {
    const actuals = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actuals).toEqual("#start-of-content");
  }, 45000);

  test("The page contains Sign in button in security", async () => {
    const btnSelectors = "a.btn-mktg.mr-3.mb-3.mb-sm-0";
    await page.waitForSelector(btnSelectors, {
      visible: true,
    });
    const actuals = await page.$eval(btnSelectors, (link) => link.textContent);
    expect(actuals).toContain("Explore GitHub Advanced Security");
  }, 45000);
});
