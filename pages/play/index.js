import { Button, Container, Stack, Typography, Grid } from "@mui/material";
import { decode } from "html-entities";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Play = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        data.results.map((element) => {
          element.correct = false;
          element.question = decode(element.question);
          element.all_choices = element.incorrect_answers;
          element.all_choices.push(element.correct_answer);
          element.all_choices.forEach((element) => {
            decode(element);
          });
          shuffle(element.all_choices);
          element.correct_answer = decode(element.correct_answer);
        });
        data.results.correct_answer = decode(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleChoiceClick = (e) => {
    console.log(e.target.innerText);
    console.log(data.results[questionNumber].correct_answer);
    if (
      e.target.innerText.toUpperCase() ===
      data.results[questionNumber].correct_answer.toUpperCase()
    ) {
      data.results[questionNumber].correct = true;
    }
    setQuestionNumber(questionNumber + 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  if (!data.results[questionNumber]) {
    return (
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          {data.results.map((question, index) => (
            <Typography key={index}>
              Question {index + 1}: {question.correct ? "correct" : "incorrect"}
            </Typography>
          ))}
          <Link href="/" passHref>
            <Button variant="outlined">Home</Button>
          </Link>
        </Stack>
      </Container>
    );
  }
  return (
    <Container>
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        spacing={4}
      >
        <Typography>Question {questionNumber + 1}:</Typography>
        <Typography>{data.results[questionNumber].question}</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {data.results[questionNumber].all_choices.map((answer, index) => (
            <Grid item key={index}>
              <Button variant="outlined" onClick={handleChoiceClick}>
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Play;
