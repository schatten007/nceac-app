import React, { useContext, useEffect } from "react";
import { NavLink, useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
// import { updatedata } from "./context/ContextProvider";



function EditCourseMaterial() {
  // const [getcoursematerialdata, setCourseMaterialData] = useState([]);
  // console.log(getcoursematerialdata);

  // const {updata,setUdata} = useContext(updatedata)

  const navigate = useNavigate("");

  const [inputValue, setInputValue] = useState({
    courseTitle: "",
    description: "",
    fileurl: "",
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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:8003/getcoursematerial/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setInputValue(data);
      console.log("Get data");
    }
  };

  useEffect(() => {
    getdata();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updatedcoursematerial = async(e) => {
    e.preventDefault();

    const {courseTitle,description,fileurl} = inputValue;

    const res2 = await fetch(`http://localhost:8003/updatecoursematerial/${id}`,{
      method:"PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        courseTitle,description,fileurl
      })
    });

    const data2 = await res2.json;
    console.log(data2)

    if(res2.status === 422 || !data2) {
      alert("Fill the Data")
    } else {
      
      navigate("/coursematerial")
      // setUdata(data2)
    }

  }

  return (
    <div className="container">
      <NavLink to="/">Course Materials 2</NavLink>
      <form className="mt-2">
        <div class="form-group mb-4 mt-4">
          <label for="exampleInputEmail1" className="form-label label-font">
            Course Title
          </label>
          <input
            value={inputValue.courseTitle}
            onChange={setdata}
            name="courseTitle"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group mb-4">
          <label for="exampleInputPassword1" className="form-label label-font">
            Description
          </label>
          <textarea
            value={inputValue.description}
            onChange={setdata}
            name="description"
            className="form-control"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter Description"
          ></textarea>
        </div>
{/*
        <div class="form-group mb-4">
          <label
            for="exampleFormControlFile1"
            className="form-label label-font"
          >
            Example file input:
          </label>
          <input
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
          />
  </div> */}

        <button type="submit" onClick={updatedcoursematerial} class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCourseMaterial;
