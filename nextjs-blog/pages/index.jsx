import { useEffect, useState } from 'react';
import Axios from 'axios';

import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';

import utilStyles from '../components/utils.module.css';

const Home = ({ preview, t }) => {
  const router = useRouter();

  useEffect(() => {
    {
      console.log(router.locale);
    }
  }, [preview]);

  const handleClick = () => {
    // console.log(i18n.language);
    // i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>{t('common/button_dashboard')}</h1>
      {/* <button onClick={handleClick}>
        {i18n.language === 'en' ? 'Espanol' : 'English'}
      </button> */}
      <br />
      {/* <Link href='/' locale={i18n.language === 'en' ? 'es' : 'en'}>
        <a>change locale</a>
      </Link> */}
      <br />
      <h3>{t('common/section_partnership_title')}</h3>
      <br />
      <Link
        href={
          preview ? '/api/preview?disable=true&slug=/' : '/api/preview?slug=/'
        }
      >
        <a>{preview ? 'Disable' : 'Enable'} preview mode</a>
      </Link>
      <h2>Random</h2>
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
        <ul className={utilStyles.list}></ul>
      </section>
    </Layout>
  );
};

export const getStaticProps = async ({ preview, locale }) => {
  const fs = require('fs');
  const { join } = require('path');
  const AWS = require('@aws-sdk/client-s3');

  // Create S3 service object
  let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  // Call S3 to list the buckets
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Buckets);
    }
  });

  const { data } = await Axios.get(
    'https://node-api-translate.herokuapp.com/translations'
  );

  const path =
    process.env.NODE_ENV == 'development'
      ? './public/static/locales'
      : './public/static/locales';

  // const fileNameSuffix = context.preview ? '-preview' : '';

  const fileNameSuffix = '';

  for await (const lang of Object.keys(data)) {
    const langData = data[lang];
    for await (const group of Object.keys(langData)) {
      const fileName = `${group}${fileNameSuffix}.json`;

      await fs.promises.writeFile(
        `${join(path, lang.toLowerCase(), fileName)}`,
        JSON.stringify(langData[group]),
        (err) => {
          console.log('building:', fileName);
          if (err) {
            errors.push(err);
            console.error(err);
            sentry.captureException(err);
          }
        }
      );
    }
  }

  console.log(locale);

  return {
    props: {
      preview: preview || false,
      ...(await serverSideTranslations(locale, ['common', 'index'])),
    },
    revalidate: 1,
  };
};

export default withTranslation('common')(Home);
