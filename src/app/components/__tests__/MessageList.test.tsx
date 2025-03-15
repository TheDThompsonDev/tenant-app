import { render, screen } from '@testing-library/react';
import MessageList from '../messaging/MessageList';
import '@testing-library/jest-dom';

jest.mock('../messaging/MessageList', () => {
  const originalModule = jest.requireActual('../messaging/MessageList');
  return {
    __esModule: true,
    default: originalModule.default,
  };
});

describe('MessageList', () => {
  it('displays a message when there are no messages', () => {
    render(<MessageList messages={[]} />);
    expect(screen.getByText('No messages found.')).toBeInTheDocument();
  });

  it('renders a list of messages correctly', () => {
    const mockMessages = [
      {
        id: '1',
        subject: 'Test Subject 1',
        body: 'This is test message 1',
        createdAt: '2025-03-14T10:00:00Z',
        from: 'tenant' as const,
        type: 'general' as const
      },
      {
        id: '2',
        subject: 'Package Delivery',
        body: 'Your package has arrived',
        createdAt: '2025-03-14T09:00:00Z',
        from: 'admin' as const,
        type: 'package' as const
      },
      {
        id: '3',
        subject: 'Lease Renewal',
        body: 'Your lease is up for renewal',
        createdAt: '2025-03-14T08:00:00Z',
        from: 'admin' as const,
        type: 'lease' as const
      }
    ];

    render(<MessageList messages={mockMessages} />);

    expect(screen.getByText('Test Subject 1')).toBeInTheDocument();
    expect(screen.getByText('Package Delivery')).toBeInTheDocument();
    expect(screen.getByText('Lease Renewal')).toBeInTheDocument();
    
    expect(screen.getByText('This is test message 1')).toBeInTheDocument();
    expect(screen.getByText('Your package has arrived')).toBeInTheDocument();
    expect(screen.getByText('Your lease is up for renewal')).toBeInTheDocument();

    const timeElements = screen.getAllByText(/\d{1,2}:\d{2} [AP]M/i);
    expect(timeElements.length).toBeGreaterThan(0);

    const generalIcon = screen.getByText('G');
    const packageIcon = screen.getByText('P');
    const leaseIcon = screen.getByText('L');
    
    expect(generalIcon).toBeInTheDocument();
    expect(packageIcon).toBeInTheDocument();
    expect(leaseIcon).toBeInTheDocument();
  });
  
  it('truncates long message bodies', () => {
    const longMessage = {
      id: '4',
      subject: 'Long Message',
      body: 'This is a very long message that should be truncated in the UI to prevent it from taking up too much space. The truncation should happen via CSS.',
      createdAt: '2025-03-14T07:00:00Z',
      from: 'tenant' as const,
      type: 'general' as const
    };
    
    render(<MessageList messages={[longMessage]} />);
    
    expect(screen.getByText(longMessage.body)).toBeInTheDocument();
    const messageBody = screen.getByText(longMessage.body);
    expect(messageBody).toHaveClass('truncate');
  });
});
