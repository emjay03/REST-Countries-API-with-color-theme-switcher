import React, { useState, useEffect, SyntheticEvent } from "react";
import {
  AiOutlineSearch,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { PropagateLoader } from "react-spinners";

function Counties() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("countryList");
  const [searchQuery, setSearchQuery] = useState("");

  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  let [loading, setLoading] = useState(true);
  const colorloading = darkModeEnabled ? "#ffffff" : "#202C37";

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true); // Show the loading indicator
      try {
        const res = await fetch(`https://restcountries.com/v2/all`);
        const data = await res.json();

        setCountries(data);

        setLoading(false); // Hide the loading indicator
      } catch (err) {
        setErrorMessage(err.message);
        setLoading(false); // Hide the loading indicator
      }
    };
    let timeoutId = setTimeout(() => {
      setLoading(false);
      setErrorMessage("");
    }, 10000); // Show the loading indicator for 5 seconds
    setSearchQuery(""); // Reset the search query
    fetchCountries();

    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts
  }, []);

  const toggleDarkMode = () => {
    setDarkModeEnabled((prevDarkModeEnabled) => !prevDarkModeEnabled);
    if (darkModeEnabled) {
      document.body.classList.remove("dark-mode-body");
    } else {
      document.body.classList.add("dark-mode-body");
    }
  };
  const handleRegionChange = (event) => {
    setLoading(true); // Show the loading indicator
    setTimeout(() => {
      setLoading(false); // Hide the loading indicator
      setPage(0);
      setRegion(event.target.value);
    }, 900); // 1 second (1000 milliseconds) delay
  };
  if (loading) {
    return (
      <div className="sweet-loading flex justify-center items-center h-screen">
        <PropagateLoader color={colorloading} />
      </div>
    );
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setCurrentPage("countryDetail");
  };

  const handleBackButtonClick = () => {
    setSelectedCountry(null);
    setCurrentPage("countryList");
  };

  const handleSearch = (event: SyntheticEvent) => {
    setSearchQuery(event.target.value);

    setPage(0);
  };

  const filteredCountries = countries.filter((country) => {
    if (searchQuery) {
      return country.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (region) {
      return country.region === region;
    }
    return true;
  });
  const numPages = Math.ceil(filteredCountries.length / pageSize);
  return (
    <div className="max-w-[1440px] m-auto ">
      <div className={darkModeEnabled ? "dark-mode-nav" : "light-mode-nav"}>
        <div className="flex justify-between items-center px-4 sm:px-16 py-6 shadow-lg">
          <div>
            <h1 className="font-[800] sm:text-2xl text-base ">
              Where in the world?
            </h1>
          </div>
          <div className="flex justify-center items-center ">
            <MdOutlineDarkMode size={20} />
            <button
              className="sm:text-base text-sm font-[600] pl-2 "
              onClick={toggleDarkMode}
            >
              Dark Mode
            </button>
          </div>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {currentPage === "countryList" && (
        <div>
          <div className="flex justify-between md:flex-row flex-col px-4 sm:px-16 py-6 gap-10  ">
            <div
              className={
                darkModeEnabled ? "dark-mode-nav-search" : "light-mode-nav "
              }
            >
              <div className="flex items-center gap-2 max-w-full  text-Darkgray rounded-lg px-4 shadow-lg">
                <AiOutlineSearch className="icon-search" size={25} />
                <input
                  className="outline-none font-[300] placeholder-Darkgray bg-transparent w-[400px] py-4 pl-4  text-Darkgray"
                  placeholder="Search for a country.."
                  type="text"
                  onChange={handleSearch}
                  value={searchQuery}
                />
              </div>
            </div>

            <div
              className={`${
                darkModeEnabled ? "dark-mode-filter" : "light-mode-filter"
              } relative rounded-lg`}
            >
              <select
                className="w-full outline-none border-none font-[600] p-4  pr-[100px] rounded-lg shadow-lg"
                value={region}
                onChange={handleRegionChange}
                style={{ appearance: "none" }}
              >
                <option value="">All region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className=" px-4 sm:px-16  grid lg:grid-cols-4 mb:grid-cols-3 sb:grid-cols-2 py-10 gap-12">
            {filteredCountries
              .slice(page * pageSize, (page + 1) * pageSize)
              .map((country) => (
                <div
                  className="shadow-2xl bg-white rounded-lg  cursor-pointer"
                  key={country.name}
                  onClick={() => handleCountryClick(country)}
                >
                  <img
                    className="w-full h-[180px] object-cover rounded-t-lg "
                    src={country.flag}
                    alt={`Flag of ${country.name}`}
                  />
                  <div className="px-4 py-2 pb-10">
                    <div className="px-4">
                      <h4 className="font-[800] py-4">{country.name}</h4>

                      <p className="font-[600] ">
                        Population:{" "}
                        <span className="font-[300] ">
                          {country.population.toLocaleString()}
                        </span>
                      </p>
                      <p className="font-[600]">
                        {" "}
                        Region:{" "}
                        <span className="font-[300]">{country.region}</span>
                      </p>
                      <p className="font-[600]">
                        Capital:{" "}
                        <span className="font-[300]">{country.capital}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {filteredCountries.length === 0 && <p>Country not found</p>}
          </div>

          <div className="flex justify-center items-center gap-4">
            {page > 0 && numPages > 1 && (
              <button
                className={`${
                  darkModeEnabled ? "dark-mode-bg" : ""
                } flex    justify-center items-center  shadow-lg px-6 py-4 font-[600]`}
                onClick={() => setPage(page - 1)}
              >
                <AiOutlineArrowLeft />
                Previous
              </button>
            )}
            {page < numPages - 1 && numPages > 1 && (
              <button
                className={`${
                  darkModeEnabled ? "dark-mode-bg" : ""
                } flex    justify-center items-center  shadow-lg px-6 py-4 font-[600]`}
                onClick={() => setPage(page + 1)}
              >
                Next
                <AiOutlineArrowRight />
              </button>
            )}
          </div>
        </div>
      )}

      {currentPage === "countryDetail" && (
        <div className="w-full px-4 sm:px-16 py-6 leading-8 ">
          <button
            className={`${
              darkModeEnabled ? "dark-mode-bg" : ""
            } flex    justify-center items-center  shadow-lg px-10 py-4 my-7 rounded-lg font-[600]`}
            onClick={handleBackButtonClick}
          >
            <AiOutlineArrowLeft /> Back
          </button>
          <div className="xl:px-0 mb:px-[100px] px-0">
            <div className="w-full   flex xl:flex-row flex-col gap-7 mt-10  ">
              <div className="xl:w-[50%]  w-full ">
                <img
                  className="w-full  h-[400px] object-cover shadow-lg"
                  src={selectedCountry.flag}
                  alt={`Flag of ${selectedCountry.name}`}
                />
              </div>
              <div className="xl:w-[50%] w-full flex justify-center items-center">
                <div className="w-full  md:grid grid-cols-2 ">
                  <h2 className="col-start-1 col-span-2 font-[800] text-2xl xl:py-10 py-10">
                    {selectedCountry.name}
                  </h2>
                  <div className="pr-16 ">
                    <p className="font-[600] ">
                      Native name:
                      <span className="font-[300] ">
                        {" "}
                        {selectedCountry.nativeName}
                      </span>
                    </p>
                    <p className="font-[600] ">
                      Population:
                      <span className="font-[300] ">
                        {" "}
                        {selectedCountry.population.toLocaleString()}
                      </span>
                    </p>
                    <p className="font-[600] ">
                      Region:{" "}
                      <span className="font-[300] ">
                        {" "}
                        {selectedCountry.region}
                      </span>
                    </p>
                    <p className="font-[600] ">
                      Subregion:{" "}
                      <span className="font-[300] ">
                        {" "}
                        {selectedCountry.subregion}
                      </span>
                    </p>
                    <p className="font-[600] ">
                      Capital:{" "}
                      <span className="font-[300] ">
                        {" "}
                        {selectedCountry.capital}
                      </span>
                    </p>
                  </div>

                  <div className="xl:p-0 py-7">
                    <p>Top Level Domain: {selectedCountry.topLevelDomain}</p>
                    {selectedCountry.currencies && (
                      <p>
                        Currencies:{" "}
                        {selectedCountry.currencies
                          .map((currency) => currency.name)
                          .join(", ")}
                      </p>
                    )}

                    {selectedCountry.languages && (
                      <p>
                        Languages:{" "}
                        {selectedCountry.languages
                          .map((language) => language.name)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <div></div>
                  <div className="flex  items-center col-start-1 col-span-2 md:py-7 py-0">
                    <p className="font-[600]">Bordering Countries: </p>

                    {selectedCountry.borders &&
                    selectedCountry.borders.length > 0 ? (
                      <div>
                        {selectedCountry.borders.map((borderCountryCode) => {
                          const borderCountry = countries.find(
                            (country) =>
                              country.alpha3Code === borderCountryCode
                          );
                          return (
                            <button
                              className={`${
                                darkModeEnabled ? "dark-mode-bg" : ""
                              } m-2 px-4 shadow-lg  `}
                              key={borderCountry.alpha3Code}
                              onClick={() => handleCountryClick(borderCountry)}
                            >
                              {" "}
                              {borderCountry.name}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <button className="px-4 shadow-lg">N/A</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Counties;
