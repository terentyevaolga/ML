import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const linksMaterial = [
    { name: 'Лекции', link: '/lectures' },
    { name: 'Методички', link: '/manuals' },
    { name: 'Конспекты', link: '/synopsis' },
    { name: 'Статьи', link: '/articles' }
];

export function SideMenu() {

    const [auth, setAuth] = useState('signIn');
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        if (token) setAuth('account');
    }, []);

    return <div className={styles.container} >
        <p className={styles.logo}>Лого</p>
        <div className={styles.blockMaterial} >
            <div className={styles.cources}>
                <p className={styles.cources_title}>Курсы</p>
                <div className={styles.cources_itemList}>
                    {[1, 2, 3, 4, 5].map(x =>
                        <p key={x} onClick={() => token && router.push(`/cource${x}`)} className={token ? styles.cources_item : styles.cources_itemMainPage}>{x} курс</p>)}
                </div>
            </div>
            <div className={styles.cources}>
                <p className={styles.cources_title}>Учебные материалы</p>
                <div className={styles.cources_itemList}>
                    {linksMaterial.map(x =>
                        <p key={x} onClick={() => token && router.push(`/${x.link}`)} className={token ? styles.cources_item : styles.cources_itemMainPage}>{x.name}</p>)}
                </div>
            </div>
        </div>
        <div className={styles.authBlock}>
            {auth === 'account'
                ? <div className={styles.account}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21967 0.46967C6.51256 0.176777 6.98744 0.176777 7.28033 0.46967L13.2803 6.46967C13.5732 6.76256 13.5732 7.23744 13.2803 7.53033L7.28033 13.5303C6.98744 13.8232 6.51256 13.8232 6.21967 13.5303C5.92678 13.2374 5.92678 12.7626 6.21967 12.4697L10.9393 7.75H0.75C0.335786 7.75 0 7.41421 0 7C0 6.58579 0.335786 6.25 0.75 6.25H10.9393L6.21967 1.53033C5.92678 1.23744 5.92678 0.762563 6.21967 0.46967Z" fill="#000B26" fill-opacity="0.72" />
                    </svg>
                    <p className={styles.account_button} >Личный кабинет</p>
                </div>
                : auth === 'signIn' && <div className={styles.signIn}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 0.25C2.67893 0.25 1 1.92893 1 4V16C1 18.0711 2.67893 19.75 4.75 19.75H10.75C12.8211 19.75 14.5 18.0711 14.5 16V15C14.5 14.5858 14.1642 14.25 13.75 14.25C13.3358 14.25 13 14.5858 13 15V16C13 17.2426 11.9926 18.25 10.75 18.25H4.75C3.50736 18.25 2.5 17.2426 2.5 16V4C2.5 2.75736 3.50736 1.75 4.75 1.75H10.75C11.9926 1.75 13 2.75736 13 4V5C13 5.41421 13.3358 5.75 13.75 5.75C14.1642 5.75 14.5 5.41421 14.5 5V4C14.5 1.92893 12.8211 0.25 10.75 0.25H4.75ZM9.78033 7.53033C10.0732 7.23744 10.0732 6.76256 9.78033 6.46967C9.48744 6.17678 9.01256 6.17678 8.71967 6.46967L5.71967 9.46967C5.42678 9.76256 5.42678 10.2374 5.71967 10.5303L8.71967 13.5303C9.01256 13.8232 9.48744 13.8232 9.78033 13.5303C10.0732 13.2374 10.0732 12.7626 9.78033 12.4697L8.06066 10.75H18.25C18.6642 10.75 19 10.4142 19 10C19 9.58579 18.6642 9.25 18.25 9.25H8.06066L9.78033 7.53033Z" fill="#000B26" fill-opacity="0.72" />
                    </svg>
                    <p className={styles.signin_button} >Войти</p>
                </div>
            }
        </div>
    </div>
}