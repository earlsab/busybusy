// import Image from "next/image";
import StoreDetails from "@/features/store/components/StoreDetails";
import Busy from "@/features/busy/server/model/Busy";
import { BusyImage } from "@/features/busy/components/BusyImage";
import { BusySliderArea } from "@/features/busy/components/BusySliderArea";

import Store from "@/features/store/server/model/Store";
import { ensureDBConnection } from "@/lib/ensureDB";

export default async function BusyPage({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  await ensureDBConnection();
  const id = (await params).store;
  const store = await Store.findById(id);

  // const session = await auth();
  // if (!session?.user) return <>Unauthorized</>;
  if (!store) return <>Store does not exist! </>;

  console.log(store);
  const storeData = {
    metadata: {
      admin: store.metadata.admin,
      createdDate: store.metadata.createdDate,
    },
    _id: store._id,
    storeName: store.storeName,
    storeDescription: store.storeDescription,
    storeLocation: store.storeLocation,
    storeLink: store.storeLink,
    storeImage: store.storeImage,
    storeType: store.storeType,
  };

  const latestBusy = await Busy.findOne({ storeid: id }).sort({
    createdDate: -1,
  });

  let initialState = "null";
  if (!latestBusy) {
    initialState = "submit";
  } else if (
    // if more than 30 mins ago = stale
    new Date(latestBusy.createdDate).getTime() <
    new Date().getTime() - 1000 * 60 * 30
  ) {
    initialState = "stale";
  } else {
    initialState = "read";
  }

  const busyData = {
    entryType: latestBusy?.entryType,
    storeid: latestBusy?.storeid,
    value: latestBusy?.value,
    createdDate: latestBusy?.createdDate,
  };

  console.log(busyData);

  // State Logic

  return (
    <div>
      <h1>Busy Busy</h1>
      {id}
      <StoreDetails
        title={storeData.storeName}
        description={storeData.storeDescription}
        location={storeData.storeLocation}
        link={storeData.storeLink}
        type={storeData.storeType}
      ></StoreDetails>
      <BusyImage></BusyImage>
      <BusySliderArea
        storeid={id}
        busyValue={busyData?.value}
        initialState={initialState}
        lastSubmittedTime={busyData?.createdDate}
      ></BusySliderArea>
    </div>
  );
}
