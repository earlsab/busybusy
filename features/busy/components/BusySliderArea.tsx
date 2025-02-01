"use client";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { useAtom } from "jotai";
import { busyValueAtom } from "@/atoms";
import { useEffect, useState } from "react";
import { create } from "../server/actions";

export function BusySliderArea({
  storeid,
  storeLocation,
  busyValue,
  initialState,
  lastSubmittedTime,
}: {
  storeid: string;
  storeLocation: string;
  busyValue: number | undefined;
  initialState: string;
  lastSubmittedTime: Date | undefined;
}) {
  //   const [value, setValue] = useState(25);
  // const [lastSubmitTime, setLastSubmitTime] = useAtom(busyLastSubmitTime);
  const [value, setValue] = useAtom(busyValueAtom);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [distance, setDistance] = useState(999);
  const [canSubmitBool, setCanSubmit] = useState(false);
  const [latitude, longitude] = storeLocation.split(",").map(Number);
  const parsedStoreLocation = { latitude, longitude };

  useEffect(() => {
    setValue(busyValue ?? 25);
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    setCanSubmit(canSubmit(location, parsedStoreLocation));
  }, [location]);

  function canSubmit(
    userLocation: { latitude: number; longitude: number },
    storeLocation: { latitude: number; longitude: number }
  ) {
    const distance = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      storeLocation.latitude,
      storeLocation.longitude,
      "K"
    );
    setDistance(distance);
    return distance < 0.1;
  }

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string
  ) => {
    console.log("Lat1, Lon1:", lat1, lon1);
    console.log("Lat2, Lon2:", lat2, lon2);
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  };

  function onSubmit() {
    try {
      create(storeid, value);
      setState("read");
    } catch {
      console.log("error");
    }
  }
  function onCancel() {
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
        Stale Last Submitted{" "}
        {lastSubmittedTime ? getTimeDiff(lastSubmittedTime) : " N/A"}
        <Button onClick={() => addBusy()} variant="outline">
          Add Info
        </Button>
      </div>
    );
  } else if (state === "read") {
    return (
      <>
        <p>Current Busy Level: </p>
        {value}
        <div className="p-4"></div>
        <Button onClick={() => addBusy()} variant="outline">
          Add Info
        </Button>
        {lastSubmittedTime && (
          <div>Last Submitted{getTimeDiff(lastSubmittedTime)}</div>
        )}
      </>
    );
  } else if (state === "submit") {
    return (
      <>
        <p>Previous Values: {busyValue ? busyValue : "N/A"}</p>
        <p>Current Value: {value}</p>
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
        <p>
          Current Location:{" "}
          {`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
        </p>
        <p>
          Can Submit?
          {canSubmitBool
            ? " Yes. Distance is " distance + " km."
            : "No. Distance is " +
              distance +
              " km. You need to be within 500 meters of the store."}
        </p>
        <p>
          Location Status:
          {location.latitude !== 0 && location.longitude !== 0
            ? " User Location Available"
            : " Did you allow permissions for location?"}
        </p>
        <div className="flex justify-center">
          <Button onClick={() => onCancel()} variant="outline">
            Cancel
          </Button>

          <Button
            onClick={() => onSubmit()}
            disabled={!canSubmitBool}
            variant="outline"
          >
            Submit
          </Button>
        </div>
      </>
    );
  }
}
