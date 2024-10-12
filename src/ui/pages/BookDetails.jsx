import "../../styles/pages/book-details.scss";
import "../../styles/pages/quiz-page/quiz-dialog.scss";

import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSimilarBooks } from "../../scripts/api/ApiRequests.js";
import QuizGuide from "./QuizPage/components/QuizGuide.jsx";

export default function BookDetails() {
    const location = useLocation();
    const { from, book } = location.state;
    
    const { data, isLoading, error, isError, status } = useQuery({
        queryKey: ["similar-books"],
        queryFn: () => getSimilarBooks(book.genre),
        staleTime: Infinity
    });

    console.log(data);
    

    const dialogRef = useRef(null);
    const navigate = useNavigate();

    const similarBookClicked = (it) => {
        navigate('/book-details', {
            state: { from: 'BookDetailsPage', book: it },
        });
    };

    const openQuizGuide = () => {
        dialogRef.current?.showModal();
    }

    const navback = () => {
        navigate(-1);
    };

    return (
        <section className="book-details">

            <i className="back-icon fa-solid fa-chevron-left fa-2x"onClick={navback}></i>

            <article className="book-details-container">

                <div className="book-img">
                    <div className="doodle"></div>
                    <img src={book.thumbnail} />
                </div>

                <div className="details-content">
                    <h1>{book.title}</h1>
                    <p>by <strong>{book.author}</strong></p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                        <strong>Category: </strong>{book.genre}
                    </p>

                    <div className="buttons">
                        <Link to="/epub-reader" state={{ from: "BookDetails", bookId: book["_id"]}} className="btn btn--primary">Read Now</Link>
                        <button className="btn btn--secondary" onClick={openQuizGuide}>Attempt Quiz</button>
                    </div>
                </div>

                <div className="similar-books">
                    <strong>More Books</strong>
                    <ul>
                        {/* <li className="is-selected"><img src={book.thumbnail} alt="" /></li> */}
                        {
                            data && data.map((it, idx) => (
                                <li key={idx} className={it._id == book._id? "is-selected": ""} onClick={() => similarBookClicked(it)}>
                                    <img src={it.thumbnail} alt={it.title} />
                                </li>
                            ))
                        }
                        {/* <li><img src={boo2} alt="" /></li>
                        <li><img src={boo3} alt="" /></li>
                        <li><img src={boo4} alt="" /></li> */}
                    </ul>
                </div>
            </article>

            <QuizGuide dialogRef={dialogRef} bookId={book._id} />
            
        </section>
    )
}