export type Team = {
  name: string;
  score: number;
  isActive: boolean;
};

export type Answer = {
  text: string;
  points: number;
};

export type Question = {
  id: string;
  questionText: string;
  answers: Answer[];
};

export type Strike = {
  teamName: string;
  count: number;
};

export type MiniGame = {
  title: string;
  itemsNeeded: string[];
  setup: string;
  rules: string;
};

export type GenderRevealGame = {
  currentMiniGameTitle: string;
  miniGameTitles: string[];
  isCountdown: boolean;
  isMiniGame: boolean;
  isTimeUp: boolean;
  showAddMiniGamePointsButton: boolean;
  revealedAnswers: boolean[];
  currentQuestion: Question;
  strikes: Strike[];
};

export type SoundNames =
  | 'applause'
  | 'themeSong'
  | 'correct'
  | 'incorrect'
  | 'buzzedIn'
  | 'faceOff';
