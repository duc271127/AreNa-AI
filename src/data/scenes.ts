import { Scene } from '../types.ts';

/**
 * =========================================================================
 * KHAI BÁO CÁC BIẾN CHỨA URL ẢNH BACKGROUND TƯƠNG TÁC
 * Người dùng có thể dán link ảnh trực tiếp vào 3 biến dưới đây:
 * =========================================================================
 */
export const BG_IMAGE_1 = ""; // Cảnh 1: Chốn Bồng Lai (Mây Hồng Cam Pastel & Quầng Trăng Vàng Kem)
export const BG_IMAGE_2 = "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.15752-9/836219224_1997907620916643_8980425622490713833_n.png?stp=dst-png&cstp=mx2528x1686&ctp=s2048x2048&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGEPZPAhtdnNWH-b8tVJh-_x2TNSdjf1XbHZM1J2N_VdpvpTAPdVB7vINCobo6yndbVuu8A6Ac8rLKaIs_t8yfL&_nc_ohc=9V0jVLelpnEQ7kNvwG9oxZH&_nc_oc=Adod36ltIu3qHu50o0baOesXoAFi5MOA-n_cnV2ziUSNjVDGLZTDur28iMqSxlUyk34&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_ss=7b2a8&oh=03_Q7cD6gEGcBA4MYVtgLahY6eUQyoDqQEXua-kYMaENTAufqh11w&oe=6AEF39E9"; // Cảnh 2: Sơn Thần Tế Đàn (Rừng sâu huyền bí)
export const BG_IMAGE_3 = "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.15752-9/836379157_1667450504808075_2976681233974252893_n.png?stp=dst-png&cstp=mx2738x1568&ctp=s2048x2048&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH3rZX1trRlFB0vFZJKTwy-sn5T_bp-foOyflP9un5-g0JjiIVQUrD5JvdAkgTHjVmS0pLx0dxBOZi2c7TtBOgr&_nc_ohc=MzjfDsYe_OIQ7kNvwGP7VuX&_nc_oc=AdoRhnpob01mgp7qQ1a6LK6XOKqDA5czYv8oTq95eQ6dAM-OOC8cAwZXK1wOOc20vXc&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_ss=7b2a8&oh=03_Q7cD6gGUPg7I2eg9f97ByL4QmOlTh9gGBCANxkxMZB0CxuJEiw&oe=6AEF5194"; // Cảnh 3: Cửu Long Cuốn Thư (Uy nghiêm rồng phượng)
export const BG_IMAGE_4 = "https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/838500804_1204816268972831_7486355059931175921_n.png?stp=dst-png&cstp=mx2470x1728&ctp=s2048x2048&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHO3v2LoSn0C3yEn0b3RsPbor3GE48xYYWivcYTjzFhhcQ0Y6nfWarpIladPrPL29riFOfblJGi7gtNB4V4W14d&_nc_ohc=g_E11g-y4CIQ7kNvwEC2S-_&_nc_oc=AdqYYrw8PJDj6qkf3bzKuSwue7bP0-YqK7GetYz8NxFf_mq_iVfEnBd-_H31Uq-I-CU&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_ss=7b2a8&oh=03_Q7cD6gHusPrhx0RNgoX_6BFBqEWIWEN9NakCdBiNYt8tom2yxw&oe=6AEF3267"; // Cảnh 4: Cửu Long Cuốn Thư (Đầm Sen Chạng Vạng)
export const BG_IMAGE_5 = "https://scontent.fhan14-4.fna.fbcdn.net/v/t1.15752-9/842234501_1617600339833998_8967172717571920960_n.png?stp=dst-png&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEUUhUfaWxbu_8SGXUy7WwAs4zH60BU_3izjMfrQFT_eAgmkYHCjwBDEBNf_2CNhUt1Mv2E2gziIfol0ZRirh-O&_nc_ohc=53xHCA7kvj0Q7kNvwFGOySS&_nc_oc=Adp7seQiJfJLSs4MXsL3Cj-kJ2P5CdXBYHJVtS1jqTMkYzEgSQdITbo4HIfAVEsiaS4&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_ss=7b2a8&oh=03_Q7cD6gEw2WjDQe-NXgQA6-7T6CrNM88KwsvWvixUOhVGFuxmFQ&oe=6AEF602D"; // Cảnh 3: Cửu Long Cuốn Thư (Uy nghiêm rồng phượng)
export const BG_IMAGE_6 = "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/840166480_4578253562493784_983355529817466320_n.png?stp=dst-png&cstp=mx2730x1536&ctp=s2048x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE5e4bA80BaYQEgLs7GVGyhbFwD5YRWDvlsXAPlhFYO-c8UvDnzbLOSl2Osp1Fk7qXUNNxhshGqOB5JFiinxW9g&_nc_ohc=7VtfK3EdQZIQ7kNvwEbOCe9&_nc_oc=AdpUERcNNOQQkKaNyCkrGVo1fsK-NTXyYcfDuYpK_wmfY8Kgw1KffYNcbpoj4GXKDSA&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_ss=7b2a8&oh=03_Q7cD6gFDJ2WjiicUVtjUFJCbmsKgE1hSEZEZICUJeWDRtU6RLg&oe=6AEF3E59"; // Cảnh 3: Cửu Long Cuốn Thư (Uy nghiêm rồng phượng)



