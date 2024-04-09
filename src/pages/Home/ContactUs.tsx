import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useSaveQuery } from "../../api/admin";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const clearFields = () => {
    setName("");
    setEmail("");
    setMessage("");
  };
  const { postData, isLoading } = useSaveQuery(clearFields);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      if (isLoading) return;
      postData({
        email,
        message,
        name,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!name?.trim()) {
      setNameError("Name cannot be empty");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!message?.trim()) {
      setMessageError("Message cannot be empty");
      isValid = false;
    } else {
      setMessageError("");
    }

    return isValid;
  };

  return (
    <BackgroundWrapper top={10}>
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={8}>
          <Grid container component={Paper}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 600,
                    mx: "auto",
                    p: 4,
                    borderRadius: "12px",
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h6" align="center" mb={2}>
                    Contact Us
                  </Typography>
                  <form onSubmit={handleSubmit} noValidate>
                    <TextField
                      fullWidth
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      margin="normal"
                      required
                      error={!!nameError}
                      helperText={nameError}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                      type="email"
                      error={!!emailError}
                      helperText={emailError}
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                      required
                      multiline
                      rows={4}
                      error={!!messageError}
                      helperText={messageError}
                    />
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disabled={isLoading}
                      type="submit"
                      sx={{
                        mt: 2,
                      }}
                    >
                      {isLoading ? <CircularProgress/> : 'Submit'}
                    </Button>
                  </form>
                  <Box sx={{ mt: 2 }}>
                    {/* Social media links */}
                    <IconButton aria-label="instagram">
                      <Instagram
                        fontSize="large"
                        style={{ color: "#fe00bc" }}
                      />
                    </IconButton>
                    <IconButton aria-label="facebook">
                      <Facebook fontSize="large" style={{ color: "#0a65fe" }} />
                    </IconButton>
                    <IconButton aria-label="twitter" color="primary">
                      <Twitter fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction="column"
              spacing={5}
              padding={5}
            >
              <Grid item display="flex" alignItems="center" gap={2}>
                <EmailIcon fontSize="large" />{" "}
                <a href="mailto:Swiftbidcare@gmail.com" style={{width: '100%'}}>
                  Swiftbidcare@gmail.com
                </a>
              </Grid>

              <Grid item display="flex" alignItems="center" gap={2}>
                <SmartphoneIcon fontSize="large" />{" "}
                <a href="tel:+11111111111">+11111111111</a>
              </Grid>
              <Grid item display="flex" gap={2}>
                <FmdGoodIcon fontSize="large" />
                <div>
                  <Typography>Swiftbid</Typography>
                  <Typography>Kitchener, ABC ABC</Typography>
                  <Typography>Ontario, Canada</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BackgroundWrapper>
  );
}
