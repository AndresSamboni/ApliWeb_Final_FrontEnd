// CREATION THE DOCUMENT INTERFACE TO DEFINE THE STRUCTURE OF THE DOCUMENT TABLE
export interface DocumentInterface {
    id?: number;
    name: string;
    state?: boolean;
    start_date: Date;
    modify_date?: Date;
    delete_date?: Date;
    user?: string;
}