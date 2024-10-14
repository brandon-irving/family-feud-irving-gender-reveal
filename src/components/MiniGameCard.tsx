import { miniGames } from '@/lib/data';

const MiniGameCard = ({ miniGameTitle }: { miniGameTitle: string }) => {
  const miniGame = miniGames.find((game) => game.title === miniGameTitle);
  if (!miniGame) {
    return null;
  }
  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-4 text-blue-600'>
        {miniGame.title}
      </h2>
      <div className='mb-4'>
        <h3 className='font-semibold text-gray-700'>Items Needed:</h3>
        <ul className='list-disc list-inside text-gray-600'>
          {miniGame.itemsNeeded.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className='mb-4'>
        <h3 className='font-semibold text-gray-700'>Setup:</h3>
        <p className='text-gray-600'>{miniGame.setup}</p>
      </div>
      <div>
        <h3 className='font-semibold text-gray-700'>Rules:</h3>
        <p className='text-gray-600'>{miniGame.rules}</p>
      </div>
    </div>
  );
};

export default MiniGameCard;
