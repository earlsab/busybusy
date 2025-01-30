"use client";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function BusySlider() {
  const [value, setValue] = useState(33);
  const getImageSrc = (val: number) => {
    if (val < 25) return "/busy-1.png";
    if (val < 50) return "/busy-2.png";
    if (val < 75) return "/busy-3.png";
    return "/busy-4.png";
  };

  return (
    <>
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
      </div>
      {value}
      <div className="p-4">
        <Slider
          onValueChange={(val) => setValue(val[0])}
          defaultValue={[25]}
          max={100}
          step={25}
        />
      </div>
      <div className="flex justify-center">
        <Button variant="outline">Submit</Button>
      </div>
    </>
  );
}
