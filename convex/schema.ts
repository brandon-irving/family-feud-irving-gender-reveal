// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  appEvents: defineTable({
    event: v.union(v.literal('whoBuzzedFirst'), v.literal('sound')),
    teamName: v.optional(v.string()),
    soundName: v.optional(
      v.union(
        v.literal('applause'),
        v.literal('themeSong'),
        v.literal('correct'),
        v.literal('incorrect'),
        v.literal('buzzedIn'),
        v.literal('faceOff'),
      ),
    ),
  }),
  buzzer: defineTable({
    teamName: v.string(),
  }),
  genderRevealGame: defineTable({
    currentMiniGameTitle: v.string(),
    miniGameTitles: v.array(v.string()),
    isCountdown: v.boolean(),
    isMiniGame: v.boolean(),
    isTimeUp: v.boolean(),
    teams: v.array(
      v.object({
        name: v.string(),
        score: v.number(),
        isActive: v.boolean(),
      }),
    ),
    showAddMiniGamePointsButton: v.boolean(),
    revealedAnswers: v.array(v.boolean()),
    strikes: v.array(
      v.object({
        teamName: v.string(),
        count: v.number(),
      }),
    ),
    currentQuestion: v.object({
      id: v.string(),
      questionText: v.string(),
      answers: v.array(
        v.object({
          text: v.string(),
          points: v.number(),
        }),
      ),
    }),
  }),
});
