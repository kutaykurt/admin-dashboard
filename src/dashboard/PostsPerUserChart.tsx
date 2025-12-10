import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTheme, Box, Typography, alpha, Paper } from "@mui/material";

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
}

interface Props {
  users: User[];
  posts: Post[];
}

export const PostsPerUserChart = ({ users, posts }: Props) => {
  const theme = useTheme();

  const data = users.map((user) => ({
    name: user.name.split(" ")[0],
    fullName: user.name,
    posts: posts.filter((p) => p.userId === user.id).length,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.primary"
          >
            {data.fullName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {data.posts} Beiträge
            </Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.3}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke={theme.palette.divider}
          vertical={false}
        />

        <XAxis
          dataKey="name"
          tick={{
            fill: theme.palette.text.secondary,
            fontSize: 11,
          }}
          axisLine={false}
          tickLine={false}
          dy={10}
        />

        <YAxis
          allowDecimals={false}
          tick={{
            fill: theme.palette.text.secondary,
            fontSize: 11,
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: alpha(theme.palette.primary.main, 0.04) }}
        />

        <Bar
          dataKey="posts"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
          fill="url(#colorBar)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PostsPerUserChart;
