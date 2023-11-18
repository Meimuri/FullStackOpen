describe("Blog App", function () {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        const user = {
            name: "Tester",
            username: "tester",
            password: "password",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.visit("");
    });
    it("dsplays login form by default", function () {
        cy.contains("Login to app");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.contains("Login").click();
            cy.get("#username").type("tester");
            cy.get("#password").type("password");
            cy.get("#login-button").click();

            cy.contains("Tester logged in");
        });

        it("fails with wrong credentials", function () {
            cy.contains("Login").click();
            cy.get("#username").type("tester");
            cy.get("#password").type("wrongpassword");
            cy.get("#login-button").click();

            cy.get(".error")
                .should("contain", "Wrong credentials")
                .and("have.css", "color", "rgb(255, 0, 0)")
                .and("have.css", "border-style", "solid");

            cy.get("html").should("not.contain", "Tester logged in");
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "tester", password: "password" });
        });

        it("a new blog can be created", function () {
            cy.contains("New Blog").click();
            cy.get("#title").type("Cypress Title");
            cy.get("#author").type("Cypress Author");
            cy.get("#url").type("www.cypress.com");
            cy.contains("Save").click();
            cy.contains("Cypress Title by Cypress Author");
        });

        it("a blog can be liked", function () {
            cy.createBlog({
                title: "Cypress Title",
                author: "Cypress Author",
                url: "www.cypress.com",
                likes: 0,
            });
            cy.contains("View").click();
            cy.contains("Likes: 0");
            cy.contains("button", "Like").click();
            cy.contains("Likes: 1");
        });

        it("a blog can be deleted by the author who created it", function () {
            cy.createBlog({
                title: "Cypress Title",
                author: "Cypress Author",
                url: "www.cypress.com",
                likes: 0,
            });

            const title = "Cypress Title";

            cy.contains("View").click();
            cy.get("button").contains("Delete").should("exist");
            cy.contains("Delete").click();
            cy.contains(`"${title}" deleted`);
        });

        it("a blog cannot be deleted by anyone except the author", function () {
            cy.createBlog({
                title: "Cypress Title",
                author: "Cypress Author",
                url: "www.cypress.com",
                likes: 0,
            });

            const user = {
                name: "Tester2",
                username: "tester2",
                password: "password",
            };
            cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
            cy.login({ username: "tester2", password: "password" });
            cy.contains("Tester2 logged in");
            cy.contains("View").click();
            cy.get("button").contains("Delete").should("not.exist");
        });

        describe("and there are multiple blog post", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "Sample blog with 2nd most likes",
                    author: "Cypress Author",
                    url: "www.google.com",
                    likes: 50,
                });
                cy.createBlog({
                    title: "Sample blog with least likes",
                    author: "Cypress Author",
                    url: "www.google.com",
                    likes: 0,
                });
                cy.createBlog({
                    title: "Sample blog with most likes",
                    author: "Cypress Author",
                    url: "www.google.com",
                    likes: 100,
                });
            });
            it("blogs are sorted by likes with most likes on top", function () {
                cy.get(".blog").eq(0).contains("Sample blog with most likes");
                cy.get(".blog")
                    .eq(1)
                    .contains("Sample blog with 2nd most likes");
                cy.get(".blog").eq(2).contains("Sample blog with least likes");
            });
        });
    });
});
