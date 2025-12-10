import { Box, Card, Typography, Stack, alpha, useTheme, Chip } from "@mui/material";
import { useListContext } from "react-admin";
import CircleIcon from '@mui/icons-material/Circle';

export const PostKanban = () => {
    const { data, isLoading } = useListContext();
    const theme = useTheme();

    if (isLoading || !data) return null;

    // Group posts by some logic - here we simulate status based on properties
    // In a real app, 'status' would be a field. We'll use 'published' and random 'active' logic
    const columns = [
        {
            id: "draft",
            title: "Entwürfe",
            color: theme.palette.text.secondary,
            items: data.filter((p) => !p.published && p.active),
        },
        {
            id: "published",
            title: "Veröffentlicht",
            color: theme.palette.success.main,
            items: data.filter((p) => p.published),
        },
        {
            id: "archived",
            title: "Archiviert",
            color: theme.palette.warning.main,
            items: data.filter((p) => !p.active),
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 2,
                height: "calc(100vh - 200px)", // Adjust based on layout
            }}
        >
            {columns.map((col) => (
                <Box
                    key={col.id}
                    sx={{
                        minWidth: 320,
                        width: 320,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        backgroundColor: alpha(theme.palette.background.paper, 0.4),
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    {/* Column Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircleIcon sx={{ fontSize: 12, color: col.color }} />
                            <Typography variant="subtitle1" fontWeight={700}>
                                {col.title}
                            </Typography>
                        </Box>
                        <Chip
                            label={col.items.length}
                            size="small"
                            sx={{
                                fontWeight: 600,
                                height: 24,
                                backgroundColor: alpha(col.color, 0.1),
                                color: col.color,
                            }}
                        />
                    </Box>

                    {/* Cards Container */}
                    <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2, pr: 1 }}>
                        {col.items.map((post: any) => (
                            <Card
                                key={post.id}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    cursor: "grab",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: theme.shadows[2],
                                        borderColor: theme.palette.primary.main,
                                    },
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    gutterBottom
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {post.title}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                                    <Typography variant="caption" color="text.secondary">
                                        ID: #{post.id}
                                    </Typography>
                                    {/* Simplified user avatar placeholder since we don't have full user object in simple list sometimes, 
                         but usually we do if reference is loaded. For now, simplistic. */}
                                </Stack>
                            </Card>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};
