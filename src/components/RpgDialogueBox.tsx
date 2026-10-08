import React, { useState, useEffect, useRef } from 'react';
import { Costume, ColorVariant, ScoreEvaluation, Scene } from '../types.ts';
import { retroAudio } from '../utils/audio.ts';

interface RpgDialogueBoxProps {
  costume: Costume;
  activeVariant: ColorVariant;
  onSelectVariant: (variant: ColorVariant) => void;
  evaluation: ScoreEvaluation;
  currentScene: Scene;
  onOpenAnatomy: () => void;
  gender: 'female' | 'male';
}

export const RpgDialogueBox: React.FC<RpgDialogueBoxProps> = ({
  costume,
  activeVariant,
  onSelectVariant,
  evaluation,
  currentScene,
  onOpenAnatomy,
  gender,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const typingTimerRef = useRef<number | null>(null);

  // Combined narrative: History & Scene commentary
  const fullNarrative = `${evaluation.feedback} ${costume.fullDescription}`;

  useEffect(() => {
    setDisplayedText('');
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    let charIdx = 0;
    typingTimerRef.current = window.setInterval(() => {
      charIdx += 2;
      if (charIdx >= fullNarrative.length) {
        setDisplayedText(fullNarrative);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      } else {
        setDisplayedText(fullNarrative.slice(0, charIdx));
        if (charIdx % 10 === 0) {
          retroAudio.playTypewriter();
        }
      }
    }, 20);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [costume.id, evaluation.feedback, currentScene.id]);

  const handleSkipTyping = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText(fullNarrative);
  };

  // Score styling
  const isPerfect = evaluation.score === 100;
  const isDanger = evaluation.score < 50;
  const isWarning = evaluation.ruleBreak && !isDanger;

  return (
    <div className="w-full transition-all duration-300">
      {/* Toggle button when collapsed */}
      {isCollapsed ? (
        <div className="flex justify-end p-2">
          <button
            onClick={() => {
              retroAudio.playBlip(440);
              setIsCollapsed(false);
            }}
            className="pixel-btn px-3 py-1.5 text-xs bg-[#78350f] text-[#fef08a] border-2 border-[#fef08a] shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <span>📜 HIỂN THỊ THÔNG SỐ & LỜI THOẠI</span>
            <span className="font-mono text-white bg-black/40 px-1.5 py-0.2 border border-white/30">
              {evaluation.score}/100
            </span>
          </button>
        </div>
      ) : (
        /* RPG DIALOGUE BOX DOCKED AT BOTTOM */
        <div
          className={`pixel-glass-dark border-3 rounded-none p-3 md:p-4 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.7)] transition-all ${
            isPerfect
              ? 'border-[#f59e0b] box-glow-gold'
              : isDanger
              ? 'border-[#ef4444] animate-pixel-red-blink'
              : 'border-[#b45309]'
          }`}
          style={{ imageRendering: 'auto' }}
        >
          <div className="flex flex-col md:flex-row items-stretch gap-3.5">
            {/* 1. CỘT TRÁI: AVATAR & TÊN TRANG PHỤC & BIẾN THỂ MÀU SẮC */}
            <div className="md:w-64 shrink-0 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#f59e0b]/30 pb-3 md:pb-0 md:pr-3.5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{gender === 'male' ? '🐉' : '🪷'}</span>
                    <span className="text-[10px] text-[#fed7aa] font-mono uppercase tracking-wider">
                      {costume.era}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#f59e0b] text-[#1e1305] font-bold px-1.5 py-0.2 border border-white">
                    {costume.rarity}
                  </span>
                </div>

                {/* TÊN TRANG PHỤC PHÁT SÁNG HOÀNG KIM */}
                <h3 className="text-sm md:text-base font-bold font-['Pixelify_Sans'] text-[#fef08a] glow-gold tracking-wide leading-tight">
                  {costume.name}
                </h3>
                <div className="text-[10px] text-[#fcd34d] font-mono mt-0.5">
                  [{activeVariant.name}]
                </div>
              </div>

              {/* Hệ màu sắc thu gọn */}
              <div className="mt-2.5">
                <div className="text-[9px] text-[#fed7aa] font-mono font-bold mb-1">
                  MÀU Y PHỤC:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {costume.colorVariants.map((v) => {
                    const isSelected = v.id === activeVariant.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          retroAudio.playBlip(500);
                          onSelectVariant(v);
                        }}
                        className={`px-1.5 py-0.5 text-[9px] font-mono border cursor-pointer transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#b91c1c] text-white border-[#fef08a] font-bold shadow-sm'
                            : 'bg-black/60 text-[#fed7aa] border-[#78350f] hover:border-[#f59e0b]'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-none inline-block border border-black"
                          style={{ backgroundColor: v.primaryColor }}
                        />
                        <span>{v.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. CỘT GIỮA: NỘI DUNG LỜI THOẠI & LỊCH SỬ (FONT SIÊU GỌN BE VIETNAM PRO) */}
            <div
              className="flex-1 flex flex-col justify-between cursor-pointer"
              onClick={handleSkipTyping}
              title="Nhấp để hiển thị nhanh toàn bộ văn bản"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#fcd34d] font-mono font-bold">
                    <span>📜 LỜI THOẠI ĐIỂN TÍCH & BỐI CẢNH:</span>
                  </div>
                  <span className="text-[9px] text-[#fde68a]/70 font-mono italic">
                    (Nhấp chuột để hiện toàn bộ)
                  </span>
                </div>

                {/* VĂN BẢN BE VIETNAM PRO DỄ ĐỌC, KHÔNG GAI MẮT */}
                <p className="font-content text-xs md:text-sm text-[#f8fafc] leading-relaxed tracking-normal font-normal min-h-[50px] md:min-h-[58px]">
                  {displayedText}
                </p>
              </div>

              {/* Tags & Điểm hòa hợp bối cảnh */}
              <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[10px]">
                <div className="flex items-center gap-1">
                  {costume.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-black/40 border border-[#f59e0b]/40 text-[#fed7aa] font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      retroAudio.playBlip(540);
                      onOpenAnatomy();
                    }}
                    className="text-[10px] text-[#fef08a] hover:underline font-mono cursor-pointer flex items-center gap-1"
                  >
                    <span>🔍</span>
                    <span>Chi tiết cắt may</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. CỘT PHẢI: BẢNG ĐIỂM & ĐÁNH GIÁ SÁNG RỰC */}
            <div className="md:w-56 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#f59e0b]/30 pt-3 md:pt-0 md:pl-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#fed7aa]">
                    THẨM ĐỊNH PHỐI ĐỒ:
                  </span>
                  <button
                    onClick={() => {
                      retroAudio.playBlip(320);
                      setIsCollapsed(true);
                    }}
                    className="text-[10px] text-[#cbd5e1] hover:text-white cursor-pointer"
                    title="Thu gọn hộp thoại"
                  >
                    ▼ Thu gọn
                  </button>
                </div>

                {/* ĐIỂM SỐ PHÁT SÁNG GLOW */}
                <div className="flex items-baseline gap-2">
                  <div
                    className={`text-2xl md:text-3xl font-black font-mono tracking-tight ${
                      isPerfect
                        ? 'text-[#fef08a] glow-gold'
                        : isDanger
                        ? 'text-[#ef4444]'
                        : isWarning
                        ? 'text-[#f43f5e]'
                        : 'text-[#10b981] glow-jade'
                    }`}
                  >
                    {evaluation.score}
                  </div>
                  <span className="text-xs text-[#fed7aa] font-mono">/ 100 Điểm</span>
                </div>

                {/* Thanh đo RPG */}
                <div className="w-full h-2 bg-black/80 border border-white/20 mt-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isPerfect
                        ? 'bg-[#f59e0b]'
                        : isDanger
                        ? 'bg-[#ef4444]'
                        : isWarning
                        ? 'bg-[#f43f5e]'
                        : 'bg-[#10b981]'
                    }`}
                    style={{ width: `${evaluation.score}%` }}
                  />
                </div>
              </div>

              {/* Danh hiệu & Bối cảnh */}
              <div className="mt-2 text-[10px]">
                <div
                  className={`font-['Pixelify_Sans'] font-bold leading-tight ${
                    isPerfect
                      ? 'text-[#fef08a]'
                      : isDanger
                      ? 'text-[#f87171]'
                      : 'text-[#86efac]'
                  }`}
                >
                  {evaluation.title}
                </div>
                <div className="text-[#fed7aa] font-mono text-[9px] mt-0.5">
                  Tại {currentScene.name.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
