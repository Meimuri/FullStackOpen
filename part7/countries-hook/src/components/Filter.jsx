const Filter = ({ text, inputValue, functionHandler }) => (
    <div>
        {text}
        <input value={inputValue} onChange={functionHandler} />
    </div>
);

export default Filter;
