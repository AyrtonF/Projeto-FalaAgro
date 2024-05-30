import React from "react";
import './Footer.css'

function Footer(){
    return(
        <div id="container-footer">
            <div id="margin-ajust">
                <div className="info-div-footer">
                    <h3>contato</h3>
                    <p>contato@falaagro.com</p>
                </div>
                <div className="info-div-footer">
                    <h3>instagram</h3>
                    <p>@falaagroapp</p>
                </div>
                <div className="info-div-footer">
                    <h3>numero</h3>
                    <p>+55 99 99999-9999</p> </div>
            </div>
        </div>
    )
}

export default Footer;