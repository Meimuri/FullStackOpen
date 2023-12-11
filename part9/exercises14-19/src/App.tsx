import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./utils/types";

const App = () => {
    const courseName: string = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
        },
    ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;
