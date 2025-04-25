import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './App';

describe('BookingForm', () => {
  test('renders form fields correctly', () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guests/i)).toBeInTheDocument();
  });

  test('shows validation errors on submit with empty fields', () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByText(/Book Table/i));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Time is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Guests must be greater than 0/i)).toBeInTheDocument();
  });

  test('accepts valid inputs and submits form', () => {
    window.alert = jest.fn(); // Mock alert

    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-05-01' } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '19:00' } });
    fireEvent.change(screen.getByLabelText(/Guests/i), { target: { value: '2' } });

    fireEvent.click(screen.getByText(/Book Table/i));

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('John'));
  });
});
