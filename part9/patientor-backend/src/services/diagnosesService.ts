import diagnosesData from "../../data/diagnoses";
import { DiagnosesEntry } from "../types";

const getDiagnoses = (): DiagnosesEntry[] => {
    return diagnosesData;
};

export default {
    getDiagnoses,
};
