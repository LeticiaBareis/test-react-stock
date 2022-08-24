import * as React from 'react';
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalEdit from './ModalEdit';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px #000',
  boxShadow: 24,
  borderRadius: 5,
  pt: 4,
  px: 4,
  pb: 3,
};

export default function PoliticaStatus(){
  const [status, setStatus] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    fetch("http://localhost:3000/parametros").then((response)=>{ 
      return response.json()
    }).then((data)=>{ console.log(data)
      setStatus(data)
    })
  },[]);

  function AdicionandoStorage(status){
    localStorage.setItem('id', JSON.stringify(status.id));
    localStorage.setItem('otimo',JSON.stringify(status.otimo_status));
    localStorage.setItem('critico',JSON.stringify(status.critico_status));
  }
  
return(
        <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '50ch', display: 'flex' },
            }}
            noValidate
            autoComplete="off"
        >
          {status.map((row) => (
          <Box>
            <TextField id="standard-basic"
            label="Ótimo é:"
            defaultValue={`> ${row.otimo_status}`}
            variant="standard"
            disabled
            
            />
            <TextField id="standard-basic"
            label="Bom é:"
            defaultValue={`${row.critico_status} até ${row.otimo_status}`}
            variant="standard"
            disabled
            />
            <TextField id="standard-basic"
              label="Crítico é:"
              defaultValue={`< ${row.critico_status}`}
              variant="standard"
              disabled
            />
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Cadastrar Política de Estoque</h2>
                <ModalEdit />
              </Box>
            </Modal>
          </Box>
          ))}
          
        </Box>
        
  );
}

