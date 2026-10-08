/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { COSTUMES_DATA, FEMALE_COSTUMES, MALE_COSTUMES } from './data/costumes.ts';
import { Costume, ColorVariant, Accessory } from './types.ts';
import { PixelCharacter } from './components/PixelCharacter.tsx';
import { WardrobeGrid } from './components/WardrobeGrid.tsx';
import { AccessoriesGrid } from './components/AccessoriesGrid.tsx';
import { ScoreFeedbackPanel } from './components/ScoreFeedbackPanel.tsx';
import { DetailsBox } from './components/DetailsBox.tsx';
import { AnatomyModal } from './components/AnatomyModal.tsx';
import { SingleFileExportModal } from './components/SingleFileExportModal.tsx';
import { VillageFestivalModal } from './components/VillageFestivalModal.tsx';
import { calculateScore } from './utils/scoring.ts';
import { retroAudio } from './utils/audio.ts';

export default function App() {
  // Giới tính (Mặc định Nữ quý tộc)
  const [gender, setGender] = useState<'female' | 'male'>('female');

  // Trang phục & Biến thể màu sắc
  const [selectedCostume, setSelectedCostume] = useState<Costume>(FEMALE_COSTUMES[0]);
  const [activeVariant, setActiveVariant] = useState<ColorVariant>(
    FEMALE_COSTUMES[0].colorVariants[0]
  );

  // Phụ kiện trang bị (Tối đa 2 phụ kiện cùng lúc)
  const [equippedAccessories, setEquippedAccessories] = useState<Accessory[]>([]);

  // Tùy chỉnh Model & Môi trường
  const [pose, setPose] = useState<'idle' | 'salute' | 'fan'>('idle');
  const [zoom, setZoom] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bgmPlaying, setBgmPlaying] = useState<boolean>(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(true);

  // Modals
  const [isAnatomyOpen, setIsAnatomyOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isFestivalOpen, setIsFestivalOpen] = useState<boolean>(false); // Modal Lễ Hội Làng Mini-games

  // Khi chuyển Giới tính: Cập nhật trang phục tương ứng và xóa phụ kiện không hợp lệ
  const handleGenderToggle = (newGender: 'female' | 'male') => {
    if (newGender === gender) return;
    setGender(newGender);
    retroAudio.playBlip(440);

    const targetList = newGender === 'female' ? FEMALE_COSTUMES : MALE_COSTUMES;
    setSelectedCostume(targetList[0]);
    setActiveVariant(targetList[0].colorVariants[0]);
    setEquippedAccessories([]);
  };

  // Tính điểm đánh giá phối đồ dựa trên hàm calculateScore()
  const scoreEvaluation = useMemo(() => {
    return calculateScore(selectedCostume, equippedAccessories);
  }, [selectedCostume, equippedAccessories]);

  // Âm thanh khi điểm số thay đổi
  useEffect(() => {
    if (scoreEvaluation.status === 'perfect') {
      retroAudio.playEquip();
    } else if (scoreEvaluation.status === 'danger') {
      retroAudio.playBlip(200);
    }
  }, [scoreEvaluation.status, scoreEvaluation.score]);

  // Chuyển trang phục
  const handleSelectCostume = useCallback((costume: Costume) => {
    setSelectedCostume(costume);
    setActiveVariant(costume.colorVariants[0]);
  }, []);

  // Mặc / Tháo phụ kiện (Tối đa 2 phụ kiện)
  const handleToggleAccessory = (accessory: Accessory) => {
    setEquippedAccessories((prev) => {
      const exists = prev.some((a) => a.id === accessory.id);
      if (exists) {
        return prev.filter((a) => a.id !== accessory.id);
      }
      if (prev.length >= 2) {
        // Thay thế món đầu tiên để luôn giữ tối đa 2 món
        return [prev[1], accessory];
      }
      return [...prev, accessory];
    });
  };

  // Phím tắt
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const currentList = gender === 'female' ? FEMALE_COSTUMES : MALE_COSTUMES;
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (currentList[idx]) {
          retroAudio.playEquip();
          handleSelectCostume(currentList[idx]);
        }
      } else if (e.key.toLowerCase() === 'm') {
        toggleSound();
      } else if (e.key.toLowerCase() === 'b') {
        toggleBgm();
      } else if (e.key === 'Escape') {
        setIsAnatomyOpen(false);
        setIsExportOpen(false);
        setIsFestivalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gender, handleSelectCostume]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    retroAudio.enabled = next;
    if (next) retroAudio.playBlip(520);
    else if (bgmPlaying) {
      retroAudio.toggleBgm(false);
      setBgmPlaying(false);
    }
  };

  const toggleBgm = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      retroAudio.enabled = true;
    }
    const next = retroAudio.toggleBgm();
    setBgmPlaying(next);
  };

  return (
    <div className="min-h-screen bg-[#faf5ef] text-[#1e1305] flex flex-col relative overflow-x-hidden selection:bg-[#b91c1c] selection:text-white">
      {/* Scanlines CRT vintage */}
      {scanlinesEnabled && <div className="scanlines fixed inset-0 z-40" />}

      {/* ================= TOP NAVIGATION BAR (SÁNG & CUNG ĐÌNH) ================= */}
      <header className="bg-gradient-to-r from-[#78350f] via-[#991b1b] to-[#78350f] text-white border-b-4 border-[#3b2803] px-3 py-2.5 md:px-6 shadow-[0_4px_16px_rgba(0,0,0,0.4)] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Tiêu đề */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fef08a] border-3 border-[#3b2803] shadow-[2px_2px_0_#000] flex items-center justify-center text-xl select-none shrink-0">
              {gender === 'male' ? '🐉' : '🪷'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-lg font-bold text-[#fef08a] tracking-wider uppercase font-['Pixelify_Sans'] drop-shadow-[2px_2px_#000]">
                  VIỆT PHỤC PIXEL ART
                </h1>
                <span className="text-[10px] bg-[#f59e0b] text-[#1e1305] px-1.5 py-0.2 border border-white font-mono font-bold">
                  8-BIT HOÀNG TRIỀU
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-[#fed7aa]">
                Bách Phục Cổ Truyền • Phối Đồ Chuẩn Mực & Lễ Hội Dân Gian
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {/* NÚT THAM GIA LỄ HỘI LÀNG (CANVAS MINI-GAMES) */}
            <button
              onClick={() => {
                retroAudio.playBlip(560);
                setIsFestivalOpen(true);
              }}
              className="px-3 py-1.5 text-xs font-bold bg-[#b91c1c] hover:bg-[#dc2626] border-2 border-[#fef08a] text-white cursor-pointer shadow-[2px_2px_0_#000] active:translate-y-0.5 flex items-center gap-1.5 animate-pulse"
              title="Mở khu trò chơi dân gian: Trẩy hội ném còn & Gánh lụa qua cầu"
            >
              <span>🏮</span>
              <span>THAM GIA LỄ HỘI LÀNG</span>
            </button>

            {/* Xuất Mã Nguồn Đơn Tệp */}
            <button
              onClick={() => {
                retroAudio.playBlip(480);
                setIsExportOpen(true);
              }}
              className="px-2.5 py-1 text-xs font-bold bg-[#78350f] hover:bg-[#92400e] border-2 border-[#fef08a] text-[#fff8e1] cursor-pointer shadow-[2px_2px_0_#000] active:translate-y-0.5 flex items-center gap-1"
              title="Xem và sao chép toàn bộ mã nguồn HTML/CSS/JS đơn tệp"
            >
              <span>📋</span>
              <span className="hidden sm:inline">MÃ NGUỒN</span>
            </button>

            {/* BGM Toggle */}
            <button
              onClick={toggleBgm}
              className={`px-2 py-1 text-xs font-mono border-2 cursor-pointer shadow-[2px_2px_0_#000] active:translate-y-0.5 flex items-center gap-1 ${
                bgmPlaying
                  ? 'bg-[#fef08a] text-[#1e1305] border-white font-bold'
                  : 'bg-[#451a03] text-[#fed7aa] border-[#d97706]'
              }`}
              title="Nhã nhạc cung đình ngũ cung"
            >
              <span>{bgmPlaying ? '🎵' : '🔇'}</span>
              <span className="hidden sm:inline">BGM: {bgmPlaying ? 'BẬT' : 'TẮT'}</span>
            </button>

            {/* SFX Toggle */}
            <button
              onClick={toggleSound}
              className={`px-2 py-1 text-xs font-mono border-2 cursor-pointer shadow-[2px_2px_0_#000] active:translate-y-0.5 ${
                soundEnabled
                  ? 'bg-[#b45309] text-white border-[#fef08a]'
                  : 'bg-[#451a03] text-[#a8a29e] border-[#78350f]'
              }`}
            >
              {soundEnabled ? '🔊 SFX' : '🔇 MUTE'}
            </button>

            {/* CRT Scanline Toggle */}
            <button
              onClick={() => {
                retroAudio.playBlip(380);
                setScanlinesEnabled(!scanlinesEnabled);
              }}
              className={`px-2 py-1 text-xs font-mono border-2 cursor-pointer shadow-[2px_2px_0_#000] active:translate-y-0.5 ${
                scanlinesEnabled
                  ? 'bg-[#b45309] text-white border-[#fef08a]'
                  : 'bg-[#451a03] text-[#a8a29e] border-[#78350f]'
              }`}
            >
              📺 CRT
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN APPLICATION VIEWPORT ================= */}
      <main className="max-w-7xl mx-auto w-full p-2.5 sm:p-4 flex-1 flex flex-col gap-4 z-10">
        
        {/* HÀNG TRÊN: Main Stage (Cột Trái 7 cols) & Tủ đồ + Phụ kiện (Cột Phải 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* ================= CỘT TRUNG TÂM (7 COLS): MODEL -> BẢNG ĐIỂM -> BẢNG THÔNG SỐ (XẾP DỌC MẠCH LẠC) ================= */}
          <section className="lg:col-span-7 flex flex-col gap-3.5">
            
            {/* 1. KHU VỰC MODEL (MAIN STAGE) */}
            <div className="flex flex-col border-3 pixel-carved-gold shadow-md overflow-hidden bg-[#faf6ed]">
              {/* Header thanh tiêu đề */}
              <div
                className={`flex items-center justify-between px-3.5 py-2.5 border-b-2 ${
                  gender === 'male'
                    ? 'bg-[#1e3a5f] text-white border-[#f59e0b]'
                    : 'bg-[#831843] text-white border-[#f59e0b]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 bg-[#fef08a] border border-black inline-block" />
                  <span className="font-bold tracking-wide uppercase font-['Pixelify_Sans'] text-[#fef08a]">
                    CHÁNH ĐIỆN {gender === 'male' ? 'ĐẠI TRIỀU (NAM GIỚI)' : 'HẬU CUNG (NỮ TỘC)'}
                  </span>
                </div>
                <div className="text-[11px] flex items-center gap-2">
                  <span className="bg-black/30 px-2 py-0.5 border border-white/40 text-white">
                    {selectedCostume.name}
                  </span>
                  <span className="text-[#fef08a] font-mono">[{activeVariant.name}]</span>
                </div>
              </div>

              {/* Viewport Model với hình nền phân biệt Nam (Rồng Mây Vàng Lam) vs Nữ (Hoa Sen Sóng Nước) */}
              <div
                className={`relative min-h-[360px] md:min-h-[390px] flex items-center justify-center overflow-hidden transition-all duration-300 ${
                  gender === 'male' ? 'bg-court-male' : 'bg-court-female'
                }`}
              >
                {/* Họa tiết cung đình nền mờ */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-25">
                  <svg viewBox="0 0 400 120" className="w-full h-32" preserveAspectRatio="none">
                    <rect x="0" y="70" width="400" height="50" fill={gender === 'male' ? '#0f172a' : '#4a154b'} />
                    <polygon points="120,70 140,50 260,50 280,70" fill={gender === 'male' ? '#1e3a5f' : '#831843'} />
                    <polygon points="140,50 160,35 240,35 260,50" fill="#f59e0b" />
                    <rect x="150" y="70" width="6" height="50" fill="#b91c1c" />
                    <rect x="250" y="70" width="6" height="50" fill="#b91c1c" />
                  </svg>
                </div>

                {/* Đèn lồng Pixel */}
                <div className="absolute top-3 left-4 md:left-8 z-10 animate-lantern">
                  <svg width="28" height="46" viewBox="0 0 16 28" style={{ shapeRendering: 'crispEdges' }}>
                    <line x1="8" y1="0" x2="8" y2="6" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="3" y="6" width="10" height="14" fill="#b91c1c" />
                    <rect x="5" y="8" width="6" height="10" fill="#fef08a" />
                    <rect x="7" y="20" width="2" height="7" fill="#b91c1c" />
                  </svg>
                </div>

                <div className="absolute top-3 right-4 md:right-8 z-10 animate-lantern" style={{ animationDelay: '0.8s' }}>
                  <svg width="28" height="46" viewBox="0 0 16 28" style={{ shapeRendering: 'crispEdges' }}>
                    <line x1="8" y1="0" x2="8" y2="6" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="3" y="6" width="10" height="14" fill="#b91c1c" />
                    <rect x="5" y="8" width="6" height="10" fill="#fef08a" />
                    <rect x="7" y="20" width="2" height="7" fill="#b91c1c" />
                  </svg>
                </div>

                {/* Model Pixel trên bục đứng */}
                <div className="relative z-20">
                  <PixelCharacter
                    costume={selectedCostume}
                    activeVariant={activeVariant}
                    gender={gender}
                    pose={pose}
                    zoom={zoom}
                    equippedAccessories={equippedAccessories}
                  />
                </div>

                {/* Nhãn sàn */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[#fef08a] bg-black/75 px-3 py-1 border border-[#f59e0b] pointer-events-none font-mono">
                  {gender === 'female' ? '🪷 NỮ QUÝ TỘC' : '🐉 NAM QUAN VIÊN'} • {selectedCostume.name.toUpperCase()}
                </div>
              </div>

              {/* Thanh điều khiển: Nút MÔ HÌNH (GENDER TOGGLE), Tư thế, Kính lúp */}
              <div className="p-2.5 bg-[#fef3c7] border-t-2 border-[#d97706]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* NÚT MÔ HÌNH (GENDER TOGGLE) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#78350f] font-mono text-[11px] font-bold">MÔ HÌNH:</span>
                  <div className="flex border-2 border-[#3b2803] bg-[#faf5ef] shadow-sm">
                    <button
                      onClick={() => handleGenderToggle('female')}
                      className={`px-2.5 py-1 font-bold text-xs cursor-pointer transition-all ${
                        gender === 'female'
                          ? 'bg-[#831843] text-white shadow-inner'
                          : 'text-[#831843] hover:bg-[#fce7f3]'
                      }`}
                    >
                      👩 NỮ QUÝ TỘC
                    </button>
                    <button
                      onClick={() => handleGenderToggle('male')}
                      className={`px-2.5 py-1 font-bold text-xs cursor-pointer transition-all ${
                        gender === 'male'
                          ? 'bg-[#1e3a5f] text-white shadow-inner'
                          : 'text-[#1e3a5f] hover:bg-[#e0f2fe]'
                      }`}
                    >
                      👨 NAM QUAN VIÊN
                    </button>
                  </div>
                </div>

                {/* Poses */}
                <div className="flex items-center gap-1">
                  <span className="text-[#78350f] font-mono text-[11px]">TƯ THẾ:</span>
                  <button
                    onClick={() => {
                      retroAudio.playBlip(360);
                      setPose('idle');
                    }}
                    className={`px-2 py-1 font-mono border cursor-pointer ${
                      pose === 'idle'
                        ? 'bg-[#b91c1c] text-white border-[#fef08a] font-bold shadow-sm'
                        : 'bg-[#faf5ef] text-[#78350f] border-[#d97706]/50'
                    }`}
                  >
                    Đứng thẳng
                  </button>
                  <button
                    onClick={() => {
                      retroAudio.playBlip(400);
                      setPose('salute');
                    }}
                    className={`px-2 py-1 font-mono border cursor-pointer ${
                      pose === 'salute'
                        ? 'bg-[#b91c1c] text-white border-[#fef08a] font-bold shadow-sm'
                        : 'bg-[#faf5ef] text-[#78350f] border-[#d97706]/50'
                    }`}
                  >
                    Chắp tay lễ
                  </button>
                  <button
                    onClick={() => {
                      retroAudio.playBlip(440);
                      setPose('fan');
                    }}
                    className={`px-2 py-1 font-mono border cursor-pointer ${
                      pose === 'fan'
                        ? 'bg-[#b91c1c] text-white border-[#fef08a] font-bold shadow-sm'
                        : 'bg-[#faf5ef] text-[#78350f] border-[#d97706]/50'
                    }`}
                  >
                    Cầm quạt
                  </button>
                </div>

                {/* Zoom */}
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-[#78350f] font-mono text-[11px]">KÍNH LÚP:</span>
                  {[1, 1.25, 1.5].map((z) => (
                    <button
                      key={z}
                      onClick={() => {
                        retroAudio.playBlip(480);
                        setZoom(z);
                      }}
                      className={`px-1.5 py-0.5 font-mono text-[10px] border cursor-pointer ${
                        zoom === z
                          ? 'bg-[#b45309] text-white border-[#fef08a] font-bold'
                          : 'bg-[#faf5ef] text-[#78350f] border-[#d97706]/50'
                      }`}
                    >
                      {z}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. BẢNG ĐIỂM & ĐÁNH GIÁ (NẰM NGAY DƯỚI MODEL TRUNG TÂM) */}
            <ScoreFeedbackPanel evaluation={scoreEvaluation} gender={gender} />

            {/* 3. BẢNG THÔNG SỐ & MIÊU TẢ CHI TIẾT (NẰM NGAY DƯỚI BẢNG ĐIỂM THEO YÊU CẦU 1) */}
            <DetailsBox
              costume={selectedCostume}
              activeVariant={activeVariant}
              onSelectVariant={(variant) => setActiveVariant(variant)}
              onOpenAnatomy={() => setIsAnatomyOpen(true)}
              gender={gender}
            />
          </section>

          {/* ================= CỘT BÊN PHẢI (5 COLS): TỦ ĐỒ (WARDROBE) & LƯỚI PHỤ KIỆN (ACCESSORIES) ================= */}
          <aside className="lg:col-span-5 flex flex-col gap-3.5">
            {/* Tủ đồ trang phục theo giới tính */}
            <WardrobeGrid
              costumes={COSTUMES_DATA}
              selectedCostume={selectedCostume}
              onSelectCostume={handleSelectCostume}
              gender={gender}
            />

            {/* Lưới phụ kiện truyền thống (Accessories Box - tối đa 2 phụ kiện) */}
            <AccessoriesGrid
              equippedAccessories={equippedAccessories}
              onToggleAccessory={handleToggleAccessory}
              gender={gender}
            />
          </aside>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto bg-[#faf6ed] border-t-3 border-[#d97706]/40 p-3.5 text-center text-xs text-[#78350f] z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>🇻🇳</span>
            <span>
              <strong>Việt Phục Pixel Art</strong> • Tôn vinh di sản văn hóa trang phục Việt Nam
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={() => setIsFestivalOpen(true)}
              className="text-[#b91c1c] font-bold hover:underline cursor-pointer"
            >
              [🏮 Trẩy Hội Làng Mini-games]
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="text-[#b45309] font-bold hover:underline cursor-pointer"
            >
              [📋 Tải Mã Nguồn Đơn Tệp]
            </button>
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}
      {isAnatomyOpen && (
        <AnatomyModal costume={selectedCostume} onClose={() => setIsAnatomyOpen(false)} />
      )}

      {isExportOpen && <SingleFileExportModal onClose={() => setIsExportOpen(false)} />}

      {/* MODAL LỄ HỘI LÀNG MINI-GAMES (HTML5 CANVAS) */}
      {isFestivalOpen && <VillageFestivalModal onClose={() => setIsFestivalOpen(false)} />}
    </div>
  );
}
