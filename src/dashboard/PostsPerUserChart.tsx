import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
  const data = users.map((user) => ({
    name: user.name,
    posts: posts.filter((p) => p.userId === user.id).length,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="posts" />
      </BarChart>
    </ResponsiveContainer>
  );
};
