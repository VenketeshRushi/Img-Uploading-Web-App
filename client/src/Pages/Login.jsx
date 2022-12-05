import { Alert, Box, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../Styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../redux/authentication/auth.action";
import Cookies from "js-cookie";

function Login() {
  const [loginCreds, setLoginCreds] = useState({});
  const isAuthenticated = useSelector(
    (store) => store.auth.data.isAuthenticated
  );
  const data = useSelector((store) => store.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage("Login Successful");
      setTimeout(() => {
        navigate("/home");
        setErrorMessage("");
      }, 2000);
    }
  }, [isAuthenticated]);

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setLoginCreds({
      ...loginCreds,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(loginCreds);
    dispatch(loginAPI(loginCreds));
    if (!isAuthenticated) {
      setErrorMessage("Check Your Credentials");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
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
            <p>Welcome to Rsquare.</p>
            <p>
              Lets get you all set up so start with your account and begin
              setting up your profile.
            </p>
          </Box>
        </Box>
        <Box className={styles.signupinfo}>
          <Box className={styles.signupheading}>
            <h1>Welcome back!</h1>
            <p>Please Enter your details.</p>
          </Box>
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
                <label>Email Address</label>
                <TextField
                  name="email"
                  type="email"
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
                <label>Password</label>
                <TextField
                  name="password"
                  type="password"
                  onChange={hanldeChange}
                  size="small"
                  fullWidth
                  id="fullWidth"
                />
              </Stack>
            </Box>
          </Box>
          <Box
            width={"48.5%"}
            display={"flex"}
            justifyContent={"space-between"}
            fontSize={"12px"}
            fontWeight={"600"}
            fontFamily={"Manrope"}
            lineHeight={"20px"}
          >
            <Box display={"flex"}>
              <input type="checkbox" />
              <p>Remember me</p>
            </Box>
            <Box color={"#6360AB"}>
              <p>Forgot Password?</p>
            </Box>
          </Box>
          <Box>
            <button onClick={handleSubmit} className={styles.btn}>
              Login
            </button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Login;
