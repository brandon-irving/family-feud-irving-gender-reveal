import { SoundNames } from '@/lib/types';
import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../convex/_generated/api';

type UseHandleAppEventsType = {
  isHost?: boolean;
  onWhoBuzzedFirst?: (teamName: string) => void;
  onSound?: (soundName: SoundNames) => void;
};
export default function useHandleAppEvents({
  onWhoBuzzedFirst,
  onSound,
  isHost,
}: UseHandleAppEventsType) {
  const appEvents = useQuery(api.appEvents.getAppEvent);
  const createAppEvent = useMutation(api.appEvents.createAppEvent);
  const removeAppEvent = useMutation(api.appEvents.removeAppEvent);

  async function addSoundEvent(soundName: SoundNames) {
    await createAppEvent({
      event: 'sound',
      soundName,
    });
  }

  async function addWhoBuzzedFirstEvent(teamName: string) {
    await createAppEvent({
      event: 'whoBuzzedFirst',
      teamName,
    });
  }

  function handleOnAppEvent() {
    if (!appEvents || !isHost) return;
    if (appEvents.event === 'sound' && appEvents.soundName) {
      onSound?.(appEvents.soundName);
      removeAppEvent({ _id: appEvents._id });
    }
    if (appEvents.event === 'whoBuzzedFirst' && appEvents.teamName) {
      onWhoBuzzedFirst?.(appEvents.teamName);
    }
  }

  function handleRemoveAppEvent() {
    if (!appEvents) return;
    removeAppEvent({ _id: appEvents._id });
  }
  useEffect(() => {
    handleOnAppEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appEvents]);
  return {
    appEvents,
    addSoundEvent,
    addWhoBuzzedFirstEvent,
    removeAppEvent: handleRemoveAppEvent,
  };
}
