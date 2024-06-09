export interface SuperAdmin {
  user: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface CustomerDetails {
  location: {
    Latitude: number;
    Longitude: number;
  };
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
}
