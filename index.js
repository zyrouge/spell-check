const axios = require("axios").default;

const baseUrl = "https://orthographe.reverso.net/api/v1/Spelling";

/**
 * Check if your sentence is grammatically correct!
 * @param {string} sentence Sentence to be checked
 * @returns string
 */
const start = async (sentence) => {
    try {
        const { data } = await axios.post(baseUrl, {
            autoReplace: true,
            generateRecommendations: false,
            generateSynonyms: false,
            getCorrectionDetails: true,
            interfaceLanguage: "en",
            language: "eng",
            locale: "Indifferent",
            origin: "interactive",
            text: sentence,
        }, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
            }
        });
        console.log(`Input: ${sentence}`);
        console.log(`Corrected: ${data.text}`);
        if (data.corrections && data.corrections.length) {
            console.log(`Corrections:`);
            data.corrections.forEach(x => {
                console.log(` - Use ${x.correctionText} instead of ${x.mistakeText} (${x.shortDescription})`);
                console.log(`   ${x.longDescription}`);
                console.log(`   Wrong word's meaning: ${x.mistakeDefinition}`);
                console.log(`   Correct word's meaning: ${x.correctionDefinition}`);
            });
        }
        return data;
    } catch (err) {
        console.log("Something went wrong!");
        console.error(err.data);
        return err;
    }
}

start("I no english, sorry!");