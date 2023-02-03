import React, { useState, useEffect } from "react"
import PreviewComponent from "./Components/PreviewComponent"
import FormComponent from "./Components/FormComponent";
import './App.css';
import axios from "axios"
import ClockLoader from "react-spinners/ClockLoader";
import { BASEURL } from "./utils";

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllMultipleOptions = async () => {

    try {
      const allOptions = await axios.get(`${BASEURL}api/multipleOption/getAll`);
      setAllQuestions(allOptions.data)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }
  const HandleDeleteQuestion = async (id) => {
    try {
      const allOptions = await axios.delete(`${BASEURL}api/multipleOption/delete/${id}`);
      getAllMultipleOptions()
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllMultipleOptions()
  }, [])
  return (
    <div className="main">
      <h2 className="App_heading">Multiple Option App</h2>

      <div className="container">
        <FormComponent allQuestions={allQuestions} setAllQuestions={setAllQuestions} />
        {loading
          ?
          <div className="loading">

            <ClockLoader color="#36d7b7" />
          </div>

          :
          <PreviewComponent questions={allQuestions} DeleteQuestion={HandleDeleteQuestion} />
        }
      </div>
    </div>
  );
}

export default App;






