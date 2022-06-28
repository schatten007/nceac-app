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
  const [ files, setFiles ] = useState({
    question: null,
    best: null,
    average: null,
    worst: null,
    marks: null
  });
  // const [ urls, setUrls ] = useState({
  //   question: null,
  //   best: null,
  //   average: null,
  //   worst: null,
  //   marks: null
  // })

  const navigate = useNavigate();
  const { subjectid } = useParams();

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setTitle(value);
  };
  // Firebase

  const [progress, setProgress] = useState(0);

  // const formHandler = (e) => {
  //   e.preventDefault();
  //   const file = e.target[0].files[0];
  //   uploadFiles(file);

  // };

  const selectFiles = (e) => {
    if(e.target.files[0]){
    setFiles({...files, [e.target.name]: e.target.files[0]})
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if ( !title || !files.question || !files.best || !files.average || !files.worst ){
      console.log('Add alert to fill all fields');
      return;
    }

    uploadFiles();
  }

  const uploadFiles = async () => {
    //
    if (!files) return;
    const promises = [];
    const keys = [];
    
    for (const [ key, file ] of Object.entries(files)){
    console.log(promises)
    const storageRef = ref(storage, `/quiz/${file.name}`);
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
      (err) => console.log(err),
       () => {
        // getDownloadURL(uploadTask.snapshot.ref) // Reference to the file we want to download.
        // .then((url) => {
        //   setUrls({...urls, [key]: url});
        // });
      }
    );
    }

// Dont touch....took a whole lot of time to figure this out
    Promise.all(promises)
    .then((values) => {
      const urlPromise = [];
      // console.log('All files uploaded', urls);
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
          // setUrls({...urls, [keys[index]]: url})
          urlArr = {...urlArr, [keys[index]]: url};
          // console.log(keys[index], url);
        })

        addinpdata(urlArr);
      }).then((err) => console.log(err));
    })
    .then((err) => console.log(err));

  };
  // Firebase

  const addinpdata = async (urls) => {
    //   inputValue;
    console.log(urls);
    const { question, best, average, worst, marks } = urls;
    if(question === null || best === null || average === null || worst === null || marks === null) return;

    const res = await fetch("http://localhost:8000/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizTitle: title,
        questionurl: question,
        besturl: best,
        averageurl: average,
        worsturl: worst,
        marksurl: marks,
        subjectid
      }), // Should I remove this comma? He doesn't have it.
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Please fill all the fields or  re-check Quiz Title");
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
      {/* // Title, QuestionPaper, Best, Average, Worst, Marksheet */}
      <Grid container justifyContent='center' flex >
        <Grid item xs={12}>
          <TextField label='Enter Title' placeholder="Title" onChange={setdata} />
        </Grid>

        <Grid item xs={12}>  
          <Button variant="contained" component="label" color="primary">
          {" "}
          {(!files.question) ? 'Choose Question Paper' : 'Question Paper Chosen'}
          <input type="file" hidden accept="application/pdf" name="question" onChange={selectFiles}/>
          </Button>
        </Grid>
        <Grid item xs={12}>  
          <Button variant="contained" component="label" color="primary">
          {" "}
          {(!files.best) ? 'Choose Best Quiz' : 'Best Quiz Chosen'}
          <input type="file" hidden accept="application/pdf" name="best" onChange={selectFiles}/>
          </Button>
        </Grid>
        <Grid item xs={12}>  
          <Button variant="contained" component="label" color="primary">
          {" "}
          {(!files.average) ? 'Choose Average Quiz' : 'Average Quiz Chosen'}
          <input type="file" hidden accept="application/pdf" name="average" onChange={selectFiles}/>
          </Button>
        </Grid>
        <Grid item xs={12}>  
          <Button variant="contained" component="label" color="primary">
          {" "}
          {(!files.worst) ? 'Choose Worst Quiz' : 'Worst Quiz Chosen'}
          <input type="file" hidden accept="application/pdf" name="worst" onChange={selectFiles}/>
          </Button>
        </Grid>
        <Grid item xs={12}>  
          <Button variant="contained" component="label" color="primary">
          {" "}
          {(!files.marks) ? 'Choose Marks Sheet' : 'Marks Sheet Chosen'}
          <input type="file" hidden accept="application/pdf" name="marks" onChange={selectFiles}/>
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
