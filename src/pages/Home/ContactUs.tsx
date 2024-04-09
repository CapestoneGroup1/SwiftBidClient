import { useState } from "react";
import { TextField, Button, Typography, Box, Paper, IconButton } from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Perform form submission only if all validations pass
    if (validateForm()) {
      // Form submission logic goes here
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError("Name cannot be empty");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate message
    if (!message.trim()) {
      setMessageError("Message cannot be empty");
      isValid = false;
    } else {
      setMessageError("");
    }

    return isValid;
  };

  return (
    <BackgroundWrapper top={10}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component={Paper}
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
              type="submit"
              sx={{
                mt: 2,
              }}
            >
              Submit
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            {/* Social media links */}
            <IconButton aria-label="instagram">
              <Instagram fontSize="large" style={{color: '#fe00bc'}}/>
            </IconButton>
            <IconButton aria-label="facebook">
              <Facebook fontSize="large"  style={{color: '#0a65fe'}}/>
            </IconButton>
            <IconButton aria-label="twitter" color="primary">
              <Twitter fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </BackgroundWrapper>
  );
}
