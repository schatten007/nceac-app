import React, { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditQuiz() {
  const navigate = useNavigate("");

  const [inputValue, setInputValue] = useState({
    quizTitle: "",
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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:8003/getquiz/${id}`, {
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
  }, []); 

  const updatedquiz = async (e) => {
    e.preventDefault();

    const { quizTitle, questionurl, besturl, averageurl, worsturl, marksurl } =
      inputValue;

    const res2 = await fetch(`http://localhost:8003/updatequiz/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizTitle,
        questionurl,
        besturl,
        averageurl,
        worsturl,
        marksurl,
      }),
    });

    const data2 = await res2.json;
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Fill the Data");
    } else {
      navigate("/quiz");
      //  setUdata(data2)
    }
  };

  return (
    <div className="container">
      <NavLink to="/quiz">Quiz</NavLink>
      <form className="mt-2">
        <div class="form-group mb-4 mt-4">
          <label for="exampleInputEmail1" className="form-label label-font">
            Quiz Title
          </label>
          <input
            value={inputValue.quizTitle}
            onChange={setdata}
            name="quizTitle"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Quiz Title"
            required
          />
        </div>

        <button type="submit" onClick={updatedquiz} class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditQuiz;
