import axios from "axios";
import React, { useEffect, useState } from "react";
import { searchListings } from "../actions/experience";
import InfoCard from "../components/cards/InfoCard";
import Mapbox from "../components/maps/Mapbox";
import queryString from "query-string";
import SearchForm from "../components/forms/SearchForm";
import FilterComponent from "../components/shared/FilterComponent";
import { getLowestPrice, updatePrice } from "../components/shared/Utils";
import NoResults from "../components/shared/NoResults";

const SearchResults = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const source = axios.CancelToken.source();

  useEffect(() => {
    const { location, date } = queryString.parse(window.location.search);
    setSearchLocation(location);
    handleSearchListings(location, date);

    return () => {
      source.cancel();
    };
  }, [window.location.search]);

  useEffect(() => {
    handleFilterByPrice(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  const handleSearchListings = async (location, date) => {
    const res = await searchListings({ location, date, source }, source.token);
    setExperiences(res.data);
    setFilteredData(res.data);
  };

  const handleFilterByPrice = (min, max) => {
    const updatedPrice = updatePrice(experiences)
    const priceFilter = updatedPrice.filter(
      (exp) => exp.price >= min && exp.price <= max
    )
    if (priceFilter.length > 0) {
      setFilteredData([...priceFilter]);
    } else {
      setFilteredData([...experiences]);
    }
  };

  const handleFilterByHighestDate = () => {
    const highest = experiences.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    });
    if (highest.length > 0) {
      setFilteredData([...highest]);
    } else {
      setFilteredData([...experiences]);
    }
  };

  const handleFilterByLowestDate = () => {
    const highest = experiences.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
    if (highest.length > 0) {
      setFilteredData([...highest]);
    } else {
      setFilteredData([...experiences]);
    }
  };

  return (
    filteredData.length > 0 ? (
    <>
    
      <main className="flex">
        <section className="flex-grow px-6">
          <div className="w-full pt-3 mb-3 ">
            <SearchForm />
          </div>
              <h1 className="text-3xl font-semibold mb-5 text-orange-500">
            {" "}
            experiences in {searchLocation}
          </h1>
          <div className="inline-flex mb-5 space-x-2 text-gray-800 whitespace-nowrap">
            <FilterComponent
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              handleFilterByHighestDate={handleFilterByHighestDate}
              handleFilterByLowestDate={handleFilterByLowestDate}
            />
          </div>
          <div className="flex flex-col">
            {filteredData &&
              filteredData.map((exp) => {
                return (
                  <InfoCard
                    key={exp._id}
                    exp={exp}
                    lowestPrice={getLowestPrice(exp.tickets)}
                  />
                );
              })}
          </div>
        
        </section>
        {filteredData && filteredData.length > 1 && (
          <section className="hidden xl:inline-flex xl:min-w-[800px]">
            <Mapbox experiences={filteredData} />
          </section>
        )}
      </main>
    </>
    ) : <NoResults message="Looks like there is no experiences out here..."/>
  );
};

export default SearchResults;
