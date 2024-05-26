import StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

const sourcePublicKey = "GALONDBAKAKRRMXZLQ6VKQOYDE6GJI4D5XE5RKFNAK2AD3DEL7XCOXSO";
const sourceSecretKey = "SDOI2IUTWLVN3P2FO3YKN572N4SZMLZV7JKIH5IGH2KHOU4CEMLUSGNV";

const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecretKey);

const destinationId = "GAYEHFRCF7PROLJGZT4SP2DEHRZLUPYFPSEB3CBGZOTZO3LA3VNHYOF5";

let transaction;

server.loadAccount(destinationId)
  .catch(error => {
    if (error instanceof StellarSdk.NotFoundError) {
      throw new Error("The destination account does not exist!");
    } else return error;
  })
  .then(() => {
    const sourceAccount = new StellarSdk.Account(sourcePublicKey, sourceKeys.sequence);

    transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationId,
          asset: StellarSdk.Asset.native(),
          amount: "10",
        }),
      )
      .addMemo(StellarSdk.Memo.text("Test Transaction"))
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeys);

    return server.submitTransaction(transaction);
  })
  .then(result => {
    console.log("Success! Results:", result);
  })
  .catch(error => {
    console.error("Something went wrong!", error);
  });