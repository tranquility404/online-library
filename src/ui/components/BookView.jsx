import { Link, useNavigate } from "react-router-dom"

export default function BookView({ book }) {
    const navigate = useNavigate();

    const bookClicked = () => {
        navigate('/book-details', {
            state: { from: 'HomePage', book: book },
        });
    };

    return (
        <div className="book" onClick={bookClicked}>
            <div className="book-cover">
                {/* <img src={`/db/${book.thumbnail}`} alt={book.title!} /> */}
                <img src={book.thumbnail} alt={book.title} />
            </div>
            <div className="book-details">


                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span>{book.genre}</span>
                {/* <Link to="/book-details"
                    state={{ from: 'HomePage', book: book }}
                    className="details-button btn btn--primary">
                    Details
                </Link> */}
            </div>
        </div>
    )
}