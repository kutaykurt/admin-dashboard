import {
    Box,
    Paper,
    Typography,
    Grid,
    Chip,
    useTheme,
    alpha,
    IconButton,
    Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Simulated Event Data
const events = [
    {
        id: 1,
        title: "Team Meeting",
        date: 10,
        time: "10:00 - 11:30",
        color: "primary",
        type: "Intern",
    },
    {
        id: 2,
        title: "Project Deadline",
        date: 12,
        time: "17:00",
        color: "error",
        type: "Critical",
    },
    {
        id: 3,
        title: "Code Review",
        date: 15,
        time: "14:00 - 15:00",
        color: "warning",
        type: "Dev",
    },
    {
        id: 4,
        title: "Client Call",
        date: 18,
        time: "09:30 - 10:15",
        color: "success",
        type: "Client",
    },
    {
        id: 5,
        title: "Release v2.0",
        date: 25,
        time: "All Day",
        color: "info",
        type: "Release",
    },
];

const daysOfWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export const EventList = () => {
    const theme = useTheme();
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Kalender
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Verwalte deine Termine und Deadlines.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>Neuer Termin</Button>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                {/* Calendar Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton size="small" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography variant="h5" fontWeight={600}>Oktober 2025</Typography>
                        <IconButton size="small" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                    <Button variant="outlined" startIcon={<TodayIcon />} size="small">Heute</Button>
                </Box>

                {/* Calendar Grid Header */}
                <Grid container sx={{ mb: 1 }}>
                    {daysOfWeek.map((day) => (
                        <Grid size="grow" key={day}>
                            <Typography
                                align="center"
                                variant="subtitle2"
                                fontWeight={600}
                                color="text.secondary"
                                sx={{ py: 1 }}
                            >
                                {day}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                {/* Days */}
                <Grid container spacing={1}>
                    {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const dayEvents = events.filter((e) => e.date === day);
                        const isToday = day === 12; // Simulated "Today"

                        return (
                            <Grid size="grow" sx={{ minWidth: "14%", minHeight: 120 }} key={day}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        p: 1.5,
                                        border: `1px solid ${isToday ? theme.palette.primary.main : theme.palette.divider}`,
                                        borderRadius: 2,
                                        backgroundColor: isToday ? alpha(theme.palette.primary.main, 0.04) : "transparent",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                            borderColor: theme.palette.text.secondary,
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={isToday ? 700 : 500}
                                        color={isToday ? "primary" : "text.secondary"}
                                        sx={{ mb: 1, display: 'inline-block', width: 24, height: 24, borderRadius: '50%', textAlign: 'center', lineHeight: '24px', bgcolor: isToday ? theme.palette.primary.main : 'transparent', color: isToday ? '#fff' : 'inherit' }}
                                    >
                                        {day}
                                    </Typography>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                        {dayEvents.map((ev) => {
                                            const colorKey = ev.color as keyof typeof theme.palette;
                                            // Safe color access
                                            const paletteColor = (theme.palette[colorKey] as any)?.main || theme.palette.primary.main;

                                            return (
                                                <Box
                                                    key={ev.id}
                                                    sx={{
                                                        p: 0.8,
                                                        borderRadius: 1.5,
                                                        bgcolor: alpha(paletteColor, 0.1),
                                                        borderLeft: `3px solid ${paletteColor}`,
                                                        cursor: 'pointer',
                                                        "&:hover": {
                                                            bgcolor: alpha(paletteColor, 0.2),
                                                        }
                                                    }}
                                                >
                                                    <Typography variant="caption" fontWeight={700} display="block" noWrap>
                                                        {ev.title}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <AccessTimeIcon sx={{ fontSize: 10 }} /> {ev.time}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
        </Box>
    );
};
