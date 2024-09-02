"use client";

import Feed from "@components/Feed";
import QuoteoftheDay from "@components/QuoteoftheDay";

import {  motion } from "framer-motion";

const page = () => {
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const words = "Become Timeless";

  return (
    <section className=" w-full flex-center flex-col ">
      <motion.h1
        className="head_text text-center"
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        variants={MULTIDIRECTION_SLIDE_VARIANTS}
        transition={{ duration: 0.5 }}
      >
      Where Thoughts
      </motion.h1>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        className="head_text text-center"
      >
        {words.split(" ").map((word, i) => (
          <motion.span key={i} variants={item} className="blue_gradient head_text text-center ">
            {word === "" ? <span>&nbsp;</span> : word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="desc text-center"
        initial="right"
        animate="visible"
        viewport={{ once: true }}
        variants={MULTIDIRECTION_SLIDE_VARIANTS}
        transition={{ duration: 0.5 }}
      >
        Create and share inspiring quotes on our platform. Join a community that
        celebrates the power of words and the impact of a single quote.
      </motion.p>

      
      <Feed />
      <QuoteoftheDay/>
    </section>
  );
};

export default page;
