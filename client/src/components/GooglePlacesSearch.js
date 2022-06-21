import React from "react";
import { Skeleton } from "antd";
import { Wrapper } from "@googlemaps/react-wrapper";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  MdHotel,
  MdLocalAirport,
  MdLocalGroceryStore,
  MdLocalHospital,
  MdLocationCity,
  MdLocationOn,
  MdRestaurant,
  MdSchool,
  MdTrain,
} from "react-icons/md";

const GooglePlacesSearch = ({ address, setAddress, handleSelect }) => {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
      libraries={["places"]}
    >
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div class="col-span-6">
            {/* location input  */}
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <div class="p-2">
                  <MdLocationOn size={16} />
                </div>
              </span>
              <input
                {...getInputProps({
                  placeholder: "search destination ...",
                  className: "location-search-input",
                })}
                type="text"
                className="
              w-full
              rounded-sm
              py-3
              pl-10
              px-[14px]
              border border-gray
              outline-none
              hover:outline-orange-500
              hover:outline-1
              focus-visible:shadow-none
              focus:border-primary
              "
              />
            </div>

            <div>
              {loading ? <Skeleton /> : null}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = {
                  padding: 5,
                  backgroundColor: suggestion.active ? "#F5F5F5" : "#ffffff",
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      className,
                    })}
                  >
                    <div className="flex flex-col cursor-pointer">
                      <div>
                        {(() => {
                          const typesList = suggestion.types;
                          switch (true) {
                            case typesList.includes("locality"):
                              return (
                                <MdLocationOn
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("hospital"):
                              return (
                                <MdLocalHospital
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("premise"):
                              return (
                                <MdLocationCity
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("grocery_or_supermarket"):
                              return (
                                <MdLocalGroceryStore
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("lodging"):
                              return (
                                <MdHotel
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("train_station"):
                              return (
                                <MdTrain
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("university"):
                              return (
                                <MdSchool
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("school"):
                              return (
                                <MdSchool
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("food"):
                              return (
                                <MdRestaurant
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            case typesList.includes("airport"):
                              return (
                                <MdLocalAirport
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                            default:
                              return (
                                <MdLocationOn
                                  className="float-left mr-2"
                                  size={24}
                                />
                              );
                          }
                        })()}
                        {suggestion.description}
                      </div>
                      <hr className="w-full text-gray-300 mt-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </Wrapper>
  );
};

export default GooglePlacesSearch;
