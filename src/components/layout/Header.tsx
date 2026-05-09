import Link from "next/link";

export  const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-sky-950 text-white">
      <Link href="/" className="pl-2 text-xl font-bold">
        求人検索アプリ
      </Link>
      <div className="flex gap-4">
        <Link href="/" className="text-sm">求人検索 </Link>
        <Link href="/post" className="text-sm">求人投稿 </Link>
      </div>
    </header>
  );
}