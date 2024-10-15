import { useEffect, useRef, useState } from "react";
// import local from "../../../data/quiz.json";
import Ques from "../../../scripts/model/Ques.js";
import "../../../styles/pages/quiz-page/quiz-page.scss";
import HorizontalProgressBar from "../../components/HorizontalProgressBar.jsx";
import QuizQues from "./components/QuizQues.jsx";
import QuizResult from "./components/QuizResult.jsx";
import { useLocation } from "react-router-dom";
import { getQuizJsonData } from "../../../scripts/api/ApiRequests.js";
import { useQuery } from "@tanstack/react-query";


export default function QuizPage() {
    const location = useLocation();
    const { from, quizUrl } = location.state;
    console.log("quizUrl:", quizUrl);

    const { data:quiz } = useQuery({
        queryKey: ["quiz-json", quizUrl],
        queryFn: () => getQuizJsonData(quizUrl),
        staleTime: Infinity,
        enabled: !!quizUrl
    });

    // console.log(quiz);
    
    const size = quiz? quiz.length: -1;
    console.log(size);
    // console.log(localCurr);
    // console.log(localQues);
    
    const [curr, setCurr] = useState(-1);
    const [ques, setQues] = useState();
    const [quesList, setQuesList] = useState();

    const [nextBtn, setNextBtn] = useState("Next");
    const [correct, setCorrect] = useState(0);

    const dialogRef = useRef(null);
    
    useEffect(() => {
        if (!quiz) return;

        const list = quiz.map((it, idx) => new Ques(idx, it));

        setQuesList(list);
        setCurr(0);
        console.log(list);
        
        // setQues(list[0]);
        
        // const l = quiz.length;

    // for (let i = 0; i < l; i++)
        // list.push(new Ques(i, quiz[i]));
        // console.log("quiz: ", quiz);
        
        // fetch(`db/${quiz[0]}`)
        // .then(async res => {
        //         const questions = await res.json();
        //         const l = questions.length;
        //         const list = [];

        //         for (let i = 0; i < l; i++)
        //             list.push(new Ques(i, questions[i]));

                // setQuesList(list);
                // setCurr(0);
                // setSize(l);
        //     })
    }, [quiz])

    const selectOption = (option) => {
        let _select = null;
        if (ques?.selected === option) {
            _select = null
        }
        else {
            _select = option;
        }
        const q = { ...ques, selected: _select };
        quesList[curr] = q;
        setQues(q);
        console.log(ques);
    }

    useEffect(() => {
        if (curr == -1)
            return;
        setQues(quesList[curr]);
        console.log(quesList[curr]);
    }, [curr])

    const openQuizGuide = () => {
        dialogRef.current?.showModal();
    }

    const nextQues = () => {
        if (curr < size - 1) {
            if (curr === size - 2)
                setNextBtn("Submit");
            // quesList[curr] = ques;
            setCurr(curr + 1);
            console.log(curr);
        } else if (nextBtn === "Submit") {
            openQuizGuide();
            calculateScore();
            setCurr(0);
        }
    }

    const calculateScore = () => {
        let corr = 0;
        for (let i = 0; i < size; i++) {
            let q = quesList[i];
            if (q.selected == q.correct)
                corr++;
        }
        setCorrect(corr)
    }

    return (
        <div className="quiz-page">
            {
                curr !== -1 ?
                    (
                        <>
                            { curr!==-1 && <HorizontalProgressBar percentage={(((curr + 1) / size) * 100)} />}

                            <section className="quiz-section">
                                <div className="quiz-box">
                                    <h1>Quiz</h1>
                                    <div className="quiz-header">
                                        <span>Chapter 1</span>
                                        <span className="header-score">0 / 5</span>
                                    </div>

                                    {ques && <QuizQues ques={ques} onSelected={selectOption} />}

                                    <div className="quiz-footer">
                                        {size !== -1 && <span className="question-total">{curr + 1} of {size} Questions</span>}
                                        <button className={`btn next-btn ${ques?.selected !== null ? 'active' : ''}`} onClick={nextQues}>
                                            {nextBtn}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </>
                    ) : ''
            }

            <QuizResult dialogRef={dialogRef} correct={correct} total={size} quizUrl={quizUrl}/>
        </div>
    )
}
