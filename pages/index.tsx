import { useState } from 'react';
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import useFounderNFT from '../hooks/useFounderNFT';
import { Button, Layout, Loader, WalletOptionsModal } from '../components';

const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data, loading: accountLoading }] = useAccount();
  const { isOwner, loading, error } = useFounderNFT({
    addressUser: data?.address,
    addressNFT: '0x500c5C9FE70E5820eC829354620f1C070224917d',
    idNFT: 0,
  });

  const renderContent = () => {
    if (loading) return <Loader size={8} />;

    if (!data) {
      return (
        <>
          <h1 className="mb-8 text-4xl font-bold">
            Welcome to the NFT Owner Example
          </h1>
          <Button
            loading={accountLoading}
            onClick={() => setShowWalletOptions(true)}
          >
            Connect to Wallet
          </Button>
        </>
      );
    }

    return (
      <h1 className="text-4xl">{isOwner ? 'Owner 😎' : 'Not Owner 😭'}</h1>
    );
  };

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
