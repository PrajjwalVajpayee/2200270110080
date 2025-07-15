// src/pages/UrlShortenerPage.jsx
import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import UrlInputForm from '../components/UrlInputForm';
import ResultCard from '../components/ResultCard';

const UrlShortenerPage = () => {
  const [urls, setUrls] = useState([{ id: 1 }]); // list of inputs
  const [results, setResults] = useState([]);

  const addForm = () => {
    if (urls.length < 5) {
      setUrls([...urls, { id: Date.now() }]);
    }
  };

  const handleResult = (result) => {
    setResults([result, ...results]);
  };

  return (
    <Box
  sx={{
    p: 4,
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  }}
>
  <Typography
    variant="h4"
    gutterBottom
    sx={{ fontWeight: 600, color: "#333", mb: 4 }}
  >
    🔗 URL Shortener (up to 5 at a time)
  </Typography>

  <Grid container spacing={2}>
    {urls.map((form, index) => (
      <Grid item xs={12} md={6} key={form.id}>
        <UrlInputForm onResult={handleResult} />
      </Grid>
    ))}
  </Grid>

  {urls.length < 5 && (
    <Button
      variant="contained"
      sx={{
        mt: 3,
        backgroundColor: "#1976d2",
        "&:hover": { backgroundColor: "#115293" },
        fontWeight: 500,
      }}
      onClick={addForm}
    >
      ➕ Add Another URL
    </Button>
  )}

  <Typography variant="h5" sx={{ mt: 5, mb: 2, color: "#444" }}>
    ✨ Shortened URLs
  </Typography>
</Box>
  );
};

export default UrlShortenerPage;
