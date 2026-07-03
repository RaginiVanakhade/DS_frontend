import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  Pagination,
  IconButton,
  Tooltip,
  Stack,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  useTheme,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAltOff as FilterOffIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// ------------- Sample Data (initial) -------------
const initialBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    authors: ['James Clear'],
    category: 'Self Help',
    publisher: 'Penguin Random House',
    language: 'English',
    rating: 4.7,
    publishedDate: '2018-10-16',
  },
  {
    id: 2,
    title: 'The Psychology of Money',
    authors: ['Morgan Housel'],
    category: 'Finance',
    publisher: 'Harriman House',
    language: 'English',
    rating: 4.6,
    publishedDate: '2020-09-08',
  },
  {
    id: 3,
    title: 'Clean Code',
    authors: ['Robert C. Martin'],
    category: 'Technology',
    publisher: 'Prentice Hall',
    language: 'English',
    rating: 4.8,
    publishedDate: '2008-08-01',
  },
  {
    id: 4,
    title: 'Rich Dad Poor Dad',
    authors: ['Robert Kiyosaki'],
    category: 'Finance',
    publisher: 'Plata Publishing',
    language: 'English',
    rating: 4.5,
    publishedDate: '1997-04-01',
  },
  {
    id: 5,
    title: 'The Alchemist',
    authors: ['Paulo Coelho'],
    category: 'Fiction',
    publisher: 'HarperCollins',
    language: 'English',
    rating: 4.3,
    publishedDate: '1988-05-01',
  },
  {
    id: 6,
    title: 'Thinking, Fast and Slow',
    authors: ['Daniel Kahneman'],
    category: 'Psychology',
    publisher: 'Farrar, Straus and Giroux',
    language: 'English',
    rating: 4.6,
    publishedDate: '2011-10-25',
  },
  {
    id: 7,
    title: 'Sapiens',
    authors: ['Yuval Noah Harari'],
    category: 'History',
    publisher: 'Harper',
    language: 'English',
    rating: 4.5,
    publishedDate: '2011-10-25',
  },
  {
    id: 8,
    title: 'The Lean Startup',
    authors: ['Eric Ries'],
    category: 'Business',
    publisher: 'Crown Business',
    language: 'English',
    rating: 4.3,
    publishedDate: '2011-09-13',
  },
  {
    id: 9,
    title: 'Elon Musk',
    authors: ['Walter Isaacson'],
    category: 'Biography',
    publisher: 'Simon & Schuster',
    language: 'English',
    rating: 4.4,
    publishedDate: '2023-09-12',
  },
  {
    id: 10,
    title: 'The Pragmatic Programmer',
    authors: ['David Thomas', 'Andrew Hunt'],
    category: 'Technology',
    publisher: 'Addison-Wesley',
    language: 'English',
    rating: 4.7,
    publishedDate: '1999-10-20',
  },
  {
    id: 11,
    title: 'Deep Work',
    authors: ['Cal Newport'],
    category: 'Self Help',
    publisher: 'Grand Central Publishing',
    language: 'English',
    rating: 4.5,
    publishedDate: '2016-01-05',
  },
  {
    id: 12,
    title: 'The Art of War',
    authors: ['Sun Tzu'],
    category: 'Philosophy',
    publisher: 'Shambhala',
    language: 'English',
    rating: 4.2,
    publishedDate: '2001-08-14',
  },
  {
    id: 13,
    title: '1984',
    authors: ['George Orwell'],
    category: 'Fiction',
    publisher: 'Signet Classic',
    language: 'English',
    rating: 4.7,
    publishedDate: '1949-06-08',
  },
  {
    id: 14,
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    category: 'Fiction',
    publisher: 'J.B. Lippincott & Co.',
    language: 'English',
    rating: 4.8,
    publishedDate: '1960-07-11',
  },
  {
    id: 15,
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    category: 'Fiction',
    publisher: "Charles Scribner's Sons",
    language: 'English',
    rating: 4.3,
    publishedDate: '1925-04-10',
  },
  {
    id: 16,
    title: 'Pride and Prejudice',
    authors: ['Jane Austen'],
    category: 'Fiction',
    publisher: 'T. Egerton',
    language: 'English',
    rating: 4.7,
    publishedDate: '1813-01-28',
  },
  {
    id: 17,
    title: 'The Catcher in the Rye',
    authors: ['J.D. Salinger'],
    category: 'Fiction',
    publisher: 'Little, Brown and Company',
    language: 'English',
    rating: 4.0,
    publishedDate: '1951-07-16',
  },
  {
    id: 18,
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    category: 'Fantasy',
    publisher: 'George Allen & Unwin',
    language: 'English',
    rating: 4.8,
    publishedDate: '1937-09-21',
  },
  {
    id: 19,
    title: 'Fahrenheit 451',
    authors: ['Ray Bradbury'],
    category: 'Fiction',
    publisher: 'Ballantine Books',
    language: 'English',
    rating: 4.4,
    publishedDate: '1953-10-19',
  },
  {
    id: 20,
    title: 'The Odyssey',
    authors: ['Homer'],
    category: 'Classics',
    publisher: 'Penguin Classics',
    language: 'English',
    rating: 4.2,
    publishedDate: '1996-11-01',
  },
  {
    id: 21,
    title: 'The Little Prince',
    authors: ['Antoine de Saint-Exupéry'],
    category: 'Fiction',
    publisher: 'Reynal & Hitchcock',
    language: 'English',
    rating: 4.6,
    publishedDate: '1943-04-06',
  },
  {
    id: 22,
    title: 'The Power of Now',
    authors: ['Eckhart Tolle'],
    category: 'Self Help',
    publisher: 'New World Library',
    language: 'English',
    rating: 4.4,
    publishedDate: '1997-10-01',
  },
  {
    id: 23,
    title: 'How to Win Friends and Influence People',
    authors: ['Dale Carnegie'],
    category: 'Self Help',
    publisher: 'Simon & Schuster',
    language: 'English',
    rating: 4.5,
    publishedDate: '1936-10-01',
  },
  {
    id: 24,
    title: 'The 7 Habits of Highly Effective People',
    authors: ['Stephen R. Covey'],
    category: 'Self Help',
    publisher: 'Free Press',
    language: 'English',
    rating: 4.5,
    publishedDate: '1989-08-15',
  },
  {
    id: 25,
    title: "Man's Search for Meaning",
    authors: ['Viktor E. Frankl'],
    category: 'Psychology',
    publisher: 'Beacon Press',
    language: 'English',
    rating: 4.7,
    publishedDate: '1946-01-01',
  },
];

