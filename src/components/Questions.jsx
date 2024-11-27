import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './questions.css';
import play from '../assets/src_sounds_play.mp3';
import correct from '../assets/src_sounds_correct.mp3';
import wrong from '../assets/src_sounds_wrong.mp3';
import winner from '../assets/src_sounds_winner.mp3';

export default function Questions({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState('answer');
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [winnerMusic] = useSound(winner);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    if (data[questionNumber - 1] === undefined) {
      setStop(true);
      winnerMusic();
    }
  }, [data, questionNumber, setStop, winnerMusic]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = a => {
    setSelectedAnswer(a);
    setClassName('answer active');
    delay(1000, () =>
      setClassName(a.correct ? 'answer correct' : 'answer wrong')
    );
    delay(2000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber(prev => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className='Questions'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map((answer, i) => (
          <div
            key={i}
            className={selectedAnswer === answer ? className : 'answer'}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}
