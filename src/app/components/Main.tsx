
import { React, useState, useEffect } from 'react';
import { useShowToast } from '../../../../hooks/useShowToast';
import { useRouter } from 'next/navigation';

import '../../api/firebase/firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import styles from '../../../styles/Login.module.css';
// import Description from '../../../components/description';

// import { destroyCookie, setCookie } from 'nookies';
// import { parseCookies } from 'nookies';
// import { auth } from '../../api/firebase/firebaseAdmin';

// export async function getServerSideProps(context) {
//     const cookies = parseCookies(context);

//     if (!cookies.session) {
//         return {
//             redirect: {
//                 destination: '/Research/FirebaseLogin',
//                 permanent: false
//             },
//         };
//     }

//     try {
//         const decodedToken = await admin.auth().verifySessionCookie(cookies.session, true);
//         return {
//             props: { user: decodedToken },
//           };
//     } catch (error) {
//           return {
//             redirect: {
//               destination: '/Research/FirebaseLogin',
//               permanent: false,
//             },
//         };
//     }
// }

export default function Home() {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const router = useRouter();
    const auth = getAuth()
    const [interests, setInterests] = useState();
    const [interests1, setInterests1] = useState();
    const [interests2, setInterests2] = useState();
    const [interests3, setInterests3] = useState();
    const [interests4, setInterests4] = useState();
    const [theme, setTheme] = useState();
    const [content, setContent] = useState();

    const fetchTheme = async () => {
        const requestBody = {
            interests,
            ...(interests === '理科' ? {interests1} : {interests3} ),
            ...(interests === '理科' ? {interests2} : {}),
            interests4,
        };
        const response = await fetch('../../api/generate-theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
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



    const handleLogout = async() => {
        try {
            // console.log('----どこでトークン削除が行われるか----',document.cookie)
            await signOut(auth);
            // console.log('----ログアウト0----',auth)
            // destroyCookie(null, 'token', { path: '/Research/MyPage'});
            // console.log('----トークン削除されてるはず----',document.cookie)
            setUser(null);
            showToast({
                status: 'success',
                title: 'ログアウトしました。'
            })
            router.push('/Research/FirebaseLogin');
        } catch (error) {
            showToast({
                status: 'error',
                title: 'ログアウトに失敗しました。',
            })
        }
    }

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
        <div className='flex justify-center items-center h-[2500px] flex-col bg-gradient-to-b from-[#f5ba61] to-[#eecfb6]'>
            <div className="absolute top-5 w-3/4 text-center bg-white rounded-lg">
                <p className="text-6xl font-bold text-[#ea9917]">
                    AIと一緒に自由研究テーマを決めよう!
                </p>
            </div>
            <Box position="absolute" top="20px" right="30px">
            <Button onClick={handleLogout} className={styles.button_LogOut}> ログアウト </Button>
            </Box>

            <Box position="absolute" bottom="100px" width="100%" textAlign="center" backgroundColor="#f3960b">
                <Text fontSize="30px" color="black">
                    いくつかの質問に答えてね！
                </Text>
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" fontSize="25px" height="100vh">
                <Text marginTop="500px">
                    小学校の授業で好きな科目は？(１科目のみ)
                </Text>
                <Input
                    width="300px"
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="例: 理科、社会"
                    className={styles.question_input1}
                />

                <Text>
                    理科の授業で面白かった実験は？(理科と答えた場合のみ)
                </Text>
                <Input
                    width="710px"
                    type="text"
                    value={interests1}
                    onChange={(e) => setInterests1(e.target.value)}
                    disabled={['国語', '数学', '社会'].includes(interests)}
                    placeholder={ ['国語', '数学', '社会'].includes(interests) ? '※入力できません' : '例: 水の性質、燃焼、光の反射と屈折、バネと力、昆虫の観察、天気の観察' }
                    className={styles.question_input1}
                />
                
                <Text>
                    家にあるもので何か使ってみたいものはある？(理科と答えた場合のみ)
                </Text>
                <Input
                    width="660px"
                    type="text"
                    value={interests2}
                    onChange={(e) => setInterests2(e.target.value)}
                    disabled={['国語', '数学', '社会'].includes(interests)}
                    placeholder={ ['国語', '数学', '社会'].includes(interests) ? '※入力できません' : "例: 水、酢、砂糖、電池、ペットボトル、磁石、アルミホイル、空き瓶" }
                    className={styles.question_input1}
                />

                <Text>
                    好きな科目のことで、どんなことが気になる？(理科以外で答えた場合のみ)
                </Text>
                <Input
                    width="870px"
                    type="text"
                    value={interests3}
                    onChange={(e) => setInterests3(e.target.value)}
                    disabled={interests === '理科'}
                    placeholder={ interests === '理科' ? '※入力できません' : "例: 漢字や詩に関すること(国語)、図形やデータのこと(算数)、地理や歴史のこと(社会)"}
                    className={styles.question_input1}
                />

                <Text>
                    どのくらいの期間で終わらせたい？
                </Text>
                <Input
                    width="200px"
                    type="text"
                    value={interests4}
                    onChange={(e) => setInterests4(e.target.value)}
                    placeholder="例: 一週間、一ヶ月"
                    className={styles.question_input1}
                />

                <Button onClick={fetchTheme} className={styles.button_Create}> この条件で案を作成してもらう </Button>

                <Text marginTop="60px"> 提案テーマ </Text>
                
                { theme && <Text className={styles.responseText}> {theme} </Text> }
                
                { content && <Text className={styles.responseText}> {content} </Text> }

                {/* <Button onClicK={handleReset} className={styles.ResetButton}> もう一度行う</Button> */}
            </Box>
        </div>
    );
};