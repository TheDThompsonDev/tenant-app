'use client';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form';
import LABELS from '@/app/constants/labels';
import { updateUserPassword } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <div className='h-4 text-alternate-light-gray text-sm font-thin ml-2'>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  );
};

interface ChangePasswordFormProps {
  displayEditProfile: () => void;
}

const ChangePasswordForm = ({
  displayEditProfile,
}: ChangePasswordFormProps) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      currPassword: '',
      newPassword: '',
    },
    onSubmit: async ({ value }) => {
      await updateUserPassword(value.currPassword, value.newPassword);
      router.push('/dashboard');
    },
  });

  const handleCancelClick = () => {
    displayEditProfile();
  };

  const labelClasses = 'text-white text-xl';
  const inputClasses =
    'w-full p-3 bg-[#0F3645] text-white rounded-md focus:outline-none';
  const btnClasses =
    'w-full bg-primary-green text-white text-sm lg:text-lg p-3 rounded-md';

  return (
    <div className='w-full relative bottom-40 px-6 lg:static'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className='space-y-4 max-w-[400px] mx-auto'
      >
        <form.Field
          name='currPassword'
          validators={{
            onChange: ({ value }) =>
              !value ? 'Current password is required' : undefined,
            onChangeAsyncDebounceMs: 100,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return (
                value.includes('error') &&
                'No "error" allowed in current password'
              );
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className={labelClasses}>
                {LABELS.changePassword.formLabels.currPassword}
              </label>
              <input
                className={inputClasses}
                id={field.name}
                name={field.name}
                type='password'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name='newPassword'
          validators={{
            onChange: ({ value }) =>
              !value ? 'New password is required' : undefined,
            onChangeAsyncDebounceMs: 100,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return (
                value.includes('error') && 'No "error" allowed in new password'
              );
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className={labelClasses}>
                {LABELS.changePassword.formLabels.newPassword}
              </label>
              <input
                className={inputClasses}
                id={field.name}
                name={field.name}
                type='password'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div className='flex flex-row gap-4 lg:gap-12 pt-8'>
          <button
            type='button'
            className={btnClasses}
            onClick={handleCancelClick}
          >
            {LABELS.editProfile.formBtns.cancelBtn}
          </button>
          <button type='submit' className={btnClasses}>
            {LABELS.changePassword.formBtns.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
