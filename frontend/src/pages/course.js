import Head from "next/head";
import styles from '../styles/Course.module.css';
import { GlobalSearch, SideMenu } from "../components";
import '@fontsource-variable/inter';
import { useRouter } from "next/router";
import { Menu, MenuButton, MenuList, MenuItem, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

const subjects = ['Анатомия', 'Физиология', 'Биология', 'Биоэтика', 'Гистология', 'Латынь'];
const subjectsType = ['Ангиология', 'Миология', 'Спланхнология', 'Остеология', 'Краниология'];

export default function Course() {

  const router = useRouter();
  const { number } = router.query;

  const [subject, setSubject] = useState('');
  const [subjectType, setSubjectType] = useState(subjectsType[0]);

  return <>
    <Head>
      <title>Курсы</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <SideMenu />
      <GlobalSearch />
      <div className={styles.main}>
        <p className={styles.title}>Все материалы для студентов <span style={{ color: '#07C88E' }} >{number} курса</span></p>
        <Menu>
          <MenuButton className={styles.menuButton}>
            <div className={styles.menuButtonBlock}>
              <p className={styles.menuButtonText}>{subject !== '' ? subject : 'Выберите дисциплину'}</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967Z" fill="#000B26" fill-opacity="0.72" />
              </svg>
            </div>
          </MenuButton>
          <MenuList className={styles.menuList} autoFocus={false} >
            {subjects.map((x, i) => <MenuItem key={i} onClick={() => setSubject(x)} className={styles.menuItem}>{x}</MenuItem>)}
          </MenuList>
        </Menu>
        {subject !== '' && <div className={styles.container}>
          <div className={styles.navigationBlock}>
            <p className={styles.navigationTitle}>{subject}</p>
            <div className={styles.navigaton}>
              {subjectsType.map((x, i) => <div key={i} onClick={() => setSubjectType(x)} className={`${styles.navigationItem} ${x === subjectType && styles.navigationItemCheck}`} >
                <p>{x}</p>
              </div>)}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.testBlock}>
              <p className={styles.testTitle}>Проверьте свои знания по выбранной дисциплине!</p>
              <button className={styles.testButton}>Пройдите тест</button>
            </div>
            <div className={styles.materialsBlock}>
              <div className={styles.materialBlock}>
                <p className={styles.materialSubtitle}>Видеолекции</p>
                <div className={styles.materialContainer}>
                  <SimpleGrid columns={3} gap='30px'>
                    {[1, 2, 3].map(x => <div key={x} className={styles.materialBox} >
                      <p className={styles.materialText}>Видео {x}</p>
                    </div>)}
                  </SimpleGrid>
                </div>
              </div>
              <div className={styles.materialBlock}>
                <p className={styles.materialSubtitle}>Методические материалы</p>
                <div className={styles.materialContainer}>
                  <SimpleGrid columns={3} gap='30px'>
                    {[1, 2, 3].map(x => <div key={x} className={styles.materialBoxMetod} >
                      <p className={styles.materialText}>Методичка {x}</p>
                    </div>)}
                  </SimpleGrid>
                </div>
              </div>
              <div className={styles.materialBlock}>
                <p className={styles.materialSubtitle}>Конспекты</p>
                <div className={styles.materialContainer}>
                  <SimpleGrid columns={3} gap='30px'>
                    {[1, 2, 3].map(x => <div key={x} className={styles.materialBoxMetod} >
                      <p className={styles.materialText}>Конспект {x}</p>
                    </div>)}
                  </SimpleGrid>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </main>
  </>
}
