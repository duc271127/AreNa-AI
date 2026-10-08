import React from 'react';
import { Costume } from '../types.ts';
import { retroAudio } from '../utils/audio.ts';

interface AnatomyModalProps {
  costume: Costume;
  onClose: () => void;
}

export const AnatomyModal: React.FC<AnatomyModalProps> = ({ costume, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#151124] border-4 border-[#f8b800] shadow-[0_0_24px_rgba(248,184,0,0.4)] p-4 md:p-6 text-white relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#382b52]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="text-base md:text-lg font-bold text-[#f8b800]">
              CHI TIẾT CẤU TẠO MAY MẶC: {costume.name.toUpperCase()}
            </h3>
          </div>
          <button
            onClick={() => {
              retroAudio.playBlip(300);
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center bg-[#851d28] hover:bg-[#b71c1c] border border-[#f8b800] text-white font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Historical Context lore */}
        <div className="bg-[#1f1733] p-3 border border-[#3b2b5d] mb-4">
          <h4 className="text-xs font-bold text-[#ffd54f] uppercase mb-1">
            ⚜ NGUỒN GỐC & ĐIỂN CHẾ TRIỀU ĐẠI
          </h4>
          <p className="text-xs text-[#ded5ee] leading-relaxed">{costume.historyLore}</p>
        </div>

        {/* 4 Architectural Aspects of the Costume */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {/* 1. Cổ áo */}
          <div className="bg-[#1b152d] p-3 border border-[#31254e]">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#f8b800]">
              <span>👔</span> CỔ ÁO (CỔ LĨNH)
            </div>
            <p className="text-xs text-[#cfc2e6] leading-relaxed">{costume.anatomy.collar}</p>
          </div>

          {/* 2. Ống tay */}
          <div className="bg-[#1b152d] p-3 border border-[#31254e]">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#f8b800]">
              <span>🥋</span> TAY ÁO (TAY THỤNG / CHẼN)
            </div>
            <p className="text-xs text-[#cfc2e6] leading-relaxed">{costume.anatomy.sleeves}</p>
          </div>

          {/* 3. Thân áo & Khuy cài */}
          <div className="bg-[#1b152d] p-3 border border-[#31254e]">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#f8b800]">
              <span>🪡</span> THÂN ÁO & KHUY CÀI (NGŨ THÂN)
            </div>
            <p className="text-xs text-[#cfc2e6] leading-relaxed">{costume.anatomy.panels}</p>
          </div>

          {/* 4. Phụ kiện đi kèm */}
          <div className="bg-[#1b152d] p-3 border border-[#31254e]">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#f8b800]">
              <span>👑</span> PHỤ KIỆN KÈM THEO
            </div>
            <p className="text-xs text-[#cfc2e6] leading-relaxed">
              {costume.anatomy.accessories}
            </p>
          </div>
        </div>

        {/* Special Focus on Ngũ Thân Philosophy if applicable */}
        <div className="bg-[#110d1c] p-3 border border-[#2b2042] text-[11px] text-[#baaecd]">
          <strong className="text-[#ffd54f]">Ý nghĩa triết lý phương Đông trong Việt Phục:</strong>{' '}
          Áo ngũ thân tượng trưng cho đạo làm người: bốn thân ngoài che chở tứ thân phụ mẫu (cha mẹ
          ruột và cha mẹ vợ/chồng), thân con bên trong thể hiện bản thân người mặc được nâng đỡ. Năm
          chiếc khuy cài tượng trưng cho năm đức tính của người quân tử: Nhân - Lễ - Nghĩa - Trí -
          Tín.
        </div>

        {/* Close Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              retroAudio.playBlip(300);
              onClose();
            }}
            className="px-5 py-2 bg-[#2d1c44] hover:bg-[#432a63] border-2 border-[#f8b800] text-[#f8b800] font-bold text-xs uppercase cursor-pointer"
          >
            Đóng Hộp Thoại [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
