import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import { useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';

export default function UploadMain() {

  const navigate = useNavigate();
  function handleChange(files){
    if(files.length > 0){
      var data = new FormData();
      data.append('uploadfile', files[0])
      
      
      fetch('http://localhost:3000/uploadfile', {
        method: 'POST',
        body: data
      }).finally(()=>{
        navigate("/Relatorio")
      })
    }
    
  }
  return (
    <Container>
    <DropzoneArea
      filesLimit={1}
      acceptedFiles={['.csv']}
      onChange={(e)=> handleChange(e)}
    />
    </Container>
  )
}