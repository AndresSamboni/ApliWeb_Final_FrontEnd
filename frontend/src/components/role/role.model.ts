// IMPORT THE LIBRARY TO VALIDATE DATA
import * as yup from 'yup';

export const RoleModel = yup.object().shape({
    // VALIDATE THE NAME EXISTS AND HAVE 50 CHARACTERS MAXIMUM
    name: yup.string().required('El nombre del rol es requerido').max(100, 'El nombre del rol no puede tener más de 50 caracteres')
});