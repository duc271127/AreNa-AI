/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
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
import { calculateScore } from './utils/scoring.ts';
import { retroAudio } from './utils/audio.ts';

export default function App() {
  // 1. Giới tính (Mặc định Nữ quý tộc)
  const [gender, setGender] = useState<'female' | 'male'>('female');

  // 2. Bối cảnh không gian (Mặc định Sảnh Cung Đình)
  const [currentScene, setCurrentScene] = useState<Scene>(SCENES_DATA[0]);

  // 3. Trang phục & Biến thể màu sắc
  const [selectedCostume, setSelectedCostume] = useState<Costume>(FEMALE_COSTUMES[0]);
  const [activeVariant, setActiveVariant] = useState<ColorVariant>(
    FEMALE_COSTUMES[0].colorVariants[0]
  );

  // 4. Phụ kiện trang bị (Tối đa 2 phụ kiện cùng lúc)
  const [equippedAccessories, setEquippedAccessories] = useState<Accessory[]>([]);

  // 5. Trạng thái Đóng / Mở của Tủ đồ trong cảnh (Interactive Object)
  const [isWardrobeOpen, setIsWardrobeOpen] = useState<boolean>(false);

  // 6. Điều khiển Model & Hiệu ứng
  const [pose, setPose] = useState<'idle' | 'salute' | 'fan'>('idle');
  const [zoom, setZoom] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bgmPlaying, setBgmPlaying] = useState<boolean>(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(false);

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

  // Khi chuyển Bối cảnh cảnh quan (Cung Đình / Đầm Sen / Phố Cổ)
  const handleSceneChange = (scene: Scene) => {
    if (scene.id === currentScene.id) return;
    setCurrentScene(scene);
    retroAudio.playBlip(540);
  };

  // Tính điểm đánh giá phối đồ dựa trên y phục, phụ kiện VÀ BỐI CẢNH HIỆN TẠI
  const scoreEvaluation = useMemo(() => {
    return calculateScore(selectedCostume, equippedAccessories, currentScene.id);
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

  // Mặc / Tháo phụ kiện (Tối đa 2 phụ kiện)
  const handleToggleAccessory = (accessory: Accessory) => {
    setEquippedAccessories((prev) => {
      const exists = prev.some((a) => a.id === accessory.id);
      if (exists) {
        return prev.filter((a) => a.id !== accessory.id);
      }
      if (prev.length >= 2) {
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
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (currentList[idx]) {
          retroAudio.playEquip();
          handleSelectCostume(currentList[idx]);
        }
      } else if (e.key.toLowerCase() === 't') {
        setIsWardrobeOpen((prev) => !prev);
        retroAudio.playBlip(500);
      } else if (e.key.toLowerCase() === 'm') {
        toggleSound();
      } else if (e.key.toLowerCase() === 'b') {
        toggleBgm();
      } else if (e.key === 'Escape') {
        setIsWardrobeOpen(false);
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
    <div className="min-h-screen bg-[#0f0c18] text-[#f4ede2] flex flex-col relative overflow-hidden select-none">
      {/* Scanlines CRT (tùy chọn) */}
      {scanlinesEnabled && <div className="scanlines fixed inset-0 z-40 pointer-events-none" />}

      {/* ================= HEADER NAVIGATION (ABSOLUTE CENTER LOGO & GLASSMORPHISM) ================= */}
      <header className="relative w-full z-40 px-3 py-2.5 md:px-6 bg-black/40 backdrop-blur-md border-b border-[#f59e0b]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* CỘT TRÁI: CHỌN MÔ HÌNH (NAM/NỮ) & CHUYỂN BỐI CẢNH */}
          <div className="flex items-center gap-2 z-10">
            {/* Nút Model Nam / Nữ */}
            <div className="flex bg-black/60 border border-[#f59e0b]/50 shadow-sm">
              <button
                onClick={() => handleGenderToggle('female')}
                className={`px-2.5 py-1 text-[11px] font-bold font-['Pixelify_Sans'] cursor-pointer transition-all ${
                  gender === 'female'
                    ? 'bg-[#831843] text-white shadow-inner'
                    : 'text-[#fed7aa] hover:bg-white/10'
                }`}
              >
                👩 NỮ
              </button>
              <button
                onClick={() => handleGenderToggle('male')}
                className={`px-2.5 py-1 text-[11px] font-bold font-['Pixelify_Sans'] cursor-pointer transition-all ${
                  gender === 'male'
                    ? 'bg-[#1e3a5f] text-white shadow-inner'
                    : 'text-[#fed7aa] hover:bg-white/10'
                }`}
              >
                👨 NAM
              </button>
            </div>

            {/* Nút Đổi Bối Cảnh (Scene Switcher) */}
            <div className="flex items-center bg-black/60 border border-[#f59e0b]/50">
              {SCENES_DATA.map((sc) => {
                const isActive = sc.id === currentScene.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleSceneChange(sc)}
                    className={`px-2 py-1 text-[11px] font-['Pixelify_Sans'] cursor-pointer flex items-center gap-1 transition-all ${
                      isActive
                        ? 'bg-[#b45309] text-[#fef08a] font-bold shadow-inner'
                        : 'text-[#cbd5e1] hover:bg-white/10'
                    }`}
                    title={sc.name}
                  >
                    <span>{sc.icon}</span>
                    <span className="hidden sm:inline">{sc.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CĂN GIỮA TUYỆT ĐỐI (ABSOLUTE CENTER): TIÊU ĐỀ LOGO HOÀNG TRIỀU */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-lg text-[#fef08a] animate-pulse">✦</span>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#fef08a] glow-gold tracking-widest uppercase font-['Pixelify_Sans'] drop-shadow-[2px_2px_0_#000]">
                VIỆT PHỤC PIXEL ART
              </h1>
              <span className="hidden lg:inline text-lg text-[#fef08a] animate-pulse">✦</span>
            </div>
          </div>

          {/* CỘT PHẢI: MINI-GAMES & AUDIO TOOLBAR */}
          <div className="flex items-center gap-1.5 z-10 ml-auto">
            {/* Tham gia Lễ Hội Làng */}
            <button
              onClick={() => {
                retroAudio.playBlip(560);
                setIsFestivalOpen(true);
              }}
              className="px-2.5 py-1 text-[11px] font-bold font-['Pixelify_Sans'] bg-[#b91c1c] hover:bg-[#dc2626] border border-[#fef08a] text-white cursor-pointer shadow-sm active:translate-y-0.5 flex items-center gap-1"
              title="Trò chơi dân gian: Ném còn & Gánh lụa qua cầu"
            >
              <span>🏮</span>
              <span className="hidden md:inline">LỄ HỘI LÀNG</span>
            </button>

            {/* BGM */}
            <button
              onClick={toggleBgm}
              className={`px-2 py-1 text-[11px] font-mono border cursor-pointer ${
                bgmPlaying
                  ? 'bg-[#fef08a] text-[#1e1305] border-white font-bold'
                  : 'bg-black/60 text-[#fed7aa] border-[#d97706]'
              }`}
              title="Nhã nhạc cung đình ngũ cung"
            >
              {bgmPlaying ? '🎵' : '🔇'}
            </button>

            {/* SFX */}
            <button
              onClick={toggleSound}
              className={`px-2 py-1 text-[11px] font-mono border cursor-pointer ${
                soundEnabled
                  ? 'bg-[#b45309] text-white border-[#fef08a]'
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
              className="px-2 py-1 text-[11px] font-['Pixelify_Sans'] bg-[#78350f] hover:bg-[#92400e] border border-[#fef08a] text-[#fff8e1] cursor-pointer"
              title="Xem và sao chép mã nguồn đơn tệp HTML"
            >
              📋
            </button>
          </div>

        </div>
      </header>

      {/* ================= KHU VỰC SẢNH KHÔNG GIAN MỞ (IMMERSIVE HERO STAGE: 82-88VH) ================= */}
      <main className="relative flex-1 w-full flex flex-col justify-between overflow-hidden">
        
        {/* LỚP 1: NỀN KHÔNG GIAN TỰ NHIÊN HÒA CHUNG (IMMERSIVE BACKGROUND) */}
        <ImmersiveSceneBackground sceneId={currentScene.id} gender={gender} />

        {/* LỚP 2: KHÔNG GIAN TRUNG TÂM (CHARACTER + VẬT THỂ TỦ ĐỒ) */}
        <div className="relative flex-1 max-w-7xl mx-auto w-full px-3 md:px-6 flex items-center justify-between z-20 py-2">
          
          {/* GÓC TRÁI TRÊN: THÔNG TIN BỐI CẢNH HIỆN TẠI */}
          <div className="absolute top-3 left-4 md:left-6 z-20 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm border border-[#f59e0b]/40 px-3 py-1.5 shadow-lg">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{currentScene.icon}</span>
                <span className="text-xs font-bold font-['Pixelify_Sans'] text-[#fef08a] uppercase tracking-wider">
                  {currentScene.name}
                </span>
              </div>
              <p className="text-[10px] text-[#fed7aa] font-content mt-0.5">
                {currentScene.timeOfDay} • {currentScene.subtitle.split('•')[0]}
              </p>
            </div>
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

            {/* Thanh điều khiển nổi thanh mảnh: Tư thế & Kính lúp */}
            <div className="mt-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#f59e0b]/40 shadow-lg text-[10px]">
              <span className="text-[#fed7aa] font-mono">TƯ THẾ:</span>
              <button
                onClick={() => {
                  retroAudio.playBlip(360);
                  setPose('idle');
                }}
                className={`px-2 py-0.5 font-mono cursor-pointer border ${
                  pose === 'idle'
                    ? 'bg-[#b91c1c] text-white border-[#fef08a]'
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
                className={`px-2 py-0.5 font-mono cursor-pointer border ${
                  pose === 'salute'
                    ? 'bg-[#b91c1c] text-white border-[#fef08a]'
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
                className={`px-2 py-0.5 font-mono cursor-pointer border ${
                  pose === 'fan'
                    ? 'bg-[#b91c1c] text-white border-[#fef08a]'
                    : 'text-[#fed7aa] border-white/20 hover:bg-white/10'
                }`}
              >
                Quạt
              </button>

              <span className="text-white/30 mx-1">|</span>

              <span className="text-[#fed7aa] font-mono">ZOOM:</span>
              {[1, 1.25, 1.5].map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    retroAudio.playBlip(480);
                    setZoom(z);
                  }}
                  className={`px-1.5 py-0.5 font-mono cursor-pointer border ${
                    zoom === z
                      ? 'bg-[#b45309] text-white border-[#fef08a]'
                      : 'text-[#fed7aa] border-white/20 hover:bg-white/10'
                  }`}
                >
                  {z}x
                </button>
              ))}
            </div>

          </div>

          {/* GÓC PHẢI: VẬT THỂ TỦ ĐỒ TƯƠNG TÁC (TỦ GỖ LIM / ĐÀI SEN / RƯƠNG CỔ) */}
          <div className="absolute top-12 md:top-16 right-4 md:right-8 z-30">
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
