// CREATION THE USER INTERFACE TO DEFINE THE STRUCTURE OF THE USER TABLE
export interface User {
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
    role_id_fk: number;
    gender_id_fk: number;
}