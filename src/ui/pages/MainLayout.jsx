import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";

export default function MainLayout() {
    const [isNavOpen, setNavOpen] = useState(true);

    return (
        <div className="main-layout">
            <Sidebar isNavOpen={isNavOpen}/>
            <Header isNavOpen={isNavOpen} setNavOpen={setNavOpen}/>
            <main>
                <Outlet />
            </main>

        </div>
    )
}