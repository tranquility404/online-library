// import HorizontalProgressBar from "../../../components/HorizontalProgressBar";
// import QuizQues from "./QuizQues";

// export default function QuizTest() {
//     return (
//         <>
//             <HorizontalProgressBar percentage={(((curr + 1) / size) * 100)} />

//             <section className="quiz-section">
//                 <div className="quiz-box">
//                     <h1>Quiz</h1>
//                     <div className="quiz-header">
//                         <span>Chapter 1</span>
//                         <span className="header-score">0 / 5</span>
//                     </div>

//                     <QuizQues ques={ques} onSelected={selectOption} />

//                     <div className="quiz-footer">
//                         <span className="question-total">{curr + 1} of 5 Questions</span>
//                         <button className={`btn next-btn ${ques.selected !== null ? 'active' : ''}`} onClick={nextQues}>Next</button>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }