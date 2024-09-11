import { createSlice, nanoid } from "@reduxjs/toolkit";
import foodsIconWhite from "../../assets/foodsIconWhite.svg";
import foodsIconGrey from "../../assets/foodsIconGrey.svg";
import drinksIconWhite from "../../assets/drinksIconWhite.svg";
import drinksIconGrey from "../../assets/drinksIconGrey.svg";
import snackIconWhite from "../../assets/snackIconWhite.svg";
import snackIconGrey from "../../assets/snackIconGrey.svg";
import dessertIconWhite from "../../assets/dessertIconWhite.svg";
import dessertIconGrey from "../../assets/dessertIconGrey.svg";
import packageIconWhite from "../../assets/packageIconWhite.svg";
import packageIconGrey from "../../assets/packageIconGrey.svg";
import chickenIconGrey from "../../assets/chickenIconGrey.svg";
import chickenIconWhite from "../../assets/chickenIconWhite.svg";
import fishIconGrey from "../../assets/fishIconGrey.svg";
import fishIconWhite from "../../assets/fishIconWhite.svg";
import pizzaIconGrey from "../../assets/pizzaIconGrey.svg";
import pizzaIconWhite from "../../assets/pizzaIconWhite.svg";
import pastaIconGrey from "../../assets/pastaIconGrey.svg";
import pastaIconWhite from "../../assets/pastaIconWhite.svg";

