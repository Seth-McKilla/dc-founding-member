import { useEffect, useState } from "react";

export default function useFounderNFT(address) {
  const [isFounder, setIsFounder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchFounder = async () => {
      if (!address) return;
      if (!mounted) return;
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.opensea.io/api/v1/asset/0x500c5C9FE70E5820eC829354620f1C070224917d/0/?account_address=${address}`
        );
        const founderNFT = await response.json();
        setIsFounder(!!founderNFT.ownership);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      return setLoading(false);
    };

    fetchFounder();

    return () => {
      mounted = false;
    };
  }, [address]);

  return {
    isFounder,
    loading,
    error,
  };
}
