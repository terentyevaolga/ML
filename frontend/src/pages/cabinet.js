import Head from "next/head";
import styles from '../styles/Account.module.css';
import { GlobalSearch, SideMenu } from "../components";
import '@fontsource-variable/inter';

const dataTest = [
  { date: '22.01.24', test: 'Миология', result: '5/10' },
  { date: '15.02.24', test: 'Кардиология', result: '9/10' }
];

export default function Course() {


  return (
    <>
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
                  <p className={styles.name}>Иван Иванов</p>
                  <p className={styles.phone}>mail@mail.ru</p>
                </div>
                <button className={styles.edit} >Редактировать</button>
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
                  {[1, 2].map(x => <div key={x} className={styles.materialBox} >
                    <p className={styles.materialText}>Видео {x}</p>
                  </div>)}
                </div>
              </div>
              <div className={styles.materialBlock}>
                <p className={styles.materialSubtitle}>Методические материалы</p>
                <div className={styles.materialContainer}>
                  {[1, 2].map(x => <div key={x} className={styles.materialBoxMetod} >
                    <p className={styles.materialText}>Методичка {x}</p>
                  </div>)}
                </div>
              </div>
              <div className={styles.materialBlock}>
                <p className={styles.materialSubtitle}>Конспекты</p>
                <div className={styles.materialContainer}>
                  {[1, 2].map(x => <div key={x} className={styles.materialBoxMetod} >
                    <p className={styles.materialText}>Конспект {x}</p>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
