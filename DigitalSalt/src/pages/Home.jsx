import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Paper,
  Divider,
  useTheme,
  Chip
} from '@mui/material';
import {
  MenuBook as BookIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

// Mock data – replace with API calls later
const mockAnalytics = {
  totalBooks: 128,
  totalUsers: 45,
  activeUsers: 32,
  verifiedUsers: 40,
  totalFavorites: 312,
  topSearches: ['Clean Code', 'Atomic Habits', 'Sapiens'],
  recentBooks: [
    { id: 1, title: 'Atomic Habits', added: '2026-06-28' },
    { id: 2, title: 'The Psychology of Money', added: '2026-06-27' },
    { id: 3, title: 'Elon Musk', added: '2026-06-25' },
  ],
};

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 3 }}>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here’s what’s happening with your books.
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Books"
            value={mockAnalytics.totalBooks}
            icon={<BookIcon />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={mockAnalytics.totalUsers}
            icon={<PeopleIcon />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={mockAnalytics.activeUsers}
            icon={<PeopleIcon />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Favorites"
            value={mockAnalytics.totalFavorites}
            icon={<FavoriteIcon />}
            color={theme.palette.error.main}
          />
        </Grid>
      </Grid>

      {/* Bottom Row: Top Searches & Recent Books */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              🔍 Top Searches
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              {mockAnalytics.topSearches.map((term, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: index < mockAnalytics.topSearches.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2">{term}</Typography>
                  <Chip label={`#${index + 1}`} size="small" variant="outlined" />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              📚 Recently Added Books
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              {mockAnalytics.recentBooks.map((book) => (
                <Box
                  key={book.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2">{book.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {book.added}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;