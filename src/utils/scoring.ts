import { Costume, Accessory, ScoreEvaluation } from '../types.ts';

/**
 * HỆ THỐNG CHẤM ĐIỂM & ĐÁNH GIÁ PHỐI ĐỒ VIỆT PHỤC (calculateScore)
 * 
 * Thang điểm tối đa: 100 Điểm
 * - Điểm cơ bản theo trang phục (50 - 60 điểm)
 * - Mỗi phụ kiện hợp Tag / tương thích: +15 đến +25 điểm (Tối đa 2 phụ kiện)
 * - Các luật phạt (Penalties) & Lệch chuẩn lịch sử
 */
export function calculateScore(
  costume: Costume,
  equippedAccessories: Accessory[]
): ScoreEvaluation {
  // 1. Điểm khởi điểm từ bộ trang phục (Áo Mã Đoán: 60, Lập Lĩnh: 55, Nhật Bình: 60, v.v.)
  let currentScore = costume.baseScore || 50;
  const bonuses: string[] = [`+${currentScore} điểm: Trang bị ${costume.name} [${costume.tags.join(', ')}]`];
  const penalties: string[] = [];
  let warningMessage = '';
  let ruleBreak = false;

  const equippedIds = equippedAccessories.map((a) => a.id);
  const hasMan = equippedIds.includes('man');
  const hasKhanXep = equippedIds.includes('khan-xep');
  const hasNonBaTam = equippedIds.includes('non-ba-tam');
  const hasGuocMoc = equippedIds.includes('guoc-moc');
  const hasTramCaiDa = equippedIds.includes('tram-cai-da');

  // 2. Tính điểm cộng từ phụ kiện
  equippedAccessories.forEach((acc) => {
    const isDirectlyCompatible = acc.compatibleCostumeIds.includes(costume.id);
    const hasTagOverlap = acc.tags.some((t) => costume.tags.includes(t));

    if (isDirectlyCompatible || hasTagOverlap) {
      currentScore += acc.scoreBonus;
      bonuses.push(`+${acc.scoreBonus} điểm: Phụ kiện "${acc.name}" phối hợp chuẩn mực cùng ${costume.name}`);
    } else {
      // Phụ kiện trung tính
      const neutralBonus = Math.max(10, acc.scoreBonus - 10);
      currentScore += neutralBonus;
      bonuses.push(`+${neutralBonus} điểm: Phụ kiện "${acc.name}" tăng tính thẩm mỹ`);
    }
  });

  /* =========================================================================
     CÁC LUẬT PHẠT (PENALTY RULES) & KIỂM TRA LỆCH CHUẨN LỊCH SỬ
     ========================================================================= */

  /**
   * LUẬT MỚI 1: Áo Mã Đoán (Quan chức) hoặc Áo Nhật Bình (Hậu phi) đi kèm Guốc Mộc hoặc Nón Ba Tầm
   * => Trừ 50 điểm, cảnh báo đỏ "Vật phẩm dân gian không phối cùng triều phục"
   */
  if (
    (costume.id === 'ao-ma-doan' || costume.id === 'ao-nhat-binh') &&
    (hasGuocMoc || hasNonBaTam)
  ) {
    currentScore -= 50;
    ruleBreak = true;
    penalties.push('-50 điểm: Lệch chuẩn triều cương (Vật phẩm dân gian không phối cùng triều phục)');
    warningMessage =
      'Cảnh báo: Vật phẩm dân gian không phối cùng triều phục! Áo Mã Đoán và Áo Nhật Bình là trang phục phẩm cấp cao quý nơi triều đình, tuyệt đối không thể phối cùng Guốc Mộc hay Nón Ba Tầm dân dã.';
  }

  /**
   * LUẬT MỚI 2: Áo Tứ Thân (Dân gian, Lao động) đi cùng Trâm Cài Hậu Phi / Trâm Cài Tóc Gắn Đá
   * => Trừ 30 điểm, cảnh báo không hợp
   */
  if (costume.id === 'ao-tu-than' && hasTramCaiDa) {
    currentScore -= 30;
    ruleBreak = true;
    penalties.push('-30 điểm: Trâm cài cung đình không hợp với trang phục dân gian tứ thân');
    if (!warningMessage) {
      warningMessage =
        'Cảnh báo: Trâm cài cung đình gắn đá quý không hợp với trang phục dân gian tứ thân chất phác! Hãy thay bằng Nón Ba Tầm hoặc Quai Thao Kép.';
    }
  }

  /**
   * LUẬT 3: Áo Tấc (Nam/Nữ) là đại lễ phục trang nghiêm, bắt buộc phải có Mấn/Khăn Đóng
   */
  if (costume.id === 'ao-tac' || costume.id === 'ao-tac-nam') {
    const hasHeadgear = costume.gender === 'male' ? hasKhanXep : (hasMan || hasKhanXep);
    if (!hasHeadgear) {
      currentScore -= 20;
      ruleBreak = true;
      penalties.push('-20 điểm: Áo Tấc thiếu Mấn/Khăn Đóng trang trọng');
      if (!warningMessage) {
        warningMessage =
          'Áo Tấc là y phục dùng trong các đại lễ, tế tự thiêng liêng. Đừng quên đội thêm Khăn đóng hoặc Mấn để tổng thể thêm phần trang trọng, thành kính.';
      }
    }
  }

  // 3. Khống chế khoảng điểm từ 0 đến 100
  currentScore = Math.max(0, Math.min(100, currentScore));

  // 4. Trạng thái & Danh hiệu
  let status: 'perfect' | 'good' | 'warning' | 'danger' = 'good';
  let title = 'Phối Đồ Khá Hài Hòa';
  let feedback = warningMessage;

  if (currentScore < 50) {
    status = 'danger';
    title = '🚨 Cảnh Báo Lệch Chuẩn Lịch Sử!';
    if (!feedback) {
      feedback =
        'Cách phối đồ hiện tại chưa đúng chuẩn mực văn hóa lịch sử! Hãy đọc kỹ Tag của trang phục và phụ kiện để phối cho hòa hợp.';
    }
  } else if (currentScore === 100) {
    status = 'perfect';
    title = '🌟 Tuyệt Phẩm Đại Việt 100/100';
    feedback =
      'Tuyệt mỹ! Bộ Việt Phục của bạn đã chuẩn xác cả về thẩm mỹ lẫn lịch sử. Từng chi tiết phụ kiện đều tôn vinh cốt cách dân tộc!';
  } else if (ruleBreak) {
    status = 'warning';
    title = '⚠️ Cần Điều Chỉnh Phụ Kiện';
  } else {
    status = 'good';
    title = '✨ Bộ Y Phục Đẹp Mắt';
    if (!feedback) {
      if (equippedAccessories.length === 0) {
        feedback =
          'Bộ y phục đã chỉn chu. Bạn có thể phối thêm tối đa 2 phụ kiện để hoàn thiện vẻ đẹp và đạt 100 điểm tuyệt đối!';
      } else if (equippedAccessories.length === 1) {
        feedback =
          'Phối đồ rất khéo léo! Hãy trang bị thêm 1 phụ kiện nữa cùng phẩm cấp để chạm mốc 100 điểm Tuyệt mỹ!';
      } else {
        feedback =
          'Tổng thể y phục trang nhã, đúng tinh thần cổ truyền. Rất thích hợp cho các dịp tao nhã!';
      }
    }
  }

  return {
    score: currentScore,
    status,
    title,
    feedback,
    ruleBreak,
    bonuses,
    penalties,
  };
}
