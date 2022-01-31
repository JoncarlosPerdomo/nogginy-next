import React, { useState } from 'react';
import Button from '@/components/outlineButton';
const single = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);

  return (
    <div className="fixed h-full w-full bg-sky-400 text-center font-Catamaran">
      <div>
        <label className="text-3xl text-white" htmlFor="trivia_difficulty">
          Choose a Difficulty:
        </label>
      </div>
      <div>
        <select onChange={() => setDifficulty(e.target.value)} name="trivia_difficulty" data-testid="difficulty">
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label className="text-3xl text-white" htmlFor="trivia_category">
          Choose a Category:
        </label>
      </div>

      {/* <CategorySelection
          categoryHandler={() => setCategory(e.target.value)}
        /> */}

      <Button onClick={() => setGameStart(true)}>Play Game</Button>
    </div>
  );
};

export default single;
