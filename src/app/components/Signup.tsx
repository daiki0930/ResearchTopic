'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import '../Login/firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/Login.module.css';
// import { useShowToast } from '../../../hooks/useShowToast';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth();
    // const showToast = useShowToast();

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const registerUser = await createUserWithEmailAndPassword(auth, email, password);
            setUser(registerUser);
            // showToast({
            //     status: 'success',
            //     title: 'ユーザー登録が完了しました。',
            // });
            router.push('/Research/FirebaseLogin');
        } catch (error) {
            // setError(error);
            // showToast({
            //     status: 'error',
            //     title: '既にユーザー登録をしています。',
            // });
        }
    };

    return (
        <div className={styles.container}>
            <Box className={styles.card}>
                <Heading>新規登録</Heading>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    className={styles.input}
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    className={styles.input}
                />
                <Button onClick={handleRegister} type="submit" className={styles.button_LogSign}>
                    新規登録
                </Button>
            </Box>
        </div>
    );
};

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

export default SignInForm;