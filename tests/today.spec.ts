import { expect, test } from "@playwright/test";
import { loginCopy } from "../common/login";
test.use({ headless: false });

// ==============================
// Exercice 1 – Login + URL check
// ==============================
test("Login to SauceDemo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await loginCopy(page, "standard_user", "secret_sauce");

  await expect(page).toHaveURL(/.*inventory.html/);
});

// ====================================
// Exercice 2 – Add product to cart check
// ====================================
test("Add product to cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await loginCopy(page, "standard_user", "secret_sauce");

  // Ajouter le premier produit
  await page.locator("#add-to-cart-sauce-labs-backpack").click();

  // Cliquer sur le panier
  await page.locator(".shopping_cart_link").click();

  // Vérifier que le produit est visible dans le panier
  await expect(page.locator(".inventory_item_name")).toHaveText(/.+/);
});

// ============================
// Exercice 3 – Popup / Alert
// ============================
test("Handle JS alert", async ({ page }) => {
  await page.goto(
    "https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_alert"
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

// ============================
// Exercice 4 – Mobile vs Desktop
// ============================
test("Mobile vs Desktop UI check", async ({ page, browserName }) => {
  // Desktop
  await page.goto("https://www.saucedemo.com/");
  await expect(page.locator("#login-button")).toBeVisible();

  // Mobile viewport
  await page.setViewportSize({ width: 390, height: 812 });
  await expect(page.locator("#login-button")).toBeVisible(); // login bouton visible en mobile aussi
});
