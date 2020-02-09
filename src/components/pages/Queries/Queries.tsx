import React from 'react'

// packages
import useAxios from 'axios-hooks'

// components

// utils

// styles
import styles from './Queries.module.scss'

// types
interface IQueriesProps {}

// helpers

// primary component
export const Queries: React.SFC<IQueriesProps> = props => {
    const [{data, loading, error}, refetch] = useAxios('http://localhost:5000/api/queries')

    return (
        <div>
            <h1>Queries</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ol>
                    {data.map((user: any) => {
                        return (
                            <li key={user.username}>
                                {user.username} -{' '}
                                {user.queryTerms.map((term: any, i: number) => (
                                    <span>
                                        "{term}"{i === user.queryTerms.length - 1 ? '' : ', '}
                                    </span>
                                ))}
                            </li>
                        )
                    })}
                </ol>
            )}
        </div>
    )
}
