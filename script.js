/**
 * Misa Ichikawa — Corporate Career Portfolio Script
 * Handles:
 * - Smart Image Fallback & Loader (auto-switches to real photos when provided)
 * - Highly Detailed Chart.js Motivation Curve (26 milestones with interactive details)
 * - Photo Lightbox Modal
 * - Photo Replacement Guide Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initImageFallback();
  initLifeChart();
  initLightbox();
  initGuideModal();
});

/* ===================================================
   1. SMART IMAGE FALLBACK LOADER
   images/ フォルダに実写真があればそれを表示し、
   未配置の場合は美しくUnsplashのフォールバック画像を表示する
   =================================================== */
function initImageFallback() {
  const images = document.querySelectorAll('img[data-fallback]');
  images.forEach(img => {
    img.addEventListener('error', function onError() {
      const fallbackUrl = this.getAttribute('data-fallback');
      if (fallbackUrl && this.src !== fallbackUrl) {
        this.src = fallbackUrl;
      }
    });

    if (img.complete && img.naturalWidth === 0) {
      const fallbackUrl = img.getAttribute('data-fallback');
      if (fallbackUrl) {
        img.src = fallbackUrl;
      }
    }
  });
}

/* ===================================================
   2. DETAILED LIFE CHART (26 Milestones)
   =================================================== */
