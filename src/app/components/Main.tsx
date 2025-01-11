"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import "../Authentication/Login/firebase/firebase";
import { auth } from "../Authentication/Login/firebase/firebase";
import {  
    signOut,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { showToast } from "@/utils/toast";
import "react-toastify/dist/ReactToastify.css";

// import Description from '../../../components/description';

export default function Main() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [interests, setInterests] = useState<string>("");
  const [interests1, setInterests1] = useState<string>("");
  const [interests2, setInterests2] = useState<string>("");
  const [interests3, setInterests3] = useState<string>("");
  const [interests4, setInterests4] = useState<string>("");
  const [theme, setTheme] = useState();
  const [content, setContent] = useState();

  const fetchTheme = async () => {
    console.log("-------GPTのAPI------");
    const requestBody = {
      interests,
      ...(interests === "理科" ? { interests1 } : { interests3 }),
      ...(interests === "理科" ? { interests2 } : {}),
      interests4,
    };
    console.log("-------GPTのAPI1------");
    const response = await fetch("../api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log("-------GPTのAPI2------");
    const data = await response.json();
    console.log("-------GPTのAPI3------");
    setTheme(data.theme);
    setContent(data.content);
  };

  useEffect(() => {
    const Logout = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => Logout();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      const res = await fetch("../api/sessionLogout", { method: "DELETE" });

      setUser(null);
      showToast("success", "ログアウトに成功しました。");
      router.push("/");
    } catch (error) {
      showToast("error", "ログアウトに失敗しました。");
    }
  };

//   const checkSessionCookie = () => {
//     const cookies = document.cookie;
//     const sessionCookie = cookies
//       .split(";")
//       .find((row) => row.startsWith("gpt-login-session="));

//     if (sessionCookie) {
//       console.log("セッションCookieが設定されています:", sessionCookie);
//     } else {
//       console.log("セッションCookieが設定されていません");
//     }

//     if (!sessionCookie) {
//       window.location.href = "/";
//     }
//   };

//   useEffect(() => {
//     checkSessionCookie();
//   }, []);

  // const handleReset = () => {
  //     setInterests('');
  //     setInterests1('');
  //     setInterests2('');
  //     setInterests3('');
  //     setInterests4('');
  //     setTheme('');
  //     setContent('');
  // };

  return (
    <div className="flex justify-center items-center h-[2300px] flex-col bg-gradient-to-b from-[#f5ba61] to-[#eecfb6]">
      <div className="absolute top-5 w-3/4 text-center bg-white rounded-[10px]">
        <p className="text-[60px] font-bold text-[#ea9917]">
          AIと一緒に自由研究テーマを決めよう!
        </p>
      </div>

      <div className="absolute top-5 right-[30px]">
        <button
          onClick={handleLogout}
          className="bg-[#f4f0b4] px-5 py-2.5 border-none rounded-md"
        >
          {" "}
          ログアウト{" "}
        </button>
      </div>

      <div className="flex flex-col justify-center items-center text-[25px] h-screen">
        <p className="w-3/4 text-center bg-[#f3960b]">
          いくつかの質問に答えてね！
        </p>

        <p className="mt-[90px]">小学校の授業で好きな科目は？(１科目のみ)</p>
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="例: 理科、社会"
          className="w-[300px] p-[10px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />

        <p>理科の授業で面白かった実験は？(理科と答えた場合のみ)</p>
        <input
          value={interests1}
          onChange={(e) => setInterests1(e.target.value)}
          disabled={["国語", "数学", "社会"].includes(interests)}
          placeholder={
            ["国語", "数学", "社会"].includes(interests)
              ? "※入力できません"
              : "例: 水の性質、燃焼、光の反射と屈折、バネと力、昆虫の観察、天気の観察"
          }
          className="w-[710px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />

        <p>家にあるもので何か使ってみたいものはある？(理科と答えた場合のみ)</p>
        <input
          value={interests2}
          onChange={(e) => setInterests2(e.target.value)}
          disabled={["国語", "数学", "社会"].includes(interests)}
          placeholder={
            ["国語", "数学", "社会"].includes(interests)
              ? "※入力できません"
              : "例: 水、酢、砂糖、電池、ペットボトル、磁石、アルミホイル、空き瓶"
          }
          className="w-[660px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />

        <p>
          好きな科目のことで、どんなことが気になる？(理科以外で答えた場合のみ)
        </p>
        <input
          value={interests3}
          onChange={(e) => setInterests3(e.target.value)}
          disabled={interests === "理科"}
          placeholder={
            interests === "理科"
              ? "※入力できません"
              : "例: 漢字や詩に関すること(国語)、図形やデータのこと(算数)、地理や歴史のこと(社会)"
          }
          className="w-[870px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />

        <p>どのくらいの期間で終わらせたい？</p>
        <input
          value={interests4}
          onChange={(e) => setInterests4(e.target.value)}
          placeholder="例: 一週間、一ヶ月"
          className="w-[200px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />

        <button
          onClick={fetchTheme}
          className="py-3 px-6 text-lg bg-[#e8900c] text-black rounded-md border-none cursor-pointer hover:bg-[#ff9900] active:bg-[#ff5e00]"
        >
          自由研究テーマを作成
        </button>

        <p className="mt-[19px] mb-5"> 提案テーマ </p>

        {theme && (
          <p className="max-w-[90%] p-[25px] mx-auto rounded-[15px] mb-5 text-[23px] bg-[#f09050]">
            {" "}
            {theme}{" "}
          </p>
        )}

        {content && (
          <p className="max-w-[90%] p-[25px] mx-auto rounded-[15px] text-[23px] bg-[#f09050]">
            {" "}
            {content}{" "}
          </p>
        )}

        {/* <button onClicK={handleReset} className={styles.ResetButton}> もう一度行う</button> */}
      </div>
    </div>
  );
}
