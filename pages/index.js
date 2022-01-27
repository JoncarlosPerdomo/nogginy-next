import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import useSWR from 'swr'
import Link from 'next/link'
import Date from '../components/date'
import Button from '../components/outlineButton'
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const res = await fetch('https://opentdb.com/api.php?amount=10')
  const questions = await res.json()
  console.log(questions)
  return {
    props: {
      questions,
    },
  }
  // return {
  //   props: {
  //     allPostsData,
  //   },
  // }
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Questions() {
  const { data, error } = useSWR(
    'https://opentdb.com/api.php?amount=10',
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.results[0].question}!</div>
}

export default function Home({ questions }) {
  return (
    <div className="pt-20 bg-sky-400">
      <h2 className="absolute text-2xl text-white top-4 left-6 font-Catamaran">
        nogginy
      </h2>
      {/* <img
        src={userData.img}
        className="custom"
        alt="Pic"
        width="300"
        height="300"
      /> */}
      {/* <ColorSelection /> */}
      <div className="text-center">
        <h1 className="text-5xl font-normal text-white font-Catamaran">
          Welcome
        </h1>
      </div>
      <div className="text-center rounded-lg">
        <Link href="/single" passHref>
          <Button label="Single" />
        </Link>
        <Link href="/multi" passHref>
          <Button label="Multiplayer" />
        </Link>
      </div>
    </div>
  )
}
