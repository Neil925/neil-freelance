import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "@deemlol/next-icons";

type SectionProps = {
  title: string;
  img: StaticImageData;
  order: number;
  style: string;
  buttonContent: string;
  buttonUrl: string;
  children: ReactNode;
};

export default function Section(
  { title, img, order, style, buttonContent, buttonUrl, children }:
    SectionProps,
) {
  let orderCss, imageMargin, textAlignment, buttonAlignment;
  if (order === 1) {
    orderCss = "order-1";
    imageMargin = "ml-5";
    textAlignment = "md:text-left";
    buttonAlignment = "md:justify-start";
  } else {
    orderCss = "order-0";
    imageMargin = "mr-5";
    textAlignment = "md:text-right";
    buttonAlignment = "md:justify-end";
  }

  return (
    <div className={`flex ${style} p-5`}>
      <div
        className={`${orderCss} ${imageMargin} collapse h-0 w-0 md:h-[unset] md:visible md:w-1/5 flex items-center`}
      >
        <Image
          className="w-full aspect-square object-cover"
          src={img}
          alt="image"
        />
      </div>
      <div className="order-0 md:w-4/5 space-y-5 flex flex-col">
        <h2
          className={`text-3xl md:text-4xl lg:text-6xl font-bold ${textAlignment} text-center`}
        >
          {title}
        </h2>
        <p className="lg:text-3xl/10 text-2xl/9 text-justify">
          {children}
        </p>
        <div
          className={`flex justify-center ${buttonAlignment} grow items-end`}
        >
          <a href={`${buttonUrl}`} className="w-fit h-fit">
            <button className="bg-primary p-2 rounded flex items-center space-x-1 cursor-pointer">
              <span className="h-fit lg:text-3xl text-xl">{buttonContent}</span>
              <ArrowRight size={34} color="#000000" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
