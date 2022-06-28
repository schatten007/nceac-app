import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from '../../../components/Sidebar'
import { Container } from '../../../components/styled/Container'

// Firebase
import { storage } from "../../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { TextField, Button, Grid, Typography } from '@mui/material';
// Firebase



function AddQuiz() {
  const [ title, setTitle ] = useState();
  const [ description, setDescription ] = useState();
  const [ note, setNote ] = useState();

  const navigate = useNavigate();
  const { subjectid } = useParams();

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setTitle(value);
  };
  // Firebase

  const [progress, setProgress] = useState(0);

  const selectFiles = (e) => {
    if(e.target.files[0]){
    setNote( e.target.files[0] )
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if ( !title || !note || !description ){
      console.log('Add alert to fill all fields');
      return;
    }

    uploadFiles();
  }

  const uploadFiles = async () => {
    //
    if (!note) return;
    const storageRef = ref(storage, `/lecturenote/${note.name}`);
    const uploadTask = uploadBytesResumable(storageRef, note);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addinpdata(downloadURL);
        })
      }
    );
 

  };

  const addinpdata = async (url) => {
    console.log(url);
    if(!url) return;

    const res = await fetch("http://localhost:8000/api/lecturenotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        url,
        subjectid
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Please fill all the fields or recheck Title");
      console.log("error");
    } else {
      // setCMData(data)
      navigate(`/subject/${subjectid}`);
      console.log("Data has been added.");
    }

    return data;
  };

  return (
    <Container>
      <Sidebar />
      <Grid container justifyContent='center' flex >
        <Grid item xs={12}>
          <TextField label='Enter Title' placeholder="Title" onChange={setdata} />
        </Grid>

        <Grid item xs={12}>
          <TextField label='Enter Description' placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </Grid>

        <Grid item xs={12}>  
          <Button variant="contained" component="label" color="primary">
          {" "}
          {(!note) ? 'Choose Lecture Note' : 'Lecture Note Chosen'}
          <input type="file" hidden accept="application/pdf" name="note" onChange={selectFiles}/>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' color='success' onClick={handleUpload}>
            Upload
          </Button>
        </Grid>
        <Grid item xs={12}>
          <hr></hr>
          <Typography variant="h6">{progress}</Typography>
        </Grid>
      </Grid>
      

    </Container>
  );
}

export default AddQuiz;
