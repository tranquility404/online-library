import { Link, useNavigate } from "react-router-dom";
import "../../../../styles/pages/quiz-page/quiz-result.scss";
import CircularProgressBar from "../../../components/CircularProgressBar";

export default function QuizResult({ dialogRef, correct, total, quizUrl }) {
    const perc = Math.round((correct/total)*100);

    const navigate = useNavigate();

    const tryAgain = () => {
        navigate('/quiz', {
            state: { from: 'QuizResult', quizUrl: quizUrl },
        });
        window.location.reload();
    };

    return (
        <dialog className="quiz-result-dialog popup-dialog" ref={dialogRef}>
            <div className="result-box">
                <h2 className="title">Quiz Result!</h2>
                <CircularProgressBar percentage={perc} />

                <span className="score-text">Your Score {correct} out of {total}</span>

                <div className="buttons">
                    <button onClick={tryAgain} className="btn btn--primary">Try Again</button>
                    <Link to="/" className="btn btn--secondary">Go To Home</Link>
                </div>
            </div>
        </dialog>
    )
} 