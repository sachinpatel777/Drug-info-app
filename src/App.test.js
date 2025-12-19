import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import App from './App';
import { useDrugLogic } from './hooks/useDrugLogic';


describe('useDrugLogic Hook', () => {
  test('should initialize with default states', () => {
    const { result } = renderHook(() => useDrugLogic());
    expect(result.current.states.searchQuery).toBe('');
    expect(result.current.states.selectedCompany).toBe('');
    expect(result.current.states.page).toBe(1);
  });

  test('should handle reset correctly', () => {
    const { result } = renderHook(() => useDrugLogic());
    act(() => {
      result.current.actions.setSearchQuery('test');
      result.current.actions.handleReset();
    });
    expect(result.current.states.searchQuery).toBe('');
  });
});


describe('Drug Information System Integration', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(cleanup);

  test('renders the main title', () => {
    const titleElement = screen.getByText(/Drug Information System/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('search filter works correctly', () => {
    const searchInput = screen.getByLabelText(/Search by Code or Name/i);
    fireEvent.change(searchInput, { target: { value: '48951' } });
    
    
    const codeDisplay = screen.getAllByText(/48951/i);
    expect(codeDisplay.length).toBeGreaterThan(0);
  });

  test('company filter dropdown updates correctly', () => {
    const selectLabel = screen.getByLabelText(/Filter by Company/i);
    fireEvent.mouseDown(selectLabel); 
    const options = screen.getByRole('listbox');
    expect(options).toBeInTheDocument();
  });

  test('pagination changes data view', () => {
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();

    const page2Button = screen.getByLabelText(/Go to page 2/i);
    fireEvent.click(page2Button);

    
    expect(page2Button).toHaveAttribute('aria-current', 'page');
  });

  test('clicking company in table clears search and filters by company', () => {
    const searchInput = screen.getByLabelText(/Search by Code or Name/i);
    fireEvent.change(searchInput, { target: { value: '48951' } });

    
    const companyCells = screen.getAllByText(/Uriel Pharmacy Inc./i); 
    fireEvent.click(companyCells[0]); 

    
    expect(searchInput.value).toBe('');
  });

  test('clicking title resets the whole app (Header test)', () => {
    const searchInput = screen.getByLabelText(/Search by Code or Name/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const title = screen.getByText(/Drug Information System/i);
    fireEvent.click(title);

    expect(searchInput.value).toBe('');
  });
});

test('shows "No results found" for invalid search', () => {
  render(<App />);
  const searchInput = screen.getByLabelText(/Search by Code or Name/i);
  fireEvent.change(searchInput, { target: { value: 'InvalidDrugName123' } });
  
  expect(screen.getByText(/No results found matching your criteria/i)).toBeInTheDocument();
});