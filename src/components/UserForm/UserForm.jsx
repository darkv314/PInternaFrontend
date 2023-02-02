import { useEffect, useState } from "react";
import postData from "../../api/PostData";
import putData from "../../api/PutData";
import useAuth from "../../hooks/useAuth";
import InputForm from "../InputForm/InputForm";
import SelectForm from "../SelectForm/SelectForm";
// import "./materiaForm.css";

function UserForm({
    type,
    careers,
    roles,
    setCreateUser,
    user,
    submitted,
    setSubmitted,
}) {
    const EMAIL_CHECK =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const CODE_CHECK = /^[0-9]+$/;

    const { auth } = useAuth();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);

    const [code, setCode] = useState("");
    const [validCode, setValidCode] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState("");

    const [role, setRole] = useState(roles.length ? roles[0].name : null);
    const [career, setCareer] = useState(
        careers.length ? careers[0].name : null
    );

    useEffect(() => {
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setCode(user.code);
            setEmail(user.email);
            setRole(user.role);
        }
    }, []);

    useEffect(() => {
        name.length >= 4 ? setValidName(true) : setValidName(false);
    }, [name]);

    useEffect(() => {
        username.length >= 4 ? setValidUsername(true) : setValidUsername(false);
    }, [username]);

    useEffect(() => {
        setValidCode(code.toLowerCase().match(CODE_CHECK));
    }, [code]);

    useEffect(() => {
        setValidEmail(email.toLowerCase().match(EMAIL_CHECK));
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name,
            username,
            password: "123456",
            code,
            email,
            rolename: role,
        });
        if (type === "Crear") {
            const mat = JSON.stringify({
                usercode: code,
                career: career,
            });
            const response = await postData("user/add", body, auth.accessToken);
            // console.log(response);
            if (response.statusText === "Created") {
                if (role === "student") {
                    const res = await postData(
                        "user-career/add",
                        JSON.stringify({
                            usercode: code,
                            userName: name,
                            career: parseInt(career),
                        }),
                        auth.accessToken
                    );
                    if (res.statusText === "Created") {
                        setCreateUser(false);
                        setSubmitted(!submitted);
                        alert("Usuario creado con exito");
                    } else {
                        alert(`Usuario no creado: ${res.data.message}`);
                    }
                } else {
                    setCreateUser(false);
                    setSubmitted(!submitted);
                    alert("Usuario creado con exito");
                }
            } else {
                alert(`Usuario no creado: ${response.data.message}`);
            }
        } else {
            const response = await putData(
                `user/update/${user.username}`,
                body,
                auth.accessToken
            );
            if (response.status === 200) {
                setCreateUser(false);
                setSubmitted(!submitted);
                alert("Usuario editado con exito");
            }
        }
    };

    return (
        <div className="createForm" onClick={() => setCreateUser(false)}>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{type} Usuario</h2>

                <InputForm
                    id="name"
                    label="Nombre"
                    value={name}
                    setValue={setName}
                />

                <InputForm
                    id="username"
                    label="Username"
                    value={username}
                    setValue={setUsername}
                />

                <InputForm
                    id="email"
                    label="Email"
                    value={email}
                    setValue={setEmail}
                />

                <InputForm
                    id="code"
                    label="Código"
                    value={code}
                    setValue={setCode}
                />

                <SelectForm
                    id="role"
                    label="Rol"
                    value={role}
                    setValue={setRole}
                    options={roles}
                />

                {role === "student" ? (
                    <SelectForm
                        id="career"
                        label="Carrera"
                        value={career}
                        setValue={setCareer}
                        options={careers}
                        values="id"
                    />
                ) : null}

                <button
                    disabled={
                        !validEmail ||
                        !validName ||
                        !validUsername ||
                        !validCode
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

export default UserForm;
