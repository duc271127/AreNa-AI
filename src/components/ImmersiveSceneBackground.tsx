import React from 'react';
import { SceneId } from '../types.ts';

interface ImmersiveSceneBackgroundProps {
  sceneId: SceneId;
  gender: 'female' | 'male';
}

export const ImmersiveSceneBackground: React.FC<ImmersiveSceneBackgroundProps> = ({
  sceneId,
  gender,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* ================= CẢNH 1: SẢNH CUNG ĐÌNH HOÀNG GIA ================= */}
      {sceneId === 'cung-dinh' && (
        <div className="w-full h-full relative">
          {/* Nền hoàng tộc sâu thẳm */}
          <div
            className={`w-full h-full ${
              gender === 'male'
                ? 'bg-gradient-to-b from-[#0f172a] via-[#1e3a5f] to-[#0f172a]'
                : 'bg-gradient-to-b from-[#2e0818] via-[#831843] to-[#1a050e]'
            }`}
          />

          {/* Lưới kiến trúc cột cung đình sơn son thếp vàng */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 600"
            style={{ shapeRendering: 'crispEdges' }}
          >
            {/* Trần cung đình & xà ngang */}
            <rect x="0" y="0" width="1000" height="40" fill="#3b0f0f" />
            <rect x="0" y="40" width="1000" height="15" fill="#f59e0b" />
            <rect x="0" y="55" width="1000" height="10" fill="#78350f" />

            {/* Hoành phi câu đối chính giữa */}
            <rect x="360" y="15" width="280" height="35" fill="#b91c1c" stroke="#f59e0b" strokeWidth="2" />
            <text
              x="500"
              y="38"
              fill="#fef08a"
              fontSize="16"
              fontWeight="bold"
              fontFamily="Pixelify Sans, monospace"
              textAnchor="middle"
            >
              {gender === 'male' ? 'ĐẠI NAM HOÀNG TRIỀU' : 'HẬU CUNG DIÊN THỌ'}
            </text>

            {/* Cột cung đình gỗ lim đỏ viền vàng hai bên */}
            <rect x="50" y="65" width="45" height="535" fill="#7f1d1d" />
            <rect x="55" y="65" width="5" height="535" fill="#f59e0b" />
            <rect x="85" y="65" width="5" height="535" fill="#450a0a" />

            <rect x="140" y="65" width="30" height="535" fill="#7f1d1d" opacity="0.6" />
            <rect x="830" y="65" width="30" height="535" fill="#7f1d1d" opacity="0.6" />

            <rect x="905" y="65" width="45" height="535" fill="#7f1d1d" />
            <rect x="910" y="65" width="5" height="535" fill="#f59e0b" />
            <rect x="940" y="65" width="5" height="535" fill="#450a0a" />

            {/* Bức họa bình phong hoa văn rồng phượng mờ phía sau */}
            <g opacity="0.15">
              <circle cx="500" cy="260" r="140" fill="none" stroke="#fef08a" strokeWidth="4" />
              <rect x="380" y="180" width="240" height="160" fill="none" stroke="#f59e0b" strokeWidth="2" />
            </g>

            {/* Nền gạch cung đình lát đá hoa cương */}
            <rect x="0" y="480" width="1000" height="120" fill="#1e1b18" />
            <line x1="0" y1="480" x2="1000" y2="480" stroke="#f59e0b" strokeWidth="3" />
            {/* Lưới phối cảnh sàn */}
            <line x1="100" y1="480" x2="0" y2="600" stroke="#382e25" strokeWidth="2" />
            <line x1="300" y1="480" x2="200" y2="600" stroke="#382e25" strokeWidth="2" />
            <line x1="700" y1="480" x2="800" y2="600" stroke="#382e25" strokeWidth="2" />
            <line x1="900" y1="480" x2="1000" y2="600" stroke="#382e25" strokeWidth="2" />
          </svg>

          {/* Đèn lồng cung đình chuyển động */}
          <div className="absolute top-16 left-28 animate-lantern">
            <svg width="36" height="60" viewBox="0 0 16 28" style={{ shapeRendering: 'crispEdges' }}>
              <line x1="8" y1="0" x2="8" y2="6" stroke="#f59e0b" strokeWidth="1" />
              <rect x="2" y="6" width="12" height="16" fill="#b91c1c" />
              <rect x="4" y="8" width="8" height="12" fill="#fef08a" />
              <rect x="7" y="22" width="2" height="6" fill="#b91c1c" />
            </svg>
          </div>
          <div className="absolute top-16 right-28 animate-lantern" style={{ animationDelay: '0.8s' }}>
            <svg width="36" height="60" viewBox="0 0 16 28" style={{ shapeRendering: 'crispEdges' }}>
              <line x1="8" y1="0" x2="8" y2="6" stroke="#f59e0b" strokeWidth="1" />
              <rect x="2" y="6" width="12" height="16" fill="#b91c1c" />
              <rect x="4" y="8" width="8" height="12" fill="#fef08a" />
              <rect x="7" y="22" width="2" height="6" fill="#b91c1c" />
            </svg>
          </div>
        </div>
      )}

      {/* ================= CẢNH 2: ĐẦM SEN CHẠNG VẠNG (DÂN GIAN) ================= */}
      {sceneId === 'dam-sen' && (
        <div className="w-full h-full relative">
          {/* Hoàng hôn chạng vạng cam hồng tím lãng mạn */}
          <div className="w-full h-full bg-gradient-to-b from-[#4c1d95] via-[#c2410c] to-[#042f2e]" />

          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 600"
            style={{ shapeRendering: 'crispEdges' }}
          >
            {/* Mặt trời lặn đỏ rực */}
            <circle cx="500" cy="220" r="70" fill="#f97316" opacity="0.8" />
            <circle cx="500" cy="220" r="50" fill="#fde047" opacity="0.9" />

            {/* Mây ngũ sắc hoàng hôn */}
            <rect x="150" y="120" width="220" height="12" fill="#e879f9" opacity="0.5" />
            <rect x="220" y="132" width="180" height="10" fill="#f472b6" opacity="0.4" />
            <rect x="620" y="90" width="260" height="14" fill="#fb923c" opacity="0.5" />
            <rect x="680" y="104" width="160" height="10" fill="#facc15" opacity="0.4" />

            {/* Dãy núi xa xa mờ ảo */}
            <polygon points="0,320 180,240 380,320" fill="#581c87" opacity="0.6" />
            <polygon points="260,320 480,220 700,320" fill="#4c1d95" opacity="0.5" />
            <polygon points="620,320 820,230 1000,320" fill="#3b0764" opacity="0.7" />

            {/* Cây cầu tre khỉ lắc lẻo xa xa bên trái */}
            <path d="M 40 340 Q 180 310 320 340" stroke="#78350f" strokeWidth="6" fill="none" />
            <line x1="80" y1="330" x2="80" y2="380" stroke="#451a03" strokeWidth="4" />
            <line x1="180" y1="315" x2="180" y2="380" stroke="#451a03" strokeWidth="4" />
            <line x1="280" y1="330" x2="280" y2="380" stroke="#451a03" strokeWidth="4" />

            {/* Mặt nước hồ sen phản chiếu hoàng hôn */}
            <rect x="0" y="320" width="1000" height="280" fill="#064e3b" />
            <rect x="0" y="320" width="1000" height="40" fill="#0f766e" opacity="0.5" />

            {/* Ánh phản chiếu lấp lánh trên mặt nước */}
            <line x1="450" y1="330" x2="550" y2="330" stroke="#fed7aa" strokeWidth="2" opacity="0.7" />
            <line x1="420" y1="345" x2="580" y2="345" stroke="#fed7aa" strokeWidth="3" opacity="0.6" />
            <line x1="390" y1="365" x2="610" y2="365" stroke="#fdba74" strokeWidth="2" opacity="0.5" />

            {/* Lá sen và hoa sen nổi trên mặt hồ */}
            {/* Cụm sen bên trái */}
            <ellipse cx="140" cy="420" rx="45" ry="12" fill="#047857" />
            <ellipse cx="140" cy="419" rx="36" ry="9" fill="#10b981" />
            <circle cx="160" cy="405" r="10" fill="#f43f5e" />
            <circle cx="160" cy="405" r="4" fill="#fef08a" />

            <ellipse cx="230" cy="470" rx="60" ry="15" fill="#047857" />
            <ellipse cx="230" cy="469" rx="48" ry="11" fill="#10b981" />
            <circle cx="210" cy="450" r="12" fill="#fb7185" />

            {/* Cụm sen bên phải */}
            <ellipse cx="820" cy="430" rx="50" ry="14" fill="#047857" />
            <ellipse cx="820" cy="429" rx="40" ry="10" fill="#10b981" />
            <circle cx="840" cy="415" r="11" fill="#f43f5e" />

            <ellipse cx="890" cy="490" rx="65" ry="16" fill="#047857" />
            <ellipse cx="890" cy="489" rx="52" ry="12" fill="#10b981" />
            <circle cx="880" cy="470" r="13" fill="#fb7185" />
          </svg>

          {/* Đom đóm bay chập chờn */}
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#fef08a] rounded-full animate-ping opacity-75" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-[#fde047] rounded-full animate-ping opacity-60" style={{ animationDelay: '1.2s' }} />
        </div>
      )}

      {/* ================= CẢNH 3: PHỐ CỔ HỘI AN (LỄ HỘI ĐÊM) ================= */}
      {sceneId === 'hoi-an' && (
        <div className="w-full h-full relative">
          {/* Trời đêm phố cổ huyền ảo tím thẫm */}
          <div className="w-full h-full bg-gradient-to-b from-[#0b0c1e] via-[#1e1b4b] to-[#041c2c]" />

          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 600"
            style={{ shapeRendering: 'crispEdges' }}
          >
            {/* Vầng trăng rằm tròn sáng vằng vặc */}
            <circle cx="750" cy="110" r="42" fill="#fef08a" />
            <circle cx="750" cy="110" r="46" fill="#fef08a" opacity="0.3" />

            {/* Dãy nhà cổ tường vàng Hội An bên trái */}
            <polygon points="0,200 120,160 220,200" fill="#451a03" /> {/* Mái ngói rêu */}
            <rect x="0" y="200" width="200" height="180" fill="#d97706" /> {/* Tường vàng cổ */}
            <rect x="30" y="240" width="40" height="50" fill="#291407" /> {/* Cửa sổ gỗ */}
            <rect x="110" y="240" width="50" height="90" fill="#291407" /> {/* Cửa đi */}

            {/* Dãy nhà cổ bên phải */}
            <polygon points="780,180 880,140 1000,180" fill="#451a03" />
            <rect x="800" y="180" width="200" height="200" fill="#d97706" />
            <rect x="830" y="220" width="40" height="50" fill="#291407" />
            <rect x="910" y="220" width="50" height="90" fill="#291407" />

            {/* Dây chăng đèn lồng giữa hai bờ phố */}
            <path d="M 120 180 Q 500 240 880 160" stroke="#78350f" strokeWidth="2" fill="none" />

            {/* Dòng sông Hoài đêm hội hoa đăng */}
            <rect x="0" y="380" width="1000" height="220" fill="#082f49" />
            <rect x="0" y="380" width="1000" height="30" fill="#0c4a6e" opacity="0.7" />

            {/* Vệt ánh sáng vàng lung linh trên mặt sông */}
            <line x1="700" y1="400" x2="800" y2="400" stroke="#fef08a" strokeWidth="3" opacity="0.7" />
            <line x1="680" y1="420" x2="820" y2="420" stroke="#fef08a" strokeWidth="2" opacity="0.6" />
            <line x1="650" y1="450" x2="850" y2="450" stroke="#fde047" strokeWidth="2" opacity="0.5" />

            {/* Hoa đăng trôi bồng bềnh trên sông Hoài */}
            {/* Hoa đăng 1 */}
            <polygon points="320,440 330,432 340,440 330,444" fill="#f43f5e" />
            <circle cx="330" cy="434" r="3" fill="#fef08a" />

            {/* Hoa đăng 2 */}
            <polygon points="460,470 472,460 484,470 472,475" fill="#f59e0b" />
            <circle cx="472" cy="462" r="4" fill="#ffffff" />

            {/* Hoa đăng 3 */}
            <polygon points="620,430 630,422 640,430 630,434" fill="#06b6d4" />
            <circle cx="630" cy="424" r="3" fill="#fef08a" />

            {/* Hoa đăng 4 */}
            <polygon points="210,500 222,490 234,500 222,505" fill="#a855f7" />
            <circle cx="222" cy="492" r="3" fill="#fef08a" />
          </svg>

          {/* Dàn đèn lồng Hội An đung đưa trên dây chăng */}
          <div className="absolute top-28 left-1/3 animate-lantern">
            <svg width="24" height="40" viewBox="0 0 16 28">
              <rect x="2" y="4" width="12" height="16" rx="4" fill="#ef4444" />
              <rect x="5" y="6" width="6" height="12" fill="#fef08a" />
            </svg>
          </div>

          <div className="absolute top-36 left-1/2 -translate-x-1/2 animate-lantern" style={{ animationDelay: '0.6s' }}>
            <svg width="28" height="46" viewBox="0 0 16 28">
              <rect x="2" y="4" width="12" height="16" rx="4" fill="#f59e0b" />
              <rect x="5" y="6" width="6" height="12" fill="#ffffff" />
            </svg>
          </div>

          <div className="absolute top-24 right-1/3 animate-lantern" style={{ animationDelay: '1.1s' }}>
            <svg width="24" height="40" viewBox="0 0 16 28">
              <rect x="2" y="4" width="12" height="16" rx="4" fill="#06b6d4" />
              <rect x="5" y="6" width="6" height="12" fill="#fef08a" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
