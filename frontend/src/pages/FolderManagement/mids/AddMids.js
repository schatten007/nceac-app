import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
// import { adddata } from "./context/ContextProvider";

// Firebase
import { storage } from "../../../services/firebase";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// Firebase

function AddMids() {
  //  const { cmdata,setCMData } = useContext(adddata)
  const [questionPath, setQuestionPath] = useState();
  const [bestPath, setBestPath] = useState();
  const [averagePath, setAveragePath] = useState();
  const [worstPath, setWorstPath] = useState();
  const [marksPath, setMarksPath] = useState();

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    midsTitle: "",
    questionurl: "",
    besturl: "",
    averageurl: "",
    worsturl: "",
    marksurl: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputValue((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  // Firebase

  const [progress, setProgress] = useState(0);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);

  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `/mids/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
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
        getDownloadURL(uploadTask.snapshot.ref) // Reference to the file we want to download.
          .then((url) => {
            setQuestionPath(url);
            setBestPath(url)
          });
      }
    );
  };
  // Firebase

  const addinpdata = async (e) => {
    e.preventDefault();

    var { midsTitle, questionurl, besturl, averageurl, worsturl, marksurl } =
      inputValue;
    questionurl = questionPath;
    console.log(questionurl);

    const res = await fetch("http://localhost:8003/addmids", {
      // we made a proxy. So he said no need to write complete.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        midsTitle,
        questionurl,
        besturl,
        averageurl,
        worsturl,
        marksurl,
      }), // Should I remove this comma? He doesn't have it.
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Please fill all the fields or  re-check Mids Title");
      console.log("error");
    } else {
      // setCMData(data)
      navigate("/mids");
      console.log("Data has been added.");
    }
  };

  return (
    <div className="container">
      <NavLink to="/mids">Mids</NavLink>
      <form className="mt-2">
        <div class="form-group mb-4 mt-4">
          <label for="exampleInputEmail1" className="form-label label-font">
            Mids Title
          </label>
          <input
            value={inputValue.midsTitle}
            onChange={setdata}
            name="midsTitle"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
          />
        </div>

        <button type="submit" onClick={addinpdata} class="btn btn-primary mb-5">
          Submit
        </button>
      </form>

      {/*This is for the Firebase storage */}

      {/*Question File */}
      <form onSubmit={formHandler}>
        <div class="form-group mb-4">
          <label
            for="exampleFormControlFile1"
            className="form-label label-font"
          >
            Question file input:
          </label>
          <input
            value={inputValue.fPath}
            onChange={setdata}
            name="questionurl"
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Upload File
        </button>
      </form>

      {/*Best File */}
      <form onSubmit={formHandler}>
        <div class="form-group mb-4">
          <label
            for="exampleFormControlFile1"
            className="form-label label-font"
          >
            Best file input:
          </label>
          <input
            value={inputValue.fPath}
            onChange={setdata}
            name="besturl"
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Upload File
        </button>
      </form>
      {/*Average File */}
      <form onSubmit={formHandler}>
        <div class="form-group mb-4">
          <label
            for="exampleFormControlFile1"
            className="form-label label-font"
          >
            Average file input:
          </label>
          <input
            value={inputValue.fPath}
            onChange={setdata}
            name="averageurl"
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Upload File
        </button>
      </form>


      {/*Worst File */}
      <form onSubmit={formHandler}>
      <div class="form-group mb-4">
        <label for="exampleFormControlFile1" className="form-label label-font">
          Worst file input:
        </label>
        <input
          value={inputValue.fPath}
          onChange={setdata}
          name="worsturl"
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Upload File
      </button>
</form>
      {/*Marks File */}
      <form onSubmit={formHandler}>
      <div class="form-group mb-4">
        <label for="exampleFormControlFile1" className="form-label label-font">
          Marks file input:
        </label>
        <input
          value={inputValue.fPath}
          onChange={setdata}
          name="marksurl"
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Upload File
      </button>
</form>
      <hr />
      <h5>Uploaded: {progress}% </h5>
    </div>
  );
}

export default AddMids;
