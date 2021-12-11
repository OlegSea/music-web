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

