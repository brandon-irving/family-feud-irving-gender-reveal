// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
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
