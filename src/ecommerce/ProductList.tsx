import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Rating,
    useTheme,
    IconButton,
    Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const products = [
    { id: 1, name: "Premium Kopfhörer", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", rating: 4.5, stock: "In Stock" },
    { id: 2, name: "Smart Watch V2", price: 299.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", rating: 5, stock: "Low Stock" },
    { id: 3, name: "Mechanical Keyboard", price: 129.50, image: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=500&q=80", rating: 4, stock: "In Stock" },
    { id: 4, name: "4K Monitor Pro", price: 450.00, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", rating: 4.5, stock: "Out of Stock" },
    { id: 5, name: "Ergo Chair", price: 349.99, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80", rating: 3.5, stock: "In Stock" },
    { id: 6, name: "USB-C Hub", price: 49.99, image: "https://images.unsplash.com/photo-1625723044792-7cb6df35b46e?w=500&q=80", rating: 4, stock: "In Stock" },
];

export const ProductList = () => {
    const theme = useTheme();

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Produkte
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Verwalte deinen Katalog und Bestand.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>Produkt hinzufügen</Button>
            </Box>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                transition: "all 0.3s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: theme.shadows[4]
                                }
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Chip
                                    label={product.stock}
                                    size="small"
                                    color={product.stock === "Out of Stock" ? "error" : product.stock === "Low Stock" ? "warning" : "success"}
                                    sx={{ position: "absolute", top: 12, right: 12, fontWeight: 700 }}
                                />
                            </Box>

                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Typography variant="h6" fontWeight={700} noWrap>
                                        {product.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Rating value={product.rating} readOnly size="small" />
                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                        (24 reviews)
                                    </Typography>
                                </Box>
                                <Typography variant="h5" color="primary" fontWeight={700}>
                                    €{product.price.toFixed(2)}
                                </Typography>
                            </CardContent>

                            <Divider />

                            <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                                <Button size="small" startIcon={<ShoppingBagIcon />}>
                                    Details
                                </Button>
                                <Box>
                                    <IconButton size="small" color="primary">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
