import axios from "axios";

const pinataConfig = {
  API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY,
  API_SECRET: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
  JWT: process.env.NEXT_PUBLIC_PINATA_JWT
};

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: pinataConfig.API_KEY,
        pinata_secret_api_key: pinataConfig.API_SECRET,
      }
    })
    .then(function(response) {
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    })
    .catch(function(error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }

    });
};
