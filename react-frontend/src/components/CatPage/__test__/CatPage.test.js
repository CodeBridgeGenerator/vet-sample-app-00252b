import React from "react";
import { render, screen } from "@testing-library/react";

import CatPage from "../CatPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cat page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CatPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cat-datatable")).toBeInTheDocument();
    expect(screen.getByRole("cat-add-button")).toBeInTheDocument();
});
