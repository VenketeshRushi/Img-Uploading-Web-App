import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styles from "../Styles/login.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const [signupdata, setsignupdata] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  async function signUpApi(data) {
    try {
      let response = await axios.post(
        "https://img-drive.onrender.com/users/signup",
        signupdata
      );
      console.log(response);
      setErrorMessage(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2100);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  }
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setsignupdata({
      ...signupdata,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpApi(signupdata);
    //console.log(signupdata);
  };

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <div className={styles.hero}>
        {errorMessage && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            key={"top" + "center"}
          >
            <Alert
              severity="info"
              variant="filled"
              sx={{
                width: "100%",
                padding: "10px",
              }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
        <Box className={styles.welcome}>
          <Box className={styles.info}>
            <p>Welcome to Img-Drive.</p>
            <p>
              Lets get you all set up so start with your account and begin
              setting up your profile.
            </p>
          </Box>
        </Box>
        <Box className={styles.signupinfo}>
          <Box className={styles.signupheading}>
            <h1>Begin your journey!</h1>
            <p>Get started with the best platform for design </p>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              fontFamily={"Manrope"}
              fontSize={"12px"}
              fontWeight={"600"}
              display="flex"
              width={"100%"}
              gap="16px"
            >
              <Box width={"48.5%"}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                  color="#6360AB"
                >
                  <label>First Name*</label>
                  <TextField
                    name="firstName"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                >
                  <label>Email Address*</label>
                  <TextField
                    name="email"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <label>Password*</label>
                  {/* <TextField
                    name="password"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  /> */}
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>
              </Box>
              <Box width={"48.5%"}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                >
                  <label>Last Name*</label>
                  <TextField
                    name="lastName"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  marginBottom={"24px"}
                >
                  <label>Phone Number*</label>
                  <TextField
                    name="phone"
                    onChange={hanldeChange}
                    size="small"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
              </Box>
            </Box>
            <Box className={styles.signupcheckbox}>
              <input type="checkbox" />
              <p>
                By signing up, you agree to our User Agreement, Terms of
                Service, & Privacy Policy
              </p>
            </Box>
            <Box>
              <button type="submit" className={styles.btn}>
                Sign Up
              </button>
            </Box>
            <Box className={styles.last}>
              Already have an account?   {" "}
              <Link to="/login" color="#6360ab">
                {" "}
                <Typography fontSize={"13px"} paddingLeft={2}>Login</Typography>
              </Link>
            </Box>
          </form>
        </Box>
      </div>
    </>
  );
}

export default Signup;