export const SCENES_DATA: Scene[] = [
  {
    id: 'bong-lai',
    name: 'Chốn Bồng Lai (Mây Hồng Cam)',
    shortName: 'Bồng Lai',
    subtitle: 'Mây hồng rực rỡ • Vầng dương tiên cảnh • Tiên khí phiêu bồng',
    icon: '☁️',
    timeOfDay: 'Bình Minh Bồng Lai',
    wardrobeObjectName: 'Khối Mây Tiên Phát Sáng',
    wardrobeClosedIcon: '☁️',
    wardrobeOpenIcon: '✨',
    description: 'Chốn bồng lai tiên cảnh ngập tràn mây hồng cam bồng bềnh, vầng dương chiếu rọi đỉnh núi huyền ảo.',
    imageUrl: BG_IMAGE_1,
  },
  {
    id: 'son-than',
    name: 'Sơn Thần Tế Đàn (Rừng Sâu Huyền Bí)',
    shortName: 'Sơn Thần',
    subtitle: 'Đại ngàn thâm nghiêm • Tế đàn trống thiêng • Lụa tiên bay lượn',
    icon: '🥁',
    timeOfDay: 'Đêm Thiêng Huyền Bí',
    wardrobeObjectName: 'Chiếc Trống Đỏ Khổng Lồ',
    wardrobeClosedIcon: '🥁',
    wardrobeOpenIcon: '🌟',
    description: 'Tế đàn linh thiêng giữa đại ngàn non nước, trống thiêng trầm hùng hòa cùng ánh chớp và lụa ngũ sắc.',
    imageUrl: BG_IMAGE_2,
  },
  {
    id: 'cuu-long',
    name: 'Cửu Long Cuốn Thư (Uy Nghiêm)',
    shortName: 'Cửu Long',
    subtitle: 'Rồng lượn phượng múa • Thánh chỉ hoàng gia • Uy nghiêm thịnh thế',
    icon: '📜',
    timeOfDay: 'Hoàng Kim Thịnh Thế',
    wardrobeObjectName: 'Cuốn Thư Hoàng Gia Dát Vàng',
    wardrobeClosedIcon: '📜',
    wardrobeOpenIcon: '✨',
    description: 'Không gian uy nghiêm rồng phượng chầu nhật trên nền ngọc bích, cuốn thư thánh chỉ dát vàng uốn lượn rực rỡ.',
    imageUrl: BG_IMAGE_3,
  },
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
    description: 'Không gian chánh điện cung đình thời Nguyễn, cột gỗ lim sơn son thếp vàng, chạm khắc rồng phượng tinh vi.',
    imageUrl: BG_IMAGE_6,
  },
  {
    id: 'dam-sen',
    name: 'Đầm Sen Chạng Vạng',
    shortName: 'Đầm Sen',
    subtitle: 'Nắng chiều buông • Cầu tre kẽo kẹt • Gió đồng ngát hương',
    icon: '🪷',
    timeOfDay: 'Hoàng Hôn Dân Gian',
    wardrobeObjectName: 'Đài Sen Khổng Lồ',
    wardrobeClosedIcon: '🪷',
    wardrobeOpenIcon: '🌸',
    description: 'Cảnh sắc đồng quê Bắc Bộ thanh bình, mặt nước phản chiếu ráng chiều hoàng hôn.',
    imageUrl: BG_IMAGE_4,
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
    description: 'Phố hội lung linh đèn lồng rực rỡ, mái ngói rêu phong cổ kính và dòng sông Hoài ngập tràn hoa đăng.',
    imageUrl: BG_IMAGE_5,
  }
];
