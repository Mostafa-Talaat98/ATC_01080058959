
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthCard } from '@/components/auth/AuthCard';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const loginSchema = z.object({
    email: z.string().email({ message: t('auth.email') }),
    password: z.string().min(6, { message: t('auth.password') }),
  });
  
  type LoginFormData = z.infer<typeof loginSchema>;
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // If isAdmin, pre-fill with admin email
      const emailToUse = isAdmin && data.email === '' ? 'admin@example.com' : data.email;
      await login(emailToUse, data.password);
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', emailToUse);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      navigate('/');
      toast.success(t('auth.loginSuccess') || 'Successfully logged in!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle forgot password
  const handleForgotPassword = () => {
    toast.info(t('auth.passwordReset') || 'Password reset functionality coming soon.');
  };
  
  // Load remembered email on component mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      form.setValue('email', savedEmail);
      setRememberMe(true);
    }
  }, [form]);
  
  return (
    <div className="bg-gradient-to-b from-primary/5 to-background min-h-[calc(100vh-64px-180px)]">
      <AuthCard
        title={t('auth.welcomeBack')}
        description={t('auth.loginDesc')}
        footer={
          <p className="w-full text-center text-sm">
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('auth.signUp')}
            </Link>
          </p>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="email" 
                        placeholder={isAdmin ? "admin@example.com" : "you@example.com"} 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="********" 
                        className="pl-10" 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label 
                  htmlFor="remember-me" 
                  className="text-sm cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Button>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 transition-colors" 
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};

export default Login;
