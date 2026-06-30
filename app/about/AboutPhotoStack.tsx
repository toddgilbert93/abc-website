"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTOS = [
  {
    id: "about1",
    src: "/about1.jpg",
    alt: "Austin Build Club photo 1",
    rotation: "-rotate-6",
    frame: "left-0 top-0 h-full w-[88%]",
    imagePosition: "object-left",
  },
  {
    id: "about2",
    src: "/about2.jpg",
    alt: "Austin Build Club photo 2",
    rotation: "rotate-3",
    frame: "inset-0",
    imagePosition: "object-center",
  },
  {
    id: "about3",
    src: "/about3.jpg",
    alt: "Austin Build Club photo 3",
    rotation: "-rotate-2",
    frame: "-left-8 -right-8 top-0 bottom-0",
    imagePosition: "object-center",
  },
];

export default function AboutPhotoStack() {
  const [stack, setStack] = useState(PHOTOS);

  const sendToBack = (photoId: string) => {
    setStack((current) => {
      const photo = current.find(({ id }) => id === photoId);
      if (!photo) return current;

      return [photo, ...current.filter(({ id }) => id !== photoId)];
    });
  };

  return (
    <div className="animate-fade-in-up relative mx-auto mb-14 h-72 w-full max-w-sm sm:h-80">
      {stack.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          aria-label={`Move ${photo.alt} to the back of the stack`}
          onClick={() => sendToBack(photo.id)}
          className={`absolute cursor-pointer overflow-hidden rounded-2xl border-8 border-white bg-white shadow-xl shadow-black/15 transition-transform duration-300 hover:scale-[1.02] ${photo.frame} ${photo.rotation}`}
          style={{
            zIndex: index + 1,
            translate: `${index * 4}px ${index * 6}px`,
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 80vw, 384px"
            className={`object-cover ${photo.imagePosition}`}
            priority={index === stack.length - 1}
          />
        </button>
      ))}
    </div>
  );
}
