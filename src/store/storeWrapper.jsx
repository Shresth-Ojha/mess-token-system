import { Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

const AuthWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userTokenStatus, setUserTokenStatus] = useState(null);
    // console.log('userAuth ran ');

    const navigate = useNavigate();

    const userAuth = async () => {
        try {
            const serverActive = await fetch(import.meta.env.VITE_BACKEND);
        } catch (error) {
            console.log(
                '------------------ Error while connecting to server ------------------ \n',
                error
            );
            alert('Failed to connect to server.\nTry after sometime.');
            // location.reload();
            return;
        }

        const token = localStorage.getItem('token');
        // console.log('userAuth useEffect ran ');

        if (token) {
            const userDecoded = jwtDecode(token);
            if (userDecoded) {
                setUser(userDecoded);

                navigate('/');
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
        setLoading(false);
    };

    const fetchTokenStatus = () => {
        //will be called from Home.jsx from store
        //will send a GET request to the backend endpoint for the token status (USED/ NOTUSED)
    };

    useEffect(() => {
        userAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, setUser, userTokenStatus, setUserTokenStatus }}
        >
            {/* {console.log("Hi from wrapper return")} */}
            <Box style={{ height: '100vh' }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <img src="/images/loading.gif" alt="Loading..." />
                    </Box>
                ) : (
                    children
                )}
            </Box>
        </AuthContext.Provider>
    );
};

const useStore = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error('useStore used outside of the provider');
    }
    return authContextValue;
};

export { AuthWrapper, useStore, AuthContext };
