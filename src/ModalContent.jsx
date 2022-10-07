import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';


function ModalContent(props) {
    const transferModal = props.transferModal
    const withdrawModal = props.withdrawModal
    const handleClose = props.handleClose
    const currentBalance = props.currentBalance
    const setCurrentBalance = props.setCurrentBalance
    const transactionsChange = props.transactionsChange
    const setTransactionsChange = props.setTransactionsChange

    const [amount, setAmount] = useState()

    function handleBalanceChange(amount) {
        let newBalance = null
        let newTransactions = null
        const date = new Date()
        if(transferModal && amount) {
            newBalance = Number(currentBalance) + Number(amount)
            newTransactions = {
                charge: 'Transfer',
                date: date.toLocaleDateString('en-US'),
                type: 'credit',
                amount: amount
            }
        } else if(withdrawModal && amount) {
            newBalance = Number(currentBalance) - Number(amount)
            newTransactions = {
                charge: 'Withdrawal',
                date: date.toLocaleDateString('en-US'),
                type: 'debit',
                amount: amount
            }
        } else {
            newBalance = currentBalance
            newTransactions = transactionsChange
        }
        setCurrentBalance(newBalance)
        setTransactionsChange([newTransactions, ...transactionsChange])
        setAmount(null)
        handleClose()
    }
    
    return(
        <Box
            sx={{position: 'absolute', borderRadius: '5px', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, border: '1px solid #000', boxShadow: 24, bgcolor: 'background.paper'}}
        >
            {transferModal &&
                <Paper sx={{margin: '10px'}} elevation={0}>
                    How much would you like to Transfer to your account?
                </Paper>
            }
            {withdrawModal &&
                <Paper sx={{margin: '10px'}} elevation={0}>
                    How much would you like to Withdraw from your account?
                </Paper>
            }
            <Paper
                elevation={0}
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
                <OutlinedInput 
                    placeholder='Amount'
                    type='number'
                    sx={{margin: '10px'}}
                    startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Paper elevation={0}>
                    <Button
                        variant='contained'
                        sx={{borderRadius: '30px', margin: '5px', padding: '5px', fontSize: '12px', fontWeight: 'bold', width: '125px', height: '50px', backgroundColor: 'aero'}}
                        onClick={() => handleBalanceChange(amount)}
                    >
                        {transferModal ? 'Transfer' : 'Withdraw'}
                    </Button>
                    <Button
                        variant='contained'
                        sx={{borderRadius: '30px', margin: '5px', padding: '5px', fontSize: '12px', fontWeight: 'bold', width: '125px', height: '50px', backgroundColor: 'aero'}}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Paper>
            </Paper>
        </Box>
    )
}

export default ModalContent;