"use client";

import { useEffect, useState } from "react";
import QuoteCard from "./QuoteCard";

import { delay, motion } from "framer-motion";
const QuoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <QuoteCard key={post._id} data={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  const filterPost = (searchText) => {
    // "regex," it refers to "regular expressions." Regular expressions are a powerful tool used in programming for matching patterns within strings.
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-sesnsitive search

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.quote)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    //debounce method
    //The debounce method is a technique used in programming to limit the rate at which a function can fire. It's particularly useful in scenarios where you want to reduce the number of times a function executes over time, often in response to events that occur rapidly, such as window resizing, scrolling, or typing in an input field.

    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPost(e.target.value);
        setSearchedResult(searchResult);
      }, 100)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPost(tagName);
    setSearchedResult(searchResult);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/quote");
      const data = await response.json();

      setAllPosts(data);
    };
    fetchPost();
  }, [setAllPosts]);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      transition={{ delay:0.5}}
      viewport={{ once: true }}
      variants={variants1}
      className="feed"
    >
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <QuoteCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <QuoteCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </motion.section>
  );
};

export default Feed;
