import React from 'react'

// packages
import {Typography, Toolbar, AppBar, Container} from '@material-ui/core'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

// components
import {Home, Users, Queries} from 'components'

// styles
import styles from './App.module.scss'

export const App: React.FC = () => {
    return (
        <Router>
            <AppBar position='static' className={styles.header}>
                <Toolbar>
                    <Typography component='h1' variant='h6'>
                        <Link className={styles.link} to='/'>
                            MERN Practice
                        </Link>
                    </Typography>
                    <nav className={styles.nav}>
                        <Link className={styles.link} to='/users'>
                            Users
                        </Link>
                        <Link className={styles.link} to='/queries'>
                            Queries
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>

            <Container>
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/users'>
                        <Users />
                    </Route>
                    <Route path='/queries'>
                        <Queries />
                    </Route>
                </Switch>
            </Container>
        </Router>
    )
}
