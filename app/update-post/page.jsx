"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setpost] = useState({
    quote: "",
    tag: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/quote/${postId}`);

      const data = await response.json();

      setpost({
        quote: data.quote,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert("Missing Post Id!");
    
    try {
      const response = await fetch(`/api/quote/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        toast.success("Post Updated Successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form
      label="Edit"
      handleSubmit={updatePrompt}
      isSubmitting={isSubmitting}
      post={post}
      setPost={setpost}
    />
  );
};

export default page;
