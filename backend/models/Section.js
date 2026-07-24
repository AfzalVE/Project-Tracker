import mongoose from 'mongoose';

const sectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    collapsed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Section = mongoose.model('Section', sectionSchema);
export default Section;
