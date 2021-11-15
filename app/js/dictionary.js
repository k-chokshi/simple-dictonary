const endpointURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function search(word) {
    try {
        let url = `${endpointURL}${word}`;
        console.log(url);
        let response = await fetch(url);
        let data = await response.json();
        console.log((response));
        if (response.ok) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        //TODO: Add a logger to report errors
        console.log(error);
    }
}