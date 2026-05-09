import { createClient } from '@supabase/supabase-js';

// 環境変数からURLとPUBLISHABLE Keyを取得（Next.jsの場合は NEXT_PUBLIC_ がプレフィックス）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePUBLISHABLEKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePUBLISHABLEKey) {
  throw new Error('Supabaseの環境変数が設定されていません。');
}

// クライアントを作成してエクスポート
export const supabase = createClient(supabaseUrl, supabasePUBLISHABLEKey);