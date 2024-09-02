// pages/api/quote-of-the-day.js

import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async(req) =>{
  await connectToDB();

  try {
    const count = await Post.countDocuments();
    const random = Math.floor(Math.random() * count);
    const post = await Post.findOne().skip(random);
    
    if (!post) {
      return new Response("Post not Found!", { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all Posts", { status: 500 });
  }
}
