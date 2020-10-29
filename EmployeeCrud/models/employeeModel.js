import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Employee must have a Employee name"],
  },
  designation: {
    type: String,
    required: [true, "A Employee must have a Employee designation"],
  },
  salary: Number,
});

export default mongoose.model("Employee", employeeSchema);
