export const fetchData = async (url, setFunction) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        setFunction(json);
    } catch (error) {}
};

export const fetchDataRaw = async (url, setFunction) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const text = await response.text();
        setFunction(text);
    } catch (error) {}
};

export const fetchDataBlob = async (url, setFunction) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const text = await response.body();
        setFunction(text);
    } catch (error) {}
};



export const emptyPost = async (url, data) => {
    try {
        const response = await fetch(url, {method: 'POST', body: data});
        if (!response.ok) {
            throw Error(response.statusText);
        }
    } catch (error) {}
};

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
