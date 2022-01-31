import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import useSWR from 'swr';
import Link from 'next/link';
import Date from '../src/components/date';
import { useRouter } from 'next/router';
import {
  Button,
  createStyles,
  AppShell,
  Navbar,
  Header,
  Burger,
  Text,
  useMantineTheme,
  MediaQuery,
} from '@mantine/core';
import { useState } from 'react';

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

const useStyles = createStyles((theme, _params, getRef) => {
  const child = getRef('child');

  return {
    button: {
      // subscribe to color scheme changes right in your styles
      color: theme.colors.gray[0],
      borderColor: theme.colors.gray[0],
      borderWidth: '3px',
      '&:hover': {
        backgroundColor: theme.colors.gray[0],
        color: theme.colors.blue[4],
      },
    },
  };
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Questions() {
  const { data, error } = useSWR('https://opentdb.com/api.php?amount=10', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.results[0].question}!</div>;
}

export default function Home({ questions }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      header={
        <Header height={70} padding="md" className="bg-sky-400">
          <h2 className="absolute top-4 left-6 font-Catamaran text-2xl text-white">nogginy</h2>
        </Header>
      }
      padding={0}
    >
      <div className="fixed h-full w-full bg-sky-400 pt-20">
        {/* <img
        src={userData.img}
        className="custom"
        alt="Pic"
        width="300"
        height="300"
      /> */}
        {/* <ColorSelection /> */}
        <div className="text-center">
          <h1 className="font-Catamaran text-5xl font-normal text-white">Welcome</h1>
        </div>
        <div className="text-center ">
          <Link href="/single">
            <Button component="a" className={classes.button} variant="outline" mx="sm">
              Single
            </Button>
          </Link>
          <Link href="/multi">
            <Button component="a" variant="outline" className={classes.button}>
              Multi
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
