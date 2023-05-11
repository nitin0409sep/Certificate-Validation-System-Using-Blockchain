// Certificate Model
const Certificate = require('../../models/certificate');

// Image Model
const Image = require('../../models/images');

// File System
const fs = require('fs');

// Pinata
const pinataSDK = require('@pinata/sdk');

// Pinata Admin Key's
const apiKey = 'ac7edb5be6e9ef805898';
const apiSecret = '031bfe6832bbd0c3567d0cfd47190d8585b33d4a4215c853770606ae41c3e374';

const pinata = new pinataSDK(apiKey, apiSecret);

// Web 3
const Web3 = require('web3');

// ABI
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "Error",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "HashStored",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "rollNumber",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "HashStored",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_rollNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "storeImageHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Contract Address
const contractAddress = '0x9e509Df74eBb81e4cceBc47A3f06442f2686439e';

// Connect to the Local Ethereum network i.e Ganache using web3.js
const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

// Create a contract instance using the ABI and address
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// View Certificates Present In DB
module.exports.getUserCertificate = async (req, res) => {

    try {

        // Getting User ID From Middleware User Auth
        let user_id = req.userData.id;

        // Fetch Certificates from DB
        const data = await Certificate.find({ user_id: user_id });

        res.render('userCerti', {
            data: data,            // Sending data to frontend (userCerti.hbs file) 
        });
    } catch (err) {
        res.status(404).send("Certificate View " + err);
    }
}


//  Upload Certificates To DB
module.exports.userCertificate = async (req, res) => {

    try {
        // Getting User ID From Middleware User Auth
        let user_id = req.userData.id;
        let name = req.body.name;
        let rollNumber = req.body.rollNumber;
        let certiId = req.body.certiId;
        let img = req.file.filename;

        // Image Details
        let filename = req.file.originalname;
        let contentType = req.file.mimetype;
        let imagePath = req.file.path;

        // Read the file from disk as a buffer
        const data = fs.readFileSync(imagePath);

        // Hash
        var hash = "";

        try {

            // To store file on Pinata
            const pinFileToIPFS = async () => {
                const options = {
                    pinataMetadata: {
                        name: "name",
                        keyvalues: {
                            customKey: 'rollNumber',
                            customKey2: 'certiId'
                        }
                    },
                    pinataOptions: {
                        cidVersion: 0
                    }
                };

                try {
                    const stream = await fs.createReadStream(imagePath);
                    result = await pinata.pinFileToIPFS(stream, options);
                    return result.IpfsHash;
                } catch (error) {
                    console.log(error);
                }
            };

            // Pinata
            pinFileToIPFS()
                .then(async (result) => {
                    hash = result;

                    // Storing data on Blockchain
                    contractInstance.methods.storeImageHash(hash, rollNumber, name).send({ from: '0x1b3454c0D775BEeDe64466f969CA6A6210F8d3F5' }, function (error, transactionHash) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(hash + " Cerificate Hash");
                            console.log('Transaction hash:', transactionHash);
                        }
                    });


                    // Try to create a new image in the database
                    const certiImage = await Image.create({ filename, data, contentType, hash });

                    // Create new Certificate Model to Save in DB
                    const certiData = new Certificate({
                        user_id: user_id,
                        name: name,
                        rollNumber: rollNumber,
                        certiId: certiId,
                        img: img
                    })
                    // Save Certificate to Database
                    const pic = await certiData.save();

                    // Render userCerti Page
                    res.redirect('userCerti');

                })
                .catch((error) => {
                    res.redirect('/');
                });

        } catch (err) {
            // If the hash is not unique, then the image is a duplicate
            if (err.code === 11000 && err.keyPattern && err.keyPattern.hash === 1) {
                res.status(400).send('Duplicate image!');
            } else {
                res.status(500).send('Error uploading image!' + err);
            }
        }

    } catch (err) {
        console.log("Error  hai boss" + err);
        res.status(404).redirect('userHome');
    }
}

/*
Note -: Detect Image is Duplicate or Not

When you pass a string value to data, it is just a reference to the file path, and not the actual binary content of the image file. Therefore, when you use the SHA256 hash function to calculate the hash, you are actually hashing the file path string, and not the image data itself.

On the other hand, when you pass a buffer value to data, you are passing the actual binary content of the image file, which can be used to calculate the SHA256 hash of the image data. This makes it possible to detect duplicate images by comparing the SHA256 hash values.
*/