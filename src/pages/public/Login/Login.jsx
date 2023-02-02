import { useRef, useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import background from "../../../assets/background.svg";
import "./login.css";
import useStudent from "../../../hooks/useStudent";

const LOGIN_URL = "auth/signin";

function Login() {
    const { setAuth } = useAuth();
    const { setStudent } = useStudent();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            setAuth({ user, roles: [roles], accessToken });
            setUser("");
            setPwd("");
            if (roles == "jefe") navigate("/jefe/materias");
            else if (roles == "student") {
                setStudent({ code: user, name: user });
                navigate("/estudiante/materias");
            } else navigate("/admin/usuarios");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 403) {
                setErrMsg("Credenciales incorrectas");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setAuth({});
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    return (
        <div className="loginContainer">
            <img className="background" src={background} alt="" />
            <section className="loginSection">
                <section>
                    <h1>Bienvenid@ de vuelta</h1>
                    {/* <div className="loginLogo">
                        <img src={logo} alt="" />
                    </div> */}
                </section>

                <form onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                        {errMsg}
                    </p>
                    <div className="inputForm">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="usename"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div className="inputForm">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            // ref={userRef}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>

                    <button disabled={!user || !pwd}>Log In</button>
                </form>
            </section>
        </div>
    );
}

export default Login;
