"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Authentication/Login/firebase/firebase";
import { auth } from "../Authentication/Login/firebase/firebase";
import {
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { showToast } from "@/utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) {
      showToast("error", "メールアドレスを入力してください。");
      return;
    }
    if (!validateEmail(email)) {
      showToast("error", "有効なメールアドレスを入力してください。");
      return;
    }
    if (!password) {
      showToast("error", "パスワードを入力してください。");
      return;
    }
    if (!validatePassword(password)) {
      showToast("error", "パスワードは8文字以上で入力してください。");
      return;
    }

    try {
      const loginUser: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(loginUser.user);
      console.log("----------ログイン成功--------", loginUser);

      // idトークンを基にセッション管理
      const idToken = await loginUser.user.getIdToken();
      console.log("----これはidトークン------", idToken);

      const response = await fetch("../api/sessionLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
      console.log("-------セッションのAPI1------");
      const data = await response.json();

      showToast("success", "ログインに成功しました。");
      router.push("/Main");
    } catch (error) {
      showToast("error", "ログインに失敗しました。");
    }
  };

  return (
    <div className="flex justify-center items-center h-[900px] bg-gradient-to-b from-[#47d5e2] to-[#c1f8ea]">
      <div className="bg-white p-5 rounded-lg shadow-md max-w-xl w-full text-center">
        <h1>ログイン</h1>
        <input
          type="email"
          id="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-96 p-2 mt-1 mb-7 border-b-2 border-[#2e9287] focus:outline-none focus:border-teal-500"
        />
        <div className="relative mb-7">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 p-2 mt-1 border-b-2 border-[#2e9287] focus:outline-none focus:border-teal-500 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-20 transform -translate-y-1/2 text-teal-500"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </button>
        </div>
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