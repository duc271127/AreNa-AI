import React, { useState, useEffect, useRef } from 'react';
import { Costume, ColorVariant } from '../types.ts';
import { retroAudio } from '../utils/audio.ts';

interface DetailsBoxProps {
  costume: Costume;
  activeVariant: ColorVariant;
  onSelectVariant: (variant: ColorVariant) => void;
  onOpenAnatomy: () => void;
  gender: 'female' | 'male';
}

export const DetailsBox: React.FC<DetailsBoxProps> = ({
  costume,
  activeVariant,
  onSelectVariant,
  onOpenAnatomy,
  gender,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullText = costume.fullDescription;
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    let charIndex = 0;
    typingTimerRef.current = window.setInterval(() => {
      charIndex += 2;
      if (charIndex >= fullText.length) {
        setDisplayedText(fullText);
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      } else {
        setDisplayedText(fullText.slice(0, charIndex));
        if (charIndex % 10 === 0) {
          retroAudio.playTypewriter();
        }
      }
    }, 22);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [costume.id, fullText]);

  const handleSkipTyping = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText(fullText);
    setIsTyping(false);
  };

  return (
    <div
      className={`flex flex-col p-3.5 md:p-4 text-[#1e1305] border-3 pixel-carved-gold shadow-md ${
        gender === 'male' ? 'bg-[#faf6ed]' : 'bg-[#fffbf5]'
      }`}
    >
      {/* RPG Dialog Box Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3 border-b-2 border-[#d97706]/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#fef3c7] border-2 border-[#d97706] flex items-center justify-center text-sm shadow-sm">
            📜
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#78350f] tracking-wide uppercase font-['Pixelify_Sans']">
                {costume.name}
              </h3>
              {costume.chineseName && (
                <span className="text-xs text-[#92400e] font-serif border border-[#d97706]/40 px-1 bg-[#fef3c7]">
                  {costume.chineseName}
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#78350f] flex items-center gap-1.5 font-medium">
              <span>⏳ {costume.era}</span>
              <span>•</span>
              <span className="text-[#b91c1c] font-bold">{costume.rarity}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Skip Typewriter & Anatomy breakdown */}
        <div className="flex items-center gap-2 ml-auto">
          {isTyping && (
            <button
              onClick={handleSkipTyping}
              className="text-[10px] font-mono px-2 py-1 bg-[#fef3c7] hover:bg-[#fde68a] border border-[#d97706] text-[#92400e] cursor-pointer"
            >
              [Bỏ qua gõ ⏩]
            </button>
          )}

          <button
            onClick={() => {
              retroAudio.playBlip(520);
              onOpenAnatomy();
            }}
            className="text-[11px] px-2.5 py-1 bg-[#b91c1c] hover:bg-[#991b1b] border-2 border-[#fef08a] text-white font-bold cursor-pointer shadow-[1px_1px_0_#000] active:translate-y-0.5"
          >
            🔍 Cấu tạo may mặc
          </button>
        </div>
      </div>

      {/* Main Grid: Description + Characteristics on Left, Stats & Colorways on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left Column (7 cols): Dialogue text + Characteristics */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* RPG Dialogue Speech Box */}
          <div className="bg-[#fffdf8] p-3 border-2 border-[#d97706]/35 relative min-h-[90px] shadow-sm">
            <span className="text-[10px] uppercase font-mono font-bold text-[#b45309] mb-1 block">
              💬 LỜI BÌNH SỬ QUAN:
            </span>
            <p className="text-xs text-[#451a03] leading-relaxed">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-3.5 bg-[#b91c1c] ml-1 animate-pulse" />}
            </p>
          </div>

          {/* Characteristics (Đặc điểm) */}
          <div className="bg-[#fef3c7]/60 p-2.5 border border-[#d97706]/30">
            <h4 className="text-xs font-bold text-[#78350f] mb-1.5 flex items-center gap-1.5">
              <span>❖ ĐẶC ĐIỂM NHẬN DIỆN:</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {costume.characteristics.map((c, i) => (
                <li
                  key={i}
                  className="text-[11px] text-[#451a03] flex items-start gap-1.5 leading-snug font-medium"
                >
                  <span className="text-[#b91c1c] mt-0.5">◆</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Poetic Quote */}
          <div className="text-[11px] italic text-[#78350f] border-l-3 border-[#b91c1c] pl-2.5 py-0.5 bg-[#fffdf8]">
            "{costume.quote}"
          </div>
        </div>

        {/* Right Column (5 cols): RPG Stats & Color Variants */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* RPG STATS PANEL */}
          <div className="bg-[#fffdf8] p-3 border-2 border-[#d97706]/35 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#78350f] uppercase tracking-wider">
                📊 THUỘC TÍNH (STATS RPG)
              </span>
              <span className="text-[10px] text-[#92400e] font-mono">Chỉ số y phục</span>
            </div>

            <div className="space-y-2">
              {costume.stats.map((s, i) => {
                const percentage = Math.min(100, Math.round((s.value / s.max) * 100));
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#451a03] font-semibold">{s.label}</span>
                      <span className="font-mono font-bold text-[#b45309]">
                        +{s.value} <span className="text-[#92400e] text-[9px]">/{s.max}</span>
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-[#e2e8f0] border border-[#d97706]/50 p-0.5 flex">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: s.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLOR VARIANTS SELECTOR */}
          <div className="bg-[#fffdf8] p-3 border-2 border-[#d97706]/35 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#78350f] uppercase tracking-wider">
                🎨 HỆ MÀU TRUYỀN THỐNG
              </span>
              <span className="text-[10px] text-[#92400e]">
                {costume.colors.join(' • ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {costume.colorVariants.map((v) => {
                const isCurrent = v.id === activeVariant.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      retroAudio.playBlip(480);
                      onSelectVariant(v);
                    }}
                    className={`flex flex-col items-center p-1.5 border-2 cursor-pointer transition-all ${
                      isCurrent
                        ? 'border-[#b91c1c] bg-[#fef2f2] shadow-sm -translate-y-0.5'
                        : 'border-[#d97706]/30 bg-[#faf5ef] hover:border-[#b45309]'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <span
                        className="w-4 h-4 border border-black/40"
                        style={{ backgroundColor: v.primaryColor }}
                      />
                      <span
                        className="w-2.5 h-4 border border-black/40"
                        style={{ backgroundColor: v.secondaryColor }}
                      />
                    </div>
                    <span className="text-[10px] text-center font-bold text-[#451a03] leading-tight line-clamp-1">
                      {v.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Note */}
            <div className="mt-2 text-[10px] text-[#78350f] bg-[#fef3c7]/60 p-1.5 border border-[#d97706]/30">
              <strong className="text-[#b91c1c]">{activeVariant.name}: </strong>
              {activeVariant.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
