import { useState, useEffect } from 'react';
import { Box, Card, Typography, Stack, alpha, useTheme, Chip, TextField, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { useListContext, useUpdate, useNotify, useCreate, useRefresh, useDelete, Link } from "react-admin";
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export const PostKanban = () => {
    const { data: listData, isLoading } = useListContext();
    const theme = useTheme();
    const [update] = useUpdate();
    const [create] = useCreate();
    const [deleteOne] = useDelete();
    const notify = useNotify();
    const refresh = useRefresh();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    // ... (keep creating/optimistic logic same) ...
    // Local state for optimistic updates
    const [localData, setLocalData] = useState<any[]>([]);

    useEffect(() => {
        if (listData) {
            const filtered = listData.filter((p: any) => [1, 2, 3].includes(p.userId));
            setLocalData(filtered);
        }
    }, [listData]);

    if (isLoading) return null;

    const columns = [
        { id: "1", title: "Aufgaben", color: theme.palette.text.secondary, items: localData.filter((p: any) => p.userId === 1) },
        { id: "2", title: "In Bearbeitung", color: theme.palette.info.main, items: localData.filter((p: any) => p.userId === 2) },
        { id: "3", title: "Erledigt", color: theme.palette.success.main, items: localData.filter((p: any) => p.userId === 3) },
    ];

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;
        create("posts", { data: { title: newTaskTitle, userId: 1, body: "Neue Aufgabe" } }, {
            onSuccess: (data: any) => {
                notify("Aufgabe erstellt");
                setNewTaskTitle("");
                setLocalData((prev: any[]) => [{ ...data, userId: 1 }, ...prev]);
                refresh();
            },
            onError: () => notify("Fehler beim Erstellen", { type: 'error' })
        });
    };

    const handleDelete = (id: number) => {
        setLocalData((prev: any[]) => prev.filter((item: any) => item.id !== id)); // Optimistic delete
        deleteOne("posts", { id, previousData: localData.find((item: any) => item.id === id) }, {
            onSuccess: () => notify("Aufgabe gelöscht", { type: 'info', undoable: true }),
            onError: () => {
                notify("Fehler beim Löschen", { type: 'error' });
                refresh();
            }
        });
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const postId = Number(draggableId);
        const newUserId = Number(destination.droppableId);

        const updatedLocal = localData.map((item: any) => item.id == postId ? { ...item, userId: newUserId } : item);
        setLocalData(updatedLocal);

        update("posts", { id: postId, data: { userId: newUserId }, previousData: listData?.find((p: any) => p.id == postId) }, {
            onError: () => { notify("Fehler beim Verschieben", { type: 'error' }); refresh(); }
        });
    };

    // ... (render return layout same until Card mapping) ...



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    pb: 2,
                    height: "calc(100vh - 140px)",
                    p: 2
                }}
            >
                {columns.map((col) => (
                    <Droppable key={col.id} droppableId={col.id}>
                        {(provided, snapshot) => (
                            <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{
                                    minWidth: 350,
                                    width: 350,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    backgroundColor: snapshot.isDraggingOver
                                        ? alpha(theme.palette.action.hover, 0.05)
                                        : "transparent",
                                    borderRadius: 3,
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                {/* Column Header */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 1,
                                        px: 1
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Typography variant="h6" fontWeight={700} color="text.primary">
                                            {col.title}
                                        </Typography>
                                        <Chip
                                            label={col.items.length}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                height: 24,
                                                minWidth: 24,
                                                backgroundColor: alpha(col.color, 0.1),
                                                color: col.color,
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {/* Add Task Input (Only in first column) */}
                                {col.id === "1" && (
                                    <TextField
                                        placeholder="+ Aufgabe hinzufügen"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleAddTask();
                                        }}
                                        sx={{
                                            mb: 1,
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor: theme.palette.background.paper,
                                                borderRadius: 2,
                                                "& fieldset": { borderColor: 'transparent' },
                                                "&:hover fieldset": { borderColor: 'transparent' },
                                                "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
                                                boxShadow: theme.shadows[1]
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton size="small" onClick={handleAddTask} disabled={!newTaskTitle}>
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}

                                {/* Cards Container */}
                                {/* Cards Container */}
                                <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2, px: 0.5, pb: 2 }}>
                                    {col.items.map((post: any, index: number) => (
                                        <Draggable key={String(post.id)} draggableId={String(post.id)} index={index}>
                                            {(provided: any, snapshot: any) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    elevation={snapshot.isDragging ? 8 : 0}
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: 3,
                                                        border: `1px solid ${snapshot.isDragging ? theme.palette.primary.main : theme.palette.divider}`,
                                                        cursor: "grab",
                                                        transition: "all 0.2s",
                                                        backgroundColor: theme.palette.background.paper,
                                                        boxShadow: snapshot.isDragging ? theme.shadows[8] : theme.shadows[1],
                                                        position: "relative",
                                                        "&:hover": {
                                                            borderColor: theme.palette.primary.main,
                                                            transform: "translateY(-2px)",
                                                            "& .card-actions": { opacity: 1 }
                                                        },
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        fontWeight={600}
                                                        gutterBottom
                                                        sx={{ lineHeight: 1.4, mb: 1, pr: 3 }} // pr for actions
                                                    >
                                                        {post.title}
                                                    </Typography>

                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Chip
                                                            label={`#${post.id}`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ height: 20, fontSize: '0.7rem', borderRadius: 1 }}
                                                        />
                                                    </Stack>

                                                    {/* Hover Actions */}
                                                    <Stack
                                                        className="card-actions"
                                                        direction="row"
                                                        spacing={0.5}
                                                        sx={{
                                                            position: "absolute",
                                                            top: 8,
                                                            right: 8,
                                                            opacity: 0,
                                                            transition: "opacity 0.2s",
                                                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                                                            borderRadius: 1
                                                        }}
                                                    >
                                                        <Tooltip title="Bearbeiten">
                                                            <IconButton
                                                                size="small"
                                                                component={Link}
                                                                to={`/posts/${post.id}`}
                                                                onClick={(e: any) => e.stopPropagation()}
                                                                sx={{ color: theme.palette.text.secondary, "&:hover": { color: theme.palette.primary.main } }}
                                                            >
                                                                <EditOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Löschen">
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e: any) => { e.stopPropagation(); handleDelete(post.id); }}
                                                                sx={{ color: theme.palette.text.secondary, "&:hover": { color: theme.palette.error.main } }}
                                                            >
                                                                <DeleteOutlineIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            </Box>
                        )}
                    </Droppable>
                ))}
            </Box>
        </DragDropContext>
    );
};
