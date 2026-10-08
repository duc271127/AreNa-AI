import { Costume, Accessory, ScoreEvaluation, SceneId } from '../types.ts';

/**
 * HỆ THỐNG CHẤM ĐIỂM & ĐÁNH GIÁ PHỐI ĐỒ VIỆT PHỤC (calculateScore)
 * 
 * Thang điểm tối đa: 100 Điểm
 * - Điểm cơ bản theo trang phục (50 - 60 điểm)
 * - Mỗi phụ kiện hợp Tag / tương thích: +15 đến +25 điểm (Tối đa 2 phụ kiện)
 * - Điểm hòa hợp bối cảnh (Background / Cảnh quan):
 *   + Triều phục / Vương giả (Nhật Bình, Mã Đoán) tại Cung Đình: +20 điểm; tại Đầm Sen/Phố Cổ: -15 điểm
 *   + Dân gian / Đời thường (Tứ Thân, Giao Lĩnh, Nón quai thao) tại Đầm Sen/Phố Cổ: +20 điểm; tại Cung Đình: -30 điểm (Phạm húy)
 * - Các luật phạt (Penalties) & Lệch chuẩn lịch sử
 */
export function calculateScore(
  costume: Costume,
  equippedAccessories: Accessory[],
  scene: SceneId = 'cung-dinh'
): ScoreEvaluation {
  // 1. Điểm khởi điểm từ bộ trang phục
  let currentScore = costume.baseScore || 50;
  const bonuses: string[] = [`+${currentScore} điểm: Y phục ${costume.name} [${costume.tags.join(', ')}]`];
  const penalties: string[] = [];
  let warningMessage = '';
  let sceneCommentary = '';
  let ruleBreak = false;

  const equippedIds = equippedAccessories.map((a) => a.id);
  const hasMan = equippedIds.includes('man');
  const hasKhanXep = equippedIds.includes('khan-xep');
  const hasNonBaTam = equippedIds.includes('non-ba-tam');
  const hasGuocMoc = equippedIds.includes('guoc-moc');
  const hasTramCaiDa = equippedIds.includes('tram-cai-da');

  // 2. Điểm cộng từ phụ kiện
  equippedAccessories.forEach((acc) => {
    const isDirectlyCompatible = acc.compatibleCostumeIds.includes(costume.id);
    const hasTagOverlap = acc.tags.some((t) => costume.tags.includes(t));

    if (isDirectlyCompatible || hasTagOverlap) {
      currentScore += acc.scoreBonus;
      bonuses.push(`+${acc.scoreBonus} điểm: Phụ kiện "${acc.name}" phối hợp chuẩn mực cùng ${costume.name}`);
    } else {
      const neutralBonus = Math.max(10, acc.scoreBonus - 10);
      currentScore += neutralBonus;
      bonuses.push(`+${neutralBonus} điểm: Phụ kiện "${acc.name}" tôn thêm thẩm mỹ`);
    }
  });

  // 3. ĐIỂM HÒA HỢP BỐI CẢNH (BACKGROUND SCENE) - YÊU CẦU 4
  const isRoyal = costume.id === 'ao-ma-doan' || costume.id === 'ao-nhat-binh' || costume.tags.includes('Triều phục') || costume.tags.includes('Vương giả');
  const isFolk = costume.id === 'ao-tu-than' || costume.tags.includes('Dân gian') || costume.tags.includes('Lao động');

  if (scene === 'cung-dinh') {
    if (isRoyal) {
      currentScore += 20;
      bonuses.push('+20 điểm: Bối cảnh Sảnh Cung Đình tôn vinh phẩm hàm vương giả');
      sceneCommentary = `${costume.name} uy nghiêm lộng lẫy nơi chánh điện đại triều sơn son thếp vàng, toát lên phong thái bậc vương giả.`;
    } else if (isFolk || hasNonBaTam || hasGuocMoc) {
      currentScore -= 30;
      ruleBreak = true;
      penalties.push('-30 điểm: Phạm húy triều đình (Y phục/vật phẩm dân gian không đủ trang trọng để vào cung)');
      warningMessage = 'Cảnh báo phạm húy: Trang phục dân gian hoặc guốc mộc/nón quai thao không đủ trang trọng để bước vào sảnh chánh điện cung đình!';
      sceneCommentary = 'Chiếc y phục dân dã mộc mạc tuy đẹp nơi thôn xóm, nhưng nếu bước vào chốn cung đình thâm nghiêm thì e là phạm phép tắc triều cương.';
    } else {
      currentScore += 10;
      bonuses.push('+10 điểm: Y phục trang nhã, đoan trang nơi cung đình');
      sceneCommentary = `${costume.name} đoan trang, lịch thiệp, hài hòa trong không gian cung đình trang nghiêm.`;
    }
  } else if (scene === 'dam-sen') {
    if (isFolk || hasNonBaTam || hasGuocMoc) {
      currentScore += 20;
      bonuses.push('+20 điểm: Tuyệt phẩm hữu tình giữa Đầm Sen Chạng Vạng');
      sceneCommentary = `Chiếc ${costume.name} phối cùng phụ kiện dân gian thực sự tỏa sáng lung linh giữa đầm sen lộng gió và ráng chiều hoàng hôn.`;
    } else if (isRoyal) {
      currentScore -= 15;
      ruleBreak = true;
      penalties.push('-15 điểm: Trang phục triều đình quá trang trọng, xa cách chốn đầm sen dân dã');
      warningMessage = 'Cảnh báo: Y phục đại triều quá trang trọng và cồng kềnh khi đứng trước cảnh đầm sen hoàng hôn dân dã.';
      sceneCommentary = `Bộ triều phục ${costume.name} quá mực xa hoa uy nghiêm, có phần lạc nhịp giữa khung cảnh đầm sen mộc mạc thanh bình.`;
    } else {
      currentScore += 15;
      bonuses.push('+15 điểm: Dáng vẻ thơ mộng, thanh thuần bên hồ sen');
      sceneCommentary = `Tà áo ${costume.name} hòa quyện dịu dàng cùng hương sen thoang thoảng và làn gió chiều man mác.`;
    }
  } else if (scene === 'hoi-an') {
    if (isFolk || costume.tags.includes('Cổ phong') || costume.tags.includes('Thơ mộng') || costume.id === 'ao-trang-vat' || costume.id === 'ao-giao-linh') {
      currentScore += 20;
      bonuses.push('+20 điểm: Rực rỡ và thơ mộng đêm hội phố cổ Hội An');
      sceneCommentary = `${costume.name} duyên dáng bồng bềnh giữa muôn ánh đèn lồng phố Hội và dòng sông Hoài hoa đăng.`;
    } else if (isRoyal) {
      currentScore -= 15;
      penalties.push('-15 điểm: Phục sức triều quan hơi quá trang nghiêm cho đêm dạo phố');
      sceneCommentary = `Bộ triều phục ${costume.name} tuy quyền quý nhưng hơi quá trang nghiêm cho một đêm hội dạo phố đèn lồng tao nhã.`;
    } else {
      currentScore += 15;
      bonuses.push('+15 điểm: Thanh tao dạo bước phố cổ');
      sceneCommentary = `${costume.name} mang nét đẹp cổ kính, hòa vào không gian mái ngói rêu phong và đèn lồng ấm áp của Hội An.`;
    }
  }

  /* =========================================================================
     CÁC LUẬT PHẠT KẾT HỢP PHỤ KIỆN
     ========================================================================= */

  // Triều phục đi cùng Guốc mộc hoặc Nón ba tầm
  if ((costume.id === 'ao-ma-doan' || costume.id === 'ao-nhat-binh') && (hasGuocMoc || hasNonBaTam)) {
    currentScore -= 50;
    ruleBreak = true;
    penalties.push('-50 điểm: Lệch chuẩn triều cương (Vật phẩm dân gian không phối cùng triều phục)');
    if (!warningMessage) {
      warningMessage = 'Cảnh báo: Vật phẩm dân gian không phối cùng triều phục! Áo Mã Đoán và Áo Nhật Bình là trang phục phẩm cấp cao quý nơi triều đình, tuyệt đối không phối cùng Guốc Mộc hay Nón Ba Tầm.';
    }
  }

  // Áo Tứ Thân đi cùng Trâm Cài Hậu Phi đính đá
  if (costume.id === 'ao-tu-than' && hasTramCaiDa) {
    currentScore -= 30;
    ruleBreak = true;
    penalties.push('-30 điểm: Trâm cài cung đình không hợp với trang phục dân gian tứ thân');
    if (!warningMessage) {
      warningMessage = 'Cảnh báo: Trâm cài cung đình gắn đá quý không hợp với Áo Tứ Thân chất phác nơi thôn dã! Hãy thay bằng Nón Ba Tầm hoặc Quai Thao.';
    }
  }

  // Áo Tấc bắt buộc có khăn đội đầu
  if (costume.id === 'ao-tac' || costume.id === 'ao-tac-nam') {
    const hasHeadgear = costume.gender === 'male' ? hasKhanXep : (hasMan || hasKhanXep);
    if (!hasHeadgear) {
      currentScore -= 20;
      ruleBreak = true;
      penalties.push('-20 điểm: Áo Tấc thiếu Mấn/Khăn Đóng trang trọng');
      if (!warningMessage) {
        warningMessage = 'Áo Tấc là y phục dùng trong các đại lễ trang nghiêm. Đừng quên đội thêm Khăn đóng hoặc Mấn để tổng thể thêm phần tôn kính.';
      }
    }
  }

  // Khống chế từ 0 đến 100 điểm
  currentScore = Math.max(0, Math.min(100, currentScore));

  // Trạng thái & Danh hiệu
  let status: 'perfect' | 'good' | 'warning' | 'danger' = 'good';
  let title = 'Phối Đồ Khá Hài Hòa';
  let feedback = warningMessage || sceneCommentary;

  if (currentScore < 50) {
    status = 'danger';
    title = '🚨 Cảnh Báo Lệch Chuẩn Lịch Sử!';
    if (!feedback) {
      feedback = 'Cách phối đồ hoặc bối cảnh hiện tại chưa đúng chuẩn mực văn hóa lịch sử! Hãy chú ý chọn y phục phù hợp với không gian.';
    }
  } else if (currentScore === 100) {
    status = 'perfect';
    title = '🌟 Tuyệt Phẩm Đại Việt 100/100';
    feedback = `Tuyệt mỹ! ${sceneCommentary} Từng chi tiết phụ kiện và y phục đều chuẩn xác với bối cảnh lịch sử!`;
  } else if (ruleBreak) {
    status = 'warning';
    title = '⚠️ Cần Điều Chỉnh Phụ Kiện & Không Gian';
  } else {
    status = 'good';
    title = '✨ Y Phục Hài Hòa Cảnh Sắc';
    if (!feedback) {
      feedback = sceneCommentary || 'Y phục chỉn chu, màu sắc tao nhã, hòa hợp cùng cảnh sắc thiên nhiên và không gian cổ truyền.';
    }
  }

  return {
    score: currentScore,
    status,
    title,
    feedback,
    sceneCommentary,
    ruleBreak,
    bonuses,
    penalties,
  };
}
