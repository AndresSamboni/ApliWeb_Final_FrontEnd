// IMPORT THE LIBRARY TO VALIDATE DATA
import * as yup from 'yup';

export const DocumentModel = yup.object().shape({
    // VALIDATE THE NAME EXISTS AND HAVE 50 CHARACTERS MAXIMUM
    name: yup.string().required('El nombre del género es requerido').max(100, 'El nombre del documento no puede tener más de 100 caracteres')
});