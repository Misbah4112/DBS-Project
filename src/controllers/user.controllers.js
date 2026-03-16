import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
     //res.status(200).json({
        message:"Chai ur code"
    //})

    // 1) get user details from frontend
    // 2) valdation-non empty
    // 3) check if user already exists: username,email
    // 4) check for images, check for avatar
    // 5) upload them to cloudinary
    // 6) create user object- create entry in db
    // 7) remove password and refresh token field from response
    // 8) check for user creation, if created, return response, if not send error response

    const {fullname,email,username,password} = req.body
    console.log("email",email);
    

    //if(fullname == "") {
        //throw new ApiError(400,//"fullname is required")
   // }

   if(
    [fullname,email,username,password].some((field) => field?.trim() == "")
)
   {
    throw new ApiError(400,"all fields are required")
   }

   const existedUser = User.findOne({
    $or: [{ username } , { email }]
   })

   if(existedUser){
    throw new ApiError(409,"User with email or username already exists")

   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath)
    {
        throw new ApiError(400,"avatar file is required")

   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
    throw new ApiError(400,"avatar file is required")
 }

 const user = await User.create({
    fullname,
avatar:avatar.url,
coverImage:coverImage.url || "",
email,
password,
username:username.toLowerCase()

})
const createdUser = await User.findById(user._id).select(
    "-passowrd -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,"Something went wrong registering a user")
}

return res.status(201,json(
    new ApiResponse(200,createdUser,"User registered successfully")
))

} )


export {registerUser}