"use client";
import React from "react";
import Typewriter from "typewriter-effect";

interface Props {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Notes Elevated with AI Brilliance.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Developed By Zaid")
          .pauseFor(1000)
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
