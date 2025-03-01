import { v2 as cloudinary } from 'cloudinary';


const uploadingImage =async (file)=>{
    try {const uploadedImageFile =await cloudinary.uploader.upload(file.path, {folder:"userImages"})
        return uploadedImageFile;
    } catch (error) {
   console.log('error  uploading to cloudinary:>> ', error);
    }
}

export default uploadingImage