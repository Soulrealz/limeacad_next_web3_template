import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import TokenBalance from "../components/TokenBalance";
import USLibrary from "../components/USLibrary";
import { ALBT_TOKEN_ADDRESS, US_ELECTION_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";
import React, {useState, useEffect} from 'react';
import { ClipLoader } from "react-spinners";

function Home() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {setLoading(false)}, 8000) //TODO: remove do a fetch once transaction is complete
  }, [])

  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>LimeAcademy-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>LimeAcademy-boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/LimeChain/next-web3-boilerplate">
            LimeAcademy-boilerplate
          </a>
        </h1>

        {isConnected && (
          <section>
            <NativeCurrencyBalance />

            <TokenBalance tokenAddress={ALBT_TOKEN_ADDRESS} symbol="ALBT" />
            <USLibrary contractAddress={US_ELECTION_ADDRESS} />
          </section>
        )}

        {isConnected && loading ?
        <section>
          <p>Transaction in progress</p>
          <p>Etherscan:</p>
          <ClipLoader size={50} color={"#F37A24"} loading={loading}/>
        </section>
          : null
          
        }
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