// ------------- Main Component -------------
const Books = () => {
  const theme = useTheme();

  // ---------- State ----------
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    authors: '',
    category: '',
    publisher: '',
    language: '',
    rating: '',
    publishedDate: '',
  });

  // ---------- Derived Data ----------
  const categories = useMemo(
    () => [...new Set(books.map((b) => b.category))].sort(),
    [books]
  );
  const languages = useMemo(
    () => [...new Set(books.map((b) => b.language))].sort(),
    [books]
  );
  const publishers = useMemo(
    () => [...new Set(books.map((b) => b.publisher))].sort(),
    [books]
  );
  const years = useMemo(() => {
    const y = books.map((b) => new Date(b.publishedDate).getFullYear());
    return [...new Set(y)].sort((a, b) => b - a);
  }, [books]);

  // Filter and sort
  const filteredBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(searchLower) ||
        book.authors.some((author) =>
          author.toLowerCase().includes(searchLower)
        ) ||
        book.id.toString().includes(searchTerm);

      const matchesCategory =
        !selectedCategory || book.category === selectedCategory;
      const matchesLanguage =
        !selectedLanguage || book.language === selectedLanguage;
      const matchesPublisher =
        !selectedPublisher || book.publisher === selectedPublisher;
      const matchesRating =
        !ratingFilter || book.rating >= parseFloat(ratingFilter);
      const matchesYear =
        !yearFilter ||
        new Date(book.publishedDate).getFullYear() === parseInt(yearFilter, 10);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLanguage &&
        matchesPublisher &&
        matchesRating &&
        matchesYear
      );
    });

    if (sortBy) {
      switch (sortBy) {
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          filtered.sort((a, b) => a.authors[0].localeCompare(b.authors[0]));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'date':
          filtered.sort(
            (a, b) =>
              new Date(a.publishedDate) - new Date(b.publishedDate)
          );
          break;
        default:
          break;
      }
    }
    return filtered;
  }, [
    books,
    searchTerm,
    selectedCategory,
    selectedLanguage,
    selectedPublisher,
    sortBy,
    ratingFilter,
    yearFilter,
  ]);

  // Pagination
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalBooks);
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Handlers
  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLanguage('');
    setSelectedPublisher('');
    setSortBy('');
    setRatingFilter('');
    setYearFilter('');
    setPage(1);
    setShowMoreFilters(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Dialog handlers
  const handleOpenDialog = () => {
    setNewBook({
      title: '',
      authors: '',
      category: '',
      publisher: '',
      language: '',
      rating: '',
      publishedDate: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDialogChange = (field) => (event) => {
    setNewBook({ ...newBook, [field]: event.target.value });
  };

  const handleAddBook = () => {
    // Validation
    if (!newBook.title || !newBook.authors || !newBook.category || !newBook.publisher) {
      alert('Please fill in at least Title, Authors, Category, and Publisher.');
      return;
    }

    const authorsArray = newBook.authors.split(',').map((a) => a.trim());
    const ratingNum = parseFloat(newBook.rating) || 0;

    const bookToAdd = {
      id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
      title: newBook.title,
      authors: authorsArray,
      category: newBook.category,
      publisher: newBook.publisher,
      language: newBook.language || 'English',
      rating: Math.min(5, Math.max(0, ratingNum)), // clamp 0-5
      publishedDate: newBook.publishedDate || new Date().toISOString().split('T')[0],
    };

    setBooks([...books, bookToAdd]);
    setOpenDialog(false);
    // Optionally, reset page to first page to see new book
    setPage(1);
  };

  // Action handlers (placeholder)
  const handleView = (book) => alert(`Viewing: ${book.title}`);
  const handleEdit = (book) => alert(`Editing: ${book.title}`);
  const handleDelete = (book) => {
    if (window.confirm(`Delete "${book.title}"?`)) {
      setBooks(books.filter((b) => b.id !== book.id));
    }
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push('★');
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="body2" sx={{ color: '#f5a623', letterSpacing: 1 }}>
          {stars.join('')}
        </Typography>
        <Typography variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
          {rating.toFixed(1)}
        </Typography>
      </Stack>
    );
  };

  // ---------- Render ----------
  return (
    <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
      {/* Header with Add Button */}
<Stack direction="row" alignItems="center" spacing={2} >
  <Box sx={{ flexGrow: 1 }}>
    <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
      📚 Books
    </Typography>
  </Box>
  <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ height: 40 }}>
    Add Book
  </Button>
</Stack>

      {/* Stats */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 2 }}
        spacing={1}
      >
        <Typography variant="body2" fontWeight={500}>
          📖 Total Books: <strong>{totalBooks}</strong>
          {totalBooks !== books.length && (
            <Chip
              label="filtered"
              size="small"
              sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
            />
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing {startIndex + 1}–{endIndex} of {totalBooks}
        </Typography>
      </Stack>

      {/* Table - Reduced row height via dense padding */}
      <TableContainer
        component={Paper}
        sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
      >
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.light, 0.04) }}>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Book</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Author(s)</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Publisher</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Language</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }}>Published Date</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 1 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    <Box component="span" sx={{ fontSize: 48, display: 'block' }}>
                      🔍
                    </Box>
                    No books found
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or filters
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleReset}
                      sx={{ mt: 2 }}
                    >
                      Reset all filters
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentBooks.map((book) => (
                <TableRow
                  key={book.id}
                  hover
                  sx={{
                    '&:nth-of-type(even)': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.2),
                    },
                  }}
                >
                  <TableCell sx={{ py: 0.5 }}> {/* reduced vertical padding */}
                    <Typography fontWeight={500} variant="body2">
                      {book.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Typography variant="body2">{book.authors.join(', ')}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Chip
                      label={book.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 4, height: 22, fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Typography variant="body2">{book.publisher}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Typography variant="body2">{book.language}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>{renderRating(book.rating)}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Typography variant="body2">{book.publishedDate}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ py: 0.5 }}>
                    <Stack direction="row" justifyContent="center" spacing={0}>
                      <Tooltip title="View">
                        <IconButton size="small" onClick={() => handleView(book)}>
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => handleEdit(book)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(book)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalBooks > 0 && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            Page {page} of {totalPages}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      {/* Add Book Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title *"
                fullWidth
                size="small"
                value={newBook.title}
                onChange={handleDialogChange('title')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Authors * (comma separated)"
                fullWidth
                size="small"
                value={newBook.authors}
                onChange={handleDialogChange('authors')}
                placeholder="e.g. James Clear, John Doe"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Category *</InputLabel>
                <Select
                  value={newBook.category}
                  label="Category *"
                  onChange={handleDialogChange('category')}
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Publisher *"
                fullWidth
                size="small"
                value={newBook.publisher}
                onChange={handleDialogChange('publisher')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Language</InputLabel>
                <Select
                  value={newBook.language}
                  label="Language"
                  onChange={handleDialogChange('language')}
                >
                  <MenuItem value="">Select Language</MenuItem>
                  {languages.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rating (0-5)"
                type="number"
                fullWidth
                size="small"
                inputProps={{ step: 0.1, min: 0, max: 5 }}
                value={newBook.rating}
                onChange={handleDialogChange('rating')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Published Date"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={newBook.publishedDate}
                onChange={handleDialogChange('publishedDate')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddBook}>
            Add Book
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Books;