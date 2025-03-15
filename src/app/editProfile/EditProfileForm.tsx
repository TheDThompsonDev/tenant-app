'use client';
import React from 'react';
import { useForm } from '@tanstack/react-form';
import LABELS from '@/app/constants/labels';

export default function EditProfileForm() {
  // TODO: the default values should come from the logged in users data
  const form = useForm({
    defaultValues: {
      name: 'Animal',
      email: 'wildanimal@email.com',
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
    },
  });

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
        <form.Field name='name'>
          {(field) => (
            <div>
              <label htmlFor='name' className={labelClasses}>
                {LABELS.editProfile.formLabels.name}
              </label>
              <input id='name' type='text' className={inputClasses} />
            </div>
          )}
        </form.Field>

        <form.Field name='email'>
          {(field) => (
            <div>
              <label htmlFor='email' className={labelClasses}>
                {LABELS.editProfile.formLabels.email}
              </label>
              <input id='email' type='email' className={inputClasses} />
            </div>
          )}
        </form.Field>

        <div className='flex flex-row gap-4 lg:gap-12 pt-8'>
          <button
            type='button'
            className={btnClasses}
            onClick={() => console.log('Edit profile cancelled')}
          >
            {LABELS.editProfile.formLabels.cancelBtn}
          </button>
          <button type='submit' className={btnClasses}>
            {LABELS.editProfile.formLabels.saveBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
