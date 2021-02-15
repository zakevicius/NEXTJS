import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/layout';

const PageRandom = () => {
  
  return (
    <Layout home>
      <Head>
        <title>{'This is title'}</title>
      </Head>
      <br />
      <h3>{'common/section_partnership_title'}</h3>
      <br />
      <h2>Random</h2>
      <section>
        <p>This is my self introduction</p>
        <p>
          (Blah blah blah like something{' '}
          <Link href='/posts/first-post'>
            <a>over here</a>
          </Link>{' '}
          blah blah)
        </p>
      </section>
    </Layout>
  );
};

export default PageRandom;
