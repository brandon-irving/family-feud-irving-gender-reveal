'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaWindowClose,
} from 'react-icons/fa';

import { miniGames, questions } from '@/lib/data';
import { Answer, Question, Strike, Team } from '@/lib/types';

import MiniGameCard from '@/components/MiniGameCard';

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

const NewGameButton = ({ onRestartGame }: { onRestartGame: () => void }) => (
  <button
    className='mt-4 bg-red-500 text-white py-2 px-4 rounded-full text-sm font-bold shadow-lg hover:bg-red-400 transition-colors duration-200'
    onClick={onRestartGame}
  >
    Restart Game
  </button>
);

const initialMiniGameTitles = miniGames.map((game) => game.title);

const initialMiniGameTitle =
  initialMiniGameTitles[
    Math.floor(Math.random() * initialMiniGameTitles.length)
  ];

const initialQuestion = questions[Math.floor(Math.random() * questions.length)];

export default function GameBoard() {
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Team Boy', score: 0, isActive: true },
    { name: 'Team Girl', score: 0, isActive: false },
  ]);
  const [gameQuestions, setGameQuestions] = useState<Question[]>(questions);
  const [currentQuestion, setQuestion] = useState<Question>(initialQuestion);
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    new Array(currentQuestion.answers.length).fill(false),
  );
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [isCountdown, setIsCountdown] = useState(false); // For showing countdown overlay
  const [isTimeUp, setIsTimeUp] = useState(false); // For showing "Times Up!"
  const [secondsLeft, setSecondsLeft] = useState<number>(5); // For countdown timer
  const [isMiniGame, setIsMiniGame] = useState(false); // Mini Game active state
  const [currentMiniGameTitle, setCurrentWord] =
    useState<string>(initialMiniGameTitle); // Current word in mini-game
  const [miniGameTitles, setMiniGameTitles] = useState<string[]>(
    initialMiniGameTitles,
  ); // List of miniGameTitles for the mini-game

  // Get the sum of revealed answers
  const [showAddMiniGamePointsButton, setShowAddMiniGamePointsButton] =
    useState(false);

  const revealedPoints = currentQuestion.answers
    .filter((_, index) => revealedAnswers[index])
    .reduce((sum, answer) => sum + answer.points, 0);

  const totalPoints = currentQuestion.answers.reduce(
    (sum, answer) => sum + answer.points,
    0,
  );

  const handleNextRound = () => {
    const newGameQuestions = gameQuestions.filter(
      (question) => question.id !== currentQuestion.id,
    );
    setGameQuestions(newGameQuestions);
    setQuestion(
      newGameQuestions[Math.floor(Math.random() * newGameQuestions.length)],
    );
    setRevealedAnswers(new Array(currentQuestion.answers.length).fill(false));
    setStrikes([]);
  };

  const handleRestartGame = () => {
    const initialQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    // reset all state back to original state
    setIsMiniGame(false);
    setShowAddMiniGamePointsButton(false);
    setCurrentWord(initialMiniGameTitle);
    setMiniGameTitles(initialMiniGameTitles);
    setIsCountdown(false);
    setIsTimeUp(false);
    setRevealedAnswers(new Array(initialQuestion.answers.length).fill(false));
    setQuestion(initialQuestion);
    setGameQuestions(questions);
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

  const handleReceivePoints = (manualPoints?: number) => {
    const activeTeamIndex = teams.findIndex((team) => team.isActive);
    const newTeams = [...teams];
    newTeams[activeTeamIndex].score += manualPoints || revealedPoints;
    setTeams(newTeams);
    if (manualPoints && isMiniGame) {
      setMiniGameTitles(
        miniGameTitles.filter((word) => word !== currentMiniGameTitle),
      );
      setIsMiniGame(false);
      setShowAddMiniGamePointsButton(false);
    }
  };

  const startCountdown = () => {
    setIsCountdown(true);
    setSecondsLeft(5); // Set initial countdown time
    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setIsCountdown(false);
          setIsTimeUp(true);
          setTimeout(() => setIsTimeUp(false), 1000); // Show "Times Up!" for 1 second
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second
  };

  const startMiniGame = () => {
    setIsMiniGame(true); // Activate mini-game
    const shuffleInterval = setInterval(() => {
      const randomWord =
        miniGameTitles[Math.floor(Math.random() * miniGameTitles.length)];
      setCurrentWord(randomWord); // Shuffle miniGameTitles
    }, 100); // Shuffle every 100ms

    setTimeout(() => {
      clearInterval(shuffleInterval); // Stop shuffling after 6 seconds
      setTimeout(() => {
        setShowAddMiniGamePointsButton(true);
      }, 1000); // Remove dimming after 1 second
    }, 4000); // Shuffle for 6 seconds
  };
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <div className='min-h-screen bg-blue-900 text-white p-8 relative'>
      {isCountdown && (
        <div className='absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <h1 className='text-5xl text-white'>{secondsLeft}</h1>
        </div>
      )}

      {isTimeUp && (
        <div className='absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <h1 className='text-5xl text-white'>Times Up!</h1>
        </div>
      )}
      <>
        {isMiniGame && (
          <div className='absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 flex-col w-full p-4'>
            <button
              onClick={() => {
                setIsMiniGame(false);
                setShowAddMiniGamePointsButton(false);
                setCurrentWord;
              }}
              className='absolute top-4 right-4'
            >
              <FaWindowClose className='text-2xl' />
            </button>
            <div className='text-center mb-6'>
              <h1 className='text-6xl font-bold text-white mb-4'>
                {currentMiniGameTitle}
              </h1>
              {showAddMiniGamePointsButton && (
                <p className='text-xl text-gray-200'>
                  Points:{' '}
                  <span className='font-semibold text-green-400'>
                    {Math.floor(totalPoints / 2)}
                  </span>
                </p>
              )}
            </div>
            {showAddMiniGamePointsButton && (
              <div className=' grid grid-cols-3 gap-4'>
                <MiniGameCard miniGameTitle={currentMiniGameTitle} />
                <TeamScore
                  team={teams[0]}
                  onSelect={() => handleTeamSelect(0)}
                  onReceivePoints={() =>
                    handleReceivePoints(Math.floor(totalPoints / 2))
                  }
                />

                <TeamScore
                  team={teams[1]}
                  onSelect={() => handleTeamSelect(1)}
                  onReceivePoints={() =>
                    handleReceivePoints(Math.floor(totalPoints / 2))
                  }
                />
              </div>
            )}
          </div>
        )}
      </>
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

      <div className='grid grid-cols-3 gap-8 mt-3'>
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
              className='bg-gray-500 text-white p-4 rounded-full text-lg font-bold shadow-lg hover:bg-gray-400 transition-colors duration-200'
              onClick={startCountdown} // Start countdown on click
            >
              <FaClock className='text-2xl' />
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
      <div className='absolute bottom-0  right-0'>
        <NextRoundButton onNextRound={handleNextRound} />
      </div>
      <div className=' absolute top-0  left-0'>
        <NewGameButton onRestartGame={handleRestartGame} />
      </div>
      <div className=' absolute top-0  right-0'>
        <button
          className='bg-blue-500 text-white p-4 rounded-full text-lg font-bold shadow-lg hover:bg-blue-400 transition-colors duration-200'
          onClick={startMiniGame} // Start Mini Game on click
        >
          Mini Game
        </button>
      </div>
    </div>
  );
}
