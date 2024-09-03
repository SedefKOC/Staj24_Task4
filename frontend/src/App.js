import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const handleGetUser = () => {
        axios.get(`http://localhost:8080/users/${userId}`)
            .then(response => {
                setUsers([response.data]);
                setMessage("User successfully retrieved!");
            })
            .catch(error => {
                setMessage("User not found.");
                setUsers([]);
            });
    };

    const handleGetAllUsers = () => {
        axios.get("http://localhost:8080/users")
            .then(response => {
                setUsers(response.data);
                setMessage("All users successfully retrieved!");
            })
            .catch(error => {
                setMessage("Users could not be retrieved.");
                setUsers([]);
            });
    };

    const handleAddUser = () => {
        axios.post("http://localhost:8080/users", { id:userId, name, surname })
            .then(response => {
                setMessage("User successfully added!");
                setUsers([...users, response.data]);
            })
            .catch(error => {
                setMessage("Error occurred while adding the user.");
            });
    };

    const handleUpdateUser = () => {
        axios.put(`http://localhost:8080/users/${userId}`, { name, surname })
            .then(response => {
                setMessage("User successfully updated!");
                setUsers(users.map(user => user.id === parseInt(userId) ? response.data : user));
            })
            .catch(error => {
                setMessage("Error occurred while updating the user.");
            });
    };

    const handleDeleteUser = () => {
        axios.delete(`http://localhost:8080/users/${userId}`)
            .then(response => {
                setMessage("User successfully deleted!");
                setUsers(users.filter(user => user.id !== parseInt(userId)));
            })
            .catch(error => {
                setMessage("Error occurred while deleting the user.");
            });
    };

    return (
        <div className="container">
            <h1>User Management System</h1>

            <div className="input-group">
                <input
                    type="number"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>

            <div className="button-group">
                <button onClick={handleGetUser}>Get Specific User</button>
                <button onClick={handleGetAllUsers}>Get All Users</button>
                <button onClick={handleAddUser}>Add User</button>
                <button onClick={handleUpdateUser}>Update User</button>
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>

            {message && (
                <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
                    {message}
                </div>
            )}

            {users.length > 0 && (
                <div className="result">
                    <pre>{JSON.stringify(users, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
