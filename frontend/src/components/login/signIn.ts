import usersData from '../usersEjemplo.json';

interface User {
  username: string;
  password: string;
  state: boolean;
}

export const signIn = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
  // Busca el usuario en el arreglo de usuarios
  const user = usersData.find((user: User) => user.username === username && user.password === password);

  // Verifica si se encontró el usuario
  if (user) {
    // Verifica si el usuario está activo
    if (user.state) {
      // Llama a la función encodeFun para encriptar la contraseña
      const encodedPassword = await encodeFun(user.password);
      
      // Aquí puedes sobrescribir el campo user.password con la contraseña encriptada si lo necesitas
      
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

// Función de ejemplo para encriptar la contraseña (reemplaza con tu lógica real)
const encodeFun = async (password: string): Promise<string> => {
  // Aquí puedes implementar la lógica de encriptación de la contraseña
  // Por ahora, simplemente devolvemos la misma contraseña
  return password;
};
