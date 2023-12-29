import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogContent from "./BlogContent";

describe("<BlogContent />", () => {
    let container;

    const handleLike = jest.fn();

    const userData = {
        username: "admin",
        name: "Michael Alcaraz II",
    };

    const blogData = {
        id: 1,
        title: "War and Peace",
        author: "Leo Tolstoy",
        url: "www.google.com",
        likes: 2902,
        user: {
            username: "supervisor",
            name: "John Doe",
        },
    };

    beforeEach(() => {
        container = render(
            <BlogContent
                key={blogData.id}
                blog={blogData}
                user={userData}
                handleLike={handleLike}
            />
        ).container;
    });

    test("Displays the title and author but does not render the url and the number of likes", () => {
        expect(container.querySelector(".title")).toHaveTextContent(
            blogData.title
        );
        expect(container.querySelector(".author")).toHaveTextContent(
            blogData.author
        );
        expect(screen.queryByText(blogData.url)).not.toBeInTheDocument();
        expect(screen.queryByText("Likes:")).not.toBeInTheDocument();
    });

    test("Displays the URL and the number of likes when the View/Show button is clicked", async () => {
        const user = userEvent.setup();
        const button = screen.getByText("View");
        await user.click(button);

        expect(screen.queryByText(blogData.url)).toBeInTheDocument();
        expect(screen.queryByText(blogData.likes)).toBeInTheDocument();
    });

    test("Clicking the Like button twice runs the event handler twice", async () => {
        const user = userEvent.setup();
        const viewButton = screen.getByText("View");
        await user.click(viewButton);

        const likeButton = screen.getByText("Like");
        await user.click(likeButton);
        await user.click(likeButton);

        expect(handleLike.mock.calls).toHaveLength(2);
    });
});
