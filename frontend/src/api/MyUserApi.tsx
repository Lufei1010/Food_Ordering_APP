import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

    

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;//API Base URL;

//Create User Request Function;
type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

//Fetch API Call;
export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0(); 

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
//Error Handling;
        if(!response.ok) {
            throw new Error('Failed to create user');
        }
    };
//React Query Mutation.
    const { 
        mutateAsync: CreateUser,
        isLoading, 
        isError, 
        isSuccess 
    } = useMutation(createMyUserRequest);

    return {
      CreateUser,
      isLoading,
      isError,
      isSuccess,
    };
};