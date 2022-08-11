import { Button } from "react-bootstrap"

function Footer() {

    return (<div>
        <footer className="main-footer mt-3 bg-dark text-white">
            <div className="row text-center mt-4">
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <aside className="footer-widget">
                        <ul className="list">
                            <li><a href="#">Who We Are</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Get the app</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Contact us</a></li>

                        </ul>

                    </aside>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">

                    <aside className="footer-widget">

                        <ul className="list">

                            <li><a href="#">Carrers</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Help and Support</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Affiliate</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Investors</a></li>

                        </ul>

                    </aside>

                </div><div className="col-lg-3 col-md-6 col-sm-12">

                    <aside className="footer-widget">

                        <ul className="list">

                            <li><a href="#">Terms</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Privacy policy</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Cookie settings</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Sitemap</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#">Accessibility statement</a></li>

                        </ul>

                    </aside>

                </div><div className="col-lg-3 col-md-6 col-sm-12">

                    <aside className="footer-widget">

                        <ul className="list">

                            <li><a href="#"><Button variant="light" className="text-dark">English</Button></a></li>

                            <li></li>

                            <li></li>

                            <li><a href="#"></a></li>

                            <li><a href="#"></a></li>

                            <li><a href="#"></a></li>

                            <li><a href="#"></a></li>

                            <li><a href='#'>&copy; 2022 FoodZone</a></li>

                        </ul>

                    </aside>

                </div>

            </div>

        </footer>

    </div>)
}
export default Footer