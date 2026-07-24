import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    assignee: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Section',
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
