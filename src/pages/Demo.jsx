import { useAtom } from 'jotai';
import { textAtom } from '../atoms';
import { Box, Typography, TextField } from '@mui/material';

function Demo() {
  const [text, setText] = useAtom(textAtom);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Demo Page</Typography>
      <TextField
        label="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography>Stored Value: {text}</Typography>
    </Box>
  );
}

export default Demo;