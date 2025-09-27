import { asyncWrapper } from "../Utils/asyncWrapper.js";
import { User } from "../Models/User.model.js";

import ApiError from "../Utils/ApiError.js";

const signUp = asyncWrapper(async (req, res) => {
  const {
    name,
    age,
    email,
    mobile,
    address,
    aadharCardNumber,
    password,
    role,
    isVoted,
  } = req.body;

  if (
    [name, age, email, mobile, address, aadharCardNumber, password].some(
      (iter) => !iter
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }

  // before creating the user lets check if user already exist or not

  const existingUser = await User.findOne({
    $or: [{ mobile }, { aadharCardNumber }],
  });

  if (existingUser) throw new ApiError(409, "user already present");

  const user = await User.create({
    name,
    age,
    email,
    mobile,
    address,
    aadharCardNumber,
    password,
    role,
    isVoted,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) throw new ApiError(500, "internal server error");

  return res.status(201).json({ message: "created" });
});

const login = asyncWrapper(async (req, res) => {
  const { aadharCardNumber, password } = req.body;

  if (!aadharCardNumber || !password)
    throw new ApiError(400, "aadharcard and password is required");

  // will check if user is present or not
  const user = await User.findOne({ aadharCardNumber }).select("+password");

  // if user dont exist
  if (!user) throw new ApiError(404, "user not found");

  // checking if password is correct or not
  if (!(await user.isPasswordCorrect(password)))
    throw new ApiError(401, "password is incorrect");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken; // setting refresh token inside DB
  await user.save({ validateBeforeSave: false }); // this step will tell mongooose to skip validation of all required fields

  const userData = user.toObject();
  delete userData.password;
  delete userData.refreshToken;

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "none",
    })
    .json({ message: "user logged-in", userData, accessToken });
});

const profile = asyncWrapper(async (req, res) => {
  const data = req.specificUser;

  return res.status(200).json({ message: "profile accessed", data });
});

const changePassword = asyncWrapper(async (req, res) => {

  try 
  {
    const { oldPassword, newPassword } = req.body;

    // check if the old password is same or not
    const checkIfPasswordCorrectOrNot = await req.specificUser.isPasswordCorrect(oldPassword);

    if(!checkIfPasswordCorrectOrNot) throw new ApiError(401, "please check the provided password");

    req.specificUser.password = newPassword;  // password hashing will be done because of pre hook

    await req.specificUser.save();

    res.status(200).json({message : "password updated successfully"});
  } 

  catch (error) 
  {
    throw new ApiError(500 , "some internal error");
  }

});

export { signUp, login, profile, changePassword };
