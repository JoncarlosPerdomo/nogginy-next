import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
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
  const [gameFinished, setGameFinished] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        data.results.map((obj) => {
          obj.correct = false;
          obj.all_choices = obj.incorrect_answers;
          obj.all_choices.push(obj.correct_answer);
          shuffle(obj.all_choices);
        });
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
      <div>
        {data.results.map((question, index) => (
          <Typography key={index}>
            Question {index + 1}: {question.correct ? "correct" : "incorrect"}
          </Typography>
        ))}
        <Link href="/" passHref>
          <Button variant="outlined">Home</Button>
        </Link>
      </div>
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
        <Stack direction="row" spacing={2}>
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
