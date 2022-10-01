import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Home() {

    const [users, setUsers] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers().then(r => r);
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers();
    }

    return (<div className="container">
        <div className="py-4">
            <table className="table table-striped border shadow rounded">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Apelido</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (<tr key={index}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/view-user/${user.id}`} className="btn btn-primary mx-2">
                                <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/edit-user/${user.id}`}
                                  className="btn btn-outline-primary mx-2">
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button className="btn btn-danger mx-2"
                                onClick={() => deleteUser(user.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>))}

                </tbody>
            </table>

        </div>
    </div>)
}