import Head from 'next/head';

import { getAllPostIds, getPostData } from '../../lib/posts';

import Layout from '../../components/layout';
import Date from '../../components/date';

import utilStyles from '../../components/utils.module.css';

const Post = ({ postData: { title, id, date, contentHtml } }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

export default Post;
