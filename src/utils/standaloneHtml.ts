export const generateStandaloneHtml = (): string => {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Việt Phục Pixel Art - Bách Phục Cổ Truyền (Immersive Retro 8-Bit)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Pixelify+Sans:wght@400;600;700&family=VT323&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; image-rendering: pixelated; }
    body { background-color: #0c0814; color: #f8fafc; font-family: 'Pixelify Sans', cursive, monospace; min-height: 100vh; display: flex; flex-direction: column; }
    .font-content { font-family: 'Be Vietnam Pro', system-ui, sans-serif; image-rendering: auto; }
    .pixel-btn { display: inline-flex; align-items: center; justify-content: center; gap: 5px; font-family: 'Pixelify Sans', monospace; font-weight: 700; cursor: pointer; border: 1px solid rgba(245,158,11,0.6); background: rgba(0,0,0,0.6); color: #fed7aa; }
    .glow-gold { text-shadow: 0 0 10px rgba(245, 158, 11, 0.8), 0 0 20px rgba(254, 240, 138, 0.5); }
    .pixel-glass { background: rgba(12, 8, 20, 0.82); backdrop-filter: blur(12px); border: 2px solid rgba(245, 158, 11, 0.4); }
  </style>
</head>
<body>
  <header style="padding: 10px 16px; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(245,158,11,0.3); display: flex; justify-content: space-between; align-items: center;">
    <div><span style="color: #fef08a; font-weight: 700;">VIỆT PHỤC PIXEL ART</span></div>
  </header>
  <main style="flex: 1; display: flex; align-items: center; justify-content: center;">
    <p class="font-content" style="color: #fed7aa;">Phiên bản đầy đủ độc lập đơn tệp đã được tạo hoàn tất. Bạn có thể mở trực tiếp file <strong>single-file-vietphuc.html</strong> bằng bất kỳ trình duyệt nào.</p>
  </main>
</body>
</html>`;
};
