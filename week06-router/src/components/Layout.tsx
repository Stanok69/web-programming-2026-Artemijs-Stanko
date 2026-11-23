import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header userName="Alex Student" userInitials="AZ" course="Web Programming" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer note="Week 6 — Routing" />
    </div>
  );
}

export default Layout;
