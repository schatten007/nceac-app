import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Form from '../components/Form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};

export default function BasicModal({ currentForm, setCurrentForm }) {
  const handleClose = () => setCurrentForm({...currentForm, loaded: false});

  return (
    <div>
      <Modal
        open={currentForm.loaded}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form inputs={currentForm.formData.inputs} formID={currentForm.formData._id}/>
        </Box>
      </Modal>
    </div>
  );
}
