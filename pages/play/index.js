import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { decode } from "html-entities";

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
    <Container maxWidth="xl">
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography>Question {questionNumber + 1}:</Typography>
        <Typography>{data.results[questionNumber].question}</Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          style={{ minWidth: "100vw" }}
        >
          {data.results[questionNumber].all_choices.map((answer, index) => (
            <Button variant="outlined" key={index} onClick={handleChoiceClick}>
              {answer}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Play;
