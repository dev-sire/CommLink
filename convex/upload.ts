import { mutation } from "./_generated/server";

export const generateImageURL = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})