import { Schema, Document ,model, models} from "mongoose";

export interface IExperiment extends Document{
  year: number;
  aceYear: string;
  Branch: string;
  CCode: string;
  CName: string;
  ExpNo: number;
  ExpName: string;
  ExpDesc: string;
  ExpSoln: string;
  youtubeLink?: string; 
}

const ExperimentSchema = new Schema({
  year: { type: Number, required: true },
  aceYear: { type: String, required: true },
  Branch: { type: String, required: true },
  CCode: { type: String, required: true },
  CName: { type: String, required: true },
  ExpNo: { type: Number, required: true },
  ExpName: { type: String, required: true },
  ExpDesc: { type: String, required: true },
  ExpSoln: { type: String, required: true },
  youtubeLink: { type: String, required: false }, 
});

const Experiment = models.Experiment || model("Experiment", ExperimentSchema);

export default Experiment;