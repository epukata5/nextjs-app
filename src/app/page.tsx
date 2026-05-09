import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";
import { RecruitList } from "@/components/layout/RecruitList";

export default async function Home({searchParams,
}: {
  // Next.js 15 の型定義
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  // URLパラメータを非同期で取得
  const params = await searchParams; 
  return (
    <main className="flex">
      <div className="w-50 bg-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1">
        <RecruitList searchParams={params} />
      </div>
    </main>
  );
}
