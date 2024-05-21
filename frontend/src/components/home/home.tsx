import GenericText from './genericText';

//CREATE THE HOME COMPONENT
function Home() {
    return (
        <main className="my-3 p-4 space-y-4">
            <h1 className="text-center text-3xl leading-6 font-semibold text-title">
                <strong>Trabajo Final ApliWeb - Primera Mitad</strong>
            </h1>
            <article className="space-y-4">
                <p className="text-lg text-content">
                    El trabajo final de la primera mitad de la electiva, <strong>ApliWeb</strong>, consiste en la creación de
                    una aplicación web que permite la gestión documental que abarca: Usuarios, roles, documentos y géneros.
                </p>
            </article>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <GenericText
                    types={{ title: 'Gestión de Roles', nameP: 'roles', nameS: 'rol' }}
                    fields={['Id: Identificador numérico único en la base de datos.', 'Nombre del Rol: Identificador único para los usuarios.']}
                />
                <GenericText
                    types={{ title: 'Gestión de Géneros', nameP: 'géneros', nameS: 'género' }}
                    fields={['Id: Identificador numérico único en la base de datos.', 'Nombre del Género: Identificador único para los usuarios.']}
                />
            </section>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <GenericText
                    types={{ title: 'Gestión de Documentos', nameP: 'documentos', nameS: 'documento' }}
                    fields={[
                        'Id: Identificador numérico único en la base de datos.',
                        'Nombre del Documento: Identificador único para los usuarios.',
                        'Fecha de creación: Fecha en la que se creó el documento.',
                        'Fecha de última modificación: Fecha en la que se modificó el documento.',
                        'Fecha de eliminación: Fecha en la que se eliminó el documento.',
                        'Usuario responsable: Usuario que realizo la última acción con el documento (Crear, modificar, eliminar).'
                    ]}
                />
                <GenericText
                    types={{ title: 'Gestión de Usuarios', nameP: 'usuarios', nameS: 'usuario' }}
                    fields={[
                        'Id: Identificador numérico único en la base de datos.',
                        'Nombre del usuario: Nombre real del usuario.',
                        'Apellido del usuario: Apellido real del usuario.',
                        'Tipo de documento: Tipo de documento de identificación del usuario.',
                        'Número de documento: Número de documento de identificación del usuario como ciudadano.',
                        'Genero del usuario: Género por medio del cual el usuario se autopercibe.',
                        'Rol del usuario: Rol que el usuario desempeña en la aplicación.',
                        'Correo electrónico: Correo electrónico, utilizado por el usuario para su registro.',
                        'Teléfono: Número de teléfono del usuario para su contacto.',
                        'Fecha de nacimiento: Fecha de nacimiento del usuario.',
                        'Fotografía: Imagen del usuario donde se identifica su rostro.',
                        'Nombre de usuario: Nombre de usuario utilizado para el ingreso al sistema.',
                        'Contraseña: Contraseña utilizada para el ingreso al sistema.',
                    ]}
                />
            </section>
            <p className='text-lg text-content'>
                Este trabajo es presentado de la mano de <strong><em>Edwin Andrés Samboní Ortiz</em></strong>, <strong>
                    <em>Humberto Aldemir Fajardo Castaño</em></strong> y <strong><em>Pablo Cesar Garzón Benítez</em></strong>.
            </p>
            <p className='text-lg text-content'>
                El trabajo se presenta con el objetivo de cumplir con al validación de requerimientos de la primer mitad
                de la asignatura <strong>ApliWeb</strong>.
            </p>
        </main>
    );
}

//EXPORT THE COMPONENT
export default Home;