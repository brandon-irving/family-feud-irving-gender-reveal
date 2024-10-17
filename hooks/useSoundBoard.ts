import useSound from 'hooks/useSound';

export default function useSoundBoard() {
  const applauseFx = useSound('/sounds/applause.mp3');
  const buzzedInFx = useSound('/sounds/buzzedIn.mp3');
  const faceOffFx = useSound('/sounds/faceOff.mp3');
  const incorrectFx = useSound('/sounds/incorrect.mp3');
  const correctFx = useSound('/sounds/correct.mp3');
  const themeSongFx = useSound('/sounds/themeSong.mp3');
  return {
    applauseFx,
    buzzedInFx,
    faceOffFx,
    incorrectFx,
    correctFx,
    themeSongFx,
  };
}
