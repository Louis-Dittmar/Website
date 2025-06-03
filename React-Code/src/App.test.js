import {render, screen} from '@testing-library/react';
import App from './App';

test('renders ToDo List heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/ToDo List/i);
  expect(headingElement).toBeInTheDocument();
});
