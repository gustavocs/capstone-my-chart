import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Simple smoke test - just verify the app renders without crashing
describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
