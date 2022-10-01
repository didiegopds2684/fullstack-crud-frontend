import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditUser() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: ""
    });

    const {name, username, email} = userData;

    const onChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    };

    useEffect(() => {
        getUser().then(r => r);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, userData);
        navigate("/");
    }

    const getUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUserData(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">
                        Editar Usuário
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nome:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Insira seu nome"
                                name="name"
                                value={name}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Apelido:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Insira seu apelido"
                                name="username"
                                value={username}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Insira seu e-mail"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                            <button type="submit" className="btn btn-outline-primary">Salvar</button>
                            <Link to="/" className="btn btn-outline-danger">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}