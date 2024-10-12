import Ques from "../../../../scripts/model/Ques";

// type QuizQuesProps = {
//     ques: Ques;
//     onSelected: (key: string) => void;
// }

export default function QuizQues({ques, onSelected}) {
    return (
        <>
            <h2 className="question-text">{ques.ques}</h2>

            <ul className="option-list">
                {
                    Object.entries(ques.options).map(([key, value]) => (
                        <li key={key} onClick={() => onSelected(key)}
                            className={`${ques.selected === key ? 'selected' : ''}`}>
                            <span>{key.toUpperCase()}</span>
                            <p>{value}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}