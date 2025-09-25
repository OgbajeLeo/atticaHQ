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

export const CreateProperties = async (data:object) => {
  try {
    const response = await axios$.post(`/properties`,data);
    return response;
  } catch (error) {
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

export const getAmenities = async () => {
  try {
    const response = await axios$.get(`/admin/amenities`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getOverview = async () => {
  try {
    const response = await axios$.get(`/admin/stats`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getPropertyType = async () => {
  try {
    const response = await axios$.get(`/admin/property-types`);
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

export const editPicture = async (data: string) => {
  try {
    const response = await axios$.put(`/users/update`, {
photo:data
    });
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
    const response = await axios$.get(`/admin/messages`);
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
    const response = await axios$.get(`/admin/stats`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const sendMessage = async (data: object) => {
  try {
    const response = await axios$.post(`/admin/messages`, data);
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

export const GetPropertyByID = async (id: string) => {
  try {
    const response = await axios$.get(`/properties/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const GetMessageByID = async (id: string) => {
  try {
    const response = await axios$.get(`/admin/messages/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const MarkAsRead = async (id: string,data:object) => {
  try {
    const response = await axios$.patch(`/admin/messages/${id}`,data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteMessage = async (id: string) => {
  try {
    const response = await axios$.delete(`/admin/messages/${id}`, {});
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
