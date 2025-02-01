"use server";

import Busy from "./model/Busy";

export async function create(storeid: string, value: number) {
  // Mutate data
  try {
    const res = await Busy.create({
      entryType: "user",
      storeid: storeid,
      value: value,
      createdDate: new Date(),
    });

    const parse = { data: { title: "Sample Title" } }; // Mock parse object

    return {
      message: `Added paper: ${parse.data.title}.`,
      redirect: `/paper/${(res as any)._id.toString()}`,
    };
  } catch (e) {
    return { message: `Failed to create paper. ${e}`, redirect: "" };
  }
}
