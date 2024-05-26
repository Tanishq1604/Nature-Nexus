
import {
    isConnected,
    isAllowed,
    getNetwork,
    setAllowed,
    getUserInfo,
    signAuthEntry,
    signTransaction,
    signBlob,
    getPublicKey
  } from "@stellar/freighter-api";
import { Server, TransactionBuilder } from "stellar-sdk";
  
  if (await isConnected()) {
    alert("User has Freighter!");
  }
  
  const retrieveUserInfo = async () => {
    let userInfo = { publicKey: "" };
    let error = "";
  
    try {
      userInfo = await getUserInfo();
    } catch (e) {
      error = e;
    }
  
    if (error) {
      return error;
    }
  
    if (!userInfo.publicKey) {
      // we didn't get anything back. Maybe the app hasn't been authorixed?
  
      const isAllowed = await isAllowed();
  
      if (!isAllowed) {
        // oh, we forgot to make sure the app is allowed. Let's do that now
        await setAllowed();
  
        // now, let's try getting that user info again
        // it should work now that this app is "allowed"
        userInfo = await getUserInfo();
      }
    }
  
    return userInfo.publicKey;
  };
  
  const result_info = retrieveUserInfo();

  
  if (await isConnected()) {
    alert("User has Freighter!");
  }
  
  const retrieveNetwork = async () => {
    let network = "";
    let error = "";
  
    try {
      network = await getNetwork();
    } catch (e) {
      error = e;
    }
  
    if (error) {
      return error;
    }
  
    return network;
  };
  
  const result_network = retrieveNetwork();


const retrievePublicKey = async () => {
  let publicKey = "";
  let error = "";

  try {
    publicKey = await getPublicKey();
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  return publicKey;
};

const result_key = retrievePublicKey();


const userSignTransaction = async (
  xdr,
  network,
  signWith
) => {
  let signedTransaction = "";
  let error = "";

  try {
    signedTransaction = await signTransaction(xdr, {
      network,
      accountToSign: signWith,
    });
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  return signedTransaction;
};

const xdr = ""; // replace this with an xdr string of the transaction you want to sign

const userSignedTransaction = userSignTransaction(xdr, "TESTNET");

const SERVER_URL = "https://horizon-testnet.stellar.org";

const server = new Server(SERVER_URL);

const transactionToSubmit = TransactionBuilder.fromXDR(
  userSignedTransaction,
  SERVER_URL
);

const response = await server.submitTransaction(transactionToSubmit);