import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
import "./materiaForm.css";

function MateriaForm({
    type,
    gestiones,
    careers,
    owners,
    setCreateMateria,
    materia,
    submitted,
    setSubmitted,
}) {
    const { auth } = useAuth();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);

    const [owner, setOwner] = useState(
        owners.length ? owners[0].username : null
    );

    const [lecturer, setLecturer] = useState("");
    const [validLecturer, setValidLecturer] = useState(false);

    const [start, setStart] = useState("1");
    const [end, setEnd] = useState("1");
    const [validTerm, setValidTerm] = useState(false);

    const [schedule, setSchedule] = useState("Super A");
    const [credits, setCredits] = useState("1");
    const [season, setSeason] = useState(
        gestiones.length ? gestiones[0].name : null
    );
    const [career, setCareer] = useState(
        careers.length ? careers[0].name : null
    );

    const genStartEndOptions = () => {
        let options = [];
        for (let i = 1; i <= 12; i++) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return options;
    };

    const genHorario = () => {
        let options = [
            <option key={0} value="Super A">
                {"Super A"}
            </option>,
        ];
        const schedule = "ABCDEF";
        for (let i = 0; i < schedule.length; i++) {
            options.push(
                <option key={i + 1} value={schedule[i]}>
                    {schedule[i]}
                </option>
            );
        }
        return options;
    };

    useEffect(() => {
        if (materia) {
            setName(materia.name);
            setOwner(materia.ownerUsername);
            setLecturer(materia.lecturer);
            setStart(materia.startTerm);
            setEnd(materia.endTerm);
            setSchedule(materia.schedule);
            setCredits(materia.credits);
            setSeason(materia.seasonName);
        }
    }, []);

    useEffect(() => {
        name.length >= 4 ? setValidName(true) : setValidName(false);
    }, [name]);

    useEffect(() => {
        lecturer.length >= 4 ? setValidLecturer(true) : setValidLecturer(false);
    }, [lecturer]);

    useEffect(() => {
        parseInt(start) < parseInt(end)
            ? setValidTerm(true)
            : setValidTerm(false);
    }, [start, end]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name,
            startTerm: start,
            endTerm: end,
            schedule,
            lecturer,
            credits,
            ownerUsername: owner,
            seasonName: season,
        });
        if (type === "Crear") {
            const response = await postData(
                "course/add",
                body,
                auth.accessToken
            );
            if (response.statusText === "Created") {
                setCreateMateria(false);
                setSubmitted(!submitted);
                alert("Materia creada con exito");
            }
        } else {
            const response = await putData(
                `course/update/${materia.id}`,
                body,
                auth.accessToken
            );
            if (response.status === 200) {
                setCreateMateria(false);
                setSubmitted(!submitted);
                alert("Materia editada con exito");
            }
        }
    };

    return (
        <div className="createForm" onClick={() => setCreateMateria(false)}>
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
                {/* <label htmlFor="owner">Dueño:</label> */}
                <select
                    name="owner"
                    id="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                >
                    {owners.map((owner) => (
                        <option
                            className="gestion-option"
                            key={owner.id}
                            value={owner.username}
                        >
                            {owner.name}
                        </option>
                    ))}
                </select>
                {/* <label htmlFor="owner">Docente:</label> */}
                <input
                    type="text"
                    id="lecturer"
                    autoComplete="off"
                    required
                    placeholder="Docente"
                    value={lecturer}
                    onChange={(e) => setLecturer(e.target.value)}
                />
                <div className="startEndForm">
                    <span>
                        <label htmlFor="start">Inicio:</label>
                        <select
                            name="start"
                            id="start"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        >
                            {genStartEndOptions()}
                        </select>
                    </span>
                    <span>
                        <label htmlFor="end">Fin:</label>
                        <select
                            name="end"
                            id="end"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        >
                            {genStartEndOptions()}
                        </select>
                    </span>
                </div>
                {/* <label htmlFor="schedule">Horario:</label> */}
                <select
                    name="schedule"
                    id="schedule"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                >
                    {genHorario()}
                </select>
                {/* <label htmlFor="credits">Creditos:</label> */}
                <input
                    type="number"
                    id="credits"
                    required
                    placeholder="Créditos"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                />
                {/* <label htmlFor="gestionForm">Gestión:</label> */}
                <select
                    name="gestionForm"
                    id="gestionForm"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                >
                    {gestiones.map((gestion) => (
                        <option
                            className="gestion-option"
                            key={gestion.id}
                            value={gestion.name}
                        >
                            {gestion.name}
                        </option>
                    ))}
                </select>
                <select
                    name="career"
                    id="career"
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                >
                    {careers.map((career) => (
                        <option
                            className="gestion-option"
                            key={career.id}
                            value={career.name}
                        >
                            {career.name}
                        </option>
                    ))}
                </select>
                <button
                    disabled={
                        !validLecturer || !validName || !validTerm
                            ? true
                            : false
                    }
                >
                    {type}
                </button>
            </form>
        </div>
    );
}

export default MateriaForm;
