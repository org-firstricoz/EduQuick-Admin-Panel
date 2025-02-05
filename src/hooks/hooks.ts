import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useToken = localStorage.getItem("token") 

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};


export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = useToken;
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
};