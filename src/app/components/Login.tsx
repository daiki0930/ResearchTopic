"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Authentication/Login/firebase/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { useShowToast } from "@/hooks/useShowToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  // const [error, setError] = useState('');
  const router = useRouter();
  const auth = getAuth();
  const showToast = useShowToast()

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const loginUser: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(loginUser.user);
      const token = await loginUser.user.getIdToken();

      // await fetch('api/auth/sessionLogin', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ token })
      // });
      // await auth.signOut();
      // setCookie(null, 'token', token, { maxAge: oneHourInSeconds, path: '/Research/MyPage'});

      showToast({
          status: 'success',
          title: 'ログインに成功しました。',
          description: ''
      })
      console.log('------------------')
      router.push("../Main");
    } catch (error) {
      // setError(error);
      setUser(null);
      showToast({
          status: 'error',
          title: 'ログインに失敗しました。',
          description: '入力されたユーザー情報が正しくありません。'
      })
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#47d5e2] to-[#c1f8ea]">
      <div className="bg-white p-5 rounded-lg shadow-md max-w-xl w-full text-center">
        <h1>ログイン</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-96 p-2 mt-1 mb-7 border-b-2 border-[#2e9287] focus:outline-none focus:border-teal-500"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-96 p-2 mt-1 mb-7 border-b-2 border-[#2e9287] focus:outline-none focus:border-teal-500"
        />
        <button
          onClick={handleLogin}
          type="submit"
          className="bg-teal-500 hover:bg-[#b31d40] active:bg-[#ba832b] text-white w-1/2 p-2 rounded-md cursor-pointer mb-2"
        >
          ログイン
        </button>
      </div>
    </div>
  );
}
