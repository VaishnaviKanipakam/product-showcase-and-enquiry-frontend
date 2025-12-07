import CustomButton from "../CustomButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomInput from "../CustomInput";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const ProductDetailedPageItem = (props) => {
  const { productDetails } = props;
  const [selectedProductSize, setSelectedProductSize] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [successMesage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [trueOrFalse, setTrueOrFalse] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    productId,
    productCategory,
    productLongDescription,
    productImage,
    productName,
    productPrice,
    productSize,
    productStock,
  } = productDetails;

  const sizes = productSize.split(",");

  const onSubmitEnquiryForm = async (event) => {
    event.preventDefault();
    const url = `https://product-showcase-and-enquiry-backend.onrender.com/enquiry`;
    const enquiryDetails = { name, email, mobileNumber, message };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enquiryDetails),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const successData = await response.json();
      setSuccessMessage(successData);
      setTrueOrFalse(true);
      setName("");
      setEmail("");
      setMobileNumber("");
      setMessage("");
    } else if (response.ok === false) {
      const errorData = await response.json();
      setErrorMessage(errorData);
      setTrueOrFalse(false);
    }
  };

  return (
    <div className="flex flex-row items-start justify-start h-[550px]  pr-9 transition transform hover:scale-105 duration-300 shadow-lg rounded-xl">
      <img
        src={productImage}
        alt={productName}
        className="h-[100%] w-[300px] rounded-tl-xl rounded-bl-xl mr-6"
      />
      <div className="flex flex-col items-start justify-start  w-[200px] mt-5 box-border">
        <h3 className="text-[#000000] font-medium text-[20px]">
          {productName}
        </h3>
        <h4 className="text-[gray] font-medium text-[16px]">
          {productPrice}/-
        </h4>
        <hr className="border-dashed w-full text-[gray] mt-3 mb-3" />
        <h3 className="text-[#494949] font-medium text-[16px]">
          {productLongDescription}
        </h3>
        <h3 className="text-[#494949] font-medium text-[16px]">
          Status: <span className="text-[#000000]">{productStock}</span>
        </h3>
        <hr className="border-dashed w-full text-[gray] mt-3 mb-3" />
        <h3 className="text-[#494949] font-medium text-[16px]">Sizes</h3>
        <div className="flex flex-row items-center bg-none box-border">
          {sizes.map((size) => (
            <CustomButton
              variant="text"
              onClick={() => setSelectedProductSize(size)}
              sx={{
                margin: "0px 0px 0px 0px",
                width: "30px",
                backgroundColor:
                  selectedProductSize === size ? "#000000" : "transparent",
                color: selectedProductSize === size ? "#ffffff" : "#000000",
                borderRadius: "50%",
                padding: "0px 0px 0px 0px",
                minWidth: "unset",
                boxShadow: "none",
              }}
              key={size}
            >
              {size}
            </CustomButton>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <CustomButton sx={{ marginTop: "30px" }} onClick={handleClickOpen}>
            Enquiry About Product
          </CustomButton>
          <Link to="/">
            <CustomButton sx={{ marginTop: "30px" }}>Back</CustomButton>
          </Link>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ color: "#000000", fontWeight: "700" }}>
            Enquiry
          </DialogTitle>
          <DialogContent>
            <form onSubmit={onSubmitEnquiryForm} id="subscription-form">
              <CustomInput
                icon={<PersonOutlineOutlinedIcon sx={{ width: "20px" }} />}
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <CustomInput
                icon={<EmailOutlinedIcon sx={{ width: "20px" }} />}
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CustomInput
                icon={<LocalPhoneOutlinedIcon sx={{ width: "20px" }} />}
                autoFocus
                required
                margin="dense"
                id="mobileNumber"
                name="moobileNumber"
                label="Mobile Number"
                type="number"
                fullWidth
                variant="standard"
                placeholder="0000000000"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />

              <FormLabel sx={{ marginTop: "10px" }}>Message</FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minRows={5}
                placeholder="message..."
                sx={{
                  marginTop: "7px",
                  background: "linear-gradient(to right, #ffffff, #F2F2F2)",
                  fontSize: "13px",
                  color: "#000000",
                  borderRadius: "10px",
                  padding: "10px",
                  fontFamily: "Gill Sans, sans-serif",

                  "&:hover": {
                    border: "1px solid gray",
                  },

                  "&.Mui-focused": {
                    "--Textarea-focusedHighlight": "#000000",
                    "--Input-focusedThickness": "0.5px",
                    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.4)",
                    border: "1px solid #000000",
                  },
                }}
              />
            </form>
          </DialogContent>
          {trueOrFalse ? (
            <p className="text-green-500 font-semibold text-[16px] text-center">
              {successMesage}
            </p>
          ) : (
            <p className="text-red-600 font-semibold text-[16px] text-center">
              {errorMessage}
            </p>
          )}
          <DialogActions>
            <CustomButton onClick={handleClose}>Cancel</CustomButton>
            <CustomButton type="submit" form="subscription-form">
              Add Enquiry
            </CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductDetailedPageItem;
