import { miniGames, questions } from '@/lib/data';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export default function useGenderRevealGame() {
  const initialMiniGameTitles = miniGames.map((game) => game.title);

  const initialMiniGameTitle =
    initialMiniGameTitles[
      Math.floor(Math.random() * initialMiniGameTitles.length)
    ];

  const initialQuestion =
    questions[Math.floor(Math.random() * questions.length)];

  const initialGenderRevealGame = {
    currentQuestion: initialQuestion,
    revealedAnswers: new Array(initialQuestion.answers.length).fill(false),
    isCountdown: false,
    isTimeUp: false,
    isMiniGame: false,
    currentMiniGameTitle: initialMiniGameTitle,
    miniGameTitles: initialMiniGameTitles,
    showAddMiniGamePointsButton: false,
    strikes: [],
    teams: [
      { name: 'Team Boy', score: 0, isActive: true },
      { name: 'Team Girl', score: 0, isActive: false },
    ],
  };
  const genderRevealGame = useQuery(api.gameState.getGenderRevealGame);
  const updateGenderRevealGame = useMutation(
    api.gameState.updateGenderRevealGame,
  );
  const insertGenderRevealGame = useMutation(
    api.gameState.insertGenderRevealGame,
  );
  async function initializeGame() {
    await insertGenderRevealGame(initialGenderRevealGame);
  }
  return {
    genderRevealGame,
    updateGenderRevealGame,
    initializeGame,
    initialMiniGameTitles,
    initialMiniGameTitle,
    initialGenderRevealGame,
    loading: genderRevealGame === undefined,
  };
}
