import axios from "./axios";

const fetchData = async (path, setValues, accessToken) => {
    try {
        const response = await axios.get(path, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        setValues(response.data);
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

export default fetchData;
