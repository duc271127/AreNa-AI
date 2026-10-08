import React, { useState, useEffect } from 'react';
import { Costume, ColorVariant, Accessory } from '../types.ts';

interface PixelCharacterProps {
  costume: Costume;
  activeVariant: ColorVariant;
  gender: 'female' | 'male';
  pose: 'idle' | 'salute' | 'fan';
  zoom: number;
  equippedAccessories: Accessory[];
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  costume,
  activeVariant,
  gender,
  pose,
  zoom,
  equippedAccessories = [],
}) => {
  const [blink, setBlink] = useState(false);
  const [frame, setFrame] = useState(0);

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Subtle 2-frame stepped idle breath
  useEffect(() => {
    const animInterval = setInterval(() => {
      setFrame((prev) => (prev === 0 ? 1 : 0));
    }, 900);
    return () => clearInterval(animInterval);
  }, []);

  const primary = activeVariant.primaryColor;
  const secondary = activeVariant.secondaryColor;
  const accent = activeVariant.accentColor;
  const pattern = activeVariant.patternColor;

  const skin = '#fed0ab';
  const skinShadow = '#e0a980';
  const hairColor = '#18121e';
  const eyesColor = '#120d18';

  // Accessories checks
  const equippedIds = equippedAccessories.map((a) => a.id);
  const hasMan = equippedIds.includes('man');
  const hasNonBaTam = equippedIds.includes('non-ba-tam');
  const hasKiengBac = equippedIds.includes('kieng-bac');
  const hasQuatLua = equippedIds.includes('quat-lua-tron');
  const hasHaiMuiVut = equippedIds.includes('hai-mui-vut');
  const hasKhanXep = equippedIds.includes('khan-xep');
  const hasTheBaiNga = equippedIds.includes('the-bai-nga');
  const hasGuocMoc = equippedIds.includes('guoc-moc');
  const hasNonLaCoHut = equippedIds.includes('non-la-co-hut');
  const hasQuaiThaoKep = equippedIds.includes('quai-thao-kep');
  const hasTramCaiDa = equippedIds.includes('tram-cai-da');

  // Vertical bob offset based on frame
  const bobY = frame === 1 ? -1 : 0;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      <svg
        viewBox="0 0 64 80"
        className="w-64 h-80 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        style={{
          shapeRendering: 'crispEdges',
          imageRendering: 'pixelated',
        }}
      >
        {/* ================= PEDESTAL & SHADOW ================= */}
        <ellipse cx="32" cy="74" rx="20" ry="4" fill="rgba(0, 0, 0, 0.35)" />

        <g id="pedestal">
          {/* Đệm thảm ngọc mạ vàng 3D */}
          <rect x="14" y="70" width="36" height="3" fill="#b91c1c" />
          <rect x="13" y="71" width="38" height="1" fill="#f59e0b" />
          <rect x="10" y="73" width="44" height="2" fill="#334155" />
          <rect x="8" y="75" width="48" height="3" fill="#1e293b" />
          <rect x="6" y="78" width="52" height="2" fill="#0f172a" />
          {/* Họa tiết hoa sen mạ vàng */}
          <rect x="18" y="75" width="4" height="2" fill="#f59e0b" />
          <rect x="30" y="75" width="4" height="2" fill="#f59e0b" />
          <rect x="42" y="75" width="4" height="2" fill="#f59e0b" />
        </g>

        {/* ================= CHARACTER BODY & COSTUME ================= */}
        <g transform={`translate(0, ${bobY})`}>
          {/* ================= CHÂN & GIÀY / GUỐC ================= */}
          {hasHaiMuiVut ? (
            /* Hài mũi vút thêu hoa */
            <g id="accessory-hai-mui-vut">
              <rect x="24" y="67" width="6" height="4" fill="#b91c1c" />
              <rect x="23" y="66" width="2" height="2" fill="#f59e0b" />
              <circle cx="27" cy="68" r="0.8" fill="#ffffff" />
              <rect x="34" y="67" width="6" height="4" fill="#b91c1c" />
              <rect x="39" y="66" width="2" height="2" fill="#f59e0b" />
              <circle cx="37" cy="68" r="0.8" fill="#ffffff" />
            </g>
          ) : hasGuocMoc ? (
            /* Guốc mộc dân gian */
            <g id="accessory-guoc-moc">
              <rect x="25" y="68" width="5" height="3" fill="#78350f" />
              <rect x="25" y="67" width="5" height="1" fill="#0f172a" /> {/* Quai da */}
              <rect x="34" y="68" width="5" height="3" fill="#78350f" />
              <rect x="34" y="67" width="5" height="1" fill="#0f172a" />
            </g>
          ) : costume.id === 'ao-ma-doan' ? (
            /* Hia đen quan lại */
            <g id="mandarin-boots">
              <rect x="25" y="65" width="5" height="6" fill="#090d16" />
              <rect x="25" y="69" width="6" height="2" fill="#1e293b" />
              <rect x="34" y="65" width="5" height="6" fill="#090d16" />
              <rect x="33" y="69" width="6" height="2" fill="#1e293b" />
            </g>
          ) : (
            /* Giày vải / Hài mộc cổ truyền */
            <g id="default-shoes">
              <rect x="25" y="68" width="5" height="3" fill="#1b120c" />
              <rect x="25" y="67" width="5" height="1" fill="#f59e0b" />
              <rect x="34" y="68" width="5" height="3" fill="#1b120c" />
              <rect x="34" y="67" width="5" height="1" fill="#f59e0b" />
            </g>
          )}

          {/* ================= LỚP QUẦN / VÁY ĐỆM BÊN DƯỚI ================= */}
          {costume.id === 'ao-tu-than' ? (
            /* Áo Tứ Thân: Váy đụp đen chấm gót */
            <g id="tu-than-black-skirt">
              <rect x="21" y="47" width="22" height="21" fill="#0f172a" />
              <rect x="20" y="53" width="24" height="15" fill="#1e293b" />
              <line x1="25" y1="48" x2="25" y2="68" stroke="#334155" strokeWidth="1" />
              <line x1="39" y1="48" x2="39" y2="68" stroke="#334155" strokeWidth="1" />
            </g>
          ) : costume.id === 'ao-giao-linh' ? (
            /* Giao Lĩnh: Chân váy quây xếp nếp */
            <g id="giao-linh-thuong">
              <rect x="22" y="48" width="20" height="20" fill="#f4ede2" />
              <rect x="20" y="54" width="24" height="14" fill="#ebe1d1" />
              <line x1="24" y1="48" x2="24" y2="68" stroke="#d5c7b2" strokeWidth="1" />
              <line x1="28" y1="48" x2="28" y2="68" stroke="#d5c7b2" strokeWidth="1" />
              <line x1="32" y1="48" x2="32" y2="68" stroke="#d5c7b2" strokeWidth="1" />
              <line x1="36" y1="48" x2="36" y2="68" stroke="#d5c7b2" strokeWidth="1" />
              <line x1="40" y1="48" x2="40" y2="68" stroke="#d5c7b2" strokeWidth="1" />
              <rect x="20" y="66" width="24" height="2" fill={secondary} />
            </g>
          ) : (
            /* Quần lụa trắng hoặc đen */
            <g id="silk-pants">
              <rect x="24" y="58" width="7" height="10" fill="#ede8de" />
              <rect x="33" y="58" width="7" height="10" fill="#ede8de" />
              <rect x="25" y="64" width="5" height="4" fill="#dfd7c8" />
              <rect x="34" y="64" width="5" height="4" fill="#dfd7c8" />
            </g>
          )}

          {/* ================= CHI TIẾT TRANG PHỤC ================= */}

          {/* 1. ÁO MÃ ĐOÁN (ÁO QUAN TRIỀU NGUYỄN CÓ BỔ TỬ) */}
          {costume.id === 'ao-ma-doan' && (
            <g id="costume-ao-ma-doan">
              {/* Tay thụng uy nghiêm */}
              <rect x="9" y="30" width="12" height="23" fill={secondary} />
              <rect x="11" y="32" width="9" height="21" fill={primary} />
              <rect x="9" y="49" width="12" height="4" fill={accent} />
              <rect x="43" y="30" width="12" height="23" fill={secondary} />
              <rect x="44" y="32" width="9" height="21" fill={primary} />
              <rect x="43" y="49" width="12" height="4" fill={accent} />

              {/* Thân áo quan đại triều */}
              <rect x="20" y="27" width="24" height="35" fill={primary} />
              <rect x="19" y="40" width="26" height="22" fill={primary} />
              <rect x="20" y="27" width="2" height="35" fill={secondary} />
              <rect x="42" y="27" width="2" height="35" fill={secondary} />

              {/* BỔ TỬ TRƯỚC NGỰC (TẤM HÌNH VUÔNG THÊU CHIM / THÚ PHẨM TRẬT) */}
              <rect x="26" y="32" width="12" height="12" fill="#b91c1c" />
              <rect x="27" y="33" width="10" height="10" fill="#f59e0b" />
              <circle cx="32" cy="38" r="3" fill="#ffffff" /> {/* Chim hạc ngự */}
              <circle cx="32" cy="38" r="1.5" fill="#b91c1c" />

              {/* Cổ áo lập lĩnh cài khuy vàng */}
              <rect x="27" y="23" width="10" height="4" fill={primary} />
              <rect x="28" y="23" width="8" height="1" fill="#f59e0b" />
              <circle cx="34" cy="27" r="1.2" fill="#ffd700" />
            </g>
          )}

          {/* 2. ÁO TỨ THÂN (DÂN GIAN BẮC BỘ) */}
          {costume.id === 'ao-tu-than' && (
            <g id="costume-ao-tu-than">
              {/* Tay áo gọn gàng */}
              <rect x="16" y="29" width="6" height="19" fill={secondary} />
              <rect x="17" y="30" width="4" height="18" fill={primary} />
              <rect x="42" y="29" width="6" height="19" fill={secondary} />
              <rect x="43" y="30" width="4" height="18" fill={primary} />

              {/* Thân áo khoác 4 thân buông vạt */}
              <rect x="21" y="27" width="22" height="30" fill={primary} />

              {/* YẾM ĐÀO ĐỎ BÊN TRONG LẤP LÓ CỔ TRÒN */}
              <polygon points="27,24 37,24 35,35 29,35" fill="#e11d48" />
              <circle cx="32" cy="24" r="2" fill="#fed0ab" />

              {/* 2 Vạt áo trước buông thả */}
              <rect x="21" y="27" width="5" height="32" fill={secondary} />
              <rect x="38" y="27" width="5" height="32" fill={secondary} />

              {/* Dải thắt lưng lụa đào xanh/hồng buộc eo */}
              <rect x="20" y="42" width="24" height="3" fill="#10b981" />
              <rect x="29" y="45" width="3" height="14" fill="#10b981" />
              <rect x="33" y="45" width="2" height="12" fill="#f43f5e" />
            </g>
          )}

          {/* 3. ÁO LẬP LĨNH (CỔ ĐỨNG TRIỀU NGUYỄN THANH TAO) */}
          {costume.id === 'ao-lap-linh' && (
            <g id="costume-ao-lap-linh">
              <rect x="17" y="28" width="6" height="19" fill={secondary} />
              <rect x="18" y="29" width="4" height="18" fill={primary} />
              <rect x="41" y="28" width="6" height="19" fill={secondary} />
              <rect x="42" y="29" width="4" height="18" fill={primary} />

              {/* Thân áo thon thả kín đáo */}
              <rect x="22" y="27" width="20" height="35" fill={primary} />
              <rect x="21" y="36" width="22" height="26" fill={primary} />

              {/* Cổ lập lĩnh cao ôm khít */}
              <rect x="27" y="23" width="10" height="4" fill={primary} />
              <rect x="28" y="23" width="8" height="1" fill="#f59e0b" />

              {/* Vạt cài khuy lệch sườn */}
              <path d="M 32 27 L 37 32 L 37 42" stroke={secondary} strokeWidth="1" fill="none" />
              <circle cx="33" cy="25" r="1.2" fill="#ffd700" />
              <circle cx="35" cy="28" r="1.2" fill="#ffd700" />
              <circle cx="37" cy="32" r="1.2" fill="#ffd700" />
              <circle cx="37" cy="36" r="1.2" fill="#ffd700" />
              <circle cx="37" cy="40" r="1.2" fill="#ffd700" />

              <rect x="21" y="61" width="22" height="2" fill={secondary} />
            </g>
          )}

          {/* 4. ÁO TRÀNG VẠT (GIAO LĨNH NAM ĐĨNH ĐẠC) */}
          {costume.id === 'ao-trang-vat' && (
            <g id="costume-ao-trang-vat">
              <rect x="11" y="29" width="11" height="20" fill={secondary} />
              <rect x="12" y="30" width="9" height="19" fill={primary} />
              <rect x="42" y="29" width="11" height="20" fill={secondary} />
              <rect x="43" y="30" width="9" height="19" fill={primary} />

              <rect x="21" y="27" width="22" height="35" fill={primary} />
              <rect x="20" y="38" width="24" height="24" fill={primary} />

              {/* Cổ chéo chữ Y nam nhân khoáng đạt */}
              <polygon points="25,23 38,36 34,38 23,25" fill={secondary} />
              <polygon points="39,23 26,38 30,40 41,25" fill="#f59e0b" />
              <polygon points="29,24 32,28 35,24" fill="#ffffff" />

              {/* Đai lưng vải */}
              <rect x="21" y="44" width="22" height="3" fill="#1e293b" />
            </g>
          )}

          {/* 5. ÁO NHẬT BÌNH */}
          {costume.id === 'ao-nhat-binh' && (
            <g id="costume-ao-nhat-binh">
              <rect x="12" y="30" width="9" height="20" fill={secondary} />
              <rect x="13" y="31" width="7" height="19" fill={primary} />
              <rect x="12" y="44" width="9" height="1" fill="#c1272d" />
              <rect x="12" y="45" width="9" height="1" fill="#ffd700" />
              <rect x="12" y="46" width="9" height="1" fill="#29b6f6" />
              <rect x="12" y="47" width="9" height="1" fill="#ffffff" />
              <rect x="12" y="48" width="9" height="1" fill="#2e7d32" />

              <rect x="43" y="30" width="9" height="20" fill={secondary} />
              <rect x="44" y="31" width="7" height="19" fill={primary} />
              <rect x="43" y="44" width="9" height="1" fill="#c1272d" />
              <rect x="43" y="45" width="9" height="1" fill="#ffd700" />
              <rect x="43" y="46" width="9" height="1" fill="#29b6f6" />
              <rect x="43" y="47" width="9" height="1" fill="#ffffff" />
              <rect x="43" y="48" width="9" height="1" fill="#2e7d32" />

              <rect x="21" y="27" width="22" height="34" fill={primary} />
              <rect x="20" y="36" width="24" height="26" fill={primary} />

              <rect x="25" y="23" width="14" height="13" fill="#d4af37" />
              <rect x="26" y="24" width="12" height="11" fill="#b71c1c" />
              <rect x="28" y="26" width="8" height="7" fill="#ffd54f" />
              <circle cx="32" cy="29" r="1.5" fill="#c1272d" />

              <g id="nhat-binh-ribbons">
                <rect x="30" y="36" width="1" height="24" fill="#c1272d" />
                <rect x="31" y="36" width="1" height="24" fill="#ffd700" />
                <rect x="32" y="36" width="1" height="25" fill="#29b6f6" />
                <rect x="33" y="36" width="1" height="24" fill="#ffffff" />
                <rect x="34" y="36" width="1" height="24" fill="#2e7d32" />
                <rect x="30" y="36" width="5" height="3" fill="#a7ffeb" />
                <rect x="31" y="37" width="3" height="1" fill="#00bfa5" />
              </g>

              <rect x="20" y="58" width="24" height="4" fill="#1565c0" />
              <rect x="20" y="58" width="24" height="1" fill="#ffffff" />
              <rect x="20" y="60" width="24" height="1" fill="#ffd700" />
            </g>
          )}

          {/* 6. ÁO TẤC (NAM / NỮ) */}
          {(costume.id === 'ao-tac' || costume.id === 'ao-tac-nam') && (
            <g id="costume-ao-tac">
              <rect x="10" y="30" width="11" height="22" fill={secondary} />
              <rect x="12" y="32" width="8" height="20" fill={primary} />
              <rect x="10" y="48" width="11" height="4" fill={accent} />
              <rect x="43" y="30" width="11" height="22" fill={secondary} />
              <rect x="44" y="32" width="8" height="20" fill={primary} />
              <rect x="43" y="48" width="11" height="4" fill={accent} />

              <rect x="21" y="27" width="22" height="34" fill={primary} />
              <rect x="20" y="34" width="24" height="27" fill={primary} />
              <rect x="19" y="44" width="26" height="18" fill={primary} />

              <line x1="32" y1="27" x2="32" y2="61" stroke={secondary} strokeWidth="1" />
              <circle cx="34" cy="27" r="1" fill="#ffd700" />
              <circle cx="35" cy="30" r="1" fill="#ffd700" />

              <rect x="19" y="60" width="26" height="2" fill={secondary} />
              <rect x="21" y="61" width="22" height="1" fill={accent} />

              <rect x="27" y="23" width="10" height="4" fill={primary} />
              <rect x="28" y="23" width="8" height="1" fill="#ffd700" />
            </g>
          )}

          {/* 7. ÁO GIAO LĨNH NỮ */}
          {costume.id === 'ao-giao-linh' && (
            <g id="costume-ao-giao-linh">
              <rect x="12" y="29" width="10" height="18" fill={secondary} />
              <rect x="13" y="30" width="8" height="16" fill={primary} />
              <rect x="42" y="29" width="10" height="18" fill={secondary} />
              <rect x="43" y="30" width="8" height="16" fill={primary} />

              <rect x="22" y="27" width="20" height="23" fill={primary} />
              <polygon points="26,23 37,35 34,37 24,25" fill={secondary} />
              <polygon points="38,23 27,37 30,39 40,25" fill="#c1272d" />
              <polygon points="30,24 32,27 34,24" fill="#ffffff" />

              <rect x="21" y="44" width="22" height="4" fill="#c1272d" />
              <rect x="30" y="48" width="2" height="16" fill="#c1272d" />
            </g>
          )}

          {/* 8. ÁO NGŨ THÂN TAY CHẼN (NAM / NỮ) */}
          {(costume.id === 'ao-ngu-than' || costume.id === 'ao-ngu-than-nam') && (
            <g id="costume-ao-ngu-than">
              <rect x="18" y="28" width="5" height="18" fill={secondary} />
              <rect x="19" y="29" width="3" height="17" fill={primary} />
              <rect x="41" y="28" width="5" height="18" fill={secondary} />
              <rect x="42" y="29" width="3" height="17" fill={primary} />

              <rect x="23" y="27" width="18" height="34" fill={primary} />
              <rect x="22" y="36" width="20" height="25" fill={primary} />

              <rect x="27" y="23" width="10" height="4" fill={primary} />
              <circle cx="33" cy="25" r="1.2" fill="#ffd700" />
              <circle cx="35" cy="28" r="1.2" fill="#ffd700" />
              <circle cx="37" cy="32" r="1.2" fill="#ffd700" />
              <circle cx="37" cy="36" r="1.2" fill="#ffd700" />
              <circle cx="37" cy="41" r="1.2" fill="#ffd700" />
            </g>
          )}

          {/* ================= PHỤ KIỆN VÙNG CỔ / NGỰC ================= */}
          {hasKiengBac && (
            <g id="accessory-kieng-bac">
              <path d="M 27 25 C 27 30, 37 30, 37 25" stroke="#ffffff" strokeWidth="2" fill="none" />
              <circle cx="32" cy="29" r="1.2" fill="#cbd5e1" />
            </g>
          )}

          {hasQuaiThaoKep && (
            <g id="accessory-quai-thao-kep">
              {/* Dải quai thao kép 2 tầng buông dài trước ngực */}
              <line x1="28" y1="20" x2="27" y2="48" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="36" y1="20" x2="37" y2="48" stroke="#1e293b" strokeWidth="1.5" />
              <circle cx="27" cy="49" r="1.5" fill="#f43f5e" />
              <circle cx="37" cy="49" r="1.5" fill="#f43f5e" />
            </g>
          )}

          {/* ================= PHỤ KIỆN THẮT LƯNG (THẺ BÀI NGÀ) ================= */}
          {hasTheBaiNga && (
            <g id="accessory-the-bai-nga">
              <rect x="36" y="42" width="4" height="8" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
              <line x1="38" y1="40" x2="38" y2="42" stroke="#b91c1c" strokeWidth="1" />
              <circle cx="38" cy="51" r="1" fill="#b91c1c" />
            </g>
          )}

          {/* ================= TAY & QUẠT ================= */}
          {hasQuatLua ? (
            <g id="accessory-quat-lua-tron">
              <rect x="18" y="46" width="4" height="4" fill={skin} />
              <rect x="42" y="44" width="4" height="4" fill={skin} />
              <circle cx="50" cy="39" r="7" fill="#ffffff" stroke="#b91c1c" strokeWidth="1" />
              <circle cx="50" cy="39" r="1.5" fill="#ec4899" />
              <line x1="44" y1="46" x2="52" y2="36" stroke="#8d6e63" strokeWidth="1.2" />
              <rect x="43" y="48" width="1" height="6" fill="#b91c1c" />
            </g>
          ) : (
            <>
              {pose === 'idle' && (
                <>
                  <rect x="18" y="46" width="4" height="4" fill={skin} />
                  <rect x="42" y="46" width="4" height="4" fill={skin} />
                </>
              )}
              {pose === 'salute' && (
                <>
                  <rect x="29" y="38" width="6" height="5" fill={skin} />
                  <line x1="32" y1="38" x2="32" y2="43" stroke={skinShadow} strokeWidth="1" />
                </>
              )}
              {pose === 'fan' && (
                <>
                  <rect x="18" y="46" width="4" height="4" fill={skin} />
                  <rect x="41" y="43" width="4" height="4" fill={skin} />
                  <polygon points="43,44 54,34 57,41 45,46" fill="#f59e0b" />
                  <polygon points="44,43 53,35 55,40 46,45" fill="#b91c1c" />
                </>
              )}
            </>
          )}

          {/* ================= ĐẦU, MẶT & MŨ NÓN ================= */}
          <rect x="29" y="21" width="6" height="4" fill={skin} />
          <rect x="26" y="12" width="12" height="10" fill={skin} />
          <rect x="27" y="21" width="10" height="2" fill={skin} />

          {/* Mắt Pixel */}
          {blink ? (
            <>
              <rect x="28" y="16" width="3" height="1" fill={eyesColor} />
              <rect x="33" y="16" width="3" height="1" fill={eyesColor} />
            </>
          ) : (
            <>
              <rect x="28" y="15" width="3" height="2" fill={eyesColor} />
              <rect x="29" y="15" width="1" height="1" fill="#ffffff" />
              <rect x="33" y="15" width="3" height="2" fill={eyesColor} />
              <rect x="34" y="15" width="1" height="1" fill="#ffffff" />
            </>
          )}

          {/* Nét mặt theo Giới tính Nam vs Nữ */}
          {gender === 'female' ? (
            <>
              <rect x="28" y="13" width="3" height="1" fill="#422e1b" />
              <rect x="33" y="13" width="3" height="1" fill="#422e1b" />
              <rect x="27" y="17" width="2" height="1" fill="#f472b6" opacity="0.9" />
              <rect x="35" y="17" width="2" height="1" fill="#f472b6" opacity="0.9" />
              <rect x="31" y="19" width="2" height="1" fill="#db2777" />
              <circle cx="25.5" cy="18" r="0.8" fill="#ffffff" />
              <circle cx="38.5" cy="18" r="0.8" fill="#ffffff" />
            </>
          ) : (
            <>
              <rect x="27" y="13" width="4" height="1" fill="#1e1b4b" />
              <rect x="33" y="13" width="4" height="1" fill="#1e1b4b" />
              <rect x="31" y="19" width="2" height="1" fill="#c25953" />
            </>
          )}

          {/* Tóc cơ bản */}
          <rect x="25" y="12" width="2" height="6" fill={hairColor} />
          <rect x="37" y="12" width="2" height="6" fill={hairColor} />

          {/* ================= MŨ NÓN & PHỤ KIỆN ĐẦU ================= */}
          {hasMan ? (
            /* Mấn hoàng cung / Khăn vành dây */
            <g id="accessory-man">
              <rect x="23" y="6" width="18" height="6" fill="#f59e0b" />
              <rect x="24" y="4" width="16" height="4" fill="#fbbf24" />
              <rect x="25" y="2" width="14" height="3" fill="#ea580c" />
              <circle cx="32" cy="5" r="1.5" fill="#b91c1c" />
              <circle cx="32" cy="5" r="0.8" fill="#ffffff" />
            </g>
          ) : hasKhanXep ? (
            /* Khăn xếp (Khăn đóng nam) chữ Nhân */
            <g id="accessory-khan-xep">
              <rect x="24" y="6" width="16" height="7" fill="#0f172a" />
              <rect x="25" y="4" width="14" height="4" fill="#1e293b" />
              <line x1="25" y1="8" x2="39" y2="8" stroke="#475569" strokeWidth="1" />
              <line x1="26" y1="10" x2="38" y2="10" stroke="#475569" strokeWidth="1" />
            </g>
          ) : hasNonBaTam ? (
            /* Nón Ba Tầm (Nón quai thao to tròn) */
            <g id="accessory-non-ba-tam">
              <rect x="15" y="4" width="34" height="4" fill="#fde047" />
              <rect x="13" y="6" width="38" height="2" fill="#ca8a04" />
              <rect x="18" y="2" width="28" height="2" fill="#fef08a" />
              <line x1="22" y1="8" x2="20" y2="38" stroke="#0f172a" strokeWidth="1.2" />
              <line x1="42" y1="8" x2="44" y2="38" stroke="#0f172a" strokeWidth="1.2" />
              <rect x="19" y="38" width="3" height="4" fill="#b91c1c" />
              <rect x="43" y="38" width="3" height="4" fill="#b91c1c" />
            </g>
          ) : hasNonLaCoHut ? (
            /* Nón lá cổ hút thanh thoát */
            <g id="accessory-non-la-co-hut">
              <polygon points="32,0 16,11 48,11" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
              <line x1="32" y1="0" x2="32" y2="11" stroke="#eab308" strokeWidth="0.8" />
              {/* Quai nón lụa hồng */}
              <line x1="25" y1="11" x2="32" y2="23" stroke="#ec4899" strokeWidth="1" />
              <line x1="39" y1="11" x2="32" y2="23" stroke="#ec4899" strokeWidth="1" />
            </g>
          ) : (
            /* Mũ mặc định theo trang phục */
            <>
              {costume.id === 'ao-ma-doan' ? (
                /* Mũ cánh chuồn / Mũ quan chức */
                <g id="mandarin-hat">
                  <rect x="25" y="5" width="14" height="7" fill="#090d16" />
                  <rect x="27" y="3" width="10" height="3" fill="#1e293b" />
                  {/* Hai cánh chuồn ngang 2 bên */}
                  <rect x="13" y="6" width="12" height="3" fill="#090d16" />
                  <rect x="39" y="6" width="12" height="3" fill="#090d16" />
                  <circle cx="32" cy="7" r="1.5" fill="#f59e0b" />
                </g>
              ) : costume.id === 'ao-tu-than' ? (
                /* Khăn mỏ quạ thôn nữ */
                <g id="khan-mo-qua">
                  <polygon points="32,7 23,4 41,4" fill="#0f172a" />
                  <rect x="24" y="6" width="16" height="4" fill="#1e293b" />
                </g>
              ) : costume.id === 'ao-nhat-binh' ? (
                /* Mũ phượng / Khăn vành dây hoàng gia */
                <g id="nhat-binh-crown">
                  <rect x="22" y="6" width="20" height="6" fill="#f59e0b" />
                  <rect x="23" y="4" width="18" height="3" fill="#fef08a" />
                  <circle cx="32" cy="4" r="2" fill="#b91c1c" />
                </g>
              ) : (
                /* Khăn đóng / búi tóc cơ bản */
                <g id="default-turban">
                  <rect x="24" y="7" width="16" height="5" fill="#1e293b" />
                  <circle cx="32" cy="6" r="1.2" fill="#f59e0b" />
                </g>
              )}
            </>
          )}

          {/* TRÂM CÀI TÓC GẮN ĐÁ (PHỤ KIỆN NỮ) */}
          {hasTramCaiDa && (
            <g id="accessory-tram-cai-da">
              {/* Trâm vàng đính đá đỏ ngọc lấp lánh */}
              <line x1="37" y1="3" x2="44" y2="8" stroke="#ffd700" strokeWidth="2" />
              <circle cx="44" cy="8" r="2.5" fill="#b91c1c" />
              <circle cx="44" cy="8" r="1.2" fill="#ffffff" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
