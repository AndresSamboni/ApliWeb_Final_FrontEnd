import usersData from './usersEjemplo.json';

interface User {
  username: string;
  password: string;
  state: boolean;
}

export const signIn = (username: string, password: string): { success: boolean; error?: string } => {
  // Busca el usuario en el arreglo de usuarios
  const user = usersData.find((user: User) => user.username === username && user.password === password);

  // Verifica si se encontró el usuario
  if (user) {
    // Verifica si el usuario está activo
    if (user.state) {
      // Usuario autenticado
      return { success: true };
    } else {
      // Usuario deshabilitado
      return { success: false, error: 'El usuario está deshabilitado, contacta con el administrador para habilitarlo de nuevo.' };
    }
  } else {
    // Usuario no encontrado
    return { success: false, error: 'Nombre de usuario o contraseña incorrectos.' };
  }
};
