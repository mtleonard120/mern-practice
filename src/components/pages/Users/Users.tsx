import React from 'react'

// packages
import useAxios from 'axios-hooks'

// styles
import styles from './Users.module.scss'

// types
interface IUsersProps {}

// primary component
export const Users: React.SFC<IUsersProps> = props => {
    const [{data, loading, error}, refetch] = useAxios('http://localhost:5000/api/users')

    return (
        <div>
            <h1>Users</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ol>
                    {data.map((user: any) => {
                        return <li key={user.username}>{user.username}</li>
                    })}
                </ol>
            )}
        </div>
    )
}
