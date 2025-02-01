"use client";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { busyValueAtom } from "@/atoms";

const busyImage1 = "/busy-1.png";
const busyImage2 = "/busy-2.png";
const busyImage3 = "/busy-3.png";
const busyImage4 = "/busy-4.png";

const getImageSrc = (val: number) => {
  if (val < 25) return busyImage1;
  if (val < 50) return busyImage2;
  if (val <= 75) return busyImage3;
  return busyImage4;
};

export function BusyImage() {
  const value = useAtomValue(busyValueAtom);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Image
        src={getImageSrc(value)}
        alt="Dynamic"
        width={2388}
        height={1668}
        style={{
          width:
            window.innerWidth > 1024
              ? "50%"
              : window.innerWidth > 768
              ? "80%"
              : "150vw",
          height: "auto",
          maxWidth: window.innerWidth > 768 ? "2388px" : "none",
        }}
      />
      {/* Not sure if this works, but the idea is to force next.js to render and cache these images??? */}
      <Image
        src={busyImage1}
        alt="Preload 1"
        width={2388}
        height={1668}
        priority={false}
        style={{ display: "none" }}
      />
      <Image
        src={busyImage2}
        alt="Preload 2"
        width={2388}
        height={1668}
        priority={true}
        style={{ display: "none" }}
      />
      <Image
        src={busyImage3}
        alt="Preload 3"
        width={2388}
        height={1668}
        priority={false}
        style={{ display: "none" }}
      />
      <Image
        src={busyImage4}
        alt="Preload 4"
        width={2388}
        height={1668}
        priority={false}
        style={{ display: "none" }}
      />
    </div>
  );
}
