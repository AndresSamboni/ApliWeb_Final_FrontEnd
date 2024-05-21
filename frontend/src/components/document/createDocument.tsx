import { useEffect, useState } from "react";
import { DocumentModel } from "../../model/document.model";
import { fetchData } from "../../api/backend.api";
import ModalCreate from "../modal/modalCreate";

function CreateDocument({ open, close, onCreated, onExists, setId }: { open: boolean, close: () => void, onCreated: () => void, onExists: () => void, setId: (id: number) => void }) {
    const responseType = {
        1: 'Document already exists and it is active',
        2: 'Document already exists and it is inactive',
        3: 'Document created successfully'
    }
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [responseDocument, setResponseDocument] = useState({ message: '', error: '', id_document: 0 });
    const [responseDocumentMaxId, setResponseDocumentMaxId] = useState();
    const [responseRegister, setResponseRegister] = useState({ message: '', error: '' });
    const submitInfo = async () => {
        try {
            await DocumentModel.validate({ name });
            const documentData = { "name": name };
            await fetchData('/document/create', setResponseDocument, documentData);
            await fetchData('/register/document/maxId', setResponseDocumentMaxId)
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };
    const createRegister = async () => {
        try {
            const maxId = responseDocumentMaxId[0].last_id + 1
            const registerData = {
                "user_id_fk": 1,
                "document_id_fk": maxId
            }
            console.log(registerData);
            await fetchData('/register/document', setResponseRegister, registerData);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };
    useEffect(() => {
        if (responseDocument.message === responseType[1]) {
            setError('El documento ya existe y se encuentra activo');
        } else if (responseDocument.message === responseType[2]) {
            setId(responseDocument.id_document);
            onExists();
            close();
        } else if (responseDocument.message === responseType[3]) {
            createRegister();
            onCreated();
            close();
        } else {
            setError(responseDocument.message);
        }
    }, [responseDocument, setError]);

    if (!open) {
        return null
    }
    return (
        <ModalCreate
            isOpen={open}
            closeModal={close}
            submit={submitInfo}
            name={name}
            setName={setName}
            error={error}
            setError={setError}
            content={{
                title: 'Crear Nuevo Documento',
                field: 'Nombre del Documento',
                buttonYes: 'Crear Documento',
                buttonNo: 'Cancelar'
            }}
        />
    );
}

export default CreateDocument;