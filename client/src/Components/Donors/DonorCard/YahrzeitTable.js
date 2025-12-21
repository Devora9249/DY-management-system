import { TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function YahrzeitTable({ yahrzeits }) {
  return (

    <>

      {yahrzeits.length ? (
        <TableContainer >

          <Table >
            <TableHead>
              <TableRow >
                <TableCell>שם הנפטר</TableCell>
                <TableCell>תאריך יארצייט</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {yahrzeits.map((y, index) => (
                <TableRow key={index} >
                  <TableCell >
                    {y.name}
                  </TableCell>
                  <TableCell >
                    {new Date(y.date).toLocaleDateString("he-IL")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography >
          אין יארצייטים להצגה
        </Typography>
      )}
    </>

  );
}
