/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Menu } from "./components/Menu";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { Admin } from "./components/Admin";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Menu />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-base text-white font-sans selection:bg-primary/30">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
