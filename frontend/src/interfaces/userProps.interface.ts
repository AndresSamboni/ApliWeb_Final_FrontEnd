export interface UserInterface {
    id?: number;
    name: string;
    last_name?: string;
    document_number: string;
    email: string;
    phone?: number;
    birthdate?: Date;
    photo?: string;
    user_name: string;
    password: string;
    state?: boolean;
    document_id_fk: number;
    document_type: string; // Añadir este campo
    role_id_fk: number;
    gender_id_fk: number;
    gender: string; // Añadir este campo para el nombre del género
}
