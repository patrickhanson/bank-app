import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';

function TransactionList(props) {
    const transactions = props.transactions

    function setAmountStyle(type) {
        if (type === 'credit') {
            return('green')
        } else if (type === 'debit') {
            return('red')
        } else {
            return('black')
        }
    }
    
    return(
        <Paper sx={{backgroundColor: 'black'}}>
            {transactions.map((transaction) => {
                return(
                    <Card
                        sx={{display: 'flex', justifyContent: 'space-between', margin: '10px', padding: '10px', width: 400}}
                        key={transactions[transaction]}
                    >
                        <CardContent>{transaction.charge}</CardContent>
                        <CardContent>{transaction.date}</CardContent>
                        <CardContent sx={{color: setAmountStyle(transaction.type), fontWeight: 'bold'}}>
                            {
                                transaction.amount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })
                            }
                        </CardContent>
                    </Card>
                )
            })}
        </Paper>
    )
}

export default TransactionList;