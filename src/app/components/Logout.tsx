"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../Authentication/Login/firebase/firebase";
import { auth } from "../Authentication/Login/firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { showToast } from "@/utils/toast";

export default function Logout () {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await fetch("../api/sessionLogout", { method: "DELETE" });
            showToast("success", "ログアウトに成功しました。");
            router.push("/");
        } catch (error) {
            console.error("ログアウトエラー", error);
            showToast("error", "ログアウトに失敗しました。");
        }
    };

    // 認証状態を管理
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("../Authentication/Login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    // セッション状態を管理
    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch("../api/checkSession", {
                method: "GET",
            });
            
            const data = await res.json();
            if (!data.authenticated) {
                router.push("../Authentication/Login");
            }
        };
        checkSession();
    }, [router]);

    return (
        <div className="absolute top-5 right-[30px]">
            <button
            onClick={handleLogout}
            className="bg-[#f4f0b4] px-5 py-2.5 border-none rounded-md"
            >
                ログアウト
            </button>
        </div>
    )
  };