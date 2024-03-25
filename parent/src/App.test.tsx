// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(
    <App />,
  );
  expect(screen.getAllByText(/Log Time/i)[0]).toBeInTheDocument();
});

// test('navigates to Log Time Page Dashboard', () => {
//   render(
//     <App />,
//   );
//   expect(screen.getByText(/log time page dashboard/i)).toBeInTheDocument();
// });
