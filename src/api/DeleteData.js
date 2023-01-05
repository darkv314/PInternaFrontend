import axios from "./axios";

const deleteData = async (url, accessToken) => {
    try {
        const response = await axios.delete(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data.message);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`Error: ${err.message}`);
        }
    }
};

export default deleteData;
