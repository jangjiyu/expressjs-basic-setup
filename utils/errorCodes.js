module.exports = {
  SERVER_ERROR: {
    statusCode: 500,
    message: "something went wrong. please try again later.",
  },
  INVALID_INPUT_EMAIL: {
    statusCode: 400,
    message: "이메일 형식이 올바르지 않습니다.",
  },
  INVALID_INPUT_PASSWORD: {
    statusCode: 400,
    message: "비밀번호는 8자 이상이어야 합니다.",
  },
  PASSWORD_MISMATCH: {
    statusCode: 400,
    message: "비밀번호가 일치하지 않습니다.",
  },
  DUPLICATE_EMAIL: {
    statusCode: 400,
    message: "이미 가입된 이메일입니다. 로그인을 해주세요.",
  },
  NON_EXISTENT_USER: {
    statusCode: 400,
    message: "회원정보가 없습니다. 회원가입을 해주세요.",
  },
  INVALID_USER_INFO: {
    statusCode: 400,
    message: "아이디나 비밀번호가 올바르지 않습니다.",
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: "로그인이 필요합니다.",
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "권한이 없습니다.",
  },
  POST_NOT_FOUND: {
    statusCode: 404,
    message: "게시글이 존재하지 않습니다.",
  },
};
