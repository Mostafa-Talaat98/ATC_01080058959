import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ login: jest.fn() })
}));

describe('Login Page', () => {
  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders the login button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
}); 