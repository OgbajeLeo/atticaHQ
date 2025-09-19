/* eslint-disable no-useless-catch */
import { axios$ } from "../";
 


export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axios$.post("/users/login", {
      email,
      password,
    });
    return response;
  }
  catch (error) {
    throw error;
  }
};

export const Register = async (data: object) => {
  try {
    const response = await axios$.post("/users/register", data);
    return response;
  }
  catch (error) {
    throw error;
  }
};

export const AllProperties = async () => {
  try {
    const response = await axios$.get(`/properties`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetCourseByID = async (id: string) => {
  try {
    const response = await axios$.get(`/courses/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const LoggedUser = async () => {
  try {
    const response = await axios$.get(`/users/me`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const AddCourse = async (data: object) => {
  try {
    const response = await axios$.post(`/courses`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteCourse= async (id: string) => {
  try {
    const response = await axios$.delete(`/courses/${id}`, {});
    return response;
  } catch (error) {
    throw error;
  }
};
export const DeleteDiscount= async (id: string) => {
  try {
    const response = await axios$.delete(`/discounts/${id}`, {});
    return response;
  } catch (error) {
    throw error;
  }
};

export const EditCourse= async (data: object,id:string) => {
  try {
    const response = await axios$.put(`/courses/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const EditDiscount= async (data: object,id:string) => {
  try {
    const response = await axios$.put(`/discounts/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const AllMessages = async () => {
  try {
    const response = await axios$.get(`/messages`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const AllEnrollments = async () => {
  try {
    const response = await axios$.get(`/enrollments`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const AllShopItems = async () => {
  try {
    const response = await axios$.get(`/shops`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const GetOverview = async () => {
  try {
    const response = await axios$.get(`/dashboard`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const sendMessage = async (data: object) => {
  try {
    const response = await axios$.post(`/messages`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const enroll = async (data: object) => {
  try {
    const response = await axios$.post(`/enroll`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const validateDiscount = async (code: string) => {
  try {
    const response = await axios$.get(`/discounts/validate/${code}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDiscount = async () => {
  try {
    const response = await axios$.get(`/discounts`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createDiscount = async (data: object) => {
  try {
    const response = await axios$.post(`/discounts`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const AddShopItem = async (data: object) => {
  try {
    const response = await axios$.post(`/shops`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const GetShopItemByID = async (id: string) => {
  try {
    const response = await axios$.get(`/shops/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const GetDiscountByID = async (id: string) => {
  try {
    const response = await axios$.get(`/discounts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteShopItem = async (id: string) => {
  try {
    const response = await axios$.delete(`/shops/${id}`, {});
    return response;
  } catch (error) {
    throw error;
  }
};

export const EditShopItem = async (data: object,id:string) => {
  try {
    const response = await axios$.put(`/shops/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const Logout = async () => {
  try {
    const response = await axios$.post(`/logout`);
    return response;
  } catch (error) {
    throw error;
  }
};
