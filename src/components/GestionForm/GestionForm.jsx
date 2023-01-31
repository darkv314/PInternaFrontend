import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
// import "./gestionForm.css";

function GestionForm({
    type,
    gestion,
    setCreateGestion,
    submitted,
    setSubmitted,
}) {
    const { auth } = useAuth();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);

    useEffect(() => {
        if (gestion) {
            setName(gestion.name);
        }
    }, []);

    useEffect(() => {
        name.length >= 4 ? setValidName(true) : setValidName(false);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name,
        });
        if (type === "Crear") {
            const response = await postData(
                "season/add",
                body,
                auth.accessToken
            );
            if (response.statusText === "Created") {
                setCreateGestion(false);
                setSubmitted(!submitted);
                alert("Gestión creada con exito");
            } else {
                alert(`Gestión no creada: ${response.data.message}`);
            }
        } else {
            const response = await putData(
                `season/update/${gestion.name}`,
                body,
                auth.accessToken
            );
            if (response.status === 200) {
                setCreateGestion(false);
                setSubmitted(!submitted);
                alert("Gestión editada con exito");
            }
        }
    };

    return (
        <div className="createForm" onClick={() => setCreateGestion(false)}>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{type} Materia</h2>
                {/* <label htmlFor="name">Nombre:</label> */}
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    required
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button disabled={!validName ? true : false}>{type}</button>
            </form>
        </div>
    );
}

export default GestionForm;
