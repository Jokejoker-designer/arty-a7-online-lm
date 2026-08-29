import { expect, test } from "@playwright/test";

test.describe("dễ hiểu landing", () => {
  test("teaches five jobs for one locked interaction", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("easy-landing")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Năm việc GlassBox thật sự làm" })).toBeVisible();
    await expect(page.getByTestId("job-create")).toBeVisible();
    await expect(page.getByTestId("job-train")).toBeVisible();
    await expect(page.getByTestId("job-answer")).toBeVisible();
    await expect(page.getByTestId("job-construct")).toBeVisible();
    await expect(page.getByTestId("job-mechanism")).toBeVisible();
    await expect(page.getByText("Board hiện tại dùng chip gì?")).toBeVisible();
    await expect(page.getByText("Arty A7 sử dụng FPGA Artix-7.")).toBeVisible();
    await expect(page.getByText("Nhận câu", { exact: true })).toBeVisible();
    await expect(page.getByText("Mã hóa", { exact: true })).toBeVisible();
    await expect(page.getByTestId("tab-overview")).toHaveCount(0);
    await expect(page.getByTestId("obs-shell")).toHaveCount(0);
    await expect(page.getByText("CORE_START")).toHaveCount(0);
  });

  test("shared chrome links Studio and Observatory at equal weight", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Ứng dụng" });
    await expect(nav.getByRole("link", { name: "Dễ hiểu" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Studio" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Đài quan sát" })).toBeVisible();
    await nav.getByRole("link", { name: "Studio" }).click();
    await expect(page).toHaveURL(/\/studio/);
    await expect(page.getByTestId("tab-overview")).toBeVisible({ timeout: 15_000 });
  });
});
