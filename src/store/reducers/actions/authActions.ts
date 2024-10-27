import { AppDispatch } from '../../../store';
import { loginSuccess } from '../../reducers/authreducer';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(loginSuccess({ user: data.user, token: data.token }));
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Server error', error);
  }
};
