import { test, expect, devices } from "@playwright/test";

// Mobile context
test.use({ viewport: { width: 390, height: 812 } }); // iPhone 13 size approx

test("Test 1: Login to SauceDemo add to cart ", async ({ page }) => {
  //Question 1 – Login et vérification URL

  await page.goto("https://www.saucedemo.com/");

  await page.locator("#user-name").fill("standard_user");
  // await page.locator("#user-name").fill('standa')
  await page.locator("#password").fill("secret_sauce");

  //await page.locator('#login-button').click();
  await page.getByRole("button", { name: "login" }).click();
  //toHave url
  await expect(page).toHaveURL(/.*inventory/);

  //Question 2 – Ajouter le premier produit au panier
  //add to cart
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  await page.locator(".shopping_cart_link").click();

  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );
});
test("Test 3: Gestion mobile vs desktop", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  //Question 3 – Gestion mobile vs desktop
  // Login first
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // Verify mobile menu (burger menu) is visible
  await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
});
test("Test 4: Vérification d’une alerte / popup", async ({ page }) => {
  //Question 4 – Vérification d’une alerte / popup
  await page.goto(
    "https://www.w3schools.com/js/tryit.asp?filename=tryjs_alert"
  );

  const acceptBtn = page.locator(".fast-cmp-button-primary"); // id du bouton cookies
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
  }
  // Passer dans le frame où le bouton est situé
  const frame = page.frame({ name: "iframeResult" });
  // Intercepter la dialogue d'alerte
  page.on("dialog", async (dialog) => {
    // Vérifier le texte de l'alerte
    expect(dialog.message()).toBe("Hello! I am an alert box!");
    // Accepter l'alerte
    await dialog.accept();
  });
});
