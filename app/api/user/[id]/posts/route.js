import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async(request, {params}) => {
    try {
        await connectToDB();

        const posts = await Post.find({creator:params.id}).populate('creator');
        return new Response(JSON.stringify(posts), {
            status: 200,
          });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all Posts", { status: 500 });
    }
}