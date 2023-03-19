import Head from "next/head";
import React from "react";
import { Footer } from "./footer";
import { NavBar } from "./nav-bar";

export function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Biggas Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
