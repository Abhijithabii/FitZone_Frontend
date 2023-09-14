import { Button, Input } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";

function TrainerChangePassword() {
  let { user, logoutUser } = useContext(AuthContext);

  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!current_password || !new_password || !confirm_password) {
      toast.error("Please Fill All the Fields");
      return;
    }
    if (new_password !== confirm_password) {
      toast.error("Password and Confirm Password must match.");
      return;
    }
    if (current_password === new_password) {
      toast.error("New Password Shouldn't be the old password");
      return;
    }
    const formData = new FormData();
    formData.append("current_password", current_password);
    formData.append("new_password", new_password);

    try {
      await axios
        .put(
          `${BACKEND_BASE_URL}/api/changepassword/${user.user_id}/`,
          formData
        )
        .then((res) => {
          toast.success(res.data.message);
          logoutUser();
        })
        .catch((error) => {
          toast.error("Current Password is Incorect");
        });
    } catch {}
  };

  return (
    <div>
      <h1 className="text-center text-xl py-3 font-bold">
        Change Your Password
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="w-80 bg-white h-72 border-2 shadow-xl">
          <div className="grid gap-6 px-5 py-5">
            <Input
              label="Current Password"
              onChange={(e) => setCurrent_password(e.target.value)}
            />
            <Input
              label="New Password"
              onChange={(e) => setNew_password(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              onChange={(e) => setConfirm_password(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-row-reverse pr-6 pt-2">
            <Button type="submit">Change</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TrainerChangePassword;
