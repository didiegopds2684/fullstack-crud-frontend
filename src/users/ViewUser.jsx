import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function ViewUser () {

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
    })

    const {id} = useParams();

    useEffect(() => {
        loadUser().then(r => r);
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUserData(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow d-flex flex-column justify-content-center">
                    <h2 className="text-center m-4">
                        Visualizar Usuário
                    </h2>
                    <div className="card">
                        <div className="card-header">
                            Detalhes do usuario de ID: {userData.id}
                            <ul className="list-group list-group-flush border rounded my-2">
                                <li className="list-group-item">
                                    <b>Nome: </b>
                                    {userData.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Apelido: </b>
                                    {userData.username}
                                </li>
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {userData.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="align-self-center btn btn-primary my-2" to={"/"}>Voltar para home</Link>
                </div>
            </div>
        </div>
    )
}