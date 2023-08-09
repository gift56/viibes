import useAuthStore from "@/store";
import { createOrGetGoogleUser } from "@/utils";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";

const ConnectAccount = () => {
  const { addUser } = useAuthStore();
  return (
    <div>
      <GoogleLogin
        onSuccess={(res) => createOrGetGoogleUser(res, addUser)}
        onError={() => console.log("error")}
      />
    </div>
  );
};

export default ConnectAccount;