const initialState = {
  categories: [
    {
      id: nanoid(),
      name: "Foods",
      greyIcon: foodsIconGrey,
      whiteIcon: foodsIconWhite,
      subCategories: [
        {
          id: nanoid(),
          name: "Chicken",
          greyIcon: chickenIconGrey,
          whiteIcon: chickenIconWhite,
          items: [
            { id: nanoid(), name: "Grilled Chicken with Herbs", price: 25000 },
            { id: nanoid(), name: "Spicy Chicken Wings", price: 18000 },
            { id: nanoid(), name: "Chicken Alfredo Pasta", price: 30000 },
            { id: nanoid(), name: "Chicken Caesar Salad", price: 22000 },
            { id: nanoid(), name: "Chicken Parmesan", price: 34000 },
          ],
        },
        {
          id: nanoid(),
          name: "Sea Food",
          greyIcon: fishIconGrey,
          whiteIcon: fishIconWhite,
          items: [
            {
              id: nanoid(),
              name: "Grilled Salmon with Lemon Butter",
              price: 45000,
            },
            { id: nanoid(), name: "Shrimp Scampi", price: 38000 },
            { id: nanoid(), name: "Lobster Bisque", price: 50000 },
            { id: nanoid(), name: "Fish Tacos", price: 25000 },
          ],
        },
        {
          id: nanoid(),
          name: "Pizza",
          greyIcon: pizzaIconGrey,
          whiteIcon: pizzaIconWhite,
          items: [
            { id: nanoid(), name: "Margherita Pizza", price: 20000 },
            { id: nanoid(), name: "Pepperoni Pizza", price: 24000 },
            { id: nanoid(), name: "BBQ Chicken Pizza", price: 28000 },
            { id: nanoid(), name: "Veggie Supreme Pizza", price: 22000 },
            { id: nanoid(), name: "Four Cheese Pizza", price: 26000 },
          ],
        },
        {
          id: nanoid(),
          name: "Pasta",
          greyIcon: pastaIconGrey,
          whiteIcon: pastaIconWhite,
          items: [
            { id: nanoid(), name: "Spaghetti Carbonara", price: 23000 },
            { id: nanoid(), name: "Fettuccine Alfredo", price: 25000 },
            { id: nanoid(), name: "Penne Arrabbiata", price: 20000 },
            { id: nanoid(), name: "Lasagna Bolognese", price: 30000 },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      name: "Drinks",
      greyIcon: drinksIconGrey,
      whiteIcon: drinksIconWhite,
      subCategories: [
        {
          id: nanoid(),
          name: "Soft Drinks",
          greyIcon: chickenIconGrey,
          whiteIcon: chickenIconWhite,
          items: [
            { id: nanoid(), name: "Coca-Cola", price: 5000 },
            { id: nanoid(), name: "Pepsi", price: 5000 },
            { id: nanoid(), name: "Sprite", price: 5000 },
            { id: nanoid(), name: "Fanta", price: 5000 },
          ],
        },
        {
          id: nanoid(),
          name: "Juices",
          greyIcon: fishIconGrey,
          whiteIcon: fishIconWhite,
          items: [
            { id: nanoid(), name: "Orange Juice", price: 7000 },
            { id: nanoid(), name: "Apple Juice", price: 7000 },
            { id: nanoid(), name: "Grape Juice", price: 7000 },
            { id: nanoid(), name: "Pineapple Juice", price: 8000 },
          ],
        },
        {
          id: nanoid(),
          name: "Smoothies",
          greyIcon: pizzaIconGrey,
          whiteIcon: pizzaIconWhite,
          items: [
            { id: nanoid(), name: "Strawberry Banana Smoothie", price: 9000 },
            { id: nanoid(), name: "Mango Smoothie", price: 9500 },
            { id: nanoid(), name: "Green Detox Smoothie", price: 10000 },
            { id: nanoid(), name: "Blueberry Smoothie", price: 9500 },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      name: "Snack",
      greyIcon: snackIconGrey,
      whiteIcon: snackIconWhite,
      subCategories: [
        {
          id: nanoid(),
          name: "Chips",
          greyIcon: chickenIconGrey,
          whiteIcon: chickenIconWhite,
          items: [
            { id: nanoid(), name: "Salted Chips", price: 4000 },
            { id: nanoid(), name: "Barbecue Chips", price: 4500 },
            { id: nanoid(), name: "Sour Cream & Onion Chips", price: 4500 },
          ],
        },
        {
          id: nanoid(),
          name: "Popcorn",
          greyIcon: fishIconGrey,
          whiteIcon: fishIconWhite,
          items: [
            { id: nanoid(), name: "Buttered Popcorn", price: 3000 },
            { id: nanoid(), name: "Caramel Popcorn", price: 4000 },
            { id: nanoid(), name: "Cheese Popcorn", price: 3500 },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      name: "Dessert",
      greyIcon: dessertIconGrey,
      whiteIcon: dessertIconWhite,
      subCategories: [
        {
          id: nanoid(),
          name: "Cakes",
          greyIcon: chickenIconGrey,
          whiteIcon: chickenIconWhite,
          items: [
            { id: nanoid(), name: "Chocolate Cake", price: 20000 },
            { id: nanoid(), name: "Vanilla Sponge Cake", price: 18000 },
            { id: nanoid(), name: "Red Velvet Cake", price: 22000 },
            { id: nanoid(), name: "Carrot Cake", price: 21000 },
          ],
        },
        {
          id: nanoid(),
          name: "Ice Cream",
          greyIcon: fishIconGrey,
          whiteIcon: fishIconWhite,
          items: [
            { id: nanoid(), name: "Vanilla Ice Cream", price: 12000 },
            { id: nanoid(), name: "Chocolate Ice Cream", price: 13000 },
            { id: nanoid(), name: "Strawberry Ice Cream", price: 12500 },
            {
              id: nanoid(),
              name: "Mint Chocolate Chip Ice Cream",
              price: 13500,
            },
          ],
        },
        {
          id: nanoid(),
          name: "Cookies",
          greyIcon: pizzaIconGrey,
          whiteIcon: pizzaIconWhite,
          items: [
            { id: nanoid(), name: "Chocolate Chip Cookies", price: 8000 },
            { id: nanoid(), name: "Oatmeal Raisin Cookies", price: 8500 },
            { id: nanoid(), name: "Peanut Butter Cookies", price: 9000 },
          ],
        },
        {
          id: nanoid(),
          name: "Pastries",
          greyIcon: pastaIconGrey,
          whiteIcon: pastaIconWhite,
          items: [
            { id: nanoid(), name: "Croissant", price: 10000 },
            { id: nanoid(), name: "Danish Pastry", price: 12000 },
            { id: nanoid(), name: "Cinnamon Roll", price: 11000 },
            { id: nanoid(), name: "Apple Strudel", price: 13000 },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      name: "Package",
      greyIcon: packageIconGrey,
      whiteIcon: packageIconWhite,
      subCategories: [
        {
          id: nanoid(),
          name: "Meal Deals",
          greyIcon: chickenIconGrey,
          whiteIcon: chickenIconWhite,
          items: [
            { id: nanoid(), name: "Family Chicken Feast", price: 60000 },
            { id: nanoid(), name: "Seafood Combo", price: 70000 },
            { id: nanoid(), name: "Pizza Party Pack", price: 50000 },
          ],
        },
        {
          id: nanoid(),
          name: "Platters",
          greyIcon: fishIconGrey,
          whiteIcon: fishIconWhite,
          items: [
            { id: nanoid(), name: "Mixed Grill Platter", price: 80000 },
            { id: nanoid(), name: "Veggie Platter", price: 50000 },
            { id: nanoid(), name: "Cheese & Meat Platter", price: 65000 },
          ],
        },
      ],
    },
  ],

  selectedCategoryId: "",
  selectedSubCategoryId: "",
};

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    setSubCategory: (state, action) => {
      state.selectedSubCategoryId = action.payload;
    },
  },
});

export const { setCategory, setSubCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
