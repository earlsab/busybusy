"use client";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { useAtom } from "jotai";
import { busyValueAtom } from "@/atoms";
import { useEffect, useState } from "react";
import { create } from "../server/actions";

export function BusySliderArea({
  storeid,
  busyValue,
  initialState,
  lastSubmittedTime,
}: {
  storeid: string;
  busyValue: number;
  state: string;
  lastSubmittedTime: Date;
}) {
  //   const [value, setValue] = useState(25);
  // const [lastSubmitTime, setLastSubmitTime] = useAtom(busyLastSubmitTime);
  const [value, setValue] = useAtom(busyValueAtom);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setValue(busyValue);
  }, []);

  function onSubmit() {
    create(storeid, value);
    setState("read");
  }

  function addBusy() {
    setState("submit");
  }

  // Variants: Null, Stale, View, Submit
  function getTimeDiff(date: Date): string {
    const diff = (new Date().getTime() - date.getTime()) / 1000;
    console.log(new Date());
    if (diff < 60) return `${Math.floor(diff)} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  if (state === "null") {
    return <div>Null</div>;
  } else if (state === "stale") {
    return (
      <div>
        Stale Last Submitted{getTimeDiff(lastSubmittedTime)}
        <Button onClick={() => addBusy()} variant="outline">
          Add Info
        </Button>
      </div>
    );
  } else if (state === "read" || state === "submit") {
    return (
      <>
        <div className="p-4">
          <Slider
            onValueChange={(val) => setValue(val[0])}
            value={[value ?? 25]}
            max={100}
            step={25}
          />
        </div>
        {lastSubmittedTime && (
          <div>Last Submitted{getTimeDiff(lastSubmittedTime)}</div>
        )}
        <div className="flex justify-center">
          <Button onClick={() => onSubmit()} variant="outline">
            Submit
          </Button>
        </div>
      </>
    );
  }
}
