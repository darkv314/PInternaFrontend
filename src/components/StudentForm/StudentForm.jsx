import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
import SelectForm from "../SelectForm/SelectForm";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
// import "./materiaForm.css";

function StudentForm({
    user,
    materias,
    setCreateRelation,
    submitted,
    setSubmitted,
}) {
    const { auth } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [materia, setMateria] = useState(
        materias.length ? materias[0].id : null
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const body = JSON.stringify({
            studentCode: user,
            courseId: parseInt(materia),
        });

        const response = await postData(
            "student-courses/add",
            body,
            auth.accessToken
        );
        response && setIsLoading(false);
        if (response.status <= 400) {
            setCreateRelation(false);
            setSubmitted(!submitted);
            alert("Materia agregada con exito");
        } else {
            alert(`Materia no agregada: ${response.data.message}`);
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

                <SelectForm
                    id="materia"
                    label="Materia"
                    value={materia}
                    setValue={setMateria}
                    options={materias}
                    values="id"
                />

                {/* <label htmlFor="credits">Creditos:</label> */}
                <button>
                    <div className="loading">
                        Agregar
                        {isLoading && (
                            <UseAnimations size={12} animation={loading} />
                        )}
                    </div>
                </button>
            </form>
        </div>
    );
}

export default StudentForm;
