import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import api from "../../app/api/api";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: string, name: string) {
        setStatus({ loading: true, name });
        api.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItem(productId: string, quantity = 1, name: string) {
        setStatus({ loading: true, name });
        api.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (!basket) {
        return (
            <Typography variant='h3'>Your basket is empty</Typography>
        );
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.product.pictureUrl} alt={item.product.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${currencyFormat(item.product.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'remove' + item.product.id}
                                        onClick={() => handleRemoveItem(item.product.id, 1, 'remove' + item.product.id)} color='error'>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' + item.product.id}
                                        onClick={() => handleAddItem(item.product.id, 'add' + item.product.id)} color='secondary'>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${((item.product.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'delete' + item.product.id}
                                        onClick={() => handleRemoveItem(item.product.id, item.quantity, 'delete' + item.product.id)} color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid xs={6}>
                    <BasketSummary></BasketSummary>
                </Grid>
            </Grid>
        </>
    )
}