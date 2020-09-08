//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

//> CSS
import "./sponsors.scss";
//> Images
import anexiaIMG from "../.././../../assets/sponsors/anexia.svg";
import netcupIMG from "../.././../../assets/sponsors/netcup.svg";
//#endregion

//#region > Constant Variables
const data = [
  { src: anexiaIMG, alt: "Anexia", web: "https://anexia.com" },
  { src: netcupIMG, alt: "Netcup", web: "https://www.netcup.de" },
];
//#endregion

//#region > Components
/** @class The sponsors section component */
class Sponsors extends React.PureComponent {
  render() {
    return (
      <div id="sponsors">
        <MDBContainer className="py-5 text-center text-dark">
          <h2 className="gidole h1-responsive font-weight-bold">
            Special thanks to our sponsors
          </h2>
          <p className="lead">
            Without the help and support of our <strong>sponsors</strong> the development of
            our <strong>open source</strong> social network SNEK would hardly be possible.
          </p>
          <MDBRow className="flex-center">
            {data.map((item, i) => {
              return (
                <MDBCol sm="2" className="p-3" key={i}>
                  <a href={item.web} target="_blank">
                    <img src={item.src} alt={item.alt} className="img-fluid" />
                  </a>
                </MDBCol>
              );
            })}
          </MDBRow>
          <MDBRow className="flex-center">
            <MDBBtn
              color="white"
              className="btn-underlined-green"
              href="mailto:info@snek.at"
            >
              Work with us
              <MDBIcon icon="users" className="pl-1 green-text" />
            </MDBBtn>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default Sponsors;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
