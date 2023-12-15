import {
    DiagnosisCode,
    Discharge,
    EntryWithoutId,
    HealthCheckRating,
    NewDiagnosisEntry,
    SickLeave,
} from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Invalid or missing 'description'");
    }
    return description;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Invalid or missing 'date': " + date);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Invalid or missing 'specialist'");
    }
    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisCode["code"]> => {
    if (Array.isArray(object)) {
        return object as Array<DiagnosisCode["code"]>;
    }

    if (
        !object ||
        typeof object !== "object" ||
        !("diagnosisCodes" in object)
    ) {
        return [] as Array<DiagnosisCode["code"]>;
    }

    return object.diagnosisCodes as Array<DiagnosisCode["code"]>;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === "number" || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
    healthCheckRating: unknown
): HealthCheckRating => {
    if (
        healthCheckRating === undefined ||
        !isNumber(healthCheckRating) ||
        !isHealthCheckRating(healthCheckRating)
    ) {
        throw new Error(
            "Invalid or missing 'healthCheckRating': " + healthCheckRating
        );
    }
    return healthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== "object") {
        throw new Error("Invalid or missing sick leave data");
    }

    if ("startDate" in object && "endDate" in object) {
        const sickLeave: SickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate),
        };
        return sickLeave;
    }
    throw new Error("Invalid sick leave data: a field missing");
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Invalid or missing 'employerName'");
    }
    return employerName;
};

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error("Invalid or missing 'criteria'");
    }
    return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== "object") {
        throw new Error("Invalid or missing discharge data");
    }

    if ("date" in object && "criteria" in object) {
        const discharge: Discharge = {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria),
        };
        return discharge;
    }
    throw new Error("Invalid discharge data: a field missing");
};

const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== "object") {
        throw new Error("Invalid or missing data");
    }

    if ("description" in object && "date" in object && "specialist" in object) {
        const newBaseEntry: NewDiagnosisEntry =
            "diagnosisCodes" in object
                ? {
                      description: parseDescription(object.description),
                      date: parseDate(object.date),
                      specialist: parseSpecialist(object.specialist),
                      diagnosisCodes: parseDiagnosisCodes(
                          object.diagnosisCodes
                      ),
                  }
                : {
                      description: parseDescription(object.description),
                      date: parseDate(object.date),
                      specialist: parseSpecialist(object.specialist),
                  };

        if ("type" in object) {
            switch (object.type) {
                case "HealthCheck":
                    if ("healthCheckRating" in object) {
                        const healthCheckEntry: EntryWithoutId = {
                            ...newBaseEntry,
                            type: "HealthCheck",
                            healthCheckRating: parseHealthCheckRating(
                                object.healthCheckRating
                            ),
                        };
                        return healthCheckEntry;
                    }
                    throw new Error(
                        "Invalid data: 'healthCheckRating' is required for HealthCheck entry"
                    );

                case "OccupationalHealthcare":
                    if ("employerName" in object) {
                        let occupationalHealthcareEntry: EntryWithoutId;

                        "sickLeave" in object
                            ? (occupationalHealthcareEntry = {
                                  ...newBaseEntry,
                                  type: "OccupationalHealthcare",
                                  employerName: parseEmployerName(
                                      object.employerName
                                  ),
                                  sickLeave: parseSickLeave(object.sickLeave),
                              })
                            : (occupationalHealthcareEntry = {
                                  ...newBaseEntry,
                                  type: "OccupationalHealthcare",
                                  employerName: parseEmployerName(
                                      object.employerName
                                  ),
                              });
                        return occupationalHealthcareEntry;
                    }
                    throw new Error(
                        "Invalid or missing 'employerName' for OccupationalHealthcare entry"
                    );

                case "Hospital":
                    if ("discharge" in object) {
                        const hospitalEntry: EntryWithoutId = {
                            ...newBaseEntry,
                            type: "Hospital",
                            discharge: parseDischarge(object.discharge),
                        };
                        return hospitalEntry;
                    }
                    throw new Error(
                        "Invalid data: 'discharge' missing for Hospital entry"
                    );
            }
        }
    }
    throw new Error("Invalid data: a field missing");
};

export default toNewEntry;
