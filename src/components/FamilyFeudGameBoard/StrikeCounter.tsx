import { Strike } from '@/lib/types';

export const StrikeCounter = ({
  strikes,
  onStrikeClick,
}: {
  strikes: Strike[];
  onStrikeClick?: (isClicked: boolean) => void;
}) => (
  <div className=' hover:cursor-pointer flex items-center space-x-4 justify-center mt-4'>
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        onClick={() => onStrikeClick?.(strikes.length > index)}
        className={`text-5xl font-bold ${
          strikes.length > index ? 'text-red-600' : 'text-gray-300'
        }`}
      >
        X
      </div>
    ))}
  </div>
);
