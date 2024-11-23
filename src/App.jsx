import { useState, useEffect, useMemo } from 'react';
import Questions from './components/Questions';
import './App.css';
// import Timer from './components/Timer';
import Start from './components/Start';
import { data } from './data';

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('$ 0');

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: '₹ 100' },
        { id: 2, amount: '₹ 200' },
        { id: 3, amount: '₹ 300' },
        { id: 4, amount: '₹ 500' },
        { id: 5, amount: '₹ 1,000' },
        { id: 6, amount: '₹ 2,000' },
        { id: 7, amount: '₹ 4,000' },
        { id: 8, amount: '₹ 8,000' },
        { id: 9, amount: '₹ 16,000' },
        { id: 10, amount: '₹ 32,000' },
        { id: 11, amount: '₹ 64,000' },
        { id: 12, amount: '₹ 125,000' },
        { id: 13, amount: '₹ 250,000' },
        { id: 14, amount: '₹ 500,000' },
        { id: 15, amount: '₹ 1,000,000' },
        { id: 16, amount: '₹ 1,250,000' },
        { id: 17, amount: '₹ 1,5000,000' },
        { id: 18, amount: '₹ 1,750,000' },
        { id: 19, amount: '₹ 2,000,000' },
        { id: 20, amount: '₹ 3,000,000' },
        { id: 21, amount: '₹ 5,000,000' },
      ].reverse(),
    []
  );

  useEffect(() => {
    // Show the previous question's amount unless user is on the first question
    questionNumber > 1 &&
      setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className='App'>
      {username ? (
        <>
          <div className='main'>
            {stop ? (
              <h1 className='endText'>You earned: {earned}</h1>
            ) : (
              <>
                <div className='top'>
                  {/* <div className='timer'>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div> */}
                </div>
                <div className='bottom'>
                  <Questions
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className='pyramid'>
            <ul className='moneyList'>
              {moneyPyramid.map(money => (
                <li
                  className={
                    questionNumber === money.id
                      ? 'moneyListItem active'
                      : 'moneyListItem'
                  }
                >
                  <span className='moneyListItemNumber'>{money.id}</span>
                  <span className='moneyListItemNumber'>{money.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
