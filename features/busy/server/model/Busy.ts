import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBusy extends Document {
  storeid: string;
  value: number; // 0-4
  createdDate: Date;
}

const BusySchema = new Schema<IBusy>(
  {
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
  mongoose.models.User || mongoose.model<IBusy>("User", BusySchema);

export default Busy;