const LIFELINE_DATA = [
  { age: "幼少期", score: 72, title: "紙工作とレジ打ち遊び", detail: "数字の計算と物作りへの純粋な好奇心。両親との買い物やお店屋さんごっこで数字に親しむ。", learn: "創造と数字への強い興味の原点" },
  { age: "小1〜2", score: 80, title: "大縄跳びのリーダー", detail: "チームで回数目標を設定し、クラスを巻き込んで練習。数値で成果が見える勝負の面白さを実感。", learn: "仲間と共に積み上げて結果を出す喜び" },
  { age: "小2", score: 50, title: "ピアノの習い事をやめる", detail: "義務感で続けていた習い事に見切りをつける。", learn: "自分が本当に情熱を持てる領域を見極める判断" },
  { age: "小3", score: 86, title: "親の転勤に伴う転校", detail: "北海道から新しい環境へ。持ち前の明るさと積極性ですぐに新しい友人の輪を作る。", learn: "変化への適応力と自分から飛び込む主体性" },
  { age: "小4", score: 78, title: "学年の壁を超えた遊び", detail: "1学年上の男子グループと対等にスポーツや外遊びに熱中。", learn: "年齢に関わらずフラットに対話・勝負する度胸" },
  { age: "小5〜6", score: 48, title: "友人関係のすれ違い", detail: "グループ内の摩擦や感情の行き違いに悩む。", learn: "自分の感情を客観視し、感情論ではなく対話で解決する重要性" },
  { age: "小6", score: 38, title: "半月板損傷で入院", detail: "小学生ながら膝を負傷し入院生活を経験。", learn: "思い通りに動けない停滞期にも、できる前進を探す粘り強さ" },
  { age: "小6冬", score: 90, title: "立教女学院合格 / 学芸会主役", detail: "受験勉強をやり切り合格。学芸会でも主役に選ばれクラスを牽引。", learn: "自分の強みを発揮して結果を出す自信" },
  { age: "中1", score: 42, title: "部活・環境の変化での葛藤", detail: "女子校特有の友人関係や新しい環境でのギャップに直面。", learn: "感情をぶつけるのではなく、相手を観察して受け止める姿勢" },
  { age: "中1〜3", score: 76, title: "バスケットボール部での鍛錬", detail: "規律あるチームスポーツで汗を流し、フィジカルと精神力を養う。", learn: "役割分担とチームワークの基礎" },
  { age: "中2", score: 82, title: "友人との深い対話（本音の開示）", detail: "誤解が生じた際に逃げずに一対一で対話し、より深い信頼関係を構築。", learn: "本音で向き合う対話が強い絆を作る" },
  { age: "中3", score: 88, title: "妹の誕生日に手作りアルバム", detail: "家族や大切な人を喜ばせるため、企画からデザインまでこだわり抜いて制作。", learn: "人の喜びを自分のエネルギーに変えるホスピタリティ" },
  { age: "高1", score: 92, title: "軽音・ボランティア・模擬国連", detail: "好奇心の赴くまま多分野へ挑戦。軽音部ではバンドをまとめ一体感を創出。", learn: "失敗を恐れず行動するフットワーク" },
  { age: "高1秋", score: 58, title: "生徒会長選への出馬と落選", detail: "全校生徒の前で演説し落選を経験するも、堂々と挑戦した手応えを得る。", learn: "挑戦した上での失敗は誇るべき成長の糧" },
  { age: "高3", score: 87, title: "合唱コンクール指揮者（学年2位）", detail: "練習への熱量の差を埋めるため、一人ひとりに声をかけ信頼関係を構築。", learn: "共感と段取り力で組織の力を引き出すリーダーシップ" },
  { age: "高3冬", score: 96, title: "慶應義塾大学 合格 ✦", detail: "現状の安定にとどまることなく、高い目標を掲げて慶應義塾大学に挑戦し合格。", learn: "高い目標を掲げ、逆算で行動しきれば実現できる" },
  { age: "大1春", score: 84, title: "体育会ラクロス部入部 / 焼肉屋バイト", detail: "日本一を目指す厳しい環境に身を置くことを決意。バイトでも接客を極める。", learn: "あえて厳しい環境に飛び込み自分を磨く決断" },
  { age: "大1夏", score: 91, title: "新人戦 チーム幹部に選出", detail: "同期チームのまとめ役としてPDCAサイクルを回し、練習効率を向上。", learn: "データと振り返りを用いたPDCAの面白さ" },
  { age: "大1冬", score: 93, title: "1on1の技術研究に没頭", detail: "対人戦の戦術を動画で研究し、毎練習で仮説検証を繰り返す。", learn: "明確な成果指標に向かって改善を回す楽しさ" },
  { age: "大2・4月", score: 15, title: "半月板損傷 — 人生最大の挫折", detail: "練習中に膝を重傷。手術を受け選手復帰が困難と告げられる。", learn: "心の内を開示することの恐れと、アイデンティティの再定義" },
  { age: "大2・5月", score: 64, title: "手帳習慣 ＆ 簿記2級の勉強開始", detail: "ベッドの上から日々のタスク管理を開始。逆境を武器習得のチャンスに変換。", learn: "どんな状況でも自分でコントロールできる行動に集中する" },
  { age: "大2・9月", score: 84, title: "日商簿記2級 一発合格！", detail: "問題集2冊を各3周。2.5ヶ月の集中学習で目標を達成し自己効力感を回復。", learn: "別軸での成功体験が逆境からの回復を加速させる" },
  { age: "大2・10月", score: 45, title: "OneDayCup での悔し涙", detail: "チームメイトの試合をベンチから見守り、プレイヤーとして戦えない無念を痛感。", learn: "自分の弱さや悔しさを仲間と共有し、本当の信頼関係を結ぶ" },
  { age: "大2・12月", score: 95, title: "山本勲ゼミ合格 / ラクログ着想", detail: "計量経済学ゼミに合格。同時に部活の課題を解決する練習記録サイト開発を着想。", learn: "データ分析と現場の課題意識が一本の線につながる" },
  { age: "大2・2月", score: 90, title: "スタッフ転向 / ラクログ開発本格化", detail: "未経験からプログラミングを学び、部員80名の課題をヒアリング。", learn: "新しい領域に果敢に飛び込み、形にしていく実行力" },
  { age: "現在", score: 97, title: "ラクログ × 計量経済 × 部活DX ✦", detail: "紙記録の全廃、AIデータ分析による選手起用支援など、チームを勝たせる新しいマネジメントを確立。", learn: "困難な経験すべてが、唯一無二の強みと貢献につながっている" }
];

let lifeChartInstance = null;

