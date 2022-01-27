import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import useSWR from 'swr'
import Link from 'next/link'
import Date from '../components/date'

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
    <div className="pt-20">
      <h1 className="text-5xl font-normal text-center text-white font-Catamaran">
        Welcome
      </h1>
      <h2 className="absolute top-0 left-0 text-2xl text-white font-Catamaran">
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
        <button
          type="button"
          className="m-4 text-xl text-white rounded-sm outline outline-4 outline-offset-8 hover:bg-white hover:text-sky-400 hover:outline hover:outline-4 hover:outline-offset-8 hover:outline-sky-400"
          onClick={() => navigate('/nogginy/quiz')}
        >
          Single
        </button>
        <button
          type="button"
          className="m-4 text-xl text-white rounded-sm outline outline-4 outline-offset-8 hover:bg-white hover:text-sky-400 hover:outline hover:outline-4 hover:outline-offset-8 hover:outline-sky-400"
          // onClick={() => gameModeHandler("multiplayer")}
        >
          Multiplayer
        </button>
      </div>
    </div>
  )
}
