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
  const intervalDuration = 100; // Initial interval duration in milliseconds

  // set new personality state
  const newPersonality = () => {
    const newPersonalityId = getRandomInt(0, personalities.length, personality?.id || undefined);
    setPersonality({
      ...personalities[newPersonalityId],
      id: newPersonalityId
    });
  }

  // when component mounts, roll a personality
  useEffect(() => {
    setIsRolling(true);
  }, []);

  // roll a new personality with visual jumps
  useEffect(() => {
    if (isRolling) {
      const intervalId = setInterval(newPersonality, intervalDuration);

      // gradually slow down the interval duration
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
      className='w-screen min-h-screen flex flex-col p-6 md:pt-16 lg:pt-28 xl:pt-36 items-center text-center gap-4 text-2xl'
    >
      <p>this month, you're literally:</p>
      {
        personality &&
        <div className={`flex flex-col gap-6 items-center ${isRolling ? 'scale-90' : ''} duration-200`}>
          <h1 className='max-sm:text-3xl max-sm:font-bold max-sm:-mx-4'>
            {
              isRolling
              ? <p>{personality.name}</p> 
              : <a href={personality.link}>{personality.name}</a>
            }
          </h1>
          {
            isRolling
            ? (
              <img
                src={personality.img} alt={personality.name}
                className='w-64 h-64 object-cover object-top rounded-lg'
              />
            ) : (
              <a href={personality.img} className='hover:brightness-150 hover:contrast-50'>
              <img
                src={personality.img} alt={personality.name}
                className='w-64 h-64 object-cover object-top rounded-lg'
              />
              </a>
            )
          }
          {
            (!isRolling && personality.from) &&
            <div className='space-y-2'>
              <p>from</p>
              <h2 className='max-sm:text-2xl max-sm:font-bold'>
                <a href={personality.from.link}>{personality.from.title}</a>
              </h2>
            </div>
          }
        </div>
      }
      {
          !isRolling &&
          // Buttons
          <div className='mt-10'>
            <button
              className='bg-gray-200 text-sm p-1 px-2'
              onClick={() => setIsRolling(true)}
            >
              nuh uh?
            </button>
          </div>
      }
      <p className='absolute bottom-8 text-sm'>
        coded by <a href="https://github.com/sevcak" className='font-bold hover:underline underline-offset-4'>sevcak</a>
      </p>
    </div>
  );
}

export default App;
