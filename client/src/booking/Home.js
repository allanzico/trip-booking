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
    }
  };

  const handleExperienceEdit = () => {};
  return (
<>

<div className="container mx-auto mt-10">
      <div className="flex items-center justify-center mb-2">
        <PageTitle>Lorem ipsum dolor sit am</PageTitle>
      </div>
      <p className="flex text-xl items-center justify-center mb-2">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
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
</>
  );
};

export default Home;
