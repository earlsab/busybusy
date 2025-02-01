import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBusy extends Document {
  entryType: string; // owner or user
  storeid: string;
  value: number; // 0-4
  createdDate: Date;
}

const BusySchema = new Schema<IBusy>(
  {
    entryType: {
      type: String,
      required: true,
    },
    storeid: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
    },
  },
  { collection: "busy" }
);
const Busy: Model<IBusy> =
  mongoose.models.Busy || mongoose.model<IBusy>("Busy", BusySchema);

export default Busy;
