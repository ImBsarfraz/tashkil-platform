import React from "react";
import { Link } from "react-router-dom";
import kaabaBg from "../assets/kabaBg.png";

const Hero = () => {
    return (
        <section
            className="d-flex align-items-center text-white"
            style={{
                minHeight: "92vh",
                backgroundImage: `url(${kaabaBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative"
            }}
        >
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.45))"
                }}
            ></div>


            {/* Content */}
            <div className="container text-center position-relative">
                <h1 className="fw-bold display-4 mb-3">
                    TAHRIK E IMAAN, JEUR
                </h1>

                <p className="lead mb-4 text-light">
                    The level of religion, the effort for religion, the faith, and the deeds that the Prophet of Allah left behind—reviving <br />that same level of religion, religious effort, faith, and deeds in this era.
                </p>

                {/* Quran Verse */}
                <div
                    className="mx-auto mb-4 p-3 rounded-3"
                    style={{
                        maxWidth: "700px",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(6px)"
                    }}
                >
                    <small className="text-warning fw-semibold">
                        Qur’an 9:24
                    </small>
                    <p className="mb-0 small fst-italic text-light opacity-90">
                        “If your fathers, your sons, your brothers, your wives,
                        your relatives, the wealth you have acquired, the commerce
                        you fear may decline, and the homes you love are more beloved
                        to you than Allah and His Messenger and striving in His cause,
                        then wait until Allah brings about His command.”
                    </p>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3">
                    <Link
                        to="/tashkils/create"
                        className="btn btn-warning px-4 rounded-pill fw-semibold"
                    >
                        Add Tashkil
                    </Link>

                    <Link
                        to="/tashkils"
                        className="btn btn-outline-light px-4 rounded-pill"
                    >
                        View Tashkils
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
