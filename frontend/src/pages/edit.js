import Head from "next/head";
import styles from '../styles/Account.module.css';
import { GlobalSearch, SideMenu } from "../components";
import '@fontsource-variable/inter';
import { useRouter } from "next/router";
import { useToast, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../apiConfig.js';

export default function Course() {

    const [data, setData] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [codeText, setCodeText] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [code, setCode] = useState(false);
    const toast = useToast();
    const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    useEffect(() => {
        load();
    });

    function load() {
        axios.get(`${API_BASE_URL}users/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setData(res.data);
            })
    };

    function editName() {
        if (name.split(' ').length == 2 && name.split(' ')[1] !== '') {
            toast({
                title: 'Успешно', description: "Вы изменили имя", status: 'success', duration: 4000, isClosable: true, position: 'bottom-right'
            })
        } else {
            if (name === '') return toast({
                title: 'Ошибка', description: "Вы не изменили данные", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
            if (name.split(' ').length !== 2 || name.split(' ')[1] !== '') toast({
                title: 'Ошибка', description: "Вы не корректно ввели данные", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
        }
    };

    function editMail() {
        if (regexMail.test(email)) {
            setCode(true);
        } else {
            if (email === '') return toast({
                title: 'Ошибка', description: "Вы не изменили данные", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
            if (!regexMail.test(email)) toast({
                title: 'Ошибка', description: "Вы не корректно ввели почту", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
        }
    };

    function editPassword() {
        if (password.length > 0 && password === passwordConfirm) {
            toast({
                title: 'Успешно', description: "Вы изменили пароль", status: 'success', duration: 4000, isClosable: true, position: 'bottom-right'
            })
        } else {
            if (password.length === 0) return toast({
                title: 'Ошибка', description: "Вы не ввели старый пароль", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
            if (password !== passwordConfirm) toast({
                title: 'Ошибка', description: "Пароли не совпадают", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
        }
    };

    function checkCode() {
        if (codeText.length === 6) {
            toast({
                title: 'Успешно', description: "Вы изменили почту", status: 'success', duration: 4000, isClosable: true, position: 'bottom-right'
            })
        } else {
            if (code.length !== 6) toast({
                title: 'Ошибка', description: "Вы не корректно ввели код", status: 'error', duration: 4000, isClosable: true, position: 'bottom-right'
            });
        }
    }

    return <>
        <Head>
            <title>Редактирование информации</title>
            <meta name="description" content="" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <SideMenu />
            <GlobalSearch />
            <div className={styles.container}>
                <p className={styles.titleEdit}>Редактировать информацию</p>
                <div className={styles.editBlocks}>
                    <div className={styles.editTwoBlock} >
                        <div className={styles.editBlock}>
                            <input placeholder="Имя" defaultValue={data.fido} onChange={(e) => setName(e.target.value)} className={styles.modal_input} />
                            <Button backgroundColor='#07C88E' borderRadius='8px' height='56px' width='100%' color='white' _hover={{}} fontWeight={500} onClick={editName}>Обновить имя</Button>
                        </div>
                        <div className={styles.editBlock}>
                            <input placeholder="Старый пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.modal_input} />
                            <input placeholder="Новый пароль" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={styles.modal_input} />
                            <Button backgroundColor='#07C88E' borderRadius='8px' height='56px' width='100%' color='white' _hover={{}} fontWeight={500} onClick={editPassword}>Обновить пароль</Button>
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        <input placeholder="Почта" defaultValue={data.email} onChange={(e) => setEmail(e.target.value)} className={styles.modal_input} />
                        {code && <input placeholder="Код был отправлен вам на почту" value={codeText} onChange={(e) => setCodeText(e.target.value)} className={styles.modal_input} />}
                        <Button backgroundColor='#07C88E' borderRadius='8px' height='56px' width='100%' color='white' _hover={{}} fontWeight={500} onClick={() => code ? checkCode() : editMail()}>{code ? 'Обновить почту' : 'Отправить код'}</Button>
                    </div>
                </div>
            </div>
        </main>
    </>
}