import { Model, model, Schema } from "mongoose";
import { BookInstanceMEthods, IBooks } from "../interfaces/books.interface";
type BookModelType = Model<IBooks, {}, BookInstanceMEthods>;

const bookSchema = new Schema<IBooks, BookModelType,BookInstanceMEthods>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        genre: {
            type: String,
            enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
        },
        isbn: { type: String, unique: [true, 'isbn number is already given'], required: true, trim: true },
        description: { type: String, trim: true },
        copies: {
            type: Number,
            required: true,
            min: [0, "Copies must be a positive number"]
        },
        available: {
            type: Boolean,
            default: true
        }

    },
    {
        // _id: false,
        versionKey: false,
        timestamps: true
    }
)

bookSchema.method("deductCopies", async function (quantity: number) {
    if (this.copies < quantity) {
        throw new Error("Not enough copies available");
    }
    this.copies = this.copies - quantity;
    if (this.copies === 0) {
        this.available = false;
    }
    await this.save();
})

bookSchema.post('save', function (doc, next) {
  console.log(`📘 Book "${doc.title}" saved successfully `);
  next();
});

export const Book = model<IBooks, BookModelType>("Book", bookSchema)