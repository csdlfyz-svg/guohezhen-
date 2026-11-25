(() => {
  'use strict';

  const LANG_KEY = 'foshou_room_lang';
  const TOWN_LANG_KEY = 'guohe_lang_v1';

  function readInitialLang() {
    try {
      const town = sessionStorage.getItem(TOWN_LANG_KEY);
      if (town === 'ko' || town === 'zh') return town;
    } catch {
      // ignore
    }
    try {
      return localStorage.getItem(LANG_KEY) === 'ko' ? 'ko' : 'zh';
    } catch {
      return 'zh';
    }
  }

  let lang = readInitialLang();
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // ignore
  }

  const TEXT = {
    backTown: { zh: '果核镇', ko: '과핵진' },
    ariaBackTown: { zh: '返回果核镇主页', ko: '과핵진 홈으로 돌아가기' },
    roomTitle: { zh: '佛小柑的房间', ko: '불소감의 방' },
    strongholdName: { zh: '风车茶坡', ko: '풍차 차 언덕' },
    topMailboxBtn: { zh: '✉️ 留一件小事', ko: '✉️ 작은 일 남기기' },
    installPwa: { zh: '安装主屏', ko: '홈 추가' },
    heroBadge: { zh: '🍃 风车茶坡 · 佛系', ko: '🍃 풍차 차 언덕 · 평정심' },
    heroTitle: { zh: '把佛小柑放进你的一天', ko: '불소감을 내 하루 속으로' },
    heroPatBtn: { zh: '✦ 戳一戳拍拍', ko: '✦ 톡톡 쓰다듬기' },
    heroMailboxBtn: { zh: '✉️ 在风车茶坡留一件小事', ko: '✉️ 풍차 언덕에 작은 일 남기기' },
    tapPat: { zh: '点我互动', ko: '톡톡 놀기' },
    tabApps: { zh: '📱 应用', ko: '📱 앱' },
    tabStickers: { zh: '😊 表情', ko: '😊 표정' },
    tabShorts: { zh: '🎬 视频', ko: '🎬 숏폼' },
    tabComics: { zh: '📖 漫画', ko: '📖 만화' },
    tabProfile: { zh: '🍋 角色', ko: '🍋 캐릭터' },
    stickerPackBadge: { zh: '表情包 · 24 款', ko: '이모티콘 · 24종' },
    stickerPackTitle: { zh: '佛小柑日常表情包', ko: '불소감 일상 이모티콘' },
    stickerPackDesc: {
      zh: '点击任意表情可看大图、听佛小柑说一句，还能一键保存透明背景单图发给好友～',
      ko: '이모티콘을 누르면 크게 보고 대사를 들을 수 있어요. 투명 배경 PNG 저장도 바로 가능!',
    },
    filterAll: { zh: '全部 24', ko: '전체 24' },
    filterHappy: { zh: '开心治愈', ko: '기쁨·힐링' },
    filterMood: { zh: '日常情绪', ko: '일상 감정' },
    filterPose: { zh: '可爱动作', ko: '동작·포즈' },
    stickerSheetBadge: { zh: '完整总览图', ko: '전체 모음집' },
    stickerSheetTitle: { zh: '佛小柑全套 24 格表情合集', ko: '불소감 24종 이모티콘 전체 시트' },
    downloadSheet: { zh: '⬇ 保存完整合集大图', ko: '⬇ 전체 시트 저장' },
    downloadSingleSticker: { zh: '⬇ 保存透明表情', ko: '⬇ 투명 PNG 저장' },
    ariaStickerFilter: { zh: '表情分类筛选', ko: '이모티콘 분류 필터' },
    ariaPrevSticker: { zh: '上一个表情', ko: '이전 이모티콘' },
    ariaNextSticker: { zh: '下一个表情', ko: '다음 이모티콘' },
    profileKicker: { zh: '风车茶坡 · 佛手柑小茶灵', ko: '풍차 차 언덕 · 불수감 차 요정' },
    dtQuirk: { zh: '奇怪的性质', ko: '기묘한 성질' },
    ddQuirk: { zh: '在他身边会让人感到宁静', ko: '곁에 있으면 마음이 고요해진다' },
    neighborsKicker: { zh: 'VISIT NEIGHBORS · 果核镇串门地图', ko: 'VISIT NEIGHBORS · 이웃 방 구경하기' },
    neighborsTitle: { zh: '顺路去其他果核邻居的房间坐坐', ko: '다른 과일 이웃의 방에도 들러 보세요' },
    neighborsMailBtn: { zh: '✉️ 给佛小柑留一件小事', ko: '✉️ 불소감에게 편지 남기기' },
    nb_pineapple: { zh: '菠大炮', ko: '보대포' },
    nb_strawberry: { zh: '草莓菜', ko: '딸기채' },
    nb_pomelo: { zh: '呆呆柚', ko: '멍멍유' },
    nb_bergamot: { zh: '佛小柑', ko: '불소감' },
    nb_peach: { zh: '举重桃', ko: '역도복숭' },
    nb_grape: { zh: '葡小萄', ko: '포도리' },
    nb_apple: { zh: '青苹果', ko: '청사과' },
    nb_sugarapple: { zh: '释小迦', ko: '석가야' },
    profileMotto: {
      zh: '「慢慢来，先润润喉呀～喝杯不苦的好茶，就都好啦！」',
      ko: '“천천히, 따뜻한 차 한 모금부터~ 안 쓴 차 한 잔이면 다 괜찮아유!”',
    },
    comic1Badge: { zh: '四格漫画 · 第 1 话', ko: '4컷 만화 · 1화' },
    comic1Title: { zh: '今天起做清晨冥想达人！', ko: '오늘부턴 아침 명상 달인!' },
    comic1Desc: {
      zh: '闭眼吸气感受自然能量……结果一秒入梦！不过梦里冥想过，喝杯茶就都好啦～',
      ko: '눈 감고 자연을 느끼다 그대로 꿀잠! 그래도 꿈에서 명상했으니 차 한 잔이면 괜찮아유~',
    },
    comic2Badge: { zh: '四格漫画 · 第 2 话', ko: '4컷 만화 · 2화' },
    comic2Title: { zh: '柑橘茶怎么越喝越苦？', ko: '시트러스 차는 왜 쓸까?' },
    comic2Desc: {
      zh: '开水冲泡苦到灵魂出窍！佛小柑的泡茶小秘诀：60°C 温水慢慢泡才清香不苦～',
      ko: '끓는 물에 껍질이 써져서 깜짝! 불소감의 꿀팁: 60도 미지근한 물로 우리면 향긋해유~',
    },
    comicZoomHint: { zh: '🔍 点击查看大图', ko: '🔍 크게 보기' },
    downloadComic: { zh: '⬇ 保存漫画图片', ko: '⬇ 만화 이미지 저장' },
    short1Badge: { zh: '漫画短片 · 15秒', ko: '만화 쇼츠 · 15초' },
    short1Title: { zh: '养生第1天，绝不碰冰的！', ko: '건강 관리 1일 차, 아아 금지!' },
    short1Desc: {
      zh: '早起立志只喝温佛手茶，下午三点却遇上续命冰美式——佛小柑的“抵消哲学”。',
      ko: '아침엔 따뜻한 불수감 차만 마시겠다고 다짐했지만 오후 3시 아아의 유혹 앞에서…!',
    },
    short2Badge: { zh: '日常 POV · 9秒', ko: '일상 POV · 9초' },
    short2Title: { zh: '刚泡好温茶，弹出“今晚临时加会”', ko: '막 차 우렸는데 “오늘 밤 긴급 회의” 알림' },
    short2Desc: {
      zh: '刚泡好一杯热乎乎的佛手茶准备歇会儿，手机却突然弹出“今晚临时加会”通知……',
      ko: '따뜻한 불수감 차를 막 우리고 쉬려던 순간, 휴대폰에 “오늘 밤 긴급 회의” 알림이 뜨는데…',
    },
    soundMuted: { zh: '静音', ko: '음소거' },
    soundOn: { zh: '开声', ko: '소리 켜짐' },
    downloadHd: { zh: '⬇ 下载高清视频', ko: '⬇ 고화질 영상 다운로드' },
    badgeA: { zh: '记录型', ko: '기록형' },
    badgeB: { zh: '游戏型', ko: '놀이형' },
    appAName: { zh: '佛手喝茶记', ko: '불수 차일기' },
    appADesc: {
      zh: '每喝下一杯温茶，佛小柑就渐渐水润发亮，陪你零压力补水。',
      ko: '따뜻한 차를 마실 때마다 불소감이 촉촉하게 반짝이며 함께해요.',
    },
    appBName: { zh: '佛手接茶香', ko: '불수 차받기' },
    appBDesc: {
      zh: '接住嫩茶叶与金佛手，拿暖心茶壶开双倍护盾，躲开冰块与焦叶！',
      ko: '찻잎과 황금 불수감을 받고, 주전자 보호막으로 얼음과 탄 잎을 피해요!',
    },
    chip10s: { zh: '10 秒打卡', ko: '10초 기록' },
    chipNoGuilt: { zh: '零负罪感', ko: '벌점 없음' },
    chipProps: { zh: '茶席收藏', ko: '다기 수집' },
    chipCombo: { zh: '连击加分', ko: '콤보 보너스' },
    chipShield: { zh: '茶壶护盾', ko: '주전자 보호막' },
    chipPoster: { zh: '战绩存图', ko: '결과 카드' },
    openAppA: { zh: '打开《佛手喝茶记》 →', ko: '〈불수 차일기〉 열기 →' },
    openAppB: { zh: '打开《佛手接茶香》 →', ko: '〈불수 차받기〉 열기 →' },
    pwaTitle: {
      zh: '📲 添加到手机主屏（像原生 App 一样使用）',
      ko: '📲 홈 화면에 앱으로 추가하기',
    },
    pwaBody: {
      zh: '在手机 Safari 点击「分享 → 添加到主屏幕」，或在 Chrome 点击「安装应用」，佛小柑就会乖乖住在你的手机桌面上啦！',
      ko: 'Safari에서 ‘공유 → 홈 화면에 추가’ 또는 Chrome의 ‘앱 설치’를 누르면 불소감이 홈 화면에 쏙 들어와요!',
    },
    exprGalleryTitle: {
      zh: '5 种反应表情状态（点击试听台词）',
      ko: '5가지 반응 표정 상태 (눌러서 대사 보기)',
    },
    previewDefault: {
      zh: '点一点下面的表情，看看佛小柑会怎么回应你～',
      ko: '아래 표정을 눌러 불소감의 반응을 확인해 봐요~',
    },
    cardInfoTitle: { zh: '佛小柑角色卡', ko: '불소감 캐릭터 카드' },
    dtPersonality: { zh: '性格', ko: '성격' },
    ddPersonality: {
      zh: '温和治愈、慢节奏养生、绝不说教责怪人',
      ko: '온화하고 다정함, 느긋한 힐링파, 절대 훈계하지 않음',
    },
    dtProps: { zh: '专属道具', ko: '소품' },
    ddProps: {
      zh: '绿叶透明温茶杯、金佛手干片、暖心白瓷壶',
      ko: '초록 잎 투명 찻잔, 건조 불수감, 따뜻한 백자 주전자',
    },
    dtWeakness: { zh: '弱点', ko: '약점' },
    ddWeakness: {
      zh: '怕冰块寒气、怕焦苦茶叶、久不喝水会干巴巴',
      ko: '차가운 얼음과 탄 찻잎을 싫어함, 물을 안 마시면 건조해짐',
    },
    footerTip: {
      zh: '✨ 点一下或拖起底部散步的佛小柑试试吧～',
      ko: '✨ 바닥을 산책 중인 불소감을 누르거나 드래그해 보세요~',
    },
    ariaPatChar: { zh: '拍一拍佛小柑', ko: '불소감 쓰다듬기' },
    ariaLightbox: { zh: '漫画大图预览', ko: '만화 크게 보기' },
    ariaCloseLightbox: { zh: '关闭大图', ko: '닫기' },
  };

  const PAT_LINES = [
    {
      expr: 'happy',
      zh: '嘿嘿～先喝一口温润的佛手茶吧！',
      ko: '헤헤~ 따뜻한 불수감 차 한 모금 어때?',
    },
    {
      expr: 'proud',
      zh: '今天也在好好照顾自己，佛小柑超佩服你！',
      ko: '오늘도 스스로를 잘 챙기고 있구나, 멋져!',
    },
    {
      expr: 'surprised',
      zh: '呀！轻轻拍到我的佛手瓣啦，香香的吧～',
      ko: '앗! 내 불수감 모자를 쓰다듬었네, 향긋하지~',
    },
    {
      expr: 'base',
      zh: '茶壶一直为你温着，累了就来歇歇脚呀。',
      ko: '주전자는 늘 따뜻해, 쉬고 싶을 때 언제든 와.',
    },
  ];

  const EXPR_ITEMS = [
    {
      key: 'base',
      src: './assets/expressions/base.png',
      label: { zh: '平时 · 静候', ko: '평소 · 차분' },
      quote: {
        zh: '「慢慢来，先润润喉呀～」',
        ko: '“천천히, 따뜻한 차 한 모금부터~”',
      },
    },
    {
      key: 'happy',
      src: './assets/expressions/happy.png',
      label: { zh: '记录 · 开心', ko: '기록 · 기쁨' },
      quote: {
        zh: '「嗯～热乎乎的一杯下肚，喉咙舒服多啦！」',
        ko: '“음~ 따뜻한 한 잔 덕분에 목이 편안해졌어!”',
      },
    },
    {
      key: 'proud',
      src: './assets/expressions/proud.png',
      label: { zh: '达标 · 骄傲', ko: '완료 · 뿌듯' },
      quote: {
        zh: '「哇！8 杯全满啦！我就知道你一定行！」',
        ko: '“와! 8잔 다 채웠어! 역시 해낼 줄 알았어!”',
      },
    },
    {
      key: 'sad',
      src: './assets/expressions/sad.png',
      label: { zh: '想你 · 担心', ko: '빠짐 · 걱정' },
      quote: {
        zh: '「昨天是不是有点忙呀？没关系，现在喝一口也刚刚好。」',
        ko: '“어제는 좀 바빴나 봐? 괜찮아, 지금 한 모금이면 충분해.”',
      },
    },
    {
      key: 'surprised',
      src: './assets/expressions/surprised.png',
      label: { zh: '重逢 · 惊喜', ko: '반가움 · 앗' },
      quote: {
        zh: '「呀！好久不见！快坐下，我刚泡好一壶暖茶！」',
        ko: '“앗! 오랜만이야! 어서 앉아, 방금 따뜻한 차 우렸어!”',
      },
    },
  ];

  const STICKERS = [
    { file: '01_happy', cat: 'happy', zh: '开心', ko: '기쁨', qzh: '今天也是元气满满的一天呀！', qko: '오늘도 기분 최고야!' },
    { file: '02_angry', cat: 'mood', zh: '生气', ko: '화남', qzh: '哼！谁偷喝了我的佛手茶！', qko: '흥! 내 차 누가 마셨어!' },
    { file: '03_cry', cat: 'mood', zh: '哭泣', ko: '울음', qzh: '呜哇哇…被开水泡苦了啦…', qko: '으앙… 너무 쓰단 말이야…' },
    { file: '04_surprised', cat: 'mood', zh: '惊讶', ko: '놀람', qzh: '咦？！居然还有这种事！', qko: '어?! 진짜 그런 일이?!' },
    { file: '05_shy', cat: 'happy', zh: '害羞', ko: '부끄', qzh: '哎呀别这样夸佛小柑啦～', qko: '아이참, 그렇게 칭찬하면 부끄러워~' },
    { file: '06_heart', cat: 'happy', zh: '开心比心', ko: '하트', qzh: '给你比一个暖暖的金佛手心！', qko: '따뜻한 하트 받아 줘!' },
    { file: '07_greet', cat: 'happy', zh: '打招呼', ko: '인사', qzh: '嗨～今天记得多喝温水哦！', qko: '안녕~ 오늘도 따뜻한 물 챙겨 마셔!' },
    { file: '08_tea', cat: 'happy', zh: '喝茶', ko: '차타임', qzh: '吨吨吨～60°C 佛手茶最香啦！', qko: '호록~ 60도 불수감 차가 제일 향긋해!' },
    { file: '09_tired', cat: 'mood', zh: '疲惫', ko: '피곤', qzh: '电量告急…先歇五分钟吧…', qko: '배터리 방전… 5분만 쉬자…' },
    { file: '10_confused', cat: 'mood', zh: '疑惑', ko: '궁금', qzh: '嗯？这杯到底加没加糖呢？', qko: '음? 이건 무슨 맛일까?' },
    { file: '11_proud', cat: 'happy', zh: '骄傲', ko: '뿌듯', qzh: '哼哼，8 杯目标轻松拿捏！', qko: '흥흥, 오늘 목표 완벽 달성!' },
    { file: '12_annoyed', cat: 'mood', zh: '不爽', ko: '삐짐', qzh: '临时加会？佛小柑拒绝！', qko: '갑자기 회의라니… 삐졌어!' },
    { file: '13_sleepy', cat: 'mood', zh: '困了', ko: '졸림', qzh: '眼皮打架中…梦里见 Zzz…', qko: '눈이 스르르… 꿈에서 만나 Zzz…' },
    { file: '14_cheer', cat: 'happy', zh: '加油', ko: '파이팅', qzh: '冲呀！佛小柑永远给你打气！', qko: '아자아자! 불소감이 응원할게!' },
    { file: '15_scared', cat: 'mood', zh: '害怕', ko: '무서움', qzh: '冰、冰块不要靠近我呀！', qko: '어, 얼음은 가까이 오지 마!' },
    { file: '16_facepalm', cat: 'mood', zh: '捂脸', ko: '얼굴가림', qzh: '没眼看啦，刚立的 flag 又倒了…', qko: '못 보겠어… 다짐이 또 무너졌어…' },
    { file: '17_think', cat: 'mood', zh: '思考', ko: '생각', qzh: '让我仔细琢磨一下午茶配方…', qko: '오후엔 무슨 차를 우릴까…' },
    { file: '18_wink', cat: 'happy', zh: '眨眼', ko: '윙크', qzh: '啾咪～小小偷懒一次也无妨！', qko: '찡긋~ 잠깐 쉬어가도 괜찮아유!' },
    { file: '19_walk', cat: 'pose', zh: '走路', ko: '산책', qzh: '哒哒哒～去茶园散步啦！', qko: '총총총~ 차밭 산책 가는 길!' },
    { file: '20_jump', cat: 'pose', zh: '跳跃', ko: '점프', qzh: '耶！开心到原地起飞！', qko: '야호! 신나서 폴짝!' },
    { file: '21_relax', cat: 'happy', zh: '放松', ko: '힐링', qzh: '慢慢来，喝杯好茶就都好啦～', qko: '천천히, 차 한 잔이면 다 괜찮아유~' },
    { file: '22_pout', cat: 'mood', zh: '委屈', ko: '서운', qzh: '昨天都没来看我，有点想你…', qko: '어제 안 와서 살짝 서운했어…' },
    { file: '23_side', cat: 'pose', zh: '侧面', ko: '옆모습', qzh: '展示一下我圆鼓鼓的侧颜～', qko: '동글동글 옆모습 공개~' },
    { file: '24_back', cat: 'pose', zh: '背面', ko: '뒷모습', qzh: '背影也是一颗完美的金佛手！', qko: '뒷모습도 완벽한 황금 불수감!' },
  ];

  const langSwitchBtns = document.querySelectorAll('[data-fg-lang]');
  const installBtn = document.getElementById('installBtn');
  const timeGreeting = document.getElementById('timeGreeting');
  const heroSpeech = document.getElementById('heroSpeech');
  const heroCharBtn = document.getElementById('heroCharBtn');
  const heroPatActionBtn = document.getElementById('heroPatActionBtn');
  const heroChar = document.getElementById('heroChar');
  const liveStatA = document.getElementById('liveStatA');
  const liveBarA = document.getElementById('liveBarA');
  const liveStatB = document.getElementById('liveStatB');
  const quickStatA = document.getElementById('quickStatA');
  const quickStatB = document.getElementById('quickStatB');
  const exprGrid = document.getElementById('exprGrid');
  const previewBubble = document.getElementById('previewBubble');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panelApps = document.getElementById('panel-apps');
  const panelStickers = document.getElementById('panel-stickers');
  const panelShorts = document.getElementById('panel-shorts');
  const panelComics = document.getElementById('panel-comics');
  const panelProfile = document.getElementById('panel-profile');
  const stickerGrid = document.getElementById('stickerGrid');
  const stickerFilterBtns = document.querySelectorAll('[data-sticker-filter]');
  const openSheetBtn = document.getElementById('openSheetBtn');
  const comicImg1 = document.getElementById('comicImg1');
  const comicImg2 = document.getElementById('comicImg2');
  const comicDl1 = document.getElementById('comicDl1');
  const comicDl2 = document.getElementById('comicDl2');
  const comicLightbox = document.getElementById('comicLightbox');
  const lightboxMediaWrap = document.getElementById('lightboxMediaWrap');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxQuote = document.getElementById('lightboxQuote');
  const lightboxStickerControls = document.getElementById('lightboxStickerControls');
  const lbPrevBtn = document.getElementById('lbPrevBtn');
  const lbNextBtn = document.getElementById('lbNextBtn');
  const lbDownloadBtn = document.getElementById('lbDownloadBtn');
  const lightboxClose = document.getElementById('lightboxClose');
  const shortVideo1 = document.getElementById('shortVideo1');
  const shortVideo2 = document.getElementById('shortVideo2');
  const shortProg1 = document.getElementById('shortProg1');
  const shortProg2 = document.getElementById('shortProg2');
  const short1HdLink = document.getElementById('short1HdLink');
  const short2HdLink = document.getElementById('short2HdLink');
  const heroLoopCanvas = document.getElementById('heroLoopCanvas');

  let activeTab = 'profile';
  let activeStickerFilter = 'all';
  let lightboxState = { mode: null, comicNum: null, stickerIndex: 0 };
  let selectedExpr = 'base';
  let patIndex = 0;
  let deferredPrompt = null;

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function updateTimeGreeting() {
    const h = new Date().getHours();
    let g;
    if (h >= 5 && h < 11) {
      g = { zh: '☀️ 早安 · 晨间温茶', ko: '☀️ 좋은 아침 · 첫 잔' };
    } else if (h >= 11 && h < 17) {
      g = { zh: '🍵 午后 · 润润喉吧', ko: '🍵 오후 티타임' };
    } else if (h >= 17 && h < 22) {
      g = { zh: '🌇 傍晚 · 舒缓小憩', ko: '🌇 포근한 저녁 · 휴식' };
    } else {
      g = { zh: '🌙 晚安 · 静心暖茶', ko: '🌙 고요한 밤 · 쉼표' };
    }
    timeGreeting.textContent = g[lang];
  }

  function refreshLiveStats() {
    let cupsToday = 0;
    try {
      const rawA = localStorage.getItem('foshou_app_a_v1');
      if (rawA) {
        const parsed = JSON.parse(rawA);
        cupsToday = parsed?.days?.[getTodayKey()]?.cups || 0;
      }
    } catch {
      // ignore
    }
    const labelA = lang === 'ko' ? `오늘 ${cupsToday} / 8 잔` : `今日 ${cupsToday} / 8 杯`;
    liveStatA.textContent = labelA;
    if (quickStatA) quickStatA.textContent = labelA;
    liveBarA.style.width = `${Math.min(100, (cupsToday / 8) * 100)}%`;

    let highScore = 0;
    try {
      const rawB = localStorage.getItem('foshou_app_b_v1');
      if (rawB) {
        const parsed = JSON.parse(rawB);
        highScore = Number(parsed?.highScore) || 0;
      }
    } catch {
      // ignore
    }
    liveStatB.textContent = lang === 'ko' ? `🏆 최고 ${highScore} 점` : `🏆 最高 ${highScore} 分`;
    if (quickStatB) {
      quickStatB.textContent = lang === 'ko' ? `최고 ${highScore} 점` : `最高 ${highScore} 分`;
    }
  }

  function renderExprGrid() {
    exprGrid.innerHTML = '';
    EXPR_ITEMS.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `expr-btn${selectedExpr === item.key ? ' active' : ''}`;
      btn.innerHTML = `
        <img src="${item.src}" alt="${item.label[lang]}" width="60" height="80" />
        <span>${item.label[lang]}</span>
      `;
      btn.addEventListener('click', () => {
        selectedExpr = item.key;
        heroChar.src = item.src;
        previewBubble.textContent = item.quote[lang];
        renderExprGrid();
      });
      exprGrid.appendChild(btn);
    });
  }

  function updatePlayVisual(vid) {
    if (!vid) return;
    const stage = vid.closest('.short-stage');
    if (stage) stage.classList.toggle('is-paused', vid.paused);
    const playBtn = document.querySelector(`[data-toggle-play="${vid.id}"]`);
    if (playBtn) playBtn.textContent = vid.paused ? '▶' : '⏸';
  }

  function syncShortsLanguage() {
    const suffix = lang === 'ko' ? 'ko' : 'zh';
    const items = [
      { video: shortVideo1, hd: short1HdLink, id: 'short01' },
      { video: shortVideo2, hd: short2HdLink, id: 'short02' },
    ];
    items.forEach(({ video, hd, id }) => {
      if (!video) return;
      const nextSrc = `./shorts/web/foshou-${id}-${suffix}-720.mp4`;
      const nextPoster = `./shorts/deliverables/foshou-${id}-cover-${suffix}.png`;
      const wasPlaying = !video.paused;
      const curTime = video.currentTime || 0;
      video.poster = nextPoster;
      if (video.getAttribute('src') !== nextSrc) {
        video.setAttribute('src', nextSrc);
        video.load();
        video.addEventListener(
          'loadedmetadata',
          () => {
            try {
              video.currentTime = Math.min(curTime, Math.max(0, (video.duration || 1) - 0.1));
            } catch {
              // ignore
            }
            if (activeTab === 'shorts' && wasPlaying) {
              video.play().catch(() => updatePlayVisual(video));
            } else {
              updatePlayVisual(video);
            }
          },
          { once: true }
        );
      }
      if (hd) {
        hd.setAttribute('href', `./shorts/deliverables/foshou-${id}-${suffix}.mp4`);
      }
    });
    updateMuteLabels();
  }

  function updateMuteLabels() {
    document.querySelectorAll('[data-toggle-mute]').forEach((btn) => {
      const vid = document.getElementById(btn.getAttribute('data-toggle-mute'));
      if (!vid) return;
      const muted = vid.muted;
      btn.innerHTML = `${muted ? '🔇' : '🔊'} <span>${muted ? TEXT.soundMuted[lang] : TEXT.soundOn[lang]}</span>`;
    });
  }

  function renderStickerGrid() {
    if (!stickerGrid) return;
    stickerGrid.innerHTML = '';
    STICKERS.forEach((st, idx) => {
      if (activeStickerFilter !== 'all' && st.cat !== activeStickerFilter) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sticker-tile';
      const label = st[lang];
      btn.innerHTML = `
        <img src="./assets/stickers/${st.file}.png" alt="${label}" width="72" height="72" loading="lazy" />
        <span>${label}</span>
      `;
      btn.addEventListener('click', () => openStickerLightbox(idx));
      stickerGrid.appendChild(btn);
    });
  }

  function syncComicsLanguage() {
    const suffix = lang === 'ko' ? 'ko' : 'zh';
    const comics = [
      { img: comicImg1, dl: comicDl1, num: '01' },
      { img: comicImg2, dl: comicDl2, num: '02' },
    ];
    comics.forEach(({ img, dl, num }) => {
      const src = `./comics/comic${num}-${suffix}.jpg`;
      if (img) img.setAttribute('src', src);
      if (dl) {
        dl.setAttribute('href', src);
        dl.setAttribute('download', `foxiaogan-comic${num}-${suffix}.jpg`);
      }
    });
    if (comicLightbox && !comicLightbox.classList.contains('hidden')) {
      if (lightboxState.mode === 'comic' && lightboxState.comicNum) {
        openComicLightbox(lightboxState.comicNum);
      } else if (lightboxState.mode === 'sticker') {
        openStickerLightbox(lightboxState.stickerIndex);
      } else if (lightboxState.mode === 'sheet') {
        openSheetLightbox();
      }
    }
  }

  function applyI18n() {
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'zh-CN';
    document.title = lang === 'ko' ? '불소감 · 풍차 차 언덕 | 과핵진' : '佛小柑 · 风车茶坡 | 果核镇';
    langSwitchBtns.forEach((b) => {
      const active = b.getAttribute('data-fg-lang') === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const k = node.getAttribute('data-i18n');
      if (TEXT[k]) node.textContent = TEXT[k][lang];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
      const k = node.getAttribute('data-i18n-aria');
      if (TEXT[k]) node.setAttribute('aria-label', TEXT[k][lang]);
    });

    updateTimeGreeting();
    heroSpeech.textContent = PAT_LINES[patIndex][lang];

    const curItem = EXPR_ITEMS.find((e) => e.key === selectedExpr);
    if (curItem) previewBubble.textContent = curItem.quote[lang];

    refreshLiveStats();
    renderExprGrid();
    renderStickerGrid();
    syncShortsLanguage();
    syncComicsLanguage();
    window.dispatchEvent(new CustomEvent('foshou-lang-change', { detail: { lang } }));
  }

  function triggerHeroPat() {
    patIndex = (patIndex + 1) % PAT_LINES.length;
    const next = PAT_LINES[patIndex];
    heroChar.src = `./assets/expressions/${next.expr}.png`;
    heroSpeech.textContent = next[lang];
    heroCharBtn.classList.remove('pat-bounce');
    void heroCharBtn.offsetWidth;
    heroCharBtn.classList.add('pat-bounce');
  }

  heroCharBtn.addEventListener('click', triggerHeroPat);
  if (heroPatActionBtn) heroPatActionBtn.addEventListener('click', triggerHeroPat);

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      activeTab = tab;
      tabBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });
      panelApps.classList.toggle('hidden', tab !== 'apps');
      if (panelStickers) panelStickers.classList.toggle('hidden', tab !== 'stickers');
      if (panelShorts) panelShorts.classList.toggle('hidden', tab !== 'shorts');
      if (panelComics) panelComics.classList.toggle('hidden', tab !== 'comics');
      panelProfile.classList.toggle('hidden', tab !== 'profile');

      [shortVideo1, shortVideo2].forEach((vid) => {
        if (!vid) return;
        if (tab === 'shorts') {
          vid.play().then(() => updatePlayVisual(vid)).catch(() => updatePlayVisual(vid));
        } else {
          vid.pause();
          updatePlayVisual(vid);
        }
      });
    });
  });

  document.querySelectorAll('[data-toggle-mute]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vid = document.getElementById(btn.getAttribute('data-toggle-mute'));
      if (!vid) return;
      const willUnmute = vid.muted;
      if (willUnmute) {
        [shortVideo1, shortVideo2].forEach((other) => {
          if (other && other !== vid) other.muted = true;
        });
      }
      vid.muted = !willUnmute;
      if (!vid.muted && vid.paused) {
        vid.play().then(() => updatePlayVisual(vid)).catch(() => updatePlayVisual(vid));
      }
      updateMuteLabels();
      updatePlayVisual(vid);
    });
  });

  document.querySelectorAll('[data-toggle-play]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vid = document.getElementById(btn.getAttribute('data-toggle-play'));
      if (!vid) return;
      if (vid.paused) vid.play().then(() => updatePlayVisual(vid)).catch(() => updatePlayVisual(vid));
      else vid.pause();
      updatePlayVisual(vid);
    });
  });

  document.querySelectorAll('[data-stage-video]').forEach((stage) => {
    stage.addEventListener('click', () => {
      const vid = document.getElementById(stage.getAttribute('data-stage-video'));
      if (!vid) return;
      if (vid.paused) vid.play().then(() => updatePlayVisual(vid)).catch(() => updatePlayVisual(vid));
      else vid.pause();
      updatePlayVisual(vid);
    });
  });

  [
    { vid: shortVideo1, prog: shortProg1 },
    { vid: shortVideo2, prog: shortProg2 },
  ].forEach(({ vid, prog }) => {
    if (!vid) return;
    vid.addEventListener('play', () => updatePlayVisual(vid));
    vid.addEventListener('pause', () => updatePlayVisual(vid));
    vid.addEventListener('timeupdate', () => {
      if (prog && vid.duration > 0) {
        prog.style.width = `${(vid.currentTime / vid.duration) * 100}%`;
      }
    });
    updatePlayVisual(vid);
  });

  // HiDPI 3-second Flat Vector tea-garden backdrop inside Hero Card (pauses when tab hidden)
  function initHeroLoopBackdrop() {
    if (!heroLoopCanvas) return;
    const ctx = heroLoopCanvas.getContext('2d');
    if (!ctx) return;
    const cs = getComputedStyle(document.documentElement);
    const tok = (name) => cs.getPropertyValue(name).trim();
    const palette = {
      sunOuter: tok('--fg-canvas-sun-outer'),
      sunMid: tok('--fg-canvas-sun-mid'),
      sunCore: tok('--fg-canvas-sun-core'),
      cloud1: tok('--fg-canvas-cloud-1'),
      cloud2: tok('--fg-canvas-cloud-2'),
      hill1: tok('--fg-canvas-hill-1'),
      hill2: tok('--fg-canvas-hill-2'),
      hill3: tok('--fg-canvas-hill-3'),
    };
    const W = 960;
    const H = 320;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    heroLoopCanvas.width = W * dpr;
    heroLoopCanvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function drawCloud(x, y, s, col) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x - 16 * s, y + 2 * s, 10 * s, 0, Math.PI * 2);
      ctx.arc(x - 4 * s, y - 5 * s, 14 * s, 0, Math.PI * 2);
      ctx.arc(x + 11 * s, y - 2 * s, 12 * s, 0, Math.PI * 2);
      ctx.arc(x + 22 * s, y + 3 * s, 8 * s, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawHill(baseY, amp, phase, col) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let i = 0; i <= 48; i++) {
        const u = i / 48;
        const x = u * W;
        const y = baseY + Math.sin(u * Math.PI * 2 + phase) * amp;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
    }

    function renderHero(p) {
      const tau = Math.PI * 2;
      ctx.clearRect(0, 0, W, H);
      const pulse = Math.sin(p * tau) * 4;
      ctx.fillStyle = palette.sunOuter;
      ctx.beginPath(); ctx.arc(820, 74, 72 + pulse, 0, tau); ctx.fill();
      ctx.fillStyle = palette.sunMid;
      ctx.beginPath(); ctx.arc(820, 74, 50 + pulse * 0.5, 0, tau); ctx.fill();
      ctx.fillStyle = palette.sunCore;
      ctx.beginPath(); ctx.arc(820, 74, 32, 0, tau); ctx.fill();
      const span = W + 160;
      drawCloud(((210 - p * span) % span + span) % span - 80, 56, 1.3, palette.cloud1);
      drawCloud(((620 - p * span) % span + span) % span - 80, 96, 1.05, palette.cloud2);
      drawHill(256, 12, p * tau, palette.hill1);
      drawHill(278, 9, p * tau + 2.0, palette.hill2);
      drawHill(296, 7, p * tau + 3.4, palette.hill3);
    }

    if (reduced) {
      renderHero(0.2);
      return;
    }
    let start = null;
    function frame(ts) {
      if (!document.hidden) {
        if (start === null) start = ts;
        const p = ((ts - start) % 3000) / 3000;
        renderHero(p);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  initHeroLoopBackdrop();

  // Sticker Category Filters
  stickerFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeStickerFilter = btn.getAttribute('data-sticker-filter') || 'all';
      stickerFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      renderStickerGrid();
    });
  });

  // Unified Full-Screen Lightbox (Comics, Sticker Sheet & 24 Stickers)
  function preventBgScroll(e) {
    if (comicLightbox && !comicLightbox.classList.contains('hidden')) {
      e.preventDefault();
    }
  }

  function showLightboxModal() {
    if (!comicLightbox) return;
    comicLightbox.classList.remove('hidden');
    document.documentElement.classList.add('lightbox-open');
    document.body.classList.add('lightbox-open');
  }

  function openComicLightbox(num) {
    const suffix = lang === 'ko' ? 'ko' : 'zh';
    const title = num === '1' ? TEXT.comic1Title[lang] : TEXT.comic2Title[lang];
    lightboxState = { mode: 'comic', comicNum: num, stickerIndex: 0 };
    if (lightboxMediaWrap) lightboxMediaWrap.classList.remove('is-sticker');
    if (lightboxImg) {
      lightboxImg.src = `./comics/comic0${num}-${suffix}.jpg`;
      lightboxImg.alt = title;
    }
    if (lightboxCaption) lightboxCaption.textContent = title;
    if (lightboxQuote) lightboxQuote.classList.add('hidden');
    if (lightboxStickerControls) lightboxStickerControls.classList.add('hidden');
    showLightboxModal();
  }

  function openSheetLightbox() {
    lightboxState = { mode: 'sheet', comicNum: null, stickerIndex: 0 };
    if (lightboxMediaWrap) lightboxMediaWrap.classList.remove('is-sticker');
    if (lightboxImg) {
      lightboxImg.src = './assets/stickers/sheet.jpg';
      lightboxImg.alt = TEXT.stickerSheetTitle[lang];
    }
    if (lightboxCaption) lightboxCaption.textContent = TEXT.stickerSheetTitle[lang];
    if (lightboxQuote) lightboxQuote.classList.add('hidden');
    if (lightboxStickerControls) lightboxStickerControls.classList.add('hidden');
    showLightboxModal();
  }

  function openStickerLightbox(index) {
    const safeIdx = ((index % STICKERS.length) + STICKERS.length) % STICKERS.length;
    const st = STICKERS[safeIdx];
    const src = `./assets/stickers/${st.file}.png`;
    lightboxState = { mode: 'sticker', comicNum: null, stickerIndex: safeIdx };
    if (lightboxMediaWrap) lightboxMediaWrap.classList.add('is-sticker');
    if (lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = st[lang];
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = `${st[lang]}  (${safeIdx + 1} / ${STICKERS.length})`;
    }
    if (lightboxQuote) {
      lightboxQuote.textContent = `「${lang === 'ko' ? st.qko : st.qzh}」`;
      lightboxQuote.classList.remove('hidden');
    }
    if (lbDownloadBtn) {
      lbDownloadBtn.href = src;
      lbDownloadBtn.setAttribute('download', `foxiaogan-${st.file}.png`);
    }
    if (lightboxStickerControls) lightboxStickerControls.classList.remove('hidden');
    showLightboxModal();
  }

  function closeLightbox() {
    if (!comicLightbox) return;
    comicLightbox.classList.add('hidden');
    document.documentElement.classList.remove('lightbox-open');
    document.body.classList.remove('lightbox-open');
    lightboxState = { mode: null, comicNum: null, stickerIndex: 0 };
  }

  document.querySelectorAll('[data-open-comic]').forEach((btn) => {
    btn.addEventListener('click', () => openComicLightbox(btn.getAttribute('data-open-comic')));
  });
  if (openSheetBtn) openSheetBtn.addEventListener('click', openSheetLightbox);
  if (lbPrevBtn) {
    lbPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openStickerLightbox(lightboxState.stickerIndex - 1);
    });
  }
  if (lbNextBtn) {
    lbNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openStickerLightbox(lightboxState.stickerIndex + 1);
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (comicLightbox) {
    comicLightbox.addEventListener('wheel', preventBgScroll, { passive: false });
    comicLightbox.addEventListener('touchmove', preventBgScroll, { passive: false });
    comicLightbox.addEventListener('click', (e) => {
      if (e.target === comicLightbox) closeLightbox();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (comicLightbox && !comicLightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (lightboxState.mode === 'sticker' && e.key === 'ArrowLeft') {
        openStickerLightbox(lightboxState.stickerIndex - 1);
      }
      if (lightboxState.mode === 'sticker' && e.key === 'ArrowRight') {
        openStickerLightbox(lightboxState.stickerIndex + 1);
      }
    }
  });

  langSwitchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-fg-lang') === 'ko' ? 'ko' : 'zh';
      if (next === lang) return;
      lang = next;
      try {
        localStorage.setItem(LANG_KEY, lang);
        sessionStorage.setItem(TOWN_LANG_KEY, lang);
      } catch {
        // ignore
      }
      applyI18n();
    });
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.classList.add('hidden');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  window.addEventListener('pageshow', refreshLiveStats);
  window.addEventListener('focus', refreshLiveStats);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      [shortVideo1, shortVideo2].forEach((vid) => {
        if (vid && !vid.paused) {
          vid.pause();
          updatePlayVisual(vid);
        }
      });
    } else {
      updateTimeGreeting();
      refreshLiveStats();
    }
  });

  applyI18n();
})();
