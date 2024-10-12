import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBookQuiz } from "../../../../scripts/api/ApiRequests";

export default function QuizGuide({dialogRef, bookId}) {
    const { data:quizUrl } = useQuery({
        queryKey: ["quiz", bookId],
        queryFn: () => getBookQuiz(bookId),
        enabled: !!bookId
    });

    const close = () => {
        dialogRef.current.close();
    }

    return (
        <dialog className="quiz-guide-dialog popup-dialog" ref={dialogRef}>
                <div className="popup-info">
                    <h2 className="title">Quiz Guide</h2>
                    <ol start={1}>
                        <li>Read each question carefully.</li>
                        <li>Manage your time wisely.</li>
                        <li>Ensure a stable internet connection.</li>
                        <li>Double-check your answers before submitting.</li>
                        <li>Stay calm and focused throughout.</li>
                    </ol>

                    <div className="btn-group">
                        <button className="btn btn--secondary exit-btn" onClick={close}>Exit Quiz</button>
                        <Link to="/quiz" state={{from: "QuizGuide", quizUrl: quizUrl}} className="btn btn--primary continue-btn">Continue</Link>
                    </div>
                </div>
        </dialog>
    )
}