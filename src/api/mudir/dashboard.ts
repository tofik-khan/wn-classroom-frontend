import axios from "axios";
import { API_BASE } from "../constants";

type ImageKitUsage = {
  startDate: string;
  endDate: string;
  usage: {
    bandwidthBytes: number;
    mediaLibraryStorageBytes: number;
    videoProcessingUnitsCount: number;
    extensionUnitsCount: number;
    originalCacheStorageBytes: number;
  };
};

type Notification = {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  createdBy: string;
  published: boolean;
};

export const mudirDashboardAPI = {
  getImageKitUsage: (): Promise<{ data: ImageKitUsage; status: string }> => {
    return axios
      .get(`${API_BASE}/mudir/usage/imagekit`)
      .then((response) => response.data);
  },
  getDigitalOceanStatus: (): Promise<{
    data: { message: string; isOnline: boolean };
    status: string;
  }> => {
    return axios
      .get(`${API_BASE}/mudir/status/digitalocean`)
      .then((response) => response.data);
  },
  getMongoDbStatus: (): Promise<{
    data: { message: string; isOnline: boolean };
    status: string;
  }> => {
    return axios
      .get(`${API_BASE}/mudir/status/mongodb`)
      .then((response) => response.data);
  },
  getDashboardNotifications: ({
    authToken,
  }): Promise<{
    data: Notification[];
    status: string;
  }> => {
    return axios
      .get(`${API_BASE}/mudir/notifications`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => response.data);
  },
};
