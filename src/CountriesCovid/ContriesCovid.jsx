import React, { useState } from "react";
import PropTypes from "prop-types";
import Loadding from "../Other/Loadding";

ContriesCovid.propTypes = {
  listcovid: PropTypes.array,
  isLoading: PropTypes.bool,
};

ContriesCovid.defaultProps = {
  listcovid: [],
  isLoading: false,
};

function ContriesCovid(props) {
  const { listcovid } = props;
  const [isPopUp, setPopUp] = useState(false);
  const [isLoading, setLoadding] = useState(false);
  const [CountryDesc, setCountryDesc] = useState({
    official: "",
    population: 0,
    capital: [],
    region: "",
    subregion: "",
    flagsURL: "",
  });
  const handlePopup = () => {
    setPopUp(false);
  };
  const FetchCountryDesc = async (name) => {
    try {
      setLoadding(true);
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const URL = `https://restcountries.com/v3.1/name/${name}`;
      // const URL = "https://api.covid19api.com/countries";
      const res = await fetch(URL, requestOptions);
      const resJSON = await res.json();
      const data = resJSON;
      //const data = resJSON;
      if (data) {
        setCountryDesc({
          official: data[0].name.official,
          population: data[0].population,
          capital: data[0].capital,
          region: data[0].region,
          subregion: data[0].subregion,
          flagsURL: data[0].flags.png,
        });
      }
      setLoadding(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Apphead__ContriesList">
      {isPopUp && (
        <div className="CountryPopup" id="modal" onClick={handlePopup}>
          {isLoading ? (
            <Loadding />
          ) : (
            <div className="CountryPopup__Content">
              <button onClick={handlePopup}>x</button>
              <div className="CountryPopup__Content--item">
                <img src={CountryDesc.flagsURL} />
                <div
                  className="CountryPopup__Content--desc"
                  style={{
                    fontSize: "1.8rem",
                    color: "rgba(100, 58, 122, .8)",
                  }}
                >
                  {" "}
                  <span>{CountryDesc.official}</span>
                </div>
                <div className="CountryPopup__Content--desc">
                  <span>Population: </span>
                  <span>{CountryDesc.population}</span>
                </div>
                <div className="CountryPopup__Content--desc">
                  <span>Capital: </span>
                  <span>{CountryDesc.capital}</span>
                </div>
                <div className="CountryPopup__Content--desc">
                  <span>Region: </span>
                  <span>{CountryDesc.region}</span>
                </div>
                <div className="CountryPopup__Content--desc">
                  <span>Subregion: </span>
                  <span>{CountryDesc.subregion}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <ul>
        {listcovid.map((item) => (
          <li
            key={item.ID}
            onClick={() => {
              setPopUp(true);
              FetchCountryDesc(item.Country);
            }}
          >
            <div className="CountryContainer">
              <div className="CountryContainer__Top">
                <div className="CountryContainer__Top--Name">
                  <span>{item.Country}</span>
                </div>
              </div>
              <div className="CountryContainer__Fill">
                <div className="CountryContainer__Fill--other">
                  <span>Confirmed</span>
                  <p>{item.TotalConfirmed}</p>
                </div>
                <div className="CountryContainer__Fill--other">
                  <span>Deaths</span>
                  <p>{item.TotalDeaths}</p>
                </div>
                <div className="CountryContainer__Fill--other">
                  <span>Recovered</span>
                  <p>{item.TotalRecovered}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContriesCovid;
