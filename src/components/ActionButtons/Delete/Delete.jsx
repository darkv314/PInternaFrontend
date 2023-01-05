import "../action-button.css";
import "./delete.css";
import { Tooltip } from "@mui/material";

function Delete({ onClick }) {
    return (
        <Tooltip title="Eliminar" arrow>
            <button
                className="delete-button action-button"
                style={{ fontFamily: "Arial, FontAwesome" }}
                onClick={(e) => onClick(e)}
            >
                &#xf1f8;
            </button>
        </Tooltip>
    );
}

export default Delete;
