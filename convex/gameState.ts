import { mutation, query } from 'convex/_generated/server';
import { v } from 'convex/values';

export const getGenderRevealGame = query({
  handler: async (ctx) => {
    const genderRevealGame = await ctx.db.query('genderRevealGame').collect();
    return genderRevealGame[0];
  },
});

export const updateGenderRevealGame = mutation({
  args: {
    teams: v.optional(
      v.array(
        v.object({
          name: v.string(),
          score: v.number(),
          isActive: v.boolean(),
        }),
      ),
    ),
    _id: v.id('genderRevealGame'),
    currentMiniGameTitle: v.optional(v.string()),
    miniGameTitles: v.optional(v.array(v.string())),
    isCountdown: v.optional(v.boolean()),
    isMiniGame: v.optional(v.boolean()),
    isTimeUp: v.optional(v.boolean()),
    showAddMiniGamePointsButton: v.optional(v.boolean()),
    revealedAnswers: v.optional(v.array(v.boolean())),
    strikes: v.optional(
      v.array(
        v.object({
          teamName: v.string(),
          count: v.number(),
        }),
      ),
    ),
    currentQuestion: v.optional(
      v.object({
        id: v.string(),
        questionText: v.string(),
        answers: v.array(
          v.object({
            text: v.string(),
            points: v.number(),
          }),
        ),
      }),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, args);
  },
});

export const insertGenderRevealGame = mutation({
  args: {
    currentMiniGameTitle: v.string(),
    miniGameTitles: v.array(v.string()),
    isCountdown: v.boolean(),
    isMiniGame: v.boolean(),
    isTimeUp: v.boolean(),
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
    teams: v.array(
      v.object({
        name: v.string(),
        score: v.number(),
        isActive: v.boolean(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('genderRevealGame', args);
  },
});
