import { Link } from "react-router-dom";
import { CustomTooltip } from "../Tooltip/CustomTooltip";

function NavButton({ path, icon, tooltip }) {
    let title = path.split("/").pop();
    title = tooltip || [title[0].toUpperCase(), ...title.slice(1)];
    return (
        <CustomTooltip title={title}>
            <Link to={path}>{icon}</Link>
        </CustomTooltip>
    );
}

export default NavButton;
