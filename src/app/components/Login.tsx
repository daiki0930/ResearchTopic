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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const loginUser: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(loginUser.user);
      console.log('--------届いているか-------',loginUser.user)

      toast.success("ログインに成功しました。", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
      // const token = await loginUser.user.getIdToken();

      // await fetch('api/auth/sessionLogin', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ token })
      // });
      // await auth.signOut();
      // setCookie(null, 'token', token, { maxAge: oneHourInSeconds, path: '/Research/MyPage'});

      console.log('--------届いているか1-------',loginUser.user)
      router.push("/Main");
    } catch (error) {
      setUser(null);
      toast.error("ログインに失敗しました。", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  };

  return (
    <div className="flex justify-center items-center h-[900px] bg-gradient-to-b from-[#47d5e2] to-[#c1f8ea]">
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
