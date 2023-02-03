import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import fetchData from "../../api/FetchData";
import useAuth from "../../hooks/useAuth";
import SelectForm from "../SelectForm/SelectForm";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import Select from "react-select";

function StudentForm({
    user,
    materias,
    setCreateRelation,
    submitted,
    setSubmitted,
    seasons,
}) {
    const { auth } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [materia, setMateria] = useState(null);

    const [gestion, setGestion] = useState(
        seasons.length ? seasons[0].name : null
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
                <div className="input-form">
                    <label htmlFor="season">Gestión:</label>

                    <Select
                        id="season"
                        placeholder={seasons.length ? seasons[0].name : null}
                        onChange={(option) => setGestion(option?.value)}
                        styles={{
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "black",
                                backgroundColor: state?.isFocused
                                    ? "#1dd2a5"
                                    : "white",
                            }),
                        }}
                        // isClearable={true}
                        defaultValue={seasons.length ? seasons[0].name : null}
                        isSearchable={true}
                        options={seasons.map((gestion) => {
                            return {
                                value: gestion.name,
                                label: gestion.name,
                            };
                        })}
                    ></Select>
                </div>
                <div className="input-form">
                    <label htmlFor="materia">Materia:</label>
                    {/* {console.log(gestion)} */}
                    <Select
                        id="materia"
                        placeholder="Seleccionar..."
                        onChange={(option) => setMateria(option?.value)}
                        styles={{
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "black",
                                backgroundColor: state?.isFocused
                                    ? "#1dd2a5"
                                    : "white",
                            }),
                        }}
                        isClearable={true}
                        isSearchable={true}
                        options={materias
                            .filter((mat) => mat.seasonName === gestion)
                            .map((mat) => {
                                return {
                                    value: mat.id,
                                    label: mat.name,
                                };
                            })}
                    ></Select>
                </div>
                {/* <p>{typeof materia}</p> */}

                {/* <label htmlFor="credits">Creditos:</label> */}
                <button disabled={materia ? false : true}>
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
