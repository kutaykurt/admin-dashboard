import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    TextInput,
    NumberInput,
    FunctionField,
} from "react-admin";
import { Box, Chip, alpha, useTheme, Avatar, Typography, Stack } from "@mui/material";
import { PostBulkActions } from "./PostBulkActions";
import StatusChip from "../components/StatusChip";
import PersonIcon from "@mui/icons-material/Person";

const postFilters = [
    <TextInput
        label="Suche nach Titel"
        source="q"
        alwaysOn
        key="q"
        variant="outlined"
        size="small"
    />,
    <NumberInput
        label="User ID"
        source="userId"
        alwaysOn
        key="userId"
        variant="outlined"
        size="small"
    />,
];

export const PostList = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mt: 2, mb: 4 }}>
            <List
                filters={postFilters}
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
                    bulkActionButtons={<PostBulkActions />}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[1],
                        overflow: "hidden",
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
                    <TextField
                        source="title"
                        label="Titel"
                        sx={{
                            "& .MuiTypography-root": {
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                color: theme.palette.text.primary,
                            },
                        }}
                    />
                    <ReferenceField source="userId" reference="users" label="Autor">
                        <FunctionField
                            render={(record: any) => (
                                <Chip
                                    avatar={
                                        <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.2), color: theme.palette.info.main }}>
                                            {record?.name?.charAt(0)}
                                        </Avatar>
                                    }
                                    label={record?.name}
                                    size="small"
                                    sx={{
                                        fontWeight: 500,
                                        backgroundColor: alpha(theme.palette.info.main, 0.08),
                                        color: theme.palette.info.dark,
                                        borderColor: alpha(theme.palette.info.main, 0.2),
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        height: 28
                                    }}
                                />
                            )}
                        />
                    </ReferenceField>

                    <FunctionField
                        label="Inhalt"
                        source="body"
                        render={(record: any) => (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    maxWidth: 400,
                                    lineHeight: 1.5
                                }}
                            >
                                {record?.body}
                            </Typography>
                        )}
                    />

                    <FunctionField
                        label="Published"
                        render={(record) => <StatusChip value={record?.published} />}
                    />
                    <FunctionField
                        label="Active"
                        render={(record) => <StatusChip value={record?.active} />}
                    />
                </Datagrid>
            </List>
        </Box>
    );
};

export default PostList;
