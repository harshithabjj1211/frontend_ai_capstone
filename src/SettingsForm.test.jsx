import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm";

describe("SettingsForm", () => {
  it("renders all form fields", () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enable dark mode/i)).toBeInTheDocument();
  });

  it("submit button is disabled initially", () => {
    render(<SettingsForm />);

    expect(
      screen.getByRole("button", {
        name: /save settings/i,
      })
    ).toBeDisabled();
  });

  it("shows validation for short name", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    const input = screen.getByLabelText(/name/i);

    await user.type(input, "ab");
    await user.tab();

    expect(
      await screen.findByText(/at least 3 characters/i)
    ).toBeInTheDocument();
  });

  it("shows invalid email message", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    const input = screen.getByLabelText(/email/i);

    await user.type(input, "abc");
    await user.tab();

    expect(
      await screen.findByText(/valid email/i)
    ).toBeInTheDocument();
  });

  it("shows password mismatch error", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(
      screen.getByLabelText(/^password$/i),
      "password123"
    );

    await user.type(
      screen.getByLabelText(/confirm password/i),
      "password321"
    );

    await user.tab();

    expect(
      await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });

  it("enables submit button when form is valid", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(
      screen.getByLabelText(/name/i),
      "Harshitha"
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "harshitha@example.com"
    );

    await user.type(
      screen.getByLabelText(/^password$/i),
      "password123"
    );

    await user.type(
      screen.getByLabelText(/confirm password/i),
      "password123"
    );

    expect(
      screen.getByRole("button", {
        name: /save settings/i,
      })
    ).toBeEnabled();
  });

  it("checkbox toggles", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    const checkbox = screen.getByLabelText(
      /enable dark mode/i
    );

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});