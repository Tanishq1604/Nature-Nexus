<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nature Nexus Waste Management</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2 {
            color: #2c3e50;
        }
        code {
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .code-block {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        ul {
            list-style-type: circle;
            margin-left: 20px;
        }
    </style>
</head>
<body>

    <h1><strong>Nature Nexus Waste Management</strong></h1>

    <p>Nature Nexus is an innovative waste management application designed to tackle the pressing issue of waste management in Delhi by leveraging blockchain technology. Our app uses the Soroban SDK, React, and Express to create a decentralized, community-driven platform that incentivizes waste reporting and management through the use of Karma Tokens.</p>

    <h2><strong>Table of Contents</strong></h2>
    <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>

    <h2 id="introduction"><strong>Introduction</strong></h2>
    <p>With India generating approximately 62 million tons of waste annually and a shortage of personnel in the government sector, innovative solutions are urgently needed. Nature Nexus addresses this challenge by privatizing aspects of the Municipal Corporation of Delhi (MCD) sector and leveraging community engagement and NGO partnerships. Through our app, users can report waste issues, earn Karma Tokens, and purchase eco-friendly products in our marketplace.</p>

    <h2 id="features"><strong>Features</strong></h2>
    <ul>
        <li><strong>Waste Reporting</strong>: Users can report waste issues by uploading images and descriptions.</li>
        <li><strong>Verification by NGOs</strong>: Partnered NGOs verify the reported waste issues.</li>
        <li><strong>Karma Tokens</strong>: Users earn Karma Tokens for verified reports, which can be used in our marketplace.</li>
        <li><strong>Marketplace</strong>: A platform for buying and selling eco-friendly products using Karma Tokens.</li>
        <li><strong>Blockchain Integration</strong>: Ensures transparency and trust using the Soroban SDK and Stellar blockchain.</li>
    </ul>

    <h2 id="tech-stack"><strong>Tech Stack</strong></h2>
    <ul>
        <li><strong>Frontend</strong>: React</li>
        <li><strong>Backend</strong>: Express</li>
        <li><strong>Blockchain</strong>: Soroban SDK, Stellar</li>
        <li><strong>Authentication</strong>: Freighter Wallet</li>
    </ul>

    <h2 id="installation"><strong>Installation</strong></h2>

    <h3><strong>Prerequisites</strong></h3>
    <ul>
        <li>Node.js</li>
        <li>npm (Node Package Manager)</li>
        <li>Git</li>
    </ul>

    <h3><strong>Steps</strong></h3>
    <ol>
        <li><strong>Clone the Repository</strong></li>
        <div class="code-block">
            <pre><code>git clone https://github.com/Tanishq1604/Nature-Nexus.git
cd Nature-Nexus</code></pre>
        </div>

        <li><strong>Install Dependencies</strong></li>
        <div class="code-block">
            <pre><code>npm install</code></pre>
        </div>

        <li><strong>Set Up Environment Variables</strong></li>
        <p>Create a <code>.env</code> file in the root directory and add the following variables:</p>

        <p><strong>Add in backend</strong></p>
        <div class="code-block">
            <pre><code>PORT=4000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_NAME=<your_cloudinary_name>
CLOUDINARY_KEY=<your_cloudinary_key>
CLOUDINARY_SECRET=<your_cloudinary_secret></code></pre>
        </div>

        <p><strong>Add in Frontend for Smart Contract</strong></p>
        <div class="code-block">
            <pre><code>PUBLIC_KEY=<your_public_key>
SECRET=<your_secret></code></pre>
        </div>

        <li><strong>Start the Application</strong></li>
        <div class="code-block">
            <pre><code>npm start</code></pre>
        </div>
    </ol>

    <h2 id="usage"><strong>Usage</strong></h2>
    <ul>
        <li><strong>Reporting Waste</strong>
            <ul>
                <li>Users can log in using their Freighter Wallet.</li>
                <li>Upload an image and provide a description of the waste issue.</li>
                <li>Submit the report for verification.</li>
            </ul>
        </li>
        <li><strong>Earning Karma Tokens</strong>
            <ul>
                <li>NGOs verify the submitted reports.</li>
                <li>Verified reports earn Karma Tokens for the user.</li>
            </ul>
        </li>
        <li><strong>Marketplace</strong>
            <ul>
                <li>Use earned Karma Tokens to purchase eco-friendly products from other users.</li>
                <li>List your eco-friendly products for sale.</li>
            </ul>
        </li>
    </ul>

    <h2 id="contributing"><strong>Contributing</strong></h2>
    <p>We welcome contributions from the community! To contribute, please follow these steps:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch (<code>git checkout -b feature/your-feature</code>).</li>
        <li>Make your changes and commit them (<code>git commit -m 'Add some feature'</code>).</li>
        <li>Push to the branch (<code>git push origin feature/your-feature</code>).</li>
        <li>Open a pull request.</li>
    </ol>

    <h2 id="license"><strong>License</strong></h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>



