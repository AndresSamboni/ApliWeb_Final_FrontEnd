export const signIn = async (userName: string, password: string): Promise<{ success: boolean; error?: string; userRole?: string }> => {
  try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
          return { success: true, userRole: data.userRole };
      } else {
          return { success: false, error: data.message };
      }
  } catch (error) {
      return { success: false, error: 'Error de red' };
  }
};
