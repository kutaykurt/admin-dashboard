import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { useGetList } from "react-admin";
import { PostsPerUserChart } from "./PostsPerUserChart";

const Dashboard = () => {
  const { data: users } = useGetList("users");
  const { data: posts } = useGetList("posts");

  const userCount = users?.length ?? 0;
  const postCount = posts?.length ?? 0;
  const avgPosts = userCount > 0 ? (postCount / userCount).toFixed(2) : 0;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard Übersicht
      </Typography>

      {/* KPI Cards - CSS Grid */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          mb: 3,
        }}
      >
        <Card>
          <CardHeader title="Benutzer" />
          <CardContent>
            <Typography variant="h3">{userCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Beiträge" />
          <CardContent>
            <Typography variant="h3">{postCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Durchschnitt Beiträge / Benutzer" />
          <CardContent>
            <Typography variant="h3">{avgPosts}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Chart full width */}
      <Card>
        <CardHeader title="Beiträge pro Benutzer" />
        <CardContent sx={{ height: 350 }}>
          <PostsPerUserChart users={users ?? []} posts={posts ?? []} />
        </CardContent>
      </Card>
    </Box>
  );
};


export default Dashboard;