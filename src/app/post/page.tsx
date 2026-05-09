'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruitmentSchema, RecruitmentFormData, JOB_CATEGORIES, JOB_CATEGORY_LABELS} from "@/lib/recruitment";
import { submitRecruitment } from "@/lib/actions";
import { FaCaretDown } from "react-icons/fa";

export default function Post() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RecruitmentFormData>({
    resolver: zodResolver(recruitmentSchema),
  });

  const onSubmit = async (data: RecruitmentFormData) => {
    // Server Actionを実行
    const result = await submitRecruitment(data);

    // サーバー側でエラーが返却された場合のハンドリング
    if (result && !result.success) {
      // サーバー側でバリデーションエラーが発生した場合（通常はクライアント側で弾かれますが、念のため）
      if (result.errors) {
        if (result.errors.title) setError("title", { message: result.errors.title[0] });
        if (result.errors.salary) setError("salary", { message: result.errors.salary[0] });
        if (result.errors.category) setError("category", { message: result.errors.category[0] });
      } else {
        // DB保存エラーなどの全体エラー
        alert(result.message); // 実稼働時はtoastライブラリ(react-hot-toast等)がおすすめです
      }
    }
  };

  return (
    <main className="mx-10">
    <h2 className="text-xl font-bold py-4">求人投稿</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-medium">求人カテゴリ選択</label>
        <select {...register("category")} className="border p-2 w-60 rounded appearance-none text-sm bg-none">
          <option value="">
            カテゴリを選択▼
          </option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {JOB_CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">年収 (万円)</label>
        <input
          type="number"
          {...register("salary", { valueAsNumber: true })}
          className="border p-2 w-60 rounded"
        />
        {errors.salary && (
          <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">求人タイトル</label>
        <input
          {...register("title")}
          className="border p-2 w-full rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-sky-600 text-white px-4 py-2 mt-4 rounded hover:bg-sky-700 disabled:opacity-50 w-60 text-sm font-medium transition-colors"
      >
        {isSubmitting ? "送信中..." : "投稿"}
      </button>
    </form>
    </main>
  );
}