/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Styler } from '../../components/Styler/Styler';
import { CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import Titulo from '../../components/common/Titulo/Titulo';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Logs = ({ usuario }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getLogIns = async () => {
        

        // const response = await axios.get("http://localhost:8000/users");
        const response = await axios.get("https://ibvmpa.deta.dev/users");
        setUsers(response.data)
        setCargando(false);
    }

    const getLogs = async () => {
       

        // const response = await axios.get("http://localhost:8000/logs");
        const response = await axios.get("https://ibvmpa.deta.dev/logs");
        setLogs(response.data)
        setCargando(false);
    }

    useEffect(() => {
        getLogs()
        getLogIns()
    }, [cargando]);

    if (cargando) {
        return (
            <div align="center" style={Styler.loading}>
                <CircularProgress />
            </div>);
    } else {
        return (
            <div class="page" style={Styler.page}>
                <Container maxWidth="xl" sx={{ mb: 3 }}>
                    <Titulo titulo="Logs completos" />

                    {users.map((user, index) => (
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography>Usuario: {user.email}</Typography>
                            <Typography>Timestamp: {user.timestamp.date}</Typography>
                            <Typography>Token: {user.token}</Typography>
                        </Box>
                    ))}

                    {logs.map((logs, index) => (
                        <Box sx={{ marginBottom: '20px' }}>
                        <Typography>Timestamp: {logs.timestamp.date}</Typography>
                        <Typography>Usuario: {logs.email}</Typography>
                        <Typography> {logs.token}</Typography>
                    </Box>

                    ))}

                </Container>
            </div >
        )
    }
}

export default Logs