import { useEffect } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { user } from "@prisma/client";

const useFetchUser = (auto = true) => {
  const { user, setUser, token } = useStore();

  const fetchUser = async () => {
    try {
      const result = await axios.get<user>("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(result.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    auto && fetchUser();
  }, [token]);

  return { user, refetchUser: fetchUser };
};

export default useFetchUser;
