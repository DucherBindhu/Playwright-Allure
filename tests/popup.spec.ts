import { test, expect } from "@playwright/test";
test.use({ headless: false });

test("Vérification d’une alerte1 / popup", async ({ page }) => {
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
