import "../action-button.css";
import "./edit.css";
import { Tooltip } from "@mui/material";

function Edit({ onClick }) {
    return (
        <Tooltip title="Editar" arrow>
            <button
                className="edit-button action-button"
                style={{ fontFamily: "Arial, FontAwesome" }}
                onClick={(e) => onClick(e)}
            >
                &#xf044;
            </button>
        </Tooltip>
    );
}

export default Edit;
