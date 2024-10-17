export const NewGameButton = ({
  onRestartGame,
}: {
  onRestartGame: () => void;
}) => (
  <button
    className='mt-4 bg-red-500 text-white py-2 px-4 rounded-full text-sm font-bold shadow-lg hover:bg-red-400 transition-colors duration-200'
    onClick={onRestartGame}
  >
    Restart Game
  </button>
);
