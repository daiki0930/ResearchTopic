"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Logout from "./Logout";

type FormValues = {
  interests: string;
  interests1?: string;
  interests2?: string;
  interests3?: string;
  interests4: string;
  theme?: string;
  contents?: string;
};

export function MainSearchForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      interests: "",
      interests1: "",
      interests2: "",
      interests3: "",
      interests4: ""
    },
  });

  const interests = watch("interests");
  const isValidSubjects = interests !== "";

  const handleInterestsChange = (value: string) => {
    setValue("interests1", "");
    setValue("interests2", "");
    setValue("interests3", "");
    setValue("interests4", "");
    clearErrors(["interests1", "interests2", "interests3", "interests4"]);
  };

  const fetchTheme = async (data: FormValues) => {
    try {
      const requestBody = {
        interests: data.interests,
        ...(data.interests === "理科" ? { interests1: data.interests1 } : { interests3: data.interests3 }),
        ...(data.interests === "理科" ? { interests2: data.interests2 } : {}),
        interests4: data.interests4,
      };
      
      const response = await fetch("../api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      
      setValue("theme", responseData.theme);
      setValue("contents",responseData.content);
    } catch (error) {
      console.error("エラー", error);
    }
  };

  const theme = watch("theme");
  const content = watch("contents");

  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex justify-center items-center h-[2300px] flex-col bg-gradient-to-b from-[#f5ba61] to-[#eecfb6]">
      <div className="absolute top-5 w-3/4 text-center bg-white rounded-[10px]">
        <p className="text-[60px] font-bold text-[#ea9917]"> AIと一緒に自由研究テーマを決めよう! </p>
      </div>
      <Logout />
      <form className="flex flex-col justify-center items-center text-[25px] h-screen">
        <p className="w-3/4 text-center bg-[#f3960b]"> いくつかの質問に答えてね！ </p>

        <p className="mt-[90px]"> 小学校の授業で好きな科目は？(１科目のみ) </p>
        <input
          {...register("interests", {
            required: "このフィールドは必須です。",
            onChange: (e) => handleInterestsChange(e.target.value)
          })}
          placeholder="例: 理科、国語"
          className="w-[300px] p-[10px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />
        {errors.interests && <p className="text-red-500 text-sm mt-[-75px] mb-[80px]">{errors.interests.message}</p>}

        <p>理科の授業で面白かった実験は？(理科と答えた場合のみ)</p>
        <input
          {...register("interests1", {
            required: interests === "理科" ? "このフィールドは必須です。" : false
          })}
          disabled={interests !== "理科"}
          placeholder={
            interests !== "理科"
            ? "※科目を入力してください。"
            : "例: 水の性質、燃焼、光の反射と屈折、バネと力、昆虫の観察、天気の観察"
          }
          className="w-[710px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />
        {errors.interests1 && <p className="text-red-500 text-sm mt-[-75px] mb-[80px]">{errors.interests1?.message}</p>}

        <p>家にあるもので何か使ってみたいものはある？(理科と答えた場合のみ)</p>
        <input
          {...register("interests2", {
            required: interests === "理科" ? "このフィールドは必須です。" : false
          })}
          disabled={interests !== "理科"}
          placeholder={
            interests !== "理科"
            ? "※科目を入力してください。"
            : "例: 水、酢、砂糖、電池、ペットボトル、磁石、アルミホイル、空き瓶"
          }
          className="w-[660px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />
        {errors.interests2 && <p className="text-red-500 text-sm mt-[-75px] mb-[80px]">{errors.interests2?.message}</p>}

        <p>好きな科目のことで、どんなことが気になる？(理科以外で答えた場合のみ)</p>
        <input
          {...register("interests3", {
            required: interests === "理科" ? false : "このフィールドは必須です。"
          })}
          disabled={!isValidSubjects || interests === "理科"}
          placeholder={
            !isValidSubjects || interests === "理科"
            ? "※科目を入力してください。"
            : "例: 漢字や詩に関すること(国語)、図形やデータのこと(算数)、地理や歴史のこと(社会)"
          }
          className="w-[870px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />
        {errors.interests3 && <p className="text-red-500 text-sm mt-[-75px] mb-[80px]">{errors.interests3?.message}</p>}

        <p>どのくらいの期間で終わらせたい？</p>
        <input
          {...register("interests4", { required: "このフィールドは必須です。"})}
          disabled={!isValidSubjects}
          placeholder={
            !isValidSubjects
            ? "※科目を入力してください。"
            : "例: 一週間、一ヶ月"
          }
          className="w-[300px] p-[9px] mt-[5px] mb-[80px] text-[20px] border-t-2 border-b-2 border-[#f56f27] outline-none placeholder-opacity-60 placeholder:text-center"
        />
        {errors.interests4 && <p className="text-red-500 text-sm mt-[-75px] mb-[80px]">{errors.interests4?.message}</p>}

        <button
          onClick={handleSubmit(fetchTheme)}
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

        <button
          type="button"
          onClick={handleReset}
          className="mt-[50px] py-3 px-6 text-lg bg-[#e8900c] text-black rounded-md"
        >
          もう一度行う
        </button>
        
      </form>
    </div>
  );
}