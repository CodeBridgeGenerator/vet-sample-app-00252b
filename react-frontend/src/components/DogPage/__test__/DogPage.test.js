import React from "react";
import { render, screen } from "@testing-library/react";

import DogPage from "../DogPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dog page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DogPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dog-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dog-add-button")).toBeInTheDocument();
});
