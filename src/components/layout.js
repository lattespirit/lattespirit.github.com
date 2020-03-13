import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"

export default ({ children }) => (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
        <Header />

        {children}

        <Footer />
    </div >
)