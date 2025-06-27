export const AuthEndpoints = {
  signUp: "/auth/signup",
  signInParents: "/auth/parent/login",
  signInStudents: "/auth/child/login",
  resetPassword: "/auth/forgot-password",
  setNewPassword: "/auth/reset-password",
};

export const ParentsEndpoints = {
  saveChildInfo: "/users/save_child_info",
  getChildInfo: "/users/child_info",
  downloadSchedule: "/users/routine_download",
};

export const StudentsEndpoints = {
  updateCountryBoardInfo: "/children/update-country-board",
};

export const Protected_Endpoints = ["/parents/setup"];
