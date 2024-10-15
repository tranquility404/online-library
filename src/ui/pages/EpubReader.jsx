import { useQuery } from "@tanstack/react-query";
import Epub from "epubjs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBookEpub, getEpubBufferData } from "../../scripts/api/ApiRequests";
import "../../styles/pages/epub-reader.scss";

export default function EpubReader() {
    const location = useLocation();
    const { from, bookId } = location.state;

    const viewerRef = useRef(null);
    const rendition = useRef(null);

    console.log(bookId);

    const { data: bookUrl, isLoading: isUrlLoading } = useQuery({
        queryKey: ["bookUrl", bookId],
        queryFn: () => getBookEpub(bookId),
        enabled: !!bookId
    });

    const { data: bookBuffer, isLoading: isEpubLoading } = useQuery({
        queryKey: ["bookBuffer", bookUrl],
        queryFn: () => getEpubBufferData(bookUrl),
        staleTime: Infinity,
        enabled: !!bookUrl,
    });

    useEffect(() => {
        if (bookBuffer) {
            console.log(bookBuffer);
            console.log(viewerRef.current);
            
            if (rendition.current) {
                rendition.current.destroy();
                rendition.current = null;
            }
            
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
            bookRendition.display();
            
            // bookRendition.on('rendered', () => {
                // console.log("rendered");
                // bookRendition.display();

                // const firstEpubContainer = document.querySelector('.epub-container');
                // firstEpubContainer.style.display = 'none';
            // });

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
            rendition.current = bookRendition;

            // return () => {
            //     if (rendition.current)
            //         rendition.current.destroy();
            // };
        }
    }, [bookBuffer]);

    useEffect(() => {
        if (!rendition) return;

        // rendition.display();
        console.log("rendition is not null", rendition);
        // console.log("on", rendition.on);
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
        if (rendition.current)
            rendition.current.next();
    };

    const prevPage = () => {
        if (rendition.current)
            rendition.current.prev();
    };

    if (isUrlLoading || isEpubLoading)
        return (
            <h1>Loading...</h1>
        )

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