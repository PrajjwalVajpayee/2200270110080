// src/components/ResultCard.jsx
import React from 'react';
import { Paper, Typography, Stack, Link } from '@mui/material';

const ResultCard = ({ data }) => {
  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Stack spacing={1}>
        <Typography><strong>Original URL:</strong> {data.originalUrl}</Typography>
        <Typography>
          <strong>Short URL:</strong>{' '}
          <Link href={data.shortlink} target="_blank" rel="noreferrer">
            {data.shortlink}
          </Link>
        </Typography>
        <Typography><strong>Expires At:</strong> {new Date(data.expiry).toLocaleString()}</Typography>
      </Stack>
    </Paper>
  );
};

export default ResultCard;
