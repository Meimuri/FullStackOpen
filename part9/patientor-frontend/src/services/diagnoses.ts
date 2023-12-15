import axios from "axios";
import { DiagnosisCode } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<DiagnosisCode[]>(
        `${apiBaseUrl}/diagnoses`
    );

    return data;
};

export default {
    getAll,
};
