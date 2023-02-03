import React, { useState, useEffect } from "react"
import PreviewComponent from "./Components/PreviewComponent"
import FormComponent from "./Components/FormComponent";
import './App.css';
import axios from "axios"


function App() {
  const [allQuestions, setAllQuestions] = useState([]);


  const getAllMultipleOptions = async () => {
    try {
      const allOptions = await axios.get("http://localhost:8004/api/multipleOption/getAll");
      console.log(allOptions.data, "alloptions")
      setAllQuestions(allOptions.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const HandleDeleteQuestion = async (id) => {
    try {
      const allOptions = await axios.delete(`http://localhost:8004/api/multipleOption/delete/${id}`);
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
        <PreviewComponent questions={allQuestions} DeleteQuestion={HandleDeleteQuestion} />
      </div>
    </div>
  );
}

export default App;





