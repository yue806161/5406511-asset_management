/**
 * Family Capital Governance Platform — Mock Data v2.0
 * Single source of truth for all pages.
 * Three portfolio types: A(境外) / B(境內) / C(境內融資後資金)
 */

const MOCK = {

  /* ─── Family & Platform ─────────────────────────────── */
  family: {
    name:    "陳家族辦公室",
    manager: "陳○○",
    tier:    "Family Office",
    mandate: "semi"   // "full" = 全權委託EAM, "semi" = 半委託EAM
  },

  /* ─── AUM Summary ───────────────────────────────────── */
  aum: {
    total:    128560000,
    currency: "USD",
    change:   2.45,
    // Three portfolio split
    portA: { label: "境外投組 A", value: 85000000, pct: 66.1, color: "#0D2746" },
    portB: { label: "境內投組 B", value: 28560000, pct: 22.2, color: "#2E6DB4" },
    portC: { label: "融資後資金 C", value: 15000000, pct: 11.7, color: "#B8960C" }
  },

  /* ─── Asset Allocation (global) ─────────────────────── */
  assetAllocation: [
    { label: "股票",      value: 35, color: "#0D2746" },
    { label: "債券",      value: 25, color: "#2E6DB4" },
    { label: "私募股權",  value: 20, color: "#4CA3DD" },
    { label: "不動產",    value: 10, color: "#7EC8E3" },
    { label: "現金及其他",value: 10, color: "#BFE4F0" }
  ],

  geographic: [
    { region: "北美",  pct: 38.2, color: "#0D2746" },
    { region: "歐洲",  pct: 23.5, color: "#2E6DB4" },
    { region: "亞太",  pct: 22.7, color: "#4CA3DD" },
    { region: "其他",  pct: 15.6, color: "#BFE4F0" }
  ],

  riskProfile: [
    { label: "成長型", value: 62, color: "#0D2746" },
    { label: "平衡型", value: 25, color: "#4CA3DD" },
    { label: "保守型", value: 13, color: "#BFE4F0" }
  ],

  /* ─── Portfolio Performance ─────────────────────────── */
  portfolioYTD: {
    performance: 8.62,
    benchmark:   2.15,
    monthlyData: [
      { month: "1月", portA: 1.2, portB: 0.8, portC: 0.4, benchmark: 0.5 },
      { month: "2月", portA: 2.8, portB: 1.5, portC: 0.9, benchmark: 0.9 },
      { month: "3月", portA: 4.1, portB: 2.2, portC: 1.8, benchmark: 1.2 },
      { month: "4月", portA: 6.3, portB: 3.4, portC: 2.5, benchmark: 1.7 },
      { month: "5月", portA: 8.62,portB: 4.8, portC: 3.1, benchmark: 2.15 }
    ]
  },

  /* ─── Banks & Lombard Facilities ────────────────────── */
  // CRITICAL: Each bank's OBU (foreign assets) and DBU (Lombard loan) are SAME bank
  banks: [
    {
      id:         "A",
      name:       "A銀行",
      obuAssets:  28000000,    // Foreign assets held in A銀行 OBU (USD)
      dbuLoan: {
        type:     "倫巴德貸款 (質押授信)",
        limit:    20000000,
        used:     15000000,
        rate:     3.10,
        currency: "USD",
        ltv:      53.6,       // 15M / 28M
        ltvLimit: 65,
        status:   "normal"    // normal | warning | alert
      }
    },
    {
      id:         "B",
      name:       "B銀行",
      obuAssets:  24000000,
      dbuLoan: {
        type:     "倫巴德貸款 (有價證券質借)",
        limit:    15000000,
        used:     12000000,
        rate:     3.50,
        currency: "USD",
        ltv:      50.0,
        ltvLimit: 65,
        status:   "normal"
      }
    },
    {
      id:         "C",
      name:       "C銀行",
      obuAssets:  18000000,
      dbuLoan: {
        type:     "倫巴德貸款 (綜合授信)",
        limit:    10300000,
        used:     5700000,
        rate:     3.00,
        currency: "USD",
        ltv:      31.7,
        ltvLimit: 65,
        status:   "normal"
      }
    },
    {
      id:         "D",
      name:       "D銀行",
      obuAssets:  15000000,
      dbuLoan: null            // No Lombard loan
    }
  ],

  /* ─── Credit Summary ─────────────────────────────────── */
  credit: {
    totalLimit:      45300000,
    used:            32700000,
    leverageRatio:   28.3,
    avgCost:         3.28,
    // Post-Lombard funds available for domestic Taiwan investment
    lombardFundsForDomestic: 15000000
  },

  /* ─── Holdings — Portfolio A (境外) ─────────────────── */
  holdingsA: [
    { id: "A-01", name: "Apple Inc.",           type: "股票",    region: "北美", value: 8200000,  pct: 9.6,  change: 12.3,  bank: "A", pledged: true  },
    { id: "A-02", name: "TSMC ADR",             type: "股票",    region: "亞太", value: 7500000,  pct: 8.8,  change: 18.7,  bank: "A", pledged: true  },
    { id: "A-03", name: "BlackRock Bond ETF",   type: "債券",    region: "全球", value: 12000000, pct: 14.1, change: 2.1,   bank: "B", pledged: true  },
    { id: "A-04", name: "KKR Asia PE Fund III", type: "私募股權",region: "亞太", value: 12500000, pct: 14.7, change: 5.4,   bank: "B", pledged: false },
    { id: "A-05", name: "Singapore REITs",      type: "不動產",  region: "亞太", value: 6800000,  pct: 8.0,  change: 3.2,   bank: "C", pledged: true  },
    { id: "A-06", name: "AI Semiconductor Fund",type: "私募股權",region: "北美", value: 10500000, pct: 12.4, change: 22.5,  bank: "C", pledged: false },
    { id: "A-07", name: "歐洲基礎建設債",        type: "債券",    region: "歐洲", value: 9200000,  pct: 10.8, change: 1.8,   bank: "D", pledged: false },
    { id: "A-08", name: "US Treasury 10Y",      type: "債券",    region: "北美", value: 7800000,  pct: 9.2,  change: -0.8,  bank: "D", pledged: false },
    { id: "A-09", name: "Global Infra Fund",    type: "私募股權",region: "全球", value: 8000000,  pct: 9.4,  change: 4.2,   bank: "A", pledged: true  }
  ],

  /* ─── Holdings — Portfolio B (境內) ─────────────────── */
  holdingsB: [
    { id: "B-01", name: "TW-A 科技股",    type: "股票", region: "台灣", value: 6200000,  pct: 21.7, change: 15.2 },
    { id: "B-02", name: "TW-B 金融股",    type: "股票", region: "台灣", value: 5800000,  pct: 20.3, change: 8.6  },
    { id: "B-03", name: "TW-ETF-01 大盤ETF",type:"ETF", region: "台灣", value: 8100000,  pct: 28.4, change: 6.4  },
    { id: "B-04", name: "TW-C 半導體",    type: "股票", region: "台灣", value: 4800000,  pct: 16.8, change: 24.1 },
    { id: "B-05", name: "TW-D 傳產股",    type: "股票", region: "台灣", value: 3660000,  pct: 12.8, change: -2.3 }
  ],

  /* ─── Holdings — Portfolio C (境內融資後資金) ────────── */
  holdingsC: [
    { id: "C-01", name: "TW-E 新創投資",  type: "私募股權", region: "台灣", value: 4500000,  pct: 30.0, change: 18.5 },
    { id: "C-02", name: "TW-F 生技醫療",  type: "股票",     region: "台灣", value: 3200000,  pct: 21.3, change: 12.7 },
    { id: "C-03", name: "TW-G 半導體設備",type: "股票",     region: "台灣", value: 2800000,  pct: 18.7, change: 28.4 },
    { id: "C-04", name: "TW-ETF-02 科技ETF",type:"ETF",     region: "台灣", value: 2600000,  pct: 17.3, change: 9.6  },
    { id: "C-05", name: "TW-H 基礎建設",  type: "私募股權", region: "台灣", value: 1900000,  pct: 12.7, change: 5.2  }
  ],

  /* ─── Taiwan Stocks (simulator) ─────────────────────── */
  taiwanStocks: [
    { code: "TW-A", name: "TW-A 科技",       sector: "科技",   price: 842,  change: 2.35,  pe: 18.2, mktCap: "2,240億" },
    { code: "TW-B", name: "TW-B 金融",       sector: "金融",   price: 235,  change: -0.85, pe: 12.4, mktCap: "890億"   },
    { code: "TW-C", name: "TW-C 半導體",     sector: "半導體", price: 1280, change: 3.60,  pe: 22.1, mktCap: "3,410億" },
    { code: "TW-D", name: "TW-D 傳產",       sector: "傳產",   price: 156,  change: -1.28, pe: 9.8,  mktCap: "480億"   },
    { code: "TW-E", name: "TW-E 新創",       sector: "新創",   price: 320,  change: 4.12,  pe: 35.6, mktCap: "620億"   },
    { code: "TW-F", name: "TW-F 生技",       sector: "生技",   price: 415,  change: 1.92,  pe: 28.4, mktCap: "1,120億" },
    { code: "TW-G", name: "TW-G 設備",       sector: "半導體", price: 680,  change: 5.23,  pe: 19.7, mktCap: "1,840億" },
    { code: "TW-H", name: "TW-H 基建",       sector: "建設",   price: 188,  change: 0.53,  pe: 14.2, mktCap: "560億"   },
    { code: "TW-ETF-01", name: "TW-ETF-01 大盤", sector: "ETF",price: 198,  change: 0.81,  pe: null, mktCap: "4,200億" },
    { code: "TW-ETF-02", name: "TW-ETF-02 科技", sector: "ETF",price: 145,  change: 1.46,  pe: null, mktCap: "1,980億" }
  ],

  /* ─── Tax & Compliance ───────────────────────────────── */
  taxCompliance: [
    { item: "CFC 受控外國公司監控",  status: "正常",  icon: "check",   detail: "BVI/開曼持股 ≥ 50%，已納入申報" },
    { item: "CRS 金融帳戶資訊交換",  status: "正常",  icon: "check",   detail: "已向財政部確認交換國名單" },
    { item: "稅務申報（個人綜所稅）", status: "已完成",icon: "check",   detail: "2024年度申報完成，退稅申請中" },
    { item: "境外公司持股名單更新",   status: "正常",  icon: "check",   detail: "BVI × 3、開曼 × 1，無變動" },
    { item: "地方資產管理專區備案",   status: "進行中",icon: "clock",   detail: "試辦申請文件審查中，預計 Q3 完成" },
    { item: "倫巴德貸款 LTV 監控",    status: "警示",  icon: "warning", detail: "A銀行 LTV 53.6%，接近警戒線 60%" }
  ],

  /* ─── Tax Comparison (3 portfolios) ─────────────────── */
  taxComparison: [
    {
      item: "所得稅稅基",
      portA: "境外所得（CFC或最低稅負）",
      portB: "國內所得（綜合所得稅）",
      portC: "國內所得（借款利息可扣除）"
    },
    {
      item: "資本利得稅",
      portA: "暫停課稅（上市股票）",
      portB: "暫停課稅（國內上市）",
      portC: "暫停課稅（國內上市）"
    },
    {
      item: "股利所得",
      portA: "最低稅負 20%（CFC彙算）",
      portB: "28%分離課稅或合併計稅",
      portC: "28%分離課稅或合併計稅"
    },
    {
      item: "OBU利息收入",
      portA: "免稅（OBU境外帳戶）",
      portB: "N/A",
      portC: "DBU利息支出可列舉扣除"
    },
    {
      item: "倫巴德利息費用",
      portA: "N/A",
      portB: "N/A",
      portC: "可作為投資費用抵減所得"
    },
    {
      item: "遺產贈與稅",
      portA: "信託架構可規劃隔離",
      portB: "適用國內遺贈稅（20%）",
      portC: "適用國內遺贈稅（20%）"
    },
    {
      item: "財管2.0優惠",
      portA: "OBU跨境資金不課稅",
      portB: "回台資金享優惠稅率",
      portC: "地方資產管理專區試辦減免"
    }
  ],

  /* ─── CFC Entities ───────────────────────────────────── */
  cfcEntities: [
    { name: "陳家族 BVI Holdings Ltd.",  jurisdiction: "BVI",       revenue: 3200000, taxRate: "0%",  status: "申報中",  holding: 100 },
    { name: "Alpha Capital Cayman Ltd.", jurisdiction: "開曼群島",  revenue: 1800000, taxRate: "0%",  status: "已申報",  holding: 85  },
    { name: "Beta Asset Singapore Pte.", jurisdiction: "新加坡",    revenue: 920000,  taxRate: "17%", status: "已申報",  holding: 60  },
    { name: "Gamma Invest HK Ltd.",      jurisdiction: "香港",      revenue: 450000,  taxRate: "16.5%",status:"已申報", holding: 70  }
  ],

  /* ─── Family Members ─────────────────────────────────── */
  familyMembers: [
    { name: "陳○○ (一代)",  role: "委託人 / Settlor",  entity: "BVI Family Trust",  level: 0 },
    { name: "陳○○ (配偶)",  role: "受益人",            entity: "BVI Family Trust",  level: 1 },
    { name: "陳○○ (長子)",  role: "受益人 / 接班人",    entity: "台灣閉鎖投控",       level: 1 },
    { name: "陳○○ (長女)",  role: "受益人",            entity: "BVI Family Trust",  level: 1 }
  ],

  /* ─── EAM Structure ──────────────────────────────────── */
  eamStructure: [
    { layer: "Family Office（治理層）",                   desc: "家族憲章・傳承決策・治理委員會・委託模式設定" },
    { layer: "External CIO / EAM（投資與資本配置層）",    desc: "三類投組管理・跨行協調・CFC/CRS合規・LTV監控" },
    { layer: "OBU / DBU / Trust / 投控平台（執行層）",   desc: "跨境資金調度・倫巴德授信・境內台灣產業投資" }
  ],

  /* ─── IPS / Investment Policy ────────────────────────── */
  ips: {
    riskTolerance: "中高風險 (Growth)",
    maxEquityPct:  65,
    maxSinglePct:  15,
    maxLeverage:   35,
    benchmarkPortA:"MSCI World",
    benchmarkPortB:"加權指數",
    benchmarkPortC:"加權指數 + 150bps",
    rebalancePeriod:"季度",
    autoReportDay: 5   // day of month for auto-report
  },

  /* ─── Reports ────────────────────────────────────────── */
  reports: [
    { id: "R01", name: "2024 Q2 境外投組A 季報",        type: "季報", portfolio: "A", date: "2024-07-10", status: "available" },
    { id: "R02", name: "2024 Q2 境內投組B 季報",        type: "季報", portfolio: "B", date: "2024-07-10", status: "available" },
    { id: "R03", name: "2024 Q2 融資後資金C 季報",      type: "季報", portfolio: "C", date: "2024-07-10", status: "available" },
    { id: "R04", name: "2024 Q1 投資組合合併報告",      type: "合併", portfolio: "",  date: "2024-04-15", status: "available" },
    { id: "R05", name: "2024 年度 CFC 稅務報告",        type: "稅務", portfolio: "",  date: "2024-05-31", status: "available" },
    { id: "R06", name: "2024 家族治理年度檢核",         type: "治理", portfolio: "",  date: "2024-12-01", status: "pending"   },
    { id: "R07", name: "2024-05 全委模式月報 (自動)",   type: "月報", portfolio: "",  date: "2024-06-05", status: "available" },
    { id: "R08", name: "倫巴德貸款 LTV 風控報告 Q2",   type: "風控", portfolio: "",  date: "2024-07-01", status: "available" }
  ],

  /* ─── Documents ──────────────────────────────────────── */
  documents: [
    { id: "D01", folder: "合規文件",    name: "CFC申報書_2024.pdf",           type: "PDF",  size: "2.4 MB", date: "2024-05-31" },
    { id: "D02", folder: "合規文件",    name: "CRS自動交換確認函.pdf",          type: "PDF",  size: "0.8 MB", date: "2024-03-15" },
    { id: "D03", folder: "合規文件",    name: "地方資產管理專區申請書.docx",    type: "Word", size: "1.2 MB", date: "2024-06-20" },
    { id: "D04", folder: "倫巴德文件",  name: "A銀行_質押授信合約.pdf",        type: "PDF",  size: "3.1 MB", date: "2024-02-10" },
    { id: "D05", folder: "倫巴德文件",  name: "B銀行_有價證券質借合約.pdf",    type: "PDF",  size: "2.8 MB", date: "2024-02-10" },
    { id: "D06", folder: "倫巴德文件",  name: "C銀行_綜合授信合約.pdf",        type: "PDF",  size: "2.5 MB", date: "2024-03-01" },
    { id: "D07", folder: "投資政策",    name: "IPS投資政策聲明書_v3.pdf",       type: "PDF",  size: "1.8 MB", date: "2024-01-15" },
    { id: "D08", folder: "投資政策",    name: "家族憲章_2024版.pdf",            type: "PDF",  size: "4.2 MB", date: "2024-01-01" },
    { id: "D09", folder: "報告存檔",    name: "2024Q1_合併報告.pdf",            type: "PDF",  size: "5.6 MB", date: "2024-04-15" },
    { id: "D10", folder: "報告存檔",    name: "2024Q2_境外投組A報告.pdf",       type: "PDF",  size: "4.3 MB", date: "2024-07-10" }
  ],

  /* ─── Messages ───────────────────────────────────────── */
  messages: [
    { id: "M01", title: "⚠️ LTV 警示：A銀行倫巴德",      content: "A銀行 OBU 質押 LTV 已達 53.6%，接近警戒線 60%，請確認資產估值。", date: "2024-07-12", type: "alert",   read: false },
    { id: "M02", title: "CFC申報期限提醒",                 content: "受控外國公司申報截止日：2024-05-31，請確認BVI文件齊備。",           date: "2024-05-15", type: "warning", read: false },
    { id: "M03", title: "投資組合月報已出爐",               content: "2024年5月月報（全三類投組）已可下載，請至報告中心查閱。",             date: "2024-06-05", type: "info",    read: true  },
    { id: "M04", title: "OBU質押利率調整通知",             content: "A銀行OBU質押授信利率調整至3.1%，B銀行維持3.5%，生效日：2024-04-28。",date: "2024-04-28", type: "info",    read: true  },
    { id: "M05", title: "地方資產管理專區審查進度",         content: "金管會已收受申請文件，審查進度進入第二階段，預計 Q3 核准。",           date: "2024-07-08", type: "info",    read: true  },
    { id: "M06", title: "全委模式月報自動產出",             content: "2024年5月全委月報已自動產出並寄送至家族聯絡信箱。",                   date: "2024-06-05", type: "success", read: true  }
  ],

  /* ─── Family Charter ────────────────────────────────── */
  familyCharter: {
    version: "2024 第三版",
    lastUpdated: "2024-01-01",
    articles: [
      { no: "第一條", title: "家族使命與核心價值",
        content: "陳家族以「世代傳承、穩健增長、回饋社會」為核心使命，秉持誠信、謹慎與長遠眼光，妥善管理並傳承家族資本。" },
      { no: "第二條", title: "治理架構與決策機制",
        content: "家族辦公室設立治理委員會，由委託人及成年受益人組成。重大財務決策（單筆逾 USD 500萬）須經委員會三分之二多數同意。" },
      { no: "第三條", title: "EAM 授權範圍",
        content: "External CIO/EAM 依 IPS 投資政策聲明書授權管理境外投組 A。境內投組 B 及融資後資金 C 需家族委員會事前核准方可調整。" },
      { no: "第四條", title: "傳承與繼承原則",
        content: "家族財富優先透過 BVI Family Trust 架構傳承，確保資產整體性。長子擔任台灣閉鎖投控接班人，接受系統性財商教育後方可行使治理職權。" },
      { no: "第五條", title: "爭議解決機制",
        content: "家族成員間之財務爭議，應先經家族調解委員會調解。調解不成，依信託契約約定交由獨立仲裁機構處理，不得逕行訴訟。" },
      { no: "第六條", title: "憲章修訂程序",
        content: "本憲章每三年定期檢視，修訂須經全體委託人及成年受益人四分之三同意，並由專業律師見證後生效。" }
    ]
  },

  /* ─── Succession Plan ───────────────────────────────── */
  successionPlan: {
    generation: "二代交棒規劃",
    targetYear: 2030,
    phases: [
      { year: "2024–2025", title: "接班教育期",   icon: "fa-graduation-cap", color: "#2E6DB4",
        tasks: ["財商教育課程（金融、法律、稅務）", "EAM 業務觀摩與參與", "信託架構與文件熟悉"] },
      { year: "2026–2027", title: "聯合治理期",   icon: "fa-handshake",      color: "#4CA3DD",
        tasks: ["長子加入治理委員會", "境內投組 B 操作主導", "與 EAM 共同決策部分投資"] },
      { year: "2028–2029", title: "過渡授權期",   icon: "fa-key",            color: "#B8960C",
        tasks: ["台灣閉鎖投控正式接班", "境內投組 B + C 全權負責", "一代保留顧問角色"] },
      { year: "2030+",     title: "完整傳承",     icon: "fa-crown",          color: "#28A745",
        tasks: ["家族財富完整移交", "信託受益人正式啟動分配", "家族第三代教育基金啟用"] }
    ],
    educationFund: { target: 5000000, current: 1200000, purpose: "子女海外就學、接班培訓" },
    assets: [
      { item: "BVI Family Trust",    toWhom: "陳○○配偶 + 長女",  pct: 60, method: "信託直接分配" },
      { item: "台灣閉鎖投控",         toWhom: "長子（接班人）",    pct: 100, method: "股權繼承" },
      { item: "境外投組 A",           toWhom: "EAM 繼續管理",      pct: 100, method: "信託資產延續" },
      { item: "境內投組 B+C",          toWhom: "長子主導",          pct: 100, method: "授權移交" }
    ]
  },

  /* ─── Responsibility Structure ──────────────────────── */
  responsibilityChart: [
    { role: "委託人 / Settlor",     person: "陳○○（一代）",   level: 0, duties: ["家族願景設定", "重大決策最終核准", "EAM委任授權"], color: "#0D2746" },
    { role: "治理委員會",            person: "家族成員全體",    level: 1, duties: ["IPS審核", "年度績效審查", "憲章修訂", "半委模式投票"], color: "#2E6DB4" },
    { role: "External CIO / EAM",  person: "EAM 團隊",       level: 1, duties: ["投資決策執行", "跨行融資協調", "CFC/CRS合規", "月報產出"], color: "#2E6DB4" },
    { role: "接班人（長子）",        person: "陳○○（長子）",   level: 2, duties: ["境內投組B/C管理", "投控股東代表", "接班教育執行"], color: "#4CA3DD" },
    { role: "法律顧問",              person: "外部律師事務所",  level: 2, duties: ["信託文件維護", "爭議調解", "憲章見證"], color: "#6B7280" },
    { role: "稅務顧問",              person: "外部會計師事務所",level: 2, duties: ["CFC申報協助", "稅務規劃", "申報期限管理"], color: "#6B7280" }
  ],

  /* ─── Voting Items (semi-discretionary) ─────────────── */
  votingItems: [
    {
      id: "V01", title: "TW-生技 Pre-IPO 投資案",
      amount: "USD 3,000,000", portfolio: "C", deadline: "2024-07-31",
      desc: "EAM 提議投資境內生技公司 Pre-IPO 輪，符合融資後資金境內限制，預期 IRR 18%。",
      votes: [
        { member: "陳○○（一代）",  role: "委託人",   vote: "approve", time: "2024-07-10" },
        { member: "陳○○（配偶）",  role: "受益人",   vote: "pending", time: null },
        { member: "陳○○（長子）",  role: "受益人",   vote: "approve", time: "2024-07-11" },
        { member: "陳○○（長女）",  role: "受益人",   vote: "reject",  time: "2024-07-12" }
      ]
    },
    {
      id: "V02", title: "IPS 股票上限調整（65%→70%）",
      amount: "N/A", portfolio: "A", deadline: "2024-08-15",
      desc: "EAM 建議因市場趨勢調整 IPS 股票上限，需家族委員會核准。",
      votes: [
        { member: "陳○○（一代）",  role: "委託人",   vote: "pending", time: null },
        { member: "陳○○（配偶）",  role: "受益人",   vote: "pending", time: null },
        { member: "陳○○（長子）",  role: "受益人",   vote: "approve", time: "2024-07-15" },
        { member: "陳○○（長女）",  role: "受益人",   vote: "pending", time: null }
      ]
    }
  ],

  /* ─── Risk Metrics ───────────────────────────────────── */
  riskMetrics: {
    overall: { score: 68, level: "中高風險", color: "#B8960C" },
    portA: {
      volatility: 12.4, sharpe: 1.82, maxDrawdown: -8.3,
      var95: -2.1, beta: 0.92, alpha: 6.47,
      concentration: [ // top holdings concentration
        { name: "KKR Asia PE", pct: 14.7 },
        { name: "AI Semi Fund", pct: 12.4 },
        { name: "BlackRock ETF", pct: 14.1 }
      ]
    },
    portB: {
      volatility: 18.6, sharpe: 1.24, maxDrawdown: -12.1,
      var95: -3.4, beta: 1.08, alpha: 2.65,
      concentration: [
        { name: "TW-ETF-01", pct: 28.4 },
        { name: "TW-A 科技", pct: 21.7 }
      ]
    },
    portC: {
      volatility: 22.1, sharpe: 0.89, maxDrawdown: -15.4,
      var95: -4.8, beta: 1.24, alpha: 0.95,
      concentration: [
        { name: "TW-E 新創", pct: 30.0 },
        { name: "TW-F 生技", pct: 21.3 }
      ]
    },
    alerts: [
      { level: "high",   msg: "A銀行 LTV 53.6%，距警戒線 60% 僅 6.4%",         page: "credit.html" },
      { level: "medium", msg: "投組C波動率 22.1% 超過 IPS 建議上限 20%",         page: "portfolio.html" },
      { level: "medium", msg: "CFC 申報截止日 2024-05-31，文件確認中",            page: "tax.html" },
      { level: "low",    msg: "境內台灣產業投資部署進度 75%，距目標 USD 5M 缺口", page: "domestic.html" }
    ]
  },

  /* ─── Tax Simulator ──────────────────────────────────── */
  taxSimulator: {
    brackets2024: [
      { min: 0,        max: 560000,   rate: 0.05 },
      { min: 560000,   max: 1260000,  rate: 0.12 },
      { min: 1260000,  max: 2520000,  rate: 0.20 },
      { min: 2520000,  max: 4720000,  rate: 0.30 },
      { min: 4720000,  max: Infinity, rate: 0.40 }
    ],
    cfcExemption: 1000000,   // NTD 100萬免稅額
    minTaxRate: 0.20,
    dividendSeparate: 0.28
  },

  /* ─── CFC Filing Calendar ────────────────────────────── */
  cfcCalendar: [
    { event: "CFC 盈餘計算截止",       date: "2024-12-31", status: "upcoming", entity: "全部CFC實體" },
    { event: "CFC 申報書提交",         date: "2025-05-31", status: "upcoming", entity: "全部CFC實體" },
    { event: "CRS 資料收集截止",        date: "2024-12-31", status: "upcoming", entity: "各金融機構" },
    { event: "CRS 向財政部申報",        date: "2025-03-31", status: "upcoming", entity: "財政部" },
    { event: "個人綜所稅申報",          date: "2025-05-31", status: "upcoming", entity: "陳○○（一代）" },
    { event: "BVI 年費暨董事更新",      date: "2024-12-01", status: "done",     entity: "BVI Holdings" },
    { event: "開曼年費繳納",            date: "2024-01-31", status: "done",     entity: "Alpha Capital" }
  ],

  /* ─── Industry Opportunities ────────────────────────── */
  industryOpportunities: [
    { name: "台灣 AI 晶片供應鏈", sector: "半導體", stage: "高度關注",
      irr: "18–25%", horizon: "3–5年", risk: "中",
      thesis: "AI 算力需求爆發帶動 CoWoS 封裝、HBM 記憶體等供應鏈投資機會", color: "#0D2746" },
    { name: "生技 CDMO 服務平台", sector: "生技醫療", stage: "盡職調查",
      irr: "15–20%", horizon: "4–6年", risk: "中高",
      thesis: "全球製藥委外趨勢加速，台灣 CDMO 具低成本與研發優勢", color: "#2E6DB4" },
    { name: "綠能儲能系統整合", sector: "新能源/ESG", stage: "觀察中",
      irr: "12–16%", horizon: "5–7年", risk: "中",
      thesis: "台灣 2050 淨零目標帶動儲能需求，搭配政府補貼降低投資風險", color: "#28A745" },
    { name: "智慧醫療 SaaS 平台", sector: "數位健康", stage: "初步接觸",
      irr: "20–30%", horizon: "3–4年", risk: "高",
      thesis: "高齡化加速醫療數位化，Pre-IPO 輪切入估值合理", color: "#B8960C" }
  ],

  /* ─── Portfolio Attribution ─────────────────────────── */
  attribution: {
    portA: [
      { factor: "市場 Beta",   contribution: 3.20 },
      { factor: "產業選股",    contribution: 2.85 },
      { factor: "個股選擇",    contribution: 1.92 },
      { factor: "時機掌握",    contribution: 0.65 },
      { factor: "匯率影響",    contribution: -0.55 },
      { factor: "費用成本",    contribution: -0.45 }
    ],
    portB: [
      { factor: "市場 Beta",   contribution: 2.10 },
      { factor: "產業選股",    contribution: 1.35 },
      { factor: "個股選擇",    contribution: 0.92 },
      { factor: "時機掌握",    contribution: 0.33 }
    ],
    portC: [
      { factor: "市場 Beta",   contribution: 1.50 },
      { factor: "產業選股",    contribution: 1.20 },
      { factor: "倫巴德利息",  contribution: -0.60 }
    ]
  },

  /* ─── Ticker Data ────────────────────────────────────── */
  ticker: [
    { name: "TW-A",     price: 842,    change: 2.35  },
    { name: "TW-C",     price: 1280,   change: 3.60  },
    { name: "TW-ETF-01",price: 198,    change: 0.81  },
    { name: "AAPL",     price: 187.52, change: 1.24  },
    { name: "TSMC ADR", price: 148.30, change: 1.85  },
    { name: "S&P 500",  price: 5248,   change: 0.43  },
    { name: "Nasdaq",   price: 16742,  change: 0.67  },
    { name: "USD/TWD",  price: 31.82,  change: -0.12 },
    { name: "黃金",      price: 2342,   change: 0.28  },
    { name: "布倫特油",  price: 82.4,   change: -0.55 },
    { name: "VIX",      price: 13.2,   change: -3.65 }
  ],

  /* ─── Domestic Taiwan Investment Page ───────────────── */
  domestic: {
    totalDeployed: 15000000,
    targetDeployed: 20000000,
    ytdReturn: 3.1,
    sectors: [
      { name: "半導體/IC設計",  pct: 38, value: 5700000,  color: "#0D2746" },
      { name: "生技醫療",        pct: 24, value: 3600000,  color: "#2E6DB4" },
      { name: "新能源/ESG",      pct: 18, value: 2700000,  color: "#4CA3DD" },
      { name: "智慧製造/AI",     pct: 12, value: 1800000,  color: "#7EC8E3" },
      { name: "基礎建設/REITs",  pct: 8,  value: 1200000,  color: "#BFE4F0" }
    ],
    pipeline: [
      { name: "TW-新創 A 輪",   type: "私募股權", stage: "盡職調查", amount: 2000000, status: "in-progress" },
      { name: "TW-生技 Pre-IPO",type: "私募股權", stage: "條款協商",  amount: 3000000, status: "in-progress" },
      { name: "TW-ESG REITs",   type: "不動產",   stage: "評估中",    amount: 1500000, status: "review"      }
    ]
  },

  /* ─── Five Service Phases (from PDF) ────────────────── */
  servicePhases: [
    {
      phase: "Phase 1",
      title: "資產盤點與架構診斷",
      done: true,
      desc: "全球資產彙整、BVI/信託架構審查、CFC/CRS風險評估"
    },
    {
      phase: "Phase 2",
      title: "EAM委任授權與IPS制定",
      done: true,
      desc: "投資政策聲明書、風險承受度、授權範圍、三類投組定義"
    },
    {
      phase: "Phase 3",
      title: "倫巴德融資與資本優化",
      done: true,
      desc: "OBU質押授信安排、LTV監控機制、融資後資金境內限制"
    },
    {
      phase: "Phase 4",
      title: "境內台灣產業投資部署",
      done: false,
      active: true,
      desc: "融資後資金投入台灣產業、地方資產管理專區試辦申請"
    },
    {
      phase: "Phase 5",
      title: "傳承規劃與治理升級",
      done: false,
      desc: "家族憲章更新、接班規劃、信託架構優化、全委模式切換"
    }
  ]

};
