import "./create.css";

function Create({ handleCreate }) {
    return (
        <div
            className="createButton"
            onClick={() => {
                handleCreate();
            }}
        >
            +
        </div>
    );
}

export default Create;
