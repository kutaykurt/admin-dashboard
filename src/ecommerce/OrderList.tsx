import {
    Box,
    Typography,
    Paper,
    Chip,
    useTheme,
    Button,
    Grid,
    alpha,
    IconButton
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

const orders = [
    { id: "#ORD-7890", customer: "Alice Freeman", items: 3, total: 350.20, status: "Delivered", date: "2024-10-25" },
    { id: "#ORD-7891", customer: "Bob Smith", items: 1, total: 49.99, status: "Processing", date: "2024-10-26" },
    { id: "#ORD-7892", customer: "Charlie Brown", items: 5, total: 1200.00, status: "Shipped", date: "2024-10-26" },
    { id: "#ORD-7893", customer: "Diana Prince", items: 2, total: 199.50, status: "Pending", date: "2024-10-27" },
];

export const OrderList = () => {
    const theme = useTheme();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return "success";
            case "Shipped": return "info";
            case "Processing": return "warning";
            case "Pending": return "default";
            default: return "default";
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Bestellungen
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Verfolge und bearbeite Kundenbestellungen.
                </Typography>
            </Box>

            <Paper sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, overflow: "hidden" }} elevation={0}>
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.04), borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">ORDER ID</Typography></Grid>
                        <Grid size={{ xs: 3 }}><Typography variant="caption" fontWeight={700} color="text.secondary">CUSTOMER</Typography></Grid>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">DATE</Typography></Grid>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">TOTAL</Typography></Grid>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">STATUS</Typography></Grid>
                        <Grid size={{ xs: 1 }}></Grid>
                    </Grid>
                </Box>

                {orders.map((order) => (
                    <Box
                        key={order.id}
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            "&:last-child": { borderBottom: "none" },
                            transition: "bgcolor 0.2s",
                            "&:hover": { bgcolor: alpha(theme.palette.action.hover, 0.5) }
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 2 }}>
                                <Typography variant="body2" fontWeight={600} fontFamily="monospace">{order.id}</Typography>
                            </Grid>
                            <Grid size={{ xs: 3 }}>
                                <Typography variant="body2" fontWeight={500}>{order.customer}</Typography>
                                <Typography variant="caption" color="text.secondary">{order.items} Items</Typography>
                            </Grid>
                            <Grid size={{ xs: 2 }}>
                                <Typography variant="body2" color="text.secondary">{order.date}</Typography>
                            </Grid>
                            <Grid size={{ xs: 2 }}>
                                <Typography variant="body2" fontWeight={600}>€{order.total.toFixed(2)}</Typography>
                            </Grid>
                            <Grid size={{ xs: 2 }}>
                                <Chip
                                    label={order.status}
                                    size="small"
                                    color={getStatusColor(order.status) as any}
                                    variant="outlined"
                                    sx={{ fontWeight: 600, height: 24, borderRadius: 1 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 1 }} display="flex" justifyContent="flex-end">
                                <IconButton size="small">
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};
