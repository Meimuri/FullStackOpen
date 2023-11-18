const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
    <p>
        <b>Number of exercises {sum}</b>
    </p>
);

const Part = ({ name, exercises }) => (
    <li>
        {name} {exercises}
    </li>
);

const Content = ({ parts }) => (
    <ul>
        {parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </ul>
);

const Course = ({ course }) => {
    const arr = course.parts;
    const sum = arr.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
    );
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={sum} />
        </>
    );
};

export default Course;
