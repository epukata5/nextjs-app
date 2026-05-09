'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from "./supabase";
import { recruitmentSchema, RecruitmentFormData } from "./recruitment";

// 引数の型をZodから生成した RecruitmentFormData に変更

export const submitRecruitment = async (data: RecruitmentFormData) => {
  // 1. まずデータがサーバーに届いているか確認
  console.log('--- Server Action が呼び出されました ---');
  console.log('受け取ったデータ:', data);

  // 1. Zodによるサーバーサイドバリデーション
  const validatedFields = recruitmentSchema.safeParse(data);

  // 不正なデータが送られてきた場合はエラーオブジェクトを返す
  if (!validatedFields.success) {
    return {
      success: false,
      message: '入力内容に誤りがあります。',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. 検証済みの安全なデータ (validatedFields.data) を展開
  const { category, salary, title } = validatedFields.data;

  try {
    // 2. SupabaseへのInsertを実行
    console.log('SupabaseへInsertを開始します...');
    const { error } = await supabase
      .from("recruitments")
      .insert({ 
        category: category, 
        salary: salary, 
        title: title 
      });

    // 3. エラーがあった場合
    if (error) {
      console.error(' Supabaseエラー詳細:', error);
      return { 
        success: false, 
        message: `保存に失敗しました: ${error.message}` 
      };
    }

    console.log('Insert成功.キャッシュを更新');
    revalidatePath('/');
    
  } catch (err) {
    // 4. 予期せぬシステムエラーの捕捉
    console.error(' 予期せぬエラーが発生しました:', err);
    return { success: false, message: 'システムエラーが発生しました。' };
  }

  redirect('/');
};