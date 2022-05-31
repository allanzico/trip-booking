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
import queryString from 'query-string'
import { Link } from "react-router-dom";
import SearchForm from "../components/forms/SearchForm";



const SearchResults = () => {
   // const experiences = useSelector((state) => state.experiences.experiences);
    // const dispatch = useDispatch()
    // const source = axios.CancelToken.source();
    const [searchLocation, setSearchLocation] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [experiences, setExperiences] = useState([])
    useEffect(() => {
        const {location, date} = queryString.parse(window.location.search)
        setSearchLocation(location)
        searchListings({location, date}).then(res => {
            setExperiences(res.data)
        })
      }, [window.location.search]);

    // useEffect(() => {
    //   loadExperiences();
    //   return () => {
    //     source.cancel();
    //   };
    // }, []);
    
    const handleExperienceEdit = () => {};
    return (
      <div className="h-screen">
      <div className="w-full pt-14 pl-12 pr-12 container mx-auto">
        <SearchForm />
      </div>
        <main className="flex">
          <section className="flex-grow pt-14 px-6">
            <p className="text-xs">20+ experiences</p>
            <h1 className="text-3xl font-semibold mb-5 text-orange-500">
              {" "}
              experiences in {searchLocation}
            </h1>
            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="filter-component-button">Button</p>
              <p className="filter-component-button">Another Button</p>
              <p className="filter-component-button">More Button</p>
              <p className="filter-component-button">Cool Button</p>
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
          {experiences && experiences.length > 1 &&
          <section className="hidden xl:inline-flex xl:min-w-[800px]">
               <Mapbox experiences={experiences} />
            
          </section> }
        </main>
        <MainFooter/>
      </div>
    );
}

export default SearchResults