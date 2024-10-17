'use client';

import useGenderRevealGame from 'hooks/useGenderRevealGame';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaWindowClose,
} from 'react-icons/fa';

import { questions } from '@/lib/data';
import { Question, Strike, Team } from '@/lib/types';

import { AnswerSlot } from '@/components/FamilyFeudGameBoard/AnswerSlot';
import { CurrentQuestion } from '@/components/FamilyFeudGameBoard/CurrentQuestion';
import { StrikeCounter } from '@/components/FamilyFeudGameBoard/StrikeCounter';

import { NewGameButton } from '@/components/FamilyFeudGameBoard/NewGameButton';
import { NextRoundButton } from '@/components/FamilyFeudGameBoard/NextRoundButton';
import { TeamScore } from '@/components/FamilyFeudGameBoard/TeamScore';
import MiniGameCard from '@/components/MiniGameCard';
import useHandleAppEvents from 'hooks/useHandleAppEvents';
import useSoundBoard from 'hooks/useSoundBoard';

export default function FamilyFeudGameBoard() {
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const {
    correctFx,
    incorrectFx,
    faceOffFx,
    applauseFx,
    themeSongFx,
    buzzedInFx,
  } = useSoundBoard();

  const {
    initialGenderRevealGame,
    genderRevealGame,
    updateGenderRevealGame,
    initialMiniGameTitle,
    initialMiniGameTitles,
    initializeGame,
  } = useGenderRevealGame();

  const [gameQuestions, setGameQuestions] = useState<Question[]>(questions);
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  const [miniGameTitles, setMiniGameTitles] = useState<string[]>(
    initialMiniGameTitles,
  );
  const params = useSearchParams();
  const isHost = params.get('isHost');

  const { appEvents, removeAppEvent } = useHandleAppEvents({
    onWhoBuzzedFirst: (teamName: string) => {
      buzzedInFx?.play();
      if (teamName || !genderRevealGame?.teams) return;
      const teamIndex = genderRevealGame.teams.findIndex(
        (team) => team.name === teamName,
      );
      if (teamIndex !== -1) {
        setTeams(
          genderRevealGame.teams.map((team, i) => ({
            ...team,
            isActive: i === teamIndex,
          })),
        );
      }
    },
    onSound: (soundName: 'applause' | 'themeSong') => {
      if (soundName === 'applause') {
        applauseFx?.play();
      } else if (soundName === 'themeSong') {
        themeSongFx?.play();
      }
    },
  });

  const buzzer = appEvents?.teamName
    ? {
        _id: appEvents._id,
        teamName: appEvents.teamName,
      }
    : undefined;

  async function setTeams(teams: Team[]) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      teams,
    });
  }
  async function setQuestion(currentQuestion: Question) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      currentQuestion,
    });
  }

  async function setRevealedAnswers(revealedAnswers: boolean[]) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      revealedAnswers,
    });
  }

  async function setStrikes(strikes: Strike[]) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      strikes,
    });
  }

  async function setIsCountdown(isCountdown: boolean) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      isCountdown,
    });
  }
  async function setIsTimeUp(isTimeUp: boolean) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      isTimeUp,
    });
  }
  async function setIsMiniGame(isMiniGame: boolean) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      isMiniGame,
    });
  }

  async function setCurrentMiniGameTitle(currentMiniGameTitle: string) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      currentMiniGameTitle,
    });
  }

  async function setShowAddMiniGamePointsButton(
    showAddMiniGamePointsButton: boolean,
  ) {
    if (!genderRevealGame) return;
    await updateGenderRevealGame({
      _id: genderRevealGame._id,
      showAddMiniGamePointsButton,
    });
  }

  const handleNextRound = () => {
    faceOffFx?.play();
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

  const handleRestartGame = async () => {
    setLoading(true);
    const initialQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    // reset all state back to original state
    setIsMiniGame(false);
    setShowAddMiniGamePointsButton(false);
    setCurrentMiniGameTitle(initialMiniGameTitle);
    setMiniGameTitles(initialMiniGameTitles);
    setIsCountdown(false);
    setIsTimeUp(false);
    setRevealedAnswers(new Array(initialQuestion.answers.length).fill(false));
    setQuestion(initialQuestion);
    setGameQuestions(questions);
    setTeams(teams.map((team) => ({ ...team, score: 0 })));
    setStrikes([]);
    setLoading(false);
  };

  const handleRevealAnswer = (index: number) => {
    if (!revealedAnswers[index]) {
      correctFx?.play();
      const newRevealedAnswers = [...revealedAnswers];
      newRevealedAnswers[index] = true;
      setRevealedAnswers(newRevealedAnswers);
    } else {
      const newRevealedAnswers = [...revealedAnswers];
      newRevealedAnswers[index] = false;
      setRevealedAnswers(newRevealedAnswers);
    }
  };

  const handleAddStrike = () => {
    if (strikes.length < 3) {
      incorrectFx?.play();
      setStrikes([
        ...strikes,
        {
          teamName: teams.find((team) => team.isActive)?.name || '',
          count: strikes.length + 1,
        },
      ]);
    }
  };

  const handleTeamSelect = (index: number) => {
    setTeams(teams.map((team, i) => ({ ...team, isActive: i === index })));
  };

  const handleReceivePoints = (manualPoints?: number) => {
    const activeTeamIndex = teams.findIndex((team) => team.isActive);
    const newTeams = [...teams];
    const score = Number(newTeams[activeTeamIndex].score);
    const _revealedPoints = manualPoints || revealedPoints;
    newTeams[activeTeamIndex].score = score + _revealedPoints;
    setTeams(newTeams);
    if (manualPoints && isMiniGame) {
      setMiniGameTitles(
        miniGameTitles.filter((word) => word !== currentMiniGameTitle),
      );
      setIsMiniGame(false);
      setShowAddMiniGamePointsButton(false);
    }
  };

  async function initializeCountdown() {
    await setIsCountdown(true);
  }
  const startCountdown = () => {
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

  const startMiniGame = async () => {
    await removeAppEvent();
    setIsMiniGame(true); // Activate mini-game
    const shuffleInterval = setInterval(() => {
      const randomWord =
        miniGameTitles[Math.floor(Math.random() * miniGameTitles.length)];
      setCurrentMiniGameTitle(randomWord); // Shuffle miniGameTitles
    }, 100); // Shuffle every 100ms

    setTimeout(() => {
      clearInterval(shuffleInterval); // Stop shuffling after 6 seconds
      setTimeout(() => {
        setShowAddMiniGamePointsButton(true);
      }, 1000); // Remove dimming after 1 second
    }, 4000); // Shuffle for 6 seconds
  };

  function handleStrikeClick(isClicked: boolean) {
    if (isClicked) {
      // remove strike
      setStrikes(strikes.slice(0, -1));
    } else {
      handleAddStrike();
    }
  }

  useEffect(() => {
    if (genderRevealGame?.isCountdown) {
      startCountdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderRevealGame?.isCountdown]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (genderRevealGame === null) {
      initializeGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderRevealGame]);

  if (!hasMounted || !genderRevealGame) {
    return null;
  }
  const {
    currentQuestion,
    revealedAnswers,
    currentMiniGameTitle,
    isCountdown,
    isTimeUp,
    isMiniGame,
    showAddMiniGamePointsButton,
    strikes,
    teams = initialGenderRevealGame.teams,
  } = genderRevealGame;

  const revealedPoints = currentQuestion.answers
    .filter((_, index) => revealedAnswers[index])
    .reduce((sum, answer) => sum + answer.points, 0);

  const totalPoints = currentQuestion.answers.reduce(
    (sum, answer) => sum + answer.points,
    0,
  );
  return (
    <div className='min-h-screen bg-blue-900 text-white p-8 relative'>
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-black-500 mb-4'></div>
        </div>
      )}
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
                setCurrentMiniGameTitle;
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
              <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-4'>
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
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        {currentQuestion.answers.map((answer, index) => (
          <AnswerSlot
            key={index}
            isHost={isHost === 'true'}
            answer={answer}
            isRevealed={revealedAnswers[index]}
            index={index}
            onClickReveal={() => handleRevealAnswer(index)}
          />
        ))}
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8 mt-3'>
        <TeamScore
          isBuzzedFirst={buzzer?.teamName === teams[0].name}
          team={teams[0]}
          onSelect={() => handleTeamSelect(0)}
          onReceivePoints={() => handleReceivePoints()}
        />
        <div className='flex justify-between flex-col'>
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
              onClick={initializeCountdown}
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
          <StrikeCounter strikes={strikes} onStrikeClick={handleStrikeClick} />
        </div>
        <TeamScore
          isBuzzedFirst={buzzer?.teamName === teams[1].name}
          team={teams[1]}
          onSelect={() => handleTeamSelect(1)}
          onReceivePoints={() => handleReceivePoints()}
        />
      </div>
      <div className='absolute bottom-0 right-0'>
        <NextRoundButton onNextRound={handleNextRound} />
      </div>
      <div className='absolute top-0 left-0'>
        <NewGameButton onRestartGame={handleRestartGame} />
      </div>
      <div className='absolute top-0 right-0'>
        <button
          className='bg-blue-500 text-white p-4 rounded-full text-lg font-bold shadow-lg hover:bg-blue-400 transition-colors duration-200'
          onClick={startMiniGame}
        >
          Mini Game
        </button>
      </div>
    </div>
  );
}
