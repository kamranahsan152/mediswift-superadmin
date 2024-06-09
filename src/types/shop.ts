export interface AddShop {
    _id:string
    Cnic: string;
    Pharmacyname: string;
    Pharmacyaddress: string;
    licences: string;
    isapproved: boolean;
}
  
export interface Location {
    Latitude: number;
    Longitude: number;
}
  