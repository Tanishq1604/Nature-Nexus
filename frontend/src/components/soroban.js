// import 'dotenv/config';
import {
    Contract, SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal, Address
} from "@stellar/stellar-sdk";
import { userSignTransaction } from './frieghter.js';
import { getPublicKey } from '@stellar/freighter-api';

let rpcUrl = "https://soroban-testnet.stellar.org";
let contractAddress = 'CDX3VSAAP43AWM6EO7WKTVJZECPXPD6CZ3ILSQYHUDTMZ26PNMXCB27H';

const stringToSymbol = (value) => {
    return nativeToScVal(value, { type: "symbol" })
}
const intToU32 = (value) => {
    // Assuming nativeToScVal converts the value to ScVal format
    return nativeToScVal(value, { type: "u32" });
}

const accountToScVal = (account) => new Address(account).toScVal();
const stringToRustString = (value) => {

    return nativeToScVal(value, { type: "string" });
}

let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
}

async function contractInt(caller, functName, values) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(caller);
    let buildTx;
    if (values == null) {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30).build();
    }
    else {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30).build();
    }
    let _buildTx = await provider.prepareTransaction(buildTx);
    let prepareTx = _buildTx.toXDR();
    let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);
    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });
        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }
        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (txResponse.status === "SUCCESS") {
                let result = txResponse.returnValue;
                return result;
            }
        }
    } catch (err) {
        return err;
    }
}

async function transfer() {
    let env = await getPublicKey();
    let address_user = accountToScVal(env);
    let amount = intToU32(10)
    let values =[address_user, amount]
    let result_transfer = await contractInt(env, 'donate', values);

    return result_transfer;
}

async function balance() {
    let env = await getPublicKey();
    let address_user = accountToScVal(env);
    let result_balance = await contractInt(env, 'balance', [address_user]);

    return result_balance;
}

async function add_user() {
    try {
        let env = await getPublicKey();
        let name = stringToRustString("Alex");
        let address = accountToScVal(env);
        let amount = intToU32(0);
        let values = [name,address,amount];
        let result_user = await contractInt(env, 'add_party', values);
        return result_user;
    }catch(e) {
        return e;
    }
}




export {  add_user,transfer, balance };