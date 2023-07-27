import React, { useEffect, useState } from "react";

const Circle = ({ delay, text }: { delay: number; text: number }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`h-16 w-16 bg-blue-500 rounded-full ${
        active ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000 flex items-center justify-center text-white font-bold`}
    >
      {text}
    </div>
  );
};

const AnimatedDiv = () => {
  return (
    <div className="w-full h-fit-content flex-col items-center flex p-10">
      <h1>Hello</h1>
      <div className="w-full h-fit-content flex justify-around items-center p-2">
        <Circle delay={350} text={1} />
        <Circle delay={700} text={2} />
        <Circle delay={1050} text={3} />
      </div>
    </div>
  );
};

export default AnimatedDiv;
