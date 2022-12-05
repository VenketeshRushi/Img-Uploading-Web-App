import { Alert, Box, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import styles from "../Styles/home.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../redux/authentication/auth.action";
import { useDispatch } from "react-redux";

function Home() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: [320, 600, 600, 600],
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    textAlign: "center",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let jwt = Cookies.get("jwttoken");
  let userid = Cookies.get("userid");
  //console.log(userid);

  useEffect(() => {
    getimages();
  }, []);

  const onChange = (e) => {
    //console.log(e.target.files);
    setFiles(e.target.files);
  };
  //console.log(files);

  async function getimages() {
    try {
      const res = await axios.get("https://img-drive.onrender.com/files", {
        headers: {
          Authorization: `${userid}`,
        },
      });
      //console.log(res);
      setImages(res.data);
      //console.log(images);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      if (error.response.status == 400) {
        setTimeout(() => {
          navigate("/login");
        }, 2100);
      }
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("imgCollection", file);
    });
    try {
      const res = await axios.post("https://img-drive.onrender.com/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });
      //console.log(res.message);
      setErrorMessage(res.data.message);
    } catch (err) {
      //console.log(err.response.status);
      setErrorMessage(err.response.data.message);
      if (err.response.status == 400) {
        setTimeout(() => {
          navigate("/login");
        }, 2100);
      }
    }
    getimages();
    handleClose();
  };

  var selected = [];
  function handleChange(e) {
    let isChecked = e.target.checked;
    let value = e.target.value;
    //console.log(value)
    if (isChecked) {
      selected.push(value);
    } else {
      selected = selected.filter((e) => e !== value);
    }
  }

  async function deleteimg(del) {
    console.log(selected);
    try {
      let res = await axios({
        method: "post",
        url: "https://img-drive.onrender.com/files/del",
        headers: {
          Authorization: `${userid}`,
        },
        data: {
          img: del,
        },
      });
      setErrorMessage(res.data);
    } catch (error) {
      setErrorMessage(error.data);
    }
    getimages();
  }
  async function delselectedimg() {
    //console.log(selected);
    deleteimg(selected);
  }
  function handlelogout() {
    dispatch(logoutAPI);
    navigate("/");
    console.log("logging out");
    Cookies.remove("jwttoken")
    Cookies.remove("userid")
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            marginBottom={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {" "}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload new images
            </Typography>
            <Box onClick={handleClose}>
              <CloseIcon
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            border={"1px dashed"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {" "}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Drop Files here
            </Typography>
            <Typography>or</Typography>
            <div className={styles.uploads}>
              <form onSubmit={onSubmit}>
                <div>
                  <input
                    type="file"
                    id="file"
                    multiple
                    name="imgCollection"
                    onChange={onChange}
                  />
                </div>
                <button type="submit" value="Upload">
                  Upload
                </button>
              </form>
            </div>
          </Box>
        </Box>
      </Modal>
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
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"12px"}
          padding={"16px 64px"}
        >
          <Stack gridAutoFlow={"column"}>
            <h2>Media Library</h2>
            <h4>{images.length} images</h4>
          </Stack>
          <Box
            display={"flex"}
            flexDirection={["column-reverse", "column-reverse", "row", "row"]}
            gap={"20px"}
          >
            <button onClick={delselectedimg}>
              <h6>Delete selected images</h6>
            </button>
            <button onClick={handleOpen}>
              <img src={require(`../Assets/images/plus-circle.png`)} alt="" />
              <h6>Upload new image</h6>
            </button>
            <button
              onClick={handlelogout}
              className={styles.button33}
              role="button"
            >
              Logout
            </button>
          </Box>
        </Box>
        {images.length === 0 ? (
          <div className={styles.image}>
            <img src={require(`../Assets/images/upalod.png`)} alt="" />
            <p>Click on ‘Upload’ to start adding images</p>
          </div>
        ) : (
          <div className={styles.allimg}>
            {images?.map((e) => (
              <div key={e}>
                <input
                  onChange={(e) => handleChange(e)}
                  type="checkbox"
                  value={e}
                />
                <img src={e} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
