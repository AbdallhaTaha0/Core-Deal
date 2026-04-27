import mongoose, { Schema, Types } from 'mongoose';

type CategoryType = {
  name: string,
  description?: string,
  parentCategory?: Types.ObjectId | null,
};

const categorySchema = new Schema<CategoryType>(
  {
    name: {
      type: String,
      required: [true, "Please enter a category name."],
      unique: true,
    },

    description: {
      type: String,
    },

    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<CategoryType>("Category", categorySchema);

export default Category;