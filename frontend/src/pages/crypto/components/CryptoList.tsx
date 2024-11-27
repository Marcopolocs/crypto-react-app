import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ICryptoListData } from '../constants/crypto-data-schema';
import Box from '@mui/material/Box';
import { mapCoinDataBasedOnLengthOfValue } from '../mappers/coin-data-to-locale-string-mapper';

interface CryptoListTableProps {
  cryptoList: ICryptoListData[];
}

interface Column {
  id: string;
  label: string;
  width?: number | string;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: 'rank', label: '#', width: '3%', align: 'left' },
  { id: 'name', label: 'Name', width: '10%' },
  { id: 'price', label: 'Price', width: '8%', align: 'left' },
  { id: 'hourlyPriceChange', label: '1h %', width: '5%', align: 'left' },
  { id: 'dailyPriceChange', label: '24h %', width: '5%', align: 'left' },
  { id: 'weeklyPriceChange', label: '7d %', width: '6%', align: 'left' },
  { id: 'marketCap', label: 'Market Cap', width: '10%', align: 'left' },
  { id: 'circSupply', label: 'Circulating Supply', width: '12%', align: 'left' },
];

const CryptoList: React.FC<CryptoListTableProps> = ({ cryptoList }) => {
  return (
    <>
      {cryptoList && (
        <Box>
          <TableContainer className="rounded-radius-10 bg-yellow-deeperBitcoin mt-12 shadow-custom">
            <Table sx={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow key="row">
                  {columns.map((column) => (
                    <TableCell key={column.id} className="text-white font-bold text-md" sx={{ width: column.width, align: column.align }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptoList.map((crypto, index) => {
                  const cryptoKey = crypto.name;
                  return (
                    <TableRow key={cryptoKey} className={`${index % 2 ? 'bg-blue-darkerBlue' : 'bg-blue-darkestBlue'} text-white`}>
                      <TableCell className="text-white">{index + 1}</TableCell>
                      <TableCell className="text-white font-bold">
                        {crypto.name} <span className="text-yellow-bitcoin">({crypto.symbol})</span>
                      </TableCell>
                      <TableCell className="text-white font-bold">${mapCoinDataBasedOnLengthOfValue(crypto.price)}</TableCell>
                      <TableCell
                        className={`font-bold ${crypto.percent_change_1h >= 0 ? 'text-green-darkestGreen' : 'text-red-darkestRed'}`}
                      >
                        {crypto.percent_change_1h > 0 ? '+' : ''}
                        {crypto.percent_change_1h}%
                      </TableCell>
                      <TableCell
                        className={`font-bold ${crypto.percent_change_24h >= 0 ? 'text-green-darkestGreen' : 'text-red-darkestRed'}`}
                      >
                        {crypto.percent_change_24h > 0 ? '+' : ''}
                        {crypto.percent_change_24h}%
                      </TableCell>
                      <TableCell
                        className={`font-bold ${crypto.percent_change_7d >= 0 ? 'text-green-darkestGreen' : 'text-red-darkestRed'}`}
                      >
                        {crypto.percent_change_7d > 0 ? '+' : ''}
                        {crypto.percent_change_7d}%
                      </TableCell>
                      <TableCell className="text-white font-bold">{mapCoinDataBasedOnLengthOfValue(crypto.market_cap)}</TableCell>
                      <TableCell className="text-white font-bold">{mapCoinDataBasedOnLengthOfValue(crypto.circulating_supply)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default CryptoList;
