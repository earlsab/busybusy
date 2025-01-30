import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the PaperData interface
interface StoreData {
  storeName: string;
  storeDescription: string;
  storeImage: string;
  metadata: {
    admin: string[];
    createdDate: Date;
  };
}

// Define the PaperDocument interface
interface StoreDocument extends Document, StoreData {}

// Define the PaperSchema
const StoreSchema = new Schema<StoreDocument>(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeDescription: {
      type: String,
      required: true,
    },
    storeImage: {
      type: String,
      required: true,
    },
    metadata: {
      admin: {
        type: [String],
        required: true,
      },
      createdDate: {
        type: Date,
        required: true,
      },
    },
  },
  { collection: "stores" }
);

// Apply the mongoose-paginate-v2 plugin to the schema
StoreSchema.plugin(mongoosePaginate);

// Create and export the Paper model
const Paper =
  (mongoose.models.Paper as mongoose.PaginateModel<StoreDocument>) ||
  mongoose.model<StoreDocument, mongoose.PaginateModel<StoreDocument>>(
    "Paper",
    StoreSchema,
    "papers" // looks to be responsible to accessing the collections in mongodb
  );

export default Paper;
