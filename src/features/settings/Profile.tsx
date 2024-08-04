import { useState } from "react";
import { useUser } from "../authentication/useUser";
import AvatarForm from "./AvatarForm";
import ChangePasswordForm from "./ChangePasswordForm";
import UserDetailsForm from "./UserDetailsForm";

const Profile = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <AvatarForm user={user} />

      {!isChangePasswordOpen ? (
        <UserDetailsForm
          user={user}
          setIsChangePasswordOpen={setIsChangePasswordOpen}
        />
      ) : (
        <ChangePasswordForm setIsChangePasswordOpen={setIsChangePasswordOpen} />
      )}
    </>
  );
};

export default Profile;
