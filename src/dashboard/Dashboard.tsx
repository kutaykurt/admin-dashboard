import {
  Box,
  Paper,
  alpha,
  useTheme,
  Typography,
  Fade,
  Grow,
  Stack,
  Grid,
} from "@mui/material";
import { useGetList } from "react-admin";
import { PostsPerUserChart } from "./PostsPerUserChart";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Dashboard = () => {
  const { data: users } = useGetList("users");
  const { data: posts } = useGetList("posts");
  const theme = useTheme();

  const userCount = users?.length ?? 0;
  const postCount = posts?.length ?? 0;
  const avgPosts = userCount > 0 ? (postCount / userCount).toFixed(2) : 0;

  const kpiCards = [
    {
      title: "Gesamt Benutzer",
      value: userCount,
      icon: <PeopleIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      title: "Alle Beiträge",
      value: postCount,
      icon: <ArticleIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      title: "Ø Beiträge / User",
      value: avgPosts,
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      <Fade in timeout={600}>
        <Box sx={{ mb: 4, mt: 2 }}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Willkommen im Admin-Bereich. Hier ist der aktuelle Status.
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiCards.map((card, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <Grow in timeout={800 + i * 200}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[3],
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{ color: theme.palette.text.primary, mt: 1 }}
                  >
                    {card.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: card.bgColor,
                    color: card.color,
                  }}
                >
                  {card.icon}
                </Box>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Grow in timeout={1400}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            height: "100%",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Box>
              <Typography variant="h6" color="text.primary">
                Aktivität
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Anzahl der Beiträge pro registriertem Benutzer
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ height: 400, width: "100%" }}>
            <PostsPerUserChart users={users ?? []} posts={posts ?? []} />
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
};

export default Dashboard;
