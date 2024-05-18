// IMPORT REACT LIBRARIES
import { Trash2, Edit, Eye } from "react-feather";

// CREATION THE TABLE COMPONENT
function Table({ headerOptions, dataTable, setId, onView, onModify, onDelete }) {
    // RETURN THE TABLE
    return (
        <table className="w-full">
            <thead className="bg-white">
                <tr className="text-center text-2xl text-title">
                    {headerOptions.map(option => (
                        <th key={headerOptions.indexOf(option)} className="p-2">{option}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-gray-100">
                {dataTable.map(data => (
                    <tr key={data.id} className="text-center">
                        <td className="p-2">{data.id}</td>
                        <td className="p-2">{data.name}</td>
                        <td className="p-2">
                            <button
                                onClick={() => {
                                    setId(data.id);
                                    onView();
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-info font-bold py-2 px-4 mx-1 rounded-full">
                                <Eye size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setId(data.id);
                                    onModify();
                                }}
                                className="bg-blue-300 hover:bg-blue-400 text-modify font-bold py-2 px-4 mx-1 rounded-full">
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setId(data.id);
                                    onDelete();
                                }}
                                className="bg-red-300 hover:bg-red-400 text-delete font-bold py-2 px-4 mx-1 rounded-full">
                                <Trash2 size={20} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// EXPORT THE COMPONENT
export default Table;