"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Authentication/Login/firebase/firebase";
import { auth } from "../Authentication/Login/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { showToast } from "@/utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // !をつけてfalseの時にエラーを起こす
    if (!email) {
      showToast("error", "メールアドレスを設定してください。");
      return;
    }
    if (!validateEmail(email)) {
      showToast("error", "有効なメールアドレスを設定してください。");
      return;
    }
    if (!password) {
      showToast("error", "パスワードを設定してください。");
      return;
    }
    if (!validatePassword(password)) {
      showToast(
        "error",
        "パスワードは最低8文字以上で、大文字、小文字、数字、記号を含む必要があります。"
      );
      return;
    }

    try {
      const registerUser: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(registerUser.user);
      showToast("success", "会員登録に成功しました。");

      router.push("/Main");
    } catch (error) {
      showToast("error", "会員登録に失敗しました。");
    }
  };

  return (
    <div className="flex justify-center items-center h-[900px] bg-gradient-to-b from-[#47d5e2] to-[#c1f8ea]">
      <div className="bg-white p-5 rounded-lg shadow-md max-w-xl w-full text-center">
        <h1>新規登録</h1>
        <input
          type="email"
          id="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleRegister}
          type="submit"
          className="bg-teal-500 hover:bg-[#b31d40] active:bg-[#ba832b] text-white w-1/2 p-2 rounded-md cursor-pointer mb-2"
        >
          新規登録
        </button>
      </div>
    </div>
  );
}