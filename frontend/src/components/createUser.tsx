import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Container, Typography, Paper, MenuItem, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface User {
  name: string;
  last_name: string;
  document_type: string;
  document_number: string;
  gender: string;
  email: string;
  phone: string;
  birthdate: string;
  photo: string;
  user_name: string;
  user_password: string;
}

interface CreateUserProps {
  onUserCreated: () => void;
}

const documentTypes = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
  { value: 'CE', label: 'Cédula de Extranjería' }
];

const genderTypes = [
  { value: 'HETE', label: 'Heterosexual' },
  { value: 'HOMO', label: 'Homosexual' },
  { value: 'TRANS', label: 'Transexual' },
  { value: 'BIS', label: 'Bisexual' },
  { value: 'PAN', label: 'Pansexual' },
  { value: 'OTRO', label: 'Otros' }
];

const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated }) => {
  const [user, setUser] = useState<User>({
    name: '',
    last_name: '',
    document_type: '',
    document_number: '',
    gender: '',
    email: '',
    phone: '',
    birthdate: '',
    photo: '',
    user_name: '',
    user_password: ''
  });
  const [errors, setErrors] = useState<Partial<User>>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar el error específico al cambiar el campo
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    const newErrors: Partial<User> = {};

    // Validación de los campos obligatorios
    for (const [key, value] of Object.entries(user)) {
      if (!value && key !== 'phone') {
        newErrors[key as keyof User] = 'Este campo es obligatorio';
      }
    }

    // Validación específica para cada campo
    if (user.document_number && user.document_number.length > 100) {
      newErrors.document_number = 'Máximo 100 caracteres';
    }

    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = 'Formato de correo inválido';
    }

    if (user.email && user.email.length > 100) {
      newErrors.email = 'Máximo 100 caracteres';
    }

    if (user.phone && (!/^\d+$/.test(user.phone) || user.phone.length < 10)) {
      newErrors.phone = 'Número de teléfono inválido (mínimo 10 caracteres)';
    }

    if (user.user_name && user.user_name.length > 40) {
      newErrors.user_name = 'Máximo 40 caracteres';
    }

    if (user.user_password && (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(user.user_password))) {
      newErrors.user_password = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y caracteres no alfanuméricos';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost/phpmyadmin/index.php?route=/sql&db=db_gestion&table=tbl_user&pos=0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      const data = await response.json();
      if (data.status === 'inactive') {
        setGeneralError('El usuario ya existe pero está inactivo');
        return;
      }

      alert('Usuario creado exitosamente');
      setUser({
        name: '',
        last_name: '',
        document_type: '',
        document_number: '',
        gender: '',
        email: '',
        phone: '',
        birthdate: '',
        photo: '',
        user_name: '',
        user_password: ''
      });
      onUserCreated();
    } catch (error) {
      setGeneralError((error as Error).message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Crear Nuevo Usuario
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Ingrese los datos del usuario
          </Typography>
        </Box>
        {generalError && (
          <Typography variant="body1" color="error" gutterBottom>
            {generalError}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {errors.name && (
            <Typography variant="body2" color="error">
              {errors.name}
            </Typography>
          )}
          <TextField
            label="Apellido"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {errors.last_name && (
            <Typography variant="body2" color="error">
              {errors.last_name}
            </Typography>
          )}
          <TextField
            select
            label="Tipo de Documento"
            name="document_type"
            value={user.document_type}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {documentTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {errors.document_type && (
            <Typography variant="body2" color="error">
              {errors.document_type}
            </Typography>
          )}
          <TextField
            label="Número de Documento"
            name="document_number"
            value={user.document_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 100 }}
          />
          {errors.document_number && (
            <Typography variant="body2" color="error">
              {errors.document_number}
            </Typography>
          )}
          <TextField
            select
            label="Género"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {genderTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {errors.gender && (
            <Typography variant="body2" color="error">
              {errors.gender}
            </Typography>
          )}
          <TextField
            label="Correo Electrónico"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="email"
            inputProps={{ maxLength: 100 }}
          />
          {errors.email && (
            <Typography variant="body2" color="error">
              {errors.email}
            </Typography>
          )}
          <TextField
            label="Teléfono"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ minLength: 10, pattern: "[0-9]*" }}
          />
          {errors.photo && (
            <Typography variant="body2" color="error">
              {errors.photo}
            </Typography>
          )}
          <TextField
            label="Nombre de Usuario"
            name="user_name"
            value={user.user_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 40 }}
          />
          {errors.user_name && (
            <Typography variant="body2" color="error">
              {errors.user_name}
            </Typography>
          )}
          <TextField
            label="Contraseña"
            name="user_password"
            value={user.user_password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.user_password && (
            <Typography variant="body2" color="error">
              {errors.user_password}
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Aceptar
            </Button>
          </Box>
        </form>
        <Box sx={{ mt: 2 }}>
          {/* <Button variant="contained" color="secondary" onClick={onUserCreated} fullWidth>
            Cerrar
          </Button> */}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateUser;
