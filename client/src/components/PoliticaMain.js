import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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

export default function NestedModal() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [status, setStatus] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/parametros").then((response)=>{ 
      return response.json()
    }).then((data)=>{ console.log(data)
      setStatus(data)
    })
  },[]);


  return (
    <div>
      {status && status.length==0 ? <Button onClick={handleOpen}>Cadastrar</Button> : ''}      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Cadastrar Política de Estoque</h2>
          <ModalPolitica />
        </Box>
      </Modal>
    </div>
  );
};

function ModalPolitica() {

  const [statusOtimo, setStatusOtimo] = useState('');
  const [statusCritico, setStatusCritico] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  function salvarDados(){
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otimo_status: statusOtimo, critico_status: statusCritico })
  };
  fetch("http://localhost:3000/parametros", requestOptions)
    .then(response => response.json());
    return window.location.reload();
  }

  return (
    <React.Fragment>
          <TextField 
            helperText="Digite qual o valor mínimo de estoque  que será considerado Ótimo"
            id="otimo"
            label="Ótimo"
            variant="outlined"
            type= 'number'
            onChange={ e => setStatusOtimo(e.target.value)}
          />
          <TextField 
            helperText="Digite qual o valor máximo de estoque que será considerado Crítico"
            id="critico"
            label="Crítico"
            variant="outlined"
            type= 'number'
            onChange={ e => setStatusCritico(e.target.value)}
          />
      <Button onClick={handleOpen}>Salvar</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300  }}>
          <h3 id="child-modal-title">Deseja Salvar Alteração ?</h3>
          <p id="child-modal-description">
            Essas serão as novas informações da Política de estoque.
          </p>
          <Button onClick={salvarDados}>Confirmar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
