import React, { useState } from 'react';
import { Costume, Accessory, SceneId, AccessoryCategory } from '../types.ts';
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
  theme?: 'light' | 'dark';
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
  theme = 'dark',
}) => {
  // Accordion state: Quần áo & Phụ kiện
  const [isCostumeSectionOpen, setIsCostumeSectionOpen] = useState<boolean>(true);
  const [isAccessorySectionOpen, setIsAccessorySectionOpen] = useState<boolean>(true);

  // Lọc trang phục và phụ kiện theo giới tính
  const displayCostumes = costumes.filter(
    (c) => c.gender === gender || c.gender === 'unisex'
  );

  const displayAccessories = allAccessories.filter(
    (a) => a.gender === gender || a.gender === 'unisex'
  );

  // Phân 3 nhóm phụ kiện
  const headAccessories = displayAccessories.filter((a) => a.category === 'head');
  const jewelryAccessories = displayAccessories.filter((a) => a.category === 'jewelry');
  const feetAccessories = displayAccessories.filter((a) => a.category === 'feet');

  const getEquippedInCategory = (cat: AccessoryCategory) => {
    return equippedAccessories.find((a) => a.category === cat);
  };

  return (
    <div className="relative z-30 flex flex-col items-end">
      {/* ================= VẬT THỂ TƯƠNG TÁC (OBJECT THEO CẢNH) ================= */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            retroAudio.playBlip(isOpen ? 380 : 580);
            onToggle();
          }}
          className="group relative cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
          title={isOpen ? 'Đóng lại' : 'Chạm để mở tủ đồ'}
        >
          {/* Nhãn gợi ý phát sáng bồng bềnh */}
          <div
            className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 text-[10px] font-bold font-['Pixelify_Sans'] border shadow-md transition-all ${
              isOpen
                ? 'bg-[#b91c1c] text-white border-[#fef08a]'
                : 'bg-[#fef3c7] text-[#78350f] border-[#d97706] animate-bounce'
            }`}
          >
            {isOpen ? '✕ THU GỌN' : '✨ CHẠM ĐỂ MỞ'}
          </div>

          {/* ================= CẢNH 1: KHỐI MÂY TIÊN / VIÊN NGỌC HỒNG (BỒNG LAI) ================= */}
          {sceneId === 'bong-lai' && (
            <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
              <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-[0_8px_20px_rgba(244,63,94,0.6)]">
                {/* Hào quang mây hồng */}
                <circle cx="27" cy="27" r={isOpen ? 25 : 21} fill="rgba(251, 113, 133, 0.25)" className="animate-pulse" />
                <circle cx="27" cy="27" r="18" fill="rgba(244, 63, 94, 0.45)" />

                {/* Viên Ngọc Tiên ngũ sắc ở giữa */}
                <circle cx="27" cy="27" r="12" fill="#fda4af" stroke="#fff" strokeWidth="1.5" />
                <circle cx="27" cy="25" r="9" fill="#f43f5e" />
                <circle cx="24" cy="22" r="3" fill="#fff" />

                {/* Khối Mây Hồng uốn lượn xung quanh */}
                <path
                  d="M 12 36 C 8 36, 6 30, 12 28 C 10 22, 18 18, 22 22 C 26 16, 36 16, 38 22 C 44 20, 48 26, 44 32 C 48 36, 42 42, 36 40 C 32 44, 20 44, 16 40 C 12 42, 10 38, 12 36 Z"
                  fill="rgba(254, 205, 211, 0.85)"
                  stroke="#fb7185"
                  strokeWidth="1.2"
                />

                {isOpen && (
                  /* Khi mở: Các tia sáng vàng kim bùng nở */
                  <g id="cloud-sparkles">
                    <line x1="27" y1="4" x2="27" y2="10" stroke="#fef08a" strokeWidth="2" />
                    <line x1="27" y1="44" x2="27" y2="50" stroke="#fef08a" strokeWidth="2" />
                    <line x1="4" y1="27" x2="10" y2="27" stroke="#fef08a" strokeWidth="2" />
                    <line x1="44" y1="27" x2="50" y2="27" stroke="#fef08a" strokeWidth="2" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* ================= CẢNH 2: CHIẾC TRỐNG ĐỎ KHỔNG LỒ (SƠN THẦN TẾ ĐÀN) ================= */}
          {sceneId === 'son-than' && (
            <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
              <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-[0_8px_20px_rgba(185,28,28,0.7)]">
                {/* Chân giá đỡ gỗ */}
                <polygon points="12,48 18,36 36,36 42,48" fill="#451a03" />
                <line x1="16" y1="48" x2="38" y2="48" stroke="#78350f" strokeWidth="2" />

                {/* Thân Trống Đỏ Khổng Lồ */}
                <rect x="10" y="20" width="34" height="20" rx="3" fill="#991b1b" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="8" y="16" width="38" height="6" fill="#b91c1c" stroke="#fef08a" strokeWidth="1" />
                {/* Đinh đồng xung quanh tang trống */}
                <circle cx="14" cy="24" r="1.5" fill="#fef08a" />
                <circle cx="20" cy="24" r="1.5" fill="#fef08a" />
                <circle cx="27" cy="24" r="1.5" fill="#fef08a" />
                <circle cx="34" cy="24" r="1.5" fill="#fef08a" />
                <circle cx="40" cy="24" r="1.5" fill="#fef08a" />

                {/* Mặt trống da bò */}
                <ellipse cx="27" cy="18" rx="17" ry="5" fill="#fed7aa" stroke="#78350f" strokeWidth="1" />
                <ellipse cx="27" cy="18" rx="8" ry="2.5" fill="#fde68a" />

                {/* Dải lụa bay lượn quấn trống */}
                <path d="M 6 30 Q 16 12 27 26 Q 38 40 48 20" stroke="#f59e0b" strokeWidth="2.5" fill="none" opacity={isOpen ? 1 : 0.7} />
                <path d="M 4 22 Q 18 36 27 16 Q 36 4 48 32" stroke="#06b6d4" strokeWidth="2" fill="none" opacity={isOpen ? 1 : 0.6} />

                {isOpen && (
                  /* Mặt trống rung lên phát sáng hào quang */
                  <ellipse cx="27" cy="18" rx="17" ry="5" fill="rgba(254, 240, 138, 0.7)" className="animate-pulse" />
                )}
              </svg>
            </div>
          )}

          {/* ================= CẢNH 3: CUỐN THƯ HOÀNG GIA DÁT VÀNG (CỬU LONG) ================= */}
          {sceneId === 'cuu-long' && (
            <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
              <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-[0_8px_20px_rgba(245,158,11,0.7)]">
                {isOpen ? (
                  /* CUỐN THƯ CUỘN MỞ RA DẢI LỤA VÀNG */
                  <g id="scroll-opened">
                    {/* Trục cuốn thư trái & phải */}
                    <rect x="4" y="10" width="6" height="34" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="44" y="10" width="6" height="34" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    {/* Dải lụa vàng mở bung */}
                    <rect x="8" y="14" width="38" height="26" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                    {/* Họa tiết rồng phượng trên cuốn thư */}
                    <path d="M 12 20 Q 20 28 27 18 Q 34 30 42 22" stroke="#b91c1c" strokeWidth="1.5" fill="none" />
                    <circle cx="27" cy="27" r="4" fill="#f59e0b" />
                    <rect x="14" y="32" width="26" height="2" fill="#b45309" />
                  </g>
                ) : (
                  /* CUỐN THƯ ĐANG CUỘN TRÒN THẮT DÂY ĐỎ */
                  <g id="scroll-closed">
                    <rect x="10" y="22" width="34" height="12" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                    {/* Hai đầu trục gỗ ngọc */}
                    <circle cx="10" cy="28" r="5" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <circle cx="44" cy="28" r="5" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    {/* Dải dây thắt đỏ bọc ngọc */}
                    <rect x="24" y="20" width="6" height="16" fill="#b91c1c" />
                    <circle cx="27" cy="28" r="3" fill="#fef08a" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* ================= CẢNH 4: TỦ GỖ LIM SƠN SON THẾP VÀNG KHẢM TRAI (CUNG ĐÌNH) ================= */}
          {sceneId === 'cung-dinh' && (
            <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
              <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-[0_8px_20px_rgba(217,119,6,0.7)]">
                {/* Mái vòm nóc tủ chạm rồng cung đình */}
                <path d="M 6 12 Q 27 6 48 12 L 46 16 L 8 16 Z" fill="#991b1b" stroke="#f59e0b" strokeWidth="1.2" />
                <rect x="23" y="4" width="8" height="4" fill="#f59e0b" rx="1" />

                {/* Thân tủ gỗ lim đỏ sẫm viền vàng */}
                <rect x="8" y="16" width="38" height="32" rx="1" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                
                {/* Chân quỳ chạm trổ */}
                <rect x="10" y="48" width="5" height="4" fill="#290e03" />
                <rect x="39" y="48" width="5" height="4" fill="#290e03" />

                {isOpen ? (
                  /* KHI MỞ: HAI CÁNH CỬA MỞ TOANG, ÁNH HOÀNG KIM PHÁT SÁNG TỪ BÊN TRONG */
                  <g id="wardrobe-open">
                    {/* Bên trong tủ phát sáng vàng kim */}
                    <rect x="12" y="18" width="30" height="28" fill="#fef3c7" className="animate-pulse" />
                    {/* Ngăn treo y phục gấm vóc */}
                    <line x1="14" y1="22" x2="40" y2="22" stroke="#b45309" strokeWidth="1.5" />
                    <rect x="18" y="22" width="6" height="18" fill="#b91c1c" />
                    <rect x="26" y="22" width="6" height="20" fill="#0284c7" />
                    <rect x="34" y="22" width="4" height="16" fill="#15803d" />
                    
                    {/* Cánh cửa trái mở góc nghiêng */}
                    <polygon points="8,16 12,18 12,46 8,48" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    {/* Cánh cửa phải mở góc nghiêng */}
                    <polygon points="46,16 42,18 42,46 46,48" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    {/* Hào quang lấp lánh */}
                    <circle cx="27" cy="28" r="4" fill="#fef08a" opacity="0.8" />
                  </g>
                ) : (
                  /* KHI ĐÓNG: HAI CÁNH CỬA GỖ KHẢM XÀ CỪ VÀ KHÓA ĐỒNG TRÒN */
                  <g id="wardrobe-closed">
                    {/* Cánh trái */}
                    <rect x="10" y="18" width="16" height="28" fill="#5c2007" stroke="#b45309" strokeWidth="0.8" />
                    {/* Khảm xà cừ hoa văn hoa sen trên cánh trái */}
                    <circle cx="18" cy="28" r="4" fill="#fed7aa" stroke="#fef08a" strokeWidth="0.6" />
                    
                    {/* Cánh phải */}
                    <rect x="28" y="18" width="16" height="28" fill="#5c2007" stroke="#b45309" strokeWidth="0.8" />
                    {/* Khảm xà cừ cánh phải */}
                    <circle cx="36" cy="28" r="4" fill="#fed7aa" stroke="#fef08a" strokeWidth="0.6" />

                    {/* Khe giữa hai cánh cửa */}
                    <line x1="27" y1="18" x2="27" y2="46" stroke="#290e03" strokeWidth="1.5" />
                    
                    {/* Khóa đồng tròn hoàng cung */}
                    <circle cx="27" cy="32" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
                    <circle cx="27" cy="32" r="2" fill="#451a03" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* ================= CẢNH 5: ĐÀI SEN NGỌC BÍCH KHỔNG LỒ (ĐẦM SEN) ================= */}
          {sceneId === 'dam-sen' && (
            <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
              <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-[0_8px_20px_rgba(244,63,94,0.7)]">
                {/* Lá sen lớn nâng đỡ dưới đáy */}
                <ellipse cx="27" cy="46" rx="22" ry="6" fill="#047857" stroke="#065f46" strokeWidth="1.2" />
                <path d="M 12 46 Q 27 49 42 46" stroke="#34d399" strokeWidth="1" fill="none" />

                {/* Sóng nước đầm sen dập dềnh */}
                <path d="M 6 49 Q 16 52 27 49 Q 38 52 48 49" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8" />

                {isOpen ? (
                  /* KHI MỞ: ĐÀI HOA SEN BUNG NỞ TRỌN VẸN, NHỤY VÀNG TỎA SÁNG LUNG LINH */
                  <g id="lotus-blooming">
                    {/* Nhụy sen vàng rực rỡ */}
                    <ellipse cx="27" cy="28" rx="10" ry="7" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" className="animate-pulse" />
                    <circle cx="23" cy="27" r="1.5" fill="#ca8a04" />
                    <circle cx="27" cy="28" r="1.5" fill="#ca8a04" />
                    <circle cx="31" cy="27" r="1.5" fill="#ca8a04" />
                    
                    {/* Cánh sen hồng nở rộng hai bên và phía trước */}
                    <path d="M 6 36 C 8 20, 20 28, 27 34 C 34 28, 46 20, 48 36 C 42 46, 12 46, 6 36 Z" fill="#f43f5e" opacity="0.85" />
                    <path d="M 12 38 C 16 26, 23 30, 27 35 C 31 30, 38 26, 42 38 C 36 44, 18 44, 12 38 Z" fill="#fda4af" stroke="#fff" strokeWidth="1" />
                    {/* Hạt ngọc sương mai */}
                    <circle cx="27" cy="20" r="2.5" fill="#fff" className="animate-ping" opacity="0.8" />
                  </g>
                ) : (
                  /* KHI ĐÓNG: BÚP HOA SEN HỒNG NGỌC CHÚM CHÍM E ẤP */
                  <g id="lotus-bud">
                    {/* Búp sen cánh ngoài */}
                    <path
                      d="M 27 12 C 16 22, 12 34, 16 42 C 20 46, 34 46, 38 42 C 42 34, 38 22, 27 12 Z"
                      fill="#e11d48"
                      stroke="#f43f5e"
                      strokeWidth="1.2"
                    />
                    {/* Cánh sen lớp trong viền trắng hồng */}
                    <path
                      d="M 27 15 C 20 24, 18 34, 21 40 C 24 43, 30 43, 33 40 C 36 34, 34 24, 27 15 Z"
                      fill="#fda4af"
                      stroke="#fff"
                      strokeWidth="0.8"
                    />
                    {/* Chóp búp sen hồng thắm */}
                    <path d="M 27 10 L 25 16 L 29 16 Z" fill="#be123c" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* ================= CẢNH 6: RƯƠNG CỔ & ĐÈN LỒNG NGŨ SẮC (PHỐ CỔ HỘI AN) ================= */}
          {sceneId === 'hoi-an' && (
            <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
              <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-[0_8px_20px_rgba(249,115,22,0.7)]">
                {/* Đèn lồng treo đung đưa phía trên rương */}
                <line x1="27" y1="2" x2="27" y2="8" stroke="#78350f" strokeWidth="1.2" />
                <ellipse cx="27" cy="13" rx="7" ry="5.5" fill="#ea580c" stroke="#fef08a" strokeWidth="1" className={isOpen ? 'animate-pulse' : ''} />
                <line x1="27" y1="18.5" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.5" />
                <circle cx="27" cy="23.5" r="1" fill="#fef08a" />

                {/* Rương Cổ Gỗ Phố Hội */}
                <rect x="8" y="28" width="38" height="20" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Chân rương bọc đồng */}
                <rect x="8" y="47" width="5" height="3" fill="#b45309" />
                <rect x="41" y="47" width="5" height="3" fill="#b45309" />

                {isOpen ? (
                  /* KHI MỞ: NẮP RƯƠNG MỞ LÊN, ÁNH ĐÈN LỒNG CHIẾU SÁNG Y PHỤC LỤA PHỐ */
                  <g id="chest-open">
                    {/* Nắp rương hất lên */}
                    <polygon points="6,20 48,20 46,28 8,28" fill="#92400e" stroke="#f59e0b" strokeWidth="1.2" />
                    {/* Bên trong rương chứa đầy lụa là gấm vóc phát sáng */}
                    <rect x="10" y="28" width="34" height="10" fill="#fef3c7" />
                    <rect x="13" y="29" width="8" height="8" fill="#e11d48" />
                    <rect x="23" y="29" width="8" height="8" fill="#0284c7" />
                    <rect x="33" y="29" width="8" height="8" fill="#ca8a04" />
                    {/* Hào quang hoa đăng */}
                    <circle cx="27" cy="33" r="3" fill="#fff" className="animate-ping" />
                  </g>
                ) : (
                  /* KHI ĐÓNG: NẮP RƯƠNG BO TRÒN BỌC GAI ĐỒNG VÀ KHÓA ĐỒNG CỔ */
                  <g id="chest-closed">
                    {/* Nắp rương vòm cong */}
                    <path d="M 8 28 Q 27 22 46 28 L 46 30 L 8 30 Z" fill="#92400e" stroke="#f59e0b" strokeWidth="1.2" />
                    {/* Đai kim loại bọc quanh rương */}
                    <line x1="16" y1="26" x2="16" y2="48" stroke="#f59e0b" strokeWidth="1.5" />
                    <line x1="38" y1="26" x2="38" y2="48" stroke="#f59e0b" strokeWidth="1.5" />
                    {/* Khóa rương cổ */}
                    <rect x="24" y="28" width="6" height="7" rx="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
                    <circle cx="27" cy="32" r="1.2" fill="#78350f" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Tên vật thể */}
          <div className="text-[10px] text-[#fef08a] bg-black/80 px-2 py-0.5 border border-[#f59e0b] font-mono mt-1 text-center whitespace-nowrap">
            {sceneId === 'bong-lai' && 'MÂY TIÊN BỒNG LAI'}
            {sceneId === 'son-than' && 'TRỐNG THIÊNG SƠN THẦN'}
            {sceneId === 'cuu-long' && 'CỬU LONG THÁNH CHỈ'}
            {sceneId === 'cung-dinh' && 'TỦ GỖ LIM KHẢM TRAI'}
            {sceneId === 'dam-sen' && 'ĐÀI SEN BÁCH DIỆP'}
            {sceneId === 'hoi-an' && 'RƯƠNG CỔ & ĐÈN LỒNG'}
          </div>
        </button>
      </div>

      {/* ================= GIAO DIỆN ACCORDION (PANEL THU GỌN / MỞ RỘNG) ================= */}
      {isOpen && (
        <div
          className={`absolute right-0 top-36 w-[310px] sm:w-[360px] max-h-[76vh] overflow-y-auto p-3 border-2 shadow-[0_16px_40px_rgba(0,0,0,0.85)] z-40 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-lg ${
            theme === 'light'
              ? 'bg-[#FFFFE3] border-[#FED2B7] text-[#5A2D2D]'
              : 'bg-[#050B31]/95 border-[#1F3C73] text-[#FFFFFF]'
          }`}
          style={{ imageRendering: 'auto' }}
        >
          {/* Header Bảng Điều Khiển */}
          <div
            className={`flex items-center justify-between pb-2 border-b ${
              theme === 'light' ? 'border-[#FED2B7]' : 'border-[#1F3C73]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">
                {sceneId === 'bong-lai'
                  ? '☁️'
                  : sceneId === 'son-than'
                  ? '🥁'
                  : sceneId === 'cuu-long'
                  ? '📜'
                  : sceneId === 'cung-dinh'
                  ? '🏛️'
                  : sceneId === 'dam-sen'
                  ? '🪷'
                  : '🏮'}
              </span>
              <h4
                className={`text-xs font-bold font-['Pixelify_Sans'] uppercase tracking-wide ${
                  theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'
                }`}
              >
                KHO VIỆT PHỤC {gender === 'male' ? 'NAM NHI' : 'NỮ QUÝ TỘC'}
              </h4>
            </div>
            <button
              onClick={onToggle}
              className={`text-xs w-5 h-5 flex items-center justify-center border cursor-pointer ${
                theme === 'light'
                  ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] hover:bg-[#ff9393]'
                  : 'bg-[#b91c1c] text-white border-[#fef08a] hover:bg-[#dc2626]'
              }`}
            >
              ✕
            </button>
          </div>

          {/* ================= ACCORDION PANEL 1: CHỌN Y PHỤC ================= */}
          <div
            className={`border overflow-hidden transition-all duration-200 ${
              theme === 'light'
                ? 'bg-[#FFFFE3] border-[#FED2B7]'
                : 'bg-[#0E2045]/60 border-[#1F3C73]'
            }`}
          >
            <button
              onClick={() => {
                retroAudio.playBlip(440);
                setIsCostumeSectionOpen((prev) => !prev);
              }}
              className={`w-full flex items-center justify-between p-2 cursor-pointer border-b transition-colors ${
                theme === 'light'
                  ? 'bg-[#FFFFE3] hover:bg-[#FED2B7]/40 border-[#FED2B7]'
                  : 'bg-[#0E2045] hover:bg-[#1F3C73] border-[#1F3C73]'
              }`}
            >
              <div
                className={`flex items-center gap-1.5 text-[11px] font-bold font-['Pixelify_Sans'] ${
                  theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'
                }`}
              >
                <span>👘 1. CHỌN Y PHỤC HOÀNG TRIỀU</span>
                <span
                  className={`text-[9px] font-mono ${
                    theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'
                  }`}
                >
                  ({selectedCostume.name})
                </span>
              </div>
              <span
                className={`text-xs font-mono ${
                  theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'
                }`}
              >
                {isCostumeSectionOpen ? '▲' : '▼'}
              </span>
            </button>

            {isCostumeSectionOpen && (
              <div className="p-2 grid grid-cols-2 gap-2 animate-in fade-in duration-150">
                {displayCostumes.map((c) => {
                  const isSelected = c.id === selectedCostume.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        retroAudio.playEquip();
                        onSelectCostume(c);
                      }}
                      className={`p-2 flex flex-col items-center gap-1 border-2 cursor-pointer transition-all text-left ${
                        isSelected
                          ? theme === 'light'
                            ? 'bg-[#FED2B7] border-[#FFBFA0] shadow-[0_0_12px_rgba(254,210,183,0.8)] text-[#5A2D2D]'
                            : 'bg-[#1F3C73] border-[#FFF3CB] shadow-[0_0_12px_rgba(255,243,203,0.5)] text-white'
                          : theme === 'light'
                          ? 'bg-white/80 border-[#FED2B7]/70 text-[#5A2D2D] hover:bg-[#FED2B7]/30'
                          : 'bg-[#050B31]/80 border-[#1F3C73] text-[#CBD5E1] hover:border-[#FFF3CB]'
                      }`}
                    >
                      <div
                        className="w-full h-7 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                        style={{ backgroundColor: c.colorVariants[0].primaryColor }}
                      >
                        {c.rarity.slice(0, 7)}
                      </div>
                      <div className="w-full">
                        <div
                          className={`text-[11px] font-bold font-['Pixelify_Sans'] truncate ${
                            isSelected && theme === 'light' ? 'text-[#5A2D2D]' : ''
                          }`}
                        >
                          {c.name}
                        </div>
                        <div
                          className={`text-[9px] font-mono ${
                            theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'
                          }`}
                        >
                          +{c.baseScore} điểm
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= ACCORDION PANEL 2: PHỤ KIỆN (CHỌN ĐỘC QUYỀN THEO 3 NHÓM) ================= */}
          <div
            className={`border overflow-hidden transition-all duration-200 ${
              theme === 'light'
                ? 'bg-[#FFFFE3] border-[#FED2B7]'
                : 'bg-[#0E2045]/60 border-[#1F3C73]'
            }`}
          >
            <button
              onClick={() => {
                retroAudio.playBlip(440);
                setIsAccessorySectionOpen((prev) => !prev);
              }}
              className={`w-full flex items-center justify-between p-2 cursor-pointer border-b transition-colors ${
                theme === 'light'
                  ? 'bg-[#FFFFE3] hover:bg-[#FED2B7]/40 border-[#FED2B7]'
                  : 'bg-[#0E2045] hover:bg-[#1F3C73] border-[#1F3C73]'
              }`}
            >
              <div
                className={`flex items-center gap-1.5 text-[11px] font-bold font-['Pixelify_Sans'] ${
                  theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'
                }`}
              >
                <span>💎 2. PHỤ KIỆN THEO NHÓM</span>
                <span
                  className={`text-[9px] font-mono ${
                    theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'
                  }`}
                >
                  ({equippedAccessories.length}/3 món)
                </span>
              </div>
              <span
                className={`text-xs font-mono ${
                  theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'
                }`}
              >
                {isAccessorySectionOpen ? '▲' : '▼'}
              </span>
            </button>

            {isAccessorySectionOpen && (
              <div className="p-2 flex flex-col gap-2.5 animate-in fade-in duration-150">
                <p
                  className={`text-[9px] font-content italic ${
                    theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'
                  }`}
                >
                  *Mỗi nhóm (Nón, Trang sức, Giày) chọn tối đa 1 món (chọn món mới sẽ tự gỡ món cũ).
                </p>

                {/* --- NHÓM 1: NÓN / MŨ / KHĂN ĐỘI ĐẦU --- */}
                <div
                  className={`p-1.5 border ${
                    theme === 'light'
                      ? 'bg-white/60 border-[#FED2B7]'
                      : 'bg-[#050B31]/70 border-[#1F3C73]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono mb-1">
                    <span className={theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'}>
                      👑 NHÓM 1: NÓN / MŨ / KHĂN ĐỘI:
                    </span>
                    <span
                      className={`text-[9px] ${
                        theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#86efac]'
                      }`}
                    >
                      {getEquippedInCategory('head')?.name.split(' ')[0] || 'Chưa chọn'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {headAccessories.map((acc) => {
                      const isEquipped = equippedAccessories.some((a) => a.id === acc.id);
                      return (
                        <button
                          key={acc.id}
                          onClick={() => {
                            retroAudio.playEquip();
                            onToggleAccessory(acc);
                          }}
                          className={`p-1.5 flex items-center justify-between border cursor-pointer text-left transition-all ${
                            isEquipped
                              ? theme === 'light'
                                ? 'bg-[#FED2B7] border-[#FFBFA0] text-[#5A2D2D] font-bold shadow-sm'
                                : 'bg-[#047857] border-[#FFF3CB] text-white shadow-sm'
                              : theme === 'light'
                              ? 'bg-white/80 border-[#FED2B7]/60 text-[#5A2D2D] hover:bg-[#FED2B7]/40'
                              : 'bg-black/60 border-white/10 text-[#fed7aa] hover:border-[#1F3C73]'
                          }`}
                        >
                          <div className="flex items-center gap-1 overflow-hidden">
                            <span>{acc.icon}</span>
                            <span className="text-[10px] font-['Pixelify_Sans'] truncate">
                              {acc.name.split('(')[0]}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono font-bold shrink-0">
                            {isEquipped ? '✓' : `+${acc.scoreBonus}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* --- NHÓM 2: TRANG SỨC / CẦM TAY --- */}
                <div
                  className={`p-1.5 border ${
                    theme === 'light'
                      ? 'bg-white/60 border-[#FED2B7]'
                      : 'bg-[#050B31]/70 border-[#1F3C73]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono mb-1">
                    <span className={theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'}>
                      🪭 NHÓM 2: TRANG SỨC / CẦM TAY:
                    </span>
                    <span
                      className={`text-[9px] ${
                        theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#86efac]'
                      }`}
                    >
                      {getEquippedInCategory('jewelry')?.name.split(' ')[0] || 'Chưa chọn'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {jewelryAccessories.map((acc) => {
                      const isEquipped = equippedAccessories.some((a) => a.id === acc.id);
                      return (
                        <button
                          key={acc.id}
                          onClick={() => {
                            retroAudio.playEquip();
                            onToggleAccessory(acc);
                          }}
                          className={`p-1.5 flex items-center justify-between border cursor-pointer text-left transition-all ${
                            isEquipped
                              ? theme === 'light'
                                ? 'bg-[#FED2B7] border-[#FFBFA0] text-[#5A2D2D] font-bold shadow-sm'
                                : 'bg-[#047857] border-[#FFF3CB] text-white shadow-sm'
                              : theme === 'light'
                              ? 'bg-white/80 border-[#FED2B7]/60 text-[#5A2D2D] hover:bg-[#FED2B7]/40'
                              : 'bg-black/60 border-white/10 text-[#fed7aa] hover:border-[#1F3C73]'
                          }`}
                        >
                          <div className="flex items-center gap-1 overflow-hidden">
                            <span>{acc.icon}</span>
                            <span className="text-[10px] font-['Pixelify_Sans'] truncate">
                              {acc.name.split('(')[0]}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono font-bold shrink-0">
                            {isEquipped ? '✓' : `+${acc.scoreBonus}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* --- NHÓM 3: GIÀY / HÀI / GUỐC --- */}
                <div
                  className={`p-1.5 border ${
                    theme === 'light'
                      ? 'bg-white/60 border-[#FED2B7]'
                      : 'bg-[#050B31]/70 border-[#1F3C73]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono mb-1">
                    <span className={theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#FFF3CB]'}>
                      👠 NHÓM 3: GIÀY / HÀI / GUỐC:
                    </span>
                    <span
                      className={`text-[9px] ${
                        theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#86efac]'
                      }`}
                    >
                      {getEquippedInCategory('feet')?.name.split(' ')[0] || 'Chưa chọn'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {feetAccessories.map((acc) => {
                      const isEquipped = equippedAccessories.some((a) => a.id === acc.id);
                      return (
                        <button
                          key={acc.id}
                          onClick={() => {
                            retroAudio.playEquip();
                            onToggleAccessory(acc);
                          }}
                          className={`p-1.5 flex items-center justify-between border cursor-pointer text-left transition-all ${
                            isEquipped
                              ? theme === 'light'
                                ? 'bg-[#FED2B7] border-[#FFBFA0] text-[#5A2D2D] font-bold shadow-sm'
                                : 'bg-[#047857] border-[#FFF3CB] text-white shadow-sm'
                              : theme === 'light'
                              ? 'bg-white/80 border-[#FED2B7]/60 text-[#5A2D2D] hover:bg-[#FED2B7]/40'
                              : 'bg-black/60 border-white/10 text-[#fed7aa] hover:border-[#1F3C73]'
                          }`}
                        >
                          <div className="flex items-center gap-1 overflow-hidden">
                            <span>{acc.icon}</span>
                            <span className="text-[10px] font-['Pixelify_Sans'] truncate">
                              {acc.name.split('(')[0]}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono font-bold shrink-0">
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

        </div>
      )}
    </div>
  );
};
