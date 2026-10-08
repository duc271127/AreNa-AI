import React from 'react';
import { Costume, Accessory, SceneId } from '../types.ts';
import { retroAudio } from '../utils/audio.ts';

interface InteractiveWardrobeObjectProps {
  sceneId: SceneId;
  isOpen: boolean;
  onToggle: () => void;
  costumes: Costume[];
  selectedCostume: Costume;
  onSelectCostume: (costume: Costume) => void;
  equippedAccessories: Accessory[];
  allAccessories: Accessory[];
  onToggleAccessory: (accessory: Accessory) => void;
  gender: 'female' | 'male';
}

export const InteractiveWardrobeObject: React.FC<InteractiveWardrobeObjectProps> = ({
  sceneId,
  isOpen,
  onToggle,
  costumes,
  selectedCostume,
  onSelectCostume,
  equippedAccessories,
  allAccessories,
  onToggleAccessory,
  gender,
}) => {
  const displayCostumes = costumes.filter(
    (c) => c.gender === gender || c.gender === 'unisex'
  );

  const displayAccessories = allAccessories.filter(
    (a) => a.gender === gender || a.gender === 'unisex'
  );

  return (
    <div className="relative z-30 flex flex-col items-end">
      {/* ================= VẬT THỂ TƯƠNG TÁC (OBJECT IN SCENE) ================= */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            retroAudio.playBlip(isOpen ? 380 : 580);
            onToggle();
          }}
          className="group relative cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
          title={isOpen ? 'Đóng tủ đồ' : 'Ấn vào để mở tủ đồ và chọn trang phục'}
        >
          {/* Nhãn gợi ý bồng bềnh */}
          <div
            className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 text-[10px] font-bold font-['Pixelify_Sans'] border shadow-md transition-all ${
              isOpen
                ? 'bg-[#b91c1c] text-white border-[#fef08a]'
                : 'bg-[#fef3c7] text-[#78350f] border-[#d97706] animate-bounce'
            }`}
          >
            {isOpen ? '✕ ĐÓNG LẠI' : '✨ CHẠM ĐỂ MỞ'}
          </div>

          {/* RENDERING VẬT THỂ THEO BỐI CẢNH */}
          {sceneId === 'cung-dinh' && (
            /* TỦ GỖ LIM KHẢM TRAI CUNG ĐÌNH */
            <div className="w-20 h-28 md:w-24 md:h-32 relative">
              <svg viewBox="0 0 48 64" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                {/* Chân tủ gỗ lim */}
                <rect x="6" y="58" width="6" height="4" fill="#2d1305" />
                <rect x="36" y="58" width="6" height="4" fill="#2d1305" />
                {/* Thân tủ */}
                <rect x="4" y="6" width="40" height="52" fill="#4a1e09" />
                <rect x="6" y="8" width="36" height="48" fill="#5c260c" />
                {/* Viền mạ vàng nóc tủ */}
                <rect x="2" y="4" width="44" height="4" fill="#f59e0b" />
                <rect x="4" y="2" width="40" height="2" fill="#b45309" />

                {isOpen ? (
                  /* TỦ MỞ: Cửa mở hai cánh, thấy khoang lụa phát sáng */
                  <g id="cabinet-opened">
                    <rect x="8" y="10" width="32" height="44" fill="#fef3c7" />
                    {/* Áo gấm treo bên trong */}
                    <rect x="14" y="14" width="20" height="26" fill="#b91c1c" />
                    <rect x="18" y="16" width="12" height="22" fill="#f59e0b" />
                    <circle cx="24" cy="20" r="2" fill="#fff" />
                    {/* Cánh tủ trái mở ra */}
                    <polygon points="4,8 8,10 8,54 4,56" fill="#78350f" />
                    {/* Cánh tủ phải mở ra */}
                    <polygon points="44,8 40,10 40,54 44,56" fill="#78350f" />
                    {/* Hào quang phát sáng */}
                    <circle cx="24" cy="28" r="8" fill="rgba(245,158,11,0.25)" />
                  </g>
                ) : (
                  /* TỦ ĐÓNG: Khảm trai xà cừ hoa sen & then vàng */
                  <g id="cabinet-closed">
                    {/* Rãnh giữa 2 cánh cửa */}
                    <line x1="24" y1="8" x2="24" y2="56" stroke="#2d1305" strokeWidth="1" />
                    {/* Khảm xà cừ hoa sen */}
                    <circle cx="15" cy="28" r="4" fill="#e0f2fe" />
                    <circle cx="33" cy="28" r="4" fill="#e0f2fe" />
                    <circle cx="15" cy="28" r="2" fill="#bae6fd" />
                    <circle cx="33" cy="28" r="2" fill="#bae6fd" />
                    {/* Then cài vàng */}
                    <rect x="21" y="26" width="6" height="6" fill="#f59e0b" />
                    <circle cx="24" cy="29" r="1.5" fill="#1e1305" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {sceneId === 'dam-sen' && (
            /* ĐÀI SEN KHỔNG LỒ NỞ HOA */
            <div className="w-20 h-24 md:w-24 md:h-28 relative">
              <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                {/* Lá sen lớn nâng đỡ */}
                <ellipse cx="24" cy="40" rx="20" ry="6" fill="#047857" />
                <ellipse cx="24" cy="39" rx="16" ry="4" fill="#10b981" />

                {isOpen ? (
                  /* HOA SEN NỞ BUNG: Cánh sen xòe, nhụy vàng rực rỡ */
                  <g id="lotus-blooming">
                    {/* Cánh sen ngoài */}
                    <path d="M 6 36 C 8 20, 18 24, 24 38" fill="#f43f5e" />
                    <path d="M 42 36 C 40 20, 30 24, 24 38" fill="#f43f5e" />
                    {/* Cánh sen giữa */}
                    <path d="M 12 34 C 16 14, 24 16, 24 36" fill="#fb7185" />
                    <path d="M 36 34 C 32 14, 24 16, 24 36" fill="#fb7185" />
                    {/* Nhụy sen vàng phát sáng chứa y phục */}
                    <circle cx="24" cy="26" r="8" fill="#fde047" />
                    <circle cx="24" cy="26" r="5" fill="#f59e0b" />
                    <circle cx="22" cy="24" r="1.5" fill="#fff" />
                    <circle cx="26" cy="24" r="1.5" fill="#fff" />
                  </g>
                ) : (
                  /* NỤ SEN KHÉP CÁNH */
                  <g id="lotus-bud">
                    <path d="M 24 12 C 14 24, 16 36, 24 38 C 32 36, 34 24, 24 12 Z" fill="#e11d48" />
                    <path d="M 24 14 C 18 24, 19 34, 24 37 C 29 34, 30 24, 24 14 Z" fill="#fb7185" />
                    <path d="M 24 16 C 21 24, 21 32, 24 35 C 27 32, 27 24, 24 16 Z" fill="#fecdd3" />
                    <line x1="24" y1="38" x2="24" y2="44" stroke="#047857" strokeWidth="3" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {sceneId === 'hoi-an' && (
            /* RƯƠNG BÁU CỔ & LỒNG ĐÈN ĐỎ PHỐ HỘI */
            <div className="w-20 h-24 md:w-24 md:h-28 relative">
              <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                {/* Lồng đèn đỏ treo trên rương */}
                <rect x="23" y="2" width="2" height="6" fill="#78350f" />
                <ellipse cx="24" cy="11" rx="5" ry="6" fill="#b91c1c" />
                <ellipse cx="24" cy="11" rx="2" ry="4" fill="#fef08a" />

                {/* Thân rương cổ */}
                <rect x="8" y="22" width="32" height="20" fill="#78350f" />
                <rect x="6" y="20" width="36" height="4" fill="#b45309" />
                <rect x="6" y="40" width="36" height="2" fill="#451a03" />

                {isOpen ? (
                  /* NẮP RƯƠNG MỞ LÊN, ÁNH SÁNG CHÂU BÁU LỤA TƠ */
                  <g id="chest-opened">
                    <polygon points="6,20 12,8 36,8 42,20" fill="#92400e" />
                    <rect x="10" y="22" width="28" height="12" fill="#fef3c7" />
                    <circle cx="24" cy="26" r="6" fill="#f59e0b" />
                    <circle cx="24" cy="26" r="3" fill="#ffffff" />
                  </g>
                ) : (
                  /* NẮP RƯƠNG ĐÓNG */
                  <g id="chest-closed">
                    <rect x="8" y="16" width="32" height="6" fill="#92400e" />
                    {/* Khóa đồng rương */}
                    <rect x="22" y="21" width="4" height="6" fill="#f59e0b" />
                    <circle cx="24" cy="24" r="1" fill="#1e1305" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Tên vật thể */}
          <div className="text-[10px] text-[#fef08a] bg-black/75 px-2 py-0.5 border border-[#f59e0b] font-mono mt-1 text-center whitespace-nowrap">
            {sceneId === 'cung-dinh' && 'TỦ GỖ LIM'}
            {sceneId === 'dam-sen' && 'ĐÀI SEN PHÁC'}
            {sceneId === 'hoi-an' && 'RƯƠNG LỤA PHỐ'}
          </div>
        </button>
      </div>

      {/* ================= GIAO DIỆN LƯỚI TỦ ĐỒ (FLOATING OVERLAY KHI MỞ) ================= */}
      {isOpen && (
        <div
          className="absolute right-0 top-36 w-[310px] sm:w-[350px] max-h-[75vh] overflow-y-auto pixel-glass-dark p-3.5 border-2 border-[#f59e0b] shadow-[0_12px_32px_rgba(0,0,0,0.8)] z-40 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150"
          style={{ imageRendering: 'auto' }}
        >
          {/* Header tủ đồ */}
          <div className="flex items-center justify-between pb-2 border-b border-[#f59e0b]/40">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {sceneId === 'cung-dinh' ? '🏛️' : sceneId === 'dam-sen' ? '🪷' : '🏮'}
              </span>
              <div>
                <h4 className="text-xs font-bold font-['Pixelify_Sans'] text-[#fef08a] uppercase tracking-wide">
                  TỦ ĐỒ {gender === 'male' ? 'NAM NHI' : 'QUÝ TỘC NỮ'}
                </h4>
                <p className="text-[9px] text-[#fed7aa] font-content">
                  {displayCostumes.length} bộ y phục truyền thống
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-xs w-5 h-5 flex items-center justify-center bg-[#b91c1c] text-white border border-[#fef08a] cursor-pointer hover:bg-[#dc2626]"
            >
              ✕
            </button>
          </div>

          {/* Grid Trang phục */}
          <div>
            <div className="text-[10px] text-[#fed7aa] font-bold font-mono mb-2 flex items-center justify-between">
              <span>CHỌN Y PHỤC:</span>
              <span className="text-[#fef08a]">{selectedCostume.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {displayCostumes.map((c) => {
                const isSelected = c.id === selectedCostume.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      retroAudio.playEquip();
                      onSelectCostume(c);
                    }}
                    className={`p-2 flex flex-col items-center gap-1.5 border-2 cursor-pointer transition-all text-left ${
                      isSelected
                        ? 'bg-[#b91c1c]/90 border-[#fef08a] shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                        : 'bg-black/60 border-[#78350f] hover:border-[#f59e0b] hover:bg-black/80'
                    }`}
                  >
                    <div
                      className="w-full h-8 border border-white/20 flex items-center justify-center text-xs font-bold shadow-inner"
                      style={{ backgroundColor: c.colorVariants[0].primaryColor }}
                    >
                      <span className="drop-shadow-[1px_1px_1px_#000] text-white text-[10px]">
                        {c.rarity.slice(0, 7)}
                      </span>
                    </div>
                    <div className="w-full">
                      <div className="text-[11px] font-bold text-white font-['Pixelify_Sans'] leading-tight">
                        {c.name}
                      </div>
                      <div className="text-[9px] text-[#fed7aa] font-mono mt-0.5">
                        +{c.baseScore} điểm
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Phụ kiện (Yêu cầu 2: Nằm ngay dưới khu vực chọn quần áo, chỉ hiện khi mở tủ) */}
          <div className="pt-2 border-t border-[#f59e0b]/30">
            <div className="text-[10px] text-[#fed7aa] font-bold font-mono mb-2 flex items-center justify-between">
              <span>PHỤ KIỆN (TỐI ĐA 2):</span>
              <span className="text-[#fef08a]">{equippedAccessories.length}/2 ĐÃ ĐEO</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {displayAccessories.map((acc) => {
                const isEquipped = equippedAccessories.some((a) => a.id === acc.id);
                return (
                  <button
                    key={acc.id}
                    onClick={() => {
                      retroAudio.playEquip();
                      onToggleAccessory(acc);
                    }}
                    className={`p-1.5 flex items-center justify-between border cursor-pointer transition-all ${
                      isEquipped
                        ? 'bg-[#047857]/90 border-[#fef08a] text-white shadow-sm'
                        : 'bg-black/50 border-[#78350f] text-[#fed7aa] hover:border-[#f59e0b]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="text-sm shrink-0">{acc.icon}</span>
                      <div className="truncate text-[10px] font-['Pixelify_Sans'] leading-tight">
                        {acc.name.split('(')[0]}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold shrink-0 ml-1">
                      {isEquipped ? '✓' : `+${acc.scoreBonus}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
