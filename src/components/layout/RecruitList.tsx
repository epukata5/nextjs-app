import { RecruitCard } from "../ui/RecruitCard";
import { supabase } from "@/lib/supabase";
import { Pagination } from "../ui/Pagination";

const ITEMS_PER_PAGE = 10;

// 1. 'use client' を削除し、asyncコンポーネントにする
export const RecruitList = async ({ 
  searchParams = {}
}: { 
  searchParams: { category?: string | string[], page?: string, min_salary?: string } 
}) => {

  // 2. パラメータの取得（Next.jsのページコンポーネントから渡される想定）
  const categoryParam = searchParams.category;
  const categories = categoryParam 
    ? (Array.isArray(categoryParam) ? categoryParam : [categoryParam])
    : [];
  const currentPage = Number(searchParams.page) || 1;
  const minSalary = Number(searchParams.min_salary) || 0;

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // count: 'exact' を追加して総件数も取得できるように
  let query = supabase
    .from("recruitments")
    .select("*", { count: "exact" });

  if (categories.length > 0) {
    query = query.in('category', categories);
  }

  if (minSalary > 0) {
    query = query.gte('salary', minSalary);
  }

  const { data: recruits, count, error } = await query
    .range(from, to);

  if (error) {
    console.error("Error fetching recruits:", error.message);
    return <div className="text-red-500">求人データの取得に失敗しました</div>;
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 1;

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold ">求人一覧</h2>
      {/* 4. Supabaseの 'count' から取得した総件数を表示 */}
      <p className="mb-4 text-sm">該当件数: {count ?? 0}件</p>
      
      <div className="space-y-4">
        {recruits && recruits.length > 0 ? (
          recruits.map((recruit) => (
            <RecruitCard
              key={recruit.id}
              title={recruit.title}
              category={recruit.category}
              salary={recruit.salary}
            />
          ))
        ) : (
          <p className="text-slate-500">該当する求人はありませんでした。</p>
        )}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}