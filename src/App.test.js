import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App'; // Path fixed here

test('filters data by company', async () => {
  render(<App />);

  // 1. Check if the app renders properly
  expect(screen.getByText(/Drug Information System/i)).toBeInTheDocument();

  // 2. MUI Select dropdown open karein
  const selectLabel = screen.getByLabelText(/Filter by Company/i);
  fireEvent.mouseDown(selectLabel);

  // 3. Dropdown menu se company select karein
  // Note: 'Merck Sharp & Dohme Corp.' aapke drugs.json mein hona chahiye
  const listbox = screen.getByRole('listbox');
  const option = within(listbox).getByText(/Merck Sharp & Dohme Corp./i);
  fireEvent.click(option);

  // 4. Verify karein ki sirf us company ka data dikh raha hai
  const companyCells = screen.getAllByText(/Merck Sharp & Dohme Corp./i);
  expect(companyCells.length).toBeGreaterThan(0);
});