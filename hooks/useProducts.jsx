import useSwr from "swr";
import fetcher from "../libs/fetcher";

const useProducts = () => {
  const { data, error, isLoading } = useSwr("/api/product", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default useProducts;