function initLifeChart() {
  const canvas = document.getElementById('lifeChartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // グラデーション塗りつぶし
  const gradient = ctx.createLinearGradient(0, 0, 0, 380);
  gradient.addColorStop(0, 'rgba(2, 132, 199, 0.28)');
  gradient.addColorStop(0.65, 'rgba(13, 148, 136, 0.08)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  const labels = LIFELINE_DATA.map(d => d.age);
  const dataScores = LIFELINE_DATA.map(d => d.score);

  // ポイントの色設定（挫折は赤、高モチベーションはティール、その他はブルー）
  const pointColors = LIFELINE_DATA.map(d => {
    if (d.score <= 35) return '#EF4444'; // 赤（挫折）
    if (d.score >= 93) return '#0D9488'; // ティール（最高峰）
    if (d.score <= 50) return '#F59E0B'; // アンバー（葛藤・谷）
    return '#0284C7';                   // ブルー
  });

  const pointRadii = LIFELINE_DATA.map(d => {
    if (d.score <= 20 || d.score >= 95) return 6.5;
    return 4.5;
  });

  lifeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '充実度・モチベーション',
        data: dataScores,
        borderColor: '#0284C7',
        borderWidth: 2.5,
        backgroundColor: gradient,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: pointColors,
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: pointRadii,
        pointHoverRadius: 8.5,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: '#0F172A',
        pointHoverBorderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      onHover: (event, chartElements) => {
        if (chartElements && chartElements.length > 0) {
          const index = chartElements[0].index;
          updateInteractiveStory(index);
        }
      },
      onClick: (event, chartElements) => {
        if (chartElements && chartElements.length > 0) {
          const index = chartElements[0].index;
          updateInteractiveStory(index);
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleFont: {
            family: "'Inter', 'Noto Sans JP', sans-serif",
            size: 13,
            weight: 'bold'
          },
          bodyFont: {
            family: "'Inter', 'Noto Sans JP', sans-serif",
            size: 12
          },
          padding: 14,
          cornerRadius: 10,
          boxPadding: 6,
          callbacks: {
            title: function(items) {
              const idx = items[0].dataIndex;
              return `${LIFELINE_DATA[idx].age}：${LIFELINE_DATA[idx].title}`;
            },
            label: function(item) {
              const idx = item.dataIndex;
              return [
                `モチベーション値: ${item.formattedValue} / 100`,
                `状況: ${LIFELINE_DATA[idx].detail}`,
                `得られた学び: ${LIFELINE_DATA[idx].learn}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#E2E8F0',
            drawBorder: false
          },
          ticks: {
            font: {
              family: "'Inter', 'Noto Sans JP', sans-serif",
              size: 11,
              weight: '500'
            },
            color: '#475569',
            maxRotation: 45,
            minRotation: 25
          }
        },
        y: {
          min: 0,
          max: 100,
          grid: {
            color: '#F1F5F9',
            drawBorder: false
          },
          ticks: {
            stepSize: 25,
            font: {
              family: "'Inter', sans-serif",
              size: 11
            },
            color: '#94A3B8',
            callback: function(val) {
              if (val === 100) return '最高 (100)';
              if (val === 75) return '好調 (75)';
              if (val === 50) return '平常 (50)';
              if (val === 25) return '停滞 (25)';
              if (val === 0) return 'どん底 (0)';
              return val;
            }
          }
        }
      }
    }
  });

  // 初期表示として最新（現在）または最大の挫折を選択
  updateInteractiveStory(LIFELINE_DATA.length - 1);
}

// グラフ直下の「選択中のエピソード詳細」を更新
function updateInteractiveStory(index) {
  const item = LIFELINE_DATA[index];
  if (!item) return;

  const titleEl = document.getElementById('storyAgeTitle');
  const scoreEl = document.getElementById('storyScoreVal');
  const detailEl = document.getElementById('storyDetailText');
  const learnEl = document.getElementById('storyLearnText');
  const badgeEl = document.getElementById('storyAgeBadge');

  if (titleEl) titleEl.textContent = item.title;
  if (scoreEl) {
    scoreEl.textContent = `${item.score} / 100`;
    // 色分け
    if (item.score <= 35) scoreEl.style.color = '#EF4444';
    else if (item.score >= 90) scoreEl.style.color = '#0D9488';
    else scoreEl.style.color = '#0284C7';
  }
  if (detailEl) detailEl.textContent = item.detail;
  if (learnEl) learnEl.textContent = item.learn;
  if (badgeEl) badgeEl.textContent = item.age;
}

/* ===================================================
   3. PHOTO LIGHTBOX MODAL (写真拡大表示)
   =================================================== */
function initLightbox() {
  const modal = document.getElementById('photoLightbox');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal || !modalImg) return;

  function openLightbox(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  const heroImg = document.getElementById('heroProfileImg');
  if (heroImg) {
    heroImg.addEventListener('click', () => {
      openLightbox(heroImg.src, '市川 美沙 (Misa Ichikawa) — プロフィール写真');
    });
  }

  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.getAttribute('data-caption') || '';
      if (img) {
        openLightbox(img.src, caption);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ===================================================
   4. PHOTO REPLACEMENT GUIDE MODAL (写真差し替え案内)
   =================================================== */
function initGuideModal() {
  const guideBtn = document.getElementById('photoGuideBtn');
  const guideModal = document.getElementById('photoGuideModal');
  const guideClose = document.getElementById('guideClose');

  if (!guideBtn || !guideModal) return;

  guideBtn.addEventListener('click', () => {
    guideModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeGuide() {
    guideModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  guideClose.addEventListener('click', closeGuide);
  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) closeGuide();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && guideModal.classList.contains('active')) {
      closeGuide();
    }
  });
}
