import { useStudio } from "@/lib/store";
import { ModeEcho } from "../level";
import { Btn, Field, Panel, PanelTitle, inputClass } from "../ui";

/**
 * Workspace only. No LiteScope groups, no fake BOARD link.
 *
 * Owner: gb-ux-product.
 */
export function SettingsTab() {
  const { projectName, setProjectName, setTab, connection, activeInteractionId, density, setDensity } =
    useStudio();
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <Panel>
        <PanelTitle>Hồ sơ dự án</PanelTitle>
        <Field label="Tên">
          <input value={projectName} onChange={(e) => setProjectName(e.target.value)} className={inputClass} />
        </Field>
        <p className="mt-2 text-[13px] text-muted">
          Tên chỉ sống trên máy này. Không đổi bitstream hay luật học.
        </p>
      </Panel>
      <Panel data-testid="settings-density-probe">
        <PanelTitle>Hiển thị</PanelTitle>
        <ModeEcho />
        <p className="mt-2 text-xs text-muted">
          Chế độ Dễ hiểu / Research / RTL chỉ có một chỗ: thanh trên. Đổi cách kể, không đổi nguồn.
        </p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Mật độ">
          <Btn
            data-testid="density-research"
            variant={density === "research" ? "primary" : "ghost"}
            onClick={() => setDensity("research")}
          >
            Gọn
          </Btn>
          <Btn
            data-testid="density-comfortable"
            variant={density === "comfortable" ? "primary" : "ghost"}
            onClick={() => setDensity("comfortable")}
          >
            Thoáng
          </Btn>
        </div>
        <p className="mt-2 text-xs text-muted">
          Mật độ ghi <span className="gb-num">data-density</span> trên tài liệu. Mặc định gọn (research).
        </p>
      </Panel>
      <Panel>
        <PanelTitle>Nguồn dữ liệu</PanelTitle>
        <dl className="space-y-1 text-[13px]">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Nguồn đang mở</dt>
            <dd className="font-mono">{connection.activeSource}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">FPGA</dt>
            <dd>{connection.connected ? "đang trả lời" : "chưa kết nối"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Tương tác</dt>
            <dd className="font-mono">#{activeInteractionId}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[13px] text-warn">
          SYNTHETIC không được tô như BOARD. Studio không mở cổng serial.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Btn onClick={() => setTab("evidence")}>Mở bằng chứng</Btn>
          <Btn onClick={() => setTab("experiments")}>Mở session đã lưu</Btn>
        </div>
      </Panel>
    </div>
  );
}
