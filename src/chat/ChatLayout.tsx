import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    TextField,
    IconButton,
    InputAdornment,
    useTheme,
    alpha,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// Mock Contacts
const contacts = [
    { id: 1, name: "Sarah Wilson", role: "Support Lead", avatar: "S", status: "online", lastMsg: "Meeting um 14 Uhr?" },
    { id: 2, name: "Mike Johnson", role: "Developer", avatar: "M", status: "offline", lastMsg: "Der Bug ist gefixt." },
    { id: 3, name: "Emma Davis", role: "Designer", avatar: "E", status: "online", lastMsg: "Hier sind die neuen Icons." },
    { id: 4, name: "James Bond", role: "Agent", avatar: "J", status: "busy", lastMsg: "Mission accomplished." },
];

// Mock Chat History
const chatHistory = [
    { id: 1, sender: "me", text: "Hey Sarah, wie läuft das Update?", time: "10:30" },
    { id: 2, sender: "other", text: "Hi! Wir sind fast fertig. Nur noch letzte Tests.", time: "10:32" },
    { id: 3, sender: "me", text: "Super, sag Bescheid wenn ich helfen kann.", time: "10:33" },
    { id: 4, sender: "other", text: "Danke! Ich denke wir schaffen es bis Mittag.", time: "10:35" },
];

export const ChatLayout = () => {
    const theme = useTheme();
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        // Logical placeholder for sending message
        setMessage("");
    };

    return (
        <Box sx={{ p: 3, height: "85vh", display: "flex", gap: 3 }}>
            {/* Contact List Sidebar */}
            <Paper
                elevation={0}
                sx={{
                    width: 320,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >
                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Suche..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <List sx={{ flex: 1, overflowY: "auto" }}>
                    {contacts.map((contact) => (
                        <React.Fragment key={contact.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={selectedContact.id === contact.id}
                                    onClick={() => setSelectedContact(contact)}
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: theme.palette.action.selected,
                                            borderLeft: `4px solid ${theme.palette.primary.main}`
                                        }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}>
                                            {contact.avatar}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={contact.name}
                                        secondary={contact.lastMsg}
                                        primaryTypographyProps={{ fontWeight: 600, variant: "body2" }}
                                        secondaryTypographyProps={{ noWrap: true, variant: "caption" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Chat Area */}
            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >
                {/* Chat Header */}
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.default }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{selectedContact.avatar}</Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700}>{selectedContact.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{selectedContact.role}</Typography>
                        </Box>
                    </Box>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                {/* Messages */}
                <Box sx={{ flex: 1, p: 3, overflowY: "auto", bgcolor: theme.palette.background.default, display: "flex", flexDirection: "column", gap: 2 }}>
                    {chatHistory.map((msg) => (
                        <Box
                            key={msg.id}
                            sx={{
                                alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                                maxWidth: "70%",
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: msg.sender === "me" ? theme.palette.primary.main : theme.palette.background.paper,
                                    color: msg.sender === "me" ? "#fff" : theme.palette.text.primary,
                                    borderRadius: 2,
                                    borderTopRightRadius: msg.sender === "me" ? 0 : 2,
                                    borderTopLeftRadius: msg.sender === "other" ? 0 : 2,
                                    boxShadow: theme.shadows[1]
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: msg.sender === "me" ? "#ffffff" : "inherit"
                                    }}
                                >
                                    {msg.text}
                                </Typography>
                            </Paper>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block", textAlign: msg.sender === "me" ? "right" : "left" }}>
                                {msg.time}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
                    <TextField
                        fullWidth
                        placeholder="Nachricht schreiben..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small"><AttachFileIcon /></IconButton>
                                    <IconButton color="primary" onClick={handleSend}><SendIcon /></IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};
