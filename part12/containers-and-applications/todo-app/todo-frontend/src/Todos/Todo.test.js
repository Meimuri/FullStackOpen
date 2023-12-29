import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Todo from "./Todo";

test("renders todo properly", () => {
    const todo = {
        text: "Hello World",
        done: false,
        id: "1",
    };

    const component = render(<Todo todo={todo} />).container;

    expect(component).toHaveTextContent(todo.text);
    expect(component).toHaveTextContent("This todo is not done");
});
