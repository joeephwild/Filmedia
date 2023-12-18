const fs = require("fs");
const express = require("express");
const cors = require("cors");
const pinataSDK = require("@pinata/sdk");

const pinataApiKey = `baa15a990fe2a6582396`;
const pinataApiSecret = `7d07dbaf59f3eaed2768df29df1d59153792bc6e8c9d081b500beabad715f950`;
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
async function storeNFTs(imagesPath) {
  const { metadata, image } = req.body;

  let base64Image = image.split(";base64,").pop();
  const imageSlice = image.slice(0, 30);

  const extension = imageSlice.includes("jpeg")
    ? "jpeg"
    : imageSlice.includes("png")
    ? "png"
    : imageSlice.includes("svg")
    ? "png"
    : imageSlice.includes("jpg")
    ? "jpg"
    : imageSlice.includes("mp4")
    ? "mp4"
    : imageSlice.includes("mp3")
    ? "mp3"
    : "";

  fs.writeFile(
    `image.${extension}`,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );

  const readableStreamForFile = fs.createReadStream(`image.${extension}`);

  try {
    await pinata
      .pinFileToIPFS(readableStreamForFile, options)
      .then(async (result) => {
        const response = await pinMetaData({
          metadata,
          result,
        });
        console.log(response);
        return res
          .status(200)
          .json({ message: "Pinned Json Successfully", result: response });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("Something wrong occured when pinning file", error);
  }
}

const pinMetaData = async ({ metadata, result }) => {
  const parsedMetaData = JSON.parse(metadata);
  const options = {};
  try {
    const response = await pinata.pinJSONToIPFS(parsedMetaData, options);

    return response;
  } catch (error) {
    console.log("Something went wrong when pinning metadata", error);
  }
};

app.use("/api/pin-data", storeNFTs);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log("App running at port 5001 And Successfully Connected")
);
