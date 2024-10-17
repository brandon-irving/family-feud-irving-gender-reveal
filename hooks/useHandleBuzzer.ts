import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export default function useHandleBuzzer() {
  const buzzer = useQuery(api.buzzer.getFirstToBuzz);
  const removeFirstToBuzzInternal = useMutation(api.buzzer.removeFirstToBuzz);
  async function removeFirstToBuzz() {
    if (!buzzer?._id) return;
    await removeFirstToBuzzInternal({ _id: buzzer?._id });
  }
  return {
    buzzer,
    removeFirstToBuzz,
  };
}
