import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getExperiences } from "../../actions/experience";

import HorizontalCard from "../../components/cards/HorizontalCard";
import InfoCard from "../../components/cards/InfoCard";
import MainFooter from "../../components/footers/MainFooter";
import ExperiencesHeader from "../../components/headers/ExperiencesHeader";
import Mapbox from "../../components/maps/Mapbox";
import PageTitle from "../../components/Typography/PageTitle";
import { useIsMounted } from "../../hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperiences } from "../../Redux/reducers/experiences";
import useFetch from "../../hooks/useFetch";
import { getLowestPrice } from "../../components/shared/Utils";

const Experiences = () => {
  const experiences = useSelector((state) => state.experiences.experiences);
  return (
    <div className="h-screen ">
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">20+ experiences</p>
          <h1 className="text-3xl font-semibold mb-5 text-orange-500">
            {" "}
            experiences in "city"{" "}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="filter-component-button">Button</p>
            <p className="filter-component-button">Another Button</p>
            <p className="filter-component-button">More Button</p>
            <p className="filter-component-button">Cool Button</p>
          </div>
          <div className="flex flex-col">
            {experiences &&
              experiences.map((exp) => {
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
        {/* <section className="hidden xl:inline-flex xl:min-w-[800px]">
          <Mapbox experiences={experiences} />
        </section> */}
      </main>
    </div>
  );
};

export default Experiences;
