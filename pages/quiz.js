import Head from 'next/head';
import Layout, { siteTitle } from '../src/components/layout';
import useSWR from 'swr';
import Link from 'next/link';
import Date from '../src/components/date';

export async function getStaticProps() {
  const res = await fetch('https://opentdb.com/api.php?amount=10');
  const questions = await res.json();
  console.log(questions);
  return {
    props: {
      questions,
    },
  };
  // return {
  //   props: {
  //     allPostsData,
  //   },
  // }
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Questions() {
  const { data, error } = useSWR('https://opentdb.com/api.php?amount=10', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.results[0].question}!</div>;
}

export default function Home({ questions }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Questions />
      <section className="text-xl">
        <ul>
          {questions.results.map(({ question }) => (
            <li>{question}</li>
          ))}
        </ul>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className="pt-1 text-xl">
        <h2 className="text-2xl">Blog</h2>
        {/* <ul className="p-0 m-0 list-none">
          {allPostsData && {allPostsData.map((post) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
            <h2>{post}</h2>
          ))}}
        </ul> */}
      </section>
    </Layout>
  );
}
