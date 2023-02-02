import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
import InputForm from "../InputForm/InputForm";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const body = JSON.stringify({
            name,
        });
        if (type === "Crear") {
            const response = await postData(
                "season/add",
                body,
                auth.accessToken
            );
            response && setIsLoading(false);
            if (response.status < 400) {
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
                <InputForm
                    id="name"
                    label="Nombre"
                    value={name}
                    setValue={setName}
                />

                <button disabled={!validName ? true : false}>
                    <div className="loading">
                        {type}
                        {isLoading && (
                            <UseAnimations size={12} animation={loading} />
                        )}
                    </div>
                </button>
            </form>
        </div>
    );
}

export default GestionForm;
