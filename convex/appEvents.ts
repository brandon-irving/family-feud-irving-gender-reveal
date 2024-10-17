import { mutation, query } from 'convex/_generated/server';
import { v } from 'convex/values';

export const getAppEvent = query({
  handler: async (ctx) => {
    const appEvents = await ctx.db.query('appEvents').collect();
    return appEvents[0];
  },
});

export const createAppEvent = mutation({
  args: {
    _id: v.optional(v.id('appEvents')),
    event: v.union(v.literal('whoBuzzedFirst'), v.literal('sound')),
    teamName: v.optional(v.string()),
    soundName: v.optional(
      v.union(v.literal('applause'), v.literal('themeSong')),
    ),
  },
  handler: async (ctx, args) => {
    if (!args._id) {
      await ctx.db.insert('appEvents', args);
    } else {
      await ctx.db.patch(args._id, args);
    }
  },
});

export const removeAppEvent = mutation({
  args: {
    _id: v.id('appEvents'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
