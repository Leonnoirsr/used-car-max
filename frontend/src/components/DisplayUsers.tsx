import React, { useEffect, useState } from 'react';
import axios                          from 'axios';

interface User {
    name: string;
    email: string;
    // add other fields as necessary
}

const DisplayUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            {users.map((user, index) => (
                <div key={index}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    {/* Add more fields as necessary */}
                </div>
            ))}
        </div>
    );
}

export default DisplayUsers;