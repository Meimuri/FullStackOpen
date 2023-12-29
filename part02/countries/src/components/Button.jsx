const Button = ({ name, functionHandler }) => {
    return <button onClick={() => functionHandler(name)}>Show</button>;
};

export default Button;
