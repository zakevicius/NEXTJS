import { useEffect, useState } from 'react';
import Axios from 'axios'

import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';

import { i18n, useTranslation } from '../i18n';
import { getSortedPostsData } from '../lib/posts';

import utilStyles from '../components/utils.module.css';

const Home = ({ allPostsData, preview }) => {
  const { t } = useTranslation();

  useEffect(() => {
    {
      console.log('effect')
    }
  },[preview]);

  const handleClick = () => {
    console.log(i18n.language)
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>
        {t('common/button_dashboard')}
        {/* {t(`${preview ? 'index-preview:' : 'index:'}index/title.content`)} */}
      </h1>
      <button onClick={handleClick}>
        {i18n.language === 'en' ? 'Espanol' : 'English'}
      </button>
      <br />
      <Link href='/' locale={i18n.language === 'en' ? 'es' : 'en'}>
        <a>change locale</a>
      </Link>
      {t('common/section_partnership_title')}
      <br />
      <Link
        href={
          preview ? '/api/preview?disable=true&slug=/' : '/api/preview?slug=/'
        }
      >
        <a>{preview ? 'Disable' : 'Enable'} preview mode</a>
      </Link>
      <h2>
        {t(`${preview ? 'index-preview:' : 'index:'}index/random.content`)}
      </h2>
      <section className={utilStyles.headingMd}>
        <p>This is my self introduction</p>
        <p>
          (Blah blah blah like something{' '}
          <Link href='/posts/first-post'>
            <a>over here</a>
          </Link>{' '}
          blah blah)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))} */}
        </ul>
      </section>
    </Layout>
  );
};

// Home.getInitialProps = async (context) => {
//   // console.log(context);
//   // const allPostsData = getSortedPostsData();

//   return {
//     // allPostsData,
//     namespacesRequired: ['index']
//   };
// };

export const getStaticProps = async (context) => {
  const { preview, locale } = context;
  const allPostsData = getSortedPostsData();
  const fs = require('fs');
  const { join } = require('path')

  const { data } = await Axios.get('https://node-api-translate.herokuapp.com/translations')

  const path =
    process.env.NODE_ENV == 'development' ? './public/static/locales' : './public/static/locales'
  

  // const fileNameSuffix = context.preview ? '-preview' : ''

  const fileNameSuffix = ''

  for await (const lang of Object.keys(data)) {
    const langData = data[lang]
    for await (const group of Object.keys(langData)) {
      const fileName = `${group}${fileNameSuffix}.json`

      await fs.promises.mkdir(`${path}/en`, { recursive: true })

      await fs.promises.mkdir(`${path}/es`, { recursive: true })

      await fs.promises.writeFile(
        `${join(path, lang.toLowerCase(), fileName)}`,
        JSON.stringify(langData[group]),
        (err) => {
          console.log('building:', fileName)
          if (err) {
            errors.push(err)
            console.error(err)
            sentry.captureException(err)
          }
        }
      )
    }
  }

  return {
    props: {
      allPostsData,
      preview: preview || false
    },
    revalidate: 1
  };
};

export default Home;
