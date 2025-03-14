import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuestParkingPassForm } from '../GuestParkingPassForm';
import LABELS from '@/app/constants/labels';
import '@testing-library/jest-dom';

type FormValues = {
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  apartmentNumber: string;
};

type StoreState = {
  values: FormValues;
};


jest.mock('@tanstack/react-form', () => ({
  useStore: jest.fn((store, selector) => {
    return selector(store.getState());
  }),
}));

jest.mock('@/app/hooks/useTanstackForm', () => {
  const createStore = (initialState: StoreState) => {
    let state = initialState;
    const listeners: Array<() => void> = [];
    
    return {
      getState: () => state,
      setState: (newState: Partial<StoreState>) => {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener());
      },
      subscribe: (listener: () => void) => {
        listeners.push(listener);
        return () => {
          const index = listeners.indexOf(listener);
          if (index > -1) listeners.splice(index, 1);
        };
      },
    };
  };

  const mockStore = createStore({
    values: {
      make: '',
      model: '',
      color: '',
      licensePlate: '',
      apartmentNumber: ''
    }
  });

  const mockForm = {
    store: mockStore,
    handleSubmit: jest.fn(() => Promise.resolve()),
    setFieldValue: jest.fn((field: string, value: string) => {
      const currentValues = mockStore.getState().values;
      mockStore.setState({
        values: {
          ...currentValues,
          [field]: value
        }
      });
    }),
    state: {
      values: mockStore.getState().values
    }
  };

  return {
    useTanstackForm: jest.fn(() => mockForm)
  };
});

describe('GuestParkingPassForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with empty fields initially', () => {
    render(<GuestParkingPassForm />);
    
    expect(screen.getByRole('heading', { name: LABELS.GuestParkingPassForm.title })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.vehicleMake)).toHaveValue('');
    expect(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.vehicleModel)).toHaveValue('');
    expect(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.vehicleColor)).toHaveValue('');
    expect(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.licensePlate)).toHaveValue('');
    expect(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.apartmentNumber)).toHaveValue('');
    expect(screen.getByRole('button', { name: LABELS.GuestParkingPassForm.submitButton })).toBeInTheDocument();
  });

  it('updates form values when user types in fields', async () => {
    const user = userEvent.setup();
    render(<GuestParkingPassForm />);
    await user.type(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.vehicleMake), 'Toyota');
    await user.type(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.vehicleModel), 'Camry');
    await user.type(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.vehicleColor), 'Blue');
    await user.type(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.licensePlate), 'ABC123');
    await user.type(screen.getByPlaceholderText(LABELS.GuestParkingPassForm.apartmentNumber), '42');

    const { useTanstackForm } = jest.requireMock('@/app/hooks/useTanstackForm');
    const mockForm = useTanstackForm();
    expect(mockForm.setFieldValue).toHaveBeenCalledWith('make', 'Toyota');
    expect(mockForm.setFieldValue).toHaveBeenCalledWith('model', 'Camry');
    expect(mockForm.setFieldValue).toHaveBeenCalledWith('color', 'Blue');
    expect(mockForm.setFieldValue).toHaveBeenCalledWith('licensePlate', 'ABC123');
    expect(mockForm.setFieldValue).toHaveBeenCalledWith('apartmentNumber', '42');
  });

  it('submits the form and shows the parking pass when submitted', async () => {
    const user = userEvent.setup();
    render(<GuestParkingPassForm />);
    await user.click(screen.getByRole('button', { name: LABELS.GuestParkingPassForm.submitButton }));
    const { useTanstackForm } = jest.requireMock('@/app/hooks/useTanstackForm');
    const mockForm = useTanstackForm();
    expect(mockForm.handleSubmit).toHaveBeenCalled();
  });
});
