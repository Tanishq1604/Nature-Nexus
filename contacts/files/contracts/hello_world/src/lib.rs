#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Env, String, Address};


#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct User {
    name: String,
    address: Address,
    amount: u32,
}

#[contract]
pub struct ContractNature;

#[contractimpl]
impl ContractNature {

    pub fn donate(env: Env, address: Address, amount: u32) {
        if let Some(mut party) = env.storage().persistent().get::<_, User>(&address) {
            party.amount += amount;
            env.storage().persistent().set(&address, &party);
        } else {
            panic_with_error!("Not found");
        }
    }

    pub fn balance(env: Env, address: Address) -> Option<u32> {
        if let Some(party) = env.storage().persistent().get::<_, User>(&address) {
            Some(party.amount)
        } else {
            None
        }
    }

    pub fn add_party(env: Env, name: String, address: Address, amount: u32) {
        let party = User {
            name,
            address: address.clone(),
            amount,
        };
        env.storage().persistent().set(&address, &party);
    }
}