// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import SearchPage from '../SearchPage';
// import { searchCompetitions } from '../../services/api';

// // Mock the API service
// jest.mock('../../services/api', () => ({
//   searchCompetitions: jest.fn(),
// }));

// // Mock the Zustand store
// jest.mock('../../store/searchStore', () => ({
//   __esModule: true,
//   default: () => ({
//     competitions: [],
//     setCompetitions: jest.fn(),
//   }),
// }));

// describe('SearchPage', () => {
//   beforeEach(() => {
//     (searchCompetitions as jest.Mock).mockClear();
//   });

//   it('renders search input and button', () => {
//     render(
//       <BrowserRouter>
//         <SearchPage />
//       </BrowserRouter>
//     );

//     expect(screen.getByPlaceholderText(/enter competition name/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
//   });

//   it('performs search when button is clicked', async () => {
//     const mockResults = [
//       { id: 1, title: 'Competition 1', date: '2023-01-01', participants: 100 },
//       { id: 2, title: 'Competition 2', date: '2023-02-01', participants: 200 },
//     ];
//     (searchCompetitions as jest.Mock).mockResolvedValue(mockResults);

//     render(
//       <BrowserRouter>
//         <SearchPage />
//       </BrowserRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/enter competition name/i), { target: { value: 'test' } });
//     fireEvent.click(screen.getByRole('button', { name: /search/i }));

//     await waitFor(() => {
//       expect(searchCompetitions).toHaveBeenCalledWith('test');
//       expect(screen.getByText('Competition 1')).toBeInTheDocument();
//       expect(screen.getByText('Competition 2')).toBeInTheDocument();
//     });
//   });

//   it('displays error message when search fails', async () => {
//     (searchCompetitions as jest.Mock).mockRejectedValue(new Error('API error'));

//     render(
//       <BrowserRouter>
//         <SearchPage />
//       </BrowserRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/enter competition name/i), { target: { value: 'test' } });
//     fireEvent.click(screen.getByRole('button', { name: /search/i }));

//     await waitFor(() => {
//       expect(screen.getByText(/an error occurred while searching/i)).toBeInTheDocument();
//     });
//   });
// });