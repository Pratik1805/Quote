"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const QuoteCard = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(data.quote);
    navigator.clipboard.writeText(data.quote);
    toast.success("Copied!")
    setTimeout(() => setCopied(""), 3000);
  };

  const goToProfile = () =>{
    if(data.creator._id === session?.user.id){
      return router.push('/profile');
    }
    return router.push(`/profile/${data.creator._id}?name=${data.creator.username}`);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-5 cursor-pointer"
          onClick={goToProfile}
        >
          <Image
            src={data.creator.image}
            alt="User_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <p className="font-satoshi font-semibold text-gray-900">
              {data.creator.username}
            </p>
            <p className="text-gray-500 font-inter text-sm">
              {data.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn " onClick={handleCopy}>
          <Image
            src={
              copied === data.quote
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={16}
            alt="copy_icon"
            height={16}
          />
        </div>
      </div>
      <p className="font-satoshi text-md text-gray-700 my-4">"{data.quote}"</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(data.tag)}
      >
        #{data.tag}
      </p>

      {session?.user.id === data.creator._id && pathName === "/profile" && (
        <div className="flex gap-4 mt-5 flex-center border-t pt-3 border-gray-100">
          <p
            className="font-inter text-sm text-green-500 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
