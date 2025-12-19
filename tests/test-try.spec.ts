import { test, expect } from "@playwright/test";
const url = "https://www.saucedemo.com/";
test.use({ headless: false });
test.describe("test one ", () => {
  test.use({
    viewport: { width: 390, height: 812 },
  });
});
test("Gestion mobile vs desktop", async ({ page }) => {
  await page.locator("#react-burger-menu-btn").isVisible();
});

test("Login to SauceDemo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator("#user-name").fill("standard_user");
  // await page.locator("#user-name").fill('standa')
  await page.locator("#password").fill("secret_sauce");

  //await page.locator('#login-button').click();
  await page.getByRole("button", { name: "login" }).click();
  //toHave url
  await expect(page).toHaveURL(/.*inventory/);
  //add to cart
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  await page.locator(".shopping_cart_link").click();

  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );
});
