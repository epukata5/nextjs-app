import { z } from "zod";
import { Database } from "@/types/database.types";

type JobCategory = Database['public']['Enums']['job_category'];

export const JOB_CATEGORIES: [JobCategory, ...JobCategory[]] = [
  "clerical",
  "engineer",
  "sales",
  "design",
  "marketing",
  "finance",
  "hr",
  "customer_support",
  "manufacturing",
  "medical_care",
];

export const JOB_CATEGORY_LABELS: Record<JobCategory, string> = {
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

export const recruitmentSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  category: z.enum(JOB_CATEGORIES).describe("カテゴリーは必須です"),
  salary: z.number({
    message: "給与を正しい数値で入力してください", 
  }).min(1, "1以上の金額を入力してください"),
});

export type RecruitmentFormData = z.infer<typeof recruitmentSchema>;