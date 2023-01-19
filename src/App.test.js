import React from "react";

import {
  screen,
  render,
  fireEvent,
  cleanup,
  waitFor
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import axiosInstance from "./axios.instance";
import App from "./App";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" });
beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

const todos = [
  {
    id: 1,
    title: "Buy milk",
    completed: false
  },
  {
    id: 2,
    title: "Walk the dog",
    completed: true
  }
];

const renderComponent = () => render(<App />);

describe("axios mocking test", () => {
  it("should render loading followed by todos", async () => {
    mock.onGet("/todos").reply(200, todos);

    const { queryByText, getByTestId } = renderComponent();

    expect(queryByText(/Loading/i)).toBeInTheDocument();
    expect(queryByText(/Walk the dog/i)).not.toBeInTheDocument();

    await waitFor(() => getByTestId("todos"));
    expect(queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(queryByText(/Walk the dog/i)).toBeInTheDocument();
  });
});
