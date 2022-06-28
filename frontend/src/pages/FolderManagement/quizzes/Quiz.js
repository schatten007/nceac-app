// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// import { adddata } from "./context/ContextProvider";
// import { updatedata, deldata } from "./context/ContextProvider";

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from '../../../components/Sidebar'
import { Container } from '../../../components/styled/Container'

function Quiz() {
  const [getquizdata, setQuizData] = useState([]);
  console.log("error");

//  const { qdata, setQData } = useContext(adddata); // qdata is quiz data

//  const { updata, setUdata } = useContext(updatedata);

  // const [dltdata, setDltdata] = useContext(deldata);

  const getdata = async (e) => {
    const res = await fetch("http://localhost:8003/getquizdata", {
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
      setQuizData(data);
      console.log("Get Data.");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // Delete Course Material

  const deletequiz = async (id) => {
    const res2 = await fetch(
      `http://localhost:8003/deletequiz/${id}`,
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
      console.log("Quiz Deleted");
      //setDltdata(deletedata)
      getdata();
    }
  };

  return (
    <Container>
      <Sidebar />

      <div className="mt-5">
        <h1>Quizzes</h1>
        <div className="container">
          <div className="add_btn mt2 mb-2">
            <NavLink to="/addquiz" className="btn btn-primary child">
              Add Quiz
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">#</th>
                <th scope="col">Quiz Title</th>
                <th scope="col">Question</th>
                <th scope="col">Best</th>
                <th scope="col">Average</th>
                <th scope="col">Worst</th>
                <th scope="col">Marks</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getquizdata.map((element, id) => {
                return (
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.quizTitle}</td>
                    {/* Question */}
                    <td> 
                    <a
                        className="btn btn-success"
                        href={element.questionurl}
                        download
                        
                      >
                        <i class="fa-solid fa-download"></i>
                      </a>
                    </td>

                    {/* Best */}
                    <td> 
                    <a
                        className="btn btn-success"
                        href={element.besturl}
                        download
                        
                      >
                        <i class="fa-solid fa-download"></i>
                      </a>
                    </td>

                    {/* Average */}
                    <td> 
                    <a
                        className="btn btn-success"
                        href={element.averageurl}
                        download
                        
                      >
                        <i class="fa-solid fa-download"></i>
                      </a>
                    </td>

                    {/* Worst */}
                    <td> 
                    <a
                        className="btn btn-success"
                        href={element.worsturl}
                        download
                        
                      >
                        <i class="fa-solid fa-download"></i>
                      </a>
                    </td>

                    {/* Marks */}
                    <td> 
                    <a
                        className="btn btn-success"
                        href={element.marksurl}
                        download
                        
                      >
                        <i class="fa-solid fa-download"></i>
                      </a>
                    </td>

                    <td className="d-flex justify-content-between">
                      {/*<button className="btn btn-success">
                        <i class="fa-solid fa-download"></i>
                </button>*/}

                      <NavLink to={`editquiz/${element._id}`}>
                        <button className="btn btn-primary">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                      </NavLink>

                      <button
                        className="btn btn-danger"
                        onClick={() => deletequiz(element._id)}
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

export default Quiz;
