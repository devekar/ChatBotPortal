import React, {useEffect} from 'react';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from "@material-ui/core/Button";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => {
    const isDark = theme.palette.mode === 'dark';

    return {
      root: {
        '& .MuiDataGrid-cell--editing': {
          backgroundColor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
        },
        '& .Mui-error': {
          backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
          color: theme.palette.error.main,
        },
      },
    };
  },
  { defaultTheme },
);

const columns = [
  { field: 'name', headerName: 'Name', width: 160, editable: false },
  { field: 'trigger', headerName: 'Trigger word', width: 160, editable: true },
  { field: 'ContentKeys', headerName: 'Content template', width: 200, editable: true },
];

export default function ConditionalValidationGrid() {
  const classes = useStyles();
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rows, setRows] = React.useState([]);

  const handleEditRowsModelChange = React.useCallback((newModel) => {
    const updatedModel = { ...newModel };
    Object.keys(updatedModel).forEach((id) => {
      const hasError =
        updatedModel[id].isPaid.value && !updatedModel[id].paidAt.value;
      updatedModel[id].paidAt = { ...updatedModel[id].paidAt, error: hasError };
    });
    setEditRowsModel(updatedModel);
  }, []);

  useEffect(() => {
    axios.get(`/api/rules`)
        .then(res => {
            const templates = res.data;
            templates.map((t, index) => {
              t.id = index;
            });
            setRows(templates);
        });
  }, []);

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Button sx={{ mb: 20 }}  variant="contained">Add rule</Button>
      </Stack>
      <div style={{ height: 400 }}>
        <DataGrid
          className={classes.root}
          rows={rows}
          columns={columns}
          editMode="row"
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
        />
      </div>
    </>
  );
}
