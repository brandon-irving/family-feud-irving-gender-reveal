import { Team } from '@/lib/types';
import useHandleAppEvents from 'hooks/useHandleAppEvents';

export const TeamScore = ({
  isBuzzedFirst,
  team,
  onSelect,
  onReceivePoints,
}: {
  isBuzzedFirst?: boolean;
  team: Team;
  onSelect: () => void;
  onReceivePoints: () => void;
}) => {
  const { removeAppEvent } = useHandleAppEvents({});

  return (
    <div
      className={` relative flex flex-col items-center bg-blue-700 p-6 rounded-lg shadow-lg cursor-pointer ${
        team.isActive ? 'border-4 border-yellow-400' : ''
      }`}
      onClick={onSelect}
    >
      {isBuzzedFirst && (
        <h2
          onClick={removeAppEvent}
          className=' absolute top-0 right-0 text-xl font-bold text-red-500'
        >
          Buzzed First!
        </h2>
      )}
      <h2 className='text-3xl font-bold text-yellow-400'>{team.name}</h2>
      <p className='text-4xl text-white'>{team.score} points</p>
      <button
        disabled={!team.isActive}
        style={{ opacity: team.isActive ? 1 : 0.5 }}
        className='mt-2 bg-green-500 text-white py-2 px-4 rounded-full text-lg font-bold shadow-lg hover:bg-green-400'
        onClick={onReceivePoints}
      >
        Receive Points
      </button>
    </div>
  );
};
