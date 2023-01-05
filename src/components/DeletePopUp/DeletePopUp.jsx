import deleteData from "../../api/DeleteData";
import "./deletePopUp.css";
import useAuth from "../../hooks/useAuth";

function DeletePopUp({
    setDeletePopUp,
    item,
    submitted,
    setSubmitted,
    path,
    element,
}) {
    const { auth } = useAuth();
    return (
        <div className="deletePopUp" onClick={() => setDeletePopUp(false)}>
            <div className="deleteContent" onClick={(e) => e.stopPropagation()}>
                <p>{`¿Seguro que quieres eliminar ${item.name}?`}</p>
                <div className="deletePopUpButtons">
                    <button
                        onClick={async () => {
                            await deleteData(
                                `${path}/${item[element]}`,
                                auth?.accessToken
                            );
                            setDeletePopUp(false);
                            setSubmitted(!submitted);
                        }}
                        className="confirm"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => setDeletePopUp(false)}
                        className="cancel"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp;
