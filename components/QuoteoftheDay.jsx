"use client";

import { useEffect, useState } from "react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import Image from "next/image";
import toast from "react-hot-toast";

import { delay, motion } from "framer-motion";

const QuoteoftheDay = () => {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const [quote, setQuote] = useState({
    quote: "",
    tag: "",
  });
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(quote.quote);
    navigator.clipboard.writeText(quote.quote);
    toast.success("Copied!");
    setTimeout(() => setCopied(""), 3000);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const storedQuote = JSON.parse(localStorage.getItem("quoteOfTheDay"));
      const lastFetchedTime = localStorage.getItem("lastFetchedTime");
      const currentTime = new Date().getTime();

      if (
        storedQuote &&
        lastFetchedTime &&
        currentTime - lastFetchedTime < 24 * 60 * 60 * 1000
      ) {
        setQuote(storedQuote);
      } else {
        const response = await fetch("/api/quoteoftheday");
        const data = await response.json();
        setQuote({
          quote: data.quote,
          tag: data.tag,
        });
        localStorage.setItem("quoteOfTheDay", JSON.stringify(data));
        localStorage.setItem("lastFetchedTime", currentTime.toString());
      }
    };
    fetchQuote();
  }, []);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay:2 }}
      variants={variants1}
      className="flex flex-col gap-4 justify-center items-center mt-5 w-full"
    >
      <h1 className="head_text text-left neon_gradient px-2 py-2">
        Quote of the day
      </h1>
      <NeonGradientCard className="max-w-sm items-center justify-between text-center mt-10 flex">
        <span className="pointer-events-none z-10 h-full whitespace-pre-wrap text-gray-500 text-3xl font-satoshi dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          "{quote.quote}"
        </span>
        <div
          className="copy_btn mt-3 absolute top-2 right-0 mx-3"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === quote.quote
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={16}
            alt="copy_icon"
            height={16}
          />
        </div>
      </NeonGradientCard>
    </motion.div>
  );
};

export default QuoteoftheDay;
