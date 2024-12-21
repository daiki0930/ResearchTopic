"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Authentication/Login/firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const registerUser: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(registerUser.user);
      toast.success("会員登録に成功しました。", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
      router.push("/Main");
    } catch (error) {
      toast.error("会員登録に失敗しました。", {
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
        <h1>新規登録</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-96 p-2 mt-1 mb-7 border-b-2 border-[#2e9287] focus:outline-none focus:border-teal-500"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-96 p-2 mt-1 mb-7 border-b-2 border-[#2e9287] focus:outline-none focus:border-teal-500"
        />
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

// export async function getServerSideProps(context) {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//         return {
//             redirect: {
//                 destination: '/Research',
//                 permanent: false
//             },
//         };
//     }

//     return {
//         props: { user },
//     };
// }
