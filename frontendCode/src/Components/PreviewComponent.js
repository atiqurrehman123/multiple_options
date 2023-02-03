const options = ['a', 'b', 'c', 'd']
const PreviewComponent = ({ questions, DeleteQuestion }) => {
    return (
        <div className="Question_Main_Container">
            {questions.map((question, index) => (
                <div key={index} className="question_container">
                    <div className="question_heading">
                        <h3 className="question-text">{index + 1}:  &nbsp;{question.question}</h3>
                        <p onClick={() => DeleteQuestion(question._id)}>
                            <span class="material-symbols-outlined" style={{ color: "red", cursor: "pointer" }}>
                                delete
                            </span>  </p>
                    </div>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>{options[optionIndex]}.&nbsp;&nbsp;{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default PreviewComponent