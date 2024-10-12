import { useQuery } from "@tanstack/react-query";
import Epub from "epubjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBookEpub, getEpubBufferData } from "../../scripts/api/ApiRequests";
import "../../styles/pages/epub-reader.scss";
import axios from "axios";

export default function EpubReader() {
    const location = useLocation();
    const { from, bookId } = location.state;

    console.log(bookId);
    
    const { data:bookUrl } = useQuery({
        queryKey: ["bookUrl", bookId],
        queryFn: () => getBookEpub(bookId),
        enabled: !!bookId
    });

    // console.log(bookUrl);
    
    const { data:bookBuffer, isLoading, error, isError, status } = useQuery({
        queryKey: ["bookBuffer", bookUrl],
        queryFn: () => getEpubBufferData(bookUrl),
        onSuccess: (data) => {
            console.log("loaded ", data);
            loadBook(data);
        },
        enabled: !!bookUrl,
    });

    console.log(bookBuffer);
    // const blob = new Blob([bookBuffer], { type: 'application/epub+zip' });

        // Create a URL for the Blob
    // const epubBlobUrl = URL.createObjectURL(blob);
    
    const viewerRef = useRef(null);

    const localB = Epub(bookBuffer);
    const bookRendition = localB.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
        flow: "paginated",
        spread: "both",
        allowScriptedContent: true,
        // method: "default",
        layout: 'reflowable'
    });
    bookRendition.themes.fontSize("1.4rem");
            // bookRendition.moveTo(8);
    bookRendition.display();

    bookRendition.on('displayed', () => {
        console.log("displayed");
        
        const firstEpubContainer = document.querySelector('.epub-container');
        firstEpubContainer.style.display = 'none';
    });

    document.addEventListener("keydown", function (e) {
        e.preventDefault();
        console.log(e.key)

        if (e.key == "ArrowLeft") {
            console.log("prev");
            prevPage();
        } else if (e.key == "ArrowRight") {
            console.log("next")
            nextPage();
        }

    });

    const [book, setBook] = useState(localB);
    const [rendition, setRendition] = useState(bookRendition);

    // useEffect(() => {
        // if (!book) return;
        // console.log(book);
        

        // const bookRendition = book.renderTo(viewerRef.current, {
            // width: "100%",
            // height: "100%",
            // flow: "paginated",
            // spread: "both",
            // allowScriptedContent: true,
            // method: "default",
            // layout: 'reflowable'
        // });

        // bookRendition.themes.fontSize("1.4rem");
            // bookRendition.moveTo(8);
        // setRendition(bookRendition);
        // bookRendition.display();
    // }, [book])

    useEffect(() => {
        if (!rendition) return;

        // rendition.display();
        console.log("rendition is not null", rendition);
        console.log("on", rendition.on);
        console.log("viewer", viewerRef);
        console.log("book", rendition.book);
        
        
        

        // const yoyo = async () => {
            // const a = await book.opened;
            // .then(() => {
            // console.log("finally opened", book);


                // height: "100%",
                // epubBook.path

                // console.log(epubBook.spine);
                // book.opened.then(() => {
                // console.log("opened", book);
                // setLoading(false);  // Set loading to false after loading is complete
                //   });
            // });
        // }

        // yoyo();

        

        

    }, [rendition])

    const nextPage = () => {
        // if (rendition) {
            // console.log(rendition);

            bookRendition.next();
            
        // }
    };

    const prevPage = () => {
        // if (rendition) {
            bookRendition.prev();
        // }
    };

    return (
        <div className="epub-reader">

            <div
                id="viewer"
                ref={viewerRef}
            >
            </div>

            <div className="buttons">
                <button className="btn btn--secondary" onClick={prevPage}>Previous</button>
                <button className="btn btn--primary" onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}