import useStudent from "../../hooks/useStudent";
import "./estudiante.css";
import Tabla from "../../components/Tabla/Tabla";
import { useState, useEffect } from "react";
import fetchData from "../../api/FetchData";
import useAuth from "../../hooks/useAuth";
import Create from "../../components/ActionButtons/Create/Create";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";
import StudentForm from "../../components/StudentForm/StudentForm";

function Estudiante() {
    const { auth } = useAuth();
    const { student } = useStudent();
    const [materias, setMaterias] = useState([]);
    const [createRelation, setCreateRelation] = useState(false);
    const [courses, setCourses] = useState([]);
    const [idMateria, setIdMateria] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const tablaConfig = [
        {
            main: "Materias",
            columns: [
                {
                    name: "Nombre",
                    cell: "name",
                },
                {
                    name: "Inicio",
                    cell: "startTerm",
                },
                {
                    name: "Fin",
                    cell: "endTerm",
                },
                {
                    name: "Horario",
                    cell: "schedule",
                },
                {
                    name: "Docente",
                    cell: "lecturer",
                },
                {
                    name: "Dueño",
                    cell: "ownerUsername",
                },
            ],
        },
    ];
    const tablaConfigStudent = [
        {
            main: "Materias",
            columns: [
                {
                    name: "Nombre",
                    cell: "name",
                },
                {
                    name: "Inicio",
                    cell: "startTerm",
                },
                {
                    name: "Fin",
                    cell: "endTerm",
                },
                {
                    name: "Horario",
                    cell: "schedule",
                },
                {
                    name: "Docente",
                    cell: "lecturer",
                },
                {
                    name: "Créditos",
                    cell: "credits",
                },
            ],
        },
        {
            main: "Acciones",
            columns: ["Eliminar"],
        },
    ];

    useEffect(() => {
        fetchData(
            `student-courses/${student.code}`,
            setMaterias,
            auth?.accessToken
        );
        fetchData("course", setCourses, auth?.accessToken);
    }, []);

    useEffect(() => {
        fetchData(
            `student-courses/${student.code}`,
            setMaterias,
            auth?.accessToken
        );
    }, [submitted]);

    function handleCreate() {
        setCreateRelation(true);
    }

    function handleDelete(e) {
        setDeletePopUp(true);
        let item = e.target.parentElement.parentElement.id;
        setIdMateria(item);
    }

    return (
        <div className="estudiante">
            <div className="top-side">
                <h1>Estudiante</h1>
                <h2>{student.name}</h2>
            </div>
            {createRelation ? (
                <StudentForm
                    user={student.code}
                    materias={courses}
                    setCreateRelation={setCreateRelation}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                />
            ) : null}
            {deletePopUp ? (
                <DeletePopUp
                    setDeletePopUp={setDeletePopUp}
                    item={
                        idMateria
                            ? materias.find(
                                  (materia) =>
                                      materia.id === parseInt(idMateria)
                              )
                            : null
                    }
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    path={`student-courses/${student.code}`}
                    element={"id"}
                />
            ) : null}
            <Tabla
                config={
                    !auth?.roles?.find((role) => role.includes(["student"]))
                        ? tablaConfigStudent
                        : tablaConfig
                }
                data={materias}
                handleDelete={handleDelete}
            />
            {!auth?.roles?.find((role) => role.includes(["student"])) ? (
                <Create handleCreate={handleCreate} />
            ) : null}
        </div>
    );
}

export default Estudiante;
