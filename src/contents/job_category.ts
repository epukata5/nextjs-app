// 定数として定義（as const をつけることでリテラル型として扱える）
export const JOB_CATEGORIES = {
  clerical: "事務",
  engineer: "エンジニア",
  sales: "営業",
  design: "デザイン",
  marketing: "マーケティング",
  finance: "財務・経理",
  hr: "人事",
  customer_support: "カスタマーサポート",
  manufacturing: "製造",
  medical_care: "医療・介護",
} as const;

// キー（英語）の型を抽出 ("clerical" | "engineer" | ...)
export type JobCategoryKey = keyof typeof JOB_CATEGORIES;

export const getJobCategoryName = (key: JobCategoryKey): string => {
  return JOB_CATEGORIES[key];
};

// 配列形式で取得するヘルパー（サイドバーのループ表示などで便利）
export const JOB_CATEGORY_OPTIONS = Object.entries(JOB_CATEGORIES).map(
  ([key, label]) => ({
    key: key as JobCategoryKey,
    label,
  })
);