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
    await expect(page.getByText("Suy luận")).toHaveCount(0);
    await expect(page.getByText("Hội thoại với Native AI")).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute("data-density", "research");
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

  test("studio strip owns process; comfortable writes data-density", async ({ page }) => {
    await page.goto("/studio");
    await expect(page.getByTestId("tab-overview")).toBeVisible({ timeout: 15_000 });

    const strip = page.getByRole("navigation", { name: "Tiến trình xử lý của một tương tác" });
    await expect(strip.getByText("Nhận câu", { exact: true })).toBeVisible();
    await expect(strip.getByText("Mã hóa", { exact: true })).toBeVisible();
    await expect(strip.getByText("Mô hình", { exact: true })).toBeVisible();
    await expect(page.getByText("Suy luận")).toHaveCount(0);
    await expect(page.getByText("Hiểu", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Hội thoại với Native AI")).toHaveCount(0);
    await expect(page.getByRole("group", { name: "Chế độ trình bày" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-density", "research");

    await page.getByTestId("tab-settings").click();
    const probe = page.getByTestId("settings-density-probe");
    await expect(probe).toBeVisible();
    const compactPad = await probe.evaluate((el) => getComputedStyle(el).paddingTop);
    await page.getByTestId("density-comfortable").click();
    await expect(page.locator("html")).toHaveAttribute("data-density", "comfortable");
    const cozyPad = await probe.evaluate((el) => getComputedStyle(el).paddingTop);
    expect(parseFloat(compactPad)).toBe(10);
    expect(parseFloat(cozyPad)).toBe(16);
    await page.getByTestId("density-research").click();
    await expect(page.locator("html")).toHaveAttribute("data-density", "research");
  });
});
