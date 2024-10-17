'use client';
import useHandleAppEvents from 'hooks/useHandleAppEvents';
import { FC } from 'react';

const SoundBoard: FC = () => {
  const { addSoundEvent } = useHandleAppEvents({});

  const buttons = [
    { label: 'Applause', play: () => addSoundEvent('applause') },
    { label: 'Theme Song', play: () => addSoundEvent('themeSong') },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col justify-center items-center p-4'>
      <div className='grid grid-cols-2 gap-4'>
        {buttons.map((button) => (
          <button
            key={button.label}
            onClick={() => button.play()} // Wrap play in an arrow function
            className='bg-yellow-400 text-black py-4 px-6 rounded-lg shadow-lg text-lg font-bold transform hover:scale-105 transition-transform'
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundBoard;
