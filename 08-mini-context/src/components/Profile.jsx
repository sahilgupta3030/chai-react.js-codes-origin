import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Plaese login!</div>;
  }
  return <div>welcome {user.username} hui hui</div>;
}

export default Profile;
