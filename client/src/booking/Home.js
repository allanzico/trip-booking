import { Button, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { getExperiences } from "../actions/experience";
import { useSelector } from "react-redux";
import SearchForm from "../components/forms/SearchForm";
import PageTitle from "../components/Typography/PageTitle";
import HomeSVG from "../images/HomeSVG";
import SmallCard from "../components/cards/SmallCard";
import { diffDays } from "../actions/experience";
import { MdTimer } from "react-icons/md";
import MediumCard from "../components/cards/MediumCard";
import MainFooter from "../components/footers/MainFooter";
import axios from "axios";
import HeroSVG from "../images/HeroSVG";
import ImageComponent from "../components/shared/ImageComponent";

const Home = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [experiences, setExperiences] = useState([]);
  const source = axios.CancelToken.source();
  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    let res = await getExperiences(source.token);
    setExperiences(res.data);
    return () => {
      source.cancel();
    };
  };

  const handleExperienceEdit = () => {};
  return (
    <>
<div className="flex flex-col container mx-auto mt-10">
      <div className="flex items-center justify-center mb-2">
        <h1 className="text-orange-500 uppercase font-bold text-2xl md:text-4xl">Explore new adventures</h1>
 
      </div>
      <p className="flex text-xl items-center justify-center mb-2">
        Your next adventure is out there, let us help you find it
      </p>
      <div className="flex items-center justify-center mb-2 p-10 bg-gray-100">
        <SearchForm />
      </div>
      <main className="max-w-7xl mx-auto ">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold text-gray-700">
            Closing soon...
          </h2>
          <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-4">
            {experiences.map((exp) => {
              return (
                diffDays(new Date(), exp.startDate) <= 10 && (
                  <SmallCard
                    key={exp._id}
                    exp={exp}
                    img={`${exp.files.length > 0 ? exp.files[0].url : "https://via.placeholder.com/900x500.png?text=PREVIEW"}`}
                  />
                )
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8 text-gray-700 ">
            Popular Destinations
          </h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {experiences.map((exp) => {
              return (
                <MediumCard
                  key={exp._id}
                  exp={exp}
                  img="https://cdn.pixabay.com/photo/2020/10/14/19/49/santorini-5655299_960_720.jpg"
                />
              );
            })}
          </div>
        </section>
      </main>
      
    </div>
    <MainFooter />




      {/* <div className="flex flex-col gap-24 container w-full mx-auto mt-2">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600] 2xl:h-[700]">
          <ImageComponent
            src="https://cdn.pixabay.com/photo/2016/11/13/00/16/satellite-1820106_960_720.jpg"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-1/2 w-full text-center">
            <p className="md:text-4xl text-2xl text-white font-semibold">
              Your next experience is out there...
            </p>
          </div>
          <div className="absolute top-3/4 w-full md:px-5 lg:px-8 text-center">
            <div className=" mb-2 p-10 rounded-lg bg-slate-50">
              <SearchForm />
            </div>
          </div>
        </div>
        <main className="max-w-7xl mx-auto">
          <section className="pt-6">
            <h2 className="text-4xl font-semibold text-gray-700">
              Closing soon...
            </h2>
            <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-4">
              {experiences.map((exp) => {
                return (
                  diffDays(exp.startDate, exp.endDate) <= 50 && (
                    <SmallCard
                      key={exp._id}
                      exp={exp}
                      img={`${process.env.REACT_APP_API}/experience/image/${exp._id}`}
                    />
                  )
                );
              })}
            </div>
          </section>
          <section>
            <h2 className="text-4xl font-semibold py-8 text-gray-700 ">
              Popular Destinations
            </h2>
            <div className="flex space-x-3 overflow-scroll p-3 -ml-3">
              {experiences.map((exp) => {
                return (
                  <MediumCard
                    key={exp._id}
                    exp={exp}
                    img="https://cdn.pixabay.com/photo/2020/10/14/19/49/santorini-5655299_960_720.jpg"
                  />
                );
              })}
            </div>
          </section>
        </main>
      </div>
      <MainFooter /> */}
    </>
  );
};

export default Home;
