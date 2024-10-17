import { Question } from '@/lib/types';

export const CurrentQuestion = ({ question }: { question: Question }) => (
  <div className='text-4xl text-center font-bold py-6 px-6 bg-blue-600 text-white rounded-lg shadow-lg'>
    {question.questionText}
  </div>
);
