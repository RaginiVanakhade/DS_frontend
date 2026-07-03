// BookModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const BookModal = ({
  open,              
  mode,              
  formData,           
  categories,        
  onClose,          
  onChange,          
  onSave,           
}) => {
  const isView = mode === 'view';

  // Map mode to title
  const titleMap = {
    add: 'Add New Book',
    edit: 'Edit Book',
    view: 'View Book',
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{titleMap[mode]}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label="Title *"
              fullWidth
              size="small"
              value={formData.title}
              onChange={onChange('title')}
              disabled={isView}
            />
          </Grid>

          {/* Authors */}
          <Grid item xs={12}>
            <TextField
              label="Authors * (comma separated)"
              fullWidth
              size="small"
              value={formData.authors}
              onChange={onChange('authors')}
              placeholder="e.g. James Clear, John Doe"
              disabled={isView}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small" disabled={isView}>
              <InputLabel>Category *</InputLabel>
              <Select
                value={formData.category}
                label="Category *"
                onChange={onChange('category')}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Publisher */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Publisher *"
              fullWidth
              size="small"
              value={formData.publisher}
              onChange={onChange('publisher')}
              disabled={isView}
            />
          </Grid>

          {/* Language */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Language"
              fullWidth
              size="small"
              value={formData.language}
              onChange={onChange('language')}
              disabled={isView}
            />
          </Grid>

          {/* Rating */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rating (0-5)"
              type="number"
              fullWidth
              size="small"
              inputProps={{ step: 0.1, min: 0, max: 5 }}
              value={formData.rating}
              onChange={onChange('rating')}
              disabled={isView}
            />
          </Grid>

          {/* Published Date */}
          <Grid item xs={12}>
            <TextField
              label="Published Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.publishedDate}
              onChange={onChange('publishedDate')}
              disabled={isView}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!isView && (
          <Button variant="contained" onClick={onSave}>
            {mode === 'add' ? 'Add Book' : 'Save Changes'}
          </Button>
        )}
        {isView && (
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;