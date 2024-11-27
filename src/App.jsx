import { useState, useEffect, useMemo } from 'react';
import Questions from './components/Questions';
import './App.css';
// import Timer from './components/Timer';
import Start from './components/Start';
import { data } from './data';
import logo from './assets/logo.png';

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('₹ 0');

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: '₹ 1,000' },
        { id: 2, amount: '₹ 3,000' },
        { id: 3, amount: '₹ 5,000' },
        { id: 4, amount: '₹ 8,000' },
        { id: 5, amount: '₹ 10,000' },
        { id: 6, amount: '₹ 25,000' },
        { id: 7, amount: '₹ 50,000' },
        { id: 8, amount: '₹ 1,00,000' },
        { id: 9, amount: '₹ 3,00,000' },
        { id: 10, amount: '₹ 6,25,000' },
        { id: 12, amount: '₹ 12,50,000' },
        { id: 13, amount: '₹ 25,00,000' },
        { id: 14, amount: '₹ 50,00,000' },
        { id: 15, amount: '₹ 1,00,00,000' },
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
            <div className='logo-container'>
              <img className='logo' src={logo} alt='logo' />
            </div>
            {stop ? (
              <h1 className='endText'>
                {username} earned: {earned}
              </h1>
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
                  key={money.id}
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
