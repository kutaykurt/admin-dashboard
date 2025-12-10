import {
    Box,
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Grid,
    useTheme,
    alpha,
    TextField,
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BugReportIcon from "@mui/icons-material/BugReport";

const faqs = [
    {
        q: "Wie füge ich einen neuen Administrator hinzu?",
        a: "Gehen Sie zu 'Einstellungen' > 'Benutzer' und klicken Sie auf 'Neuen Benutzer einladen'. Sie können dann die Rolle 'Admin' auswählen.",
    },
    {
        q: "Kann ich das Farbschema ändern?",
        a: "Ja, in den Einstellungen unter 'Erscheinungsbild' können Sie zwischen Hell- und Dunkelmodus wechseln oder die Primärfarbe anpassen (Enterprise-Feature).",
    },
    {
        q: "Wie exportiere ich Rechnungen?",
        a: "Im Bereich 'Finanzen' finden Sie neben jeder Rechnung ein Download-Symbol. Klicken Sie darauf, um die PDF herunterzuladen.",
    },
    {
        q: "Was passiert, wenn ich einen Beitrag lösche?",
        a: "Gelöschte Beiträge werden zunächst ins Archiv verschoben. Sie können sie dort innerhalb von 30 Tagen wiederherstellen.",
    },
];

export const HelpPage = () => {
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", pt: 4, pb: 8 }}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h3" fontWeight={800} gutterBottom sx={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.info.main})`, backgroundClip: "text", textFillColor: "transparent", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Wie können wir helfen?
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                    Durchsuchen Sie unsere Dokumentation oder kontaktieren Sie den Support.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 6 }}>
                {[
                    { icon: <MenuBookIcon fontSize="large" />, title: "Dokumentation", text: "Detaillierte Anleitungen für alle Features." },
                    { icon: <SupportAgentIcon fontSize="large" />, title: "Live Chat", text: "Sprechen Sie direkt mit unserem Team." },
                    { icon: <BugReportIcon fontSize="large" />, title: "Fehler melden", text: "Haben Sie einen Bug gefunden?" }
                ].map((item, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                height: '100%',
                                textAlign: 'center',
                                borderRadius: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                "&:hover": {
                                    transform: 'translateY(-5px)',
                                    boxShadow: theme.shadows[4],
                                    borderColor: theme.palette.primary.main
                                }
                            }}
                        >
                            <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>{item.icon}</Box>
                            <Typography variant="h6" fontWeight={700} gutterBottom>{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" fontWeight={700} sx={{ mb: 3, px: 1 }}>
                Häufig gestellte Fragen (FAQ)
            </Typography>

            <Stack spacing={2}>
                {faqs.map((faq, i) => (
                    <Accordion
                        key={i}
                        elevation={0}
                        sx={{
                            "&:before": { display: "none" },
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: "12px !important",
                            overflow: "hidden",
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600} color="text.primary">
                                {faq.q}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                            <Typography color="text.secondary">{faq.a}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>

            {/* Quick Contact */}
            <Paper elevation={0} sx={{ mt: 8, p: 4, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.04), border: `1px dashed ${theme.palette.primary.main}` }}>
                <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
                    <Box>
                        <Typography variant="h6" fontWeight={700}>Noch Fragen?</Typography>
                        <Typography variant="body2" color="text.secondary">Unser Team antwortet normalerweise innerhalb von 2 Stunden.</Typography>
                    </Box>
                    <Button variant="contained" size="large">Kontakt aufnehmen</Button>
                </Stack>
            </Paper>
        </Box>
    );
};
