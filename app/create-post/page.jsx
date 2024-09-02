"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    quote: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/quote/new', {
        method: 'POST',
        body:JSON.stringify({
          userId:session?.user.id,
          quote:post.quote,
          tag:post.tag,
        })
      })

      if(res.ok){
        toast.success("Post Succesfully created!"); // Corrected the typo here
        setPost({
          quote:'',
          tag:''
        })
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }finally{
      setIsSubmitting(false);
    }
  };
  return (
    <Form
      label="Create"
      handleSubmit={createPost}
      isSubmitting={isSubmitting}
      post={post}
      setPost={setPost}
    />
  );
};

export default CreatePost;
