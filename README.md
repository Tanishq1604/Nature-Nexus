# **Nature Nexus Waste Management**

Nature Nexus is an innovative waste management application designed to tackle the pressing issue of waste management in Delhi by leveraging blockchain technology. Our app uses the Soroban SDK, React, and Express to create a decentralized, community-driven platform that incentivizes waste reporting and management through the use of Karma Tokens.

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)



## **Introduction**

With India generating approximately 62 million tons of waste annually and a shortage of personnel in the government sector, innovative solutions are urgently needed. Nature Nexus addresses this challenge by privatizing aspects of the Municipal Corporation of Delhi (MCD) sector and leveraging community engagement and NGO partnerships. Through our app, users can report waste issues, earn Karma Tokens, and purchase eco-friendly products in our marketplace.

## **Features**

- **Waste Reporting**: Users can report waste issues by uploading images and descriptions.
- **Verification by NGOs**: Partnered NGOs verify the reported waste issues.
- **Karma Tokens**: Users earn Karma Tokens for verified reports, which can be used in our marketplace.
- **Marketplace**: A platform for buying and selling eco-friendly products using Karma Tokens.
- **Blockchain Integration**: Ensures transparency and trust using the Soroban SDK and Stellar blockchain.

## **Tech Stack**

- **Frontend**: React
- **Backend**: Express
- **Blockchain**: Soroban SDK, Stellar
- **Authentication**: Freighter Wallet

## **Installation**

### **Prerequisites**

- Node.js
- npm (Node Package Manager)
- Git

### **Steps**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Tanishq1604/Nature-Nexus.git
   cd Nature-Nexus


2. **Install Dependencies**

```bash
npm install
Set Up Environment Variables

```

Create a .env file in the root directory and add the following variables:

## **Add in backend**
- PORT=4000
- MONGO_URI=<your_mongo_uri>
- JWT_SECRET=<your_jwt_secret>
- CLOUDINARY_NAME=<your_cloudinary_name>
- CLOUDINARY_KEY=<your_cloudinary_key>
- CLOUDINARY_SECRET=<your_cloudinary_secret>

## **Add in Frontend for Smart Contract**
- PUBLIC_KEY=<your_public_key>
- SECRET=<your_secret>


### **Start the Application**

```bash

npm start
   ```
