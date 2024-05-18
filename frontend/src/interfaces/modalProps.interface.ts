import { RoleInterface } from "./role.interface";

// DEFINITION THE PROPERTIES TYPES OF THE MODAL CREATE COMPONENT
export interface ModalCreateProps {
    isOpen: boolean;
    closeModal: () => void;
    submit: () => void;
    name: string;
    setName: (name: string) => void;
    error: string;
    setError: (error: string) => void;
    content: {
        title: string;
        field: string;
        buttonYes: string;
        buttonNo: string;
    };
}

// DEFINITION THE PROPERTIES TYPES OF THE MODAL VIEW COMPONENT
export interface ModalViewProps {
    isOpen: boolean;
    closeModal: () => void;
    data: RoleInterface[];
    content: {
        title: string
    }
}

// DEFINITION THE PROPERTIES TYPES OF THE MODAL EDIT COMPONENT
export interface ModalEditProps {
    isOpen: boolean;
    closeModal: () => void;
    submit: (event: React.FormEvent) => void;
    name: string;
    setName: (name: string) => void;
    error: string;
    setError: (error: string) => void;
    content: {
        title: string;
        field: string;
        buttonYes: string;
        buttonNo: string;
    };
}

// DEFINITION THE PROPERTIES TYPES OF THE MODAL DELETE COMPONENT
export interface ModalDeleteProps {
    isOpen: boolean;
    closeModal: () => void;
    submit: () => void;
    error: string;
    content: {
        title: string;
        buttonYes: string;
        buttonNo: string;
    };
}

// DEFINITION THE PROPERTIES TYPES OF THE MODAL EXISTS COMPONENT
export interface ModalExistsProps {
    isOpen: boolean;
    closeModal: () => void;
    submit: () => void;
    error: string;
    content: {
        title: string;
        buttonYes: string;
        buttonNo: string;
    };
}