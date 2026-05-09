'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 現在のURLパラメータを保持しつつ、pageだけ変更したURLを生成
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // 数値として確実に扱う
  const current = Number(currentPage);
  const total = Number(totalPages);

  // 表示するページ番号の配列を生成するロジック (例: [1, 2, '...', 9, 10])
  const generatePagination = () => {
    // 5ページ以下の場合は全て表示
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // 現在のページ位置に基づいて表示範囲を決定
    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);

    // 左側に余裕がある（現在のページが後半）場合、範囲を調整して常に5つ表示
    if (current <= 3) {
      start = 1;
      end = 5;
    } else if (current >= total - 2) {
      start = total - 4;
      end = total;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const allPages = generatePagination();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* 「前へ」ボタン */}
      <Link
        href={createPageURL(currentPage - 1)}
        className="text-sm font-medium  hover:text-slate-500"
      >
        <FaCaretLeft />
      </Link>

      {/* ページ番号ボタン */}
      <div className="flex gap-1">
        {allPages.map((page, index) => {
          // // 省略記号(...)の場合
          // if (page === '...') {
          //   return (
          //     <span key={`ellipsis-${index}`} className="text-slate-500">
          //       ...
          //     </span>
          //   );
          // }

          // その他のページ番号（クリック可能なリンク）
          return (
            <Link
              key={page}
              href={createPageURL(page)}
              className="text-sm font-medium text-slate-700 border border-transparent rounded-md hover:bg-slate-100 transition-colors"
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* 「次へ」ボタン */}
      <Link
          href={createPageURL(currentPage + 1)}
          className="text-sm font-medium  hover:text-slate-500 transition-colors"
        >
          <FaCaretRight />
        </Link>
    </div>
  );
};