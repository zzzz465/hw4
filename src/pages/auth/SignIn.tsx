import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Button, Paper, Title, Container, Text, Group, Transition, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, isEmail } from '@mantine/form';
import { auth } from '../../services/auth';

interface FormValues {
  email: string;
  password: string;
  apiKey: string;
}

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  console.log('[SignIn] Component rendered, isLogin:', isLogin, 'loading:', loading);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
      apiKey: '',
    },
    validateInputOnChange: true,
    validate: {
      email: (value) => {
        const result = isEmail('Invalid email')(value);
        console.log('[SignIn] Email validation:', { value, result });
        return result;
      },
      password: (value) => {
        console.log('[SignIn] Password validation:', { value, length: value.length });
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password should be at least 6 characters';
        return null;
      },
      apiKey: (value, values) => {
        console.log('[SignIn] API Key validation:', { value, isLogin });
        if (!isLogin && !value) return 'TMDB API Key is required';
        return null;
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    console.log('[SignIn] Form submission started:', { values, isLogin });
    setLoading(true);

    try {
      if (isLogin) {
        console.log('[SignIn] Attempting login...');
        auth.login(values.email, values.password);
        console.log('[SignIn] Login successful');
        notifications.show({
          title: 'Success',
          message: 'Successfully logged in!',
          color: 'green',
          autoClose: 2000,
        });
        navigate('/');
      } else {
        console.log('[SignIn] Attempting registration...');
        auth.register(values.email, values.password, values.apiKey);
        console.log('[SignIn] Registration successful');
        notifications.show({
          title: 'Success',
          message: 'Successfully registered! Please log in.',
          color: 'green',
          autoClose: 2000,
        });
        setIsLogin(true);
        form.reset();
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';

      if (error instanceof Error) {
        switch (error.message) {
          case 'Email already registered':
            errorMessage = 'This email is already registered. Please try logging in.';
            break;
          case 'Invalid email or password':
            errorMessage = 'Incorrect email or password. Please try again.';
            break;
          default:
            errorMessage = error.message;
        }
      }

      notifications.show({
        title: isLogin ? 'Login Failed' : 'Registration Failed',
        message: errorMessage,
        color: 'red',
        autoClose: 3000,
      });
    } finally {
      console.log('[SignIn] Form submission completed');
      setLoading(false);
    }
  };

  const formStyles = {
    label: { color: '#737373' },
    input: {
      backgroundColor: '#333',
      borderColor: '#333',
      color: '#fff',
      '&::placeholder': {
        color: '#737373'
      }
    },
    error: { color: '#ff6b6b' }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="min-h-screen bg-black/60 flex items-center justify-center">
        <Container size="xs" className="w-full">
          <Paper className="p-8 bg-black/75" radius="md">
            <Transition
              mounted={true}
              transition="slide-right"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  <Title order={1} className="mb-6">
                    {isLogin ? 'Sign In' : 'Register'}
                  </Title>

                  <form onSubmit={form.onSubmit(handleSubmit)} className="mb-4">
                    <Transition
                      mounted={true}
                      transition="fade"
                      duration={400}
                      timingFunction="ease"
                    >
                      {(styles) => (
                        <div style={styles} className="space-y-4">
                          <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            {...form.getInputProps('email')}
                            styles={formStyles}
                          />

                          <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            {...form.getInputProps('password')}
                            styles={{
                              ...formStyles,
                              innerInput: {
                                color: '#fff'
                              }
                            }}
                          />

                          <Transition
                            mounted={!isLogin}
                            transition="slide-down"
                            duration={400}
                            timingFunction="ease"
                          >
                            {(styles) => (
                              <div style={styles}>
                                <TextInput
                                  label="TMDB API Key"
                                  placeholder="Enter your TMDB API key"
                                  {...form.getInputProps('apiKey')}
                                  styles={formStyles}
                                />
                              </div>
                            )}
                          </Transition>

                          <Button
                            type="submit"
                            fullWidth
                            color="red"
                            loading={loading}
                          >
                            {isLogin ? 'Sign In' : 'Register'}
                          </Button>
                        </div>
                      )}
                    </Transition>
                  </form>

                  <Group justify="center">
                    <Text size="sm" className="text-gray-400">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Text>
                    <Text
                      size="sm"
                      className="text-white cursor-pointer hover:underline"
                      onClick={() => {
                        form.reset();
                        setIsLogin(!isLogin);
                      }}
                    >
                      {isLogin ? 'Register' : 'Sign In'}
                    </Text>
                  </Group>
                </div>
              )}
            </Transition>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
