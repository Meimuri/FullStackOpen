import diagnoseData from "../../data/diagnoses";
import { DiagnosisCode } from "../types";

const diagnoses: DiagnosisCode[] = diagnoseData;

const getDiagnoses = (): DiagnosisCode[] => {
    return diagnoses;
};

export default {
    getDiagnoses,
};
