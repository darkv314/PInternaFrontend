import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
// import "./materiaForm.css";

function StudentForm({
    user,
    materias,
    setCreateRelation,
    submitted,
    setSubmitted,
}) {
    const { auth } = useAuth();

    const [materia, setMateria] = useState(
        materias.length ? materias[0].id : null
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            studentCode: user,
            courseId: parseInt(materia),
        });

        const response = await postData(
            "student-courses/add",
            body,
            auth.accessToken
        );
        if (response.status <= 400) {
            setCreateRelation(false);
            setSubmitted(!submitted);
            alert("Materia agregada con exito");
        }
    };

    return (
        <div className="createForm" onClick={() => setCreateRelation(false)}>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Agregar Materia</h2>
                {/* <label htmlFor="schedule">Horario:</label> */}
                <select
                    name="materia"
                    id="materia"
                    value={materia}
                    onChange={(e) => setMateria(e.target.value)}
                >
                    {materias.map((materia) => (
                        <option
                            className="materia-option"
                            key={materia.id}
                            value={materia.id}
                        >
                            {materia.name}
                        </option>
                    ))}
                </select>
                {/* <label htmlFor="credits">Creditos:</label> */}
                <button>Agregar</button>
            </form>
        </div>
    );
}

export default StudentForm;
