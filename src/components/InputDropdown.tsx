import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import picture from "../../public/download.png";
import Image from "next/image";

interface InputDropdownProps {
  options: {
    id: number;
    title: string;
    md_covers: { w: number; h: number; b2key: string }[];
  }[];

  callback: (option: string) => boolean;
}

type comicData = {
  title: string;
  imgSrc: string;
};

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const InputDropdown: React.FC<InputDropdownProps> = ({ options, callback }) => {
  //   const [display, setDisplay] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<comicData[]>([]);
  const [highlightedOption, setHighlightedOption] = useState(0);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://meo.comick.pictures/${src}?w=${width}&q=${quality || 100}`;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;

    const newFilteredOptions: comicData[] = options
      .filter(
        (option) =>
          option.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
      .map((option) => ({
        title: option.title,
        imgSrc: option.md_covers[0].b2key,
      }));

    setInputValue(userInput);
    setFilteredOptions(newFilteredOptions);
    setHighlightedOption(0);
  };

  const handleCallback = (option: string) => {
    setInputValue("");
    setFilteredOptions([]);
    console.log(option + ":" + callback(option));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      // If the down arrow key is pressed and the highlighted index is less than the number of options, increase the highlighted index
      if (highlightedOption < filteredOptions.length - 1) {
        event.preventDefault();
        setHighlightedOption(highlightedOption + 1);
        setInputValue(filteredOptions[highlightedOption + 1].title);
      }
    } else if (event.key === "ArrowUp") {
      // If the up arrow key is pressed and the highlighted index is greater than 0, decrease the highlighted index
      if (highlightedOption > 0) {
        event.preventDefault();
        setHighlightedOption(highlightedOption - 1);
        setInputValue(filteredOptions[highlightedOption - 1].title);
      }
    } else if (event.key === "Enter") {
      // If the enter key is pressed and there is an onOptionSelected function, call it with the highlighted option
      handleCallback(filteredOptions[highlightedOption].title);
    }
  };

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, filteredOptions.length);
  }, [filteredOptions]);

  useEffect(() => {
    optionRefs.current[highlightedOption]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [highlightedOption]);

  return (
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mt-4 relative">
      <input
        type="search"
        id="default-search"
        className="block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
        placeholder="Guess the manwha"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        required
      />
      {inputValue.length > 2 && filteredOptions.length > 0 && (
        <ul
          className={`w-full mt-2 ${
            filteredOptions.length > 0 && "border border-gray-300"
          } rounded-md bg-white z-10 max-h-[15rem] overflow-auto`}
        >
          {filteredOptions.map((option, i) => (
            <li
              ref={(el) => (optionRefs.current[i] = el)}
              className={`flex items-center px-3 py-2 border-b border-gray-300 last:border-b-0 ${
                highlightedOption === i ? "bg-gray-200" : ""
              } hover:bg-gray-300 cursor-pointer`}
              key={i}
              onClick={() => {
                handleCallback(option.title);
              }}
            >
              <Image
                src={option.imgSrc}
                alt={option.title}
                loader={imageLoader}
                width={100}
                height={120}
                className="w-6 h-6 mr-2"
                loading="lazy"
              />
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
