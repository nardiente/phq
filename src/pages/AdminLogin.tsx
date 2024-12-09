import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setKaslKey, setSessionToken } from '../utils/localStorage';
import { getSessionToken } from '../utils/localStorage';
import { postApi } from '../utils/api/api';
import { User, UserTypes } from '../types/user';
import { generateToken } from '../utils/token';
import { Project } from '../types/project';
import { Subscription } from '../types/billing';
import { ApiFieldError } from '../utils/api/types';
import { toast } from 'react-toastify';
import { OnboardingPages, OnboardingUrls } from '../types/onboarding';
import { useUser } from '../contexts/UserContext';

export default function AdminLogin() {
  const navigate = useNavigate();

  const { handleGetUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [, /*field_errors*/ setApiFieldErrors] = useState<ApiFieldError[]>([]);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Simulate login and save token
  //   if (email === 'admin@example.com' && password === 'password') {
  //     localStorage.setItem('authToken', 'your-auth-token');
  //     navigate('/dashboard'); // Redirect to the dashboard
  //   } else {
  //     alert('Invalid email or password');
  //   }
  // };

  const clearMsgs = () => {
    setApiFieldErrors([]);
  };

  const onSubmit = async () => {
    setLoading(true);
    const login_params = {
      email: email,
      password: password,
      type: is_public ? UserTypes.USER : UserTypes.CUSTOMER,
    };
    if (is_public) {
      Object.assign(login_params, {
        domain: window.location.host,
      });
      if (getSessionToken() === null) {
        setSessionToken(await generateToken());
      }
    }
    postApi<
      User & {
        project?: Project;
        subscription: Subscription & { trial_end: number | string | null };
      }
    >({
      url: 'auth/login',
      payload: login_params,
      useSessionToken: is_public,
    }).then(async (res) => {
      setLoading(false);
      if (res.results.errors) {
        setApiFieldErrors(res.results.errors);
      }
      if (res.results.error) {
        switch (res.results.error) {
          case 'error.invalid_credentials':
            setApiFieldErrors([
              {
                field: 'password',
                message: res.results.error,
              },
            ]);
            break;
          case 'error.email.unverified':
            toast('Please check your email for email confirmation.', {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              className: 'custom-theme',
            });
            break;
          case 'error.invalid_user_type':
            toast(
              'This email address is already taken. If you are an admin, please log on to the admin portal.',
              {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                className: 'custom-theme-toast',
              }
            );
            break;
          case 'error.invalid_sign_in_page': {
            const error =
              'This is the public board login. If you are an admin, sign in using THIS page.';
            const errorSplit = error.split('THIS');
            setApiFieldErrors([
              {
                field: 'password',
                message: '',
                error: (
                  <>
                    {errorSplit[0]}
                    <a href={import.meta.env.VITE_ADMIN_HOST}>THIS</a>
                    {errorSplit[1]}
                  </>
                ),
              },
            ]);
            break;
          }
          default:
            setApiFieldErrors([
              {
                field: 'password',
                message: res.results.error,
              },
            ]);
            break;
        }
      }
      if (res.headers['token']) {
        setSessionToken(res.headers['token'].toString());
      }
      if (res.headers['kasl-key'] && !res.results.error && res.results.data) {
        clearMsgs();
        localStorage.removeItem('onboarding_page');
        localStorage.removeItem('onboarding_token');
        const result: User & {
          project?: Project;
          subscription: Subscription & { trial_end: number | string | null };
        } = res.results.data;
        if (result.onboarding_done === undefined || result.onboarding_done) {
          setKaslKey(res.headers['kasl-key'].toString());
          await handleGetUser();
          if (is_public) {
            navigate('/upvotes');
            return;
          }
          const subscription = result.subscription;
          if (
            subscription &&
            subscription.status === 'canceled' &&
            subscription.trial_end
          ) {
            navigate('/billing');
            return;
          }
          navigate('/upvotes');
          return;
        }
        localStorage.setItem('onboarding_page', result.onboarding_page ?? '');
        localStorage.setItem(
          'onboarding_token',
          res.headers['kasl-key'].toString()
        );
        navigate(
          OnboardingUrls[
            localStorage.getItem('onboarding_page') as OnboardingPages
          ]
        );
        return;
      }
      if (res.results.message == 'success.login_email_confirmation') {
        toast('Please check your email for email confirmation.', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
        });
      }
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Logo and Branding */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full text-xl font-bold">
            P
          </div>
          <h1 className="text-2xl font-semibold text-purple-700 ml-2">
            ProductHQ
          </h1>
        </div>

        {/* Page Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Admin Sign in
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Don't have an account yet?{' '}
          <a
            onClick={() => navigate('/sign-up')}
            className="text-purple-600 hover:underline cursor-pointer"
          >
            Sign up
          </a>
        </p>

        {/* Sign-In Form */}
        <form className="space-y-4">
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {passwordVisible ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-purple-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            disabled={loading}
            onClick={onSubmit}
          >
            Sign in →
          </button>
        </form>

        {/* Third-Party Logins */}
        <p className="text-sm text-gray-500 text-center my-6">Or login via</p>
        <div className="flex flex-col space-y-3">
          <button
            disabled={loading}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Log in with Google
          </button>
          <button
            disabled={loading}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"
          >
            Log in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
