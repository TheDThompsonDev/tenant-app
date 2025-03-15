import { useForm } from '@tanstack/react-form';

export function useTanstackForm<TFormValues>({
  defaultValues,
  onSubmit,
}: {
  defaultValues: TFormValues;
  onSubmit: (values: TFormValues) => Promise<{ status: 'success' | 'error' }>;
}) {
  return useForm<TFormValues, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined>({
    defaultValues,
    onSubmit: async ({ value }) => {
      return onSubmit(value);
    },
  });
}
