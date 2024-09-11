import React from "react";
import settingsIcon from "../assets/settingsIcon.svg";
import avatar from "../assets/avatar.png";
import searchIcon from "../assets/searchIcon.svg";
import scanIcon from "../assets/scanIcon.svg";
import searchDivider from "../assets/searchDivider.svg";
import { useSelector } from "react-redux";

const Topbar = () => {
  const selectedCategoryId = useSelector(
    (state) => state.categories.selectedCategoryId
  );
  const selectedSubCategoryId = useSelector(
    (state) => state.categories.selectedSubCategoryId
  );
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="bg-white flex justify-between items-center h-24 pl-6 pr-6 rounded-lg">
      <div>
        <h1 className="text-4xl font-semibold text-gray-800 mb-1">
          {categories.map((category) =>
            category.id === selectedCategoryId ? category.name : ""
          )}
        </h1>
        <p className="text-gray-600 text-sm">Cak Benu Food & Beverages</p>
      </div>
      <div className="flex items-center">
        <img className="pr-5" src={searchIcon} alt="" />
        <img src={searchDivider} alt="" />
        <input
          className="outline-none w-64 pt-2 pb-2 pr-5 pl-5"
          type="text"
          placeholder="Search or Scan for Items"
        />
        <img className="cursor-pointer" src={scanIcon} alt="" />
      </div>
      <div className="flex items-center cursor-pointer">
        <div className="user-profile mr-6 flex items-center pl-3 pr-5 pt-2 pb-2 rounded-lg">
          <img className="w-10" src={avatar} alt="" />
          <h3 className="text-white ml-3 text-base">Boy Raka</h3>
        </div>
        <img src={settingsIcon} alt="" />
      </div>
    </div>
  );
};

export default Topbar;
