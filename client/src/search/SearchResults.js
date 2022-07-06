import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getExperiences, searchListings } from "../actions/experience";
import HorizontalCard from "../components/cards/HorizontalCard";
import InfoCard from "../components/cards/InfoCard";
import MainFooter from "../components/footers/MainFooter";
import ExperiencesHeader from "../components/headers/ExperiencesHeader";
import Mapbox from "../components/maps/Mapbox";
import PageTitle from "../components/Typography/PageTitle";
import { useIsMounted } from "../hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperiences } from "../Redux/reducers/experiences";
import queryString from "query-string";
import { Link } from "react-router-dom";
import SearchForm from "../components/forms/SearchForm";
import FilterComponent from "../components/shared/FilterComponent";
import useFetch from "../hooks/useFetch";

const SearchResults = () => {

  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  
  useEffect(() => {
    const { location, date } = queryString.parse(window.location.search);
    setSearchLocation(location);
    searchListings({ location, date }).then((res) => {
      console.log(res.data)
      setExperiences(res.data);
    });
  }, [window.location.search]);


  useEffect(() => {
    handleFilterByPrice(minPrice, maxPrice)
  }, [minPrice, maxPrice])
  

  const handleFilterByPrice = (min, max) => { 
    const filteredData = experiences.filter(experience => {
      return experience.price >= min && experience.price <= max;
    })

    
  }

 
  const handleExperienceEdit = () => {};
  return (
    <>
    <div className="h-screen">
      <main className="flex">
        <section className="flex-grow px-6">


          <div className="w-full pt-3 mb-3 ">
            <SearchForm />
          </div>
          <p className="text-xs pt-1">20+ experiences</p>
          <h1 className="text-3xl font-semibold mb-5 text-orange-500">
            {" "}
            experiences in {searchLocation}
          </h1>
          <div className="inline-flex mb-5 space-x-2 text-gray-800 whitespace-nowrap">

          <FilterComponent minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          
          </div>
          <div className="flex flex-col">
            {experiences.map((exp) => {
              return (
                <InfoCard
                  key={exp._id}
                  exp={exp}
                  handleExperienceEdit={handleExperienceEdit}
                />
              );
            })}
          </div>
        </section>
        {experiences && experiences.length > 1 && (
          <section className="hidden xl:inline-flex xl:min-w-[800px]">
            <Mapbox experiences={experiences} />
          </section>
        )}
      </main>
     
    </div>
     <MainFooter />
     </>
  );
};

export default SearchResults;
