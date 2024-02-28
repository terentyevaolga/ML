import Head from "next/head";
import styles from '../styles/Account.module.css';
import { GlobalSearch, SideMenu } from "../components";
import '@fontsource-variable/inter';
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from '../../apiConfig.js';
import { useRouter } from "next/router";

const dataTest = [
  { date: '22.01.24', test: 'Миология', result: '5/10' },
  { date: '15.02.24', test: 'Кардиология', result: '9/10' }
];

export default function Cabinet() {

  const router = useRouter();
  const [data, setData] = useState([]);

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


  return <>
    <Head>
      <title>Личный кабинет</title>
      <meta name="description" content="Generated by Zvir" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <SideMenu />
      <GlobalSearch />
      <div className={styles.container}>
        <p className={styles.title}>Личный кабинет</p>
        <div className={styles.data}>
          <div className={styles.data_info}>
            <div className={styles.data_infoUser}>
              <div className={styles.blockNameMail}>
                <p className={styles.name}>{data.fido}</p>
                <p className={styles.phone}>{data.email}</p>
              </div>
              <button className={styles.edit} onClick={() => router.push('/edit')}>Редактировать</button>
            </div>
            <div className={styles.data_infoTests}>
              <p className={styles.historyTestsTitle}>История тестирования</p>
              <div className={styles.testResultBlock} >
                {dataTest.map((x, i) => <p key={i} className={styles.testResult} >{x.date} {x.test} - {x.result}</p>)}
              </div>
            </div>
          </div>
          <div className={styles.data_material}>
            <p className={styles.data_materialTitle}>Подборка учебных материалов по результатам пройденных тестирований</p>
            <div className={styles.materialBlock}>
              <p className={styles.materialSubtitle}>Видеолекции</p>
              <div className={styles.materialContainer}>
                <SimpleGrid columns={2} gap='10px'>
                  {[1, 2, 3].map(x => <div key={x} className={styles.materialBox} >
                    <p className={styles.materialText}>Видео {x}</p>
                  </div>)}
                </SimpleGrid>
              </div>
            </div>
            <div className={styles.materialBlock}>
              <p className={styles.materialSubtitle}>Методические материалы</p>
              <div className={styles.materialContainer}>
                <SimpleGrid columns={2} gap='10px'>
                  {[1, 2].map(x => <div key={x} className={styles.materialBoxMetod} >
                    <p className={styles.materialText}>Методичка {x}</p>
                  </div>)}
                </SimpleGrid>
              </div>
            </div>
            <div className={styles.materialBlock}>
              <p className={styles.materialSubtitle}>Конспекты</p>
              <div className={styles.materialContainer}>
                <SimpleGrid columns={2} gap='10px'>
                  {[1, 2].map(x => <div key={x} className={styles.materialBoxMetod} >
                    <p className={styles.materialText}>Конспект {x}</p>
                  </div>)}
                </SimpleGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
}
