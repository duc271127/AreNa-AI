import React from 'react';
import { Costume } from '../types.ts';
import { retroAudio } from '../utils/audio.ts';

interface WardrobeGridProps {
  costumes: Costume[];
  selectedCostume: Costume;
  onSelectCostume: (costume: Costume) => void;
  gender: 'female' | 'male';
}

export const WardrobeGrid: React.FC<WardrobeGridProps> = ({
  costumes,
  selectedCostume,
  onSelectCostume,
  gender,
}) => {
  // Lọc trang phục theo giới tính
  const displayCostumes = costumes.filter(
    (c) => c.gender === gender || c.gender === 'unisex'
  );

  return (
    <div
      className={`flex flex-col p-3.5 border-3 shadow-md transition-all ${
        gender === 'male'
          ? 'bg-[#faf6ed] border-[#1e3a5f] pixel-carved-gold'
          : 'bg-[#fffbf5] border-[#9d174d] pixel-carved-gold'
      }`}
    >
      {/* Wardrobe Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b-2 border-[#d97706]/40">
        <div className="flex items-center gap-2">
          <span className="text-base">{gender === 'male' ? '🐉' : '🪷'}</span>
          <span
            className={`text-xs font-bold tracking-wider uppercase font-['Pixelify_Sans'] ${
              gender === 'male' ? 'text-[#0f172a]' : 'text-[#831843]'
            }`}
          >
            TỦ ĐỒ {gender === 'male' ? 'NAM QUAN VIÊN' : 'NỮ QUÝ TỘC'}
          </span>
        </div>
        <span className="text-[10px] bg-[#fef3c7] text-[#92400e] border border-[#d97706] font-mono px-1.5 py-0.5 font-bold">
          {displayCostumes.length} BỘ Y PHỤC
        </span>
      </div>

      <div className="text-[11px] text-[#451a03] mb-3 leading-relaxed">
        Chọn bộ y phục hoàng triều để khoác lên mô hình và thẩm định phong vị:
      </div>

      {/* Grid of Costumes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {displayCostumes.map((c, index) => {
          const isSelected = c.id === selectedCostume.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                retroAudio.playEquip();
                onSelectCostume(c);
              }}
              onMouseEnter={() => retroAudio.playBlip(320)}
              className={`group relative flex flex-col p-2.5 text-left cursor-pointer transition-all border-2 ${
                isSelected
                  ? gender === 'male'
                    ? 'bg-[#1e3a5f] text-white border-[#f59e0b] shadow-[0_0_14px_rgba(245,158,11,0.5)] -translate-y-0.5'
                    : 'bg-[#831843] text-white border-[#f59e0b] shadow-[0_0_14px_rgba(245,158,11,0.5)] -translate-y-0.5'
                  : 'bg-[#faf5ef] text-[#1e1305] border-[#d97706]/50 hover:border-[#b45309] hover:bg-[#fef3c7]'
              }`}
            >
              {/* Slot Index Badge & Base Score */}
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 font-bold border ${
                    isSelected
                      ? 'bg-[#f59e0b] text-[#0f172a] border-white'
                      : 'bg-[#fef3c7] text-[#92400e] border-[#d97706]'
                  }`}
                >
                  [{index + 1}]
                </span>

                <span
                  className={`text-[10px] font-mono font-bold ${
                    isSelected ? 'text-[#fef08a]' : 'text-[#b91c1c]'
                  }`}
                >
                  {c.baseScore || 50} ĐIỂM
                </span>
              </div>

              {/* Title & Dynasty */}
              <div className="flex-1 my-1">
                <h4
                  className={`text-xs font-bold tracking-wide truncate ${
                    isSelected ? 'text-[#fef08a]' : 'text-[#1e1305] group-hover:text-[#b45309]'
                  }`}
                >
                  {c.name}
                </h4>
                <div
                  className={`text-[10px] line-clamp-1 ${
                    isSelected ? 'text-[#cbd5e1]' : 'text-[#78350f]'
                  }`}
                >
                  {c.dynastyTag}
                </div>

                {/* Costume Tags */}
                {c.tags && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {c.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[9px] font-mono px-1 py-0.2 border ${
                          isSelected
                            ? 'bg-black/30 text-[#fde047] border-[#f59e0b]/60'
                            : 'bg-[#fef3c7] text-[#92400e] border-[#d97706]/40'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors preview */}
              <div
                className={`flex items-center gap-1.5 mt-2 pt-1.5 border-t ${
                  isSelected ? 'border-white/20' : 'border-[#d97706]/20'
                }`}
              >
                <div className="flex items-center gap-1">
                  {c.colorVariants.map((v) => (
                    <span
                      key={v.id}
                      className="w-2.5 h-2.5 border border-black/40"
                      style={{ backgroundColor: v.primaryColor }}
                      title={v.name}
                    />
                  ))}
                </div>
                <span
                  className={`text-[9px] ml-auto ${
                    isSelected ? 'text-[#e2e8f0]' : 'text-[#78350f]'
                  }`}
                >
                  {isSelected ? '▶ ĐANG MẶC' : c.colors[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
