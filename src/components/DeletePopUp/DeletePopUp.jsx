import deleteData from "../../api/DeleteData";
import "./deletePopUp.css";
import useAuth from "../../hooks/useAuth";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

function DeletePopUp({
    setDeletePopUp,
    item,
    submitted,
    setSubmitted,
    path,
    element,
}) {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="deletePopUp" onClick={() => setDeletePopUp(false)}>
            <div className="deleteContent" onClick={(e) => e.stopPropagation()}>
                <p>{`¿Seguro que quieres eliminar ${item.name}?`}</p>
                <div className="deletePopUpButtons">
                    <button
                        onClick={async () => {
                            setIsLoading(true);
                            await deleteData(
                                `${path}/${item[element]}`,
                                auth?.accessToken
                            );
                            setDeletePopUp(false);
                            setSubmitted(!submitted);
                        }}
                        className="confirm"
                    >
                        <div className="loading">
                            Eliminar
                            {isLoading && (
                                <UseAnimations size={12} animation={loading} />
                            )}
                        </div>
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
