import React from "react";
import QuoteCard from "./QuoteCard";
import { motion } from "framer-motion";
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
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
      className="w-full"
    >
      <h1 className="head_text text-left">
        <span className="green_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <QuoteCard
            key={post._id}
            data={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Profile;
