interface GenericText {
    types: { title: string, nameP: string, nameS: string },
    fields: Array<string>
}

function GenericText({ types, fields }: Readonly<GenericText>) {
    return (
        <article className="space-y-4">
            <h2 className="text-center text-2xl leading-6 font-semibold text-title">
                <strong>{types.title}</strong>
            </h2>
            <p className="text-lg text-content">
                La gestión de {types.nameP} permite la creación, edición y eliminación de {types.nameP}. Cada {types.nameS} se compone de:
                <ul className="list-disc list-inside">
                    {fields.map(field => (
                        <li key={fields.indexOf(field)}>{field}.</li>
                    ))}
                </ul>
            </p>
            <p className="text-lg text-content">
                El método de eliminación de {types.nameP} a diferencia de un método de eliminación convencional, no destruye el registro
                en la base de datos, sino que por el contrario deshabilita su visibilidad permitiendo así que se pueda tener una
                reactivación del mismo.
            </p>
        </article>
    );
}
export default GenericText;