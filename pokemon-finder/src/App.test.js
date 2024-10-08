// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders search input and button', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter Pokémon name/i);
  const buttonElement = screen.getByText(/search/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('displays error message for non-existing Pokémon', async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter Pokémon name/i);
  const buttonElement = screen.getByText(/search/i);

  fireEvent.change(inputElement, { target: { value: 'nonexistent' } });
  fireEvent.click(buttonElement);

  const errorMessage = await screen.findByText(/pokemon not found/i);
  expect(errorMessage).toBeInTheDocument();
});
