'use client';

import { useRouter } from 'next/navigation';

export default function Root() {
  const router = useRouter();

  return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#47d5e2] to-[#c1f8ea] relative">
        <div className="bg-white absolute top-5 w-full text-center ">
          <h1 className="text-4xl font-bold text-red-500 mb-3 mt-4">
            自由研究課題提案アプリです。
          </h1>
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            ここから先をご覧いただくには会員登録をお願いします。
          </h1>
        </div>
          <div className="flex justify-center mt-10">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white w-[300px] h-16 text-2xl rounded-full border-none cursor-pointer mr-4"
                onClick={() => router.push('Authentication/Signup')}
              >新規登録の方はこちら
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white w-[300px] h-16 text-2xl rounded-full border-none cursor-pointer"
                onClick={() => router.push('Authentication/Login')}
              >ログインの方はこちら
              </button>
          </div>
      </div>
  );
};