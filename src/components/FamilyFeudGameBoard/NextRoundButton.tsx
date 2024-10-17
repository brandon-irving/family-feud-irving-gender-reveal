export const NextRoundButton = ({
  onNextRound,
}: {
  onNextRound: () => void;
}) => (
  <button
    className='mt-6 bg-yellow-500 text-blue-900 py-3 px-6 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-400 transition-colors duration-200'
    onClick={onNextRound}
  >
    Next Round
  </button>
);
