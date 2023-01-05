import { useEffect, useState } from "react";
import fetchData from "../../../api/FetchData";
import Tabla from "../../../components/Tabla/Tabla";
import useAuth from "../../../hooks/useAuth";
import Create from "../../../components/ActionButtons/Create/Create";
import GestionForm from "../../../components/GestionForm/GestionForm";
import DeletePopUp from "../../../components/DeletePopUp/DeletePopUp";
import "./gestiones.css";

function Gestiones() {
    const { auth } = useAuth();
    const [gestiones, setGestiones] = useState([]);
    const [idGestion, setIdGestion] = useState(null);
    const [formName, setFormName] = useState("Crear");
    const [createGestion, setCreateGestion] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const tablaConfig = [
        {
            main: "Gestiones",
            columns: [
                {
                    name: "Nombre",
                    cell: "name",
                },
            ],
        },
        {
            main: "Acciones",
            columns: ["Editar", "Eliminar"],
        },
    ];

    useEffect(() => {
        fetchData("season", setGestiones, auth?.accessToken);
    }, []);

    useEffect(() => {
        fetchData("season", setGestiones, auth?.accessToken);
    }, [submitted]);

    function handleCreate() {
        setCreateGestion(true);
        setFormName("Crear");
        setIdGestion(null);
    }

    function handleEdit(e) {
        setFormName("Editar");
        setCreateGestion(true);
        let item = e.target.parentElement.parentElement.id;
        setIdGestion(item);
    }

    function handleDelete(e) {
        setDeletePopUp(true);
        let item = e.target.parentElement.parentElement.id;
        setIdGestion(item);
    }

    return (
        <div className="gestiones">
            <div className="top-side">
                <h1>Gestiones</h1>
                {/* <p>Hola</p> */}
            </div>
            {deletePopUp ? (
                <DeletePopUp
                    setDeletePopUp={setDeletePopUp}
                    item={
                        idGestion
                            ? gestiones.find(
                                  (gestion) =>
                                      gestion.id === parseInt(idGestion)
                              )
                            : null
                    }
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    path={"season"}
                    element={"name"}
                />
            ) : null}
            {createGestion ? (
                <GestionForm
                    type={formName}
                    gestion={
                        idGestion
                            ? gestiones.find(
                                  (gestion) =>
                                      gestion.id === parseInt(idGestion)
                              )
                            : null
                    }
                    setCreateGestion={setCreateGestion}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                />
            ) : null}
            <Tabla
                data={gestiones}
                config={tablaConfig}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            ></Tabla>
            <Create handleCreate={handleCreate} />
        </div>
    );
}

export default Gestiones;
