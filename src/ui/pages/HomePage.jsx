import { useQuery } from "@tanstack/react-query";
import "../../styles/pages/home-page.scss";
import BookView from "../components/BookView.jsx";
import ChatBot from "./ChatBot.jsx";
import { getAllBooks, getAllGenre } from "../../scripts/api/ApiRequests.js";

export default function HomePage() {
    const { data:genres } = useQuery({
        queryKey: ["all-genres"],
        queryFn: getAllGenre,
        staleTime: Infinity
    });

    const { data, isLoading, error, isError, status } = useQuery({
        queryKey: ["all-books"],
        queryFn: getAllBooks,
        staleTime: Infinity
    });
    
    console.log(data, isLoading);

    return (
        <div className="home-page">
            
            {/* <h2>Genres</h2> */}
            <div class="genres grid-container">
            {
                genres && genres.map(it => (

                    <div class="genre-item">{it.name}</div>
                ))
            }
            </div>

            <div className="book-categories">
                <h2>Added Recently</h2>
                <div className="book-grid">
                    {
                        data && data.map((it, idx) => (
                            <BookView key={idx} book={it} />
                        ))
                    }
                </div>
            </div>

            <ChatBot />
        </div>
    )
}