import { connectToDB } from "@utils/database";
import Post from "@models/post";

//GET data
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id).populate("creator");

    if (!post) {
      return new Response("Post not Found!", { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all Posts", { status: 500 });
  }
};

//PATCH(update) data
export const PATCH = async (request, { params }) => {
  const { quote, tag } = await request.json();

  try {
    await connectToDB();

    const existingPost = await Post.findById(params.id);

    if (!existingPost) {
      return new Response("Post not Found!", { status: 404 });
    }

    existingPost.quote = quote;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to Update Quote", { status: 500 });
  }
};

//DELETE
export const DELETE = async(request,{params}) => {
    try {
        await connectToDB();

        await Post.findByIdAndDelete(params.id);

        return new Response("Quote Deleted Successfully!", {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to Deleted!", {status:500});
    }
}
