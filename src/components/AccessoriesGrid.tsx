import React from 'react';
import { Accessory } from '../types.ts';
import { ACCESSORIES_DATA } from '../data/accessories.ts';
import { retroAudio } from '../utils/audio.ts';

interface AccessoriesGridProps {
  equippedAccessories: Accessory[];
  onToggleAccessory: (accessory: Accessory) => void;
  gender: 'female' | 'male';
}

export const AccessoriesGrid: React.FC<AccessoriesGridProps> = ({
  equippedAccessories,
  onToggleAccessory,
  gender,
}) => {
  const equippedIds = equippedAccessories.map((a) => a.id);

  // Lọc phụ kiện theo giới tính
  const displayAccessories = ACCESSORIES_DATA.filter(
    (a) => a.gender === gender || a.gender === 'unisex'
  );

  return (
    <div
      className={`flex flex-col p-3.5 border-3 shadow-md transition-all ${
        gender === 'male'
          ? 'bg-[#faf6ed] border-[#1e3a5f] pixel-carved-gold'
          : 'bg-[#fffbf5] border-[#9d174d] pixel-carved-gold'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b-2 border-[#d97706]/40">
        <div className="flex items-center gap-2">
          <span className="text-base">💎</span>
          <span
            className={`text-xs font-bold tracking-wider uppercase font-['Pixelify_Sans'] ${
              gender === 'male' ? 'text-[#0f172a]' : 'text-[#831843]'
            }`}
          >
            PHỤ KIỆN {gender === 'male' ? 'NAM GIỚI' : 'NỮ QUÝ TỘC'}
          </span>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 border font-bold ${
            equippedAccessories.length === 2
              ? 'bg-[#b91c1c] text-white border-[#fef08a]'
              : 'bg-[#fef3c7] text-[#92400e] border-[#d97706]'
          }`}
        >
          {equippedAccessories.length}/2 ĐÃ ĐEO
        </span>
      </div>

      <div className="text-[11px] text-[#451a03] mb-2.5">
        Chọn tối đa <strong className="text-[#b91c1c]">2 món phụ kiện</strong> để phối cùng y phục:
      </div>

      {/* Grid of Accessories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayAccessories.map((acc) => {
          const isEquipped = equippedIds.includes(acc.id);

          return (
            <button
              key={acc.id}
              onClick={() => {
                retroAudio.playBlip(isEquipped ? 320 : 520);
                onToggleAccessory(acc);
              }}
              onMouseEnter={() => retroAudio.playBlip(280)}
              className={`group flex items-start gap-2.5 p-2 text-left cursor-pointer transition-all border-2 ${
                isEquipped
                  ? gender === 'male'
                    ? 'bg-[#1e3a5f] text-white border-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.5)] -translate-y-0.5'
                    : 'bg-[#831843] text-white border-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.5)] -translate-y-0.5'
                  : 'bg-[#faf5ef] text-[#1e1305] border-[#d97706]/50 hover:border-[#b45309] hover:bg-[#fef3c7]'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-9 h-9 flex items-center justify-center text-lg border-2 shrink-0 ${
                  isEquipped
                    ? 'bg-black/30 border-[#fef08a]'
                    : 'bg-[#fef3c7] border-[#d97706]/40 group-hover:border-[#b45309]'
                }`}
              >
                {acc.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5
                    className={`text-xs font-bold truncate ${
                      isEquipped ? 'text-[#fef08a]' : 'text-[#1e1305] group-hover:text-[#b45309]'
                    }`}
                  >
                    {acc.name}
                  </h5>
                  <span
                    className={`text-[10px] font-mono font-bold shrink-0 ${
                      isEquipped ? 'text-[#a7f3d0]' : 'text-[#047857]'
                    }`}
                  >
                    +{acc.scoreBonus}đ
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {acc.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-mono px-1 py-0.2 border ${
                        isEquipped
                          ? 'bg-black/40 text-[#fde047] border-[#f59e0b]/50'
                          : 'bg-[#fef3c7] text-[#92400e] border-[#d97706]/40'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  {isEquipped && (
                    <span className="text-[9px] bg-[#f59e0b] text-[#0f172a] font-mono font-bold px-1 ml-auto">
                      ĐANG ĐEO
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
