import { useEffect, useState } from 'react';

export default function useOwnerNFT({ addressUser, addressNFT, idNFT }) {
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchFounder = async ({}) => {
      if (!addressUser || !addressNFT || isNaN(idNFT)) return;
      if (!mounted) return;
      setLoading(true);

      try {
        // Fetch NFT with user address as query param
        const response = await fetch(
          `https://api.opensea.io/api/v1/asset/${addressNFT}/${idNFT}/?account_address=${addressUser}`,
        );
        const NFT = await response.json();

        // Set isOwner to true if NFT is owned by user
        setIsOwner(!!NFT.ownership);
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
  }, [addressUser, addressNFT, idNFT]);

  return {
    isOwner,
    loading,
    error,
  };
}
