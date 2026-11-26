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
    comic3Badge: { zh: '四格漫画 · 第 3 话', ko: '4컷 만화 · 3화' },
    comic3Title: { zh: '今晚一定要早睡！', ko: '오늘 밤엔 꼭 일찍 자야지!' },
    comic3Desc: {
      zh: '喝完安神茶把手机反扣桌面，信誓旦旦十点睡——直到凌晨 02:15 被窝亮起熟悉微光……',
      ko: '안신차 마시고 폰까지 뒤집어 뒀는데… 새벽 2시 15분 이불 속 불빛이 켜졌다! 내일 일찍 자지 뭐~',
    },
    comic4Badge: { zh: '四格漫画 · 第 4 话', ko: '4컷 만화 · 4화' },
    comic4Title: { zh: '茶叶放久了怎么没香味了？', ko: '말린 찻잎, 왜 향이 다 날아갔지?' },
    comic4Desc: {
      zh: '透明罐晒太阳又挨着热蒸汽？佛小柑的锁香干货：避光密封放阴凉处，远离水汽才留香！',
      ko: '창가 햇볕과 주전자 수증기 옆에 두면 눅눅해져요! 빛·습기 피해 불투명 밀폐통에 서늘하게 보관해요~',
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
    short3Badge: { zh: '漫画短片 · 15秒', ko: '만화 쇼츠 · 15초' },
    short3Title: { zh: '今晚十点，准时睡觉！', ko: '오늘 밤 10시, 칼취침 도전!' },
    short3Desc: {
      zh: '睡前立下早睡 flag，喝完安神茶绝不看手机……结果凌晨两点十五分还在被窝刷泡茶法！',
      ko: '밤 10시 칼취침을 다짐하고 폰까지 뒤집어 뒀는데… 새벽 2시 15분에 이불 속에서 차 우리는 법 정주행 중!',
    },
    short4Badge: { zh: '日常 POV · 9秒', ko: '일상 POV · 9초' },
    short4Title: { zh: '闹钟没响惊醒，结果今天是周日?!', ko: '지각인 줄 알았는데 오늘 일요일?!' },
    short4Desc: {
      zh: '以为睡过头早八要迟到了，抬头一看台历原来是周日——慢慢来，先泡杯 60°C 温茶再继续躺！',
      ko: '알람이 안 울려 지각인 줄 알고 화들짝! 달력을 보니 일요일?! 천천히 60°C 차부터 한 잔 마시고 더 눕자~',
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
    schedBadge: { zh: '风车茶坡日常', ko: '풍차 언덕 일상' },
    schedTitle: { zh: '佛小柑的茶坡时刻表', ko: '불소감의 하루 시간표' },
    schedLead: {
      zh: '按风车转动的速度过一天，当前时段会悄悄亮起暖光。',
      ko: '풍차가 도는 속도로 하루를 보내요. 지금 시간에 따뜻한 불이 켜져요.',
    },
    slot1Title: { zh: '晨雾收露 · 晒茶竹匾开窗', ko: '아침 이슬 · 찻잎 채반 열기' },
    slot1Desc: {
      zh: '趁太阳还不晒，先把昨夜采来的嫩叶与佛手干片摊在风车下。',
      ko: '햇살이 강해지기 전에 어린 찻잎과 불수감 조각을 풍차 아래 펼쳐 둬요.',
    },
    slot2Title: { zh: '午间翻晒 · 给果皮做日光浴', ko: '한낮 일광욕 · 껍질 뒤집기' },
    slot2Desc: {
      zh: '把皱巴巴的小烦恼写在干橘皮上，翻面晒到清香四溢。',
      ko: '구겨진 작은 고민을 마른 껍질에 적어 햇볕에 향긋하게 말려요.',
    },
    slot3Title: { zh: '60°C 慢泡 · 接待串门邻居', ko: '60°C 천천히 우리기 · 이웃 티타임' },
    slot3Desc: {
      zh: '温水慢慢冲开第一壶金佛手茶，谁路过风车茶坡都可以蹭一杯。',
      ko: '미지근한 물로 첫 주전자를 우려 지나가는 이웃 누구에게나 나눠 줘요.',
    },
    slot4Title: { zh: '藤椅听水车 · 伴着果香充会儿电', ko: '흔들의자 휴식 · 물레방아 소리' },
    slot4Desc: {
      zh: '关掉闹钟听溪边水车哒哒转动，什么都不催，慢慢进入梦乡。',
      ko: '알람을 끄고 시냇가 물레방아 소리를 들으며 천천히 충전해요.',
    },
    slotNowBadge: { zh: '此刻', ko: '지금' },
    bondsBadge: { zh: '茶缘手账', ko: '이웃 차 일기' },
    bondsTitle: { zh: '茶坡上的常客邻居', ko: '차 언덕의 단골 이웃들' },
    bondsLead: {
      zh: '风车茶坡永远为邻居温着一壶茶，点任意一位就能去对方房间串门。',
      ko: '풍차 차 언덕은 언제나 이웃을 위해 차를 데워 둬요. 이웃을 눌러 방에 놀러 가 보세요.',
    },
    bond1Name: { zh: '呆呆柚 · 溪畔木桥', ko: '멍멍유 · 시냇가 나무다리' },
    bond1Desc: {
      zh: '最合拍的发呆茶友，两人能端着杯子一整个下午不说一句话。',
      ko: '가장 잘 맞는 멍때리기 친구. 말없이 차만 마셔도 편안해요.',
    },
    bond2Name: { zh: '菠大炮 · 菠萝广播屋', ko: '보대포 · 파인애플 방송집' },
    bond2Desc: {
      zh: '每天播音后都会来讨一杯 60°C 润喉茶，顺便分享今天的新歌单。',
      ko: '방송이 끝나면 늘 60°C 목 보호 차를 마시며 오늘의 선곡을 들려줘요.',
    },
    bond3Name: { zh: '举重桃 · 蜜桃训练屋', ko: '역도복숭 · 복숭아 트레이닝집' },
    bond3Desc: {
      zh: '练完杠铃嘴上说不累，但闻到茶香就会乖乖坐下来喝两口歇脚。',
      ko: '안 힘들다고 버티다가도 차 향기가 나면 슬며시 앉아 쉬고 가요.',
    },
    bond4Name: { zh: '草莓菜 · 小白菜花园', ko: '딸기채 · 배추 정원' },
    bond4Desc: {
      zh: '雨天常躲进茶坡木棚烤干小白菜背包，一起分一壶热腾腾的果茶。',
      ko: '비 오는 날이면 오두막에서 배추 가방을 말리며 따뜻한 과일차를 나눠 마셔요.',
    },
    pickerBadge: { zh: '互动抽签 · 零压力', ko: '기분 뽑기 · 무부담' },
    pickerTitle: { zh: '抽一枚此刻心情贴纸', ko: '지금 내 기분 이모티콘 뽑기' },
    pickerDesc: {
      zh: '不知道发什么回复给朋友？选一个此刻状态，或者让佛小柑随机替你挑一枚透明贴纸。',
      ko: '친구에게 뭐라고 답장할지 고민될 때, 지금 기분에 맞는 투명 이모티콘을 골라 보세요.',
    },
    sceneGreet: { zh: '☀️ 早安打招呼', ko: '☀️ 아침 인사' },
    sceneTea: { zh: '🍵 约喝一杯茶', ko: '🍵 차 한 잔 할래?' },
    sceneMeeting: { zh: '😤 拒绝临时加会', ko: '😤 긴급 회의 사절' },
    sceneRelax: { zh: '🌿 下班慢慢躺', ko: '🌿 퇴근 후 힐링' },
    sceneCheer: { zh: '💛 给朋友打气', ko: '💛 힘내라고 응원' },
    pickerDrawBtn: { zh: '✦ 随机抽一枚贴纸', ko: '✦ 랜덤으로 한 장 뽑기' },
    pickerCopyBtn: { zh: '复制这句台词', ko: '대사 복사하기' },
    pickerZoomBtn: { zh: '查看大图', ko: '크게 보기' },
    pickerSaveBtn: { zh: '⬇ 保存 PNG', ko: '⬇ PNG 저장' },
    timerBadge: { zh: '房内小工具', ko: '방 안 미니 도구' },
    timerTitle: { zh: '60°C 泡茶呼吸计时器', ko: '60°C 차 우리기 호흡 타이머' },
    timerDesc: {
      zh: '趁温水舒展茶叶的间隙，跟着佛小柑慢慢呼吸、放松一下肩膀。',
      ko: '따뜻한 물에 찻잎이 천천히 퍼지는 동안 불소감과 함께 숨을 고르세요.',
    },
    timer30s: { zh: '30 秒喘口气', ko: '30초 숨 고르기' },
    timer60s: { zh: '1 分钟慢泡', ko: '1분 천천히' },
    timer180s: { zh: '3 分钟静心', ko: '3분 마음 쉼표' },
    timerReady: { zh: '准备泡茶', ko: '준비 완료' },
    timerCueIdle: {
      zh: '调好 60°C 温水，按下开始一起慢呼吸吧～',
      ko: '60°C 따뜻한 물을 붓고 시작을 눌러 천천히 호흡해 봐요~',
    },
    timerStartBtn: { zh: '✦ 开始泡茶计时', ko: '✦ 타이머 시작' },
    timerPauseBtn: { zh: '暂停一会儿', ko: '잠시 멈춤' },
    timerResumeBtn: { zh: '✦ 继续计时', ko: '✦ 다시 이어서' },
    timerResetBtn: { zh: '重置', ko: '초기화' },
    timerInhale: { zh: '慢慢吸气', ko: '천천히 들숨' },
    timerExhale: { zh: '缓缓呼气', ko: '부드럽게 날숨' },
    timerCueInhale: {
      zh: '慢慢吸一口气，闻闻空气里暖暖的佛手柑清香…',
      ko: '천천히 숨을 들이마시며 은은한 불수감 향기를 느껴 봐요…',
    },
    timerCueExhale: {
      zh: '缓缓呼出来，把紧绷的肩膀轻轻放下来～',
      ko: '부드럽게 숨을 내쉬며 굳었던 어깨 힘을 살짝 내려놓아요~',
    },
    timerDonePhase: { zh: '茶香正好', ko: '향기 완성' },
    timerDoneCue: {
      zh: '泡好啦！60°C 刚刚好不苦，先抿一小口润润喉吧～',
      ko: '다 우러났어요! 쓰지 않고 딱 좋은 60°C, 한 모금 마셔 봐요~',
    },
    timerDoneToast: {
      zh: '🍵 60°C 温茶泡好啦，记得先润润喉哦～',
      ko: '🍵 60°C 따뜻한 차가 완성되었어요, 천천히 마셔요~',
    },
    recipesBadge: { zh: '茶坡配方笺', ko: '차 언덕 레시피' },
    recipesTitle: { zh: '佛小柑的 3 道暖心茶方', ko: '불소감의 따뜻한 차 3선' },
    recipesLead: {
      zh: '不讲究繁琐茶道，只要一杯热乎乎、喝着舒服就好。',
      ko: '복잡한 다도는 필요 없어요. 따뜻하고 편안한 한 잔이면 충분해요.',
    },
    rec1Name: { zh: '01 · 经典 60°C 金佛手温茶', ko: '01 · 클래식 60°C 불수감 차' },
    rec1Desc: {
      zh: '2 片干佛手配清甜温水，微甘不涩，最适合早起润喉。',
      ko: '건조 불수감 2조각에 부드러운 온수. 쓰지 않고 아침 목을 감싸 줘요.',
    },
    rec2Name: { zh: '02 · 午后清风薄荷柑皮饮', ko: '02 · 오후 산들바람 민트 시트러스' },
    rec2Desc: {
      zh: '下午三点犯困时的温柔替代，清爽柑橘香悄悄赶走疲惫。',
      ko: '오후 3시 졸릴 때 아이스 커피 대신 산뜻하게 기분을 깨워 줘요.',
    },
    rec3Name: { zh: '03 · 晚安洋甘菊佛手暖茶', ko: '03 · 굿나잇 캐모마일 불수감 차' },
    rec3Desc: {
      zh: '零咖啡因睡前伴侣，捧在手里暖一暖掌心，准备安心入梦。',
      ko: '카페인 없는 잠들기 전 한 잔. 두 손으로 감싸고 포근히 쉬어요.',
    },
    copiedToast: { zh: '已复制佛小柑台词到剪贴板', ko: '불소감 대사를 클립보드에 복사했어요' },
    teaserBadge: { zh: '下集筹备预告', ko: '다음 화 예고' },
    shortTeaserTitle: { zh: '风车茶坡 · 正在画的新短片', ko: '풍차 차 언덕 · 준비 중인 쇼츠' },
    ep3Title: { zh: '《风车转慢了一拍》', ko: '〈풍차가 한 박자 느려진 날〉' },
    ep3Desc: {
      zh: '呆呆柚上坡发呆，连风车叶片和飘散的茶香也跟着慢成 0.5 倍速。',
      ko: '멍멍유가 언덕에서 멍을 때리자 풍차 날개와 차 향기까지 0.5배속으로 느려졌어요.',
    },
    ep4Title: { zh: '《雨天木棚里的双人壶》', ko: '〈비 오는 날 오두막의 두 사람 주전자〉' },
    ep4Desc: {
      zh: '突如其来的阵雨里，替淋湿的草莓菜烤干小白菜背包，一起分一壶暖茶。',
      ko: '갑작스러운 소나기에 젖은 딸기채의 배추 가방을 말려 주며 따뜻한 차를 나눠 마셔요.',
    },
    notesBadge: { zh: '漫画延伸手记', ko: '만화 비하인드 노트' },
    notesTitle: { zh: '读完四格 · 佛小柑的泡茶小抄', ko: '4컷 만화 뒤에 붙이는 차 메모' },
    note1Title: { zh: '第 1 话延伸 · 睡回笼觉也不必自责', ko: '1화 메모 · 다시 잠들어도 괜찮아' },
    note1Desc: {
      zh: '冥想睡着说明身体真的很想充电，醒来伸个大懒腰、喝两口温水就已经满分啦。',
      ko: '명상하다 잠들었다는 건 몸이 쉬고 싶다는 신호예요. 기지개 켜고 물 한 모금이면 충분해요.',
    },
    note2Title: { zh: '第 2 话延伸 · 为什么 60°C 温水最清香？', ko: '2화 메모 · 왜 60°C 물이 가장 향긋할까?' },
    note2Desc: {
      zh: '滚烫开水会把柑橘表皮的苦味素瞬间烫出，用略烫手又可入口的 60°C 慢泡，果香才最柔和。',
      ko: '펄펄 끓는 물은 껍질의 쓴맛을 끌어내요. 60°C 미지근한 물로 우리면 향긋함이 살아나요.',
    },
    note3Title: { zh: '第 3 话延伸 · 睡前少刷屏的小窍门', ko: '3화 메모 · 잠들기 전 스마트폰 내려놓기' },
    note3Desc: {
      zh: '给手机在书桌留一个“睡前小床”，把手机放在够不着的充电处，自然就更容易早点合眼啦。',
      ko: '침대 대신 책상 위에 스마트폰 충전 자리를 만들어 두면 밤늦게 덜 보게 돼요.',
    },
    note4Title: { zh: '第 4 话延伸 · 干茶叶与柑片怎么保存？', ko: '4화 메모 · 말린 찻잎·시트러스 보관법' },
    note4Desc: {
      zh: '干茶叶极易吸湿吸味，选不透光的密封陶瓷罐或铁罐放阴凉橱柜，远离烧水壶和阳光直射即可。',
      ko: '마른 찻잎은 습기와 냄새를 잘 흡수해요. 빛이 안 드는 밀폐통에 넣어 서늘한 찬장에 보관하세요.',
    },
    comicNextBadge: { zh: '下话草稿本', ko: '다음 화 스케치북' },
    comicNextTitle: { zh: '四格漫画 · 连载分镜预告', ko: '4컷 만화 · 연재 예고' },
    c3Title: { zh: '《晒在竹匾上的小烦恼》', ko: '〈대나무 채반에 널어 둔 작은 고민〉' },
    c3Desc: {
      zh: '把今天皱巴巴的心情写在干橘皮上晒一晒太阳，傍晚收回来时只剩甜甜柑橘香。',
      ko: '구겨진 마음을 마른 귤껍질에 적어 햇볕에 널어 두면, 저녁엔 달콤한 향기만 남아요.',
    },
    c4Title: { zh: '《谁偷喝了壶底最后一口茶》', ko: '〈주전자 마지막 한 모금은 누가 마셨을까〉' },
    c4Desc: {
      zh: '白瓷茶壶莫名见底，茶坡小路上留下一串暖黄色的神秘脚印，线索直指广播屋！',
      ko: '주전자가 텅 빈 채 언덕길에 노란 발자국이 남아 있어요. 단서는 파인애플 방송집으로!',
    },
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
  const comicImg3 = document.getElementById('comicImg3');
  const comicImg4 = document.getElementById('comicImg4');
  const comicDl1 = document.getElementById('comicDl1');
  const comicDl2 = document.getElementById('comicDl2');
  const comicDl3 = document.getElementById('comicDl3');
  const comicDl4 = document.getElementById('comicDl4');
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
  const shortVideo3 = document.getElementById('shortVideo3');
  const shortVideo4 = document.getElementById('shortVideo4');
  const shortProg1 = document.getElementById('shortProg1');
  const shortProg2 = document.getElementById('shortProg2');
  const shortProg3 = document.getElementById('shortProg3');
  const shortProg4 = document.getElementById('shortProg4');
  const short1HdLink = document.getElementById('short1HdLink');
  const short2HdLink = document.getElementById('short2HdLink');
  const short3HdLink = document.getElementById('short3HdLink');
  const short4HdLink = document.getElementById('short4HdLink');
  const ALL_SHORT_VIDEOS = [shortVideo1, shortVideo2, shortVideo3, shortVideo4];
  const heroLoopCanvas = document.getElementById('heroLoopCanvas');
  const fgToast = document.getElementById('fgToast');
  const teaSchedule = document.getElementById('teaSchedule');
  const moodPickerStage = document.getElementById('moodPickerStage');
  const pickedStickerImg = document.getElementById('pickedStickerImg');
  const pickedStickerName = document.getElementById('pickedStickerName');
  const pickedStickerQuote = document.getElementById('pickedStickerQuote');
  const openPickedLightboxBtn = document.getElementById('openPickedLightboxBtn');
  const downloadPickedBtn = document.getElementById('downloadPickedBtn');
  const randomStickerBtn = document.getElementById('randomStickerBtn');
  const copyPickedQuoteBtn = document.getElementById('copyPickedQuoteBtn');
  const scenePickBtns = document.querySelectorAll('[data-pick-sticker]');
  const timerPresetBtns = document.querySelectorAll('[data-timer-sec]');
  const teaTimerRing = document.getElementById('teaTimerRing');
  const teaTimerDisplay = document.getElementById('teaTimerDisplay');
  const teaTimerPhase = document.getElementById('teaTimerPhase');
  const teaTimerImg = document.getElementById('teaTimerImg');
  const teaTimerCue = document.getElementById('teaTimerCue');
  const teaTimerStartBtn = document.getElementById('teaTimerStartBtn');
  const teaTimerResetBtn = document.getElementById('teaTimerResetBtn');

  let activeTab = 'profile';
  let activeStickerFilter = 'all';
  let lightboxState = { mode: null, comicNum: null, stickerIndex: 0 };
  let selectedExpr = 'base';
  let patIndex = 0;
  let pickedStickerIndex = 7;
  let toastTimer = null;
  let timerTotalSec = 30;
  let timerRemainSec = 30;
  let timerState = 'idle';
  let timerInterval = null;
  let deferredPrompt = null;

  const RING_CIRCUMFERENCE = 314.16;

  function showRoomToast(msg) {
    if (!fgToast) return;
    fgToast.textContent = msg;
    fgToast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => fgToast.classList.remove('is-visible'), 2400);
  }

  function copyTextWithFeedback(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showRoomToast(TEXT.copiedToast[lang])).catch(() => showRoomToast(TEXT.copiedToast[lang]));
    } else {
      showRoomToast(TEXT.copiedToast[lang]);
    }
  }

  function updateActiveScheduleSlot() {
    if (!teaSchedule) return;
    const h = new Date().getHours();
    const curSlot = h >= 5 && h < 11 ? 'morning' : h >= 11 && h < 15 ? 'noon' : h >= 15 && h < 20 ? 'afternoon' : 'night';
    teaSchedule.querySelectorAll('[data-slot]').forEach((el) => {
      el.classList.toggle('is-now', el.getAttribute('data-slot') === curSlot);
    });
  }

  function renderPickedSticker(animate = false) {
    const st = STICKERS[pickedStickerIndex] || STICKERS[0];
    const src = `./assets/stickers/${st.file}.png`;
    if (pickedStickerImg) {
      pickedStickerImg.src = src;
      pickedStickerImg.alt = st[lang];
    }
    if (pickedStickerName) pickedStickerName.textContent = st[lang];
    if (pickedStickerQuote) pickedStickerQuote.textContent = `「${lang === 'ko' ? st.qko : st.qzh}」`;
    if (downloadPickedBtn) {
      downloadPickedBtn.href = src;
      downloadPickedBtn.setAttribute('download', `foxiaogan-${st.file}.png`);
    }
    if (animate && moodPickerStage) {
      moodPickerStage.classList.remove('is-pop');
      void moodPickerStage.offsetWidth;
      moodPickerStage.classList.add('is-pop');
    }
  }

  function formatTimer(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function renderTeaTimer() {
    if (!teaTimerDisplay || !teaTimerRing) return;
    teaTimerDisplay.textContent = formatTimer(timerRemainSec);
    const ratio = timerTotalSec > 0 ? (timerTotalSec - timerRemainSec) / timerTotalSec : 0;
    teaTimerRing.style.strokeDashoffset = String((RING_CIRCUMFERENCE * (1 - ratio)).toFixed(2));

    if (timerState === 'running') {
      const elapsed = timerTotalSec - timerRemainSec;
      const inhale = Math.floor(elapsed / 4) % 2 === 0;
      if (teaTimerPhase) teaTimerPhase.textContent = inhale ? TEXT.timerInhale[lang] : TEXT.timerExhale[lang];
      if (teaTimerCue) teaTimerCue.textContent = inhale ? TEXT.timerCueInhale[lang] : TEXT.timerCueExhale[lang];
      if (teaTimerImg) teaTimerImg.src = './assets/expressions/happy.png';
      if (teaTimerStartBtn) teaTimerStartBtn.textContent = TEXT.timerPauseBtn[lang];
    } else if (timerState === 'paused') {
      if (teaTimerPhase) teaTimerPhase.textContent = TEXT.timerPauseBtn[lang];
      if (teaTimerImg) teaTimerImg.src = './assets/expressions/base.png';
      if (teaTimerStartBtn) teaTimerStartBtn.textContent = TEXT.timerResumeBtn[lang];
    } else if (timerState === 'done') {
      if (teaTimerPhase) teaTimerPhase.textContent = TEXT.timerDonePhase[lang];
      if (teaTimerCue) teaTimerCue.textContent = TEXT.timerDoneCue[lang];
      if (teaTimerImg) teaTimerImg.src = './assets/expressions/proud.png';
      if (teaTimerStartBtn) teaTimerStartBtn.textContent = TEXT.timerStartBtn[lang];
    } else {
      if (teaTimerPhase) teaTimerPhase.textContent = TEXT.timerReady[lang];
      if (teaTimerCue) teaTimerCue.textContent = TEXT.timerCueIdle[lang];
      if (teaTimerImg) teaTimerImg.src = './assets/expressions/base.png';
      if (teaTimerStartBtn) teaTimerStartBtn.textContent = TEXT.timerStartBtn[lang];
    }
  }

  function stopTeaTimerInterval() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startOrToggleTeaTimer() {
    if (timerState === 'running') {
      stopTeaTimerInterval();
      timerState = 'paused';
      renderTeaTimer();
      return;
    }
    if (timerState === 'done' || timerRemainSec <= 0) {
      timerRemainSec = timerTotalSec;
    }
    timerState = 'running';
    renderTeaTimer();
    stopTeaTimerInterval();
    timerInterval = setInterval(() => {
      timerRemainSec = Math.max(0, timerRemainSec - 1);
      if (timerRemainSec <= 0) {
        stopTeaTimerInterval();
        timerState = 'done';
        renderTeaTimer();
        showRoomToast(TEXT.timerDoneToast[lang]);
      } else {
        renderTeaTimer();
      }
    }, 1000);
  }

  function resetTeaTimer(newSec = timerTotalSec) {
    stopTeaTimerInterval();
    timerTotalSec = newSec;
    timerRemainSec = newSec;
    timerState = 'idle';
    renderTeaTimer();
  }

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
      { video: shortVideo3, hd: short3HdLink, id: 'short03' },
      { video: shortVideo4, hd: short4HdLink, id: 'short04' },
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
      { img: comicImg3, dl: comicDl3, num: '03' },
      { img: comicImg4, dl: comicDl4, num: '04' },
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
    updateActiveScheduleSlot();
    heroSpeech.textContent = PAT_LINES[patIndex][lang];

    const curItem = EXPR_ITEMS.find((e) => e.key === selectedExpr);
    if (curItem) previewBubble.textContent = curItem.quote[lang];

    refreshLiveStats();
    renderExprGrid();
    renderPickedSticker(false);
    renderStickerGrid();
    renderTeaTimer();
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

      ALL_SHORT_VIDEOS.forEach((vid, idx) => {
        if (!vid) return;
        if (tab === 'shorts') {
          if (idx < 2) {
            vid.play().then(() => updatePlayVisual(vid)).catch(() => updatePlayVisual(vid));
          } else {
            vid.pause();
            updatePlayVisual(vid);
          }
        } else {
          vid.pause();
          updatePlayVisual(vid);
        }
      });
    });
  });

  if ('IntersectionObserver' in window) {
    const shortObserver = new IntersectionObserver(
      (entries) => {
        if (activeTab !== 'shorts') return;
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            vid.play().then(() => updatePlayVisual(vid)).catch(() => updatePlayVisual(vid));
          } else if (!vid.paused && vid.muted) {
            vid.pause();
            updatePlayVisual(vid);
          }
        });
      },
      { threshold: [0.2, 0.45] }
    );
    ALL_SHORT_VIDEOS.forEach((vid) => {
      if (vid) shortObserver.observe(vid);
    });
  }

  document.querySelectorAll('[data-toggle-mute]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vid = document.getElementById(btn.getAttribute('data-toggle-mute'));
      if (!vid) return;
      const willUnmute = vid.muted;
      if (willUnmute) {
        ALL_SHORT_VIDEOS.forEach((other) => {
          if (other && other !== vid) {
            other.muted = true;
            if (!other.paused) {
              other.pause();
              updatePlayVisual(other);
            }
          }
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
    { vid: shortVideo3, prog: shortProg3 },
    { vid: shortVideo4, prog: shortProg4 },
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
    const safeNum = String(((Number(num) - 1 + 4) % 4) + 1);
    const titleMap = {
      '1': TEXT.comic1Title,
      '2': TEXT.comic2Title,
      '3': TEXT.comic3Title,
      '4': TEXT.comic4Title,
    };
    const title = (titleMap[safeNum] || TEXT.comic1Title)[lang];
    const src = `./comics/comic0${safeNum}-${suffix}.jpg`;
    lightboxState = { mode: 'comic', comicNum: safeNum, stickerIndex: 0 };
    if (lightboxMediaWrap) lightboxMediaWrap.classList.remove('is-sticker');
    if (lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = title;
    }
    if (lightboxCaption) lightboxCaption.textContent = `${title}  (NO.0${safeNum} / 04)`;
    if (lightboxQuote) lightboxQuote.classList.add('hidden');
    if (lbDownloadBtn) {
      lbDownloadBtn.href = src;
      lbDownloadBtn.setAttribute('download', `foxiaogan-comic0${safeNum}-${suffix}.jpg`);
      lbDownloadBtn.textContent = TEXT.downloadComic[lang];
    }
    if (lightboxStickerControls) lightboxStickerControls.classList.remove('hidden');
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
      lbDownloadBtn.textContent = TEXT.downloadSingleSticker[lang];
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
      if (lightboxState.mode === 'comic' && lightboxState.comicNum) {
        openComicLightbox(Number(lightboxState.comicNum) - 1);
      } else {
        openStickerLightbox(lightboxState.stickerIndex - 1);
      }
    });
  }
  if (lbNextBtn) {
    lbNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (lightboxState.mode === 'comic' && lightboxState.comicNum) {
        openComicLightbox(Number(lightboxState.comicNum) + 1);
      } else {
        openStickerLightbox(lightboxState.stickerIndex + 1);
      }
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
      if (lightboxState.mode === 'comic' && lightboxState.comicNum && e.key === 'ArrowLeft') {
        openComicLightbox(Number(lightboxState.comicNum) - 1);
      }
      if (lightboxState.mode === 'comic' && lightboxState.comicNum && e.key === 'ArrowRight') {
        openComicLightbox(Number(lightboxState.comicNum) + 1);
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
      ALL_SHORT_VIDEOS.forEach((vid) => {
        if (vid && !vid.paused) {
          vid.pause();
          updatePlayVisual(vid);
        }
      });
    } else {
      updateTimeGreeting();
      updateActiveScheduleSlot();
      refreshLiveStats();
    }
  });

  if (randomStickerBtn) {
    randomStickerBtn.addEventListener('click', () => {
      let nextIdx = Math.floor(Math.random() * STICKERS.length);
      if (nextIdx === pickedStickerIndex) nextIdx = (nextIdx + 1) % STICKERS.length;
      pickedStickerIndex = nextIdx;
      renderPickedSticker(true);
    });
  }

  scenePickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-pick-sticker'));
      if (!Number.isNaN(idx) && STICKERS[idx]) {
        pickedStickerIndex = idx;
        renderPickedSticker(true);
      }
    });
  });

  if (openPickedLightboxBtn) {
    openPickedLightboxBtn.addEventListener('click', () => openStickerLightbox(pickedStickerIndex));
  }

  if (copyPickedQuoteBtn) {
    copyPickedQuoteBtn.addEventListener('click', () => {
      const st = STICKERS[pickedStickerIndex] || STICKERS[0];
      const prefix = lang === 'ko' ? '불소감: ' : '佛小柑：';
      copyTextWithFeedback(`${prefix}${lang === 'ko' ? st.qko : st.qzh}`);
    });
  }

  timerPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sec = Number(btn.getAttribute('data-timer-sec')) || 30;
      timerPresetBtns.forEach((b) => b.classList.toggle('active', b === btn));
      resetTeaTimer(sec);
    });
  });

  if (teaTimerStartBtn) teaTimerStartBtn.addEventListener('click', startOrToggleTeaTimer);
  if (teaTimerResetBtn) teaTimerResetBtn.addEventListener('click', () => resetTeaTimer(timerTotalSec));

  applyI18n();
})();
