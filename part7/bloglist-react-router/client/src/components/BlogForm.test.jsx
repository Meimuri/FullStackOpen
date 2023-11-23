import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
    test("Calls the event handler when clicking save and receives the props with right details", async () => {
        const handleAddBlog = jest.fn();
        const user = userEvent.setup();

        render(<BlogForm handleAddBlog={handleAddBlog} />);

        const title = screen.getByPlaceholderText("Title");
        const author = screen.getByPlaceholderText("Author");
        const url = screen.getByPlaceholderText("Url");
        const sendButton = screen.getByText("Save");

        await user.type(title, "War and Peace");
        await user.type(author, "Leo Tolstoy");
        await user.type(url, "www.google.com");
        await user.click(sendButton);

        expect(handleAddBlog.mock.calls).toHaveLength(1);
        expect(handleAddBlog.mock.calls[0][0].title).toBe("War and Peace");
        expect(handleAddBlog.mock.calls[0][0].author).toBe("Leo Tolstoy");
        expect(handleAddBlog.mock.calls[0][0].url).toBe("www.google.com");
    });
});
