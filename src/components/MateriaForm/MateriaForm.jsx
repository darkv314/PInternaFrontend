import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
import InputForm from "../InputForm/InputForm";
import SelectForm from "../SelectForm/SelectForm";
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
            options.push({ name: i, id: i });
        }
        return options;
    };

    const genHorario = () => {
        let options = [{ name: "Super A", id: 0 }];
        const schedule = "ABCDEF";
        for (let i = 0; i < schedule.length; i++) {
            options.push({ name: schedule[i], id: i + 1 });
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
        // console.log(owner);
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

                <InputForm
                    id="name"
                    label="Nombre"
                    value={name}
                    setValue={setName}
                />

                <SelectForm
                    id="owner"
                    label="Dueño"
                    value={owner}
                    setValue={setOwner}
                    options={owners}
                    values="username"
                />

                <InputForm
                    id="lecturer"
                    label="Docente"
                    value={lecturer}
                    setValue={setLecturer}
                />
                <div className="startEndForm">
                    <SelectForm
                        id="start"
                        label="Inicio"
                        value={start}
                        setValue={setStart}
                        options={genStartEndOptions()}
                    />
                    <SelectForm
                        id="end"
                        label="Fin"
                        value={end}
                        setValue={setEnd}
                        options={genStartEndOptions()}
                    />
                </div>
                <SelectForm
                    id="schedule"
                    label="Horario"
                    value={schedule}
                    setValue={setSchedule}
                    options={genHorario()}
                />
                <InputForm
                    type="number"
                    id="credits"
                    label="Créditos"
                    value={credits}
                    setValue={setCredits}
                />
                <SelectForm
                    id="gestionForm"
                    label="Gestión"
                    value={season}
                    setValue={setSeason}
                    options={gestiones}
                />

                {/* <SelectForm
                    id="career"
                    label="Carrera"
                    value={career}
                    setValue={setCareer}
                    options={careers}
                /> */}

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
