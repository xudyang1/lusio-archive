export default function Footer() {
    return (
        <div>
            <footer className="page-footer" >
                <div className="container" >
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Footer Content</h5>
                            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a href="https://github.com/xudyang1/CSE416_Lusio" className="grey-text text-lighten-3" style={{ fontSize: "1.5em" }}>Github</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        {/* © 2021 Copyright Text */}
                        {/* <a className="grey-text text-lighten-4 right" href="#!">More Links</a> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}