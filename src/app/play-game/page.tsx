"use client";
import InputDropdown from "@/components/InputDropdown";
import { apiGetList } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};
export default function Manwha() {
  const [list, setList] = useState<any[]>([]);

  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://meo.comick.pictures/${src}?w=${width}&q=${quality || 100}`;
  };

  useEffect(() => {
    const updateList = (data: any) => {
      setList(data);
      console.log(data);
    };

    apiGetList(updateList);
  }, []);

  return (
    <main className="container block p-4 md:p-4 min-h-screen">
      <hgroup className="text-center mb-2 md:mb-4">
        <h1 className="text-3xl md:text-4xl font-bold m-3">Manwha</h1>
        <p className="text-base md:text-lg opacity-60 m-3">play</p>
      </hgroup>
      <section className="flex flex-col items-center">
        <div className="p-3 rounded-lg bg-gray-200 text-black shadow-lg">
          <Image
            width={275}
            height={388}
            className="w-full h-auto rounded-lg"
            src={"0WBBl-s.jpg"}
            loader={imageLoader}
            alt={""}
          />
        </div>
        <InputDropdown options={list} callback={} />
      </section>
      <Link href="/" className="block text-center mt-8 md:mt-12">
        Back
      </Link>
    </main>
  );
}
