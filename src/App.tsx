/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { COSTUMES_DATA, FEMALE_COSTUMES, MALE_COSTUMES } from './data/costumes.ts';
import { ACCESSORIES_DATA } from './data/accessories.ts';
import { SCENES_DATA } from './data/scenes.ts';
import { Costume, ColorVariant, Accessory, Scene } from './types.ts';
import { PixelCharacter } from './components/PixelCharacter.tsx';
import { InteractiveWardrobeObject } from './components/InteractiveWardrobeObject.tsx';
import { ImmersiveSceneBackground } from './components/ImmersiveSceneBackground.tsx';
import { RpgDialogueBox } from './components/RpgDialogueBox.tsx';
import { AnatomyModal } from './components/AnatomyModal.tsx';
import { SingleFileExportModal } from './components/SingleFileExportModal.tsx';
import { VillageFestivalModal } from './components/VillageFestivalModal.tsx';
import { calculateAdvancedScore } from './utils/scoring.ts';
import { retroAudio } from './utils/audio.ts';

export default function App() {
  // 1. Giới tính (Mặc định Nữ quý tộc)
  const [gender, setGender] = useState<'female' | 'male'>('female');

  // 2. Bối cảnh không gian (Mặc định Cảnh 1: Chốn Bồng Lai)
  const [currentScene, setCurrentScene] = useState<Scene>(SCENES_DATA[0]);
  const [isSceneDropdownOpen, setIsSceneDropdownOpen] = useState<boolean>(false);
  const sceneDropdownRef = useRef<HTMLDivElement>(null);

  // 3. Trang phục & Biến thể màu sắc
  const [selectedCostume, setSelectedCostume] = useState<Costume>(FEMALE_COSTUMES[0]);
  const [activeVariant, setActiveVariant] = useState<ColorVariant>(
    FEMALE_COSTUMES[0].colorVariants[0]
  );

  // 4. Phụ kiện trang bị (Tối đa 1 món trong mỗi nhóm Head, Jewelry, Feet)
  const [equippedAccessories, setEquippedAccessories] = useState<Accessory[]>([]);

  // 5. Trạng thái Đóng / Mở của Tủ đồ trong cảnh (Interactive Object)
  const [isWardrobeOpen, setIsWardrobeOpen] = useState<boolean>(false);

  // 6. Điều khiển Model & Ẩn/Hiện Công cụ Zoom & Tư thế (Yêu cầu 1)
  const [showControls, setShowControls] = useState<boolean>(true);
  const [pose, setPose] = useState<'idle' | 'salute' | 'fan'>('idle');
  const [zoom, setZoom] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bgmPlaying, setBgmPlaying] = useState<boolean>(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(false);
  // 6.2. Chế độ Giao diện: Sáng (Light) / Tối (Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 7. Modals
  const [isAnatomyOpen, setIsAnatomyOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isFestivalOpen, setIsFestivalOpen] = useState<boolean>(false);

  // Khi chuyển Giới tính
  const handleGenderToggle = (newGender: 'female' | 'male') => {
    if (newGender === gender) return;
    setGender(newGender);
    retroAudio.playBlip(440);

    const targetList = newGender === 'female' ? FEMALE_COSTUMES : MALE_COSTUMES;
    setSelectedCostume(targetList[0]);
    setActiveVariant(targetList[0].colorVariants[0]);
    setEquippedAccessories([]);
  };

  // Khi chuyển Bối cảnh cảnh quan (Bồng Lai / Sơn Thần / Cửu Long / Cung Đình / Đầm Sen / Phố Cổ)
  const handleSceneChange = (scene: Scene) => {
    if (scene.id === currentScene.id) return;
    setCurrentScene(scene);
    retroAudio.playBlip(540);
  };

  // Tính điểm đánh giá phối đồ dựa trên y phục, phụ kiện VÀ BỐI CẢNH HIỆN TẠI (Yêu cầu 4)
  const scoreEvaluation = useMemo(() => {
    return calculateAdvancedScore(selectedCostume, equippedAccessories, currentScene.id);
  }, [selectedCostume, equippedAccessories, currentScene.id]);

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

  // Mặc / Tháo phụ kiện: Logic Chọn Độc Quyền Theo Nhóm (Yêu cầu 2: Single-choice per category)
  const handleToggleAccessory = (accessory: Accessory) => {
    setEquippedAccessories((prev) => {
      const isAlreadyEquipped = prev.some((a) => a.id === accessory.id);
      if (isAlreadyEquipped) {
        // Gỡ bỏ món này nếu đã đeo
        return prev.filter((a) => a.id !== accessory.id);
      }
      // Tự động gỡ bất kỳ món nào cùng nhóm (head, jewelry, feet) để đeo món mới (cơ chế Radio Button)
      const withoutSameCategory = prev.filter((a) => a.category !== accessory.category);
      return [...withoutSameCategory, accessory];
    });
  };

  // Phím tắt
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const currentList = gender === 'female' ? FEMALE_COSTUMES : MALE_COSTUMES;
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (currentList[idx]) {
          retroAudio.playEquip();
          handleSelectCostume(currentList[idx]);
        }
      } else if (e.key.toLowerCase() === 't') {
        setIsWardrobeOpen((prev) => !prev);
        retroAudio.playBlip(500);
      } else if (e.key.toLowerCase() === 'h') {
        setShowControls((prev) => !prev);
        retroAudio.playBlip(420);
      } else if (e.key.toLowerCase() === 'm') {
        toggleSound();
      } else if (e.key.toLowerCase() === 'b') {
        toggleBgm();
      } else if (e.key.toLowerCase() === 'l') {
        // Phím tắt đổi chế độ Sáng / Tối
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        retroAudio.playBlip(520);
      } else if (e.key === 'Escape') {
        setIsWardrobeOpen(false);
        setIsSceneDropdownOpen(false);
        setIsAnatomyOpen(false);
        setIsExportOpen(false);
        setIsFestivalOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (sceneDropdownRef.current && !sceneDropdownRef.current.contains(e.target as Node)) {
        setIsSceneDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    <div
      data-theme={theme}
      className={`min-h-screen theme-transition flex flex-col relative overflow-hidden select-none ${
        theme === 'light' ? 'bg-[#FED2B7] text-[#5A2D2D]' : 'bg-[#050B31] text-[#FFFFFF]'
      }`}
    >
      {/* Scanlines CRT (tùy chọn) */}
      {scanlinesEnabled && <div className="scanlines fixed inset-0 z-40 pointer-events-none" />}

      {/* ================= HEADER NAVIGATION (ABSOLUTE CENTER LOGO & GLASSMORPHISM) ================= */}
      <header
        className={`relative w-full z-40 px-3 py-2.5 md:px-6 backdrop-blur-md transition-colors duration-300 border-b ${
          theme === 'light'
            ? 'bg-[#FFFFE3]/95 border-[#FED2B7] shadow-sm text-[#5A2D2D]'
            : 'bg-[#0E2045]/80 border-[#1F3C73] shadow-md text-[#FFFFFF]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* CỘT TRÁI: CHỌN MÔ HÌNH (NAM/NỮ) */}
          <div className="flex items-center gap-2 z-10">
            {/* Nút Model Nam / Nữ */}
            <div
              className={`flex border shadow-sm transition-colors ${
                theme === 'light'
                  ? 'bg-[#FFFFE3] border-[#FED2B7]'
                  : 'bg-[#050B31]/90 border-[#1F3C73]'
              }`}
            >
              <button
                onClick={() => handleGenderToggle('female')}
                className={`px-2.5 py-1 text-[11px] font-bold font-['Pixelify_Sans'] cursor-pointer transition-all ${
                  gender === 'female'
                    ? theme === 'light'
                      ? 'bg-[#FFA9A9] text-[#5A2D2D] shadow-inner font-black'
                      : 'bg-[#831843] text-white shadow-inner font-black'
                    : theme === 'light'
                    ? 'text-[#8B3A3A] hover:bg-[#FED2B7]/40'
                    : 'text-[#fed7aa] hover:bg-white/10'
                }`}
              >
                👩 NỮ
              </button>
              <button
                onClick={() => handleGenderToggle('male')}
                className={`px-2.5 py-1 text-[11px] font-bold font-['Pixelify_Sans'] cursor-pointer transition-all ${
                  gender === 'male'
                    ? theme === 'light'
                      ? 'bg-[#FED2B7] text-[#5A2D2D] shadow-inner font-black'
                      : 'bg-[#1e3a5f] text-white shadow-inner font-black'
                    : theme === 'light'
                    ? 'text-[#8B3A3A] hover:bg-[#FED2B7]/40'
                    : 'text-[#fed7aa] hover:bg-white/10'
                }`}
              >
                👨 NAM
              </button>
            </div>
          </div>

          {/* CĂN GIỮA TUYỆT ĐỐI (ABSOLUTE CENTER): TIÊU ĐỀ LOGO HOÀNG TRIỀU */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2">
              <span
                className={`hidden lg:inline text-base animate-pulse ${
                  theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fef08a]'
                }`}
              >
                ✦
              </span>
              <h1
                className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-widest uppercase font-['Pixelify_Sans'] ${
                  theme === 'light'
                    ? 'text-[#5A2D2D] drop-shadow-[1px_1px_0_#FED2B7]'
                    : 'text-[#fef08a] glow-gold drop-shadow-[2px_2px_0_#000]'
                }`}
              >
                VIỆT PHỤC PIXEL ART
              </h1>
              <span
                className={`hidden lg:inline text-base animate-pulse ${
                  theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fef08a]'
                }`}
              >
                ✦
              </span>
            </div>
          </div>

          {/* CỘT PHẢI: MINI-GAMES & AUDIO TOOLBAR & NÚT CHUYỂN CHẾ ĐỘ SÁNG / TỐI */}
          <div className="flex items-center gap-1.5 z-10 ml-auto">
            {/* NÚT CHUYỂN ĐỔI CHẾ ĐỘ SÁNG / TỐI (LIGHT / DARK TOGGLE) */}
            <button
              onClick={() => {
                retroAudio.playBlip(520);
                setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
              }}
              className={`px-2 py-1 text-[11px] font-bold font-['Pixelify_Sans'] border cursor-pointer transition-all flex items-center gap-1 ${
                theme === 'light'
                  ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] hover:bg-[#ff9393] shadow-sm'
                  : 'bg-[#1F3C73] text-[#FFF3CB] border-[#FFF3CB]/80 hover:bg-[#254a8e] shadow-sm'
              }`}
              title={
                theme === 'light'
                  ? 'Chuyển sang Chế độ Tối (Dark Mode) - Phím L'
                  : 'Chuyển sang Chế độ Sáng (Light Mode) - Phím L'
              }
            >
              <span>{theme === 'light' ? '☀️ SÁNG' : '🌙 TỐI'}</span>
            </button>

            {/* Nút Ẩn/Hiện Công Cụ Zoom & Tư Thế (Yêu cầu 1) */}
            <button
              onClick={() => {
                retroAudio.playBlip(420);
                setShowControls((prev) => !prev);
              }}
              className={`px-2 py-1 text-[11px] font-mono border cursor-pointer transition-all ${
                showControls
                  ? theme === 'light'
                    ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0]'
                    : 'bg-[#b45309] text-white border-[#fef08a]'
                  : theme === 'light'
                  ? 'bg-[#FFFFE3] text-[#5A2D2D] border-[#FED2B7] hover:border-[#FFA9A9]'
                  : 'bg-black/60 text-[#fed7aa] border-[#78350f] hover:border-[#f59e0b]'
              }`}
              title={showControls ? 'Ẩn thanh công cụ zoom & tư thế để ngắm trọn vẹn cảnh vật' : 'Hiện thanh công cụ zoom & tư thế'}
            >
              {showControls ? '👁️ ẨN TOOL' : '👁️ HIỆN TOOL'}
            </button>

            {/* Tham gia Lễ Hội Làng */}
            <button
              onClick={() => {
                retroAudio.playBlip(560);
                setIsFestivalOpen(true);
              }}
              className={`px-2.5 py-1 text-[11px] font-bold font-['Pixelify_Sans'] border cursor-pointer shadow-sm active:translate-y-0.5 flex items-center gap-1 transition-all ${
                theme === 'light'
                  ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] hover:bg-[#ff9393]'
                  : 'bg-[#b91c1c] hover:bg-[#dc2626] border-[#fef08a] text-white'
              }`}
              title="Trò chơi dân gian: Ném còn & Gánh lụa qua cầu"
            >
              <span>🏮</span>
              <span className="hidden md:inline">LỄ HỘI LÀNG</span>
            </button>

            {/* BGM */}
            <button
              onClick={toggleBgm}
              className={`px-2 py-1 text-[11px] font-mono border cursor-pointer transition-all ${
                bgmPlaying
                  ? theme === 'light'
                    ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] font-bold'
                    : 'bg-[#fef08a] text-[#1e1305] border-white font-bold'
                  : theme === 'light'
                  ? 'bg-[#FFFFE3] text-[#8B3A3A] border-[#FED2B7]'
                  : 'bg-black/60 text-[#fed7aa] border-[#d97706]'
              }`}
              title="Nhã nhạc cung đình ngũ cung"
            >
              {bgmPlaying ? '🎵' : '🔇'}
            </button>

            {/* SFX */}
            <button
              onClick={toggleSound}
              className={`px-2 py-1 text-[11px] font-mono border cursor-pointer transition-all ${
                soundEnabled
                  ? theme === 'light'
                    ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0]'
                    : 'bg-[#b45309] text-white border-[#fef08a]'
                  : theme === 'light'
                  ? 'bg-[#FFFFE3] text-[#8B3A3A] border-[#FED2B7]'
                  : 'bg-black/60 text-[#94a3b8] border-[#78350f]'
              }`}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            {/* Mã Nguồn */}
            <button
              onClick={() => {
                retroAudio.playBlip(480);
                setIsExportOpen(true);
              }}
              className={`px-2 py-1 text-[11px] font-['Pixelify_Sans'] border cursor-pointer transition-all ${
                theme === 'light'
                  ? 'bg-[#FED2B7] hover:bg-[#FFA9A9] border-[#FFBFA0] text-[#5A2D2D]'
                  : 'bg-[#78350f] hover:bg-[#92400e] border-[#fef08a] text-[#fff8e1]'
              }`}
              title="Xem và sao chép mã nguồn đơn tệp HTML"
            >
              📋
            </button>
          </div>

        </div>
      </header>

      {/* ================= KHU VỰC SẢNH KHÔNG GIAN MỞ (IMMERSIVE HERO STAGE: 85-90VH) ================= */}
      <main className="relative flex-1 w-full flex flex-col justify-between overflow-hidden">
        
        {/* LỚP 1: NỀN KHÔNG GIAN TỰ NHIÊN HÒA CHUNG (IMMERSIVE BACKGROUND VỚI ẢNH/SVG CỦA 3 CẢNH) */}
        <ImmersiveSceneBackground scene={currentScene} gender={gender} />

        {/* LỚP 2: KHÔNG GIAN TRUNG TÂM (CHARACTER + VẬT THỂ TỦ ĐỒ) */}
        <div className="relative flex-1 max-w-7xl mx-auto w-full px-3 md:px-6 flex items-center justify-between z-20 py-2">
          
          {/* GÓC TRÁI TRÊN: CUSTOM PIXEL DROPDOWN CHỌN BỐI CẢNH (YÊU CẦU 1) */}
          <div ref={sceneDropdownRef} className="absolute top-3 left-3 md:left-6 z-30">
            {/* Nút bấm hiển thị tên background hiện tại kèm mũi tên */}
            <button
              onClick={() => {
                retroAudio.playBlip(isSceneDropdownOpen ? 380 : 520);
                setIsSceneDropdownOpen((prev) => !prev);
              }}
              className={`backdrop-blur-md border-2 px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-all active:scale-95 group shadow-md ${
                theme === 'light'
                  ? 'bg-[#FFFFE3]/95 border-[#FED2B7] hover:border-[#FFA9A9] text-[#5A2D2D]'
                  : 'bg-black/85 border-[#f59e0b] hover:border-[#fef08a] text-white'
              }`}
              title="Nhấn để mở danh sách đổi bối cảnh"
            >
              <span className="text-sm md:text-base">{currentScene.icon}</span>
              <div className="flex flex-col text-left">
                <span
                  className={`text-[9px] font-mono tracking-wider ${
                    theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'
                  }`}
                >
                  BỐI CẢNH
                </span>
                <span
                  className={`text-xs font-bold font-['Pixelify_Sans'] uppercase tracking-wide transition-colors ${
                    theme === 'light'
                      ? 'text-[#5A2D2D] group-hover:text-[#8B3A3A]'
                      : 'text-[#fef08a] group-hover:text-white'
                  }`}
                >
                  {currentScene.name}
                </span>
              </div>
              <span
                className={`text-xs font-mono ml-1 transition-transform duration-200 ${
                  theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#fef08a]'
                }`}
              >
                {isSceneDropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Menu thả xuống cuộn danh sách tất cả các Background hiện có */}
            {isSceneDropdownOpen && (
              <div
                className={`absolute top-full left-0 mt-1.5 w-64 md:w-80 max-h-80 overflow-y-auto backdrop-blur-lg border-2 shadow-[0_16px_36px_rgba(0,0,0,0.85)] flex flex-col p-1.5 gap-1 animate-in fade-in zoom-in-95 duration-150 z-50 ${
                  theme === 'light'
                    ? 'bg-[#FFFFE3] border-[#FED2B7] text-[#5A2D2D]'
                    : 'bg-black/95 border-[#f59e0b] text-[#fed7aa]'
                }`}
              >
                <div
                  className={`px-2 py-1 border-b flex items-center justify-between text-[10px] font-['Pixelify_Sans'] uppercase ${
                    theme === 'light'
                      ? 'border-[#FED2B7] text-[#5A2D2D]'
                      : 'border-[#f59e0b]/30 text-[#fed7aa]'
                  }`}
                >
                  <span>DANH SÁCH BỐI CẢNH (6 CẢNH)</span>
                  <span
                    className={`text-[9px] ${
                      theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fef08a]'
                    }`}
                  >
                    RETRO SCENERY
                  </span>
                </div>
                {SCENES_DATA.map((sc) => {
                  const isSelected = sc.id === currentScene.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        handleSceneChange(sc);
                        setIsSceneDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? theme === 'light'
                            ? 'bg-[#FED2B7] border-[#FFBFA0] text-[#5A2D2D] shadow-inner font-bold'
                            : 'bg-[#b45309]/70 border-[#fef08a] text-white shadow-inner'
                          : theme === 'light'
                          ? 'bg-white/60 border-[#FED2B7]/60 text-[#5A2D2D] hover:bg-[#FED2B7]/40'
                          : 'bg-black/40 border-white/10 text-[#fed7aa] hover:bg-white/10 hover:border-[#f59e0b]/50'
                      }`}
                    >
                      <span className="text-lg flex-shrink-0">{sc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-bold font-['Pixelify_Sans'] truncate ${
                              isSelected
                                ? theme === 'light'
                                  ? 'text-[#5A2D2D]'
                                  : 'text-[#fef08a]'
                                : theme === 'light'
                                ? 'text-[#5A2D2D]'
                                : 'text-white'
                            }`}
                          >
                            {sc.name}
                          </span>
                          {isSelected && (
                            <span
                              className={`text-xs font-mono ml-1 font-bold ${
                                theme === 'light' ? 'text-[#5A2D2D]' : 'text-[#fef08a]'
                              }`}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[9px] font-content truncate mt-0.5 ${
                            theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#cbd5e1]'
                          }`}
                        >
                          {sc.timeOfDay} • {sc.subtitle.split('•')[0]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* TRUNG TÂM: NHÂN VẬT PIXEL MODEL TRÊN BỤC ĐỨNG */}
          <div className="mx-auto flex flex-col items-center justify-center mt-2 md:mt-0">
            
            {/* Nhân vật Pixel */}
            <div className="relative">
              <PixelCharacter
                costume={selectedCostume}
                activeVariant={activeVariant}
                gender={gender}
                pose={pose}
                zoom={zoom}
                equippedAccessories={equippedAccessories}
              />
            </div>

            {/* THANH ĐIỀU KHIỂN NỔI: TƯ THẾ & KÍNH LÚP (CÓ THỂ ẨN/HIỆN MƯỢT MÀ THEO YÊU CẦU 1) */}
            <div
              className={`mt-3 flex items-center gap-2 backdrop-blur-md px-3 py-1.5 border shadow-lg text-[10px] transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-[#FFFFE3]/95 border-[#FED2B7] text-[#5A2D2D]'
                  : 'bg-black/60 border-[#f59e0b]/40 text-white'
              } ${
                showControls
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <span
                className={`font-mono ${theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'}`}
              >
                TƯ THẾ:
              </span>
              <button
                onClick={() => {
                  retroAudio.playBlip(360);
                  setPose('idle');
                }}
                className={`px-2 py-0.5 font-mono cursor-pointer border transition-all ${
                  pose === 'idle'
                    ? theme === 'light'
                      ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] font-bold'
                      : 'bg-[#b91c1c] text-white border-[#fef08a]'
                    : theme === 'light'
                    ? 'text-[#5A2D2D] border-[#FED2B7] hover:bg-[#FED2B7]/40'
                    : 'text-[#fed7aa] border-white/20 hover:bg-white/10'
                }`}
              >
                Đứng
              </button>
              <button
                onClick={() => {
                  retroAudio.playBlip(400);
                  setPose('salute');
                }}
                className={`px-2 py-0.5 font-mono cursor-pointer border transition-all ${
                  pose === 'salute'
                    ? theme === 'light'
                      ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] font-bold'
                      : 'bg-[#b91c1c] text-white border-[#fef08a]'
                    : theme === 'light'
                    ? 'text-[#5A2D2D] border-[#FED2B7] hover:bg-[#FED2B7]/40'
                    : 'text-[#fed7aa] border-white/20 hover:bg-white/10'
                }`}
              >
                Hành lễ
              </button>
              <button
                onClick={() => {
                  retroAudio.playBlip(440);
                  setPose('fan');
                }}
                className={`px-2 py-0.5 font-mono cursor-pointer border transition-all ${
                  pose === 'fan'
                    ? theme === 'light'
                      ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] font-bold'
                      : 'bg-[#b91c1c] text-white border-[#fef08a]'
                    : theme === 'light'
                    ? 'text-[#5A2D2D] border-[#FED2B7] hover:bg-[#FED2B7]/40'
                    : 'text-[#fed7aa] border-white/20 hover:bg-white/10'
                }`}
              >
                Quạt
              </button>

              <span className={`mx-1 ${theme === 'light' ? 'text-[#FED2B7]' : 'text-white/30'}`}>
                |
              </span>

              <span
                className={`font-mono ${theme === 'light' ? 'text-[#8B3A3A]' : 'text-[#fed7aa]'}`}
              >
                ZOOM:
              </span>
              {[1, 1.25, 1.5].map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    retroAudio.playBlip(480);
                    setZoom(z);
                  }}
                  className={`px-1.5 py-0.5 font-mono cursor-pointer border transition-all ${
                    zoom === z
                      ? theme === 'light'
                        ? 'bg-[#FFA9A9] text-[#5A2D2D] border-[#FFBFA0] font-bold'
                        : 'bg-[#b45309] text-white border-[#fef08a]'
                      : theme === 'light'
                      ? 'text-[#5A2D2D] border-[#FED2B7] hover:bg-[#FED2B7]/40'
                      : 'text-[#fed7aa] border-white/20 hover:bg-white/10'
                  }`}
                >
                  {z}x
                </button>
              ))}
            </div>

          </div>

          {/* GÓC PHẢI: VẬT THỂ TỦ ĐỒ TƯƠNG TÁC THEO CẢNH (MÂY TIÊN / TRỐNG THIÊNG / CUỐN THƯ HOÀNG GIA) */}
          <div className="absolute top-10 md:top-14 right-4 md:right-8 z-30">
            <InteractiveWardrobeObject
              sceneId={currentScene.id}
              isOpen={isWardrobeOpen}
              onToggle={() => setIsWardrobeOpen((prev) => !prev)}
              costumes={COSTUMES_DATA}
              selectedCostume={selectedCostume}
              onSelectCostume={handleSelectCostume}
              equippedAccessories={equippedAccessories}
              allAccessories={ACCESSORIES_DATA}
              onToggleAccessory={handleToggleAccessory}
              gender={gender}
              theme={theme}
            />
          </div>

        </div>

        {/* LỚP 3: HỘP THOẠI RPG & THÔNG SỐ (DOCK SÁT DƯỚI ĐÁY MÀN HÌNH THEO YÊU CẦU 1) */}
        <div className="relative w-full max-w-7xl mx-auto px-2 md:px-6 pb-2 md:pb-3 z-30">
          <RpgDialogueBox
            costume={selectedCostume}
            activeVariant={activeVariant}
            onSelectVariant={(variant) => setActiveVariant(variant)}
            evaluation={scoreEvaluation}
            currentScene={currentScene}
            onOpenAnatomy={() => setIsAnatomyOpen(true)}
            gender={gender}
            theme={theme}
          />
        </div>

      </main>

      {/* ================= MODALS ================= */}
      {isAnatomyOpen && (
        <AnatomyModal costume={selectedCostume} onClose={() => setIsAnatomyOpen(false)} />
      )}

      {isExportOpen && <SingleFileExportModal onClose={() => setIsExportOpen(false)} />}

      {isFestivalOpen && <VillageFestivalModal onClose={() => setIsFestivalOpen(false)} />}
    </div>
  );
}
