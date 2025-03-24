// src/services/authService.ts
export const authenticateUser = async (email: string, password: string) => {
    // Mock authentication logic
    if (email === 'admin@mailinator.com' && password === 'admin123') {
      return { success: true, token: 'mock-token' };
    }
    return { success: false, message: 'Invalid credentials' };
  };