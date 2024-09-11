import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setSubCategory,
} from "../features/categories/categoriesSlice";
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const defaultCategoryId = categories.length > 0 ? categories[0].id : "";

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(defaultCategoryId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");

  useEffect(() => {
    if (defaultCategoryId) {
      dispatch(setCategory(defaultCategoryId));
    }
  }, [defaultCategoryId, dispatch]);

  const handleCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    dispatch(setCategory(categoryId));
    setSelectedSubCategoryId("");
    dispatch(setSubCategory(""));
  };

  const handleSubCategory = (subCategoryName) => {
    setSelectedSubCategoryId(subCategoryName);
    dispatch(setSubCategory(subCategoryName));
  };

  return (
    <div className="sidebar bg-white h-screen flex flex-col items-center pt-8">
      <div className="sidebar-left"></div>
      <img className="w-9" src={logo} alt="Logo" />
      <div className="sidebar-items mt-10 flex flex-col items-center gap-5 relative">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative flex flex-col items-center"
          >
            <NavLink
              to={`/${category.name}`}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-20 h-20 ml-3 mr-3 rounded-lg gap-1 relative ${
                  isActive || selectedCategoryId === category.id
                    ? "active fade-in"
                    : ""
                }`
              }
              onClick={() => handleCategory(category.id)}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive || selectedCategoryId === category.id
                        ? category.whiteIcon
                        : category.greyIcon
                    }
                    alt={category.name}
                  />
                  <h4
                    className={`text-sm text-gray-500 ${
                      isActive || selectedCategoryId === category.id
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {category.name}
                  </h4>
                </>
              )}
            </NavLink>
            {category.id === selectedCategoryId && category.subCategories && (
              <div className=" sub-categories left-28 absolute top-1/2 transform -translate-y-1/2 w-32 flex flex-col items-center rounded-tr-lg rounded-br-lg gap-1 pt-5 pb-5 mt-4 bg-white shadow-lg">
                {category.subCategories.map((subCategory) => (
                  <NavLink
                    key={subCategory.id}
                    to={`/${category.name}/${subCategory.name}`}
                    className={({ isActive }) =>
                      `z-30 sub-category flex flex-col items-center gap-1 w-20 h-20 ${
                        isActive ? "sub-active" : ""
                      }`
                    }
                    onClick={() => handleSubCategory(subCategory.id)}
                  >
                    {({ isActive }) => (
                      <div
                        className={`subcategory-content flex flex-col items-center justify-center rounded-lg w-20 h-20 gap-1 ${
                          isActive ? "subcategory-active-bg" : ""
                        }`}
                      >
                        <img
                          src={
                            isActive
                              ? subCategory.whiteIcon
                              : subCategory.greyIcon
                          }
                          alt={subCategory.name}
                        />
                        <h4
                          className={`text-sm  ${
                            isActive ? "text-white" : "grey-text"
                          }`}
                        >
                          {subCategory.name}
                        </h4>
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
