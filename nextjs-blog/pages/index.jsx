import { useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';

import { i18n, withTranslation } from '../i18n';
import { getSortedPostsData } from '../lib/posts';

import utilStyles from '../components/utils.module.css';

const Home = ({ allPostsData, t, preview }) => {
  useEffect(() => {
    {
      console.log(preview);
    }
  }, [preview]);
  const handleClick = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>{t(`${preview ? 'index-preview:' : ''}index/title.content`)}</h1>
      <button onClick={handleClick}>
        {i18n.language === 'en' ? 'Espanol' : 'English'}
      </button>
      <br />
      <Link
        href={
          preview ? '/api/preview?disable=true&slug=/' : '/api/preview?slug=/'
        }
        locale={i18n.language === 'en' ? 'es' : 'en'}
      >
        <a>{preview ? 'Disable' : 'Enable'} preview mode</a>
      </Link>
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
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps = async (context) => {
  const { preview } = context;
  const allPostsData = getSortedPostsData();
  const fs = require('fs');

  console.log(context);

  const dataEN = {
    'index/title': {
      content: 'This is title',
    },
  };

  const dataENpreview = {
    'index/title': {
      content: '_This is preview Title',
    },
  };

  const dataES = {
    'index/title': {
      content: 'Este es el titulo',
    },
  };

  const dataESpreview = {
    'index/title': {
      content: '_Este es el título de vista previa',
    },
  };

  const locale = preview ? 'es' : 'en';

  let data;
  if (preview) {
    data = locale === 'en' ? dataENpreview : dataESpreview;
  } else {
    data = locale === 'en' ? dataEN : dataES;
  }

  const fileName = preview ? 'index-preview.json' : 'index.json';

  await fs.writeFile(
    `public/static/locales/${locale}/${fileName}`,
    JSON.stringify(data),
    () => {
      console.log(data);
    }
  );

  return {
    props: {
      allPostsData,
      preview: preview || false,
    },
  };
};

export default withTranslation(['index', 'index-preview'])(Home);
