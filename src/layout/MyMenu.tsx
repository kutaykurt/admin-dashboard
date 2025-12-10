import { Box, Typography, Divider, useTheme, alpha } from "@mui/material";
import { MenuItemLink, useSidebarState } from "react-admin";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";

// Custom Menu Item Component to enforce styling
const CustomMenuItem = ({ to, primaryText, leftIcon }: any) => {
  const theme = useTheme();
  return (
    <MenuItemLink
      to={to}
      primaryText={primaryText}
      leftIcon={leftIcon}
      sx={{
        borderRadius: "12px",
        mx: 1,
        mb: 0.5,
        color: "#94a3b8", // Light Slate Text
        transition: "all 0.2s",
        "&.RaMenuItemLink-active": {
          bgcolor: theme.palette.primary.main, // Solid Blue
          color: "#ffffff", // White Text
          fontWeight: 600,
          boxShadow: "0px 4px 12px rgba(61, 115, 224, 0.3)", // Glow
          "& .MuiSvgIcon-root": {
            color: "#ffffff",
          },
        },
        "&:hover": {
          bgcolor: "rgba(255,255,255, 0.05)", // Subtle white overlay
          color: "#f1f5f9",
          "& .MuiSvgIcon-root": {
            color: "#f1f5f9",
          }
        },
        "& .MuiSvgIcon-root": {
          fontSize: 22,
          minWidth: 32,
          color: "#64748b", // Dimmed Icon
          transition: "color 0.2s",
        }
      }}
    />
  );
};

const MenuHeader = ({ title }: { title: string }) => {
  const [open] = useSidebarState();
  if (!open) return <Divider sx={{ my: 1, mx: 2 }} />;

  return (
    <Typography
      variant="caption"
      fontWeight={700}
      color="#475569" // Slate 600 for header styling on dark bg
      sx={{
        px: 3,
        mt: 3,
        mb: 1,
        display: "block",
        textTransform: "uppercase",
        letterSpacing: 1.2
      }}
    >
      {title}
    </Typography>
  );
};

const MyMenu = () => {
  return (
    <Box sx={{ flex: 1, pb: 2 }}>

      <MenuHeader title="Dashboard" />
      <CustomMenuItem
        to="/"
        primaryText="Dashboard"
        leftIcon={<HomeIcon />}
      />

      <MenuHeader title="Apps" />
      <CustomMenuItem
        to="/chat"
        primaryText="Nachrichten"
        leftIcon={<ChatBubbleOutlineIcon />}
      />
      <CustomMenuItem
        to="/events"
        primaryText="Termine"
        leftIcon={<EventIcon />}
      />

      <MenuHeader title="E-Commerce" />
      <CustomMenuItem
        to="/products"
        primaryText="Waren"
        leftIcon={<ShoppingBagIcon />}
      />
      <CustomMenuItem
        to="/orders"
        primaryText="Bestellungen"
        leftIcon={<LocalShippingIcon />}
      />
      <CustomMenuItem
        to="/invoices"
        primaryText="Finanzen"
        leftIcon={<ReceiptIcon />}
      />

      <MenuHeader title="Verwaltung" />
      <CustomMenuItem
        to="/users"
        primaryText="Benutzer"
        leftIcon={<PeopleIcon />}
      />
      <CustomMenuItem
        to="/posts"
        primaryText="Beiträge"
        leftIcon={<ArticleIcon />}
      />

      <MenuHeader title="System" />
      <CustomMenuItem
        to="/settings"
        primaryText="Einstellungen"
        leftIcon={<SettingsIcon />}
      />
      <CustomMenuItem
        to="/help"
        primaryText="Hilfe & Support"
        leftIcon={<HelpOutlineIcon />}
      />

      <Box sx={{ height: 40 }} />
    </Box>
  );
};

export default MyMenu;
