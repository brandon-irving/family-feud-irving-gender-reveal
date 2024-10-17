import { mutation, query } from 'convex/_generated/server';
import { v } from 'convex/values';

export const getFirstToBuzz = query({
  handler: async (ctx) => {
    const buzzer = await ctx.db.query('buzzer').collect();
    return buzzer[0];
  },
});

export const removeFirstToBuzz = mutation({
  args: {
    _id: v.id('buzzer'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
