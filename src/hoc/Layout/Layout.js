import React from "react";
import Header from "../../components/Header/Header";
import "./Layout.css";

class Layout extends React.Component {
    render() {
        return (
            <div className="Layout">
                <header>
                    <Header />
                </header>
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout;