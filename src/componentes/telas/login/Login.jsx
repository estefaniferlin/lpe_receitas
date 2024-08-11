import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alerta from '../../comuns/Alerta';
import Carregando from '../../comuns/Carregando';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { auth, signInWithGithub } from '../../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function Login() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [carregando, setCarregando] = useState(false);
  const [user] = useAuthState(auth); // Verifica se o usuário está autenticado
  let navigate = useNavigate();

  const acaoLogin = async e => {
    e.preventDefault();
    try {
      setCarregando(true);
      await signInWithGithub();
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (err) {
      setAlerta({ status: "error", message: err.message });
    } finally {
      setCarregando(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Carregando carregando={carregando}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login com GitHub
            </Typography>
            <Alerta alerta={alerta} />
            <Box component="form" onSubmit={acaoLogin} noValidate sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login com GitHub
              </Button>
            </Box>
          </Box>
        </Container>
      </Carregando>
    </div>
  );
}

export default Login;
