import '@testing-library/jest-dom';

// Mock the ChakraProvider to avoid issues with Chakra UI components in tests
jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    ChakraProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));