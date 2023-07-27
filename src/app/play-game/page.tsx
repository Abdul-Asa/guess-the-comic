"use client";
import InputDropdown from "@/components/InputDropdown";
import { apiGetList } from "@/lib/api";
import picture from "../../../public/download.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedDiv from "@/components/AnimatedBox";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};
type comicData = {
  title: string;
  imgSrc: string;
};

export default function manhwa() {
  const [list, setList] = useState<any[]>([]);
  const [answer, setanswer] = useState<comicData>({ imgSrc: "", title: "" });
  const [blur, setblur] = useState<boolean>(true);
  const [lives, setLives] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [guesses, setGuess] = useState<boolean>(false);

  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://meo.comick.pictures/${src}?w=${width}&q=${quality || 100}`;
  };

  function getRandomElement(array: string | any[]) {
    if (!Array.isArray(array) || array.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function loadNewRound() {
    setLoading(true);
    apiGetList().then((data: any) => {
      setList(data);
      const theOne = getRandomElement(data);
      console.log(theOne);
      setanswer({
        title: theOne.title,
        imgSrc: theOne.md_covers[0].b2key,
      });
      setLoading(false);
      setblur(true);
    });

    setLives(6);
  }

  const handleOptionSelected = (option: comicData): boolean => {
    console.log(`Selected option: ${option}`);
    if (option.title == answer?.title) {
      setblur(false);
    } else {
      setLives(lives - 1);
      if (lives == 0) {
        console.log("Game ends...you lose");
        setblur(false);
      }
    }
    return option.title == answer?.title;
  };

  useEffect(() => {
    loadNewRound();
  }, []);

  return (
    <main className="container block p-4 md:p-4 min-h-screen">
      <hgroup className="text-center mb-2 md:mb-4">
        <h1 className="text-3xl md:text-4xl font-bold m-3">manhwa</h1>
        <p className="text-base md:text-lg opacity-60 m-3">play</p>
      </hgroup>
      <section className="flex flex-col items-center">
        <div
          className="p-3 rounded-lg bg-gray-200 text-black shadow-lg "
          style={{ width: 275, height: 388 }}
        >
          {loading ? (
            <Image
              width={275}
              height={388}
              className="w-full h-auto rounded-lg"
              src={picture}
              alt={"Guess the manhwa"}
            />
          ) : (
            <Image
              width={275}
              height={388}
              className="w-full h-auto rounded-lg"
              src={answer.imgSrc}
              loader={imageLoader}
              alt={"Guess the manhwa"}
              style={blur ? { filter: "blur(10px)" } : {}}
            />
          )}
        </div>
        <h1 className=" m-4">Guess {7 - lives >= 7 ? 6 : 7 - lives} of 6</h1>
        <InputDropdown options={list} callback={handleOptionSelected} />
        <AnimatedDiv />
      </section>
      {lives == 0 && (
        <div
          id="popup-modal"
          tabIndex={-1}
          data-modal-placement="center"
          className=" absolute top-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center content-center flex-wrap"
        >
          <div className=" relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-fit ">
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                The answer was <b>{answer.title}</b>
              </h1>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Would you like to play again
              </h3>
              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={loadNewRound}
                >
                  Yeah, sure
                </button>
                <a href="/">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    No, I love courting death
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Link href="/" className="block text-center mt-8 md:mt-12">
        Back
      </Link>
    </main>
  );
}
