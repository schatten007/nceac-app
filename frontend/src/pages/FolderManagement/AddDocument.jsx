import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Container } from '../../components/styled/Container'

// Firebase
import { storage } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { TextField, Button, Grid, Typography } from '@mui/material';
// Firebase


const AddDocument = ({ documents, files, setFiles , endpoint }) => {
    const [ title, setTitle ] = useState();
    
  
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
      setFiles({...files, [e.target.name]: e.target.files[0]})
      }
    }
  
    const handleUpload = async (e) => {
      e.preventDefault();
      console.log(files)
      
      if(!title) return;
      for(const value of Object.values(files)){
        if(!value) {
          console.log('Add All Values');
          return;
        }
      }
  
      uploadFiles();
    }
  
// @desc Uplaod the whole array of files to cloud storage
    const uploadFiles = async () => {
      //
      if (!files) return;
      const promises = [];
      const keys = [];
      
      for (const [ key, file ] of Object.entries(files)){
      console.log(promises)
      const storageRef = ref(storage, `/${endpoint}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      promises.push(uploadTask);
      keys.push(key);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err)
      );
      }
  
  // Dont touch....took a whole lot of time to figure this out
      Promise.all(promises)
      .then((values) => {
        const urlPromise = [];
        values.forEach((value) => {
          urlPromise.push(getDownloadURL(value.ref));
        })
  
        Promise.all(urlPromise).then((values) => {
          let urlArr = {
            question: null,
            best: null,
            average: null,
            worst: null,
            marks: null
          };
  
          values.forEach((url, index) => {
            urlArr = {...urlArr, [keys[index]]: url};;
          })
  
          addinpdata(urlArr);
        }).then((err) => console.log(err));
      })
      .then((err) => console.log(err));
  
    };

// @desc Add The Title + Urls + SubjectId to Database  
    const addinpdata = async (urls) => {
      //   inputValue;
      console.log(urls);
      const { question, best, average, worst, marks } = urls;
      if(question === null || best === null || average === null || worst === null || marks === null) return;
  
      const res = await fetch(`http://localhost:8000/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          questionurl: question,
          besturl: best,
          averageurl: average,
          worsturl: worst,
          marksurl: marks,
          subjectid
        }),
      });
      const data = await res.json();
      console.log(data);
  
      if (res.status === 422 || !data) {
        alert("Please fill all the fields or  re-check Title");
        console.log("error");
      } else {
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
  
          {
            (documents) && 
            documents.map( (document, index) => {
              const key = Object.keys(files)[index];
              return(
              <Grid item xs={12}>
                <Button variant='contained' component='label' color='primary'>
                  {(!files[key]) ? `Add ${document}` : `Added ${document}` }
                  <input type="file" hidden accept="application/pdf" name={key} onChange={selectFiles}/>
                </Button>
              </Grid>
              );
            })
          }

          <Grid item xs={12}>
            <hr></hr>
            <Typography variant="h6">{progress}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='success' onClick={handleUpload}>
              Upload
            </Button>
          </Grid>          
        </Grid>          
      </Container>
    );
  }
  
  export default AddDocument;
  