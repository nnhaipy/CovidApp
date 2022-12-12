import "./CSS/App.scss";
import { useEffect, useState } from "react";
import ContriesCovid from "./CountriesCovid/ContriesCovid";
import Pagination from "./Other/Pagination";
import Loadding from "./Other/Loadding";

function App() {
  const [isLoadding, setLoadding] = useState(false);
  const [ContriesList, setContriesList] = useState([]);
  const [currentpage, setcurrentPage] = useState(1);
  const [ItemPerPage] = useState(5);
  const [selected, setselected] = useState("Confirmed");
  useEffect(() => {
    async function FetchList() {
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

        const URL = "https://api.covid19api.com/summary";
        // const URL = "https://api.covid19api.com/countries";
        const res = await fetch(URL, requestOptions);
        const resJSON = await res.json();
        if (
          resJSON.Message === "Caching in progress" ||
          resJSON.Message !== ""
        ) {
          setContriesList(["Caching in progress"]);
        } else {
          const data = resJSON.Countries;
          if (data) {
            const Sortdata = data.sort((a, b) =>
              a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
            );
            setContriesList(Sortdata);
            // setContriesList(["Caching in progress"]);
          }
        }
        setLoadding(false);
      } catch (error) {
        console.log(error);
      }
    }
    FetchList();
  }, []);
  const IndexOfLastList = currentpage * ItemPerPage;
  const IndexOfFirstList = IndexOfLastList - ItemPerPage;

  const PageClickFunc = (pageNum) => {
    setcurrentPage(pageNum);
  };
  const handleChangeRadioButton = (event) => {
    setLoadding(true);
    const val = event.target.value;
    if (val === "Deaths") {
      const Sortdata = ContriesList.sort((a, b) =>
        a.TotalDeaths < b.TotalDeaths ? 1 : -1
      );
      setContriesList(Sortdata);
    } else if (val === "Recovered") {
      const Sortdata = ContriesList.sort((a, b) =>
        a.TotalRecovered < b.TotalRecovered ? 1 : -1
      );
      setContriesList(Sortdata);
    } else {
      const Sortdata = ContriesList.sort((a, b) =>
        a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
      );
      setContriesList(Sortdata);
    }
    setselected(event.target.value);
    setLoadding(false);
  };

  const currPageItemLIst = ContriesList
    ? ContriesList.slice(IndexOfFirstList, IndexOfLastList)
    : null;

  return (
    // <div className="Container">
    //   <CountryDesc />
    //   <div className="CovidContriesS">
    //     <ContriesCovid listcovid={currPageItemLIst} />
    //   </div>
    //   <div className="PaginationS">
    //     <Pagination
    //       className="PaginationS"
    //       ItemPerPage={ItemPerPage}
    //       TotalItem={ContriesList.length}
    //       pageClickFunction={PageClickFunc}
    //     />
    //   </div>
    // </div>
    <div className="App">
      {isLoadding ? (
        <Loadding />
      ) : (
        <div>
          {ContriesList.length > 1 ? (
            <div>
              <div className="Apphead">
                <div className="Apphead__header">CORONAVIRUS COVID19</div>
                <div className="Apphead__Sort">
                  <span>Sort by most total:</span>
                  <div className="Apphead__Sort--button">
                    <input
                      type="radio"
                      value="Confirmed"
                      name="Confirmed"
                      id="Confirmed"
                      onChange={handleChangeRadioButton}
                      checked={selected === "Confirmed"}
                    />
                    <span> Confirmed</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Deaths"
                      name="Deaths"
                      id="Deaths"
                      onChange={handleChangeRadioButton}
                      checked={selected === "Deaths"}
                    />
                    <span> Deaths</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Recovered"
                      name="Recovered"
                      id="Recovered"
                      onChange={handleChangeRadioButton}
                      checked={selected === "Recovered"}
                    />
                    <span> Recovered</span>
                  </div>
                </div>
                <ContriesCovid listcovid={currPageItemLIst} />
              </div>
              <div className="AppBot">
                <Pagination
                  className="AppBot__aginationS"
                  ItemPerPage={ItemPerPage}
                  TotalItem={ContriesList.length}
                  pageClickFunction={PageClickFunc}
                />
              </div>
            </div>
          ) : (
            <p>Caching in progress.Please Wait...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
