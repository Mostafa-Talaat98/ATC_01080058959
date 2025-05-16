import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../admin/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', name: 'Admin', role: 'admin' }, isAuthenticated: true })
}));
jest.mock('@/contexts/EventContext', () => ({
  useEvents: () => ({ events: [], deleteEvent: jest.fn() })
}));

describe('AdminDashboard Page', () => {
  it('renders the admin dashboard title', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  it('renders the event table headers', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Event Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
  });
}); 