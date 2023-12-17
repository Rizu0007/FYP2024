const userErrorMessages = {
  Login: 'Invalid email or password',
  Register: 'User Signed Up Successfully',
  AlreadyExists: 'User already exists',
  WalletExists:"Wallet With Address Already Exists",
  InvalidUserData: 'Invalid User data',
  InvalidAccessToken: 'Invalid access token provided',
  IncorrectUserData: 'Incorrect User Email or password',
  NotFound: 'User not found',
  IncorrectPassword: 'Incorrect password',
  NotFoundAssign: 'Assign User ID not found',
  UnAuthorized: 'You are not allowed to access this route!',
  SomethingWrong: 'Something went wrong!',
  EmailAlreadyExists: 'User already exists with this email',
  TokeAndPasswordNotProvided: "Token/Password not Provided",
  TokenExpired: "Token Has Expired, Contact Support!",
  FailedToVerify: "Failed To Verify User, Invalid Token",
  TokenNotProvided: "Token was not provided",
    TokenStillValid: "Token Is Still Valid",
  UserWithThisAddress: "User with this Wallet Address Doesn't Exists",
  UserWalletAddressNot:"Wallet Address Does'nt Match"
};


const authMiddleWareErrorMessages = {
  InValidToken: 'Invalid token',
  TokenNotFound: 'Token not found',
  RoleNotFound: 'This Role not found',
  UnAuthorizedAdmin: 'Role not authorized to perform this action',
};

module.exports = {
  userErrorMessages,
  authMiddleWareErrorMessages,
};
