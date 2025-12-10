import {
    Box,
    Paper,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Divider,
    Grid,
    useTheme,
    Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShieldIcon from "@mui/icons-material/Shield";
import PaletteIcon from "@mui/icons-material/Palette";

export const Settings = () => {
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", pt: 4, pb: 8 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Einstellungen
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Konfiguriere deine Dashboard-Präferenzen und Systemoptionen.
                </Typography>
            </Box>

            {/* General Settings */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 4,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <PaletteIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                        Erscheinungsbild
                    </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="System Name"
                            defaultValue="Admin Dashboard Enterprise"
                            variant="outlined"
                            helperText="Der Name, der im Browser-Tab angezeigt wird."
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            label="Dark Mode (Auto-Detect)"
                        />
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                            Passt das Design automatisch an deine Systemeinstellungen an.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Notifications */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 4,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <NotificationsIcon color="warning" />
                    <Typography variant="h6" fontWeight={600}>
                        Benachrichtigungen
                    </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="E-Mail Benachrichtigungen bei neuen Usern"
                    />
                    <FormControlLabel
                        control={<Switch />}
                        label="Wöchentlicher Report senden"
                    />
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Sicherheitswarnungen aktiv"
                    />
                </Box>
            </Paper>

            {/* Security */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 4,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <ShieldIcon color="error" />
                    <Typography variant="h6" fontWeight={600}>
                        Sicherheit
                    </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Alert severity="info" sx={{ mb: 3 }}>
                    Zwei-Faktor-Authentifizierung (2FA) ist für Administratoren empfohlen.
                </Alert>

                <Button variant="outlined" color="primary">
                    Passwort ändern
                </Button>
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="text" size="large">Abbrechen</Button>
                <Button variant="contained" size="large" startIcon={<SaveIcon />}>
                    Änderungen speichern
                </Button>
            </Box>
        </Box>
    );
};
