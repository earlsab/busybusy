import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the PaperData interface
interface StoreData {
  storeName: string;
  storeDescription: string;
  storeLink: string;
  storeLocation: string;
  storeImage: string;
  storeType: string;
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
    storeLocation: {
      type: String,
      required: true,
    },
    storeLink: {
      type: String,
      required: false,
    },
    storeImage: {
      type: String,
      required: true,
    },
    storeType: {
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
const Store =
  (mongoose.models.Store as mongoose.PaginateModel<StoreDocument>) ||
  mongoose.model<StoreDocument, mongoose.PaginateModel<StoreDocument>>(
    "Store",
    StoreSchema,
    "stores" // looks to be responsible to accessing the collections in mongodb
  );

export default Store;
