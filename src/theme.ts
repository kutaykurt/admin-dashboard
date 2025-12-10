import { defaultTheme } from "react-admin";
import { createTheme, alpha } from "@mui/material/styles";

// --- Color Palette System ---
// Modern, clean, and professional colors
const primaryColor = "#3d73e0"; // Soft distinct blue
const secondaryColor = "#64748b"; // Scaled slate gray
const successColor = "#10b981"; // Vibrant modern green
const warningColor = "#f59e0b"; // Warm amber
const errorColor = "#ef4444"; // Soft red
const backgroundDefault = "#f8fafc"; // Very light slate blue-ish gray
const paperColor = "#ffffff";
const primaryHeader = "#ffffff"; // Clean white header

const palette = {
  mode: "light",
  primary: {
    main: primaryColor,
    light: alpha(primaryColor, 0.5),
    dark: "#2563eb",
    contrastText: "#ffffff",
  },
  secondary: {
    main: secondaryColor,
    light: "#94a3b8",
    dark: "#475569",
    contrastText: "#ffffff",
  },
  success: {
    main: successColor,
    light: "#34d399",
    dark: "#059669",
    contrastText: "#ffffff",
  },
  warning: {
    main: warningColor,
    light: "#fbbf24",
    dark: "#d97706",
    contrastText: "#ffffff",
  },
  error: {
    main: errorColor,
    light: "#f87171",
    dark: "#b91c1c",
    contrastText: "#ffffff",
  },
  background: {
    default: backgroundDefault,
    paper: paperColor,
  },
  text: {
    primary: "#1e293b", // Slate 800
    secondary: "#64748b", // Slate 500
    disabled: "#cbd5e1",
  },
  divider: "#e2e8f0",
};

// --- Typography System ---
const theme = createTheme({
  ...defaultTheme,
  palette: palette as any,
  typography: {
    fontFamily: [
      "Inter",
      "Onest", // Fallback if user installs it, excellent modern font
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      color: palette.text.primary,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "1.5rem", // 24px
      fontWeight: 600,
      color: palette.text.primary,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.25rem", // 20px
      fontWeight: 600,
      color: palette.text.primary,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontSize: "1.125rem", // 18px
      fontWeight: 600,
      color: palette.text.primary,
    },
    h5: {
      fontSize: "1rem", // 16px
      fontWeight: 600,
      color: palette.text.primary,
    },
    h6: {
      fontSize: "0.875rem", // 14px
      fontWeight: 600,
      color: palette.text.secondary,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    body1: {
      fontSize: "0.875rem", // 14px - Standard for dashboards
      lineHeight: 1.5,
      color: palette.text.primary,
    },
    body2: {
      fontSize: "0.813rem", // 13px
      lineHeight: 1.5,
      color: palette.text.secondary,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.05)", // 1: Subtle
    "0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)", // 2: Card default
    "0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.025)", // 3: Hover
    ...Array(22).fill("none"),
  ] as any,

  // --- Component Overrides ---
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: backgroundDefault,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbd5e1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#94a3b8",
          },
        },
      },
    },
    // App Bar (Search & User Menu) - Theming handled in Layout, but defaults here
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          color: "#ffffff",
          boxShadow: "none",
          borderBottom: "1px solid #334155",
        },
      },
    },
    // Sidebar
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: paperColor,
          color: palette.text.primary,
          borderRight: `1px solid ${palette.divider}`,
        },
      },
    },
    // Cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.04)",
          border: `1px solid ${palette.divider}`,
          overflow: "visible", // Often needed for badges/dropdowns
        },
      },
    },
    // Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          },
        },
        containedPrimary: {
          backgroundColor: primaryColor,
          "&:hover": {
            backgroundColor: "#2563eb",
          },
        },
      },
    },
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: palette.divider,
            transition: "border-color 0.2s",
          },
          "&:hover fieldset": {
            borderColor: "#cbd5e1",
          },
          "&.Mui-focused fieldset": {
            borderColor: primaryColor,
            borderWidth: "1px",
            boxShadow: `0 0 0 3px ${alpha(primaryColor, 0.1)}`,
          },
        },
        input: {
          padding: "10px 14px",
        },
      },
    },
    // DataGrid / Tables (RaDatagrid)
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b", // Dark Slate Header
          "& .MuiTableCell-root": {
            color: "#e2e8f0", // Light Slate Text
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: "none",
            padding: "16px 16px",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            transition: "background-color 0.1s",
            "&:hover": {
              backgroundColor: "#f8fafc", // Very subtle hover
            },
            "&:last-child .MuiTableCell-root": {
              borderBottom: "none",
            },
          },
          "& .MuiTableCell-root": {
            padding: "14px 16px",
            borderBottom: `1px solid ${palette.divider}`,
            color: palette.text.primary,
          },
        },
      },
    },
    // Chips (Status indicators)
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
        sizeSmall: {
          height: 24,
          fontSize: "0.75rem",
        },
      },
    },
  },
});

export default theme;
