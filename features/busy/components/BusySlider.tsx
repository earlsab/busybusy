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
      <Image src={getImageSrc(value)} alt="Dynamic" width={300} height={300} />
      {value}
      <Slider
        onValueChange={(val) => setValue(val[0])}
        defaultValue={[25]}
        max={100}
        step={25}
      />
      <Button variant="outline">Button</Button>
    </>
  );
}
