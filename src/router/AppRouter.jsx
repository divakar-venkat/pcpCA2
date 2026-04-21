import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Activities from "../pages/Activities";
import ActivityDetail from "../pages/ActivityDetail";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import Navbar from "../components/Navbar";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/orders" replace />} />
                <Route path="/orders" element={<Activities />} />
                <Route path="/orders/:id" element={<ActivityDetail />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="*" element={<Navigate to="/orders" replace />} />
            </Routes>
        </BrowserRouter>
    );
};