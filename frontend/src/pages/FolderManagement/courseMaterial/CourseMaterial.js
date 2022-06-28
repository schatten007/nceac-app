// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./CourseMaterial.css";
// import { adddata } from "./context/ContextProvider";
// import { updatedata, deldata } from "./context/ContextProvider";

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from '../../../components/Sidebar'
import { Container } from '../../../components/styled/Container'

function CourseMaterial() {
  const [getcoursematerialdata, setCourseMaterialData] = useState([]);
  console.log("error");

  // const { cmdata, setCMData } = useContext(adddata);

  // const { updata, setUdata } = useContext(updatedata);

  // const [dltdata, setDltdata] = useContext(deldata);

  const getdata = async (e) => {
    const res = await fetch("http://localhost:8003/getcoursematerialdata", {
      // we made a proxy. So he said no need to write complete.
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Error");
      console.log("error");
    } else {
      setCourseMaterialData(data);
      console.log("Get Data.");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // Delete Course Material

  const deletecoursematerial = async (id) => {
    const res2 = await fetch(
      `http://localhost:8003/deletecoursematerial/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("Error");
    } else {
      console.log("User Deleted");
      //setDltdata(deletedata)
      getdata();
    }
  };

  return (
    <Container>
      <Sidebar />
      <div className="mt-5">
        <h1>Course Materials</h1>
        <div className="container">
          <div className="add_btn mt2 mb-2">
            <NavLink to="/addcoursematerial" className="btn btn-primary child">
              Add Course Material
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getcoursematerialdata.map((element, id) => {
                return (
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.courseTitle}</td>
                    <td>{element.description}</td>
                    <td className="d-flex justify-content-between">
                      {/*<button className="btn btn-success">
                        <i class="fa-solid fa-download"></i>
                </button>*/}

                      <a
                        className="btn btn-success"
                        href={element.fileurl}
                        download
                        
                      >
                        <i class="fa-solid fa-download"></i>
                      </a>

                      <NavLink to={`editcoursematerial/${element._id}`}>
                        <button className="btn btn-primary">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                      </NavLink>

                      <button
                        className="btn btn-danger"
                        onClick={() => deletecoursematerial(element._id)}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

export default CourseMaterial;
