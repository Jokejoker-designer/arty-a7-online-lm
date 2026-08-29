import { expect, test } from "@playwright/test";

test.describe("observatory", () => {
  test("four fixed regions, no competing tabs", async ({ page }) => {
    await page.goto("/observatory");
    await expect(page.getByTestId("obs-shell")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Đài quan sát UART" })).toBeVisible();
    await expect(page.getByTestId("obs-pipeline")).toBeVisible();
    await expect(page.getByTestId("obs-chat")).toBeVisible();
    await expect(page.getByTestId("obs-footer")).toBeVisible();
    await expect(page.getByTestId("tab-overview")).toHaveCount(0);
    await expect(page.getByTestId("obs-legend")).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Ứng dụng" });
    await expect(nav.getByRole("link", { name: "Dễ hiểu" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Studio" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Đài quan sát" })).toBeVisible();
    await expect(page.getByTestId("obs-chat")).not.toContainText("Native AI");
    await expect(page.getByTestId("obs-chat")).not.toContainText("Tương tác");
    await expect(page.getByTestId("obs-header")).toContainText("COM12 closed");
  });

  test("silicon stages are BOARD; hang is STALL; tail is XSIM", async ({ page }) => {
    await page.goto("/observatory");
    await expect(page.getByTestId("stage-BOOT").getByTestId("badge-BOARD")).toBeVisible();
    await expect(page.getByTestId("stage-CORE_START").getByTestId("badge-STALL")).toBeVisible();
    await expect(page.getByTestId("stage-PRED_VALID").getByTestId("badge-XSIM")).toBeVisible();
    await expect(page.getByTestId("obs-watermark")).toHaveText("KHÔNG PHẢI DỮ LIỆU SILICON");
    await expect(page.getByTestId("obs-header").getByTestId("badge-ALERT")).toBeVisible();
  });

  test("does not claim pred=664 as silicon", async ({ page }) => {
    await page.goto("/observatory");
    await expect(page.getByTestId("obs-header")).toContainText("PRED");
    await expect(page.getByTestId("obs-header")).toContainText("∅");
    await expect(page.getByTestId("obs-header")).not.toContainText("664");
  });

  test("UART log is monospace hex + ascii from capture", async ({ page }) => {
    await page.goto("/observatory");
    await expect(page.getByTestId("obs-uart-ascii")).toContainText("CORE_START");
    await expect(page.getByTestId("obs-uart-hex")).toContainText("43 4F 52 45");
    const font = await page.getByTestId("obs-uart-hex").evaluate((el) => getComputedStyle(el).fontFamily);
    expect(font.toLowerCase()).toContain("jetbrains mono");
  });

  test("UART/host pane has no composer and stays silent", async ({ page }) => {
    await page.goto("/observatory");
    await expect(page.getByRole("heading", { name: "Nhật ký host" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Gửi" })).toHaveCount(0);
    await expect(page.getByLabel("Lệnh gửi tới FPGA")).toHaveCount(0);
    await expect(page.getByTestId("obs-chat-silent")).toContainText("Không có composer");
    await expect(page.getByTestId("obs-chat")).toContainText("UART / host");
    await expect(page.getByTestId("obs-chat")).toContainText("pred=∅");
    await expect(page.getByTestId("obs-chat")).not.toContainText("pred=664");
    await expect(page.getByTestId("obs-chat")).not.toContainText("Native AI");
    await expect(page.getByTestId("obs-chat")).not.toContainText("Tương tác");
  });

  test("GlassBox charts are in the first viewport", async ({ page }) => {
    await page.goto("/observatory");
    await expect(page.getByRole("heading", { name: "Sơ đồ thiết bị" })).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByRole("heading", { name: "Sơ đồ thiết bị" })).toBeInViewport();
    await expect(page.getByRole("heading", { name: "Luồng xử lý" })).toBeInViewport();
    await expect(page.getByRole("heading", { name: "Tiến trình tương tác" })).toBeInViewport();
    await expect(page.getByText("Nhận câu", { exact: true }).first()).toBeVisible();
  });
});
