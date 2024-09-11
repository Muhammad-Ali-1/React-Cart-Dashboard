import React from "react";
import ProductList from "./ProductList";
import OrderSummary from "./OrderSummary";

const DashboardContent = () => {
  return (
    <div className="flex flex-1 h-full overflow-hidden mt-4">
      <ProductList />
      <OrderSummary />
    </div>
  );
};

export default DashboardContent;
