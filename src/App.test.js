import { render, screen } from '@testing-library/react';
import App from './App';

// Dear code inspector, hope you're having a purrfect day! 🐱
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
