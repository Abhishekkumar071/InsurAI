import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (res) => {
      login(res.data);
      toast.success('Account created!');
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Registration failed');
    },
  });

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50/60 px-4 py-14">
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
      <Card className="relative w-full max-w-md border-white/80 bg-white/90 p-8 shadow-xl shadow-primary-900/10 backdrop-blur">
        <div className="flex flex-col items-center mb-6">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20"><ShieldCheck size={27} /></span>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">Start comparing and applying for policies</p>
        </div>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Rahul Sharma"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
