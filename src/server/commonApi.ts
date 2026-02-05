import axios from "axios";
import { SERVER_URL } from "./serverURL";

const commonApi = async (method: string, serverUrl: string, reqBody?: any, reqHeader: any = { "Content-Type": "application/json" }) => {
    const reqConfig = {
        method: method,
        url: `${SERVER_URL}/${serverUrl}`,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
    };

    return await axios(reqConfig)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export default commonApi;