import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionList from './TransactionList';
import ModalContent from './ModalContent'
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';

function App() {
  const [userName, setUserName] = useState('Jane Doe')
  const [currentDate, setCurrentDate] = useState('10/05/2022')
  const [currentBalance, setCurrentBalance] = useState(1323024.34)
  const [open, setOpen] = useState(false)
  const [transferModal, setTransferModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [transactionsChange, setTransactionsChange] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchParams, setSearchParams] = useState()

  useEffect(() => {
    setTransactionsChange(transactions)
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function openTransfer() {
    setWithdrawModal(false)
    setTransferModal(true)
    handleOpen()
  }

  function openWithdraw() {
    setTransferModal(false)
    setWithdrawModal(true)
    handleOpen()
  }

  const transactions = [
    {
      charge: 'Netflix',
      date: '09/06/2022',
      type: 'debit',
      amount: 12.99
    },
    {
      charge: 'Paycheck',
      date: '09/05/2022',
      type: 'credit',
      amount: 1650.00
    },
    {
      charge: 'Rent',
      date: '09/04/2022',
      type: 'debit',
      amount: 1100.00
    },
    {
      charge: 'Spotify',
      date: '09/03/2022',
      type: 'debit',
      amount: 10.99
    }
  ]

  function handleSearch() {
    let results = []
    transactionsChange.map(transaction => {
      if(transaction.charge === searchParams) {
        results.push(transaction)
      }
    })

    setSearchResults(results)
  }
  
  return (
    <Paper
      elevation={0} 
      sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', position: 'absolute', width: 500, left: '50%', transform: 'translate(-50%)'}}
    >
      <Paper sx={{color: 'white', backgroundColor: 'black', margin: '10px'}}>TRANSACTION HISTORY</Paper>
      <Paper sx={{color: 'white', backgroundColor: 'black', margin: '10px'}}>SAVINGS ACCOUNT -- {userName.toUpperCase()} {currentDate}</Paper>
      <Paper
        sx={{display: 'flex', color: 'white', backgroundColor: 'black', margin: '10px', paddingTop: '20px'}}
      >
        <Button
          variant='contained'
          sx={{borderRadius: '30px', margin: '5px', padding: '5px', fontSize: '12px', fontWeight: 'bold', width: '125px', height: '50px', backgroundColor: 'aero'}}
          onClick={() => openTransfer()}
        >
          Transfer
        </Button>
        <Button
          variant='contained'
          sx={{borderRadius: '30px', margin: '5px', padding: '5px', fontSize: '12px', fontWeight: 'bold', width: '125px', height: '50px', backgroundColor: 'aero'}}
          onClick={() => openWithdraw()}
        >
          Withdraw
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <ModalContent 
            transferModal={transferModal}
            withdrawModal={withdrawModal}
            handleClose={handleClose}
            currentBalance={currentBalance}
            setCurrentBalance={setCurrentBalance}
            transactionsChange={transactionsChange}
            setTransactionsChange={setTransactionsChange}
          />
        </Modal>
        <Paper sx={{color: 'white', backgroundColor: 'black', marginLeft: '10px'}}>
          <div>BALANCE</div>
          <Paper sx={{fontWeight: 'bold', fontSize: '20px', color: 'white', backgroundColor: 'black', marginTop: '15px',}}>
            {
              currentBalance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })
            }
          </Paper>
        </Paper>
      </Paper>
      <Paper
        component='form'
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 400, margin: '20px', border: '1px solid white'}}
      >
        <InputBase 
          placeholder='Search transactions'
          sx={{marginLeft: '10px'}}
          onChange={(e) => setSearchParams(e.target.value)}
        />
        <Paper
          sx={{backgroundColor: '#1976d2'}}
        >
          <IconButton  sx={{color: 'white'}} onClick={() => handleSearch()}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Paper>
      {searchResults.length > 0 &&
        <Paper sx={{color: 'white', backgroundColor: 'black'}}>
          <Paper sx={{color: 'white', backgroundColor: 'black'}}>Search Results</Paper>
          <TransactionList 
            transactions={searchResults}
          />
          <Paper sx={{color: 'white', backgroundColor: 'black', height: '30px'}}/>
        </Paper>
      }
      <TransactionList 
        transactions={transactionsChange}
      />
    </Paper>
  );
}

export default App;
