import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserRound } from 'lucide-react';
import { profileApi } from '@/api/profileApi';
import { INCOME_BRACKET_OPTIONS } from '@/utils/constants';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';

const schema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  occupation: z.string().optional(),
  incomeBracket: z.string().min(1, 'Select an income bracket'),
  dependents: z.number().int().min(0, 'Dependents cannot be negative'),
  smoker: z.boolean(),
  existingHealthConditions: z.string().optional(),
});

const defaults = {
  dateOfBirth: '',
  occupation: '',
  incomeBracket: '',
  dependents: 0,
  smoker: false,
  existingHealthConditions: '',
};

export default function ProfileSetup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });
  const smoker = useWatch({ control, name: 'smoker' });

  useEffect(() => {
    let active = true;
    profileApi.getMy()
      .then((response) => {
        if (active && response.data) reset({ ...defaults, ...response.data, dependents: response.data.dependents ?? 0 });
      })
      .catch((error) => {
        if (error.response?.status !== 404) {
          toast.error(error.response?.data?.message || 'Could not load your profile');
        }
      });
    return () => { active = false; };
  }, [reset]);

  const mutation = useMutation({
    mutationFn: profileApi.createOrUpdate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile saved successfully');
      navigate('/', { replace: true });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Could not save your profile'),
  });

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50/60 px-4 py-14">
      <Card className="relative w-full max-w-xl border-white/80 bg-white/90 p-6 shadow-xl shadow-primary-900/10 backdrop-blur sm:p-8">
        <div className="mb-6 flex flex-col items-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20">
            <UserRound size={25} />
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Your profile</h1>
          <p className="mt-1 text-center text-sm text-gray-500">Help us tailor policy recommendations to you</p>
        </div>

        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Input label="Date of birth" type="date" error={errors.dateOfBirth?.message} {...register('dateOfBirth')} />
          <Input label="Occupation (optional)" placeholder="Software Engineer" {...register('occupation')} />
          <Select
            label="Annual income"
            options={INCOME_BRACKET_OPTIONS}
            placeholder="Select an income bracket"
            error={errors.incomeBracket?.message}
            {...register('incomeBracket')}
          />
          <Input
            label="Number of dependents"
            type="number"
            min="0"
            error={errors.dependents?.message}
            {...register('dependents', { valueAsNumber: true })}
          />

          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <input type="checkbox" {...register('smoker')} className="h-4 w-4 accent-primary-600" />
            Smoker: {smoker ? 'Yes' : 'No'}
          </label>

          <div>
            <label htmlFor="existingHealthConditions" className="mb-1.5 block text-sm font-medium text-gray-700">
              Existing health conditions (optional)
            </label>
            <textarea
              id="existingHealthConditions"
              rows="3"
              placeholder="List any relevant conditions, or leave blank"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
              {...register('existingHealthConditions')}
            />
          </div>

          <Button type="submit" className="w-full" loading={mutation.isPending}>Save Profile</Button>
        </form>
      </Card>
    </div>
  );
}