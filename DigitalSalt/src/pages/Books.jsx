// Books.jsx
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
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Import the custom modal
import BookModal from '../component/BookModal';

// ------------- Sample Data -------------
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
];

const Books = () => {
  const theme = useTheme();

  // ---------- State ----------
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'view' | 'edit' | 'add'
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    category: '',
    publisher: '',
    language: 'English',
    rating: '',
    publishedDate: '',
  });

  // ---------- Derived Data ----------
  const categories = useMemo(
    () => [...new Set(books.map((b) => b.category))].sort(),
    [books]
  );

  // Filter & sort
  const filteredBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(searchLower) ||
        book.authors.some((author) =>
          author.toLowerCase().includes(searchLower)
        );
      const matchesCategory =
        !selectedCategory || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
    }
    return filtered;
  }, [books, searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + rowsPerPage);

  // ---------- Modal Handlers ----------
  const openModal = (mode, book = null) => {
    if (mode === 'add') {
      setFormData({
        title: '',
        authors: '',
        category: '',
        publisher: '',
        language: 'English',
        rating: '',
        publishedDate: '',
      });
      setSelectedBook(null);
    } else if (book) {
      setFormData({
        title: book.title,
        authors: book.authors.join(', '),
        category: book.category,
        publisher: book.publisher,
        language: book.language,
        rating: book.rating.toString(),
        publishedDate: book.publishedDate,
      });
      setSelectedBook(book);
    }
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode(null);
    setSelectedBook(null);
  };

  const handleFormChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Save / Add
  const handleSave = () => {
    if (!formData.title || !formData.authors || !formData.category || !formData.publisher) {
      alert('Please fill in Title, Authors, Category, and Publisher.');
      return;
    }

    const authorsArray = formData.authors.split(',').map((a) => a.trim());
    const ratingNum = parseFloat(formData.rating) || 0;
    const clampedRating = Math.min(5, Math.max(0, ratingNum));

    if (modalMode === 'edit' && selectedBook) {
      const updatedBook = {
        ...selectedBook,
        title: formData.title,
        authors: authorsArray,
        category: formData.category,
        publisher: formData.publisher,
        language: formData.language || 'English',
        rating: clampedRating,
        publishedDate: formData.publishedDate || new Date().toISOString().split('T')[0],
      };
      setBooks(books.map((b) => (b.id === selectedBook.id ? updatedBook : b)));
    } else if (modalMode === 'add') {
      const newBook = {
        id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
        title: formData.title,
        authors: authorsArray,
        category: formData.category,
        publisher: formData.publisher,
        language: formData.language || 'English',
        rating: clampedRating,
        publishedDate: formData.publishedDate || new Date().toISOString().split('T')[0],
      };
      setBooks([...books, newBook]);
      setPage(1);
    }
    closeModal();
  };

  const handleDelete = (book) => {
    if (window.confirm(`Delete "${book.title}"?`)) {
      setBooks(books.filter((b) => b.id !== book.id));
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
    setPage(1);
  };

  const renderRating = (rating) => {
    const full = Math.floor(rating);
    const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
    return (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="body2" sx={{ color: '#f5a623', letterSpacing: 1 }}>
          {stars}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {rating.toFixed(1)}
        </Typography>
      </Stack>
    );
  };

  // ---------- Render ----------
  return (
    <Box sx={{  maxWidth: 1440, mx: 'auto' }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            📚 Books
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and explore all books in your library
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal('add')}
          sx={{ height: 40 }}
        >
          Add Book
        </Button>
      </Stack>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
          sx={{ minWidth: 200, flex: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: alpha(theme.palette.primary.light, 0.04) }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Book</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Author(s)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Published</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    No books found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentBooks.map((book) => (
                <TableRow key={book.id} hover>
                  <TableCell>
                    <Typography fontWeight={500} variant="body2">
                      {book.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{book.authors.join(', ')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={book.category} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{renderRating(book.rating)}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{book.publishedDate}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" justifyContent="center" spacing={0}>
                      <Tooltip title="View">
                        <IconButton size="small" onClick={() => openModal('view', book)}>
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => openModal('edit', book)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => handleDelete(book)}>
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
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, totalBooks)} of {totalBooks}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      {/* ========== Custom Modal ========== */}
      <BookModal
        open={modalOpen}
        mode={modalMode}
        formData={formData}
        categories={categories}
        onClose={closeModal}
        onChange={handleFormChange}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Books;