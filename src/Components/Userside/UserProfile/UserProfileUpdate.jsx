import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Avatar,
} from "@material-tailwind/react";
import { BACKEND_BASE_URL } from "../../../common/CommonUrl";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

function UserProfileUpdate() {
  const [open, setOpen] = React.useState(false);
  const [mobileError, setMobileError] = useState("");

  const handleOpen = () => setOpen(!open);

  // State to hold the selected image preview URL
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  // Function to handle image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setUserDetails({
      ...userDetails,
      [e.target.name]: selectedFile,
    });
    //   setShowUpdateButton(true)

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  let { user, updateUserProfile } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({});
  const image = userDetails.image;

  const fetchUserDatas = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/api/updateprofile/${user.user_id}`)
      .then((res) => {
        setUserDetails(res.data);
      });
  };

  useEffect(() => {
    fetchUserDatas();
  }, []);

  const updateUserData = (e) => {
    e.preventDefault();
    const mobileNumber = userDetails.mobile;
    if (mobileNumber.length !== 10) {
      setMobileError("Mobile number should be exactly 10 digits.");
      return;
    }

    console.log("updation started");
    try {
      if (!imagePreviewUrl) {
        const { image, ...userDetailsWithoutImage } = userDetails;
        updateUserProfile(userDetailsWithoutImage);
      } else {
        updateUserProfile(userDetails);
      }
      handleOpen();
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
      <>
        <Button onClick={handleOpen}>Update Profile</Button>

        <Dialog open={open} handler={handleOpen}>
          <div className="flex items-center justify-between">
            <DialogHeader>Update Your Personal Details</DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5 cursor-pointer"
              onClick={handleOpen}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <form onSubmit={updateUserData}>
            <DialogBody divider>
              <div className="grid gap-6">
                <Input
                  name="full_name"
                  value={userDetails.full_name}
                  label="Full Name"
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <div className="flex">
                  <Input
                    name="age"
                    value={userDetails.age}
                    label="Age"
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      const limitedValue = numericValue.slice(0, 2);
                      setUserDetails({
                        ...userDetails,
                        [e.target.name]: limitedValue,
                      });
                    }}
                  />
                  <Input
                    name="blood_group"
                    value={userDetails.blood_group}
                    label="Blood Group"
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Input
                    name="mobile"
                    value={userDetails.mobile}
                    label="Phone Number"
                    onChange={(e) => {
                      setMobileError("");
                      // Remove non-numeric characters from the input value
                      const numericValue = e.target.value.replace(/\D/g, "");

                      // Ensure the value is not longer than 10 digits
                      const limitedValue = numericValue.slice(0, 10);
                      setUserDetails({
                        ...userDetails,
                        [e.target.name]: limitedValue,
                      });
                    }}
                  />
                  {mobileError && (
                    <p className="text-sm text-red-500">{mobileError}</p>
                  )}
                </div>
                <div className="flex justify-between">
                  <div>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-course-image"
                    >
                      Update Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="grid-course-image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="w-20 h-20">
                    {imagePreviewUrl ? (
                      <Avatar
                        className="w-full h-full"
                        src={`${imagePreviewUrl}`}
                        alt="avatar"
                        variant="rounded"
                      />
                    ) : image ? (
                      <Avatar
                        className="w-full h-full"
                        src={`${BACKEND_BASE_URL}${userDetails.image}`}
                        alt="avatar"
                        variant="rounded"
                      />
                    ) : (
                      <Avatar
                        className="w-full h-full"
                        src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                        alt="avatar"
                        variant="rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="outlined" color="red" onClick={handleOpen}>
                close
              </Button>
              <Button type="submit" variant="gradient" color="green">
                Update
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </>
    </div>
  );
}

export default UserProfileUpdate;
