import icon from "../../assets/images/no-results.png";
import "../../styles/pages/error-page.scss"

export default function ErrorPage() {
    return (
        <div className="error-page container">
            <img src={icon} />
            <h1>404</h1>
            <h4>Page Not Found</h4>
        </div>
    )
}