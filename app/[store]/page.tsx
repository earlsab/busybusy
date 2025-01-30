// import Image from "next/image";

import { BusySlider } from "@/features/busy/components/BusySlider";

// import Store from "@/features/store/server/model/Store";
// import { ensureDBConnection } from "@/lib/ensureDB";

export default async function Busy({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  //   await ensureDBConnection();
  const id = (await params).store;
  //   const store = await Store.findById(id);

  //   const session = await auth();
  //   if (!session?.user) return <>Unauthorized</>;
  //   if (!store) return <>Store does not exist! </>;

  return (
    <div>
      <h1>Busy Busy</h1>
      {id}
      <BusySlider></BusySlider>
    </div>
  );
}
