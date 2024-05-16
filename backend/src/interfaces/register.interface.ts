// CREATION OF THE REGISTER INTERFACE
export interface Register {
    start_date: Date;
    modify_date?: Date;
    delete_date?: Date;
    user_id_fk: number;
    document_id_fk: number;
}