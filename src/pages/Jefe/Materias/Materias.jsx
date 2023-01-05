import { useState, useEffect } from "react";
import MateriaForm from "../../../components/MateriaForm/MateriaForm";
import Table from "../../../components/Tabla/Tabla";
import useAuth from "../../../hooks/useAuth";
import fetchData from "../../../api/FetchData";
import "./materias.css";
import Create from "../../../components/ActionButtons/Create/Create";
import DeletePopUp from "../../../components/DeletePopUp/DeletePopUp";

function Materias() {
    const [createMateria, setCreateMateria] = useState(false);
    const [formName, setFormName] = useState("Crear");
    const [careers, setCareers] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [owners, setOwners] = useState([]);
    const [idMateria, setIdMateria] = useState(null);
    const [gestiones, setGestiones] = useState([]);
    const [gestion, setGestion] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const { auth } = useAuth();
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
        {
            main: "Acciones",
            columns: ["Editar", "Eliminar"],
        },
    ];

    useEffect(() => {
        fetchData("course", setMaterias, auth?.accessToken);
    }, [submitted]);

    useEffect(() => {
        fetchData("user/role/jefe", setOwners, auth?.accessToken);
        fetchData("course", setMaterias, auth?.accessToken);
        fetchData("season", setGestiones, auth?.accessToken);
        fetchData("career", setCareers, auth?.accessToken);
    }, []);

    const handleChange = (e) => {
        setGestion(e.target.value);
    };

    function handleEdit(e) {
        setFormName("Editar");
        setCreateMateria(true);
        let item = e.target.parentElement.parentElement.id;
        setIdMateria(item);
    }
    function handleDelete(e) {
        setDeletePopUp(true);
        let item = e.target.parentElement.parentElement.id;
        setIdMateria(item);
    }

    function handleCreate() {
        setCreateMateria(true);
        setFormName("Crear");
        setIdMateria(null);
    }

    return (
        <div className="materias">
            {createMateria ? (
                <MateriaForm
                    type={formName}
                    gestiones={gestiones}
                    careers={careers}
                    owners={owners}
                    setCreateMateria={setCreateMateria}
                    materia={
                        idMateria
                            ? materias.find(
                                  (materia) =>
                                      materia.id === parseInt(idMateria)
                              )
                            : null
                    }
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
                    path={"course"}
                    element={"id"}
                />
            ) : null}

            <div className="top-side">
                <h1>Materias</h1>
                <select
                    name="gestion"
                    id="gestion"
                    value={gestion}
                    onChange={handleChange}
                >
                    {gestiones.map((gestion) => (
                        <option
                            className="gestion-option"
                            key={gestion.id}
                            value={gestion.name}
                        >
                            {gestion.name}
                        </option>
                    ))}
                </select>
            </div>
            <Table
                // data={[...materias, ...materias, ...materias, ...materias]}
                data={materias
                    .filter((materia) => materia.seasonName.includes(gestion))
                    .sort((a, b) => (a.name > b.name ? 1 : -1))}
                config={tablaConfig}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            ></Table>
            <Create handleCreate={handleCreate} />
        </div>
    );
}

export default Materias;
