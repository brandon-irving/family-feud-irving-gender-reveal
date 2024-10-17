import { Answer } from '@/lib/types';
import { motion } from 'framer-motion';

export const AnswerSlot = ({
  answer,
  isRevealed,
  index,
  onClickReveal,
  isHost,
}: {
  answer: Answer;
  isRevealed: boolean;
  index: number;
  onClickReveal: () => void;
  isHost?: boolean;
}) => (
  <>
    <motion.div
      className='bg-blue-500 rounded-lg shadow-lg overflow-hidden relative h-24 cursor-pointer'
      initial={false}
      animate={{ rotateY: isRevealed ? 0 : 180 }}
      transition={{ duration: 0.6 }}
      onClick={onClickReveal}
      style={{ perspective: '1000px' }} // Add perspective for 3D effect
    >
      {/* Hidden State (Shown initially) */}
      <div
        className={`absolute inset-0 flex justify-center items-center p-4 ${
          isRevealed ? 'hidden' : 'flex'
        }`}
        style={{ transform: 'scale(-1, 1)', backfaceVisibility: 'hidden' }}
      >
        <span className='text-white text-2xl'>{index + 1}</span>
      </div>

      {/* Revealed State */}
      <div
        className={`absolute inset-0 flex justify-between items-center p-4 ${
          isRevealed ? 'flex' : 'hidden'
        }`}
        style={{ backfaceVisibility: 'hidden' }} // Ensure the revealed side shows correctly
      >
        <span className='text-white text-2xl'>{answer.text}</span>
        <span className='text-yellow-400 text-2xl font-bold'>
          {answer.points}
        </span>
      </div>
      {isHost && !isRevealed && (
        <p
          style={{ transform: 'scale(-1, 1)' }}
          className='text-center text-lg font-bold mt-2 text-yellow-400'
        >
          ({answer.text})
        </p>
      )}
    </motion.div>
  </>
);
