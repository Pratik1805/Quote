import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const { userId, quote, tag } = await req.json(); //get data from POST request

  try {
    await connectToDB();

    const newPost = new Post({
      creator: userId,
      quote: quote,
      tag: tag,
    });
    await newPost.save();
    
    
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create Post", { status: 500 });
  }
};
