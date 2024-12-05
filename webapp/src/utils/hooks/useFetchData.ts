import { useEffect, useState } from "react";

type FetchFunction<T> = () => Promise<{ content: T; total?: number }>;
type SuccessCallback = () => void;
type ErrorCallback = (error: any) => void;

interface UseFetchDataFilterProps<T> {
  fnc: FetchFunction<T>;
  onSuccess?: SuccessCallback;
  onError?: ErrorCallback;
  dependencies?: any[];
}

interface UseFetchDataFilterReturn<T> {
  total: number;
  data?: T;
  isLoading: boolean;
  isError: boolean;
  error: any;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onRefetchData: () => Promise<void>;
}

const useFetchDataFilter = <T>({
  fnc,
  onSuccess,
  onError,
  dependencies = [],
}: UseFetchDataFilterProps<T>): UseFetchDataFilterReturn<T> => {
  const [data, setData] = useState<T>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fnc();
      setData(response.content);
      if (response && response.total !== undefined) {
        setTotal(response.total);
      }
      onSuccess?.();
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    total,
    data,
    isLoading: loading,
    isError: !!error,
    error,
    setData,
    setLoading,
    onRefetchData: fetchData,
  };
};

export default useFetchDataFilter;
