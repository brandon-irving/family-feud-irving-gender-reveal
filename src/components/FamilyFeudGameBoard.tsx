'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { Answer, Question, Strike, Team } from '@/lib/types';

const TeamScore = ({
  team,
  onSelect,
  onReceivePoints,
}: {
  team: Team;
  onSelect: () => void;
  onReceivePoints: () => void;
}) => (
  <div
    className={`flex flex-col items-center bg-blue-700 p-6 rounded-lg shadow-lg cursor-pointer ${
      team.isActive ? 'border-4 border-yellow-400' : ''
    }`}
    onClick={onSelect}
  >
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

const CurrentQuestion = ({ question }: { question: Question }) => (
  <div className='text-4xl text-center font-bold py-6 px-6 bg-blue-600 text-white rounded-lg shadow-lg'>
    {question.questionText}
  </div>
);

const AnswerSlot = ({
  answer,
  isRevealed,
  index,
  onClickReveal,
}: {
  answer: Answer;
  isRevealed: boolean;
  index: number;
  onClickReveal: () => void;
}) => (
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
      style={{ transform: 'scale(-1, 1)', backfaceVisibility: 'hidden' }} // Prevent reversed number issue
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
  </motion.div>
);

const StrikeCounter = ({ strikes }: { strikes: Strike[] }) => (
  <div className='flex items-center space-x-4 justify-center mt-4'>
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className={`text-5xl font-bold ${
          strikes.length > index ? 'text-red-600' : 'text-gray-300'
        }`}
      >
        X
      </div>
    ))}
  </div>
);

const NextRoundButton = ({ onNextRound }: { onNextRound: () => void }) => (
  <button
    className='mt-6 bg-yellow-500 text-blue-900 py-3 px-6 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-400 transition-colors duration-200'
    onClick={onNextRound}
  >
    Next Round
  </button>
);

const ResetScoresButton = ({
  onResetScores,
}: {
  onResetScores: () => void;
}) => (
  <button
    className='mt-4 bg-red-500 text-white py-2 px-4 rounded-full text-sm font-bold shadow-lg hover:bg-red-400 transition-colors duration-200'
    onClick={onResetScores}
  >
    Reset Scores
  </button>
);

export default function GameBoard() {
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Team A', score: 0, isActive: true },
    { name: 'Team B', score: 0, isActive: false },
  ]);
  const [currentQuestion] = useState<Question>({
    id: '1',
    questionText: 'Name something people do to relax after a long day.',
    answers: [
      { text: 'Watch TV', points: 30 },
      { text: 'Take a bath', points: 25 },
      { text: 'Read a book', points: 20 },
      { text: 'Listen to music', points: 15 },
      { text: 'Exercise', points: 5 },
      { text: 'Meditate', points: 5 },
    ],
  });
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    new Array(currentQuestion.answers.length).fill(false),
  );
  const [strikes, setStrikes] = useState<Strike[]>([]);

  // Get the sum of revealed answers
  const revealedPoints = currentQuestion.answers
    .filter((_, index) => revealedAnswers[index])
    .reduce((sum, answer) => sum + answer.points, 0);

  const handleNextRound = () => {
    setRevealedAnswers(new Array(currentQuestion.answers.length).fill(false));
    setStrikes([]);
    alert('Moving to next round!');
  };

  const handleResetScores = () => {
    setTeams(teams.map((team) => ({ ...team, score: 0 })));
    setStrikes([]);
  };

  const handleRevealAnswer = (index: number) => {
    if (!revealedAnswers[index]) {
      const newRevealedAnswers = [...revealedAnswers];
      newRevealedAnswers[index] = true;
      setRevealedAnswers(newRevealedAnswers);
    }
  };

  const handleAddStrike = () => {
    if (strikes.length < 3) {
      setStrikes([
        ...strikes,
        { teamName: 'Current Team', count: strikes.length + 1 },
      ]);
    }
  };

  const handleTeamSelect = (index: number) => {
    setTeams(teams.map((team, i) => ({ ...team, isActive: i === index })));
  };

  const handleReceivePoints = () => {
    const activeTeamIndex = teams.findIndex((team) => team.isActive);
    const newTeams = [...teams];
    newTeams[activeTeamIndex].score += revealedPoints;
    setTeams(newTeams);
  };

  return (
    <div className='min-h-screen bg-blue-900 text-white p-8'>
      <div className='grid grid-cols-3 gap-8 mb-3'>
        <TeamScore
          team={teams[0]}
          onSelect={() => handleTeamSelect(0)}
          onReceivePoints={handleReceivePoints}
        />
        <div className=' flex justify-between flex-col'>
          <div className='text-center text-3xl'>
            Total Revealed Points:{' '}
            <span className='font-bold'>{revealedPoints}</span>
          </div>
          <div className='flex justify-between mt-8 space-x-4'>
            <button
              className='bg-green-500 text-white p-4 rounded-full text-lg font-bold shadow-lg hover:bg-green-400 transition-colors duration-200'
              onClick={() => handleRevealAnswer(revealedAnswers.indexOf(false))}
            >
              <FaCheckCircle className='text-2xl' />
            </button>

            <button
              className='bg-red-500 text-white p-4 rounded-full text-lg font-bold shadow-lg hover:bg-red-400 transition-colors duration-200'
              onClick={handleAddStrike}
            >
              <FaTimesCircle className='text-2xl' />
            </button>
          </div>
          <StrikeCounter strikes={strikes} />
        </div>
        <TeamScore
          team={teams[1]}
          onSelect={() => handleTeamSelect(1)}
          onReceivePoints={handleReceivePoints}
        />
      </div>

      <CurrentQuestion question={currentQuestion} />

      <div className='grid grid-cols-2 gap-4 mt-8'>
        {currentQuestion.answers.map((answer, index) => (
          <AnswerSlot
            key={index}
            answer={answer}
            isRevealed={revealedAnswers[index]}
            index={index}
            onClickReveal={() => handleRevealAnswer(index)}
          />
        ))}
      </div>

      <div></div>

      <div className='absolute bottom-0  right-0'>
        <NextRoundButton onNextRound={handleNextRound} />
      </div>
      <div className=' absolute top-0  right-0'>
        <ResetScoresButton onResetScores={handleResetScores} />
      </div>
    </div>
  );
}
