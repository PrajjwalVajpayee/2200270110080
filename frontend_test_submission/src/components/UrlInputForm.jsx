// src/components/UrlInputForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Paper, Stack, Alert } from '@mui/material';
import axios from 'axios';

const UrlInputForm = ({ onResult }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!url || !validity || !shortcode) {
      return setError("All fields are required!");
    }
    if (!isValidUrl(url)) {
      return setError("Invalid URL format");
    }
    if (validity < 1 || validity > 1440) {
      return setError("Validity must be between 1 and 1440 minutes");
    }

    try {
      const response = await axios.post("http://localhost:5000/shortUrls", {
        url,
        validity: Number(validity),
        shortcode
      });
      onResult({
        ...response.data,
        originalUrl: url
      });
      setUrl('');
      setValidity('');
      setShortcode('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Original URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          label="Validity (in minutes)"
          type="number"
          fullWidth
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <TextField
          label="Preferred Code"
          fullWidth
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          🔗 Shorten
        </Button>
      </Stack>
    </Paper>
  );
};

export default UrlInputForm;
