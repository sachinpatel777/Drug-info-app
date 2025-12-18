import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('filters data by company', async () => {
  render(<App />);

  expect(screen.getByText(/Drug Information System/i)).toBeInTheDocument();

  const selectLabel = screen.getByLabelText(/Filter by Company/i);
  fireEvent.mouseDown(selectLabel);

  const listbox = screen.getByRole('listbox');
  const option = within(listbox).getByText(/Merck Sharp & Dohme Corp./i);
  fireEvent.click(option);

  const companyCells = screen.getAllByText(/Merck Sharp & Dohme Corp./i);
  expect(companyCells.length).toBeGreaterThan(0);
});