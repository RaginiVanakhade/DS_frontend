import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useProfile } from "../context/ProfileContext";


const Profile = () => {
  const { profile, setProfile } = useProfile();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Password changed successfully!");
  };

  const handleUploadPicture = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (ev) => {
      setProfile((prev) => ({
        ...prev,
        profilePicture: ev.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{  width: "100%" }}>
      <Typography variant="h5" mb={3}>
        My Profile
      </Typography>

      {message && (
        <Alert
          severity={
            message === "Passwords do not match." ? "error" : "success"
          }
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "flex-start",
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        <Paper
          sx={{
            width: 300,
            p: 3,
            borderRadius: 3,
            flexShrink: 0,
            textAlign: "center",
          }}
        >
          <Avatar
            src={profile.profilePicture}
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              mb: 2,
            }}
          >
            {!profile.profilePicture &&
              `${profile.firstName[0]}${profile.lastName[0]}`}
          </Avatar>

          <Button
            fullWidth
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Photo

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleUploadPicture}
            />
          </Button>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5">
            {profile.firstName} {profile.lastName}
          </Typography>

          <Typography color="text.secondary">
            {profile.email}
          </Typography>
        </Paper>

        {/* RIGHT SIDE */}

        <Box sx={{ flex: 1 }}>
          {/* Update Profile */}

          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h5" mb={3}>
              Update Profile
            </Typography>

            <Box
              component="form"
              onSubmit={handleUpdateProfile}
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <TextField
                label="First Name"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
                sx={{ flex: 1, minWidth: 220 }}
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
                sx={{ flex: 1, minWidth: 220 }}
              />

              <TextField
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                sx={{ flex: 1.5, minWidth: 260 }}
              />

              <Button
                variant="contained"
                type="submit"
                sx={{ height: 56 }}
              >
                Update Profile
              </Button>
            </Box>
          </Paper>

          {/* Password */}

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" mb={3}>
              Change Password
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />

              <TextField
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />

              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />

              <Button
                variant="contained"
                color="warning"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;