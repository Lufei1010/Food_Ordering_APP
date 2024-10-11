import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateMyUser(); //from MyUserApi hook, update user data

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
}

export default UserProfilePage;