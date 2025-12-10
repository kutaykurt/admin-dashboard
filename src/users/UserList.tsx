import {
  List,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
} from "react-admin";
import { Box, Avatar, Typography, Stack, alpha, useTheme, Chip } from "@mui/material";
import StatusChip from "../components/StatusChip";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const userFilters = [
  <TextInput
    label="Name"
    source="name"
    alwaysOn
    key="name"
    variant="outlined"
    size="small"
  />,
  <TextInput
    label="E-Mail"
    source="email"
    alwaysOn
    key="email"
    variant="outlined"
    size="small"
  />,
];

export const UserList = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <List
        filters={userFilters}
        perPage={20}
        sort={{ field: "id", order: "ASC" }}
        sx={{
          "& .RaList-main": { mt: 2 },
          "& .RaList-content": {
            boxShadow: "none",
            backgroundColor: "transparent",
            padding: 0,
          },
          "& .RaList-actions": {
            justifyContent: "flex-start",
            gap: 2,
            mb: 2,
          }
        }}
        component={Box}
      >
        <Datagrid
          rowClick="edit"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
            overflow: "hidden", // Ensure border radius clips content
            "& .RaDatagrid-row": {
              cursor: "pointer",
            }
          }}
        >
          <FunctionField
            source="id"
            label="ID"
            render={(record: any) => (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  color: theme.palette.text.secondary,
                  fontWeight: 500
                }}
              >
                #{record?.id}
              </Typography>
            )}
          />

          <FunctionField
            label="Benutzer"
            sx={{ minWidth: 200 }}
            render={(record: any) => (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {record?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {record?.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <PersonIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      @{record?.username}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            )}
          />

          <FunctionField
            label="E-Mail"
            render={(record: any) => (
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon
                  sx={{
                    fontSize: 16,
                    color: "text.secondary",
                  }}
                />
                <Typography
                  component="a"
                  href={`mailto:${record?.email}`}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  {record?.email}
                </Typography>
              </Stack>
            )}
          />

          <FunctionField
            label="Telefon"
            sx={{ display: { xs: "none", md: "table-cell" } }}
            render={(record: any) => (
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {record?.phone}
                </Typography>
              </Stack>
            )}
          />

          <FunctionField
            label="Status"
            render={(record) => <StatusChip value={record?.active} />}
          />
        </Datagrid>
      </List>
    </Box>
  );
};

export default UserList;
