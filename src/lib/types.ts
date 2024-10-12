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
