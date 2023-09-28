import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../../src/app/components/SearchBar";
import { SearchProvider } from "../../src/app/context/SearchContext";
import '@testing-library/jest-dom/extend-expect';

jest.mock("../../src/app/components/NewIssueButton", () => {
    return () => <div data-testid="new-issue-button"></div>;
});

describe("SearchBar", () => {
    it("renders the search input and button", () => {
        const { getByPlaceholderText, getByTestId } = render(
            <SearchProvider>
                <SearchBar />
            </SearchProvider>
        );

        const searchInput = getByPlaceholderText("Search here...");
        const searchButton = getByTestId("search-button");

        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it("updates the search query on input change", () => {
        const { getByPlaceholderText } = render(
            <SearchProvider>
                <SearchBar />
            </SearchProvider>
        );

        const searchInput = getByPlaceholderText("Search here...") as HTMLInputElement;

        fireEvent.change(searchInput, { target: { value: "test query" } });

        expect(searchInput.value).toBe("test query");
    });
});
