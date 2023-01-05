import { useEffect, useState } from "react";
import fetchData from "../../../api/FetchData";
import Tabla from "../../../components/Tabla/Tabla";
import useAuth from "../../../hooks/useAuth";
import "./usuarios.css";
import UserForm from "../../../components/UserForm/UserForm";
import Create from "../../../components/ActionButtons/Create/Create";
import DeletePopUp from "../../../components/DeletePopUp/DeletePopUp";

function Usuarios() {
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formName, setFormName] = useState("Crear");
    const [careers, setCareers] = useState("");
    const [idUser, setIdUser] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const tablaConfig = [
        {
            main: "Usuarios",
            columns: [
                {
                    name: "Nombre",
                    cell: "name",
                },
                {
                    name: "Username",
                    cell: "username",
                },
                {
                    name: "Código",
                    cell: "code",
                },
                {
                    name: "Email",
                    cell: "email",
                },
                {
                    name: "Rol",
                    cell: "rolename",
                },
            ],
        },
        {
            main: "Acciones",
            columns: ["Editar", "Eliminar"],
        },
    ];

    useEffect(() => {
        fetchData("user", setUsers, auth?.accessToken);
    }, [submitted]);

    useEffect(() => {
        fetchData("user", setUsers, auth?.accessToken);
        fetchData("role", setRoles, auth?.accessToken);
        fetchData("career", setCareers, auth?.accessToken);
    }, []);

    function handleEdit(e) {
        setFormName("Editar");
        setCreateUser(true);
        let item = e.target.parentElement.parentElement.id;
        setIdUser(item);
    }
    function handleDelete(e) {
        setDeletePopUp(true);
        let item = e.target.parentElement.parentElement.id;
        setIdUser(item);
    }

    function handleCreate() {
        setCreateUser(true);
        setFormName("Crear");
        setIdUser(null);
    }

    return (
        <div className="usuarios">
            <div className="top-side">
                <h1>Usuarios</h1>
                {/* <p>Hola</p> */}
            </div>
            {deletePopUp ? (
                <DeletePopUp
                    setDeletePopUp={setDeletePopUp}
                    item={
                        idUser
                            ? users.find((user) => user.id === parseInt(idUser))
                            : null
                    }
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    path={"user"}
                    element={"username"}
                />
            ) : null}
            {createUser ? (
                <UserForm
                    type={formName}
                    roles={roles}
                    setCreateUser={setCreateUser}
                    user={
                        idUser
                            ? users.find((user) => user.id === parseInt(idUser))
                            : null
                    }
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    careers={careers}
                />
            ) : null}
            <Tabla
                data={users.filter((user) => !user.deactivationTime)}
                // data={users}
                config={tablaConfig}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            ></Tabla>
            <Create handleCreate={handleCreate} />
        </div>
    );
}

export default Usuarios;
