import { BACKEND_URL } from "@/constant/constant";
import { publicRequest } from "./request";





export const fetchGlobal = async (endpoint) => {
  const res = await publicRequest.get(endpoint);
  return res?.data.data;
};

// export const fetchPrivate = async (endpoint) => {
//   const res = await privateRequest.get(endpoint);
//   return res?.data?.data;
// }


export const postGlobal = async (endpoint, data) => {
  const res = await publicRequest.post(endpoint, data);
  return res?.data
};

// export const postPrivate = async (endpoint, data) => {
//   const res = await privateRequest.post(endpoint, data);
//   return res?.data
// };

export const deleteGlobalPrivate = async (endpoint, data) => {
  const res = await privateRequest.delete(endpoint, data);
  return res?.data
};

export const patchGlobalPrivate = async (endpoint, data) => {
  const res = await privateRequest.patch(endpoint, data);
  return res?.data
};

export const forgotPassword = async (email) => {
  const res = await fetch(`${BACKEND_URL}/user/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const verifyOTP = async (email, otp) => {
  const res = await fetch(`${BACKEND_URL}/user/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  return res.json();
};

export const resetPassword = async (email, otp, password) => {
  const res = await fetch(`${BACKEND_URL}/user/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, password }),
  });
  return res.json();
};
