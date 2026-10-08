import { Scene } from '../types.ts';

export const SCENES_DATA: Scene[] = [
  {
    id: 'cung-dinh',
    name: 'Sảnh Cung Đình Hoàng Gia',
    shortName: 'Cung Đình',
    subtitle: 'Sơn son thếp vàng • Rồng phượng chầu nhật • Uy nghiêm đại triều',
    icon: '🏛️',
    timeOfDay: 'Đại Triều Buổi Sáng',
    wardrobeObjectName: 'Tủ Gỗ Lim Khảm Trai',
    wardrobeClosedIcon: '🚪',
    wardrobeOpenIcon: '✨',
    description: 'Không gian chánh điện cung đình thời Nguyễn, cột gỗ lim sơn son thếp vàng, chạm khắc rồng phượng tinh vi.'
  },
  {
    id: 'dam-sen',
    name: 'Đầm Sen Chạng Vạng',
    shortName: 'Đầm Sen',
    subtitle: 'Nắng chiều buông • Cầu tre kẽo kẹt • Gió đồng thơm ngát hương sen',
    icon: '🪷',
    timeOfDay: 'Hoàng Hôn Dân Gian',
    wardrobeObjectName: 'Đài Sen Khổng Lồ',
    wardrobeClosedIcon: '🪷',
    wardrobeOpenIcon: '🌸',
    description: 'Cảnh sắc đồng quê Bắc Bộ thanh bình, mặt nước phản chiếu ráng chiều, đài sen hé nở đón làn gió mát.'
  },
  {
    id: 'hoi-an',
    name: 'Phố Cổ Hội An Lễ Hội Đêm',
    shortName: 'Phố Cổ',
    subtitle: 'Sông Hoài lấp lánh • Đèn lồng lung linh • Hoa đăng bồng bềnh',
    icon: '🏮',
    timeOfDay: 'Đêm Hội Hoa Đăng',
    wardrobeObjectName: 'Rương Cổ & Quầy Lụa Phố',
    wardrobeClosedIcon: '📦',
    wardrobeOpenIcon: '🏮',
    description: 'Phố hội lung linh đèn lồng rực rỡ, mái ngói rêu phong cổ kính và dòng sông Hoài ngập tràn hoa đăng ngũ sắc.'
  }
];
