import React, { useState } from "react"
import axios from "axios";
const FormComponent = ({ allQuestions, setAllQuestions }) => {
    const [questions, setQuestions] = useState([{ question: '', options: [] }]);
    const [addOptionButton, setAddOptionButton] = useState(true)

    const handleQuestionChange = (e, index) => {
        const newQuestions = [...questions];
        newQuestions[index].question = e.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        setQuestions(newQuestions);
        if (newQuestions[0].options.length > 1) {
            setAddOptionButton(false)
        }
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };
    const HandleSubmit = async () => {
        const question = [...allQuestions, ...questions];
        const hasEmptyString = questions[0].options.includes('');
        const questionString = questions[0].question.length;
        console.log(questionString, "queistionfawe")
        if (hasEmptyString || questionString < 10) {
            alert("Question && Options field values are required")
        } else {


            setQuestions([{ question: '', options: [] }])
            setAddOptionButton(true)

            const header = { "Content-Type": "application/json" };
            try {
                await axios
                    .post(
                        "http://localhost:8004/api/multipleOption/add", questions[0], header);
            } catch (err) {
                console.log(err)
            }
            const allOptions = await axios.get("http://localhost:8004/api/multipleOption/getAll");
            console.log(allOptions.data, "alloptions")
            setAllQuestions(allOptions.data)
        }
    }

    return (
        <div className="question_adding_container">
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question_adding_block">
                    <h5 className="question_text">Enter your required Question</h5>
                    <textarea
                        value={question.question}
                        rows={6}
                        cols={40}
                        required
                        onChange={(e) => handleQuestionChange(e, questionIndex)}
                    />
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <p>Option:{optionIndex + 1}</p>
                            <input className="option_input"
                                type="text"
                                value={option}
                                required
                                onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)}
                            />
                            <button className="remove_button" onClick={() => removeOption(questionIndex, optionIndex)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    {!addOptionButton && <button id="submit" onClick={() => HandleSubmit()}>Submit</button>}
                    {addOptionButton && <button id="addOption" onClick={() => addOption(questionIndex)}>Add Option</button>
                    }

                </div>
            ))}
        </div>
    );
};
export default FormComponent;