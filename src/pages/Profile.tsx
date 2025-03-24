import React, { useState } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import InputField from "../components/InputField";

const Profile: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("admin");
    const [lastName, setLastName] = useState<string>("admin");
    const [email, setEmail] = useState<string>("admin@mailinator.com");
    const [phone1, setPhone1] = useState<string>("+14654654");
    const [phone2, setPhone2] = useState<string>("+1");
    const [address, setAddress] = useState<string>("test\ntest2");
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitted(true);
  
      if (!firstName || !email || !phone1 || !address) {
        alert("Please fill all required fields!");
        return;
      }
  
      alert("Profile Submitted!");
    };
  
    return (
      <Container
        maxWidth="sm"
        sx={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          My Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField label="First Name" value={firstName} setValue={setFirstName} required maxLength={50} />
            </Grid>
            <Grid item xs={6}>
              <InputField label="Last Name" value={lastName} setValue={setLastName} maxLength={50} />
            </Grid>
            <Grid item xs={12}>
              <InputField label="Email" value={email} setValue={setEmail} required type="email" />
            </Grid>
            <Grid item xs={6}>
              <InputField label="Phone1" value={phone1} setValue={setPhone1} required maxLength={15} />
            </Grid>
            <Grid item xs={6}>
              <InputField label="Phone2" value={phone2} setValue={setPhone2} maxLength={15} />
            </Grid>
            <Grid item xs={12}>
              <InputField label="Address" value={address} setValue={setAddress} required maxLength={200} multiline />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="warning" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  };
  

export default Profile;
