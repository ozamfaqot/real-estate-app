import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "AllProperties",
    getAllProperties,
    { refetchOnWindowFocus: false }
  );
  // const { data, isError, isLoading, refetch } = useQuery({
  //   queryKey: "AllProperties",
  //   queryFn: () => getAllProperties(),
  //   refetchOnWindowFocus: false,
  // });
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
  //   return <div>USEPROPERTIES</div>;
};

export default useProperties;
