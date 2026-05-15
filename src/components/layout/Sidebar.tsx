'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { JOB_CATEGORY_OPTIONS } from "@/contents/job_category";

// 年収の選択肢を定義
const SALARY_OPTIONS = [
  { label: '指定なし ▼', value: '0' },
  { label: '300万円以上 ▼', value: '300' },
  { label: '400万円以上 ▼', value: '400' },
  { label: '500万円以上 ▼', value: '500' },
  { label: '600万円以上 ▼', value: '600' },
  { label: '800万円以上 ▼', value: '800' },
  { label: '1000万円以上 ▼', value: '1000' },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URLから現在のカテゴリを取得（なければ 'all'）
 const currentCategories = searchParams.getAll('category');
  const currentMinSalary = searchParams.get('min_salary') || '0';

  // カテゴリ（チェックボックス）の切り替え処理
  const handleCategoryToggle = (categoryKey: string) => {
    const params = new URLSearchParams(searchParams);
    
    // 一旦、現在のカテゴリパラメータをすべて削除
    params.delete('category');

    // チェック状態を反転させるロジック
    let updatedCategories = [...currentCategories];
    if (updatedCategories.includes(categoryKey)) {
      // 既に選択されていれば外す
      updatedCategories = updatedCategories.filter(c => c !== categoryKey);
    } else {
      // 選択されていなければ追加する
      updatedCategories.push(categoryKey);
    }

    // 更新された配列をもとに、パラメータを付け直す
    updatedCategories.forEach(c => params.append('category', c));

    // ページを1に戻す
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 年収の切り替え処理
  const handleSalaryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === '0') {
      params.delete('min_salary');
    } else {
      params.set('min_salary', value);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <nav className='p-3 bg-gray-200'>
      <h3 className="text-lg font-bold mb-2">求人カテゴリ</h3>
      <ul className='mb-2'>
        {JOB_CATEGORY_OPTIONS.map((option) => (
          <li key={option.key} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              value={option.key} 
              checked={currentCategories.includes(option.key)}
              onChange={() => handleCategoryToggle(option.key)}
              className='accent-sky-400 border-sky-400'
            />
            {option.label}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-bold my-2">年収</h3>
      <select 
        value={currentMinSalary}
        onChange={(e) => handleSalaryChange(e.target.value)}
        className="border p-2 w-full rounded bg-white appearance-none bg-none"
       >
        {SALARY_OPTIONS.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
          >
            {option.label}
          </option>
        ))}
      </select>
    </nav>
  );
}