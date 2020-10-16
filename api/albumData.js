const express = require("express")
const router = express()

const AlbumData = require("../models/albumData")


router.get("/getAlbumsData", async (_,res) => {
    const albumsData = await AlbumData.find();
    res.json(albumsData);
})



router.post("/albumsData", async (req,res) => {
    let image_mineType;
    const uploadedCoverImage = req.files.albumCover
    const dataToUpload = {
        name: req.body.name,
        artist: req.body.artist
    }
    try {
        
    if (uploadedCoverImage == null) {
        return res.status(500).send("File Not Fould");
      }

    if(!uploadedCoverImage.mimetype.split("/")[1].match(/\.(png|jpe?g)$/)) throw "Error"     

    if(uploadedCoverImage.mimetype === "image/jpeg"){
        image_mineType = "jpeg"
    } else if(uploadedCoverImage.mimetype === "image/png"){
        image_mineType = "png"
    }
  
     uploadedCoverImage.mv(`client/src/Music/albumCovers/${req.body.name}.${image_mineType}`, (e) => {
         if(e) {
             console.log("error " + e)
             res.send("Error")
         } else {
             console.log("Success")
             res.send("Success")
         }
     })

     const albumDataToSave = new AlbumData(dataToUpload)
     await albumDataToSave.save()


    } catch {
        console.log("Error")
        res.status(500).json({errorMEssage: "ServerError"})
    }
})

module.exports = router