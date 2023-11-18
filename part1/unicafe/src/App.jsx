import { useState } from "react";

const Header = ({ text }) => {
    return <h1>{text}</h1>;
};

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const average = (good * 1 + bad * -1) / all;
    const positive = (good / all) * 100 + " %";

    if (all === 0) {
        return <div>No feedback given.</div>;
    }
    return (
        <table>
            <tbody>
                <StatisticsLine text="Good" value={good} />
                <StatisticsLine text="Neutral" value={neutral} />
                <StatisticsLine text="Bad" value={bad} />
                <StatisticsLine text="All" value={all} />
                <StatisticsLine text="Average" value={average} />
                <StatisticsLine text="Positive" value={positive} />
            </tbody>
        </table>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
    };

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };

    const handleBadClick = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <Header text="Give feedback" />
            <Button handleClick={handleGoodClick} text="Good" />
            <Button handleClick={handleNeutralClick} text="Neutral" />
            <Button handleClick={handleBadClick} text="Bad" />
            <Header text="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
