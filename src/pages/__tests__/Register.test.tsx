import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ register: jest.fn() })
}));

describe('Register Page', () => {
  it('renders the register form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders the register button', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
}); 