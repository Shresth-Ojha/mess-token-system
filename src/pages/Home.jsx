import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { AuthContext, useStore } from '../store/storeWrapper';
import { useEffect } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
});

export const Home = () => {
    const { user, userTokenStatus, setUserTokenStatus } = useStore();

    console.log('from home =', user);

    const getToken = async () => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ gID: user.sub }),
            redirect: 'follow',
            credentials: 'include',
        };

        const res = await fetch(
            import.meta.env.VITE_BACKEND + '/token',
            requestOptions
        );

        const resBody = await res.json();
        if ('data' in resBody) {
            setUserTokenStatus(resBody.data);
        } else {
            console.log('wohoo error here');
        }
    };

    const useToken = async () => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ gID: user.sub }),
            redirect: 'follow',
            credentials: 'include',
        };

        const res = await fetch(
            import.meta.env.VITE_BACKEND + '/token/use',
            requestOptions
        );
        const resBody = await res.json();

        if ('data' in resBody) {
            if (resBody.data === 'already used') {
                console.log('Already used before');
            } else {
                setUserTokenStatus(true);
            }
        } else {
            console.log("User doesn't exist, or some problem occurred.");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        location.reload();
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth="md"
                sx={{ bgcolor: userTokenStatus ? '#e31e1c70' : '#23ea15CC' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        height: '100vh',
                        // transform: 'scale(1.5)',
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">
                            <Typography variant="h6" sx={{ display: 'inline' }}>
                                Name: &nbsp;
                            </Typography>
                            {user.name} <br />
                            <Typography variant="h6" sx={{ display: 'inline' }}>
                                Token: &nbsp;
                            </Typography>
                            {userTokenStatus
                                ? 'Used'
                                : userTokenStatus === null
                                ? 'Does not exit'
                                : 'Not Used'}
                        </Typography>
                        {/* </Box>
                    <Box sx={{ mt: 5 }}> */}
                        <Button
                            variant="contained"
                            disabled={!(userTokenStatus === false)}
                            onClick={useToken}
                            sx={{ mt: 4, fontSize: 25 }}
                        >
                            Use Token
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            mt: 1,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={logout}
                            sx={{ fontSize: 18 }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
