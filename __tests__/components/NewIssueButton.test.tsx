import React from "react";
import { render, screen } from "@testing-library/react";
import NewIssueButton from "../../src/app/components/NewIssueButton";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

test("it renders a New Issue button with a link", () => {
    render(
        <MemoryRouter>
            <NewIssueButton />
        </MemoryRouter>
    );

    const newIssueButton = screen.getByText("New Issue");
    const link = screen.getByRole("link", { name: "New Issue" });

    expect(newIssueButton).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/NewIssue");
});
