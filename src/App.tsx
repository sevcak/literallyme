import { useState, useEffect } from 'react';

import personalities from './data/personalities.json';
import { getRandomInt } from './utils/random';

interface Personality {
  id?: number,
  name: string,
  link: string,
  img: string,
  from?: {
    title: string,
    link: string
  }
}

const App = () => {
  const [personality, setPersonality] = useState<Personality | undefined>(undefined);
  const [isRolling, setIsRolling] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(100); // Initial interval duration in milliseconds

  const newPersonality = () => {
    const newPersonalityId = getRandomInt(0, personalities.length, personality?.id || undefined);
    setPersonality({
      ...personalities[newPersonalityId],
      id: newPersonalityId
    });
  }

  useEffect(() => {
    // newPersonality();
    setIsRolling(true);
  }, []);

  useEffect(() => {
    if (isRolling) {
      const intervalId = setInterval(newPersonality, intervalDuration);

      // Gradually slow down the interval duration
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setIsRolling(false);
      }, 5000); // Stop after 5 seconds

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isRolling, intervalDuration]);

  return (
    <div
      className='w-screen h-screen flex flex-col p-6 pt-48 items-center text-center gap-2 text-2xl'
    >
      <p>this month, you're literally:</p>
      {
        personality &&
        <div className='flex flex-col gap-6 items-center'>
          <h1>
            <a href={personality.link}>{personality.name}</a>
          </h1>
          <img
            src={personality.img} alt={personality.name}
            className='w-64 h-64 object-cover object-top rounded-lg'
          />
          {
            (!isRolling && personality.from) &&
            <div className='space-y-2'>
              <p>from</p>
              <h2>
                <a href={personality.from.link}>{personality.from.title}</a>
              </h2>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default App;
