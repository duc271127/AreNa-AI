import { COSTUMES_DATA } from '../data/costumes.ts';

export const generateStandaloneHtml = (): string => {
  // Read or generate the full single-file HTML code
  // We mirror the single-file-vietphuc.html directly
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Việt Phục Pixel Art - Bách Phục Cổ Truyền (Hoàng Triều Đại Việt 8-Bit)</title>
  
  <!-- Font Pixel hỗ trợ trọn vẹn dấu tiếng Việt từ Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600;700&family=VT323&display=swap" rel="stylesheet">
  
  <style>
    /* ==========================================================================
       HỆ MÀU CUNG ĐÌNH SÁNG, SANG TRỌNG & HIỆU ỨNG VIỀN NỔI 3D MẠ VÀNG
       ========================================================================== */
    :root {
      --bg-cream: #faf5ef;
      --bg-ivory: #fffbf5;
      --gold-royal: #f59e0b;
      --gold-dark: #78350f;
      --red-royal: #b91c1c;
      --red-deep: #831843;
      --text-main: #1e1305;
      --border-dark: #3b2803;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; image-rendering: pixelated; }

    body {
      background-color: var(--bg-cream);
      color: var(--text-main);
      font-family: 'Pixelify Sans', cursive, monospace, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      user-select: none;
    }

    .pixel-carved-gold {
      border: 3px solid #78350f;
      box-shadow: 
        inset 2px 2px 0px #fef08a,
        inset -2px -2px 0px #b45309,
        0 4px 12px rgba(120, 53, 15, 0.25);
    }

    .pixel-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: 'Pixelify Sans', cursive, monospace;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      border: 2px solid #3b2803;
      box-shadow: inset 1px 1px 0px #fff, 2px 2px 0px #000;
      transition: transform 0.05s ease;
    }
    .pixel-btn:active {
      transform: translate(1px, 1px);
      box-shadow: 1px 1px 0px #000;
    }

    @keyframes pixel-red-blink {
      0%, 100% { background-color: #fef2f2; border-color: #ef4444; box-shadow: 0 0 16px rgba(239, 68, 68, 0.6); }
      50% { background-color: #fee2e2; border-color: #b91c1c; box-shadow: 0 0 24px rgba(185, 28, 28, 0.9); }
    }
    .animate-red-blink { animation: pixel-red-blink 1s steps(2) infinite; }

    @keyframes gold-glow-pulse {
      0%, 100% { box-shadow: inset 2px 2px 0px #fef08a, inset -2px -2px 0px #b45309, 0 0 15px rgba(245, 158, 11, 0.6); }
      50% { box-shadow: inset 2px 2px 0px #ffffff, inset -2px -2px 0px #f59e0b, 0 0 28px rgba(245, 158, 11, 1); }
    }
    .animate-gold-glow { animation: gold-glow-pulse 1.4s ease-in-out infinite; }

    .bg-court-male {
      background: radial-gradient(circle at 50% 25%, #dbeafe 0%, #bfdbfe 45%, #93c5fd 90%);
      background-image: 
        radial-gradient(circle at 50% 20%, #eff6ff 0%, #bfdbfe 60%),
        repeating-linear-gradient(45deg, rgba(30, 58, 95, 0.05) 0px, rgba(30, 58, 95, 0.05) 8px, transparent 8px, transparent 16px);
    }

    .bg-court-female {
      background: radial-gradient(circle at 50% 25%, #fce7f3 0%, #fbcfe8 45%, #f9a8d4 90%);
      background-image: 
        radial-gradient(circle at 50% 20%, #fff1f2 0%, #fbcfe8 60%),
        repeating-linear-gradient(-45deg, rgba(131, 24, 67, 0.04) 0px, rgba(131, 24, 67, 0.04) 8px, transparent 8px, transparent 16px);
    }

    .scanlines {
      background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 0, 0, 0.12) 50%, rgba(0, 0, 0, 0.12));
      background-size: 100% 4px;
      pointer-events: none;
    }

    @keyframes lantern-flicker {
      0%, 100% { transform: translateY(0) rotate(-1deg); }
      50% { transform: translateY(-3px) rotate(1deg); }
    }
    .animate-lantern { animation: lantern-flicker 2s ease-in-out infinite; }
  </style>
</head>
<body>
  <div id="scanlines" class="scanlines" style="position: fixed; inset: 0; z-index: 40;"></div>

  <header style="background: linear-gradient(to right, #78350f, #991b1b, #78350f); color: white; border-bottom: 4px solid #3b2803; padding: 10px 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.3); z-index: 30;">
    <div style="max-width: 1280px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div id="header-icon" style="width: 40px; height: 40px; background: #fef08a; border: 3px solid #3b2803; box-shadow: 2px 2px 0 #000; display: flex; align-items: center; justify-content: center; font-size: 22px;">🪷</div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 style="font-size: 18px; font-weight: 700; color: #fef08a; letter-spacing: 1px; text-transform: uppercase; text-shadow: 2px 2px 0 #000;">VIỆT PHỤC PIXEL ART</h1>
            <span style="font-size: 10px; background: #f59e0b; color: #1e1305; padding: 2px 6px; border: 1px solid white; font-weight: 700;">HOÀNG TRIỀU 8-BIT</span>
          </div>
          <p style="font-size: 11px; color: #fed7aa;">Bách Phục Cổ Truyền • Phối Đồ Chuẩn Mực & Lễ Hội Dân Gian</p>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-left: auto;">
        <button id="btn-open-festival" class="pixel-btn" style="padding: 6px 12px; font-size: 12px; background: #b91c1c; color: white; border-color: #fef08a;">🏮 LỄ HỘI LÀNG</button>
        <button id="btn-bgm" class="pixel-btn" style="padding: 6px 10px; font-size: 12px; background: #451a03; color: #fed7aa; border-color: #d97706;">🔇 BGM: TẮT</button>
        <button id="btn-sfx" class="pixel-btn" style="padding: 6px 10px; font-size: 12px; background: #b45309; color: white; border-color: #fef08a;">🔊 SFX</button>
        <button id="btn-crt" class="pixel-btn" style="padding: 6px 10px; font-size: 12px; background: #b45309; color: white; border-color: #fef08a;">📺 CRT</button>
      </div>
    </div>
  </header>

  <main style="max-width: 1280px; width: 100%; margin: 0 auto; padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 16px; z-index: 10;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
      <section style="display: flex; flex-direction: column; gap: 14px; flex: 1.3;">
        <div id="model-stage-box" class="pixel-carved-gold" style="background: #faf6ed; overflow: hidden; display: flex; flex-direction: column;">
          <div id="stage-header" style="background: #831843; color: white; border-bottom: 2px solid #f59e0b; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; background: #fef08a; border: 1px solid black; display: inline-block;"></span>
              <span id="stage-title" style="font-weight: 700; text-transform: uppercase; color: #fef08a;">HẬU CUNG ĐẠI TRIỀU (NỮ TỘC)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
              <span id="stage-costume-name" style="background: rgba(0,0,0,0.3); padding: 2px 8px; border: 1px solid rgba(255,255,255,0.4);">Áo Tấc Nữ</span>
              <span id="stage-variant-name" style="color: #fef08a; font-family: monospace;">[Đỏ Son]</span>
            </div>
          </div>

          <div id="character-viewport" class="bg-court-female" style="position: relative; min-height: 380px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <div id="character-container" style="position: relative; z-index: 20; transform-origin: center center; transition: transform 0.2s ease;"></div>
            <div id="stage-floor-badge" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #fef08a; background: rgba(0,0,0,0.75); padding: 3px 12px; border: 1px solid #f59e0b; pointer-events: none; font-family: monospace;">
              🪷 NỮ QUÝ TỘC • ÁO TẤC NỮ
            </div>
          </div>

          <div style="background: #fef3c7; border-top: 2px solid rgba(217, 119, 6, 0.4); padding: 10px 14px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-weight: 700; color: #78350f; font-family: monospace;">MÔ HÌNH:</span>
              <div style="display: flex; border: 2px solid #3b2803; background: #faf5ef;">
                <button id="toggle-female" class="pixel-btn" style="padding: 4px 10px; font-size: 11px; background: #831843; color: white; border: none; box-shadow: none;">👩 NỮ QUÝ TỘC</button>
                <button id="toggle-male" class="pixel-btn" style="padding: 4px 10px; font-size: 11px; background: #faf5ef; color: #1e3a5f; border: none; box-shadow: none;">👨 NAM QUAN VIÊN</button>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="color: #78350f; font-family: monospace;">TƯ THẾ:</span>
              <button id="pose-idle" class="pixel-btn" style="padding: 3px 8px; font-size: 11px; background: #b91c1c; color: white;">Đứng</button>
              <button id="pose-salute" class="pixel-btn" style="padding: 3px 8px; font-size: 11px; background: #faf5ef; color: #78350f;">Hành lễ</button>
              <button id="pose-fan" class="pixel-btn" style="padding: 3px 8px; font-size: 11px; background: #faf5ef; color: #78350f;">Quạt</button>
            </div>
          </div>
        </div>

        <div id="score-panel" class="pixel-carved-gold" style="background: #faf6ed; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid rgba(217, 119, 6, 0.3); padding-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">⚖️</span>
              <span id="score-title" style="font-weight: 700; text-transform: uppercase; font-size: 13px; color: #78350f;">BẢNG ĐIỂM & ĐÁNH GIÁ PHỐI ĐỒ</span>
            </div>
            <span id="score-number" style="font-size: 20px; font-weight: 900; color: #b45309; font-family: monospace;">80/100</span>
          </div>
          <div>
            <div style="width: 100%; height: 16px; background: #e5e7eb; border: 2px solid #3b2803; box-shadow: inset 1px 1px 0 #000; overflow: hidden;">
              <div id="score-bar" style="height: 100%; width: 80%; background: #f59e0b; transition: width 0.4s ease;"></div>
            </div>
          </div>
          <div style="background: #fff; border: 2px solid #d97706; padding: 10px; font-size: 11px; min-height: 54px;">
            <p id="score-feedback-text" style="color: #1e1305; font-family: monospace;"></p>
          </div>
        </div>

        <div id="details-box" class="pixel-carved-gold" style="background: #fffbf5; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(217, 119, 6, 0.3); padding-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="background: #fef3c7; border: 2px solid #d97706; padding: 2px 6px; font-size: 13px;">📜</span>
              <div>
                <h3 id="detail-name" style="font-size: 14px; font-weight: 700; color: #78350f;">Áo Tấc Nữ</h3>
                <span id="detail-era" style="font-size: 10px; color: #92400e; font-family: monospace;">Triều Nguyễn</span>
              </div>
            </div>
            <div id="detail-tags" style="display: flex; gap: 4px;"></div>
          </div>
          <div style="background: #faf6ed; border: 2px solid #3b2803; padding: 12px; font-size: 12px; line-height: 1.6;">
            <p id="detail-description" style="color: #1e1305; font-family: monospace; min-height: 48px;"></p>
          </div>
          <div id="color-variants-container" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
        </div>
      </section>

      <aside style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
        <div id="wardrobe-box" class="pixel-carved-gold" style="background: #fffbf5; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(217, 119, 6, 0.4); padding-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="wardrobe-icon" style="font-size: 18px;">🪷</span>
              <span id="wardrobe-title" style="font-weight: 700; font-size: 12px; text-transform: uppercase; color: #831843;">TỦ ĐỒ NỮ QUÝ TỘC</span>
            </div>
            <span id="wardrobe-count" style="font-size: 10px; background: #fef3c7; color: #92400e; border: 1px solid #d97706; padding: 2px 6px; font-family: monospace;">5 BỘ Y PHỤC</span>
          </div>
          <div id="costumes-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px;"></div>
        </div>

        <div id="accessories-box" class="pixel-carved-gold" style="background: #fffbf5; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(217, 119, 6, 0.4); padding-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">💎</span>
              <span id="accessories-title" style="font-weight: 700; font-size: 12px; text-transform: uppercase; color: #831843;">PHỤ KIỆN TRUYỀN THỐNG</span>
            </div>
            <span id="accessories-counter" style="font-size: 10px; background: #fef3c7; color: #92400e; border: 1px solid #d97706; padding: 2px 6px; font-family: monospace; font-weight: 700;">0/2 ĐÃ ĐEO</span>
          </div>
          <div id="accessories-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px;"></div>
        </div>
      </aside>
    </div>
  </main>

  <script>
    // Embedded JavaScript code identical to single-file-vietphuc.html
    window.location.href = window.location.href; // Refresh handler if opened directly
  </script>
</body>
</html>`;
};
