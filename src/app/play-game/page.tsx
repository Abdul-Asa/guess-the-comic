"use client";
import InputDropdown from "@/components/InputDropdown";
import { apiGetList } from "@/lib/api";
import picture from "../../../public/download.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import AnimatedDiv from "@/components/AnimatedBox";
import Modal from "@/components/Modal";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

type comicData = {
  title: string;
  imgSrc: string;
  year: number;
  genres: number[];
  status: number;
  demographic: number;
  last_chapter: number;
};

export default function Manhwa() {
  const [list, setList] = useState<any[]>([]);
  const [answer, setanswer] = useState<comicData>({
    imgSrc: "",
    title: "",
    year: 0,
    genres: [],
    status: 0,
    demographic: 0,
    last_chapter: 0,
  });
  const [blur, setblur] = useState<boolean>(true);
  const [lives, setLives] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [guesses, setGuesses] = useState<comicData[]>([]);

  //Image loader to ensure quality
  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://meo.comick.pictures/${src}?w=${width}&q=${quality || 100}`;
  };

  //Choose random manwhas with higher probability of choosing more popular manhwas
  function getRandomElement(array: string | any[]) {
    // Error check to ensure array is valid
    if (!Array.isArray(array) || array.length === 0) {
      return undefined;
    }

    // Generate a random number between 0 and 100
    const random = Math.random() * 100;

    // Set ranges based on the weighted probabilities
    if (random <= 50) {
      // Top 20% of the array
      const index = Math.floor(Math.random() * (array.length * 0.074)); // top 200 of 2700 is about 7.4%
      return array[index];
    } else if (random <= 90) {
      // Next 30% of the array
      const index = Math.floor(
        array.length * 0.074 + Math.random() * (array.length * 0.111)
      ); // top 300 of 2700 is about 11.1%
      return array[index];
    } else if (random <= 95) {
      // Next 30% of the array
      const index = Math.floor(
        array.length * 0.185 + Math.random() * (array.length * 0.296)
      ); // top 800 of 2700 is about 29.6%
      return array[index];
    } else {
      // Remaining 20% of the array
      const index = Math.floor(
        array.length * 0.481 + Math.random() * (array.length * 0.519)
      ); // top 1400 of 2700 is about 51.9%
      return array[index];
    }
  }

  //Load a new round
  function loadNewRound() {
    setGuesses([]);
    setLoading(true);
    apiGetList().then((data: any) => {
      setList(data);
      const theOne = getRandomElement(data);
      console.log(theOne);
      setanswer({
        title: theOne.title,
        imgSrc: theOne.md_covers[0].b2key,
        year: theOne.year,
        demographic: theOne.demographic,
        status: theOne.status,
        last_chapter: theOne.last_chapter,
        genres: theOne.genres,
      });
      setLoading(false);
      setblur(true);
    });

    setLives(6);
  }

  //Function when an input is submitted
  const handleOptionSelected = (option: comicData): boolean => {
    console.log(option);
    setGuesses((prev) => [...prev, option]);
    if (option.title == answer?.title) {
      setblur(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      console.log("Game ends...you win 🎉");
    } else {
      setLives(lives - 1);
      if (lives == 0) {
        console.log("Game ends...you lose");
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        setblur(false);
      }
    }
    return option.title == answer?.title;
  };

  //populate list
  // useEffect(() => {
  //   // loadNewRound();
  // }, []);

  return (
    <main className="container block p-4 md:p-4 min-h-screen">
      <hgroup className="text-center mb-2 md:mb-4">
        <h1 className="text-3xl md:text-4xl font-bold m-3">Manhwa</h1>
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
              src={"7qdXk.png"}
              alt={"Guess the manhwa"}
              loader={imageLoader}
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
        <AnimatedDiv guessList={guesses} answer={answer} />
      </section>
      {lives == 0 && Modal(answer, loadNewRound)}
      <Link href="/" className="block text-center mt-8 md:mt-12">
        Back
      </Link>
    </main>
  );
}

