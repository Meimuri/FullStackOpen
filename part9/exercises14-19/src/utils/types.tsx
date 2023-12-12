export interface HeaderProps {
    courseName: string;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseWithBackground extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBaseWithBackground {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBackground extends CoursePartBaseWithBackground {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithBackground {
    requirements: string[];
    kind: "special";
}

export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;
