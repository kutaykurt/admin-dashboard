import {
    Box,
    Paper,
    Typography,
    Chip,
    useTheme,
    alpha,
    IconButton,
    Button,
    Grid,
} from "@mui/material";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    FunctionField,
    NumberField,
    useRecordContext,
} from "react-admin";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

// Mock Data Provider usually handles this, but since we are simulating a new resource:
// We will export a simple List component that relies on the App's dataProvider.
// NOTE: Since jsonplaceholder doesn't have "invoices", we might need to fake the dataProvider response 
// OR just render a custom Table without react-admin's <List> if we can't easily mock the provider.
// However, for the "Starter Kit" feel, let's use a Custom Layout with mock data instead of <List> to ensure it works immediately without backend changes.

const mockInvoices = [
    { id: "INV-2024-001", date: new Date("2024-10-01"), client: "Acme Corp", amount: 1250.00, status: "paid" },
    { id: "INV-2024-002", date: new Date("2024-10-05"), client: "Global Tech", amount: 3400.50, status: "pending" },
    { id: "INV-2024-003", date: new Date("2024-10-12"), client: "Stark Ind", amount: 850.00, status: "paid" },
    { id: "INV-2024-004", date: new Date("2024-10-15"), client: "Wayne Ent", amount: 15000.00, status: "late" },
    { id: "INV-2024-005", date: new Date("2024-10-20"), client: "Cyberdyne", amount: 220.00, status: "pending" },
];

const StatusChip = ({ status }: { status: string }) => {
    const theme = useTheme();
    let color = theme.palette.text.secondary;
    let bgcolor = theme.palette.action.selected;

    if (status === "paid") {
        color = theme.palette.success.main;
        bgcolor = alpha(theme.palette.success.main, 0.1);
    } else if (status === "pending") {
        color = theme.palette.warning.main;
        bgcolor = alpha(theme.palette.warning.main, 0.1);
    } else if (status === "late") {
        color = theme.palette.error.main;
        bgcolor = alpha(theme.palette.error.main, 0.1);
    }

    return (
        <Chip
            label={status.toUpperCase()}
            size="small"
            sx={{
                bgcolor,
                color,
                fontWeight: 700,
                fontSize: "0.7rem",
                borderRadius: 1,
                height: 24,
            }}
        />
    );
};

export const InvoiceList = () => {
    const theme = useTheme();

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Finanzen
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Überblick über alle Rechnungen und Zahlungen.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>Neue Rechnung</Button>
            </Box>

            <Paper sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }} elevation={0}>
                {/* Header for custom table */}
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.04), borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">INVOICE ID</Typography></Grid>
                        <Grid size={{ xs: 3 }}><Typography variant="caption" fontWeight={700} color="text.secondary">CLIENT</Typography></Grid>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">DATE</Typography></Grid>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">AMOUNT</Typography></Grid>
                        <Grid size={{ xs: 2 }}><Typography variant="caption" fontWeight={700} color="text.secondary">STATUS</Typography></Grid>
                        <Grid size={{ xs: 1 }}></Grid>
                    </Grid>
                </Box>

                {/* Rows */}
                {mockInvoices.map((inv) => (
                    <Box
                        key={inv.id}
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            "&:last-child": { borderBottom: "none" },
                            transition: "background-color 0.2s",
                            "&:hover": { bgcolor: alpha(theme.palette.action.hover, 0.5) }
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 2 }}>
                                <Typography variant="body2" fontWeight={600} fontFamily="monospace">{inv.id}</Typography>
                            </Grid>
                            <Grid size={{ xs: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ReceiptIcon sx={{ color: theme.palette.text.secondary, fontSize: 16 }} />
                                    <Typography variant="body2">{inv.client}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {inv.date.toLocaleDateString("de-DE")}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 2 }}>
                                <Typography variant="body2" fontWeight={600}>
                                    € {inv.amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 2 }}>
                                <StatusChip status={inv.status} />
                            </Grid>
                            <Grid size={{ xs: 1 }} display="flex" justifyContent="flex-end">
                                <IconButton size="small">
                                    <DownloadIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Paper>
        </Box>
    )
}
