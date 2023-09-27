import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import BgImage from '../../../assets/images/trailBackground.jpg';
import { Copyright } from '../../Copyright';
import Alert from '@mui/material/Alert';
import { useSignup } from '../../../hooks/useSignup';

export default function SignUpSide() {


  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signup } = useSignup();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signup(email, password);

  };



  return (
      <Grid container component="main" sx={{ height: '93vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#025464' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {error ? (
                <Alert
                  className="alert_error"
                  message={error}
                  type="error"
                  closable
                />
              ) : null}
            <form onSubmit={handleSubmit} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)} 
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)} 
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
              />

              {isLoading ? 
                <LoadingButton 
                sx={{
                  ":hover": { 
                      backgroundColor: '#fcfcfc',
                      color: '#191919',
                      borderColor: '#191919' 
                  }, 
                  backgroundColor: '#191919', 
                  mt: 3, 
                  mb: 2, 
                }}
                loading variant="contained"
                fullWidth
                
                >
                <span>Submit</span>
              </LoadingButton> 
              :
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    ":hover": { 
                        backgroundColor: '#fcfcfc',
                        color: '#191919',
                        borderColor: '#191919' 
                    }, 
                    backgroundColor: '#025464', 
                    mt: 3, 
                    mb: 2 }}
              >
                Sign Up
              </Button>   

            }
              <Typography variant="body2">
                By signing up, I agree to the  &nbsp;
                <Link href="/terms" variant="body2">
                    {"terms of use"}
                </Link>
                &nbsp; and &nbsp;
                <Link href="/privacy" variant="body2">
                    {"privacy policy"}
                </Link>
              </Typography>
             
              
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
  );
}