import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>No tienes acceso a la pagina solicitada</p>
            <button onClick={goBack}>Go Back</button>
        </section>
    );
}

export default Unauthorized;
