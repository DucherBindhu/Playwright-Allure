import { Page } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.locator("#user-name").fill(username);
  await page.locator("#password").fill(password);
  await page.locator("#login-button").click();
}

export async function loginCopy(
  page: Page,
  username: string,
  password: string
) {
  await page.locator("#user-name").fill(username);
  await page.locator("#password").fill(password);
  await page.locator("#login-button").click();
}
