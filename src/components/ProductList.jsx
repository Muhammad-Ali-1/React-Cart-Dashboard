import React from "react";
import { useSelector, useDispatch } from "react-redux";
import arrowIcon from "../assets/arrowIcon.svg";
import { addToCart } from "../features/cart/cartSlice";

const ProductList = () => {
  const selectedCategoryId = useSelector(
    (state) => state.categories.selectedCategoryId
  );
  const selectedSubCategoryId = useSelector(
    (state) => state.categories.selectedSubCategoryId
  );
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const handleAddToCart = (id, name, price, quantity) => {
    dispatch(addToCart({ id, name, price, quantity }));
  };

  return (
    <>
      <div className="overflow-y-auto h-full flex-1">
        <div>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              {categories?.map(
                (category) =>
                  category.id === selectedCategoryId && (
                    <h2
                      key={category.id}
                      className="text-lg font-semibold text-gray-700"
                    >
                      {category.name}
                    </h2>
                  )
              )}
            </div>
            {selectedSubCategoryId && (
              <>
                <img src={arrowIcon} alt="" />
                <div>
                  <p className="text-sm text-gray-500">Sub Category</p>
                  {categories?.map(
                    (category) =>
                      category.id === selectedCategoryId &&
                      category.subCategories?.map(
                        (subCategory) =>
                          subCategory.id === selectedSubCategoryId && (
                            <h2
                              key={subCategory.id}
                              className="text-lg font-semibold text-gray-700"
                            >
                              {subCategory.name}
                            </h2>
                          )
                      )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="items flex flex-wrap mt-5">
          {selectedSubCategoryId &&
            categories?.map((category) =>
              category.id == selectedCategoryId
                ? category.subCategories?.map((subCategory) =>
                    subCategory.id == selectedSubCategoryId
                      ? subCategory.items?.map((item) => (
                          <div
                            key={item.id}
                            className="card bg-gray-400 w-2/6 h-56 rounded-lg p-4 mb-5 hover:border-4 relative fade-in"
                          >
                            <div className="text-white font-semibold price w-28 p-2 text-sm flex justify-center rounded-lg mb-3">
                              Rp {item.price}
                            </div>
                            <div className="item-name">
                              <h2 className="bg-white text-sm p-3 rounded-lg font-semibold inline-block">
                                {item.name}
                              </h2>
                            </div>
                            <div className="flex justify-center">
                              <button
                                className="absolute bottom-4 w-28 h-8 green-bg rounded-md text-white"
                                onClick={() =>
                                  handleAddToCart(
                                    item.id,
                                    item.name,
                                    item.price,
                                    1
                                  )
                                }
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))
                      : ""
                  )
                : ""
            )}
          {!selectedSubCategoryId &&
            categories?.map((category) =>
              category.id == selectedCategoryId
                ? category.subCategories?.map((subCategory) =>
                    subCategory.items?.map((item) => (
                      <div
                        key={item.id}
                        className="card bg-gray-400 w-2/6 h-56 rounded-lg p-4 mb-5 hover:border-4 relative fade-in"
                      >
                        <div className="text-white font-semibold price w-28 p-2 text-sm flex justify-center rounded-lg mb-3">
                          Rp {item.price}
                        </div>
                        <div className="item-name">
                          <h2 className="bg-white text-sm p-3 rounded-lg font-semibold inline-block">
                            {item.name}
                          </h2>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="absolute bottom-4 w-28 h-8 green-bg rounded-md text-white"
                            onClick={() =>
                              handleAddToCart(item.id, item.name, item.price, 1)
                            }
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))
                  )
                : ""
            )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
