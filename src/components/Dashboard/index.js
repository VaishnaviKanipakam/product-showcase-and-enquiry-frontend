import { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import CustomInput from "../CustomInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./index.css";

const Dashboard = () => {
  const [getProductsList, setGetProductsList] = useState([]);
  const [searchInputByName, setSearchInputByName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const renderSerchInputField = () => {
    return (
      <CustomInput
        sx={{ width: "100%" }}
        type="search"
        value={searchInputByName}
        onChange={(e) => setSearchInputByName(e.target.value)}
        placeholder="Product Name"
        icon={<SearchOutlinedIcon sx={{ width: "20px" }} />}
      />
    );
  };

  const renderFilterField = () => {
    return (
      <FormControl sx={{ m: 1, minWidth: "350px", marginTop: "20px" }}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          sx={{
            fontSize: "16px",
            fontFamily: "Gill Sans, sans-serif",
            "&.Mui-focused": {
              color: "#000000",
            },
          }}
        >
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          autoWidth
          label="Category"
          sx={{
            background: "linear-gradient(to right, #ffffff, #F2F2F2)",
            fontSize: "15px",
            color: "#000000",
            borderRadius: "10px",
            fontFamily: "Gill Sans, sans-serif",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
              borderRadius: "10px",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
              borderWidth: "1px",
            },

            "&.Mui-focused": {
              boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.4)",
              borderRadius: "9px",
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Men">Men</MenuItem>
          <MenuItem value="Women">Women</MenuItem>
          <MenuItem value="Kids">Kids</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const getAllProducts = async () => {
    const url = `https://product-showcase-and-enquiry-backend.onrender.com/get_products?search_by_name=${searchInputByName}&filter_by_category=${filterCategory}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    console.log("25ResponseRsponse", response);
    if (response.ok === true) {
      const data = await response.json();
      console.log("24Dashboard", data);
      const updatedData = data.map((eachProduct) => ({
        productId: eachProduct.product_id,
        image: eachProduct.image_url,
        name: eachProduct.name,
        price: eachProduct.price,
        shortDescription: eachProduct.short_desc,
      }));
      setGetProductsList(updatedData);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [searchInputByName, filterCategory]);

  return (
    <div className="dashboard-container">
      <div className="flex justify-between items-center w-[80%]">
        <h1 className="text-[30px] font-bold text-[#000000] mt-8 mb-8">
          Our Collections
        </h1>
        <div className="flex flex-col items-center w-[300px]">
          <div className="w-[100%]">{renderSerchInputField()}</div>
          <div className="w-[100%]">{renderFilterField()}</div>
        </div>
      </div>

      <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-[50px]">
        {getProductsList.map((eachProduct) => (
          <ProductItem
            key={eachProduct.productId}
            productDetails={eachProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
