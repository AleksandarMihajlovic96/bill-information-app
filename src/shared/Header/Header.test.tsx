import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

// Mock i18n
const mockChangeLanguage = jest.fn();
let mockLanguage = 'en';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: mockLanguage,
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLanguage = 'en';
  });

  it('renders title', () => {
    render(<Header />);
    expect(screen.getByText('billsPage.billInformation'.toUpperCase())).toBeInTheDocument();
  });

  it('opens menu when avatar button is clicked', () => {
    render(<Header />);
    const avatarBtn = screen.getByRole('button');
    fireEvent.click(avatarBtn);

    expect(screen.getByRole('menu')).toBeVisible();
  });

  it('shows English when language is en', () => {
    mockLanguage = 'en';
    render(<Header />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('shows Gaeilge when language is ga', () => {
    mockLanguage = 'ga';
    render(<Header />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Gaeilge')).toBeInTheDocument();
  });

  it('calls changeLanguage when switch toggled from English to Gaeilge', () => {
    mockLanguage = 'en';
    render(<Header />);
    fireEvent.click(screen.getByRole('button'));

    const switchEl = screen.getByRole('switch');
    fireEvent.click(switchEl);

    expect(mockChangeLanguage).toHaveBeenCalledWith('ga');
  });

  it('calls changeLanguage when switch toggled from Gaeilge to English', () => {
    mockLanguage = 'ga';
    render(<Header />);
    fireEvent.click(screen.getByRole('button'));

    const switchEl = screen.getByRole('switch');
    fireEvent.click(switchEl);

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
