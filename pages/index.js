import { Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Container>
      <Head>
        <title>Nogginy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
          spacing={4}
        >
          <Typography variant="h3" align="center">
            {!session ? "Not logged in" : "Logged in"}
          </Typography>
          <Typography variant="h3" align="center">
            Welcome to Nogginy!
          </Typography>
          <Link href="/play" passHref>
            <Button variant="outlined">Play</Button>
          </Link>
        </Stack>
      </main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Container>
  );
}
