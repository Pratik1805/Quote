import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
const Form = ({ label, handleSubmit, isSubmitting, post, setPost }) => {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      variants={variants1}
      className="w-full max-w-full justify-center flex-col"
    >
      <h1 className="head_text">
        <span className="orange_gradient">{label} Post</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl gap-7 mt-10 glassmorphism"
      >
        <label className="font-satoshi font-semibold text-gray-700">
          Your Thought
          <textarea
            className="form_textarea"
            placeholder="Enter your Thoughts..."
            required
            value={post.quote}
            onChange={(e) =>
              setPost({
                ...post,
                quote: e.target.value,
              })
            }
          />
        </label>

        <label className="font-satoshi font-semibold text-gray-700">
          Tags{" "}
          <span className="font-normal">
            (#QuoteOfTheDay, #Motivation, #DailyQuote)
          </span>
          <input
            type="text"
            placeholder="#tag"
            className="form_input"
            required
            value={post.tag}
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
          />
        </label>

        <div className="mt-4 mx-3 flex-end gap-4">
          <Link
            href="/"
            className="text-md font-semibold bg-red-500 bg-clip-text text-transparent"
          >
            Cancle
          </Link>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-1.5  rounded-full"
          >
            {isSubmitting ? `${label}...` : label}
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default Form;
