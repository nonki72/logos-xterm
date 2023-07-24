import logosAiConfig from './config/logos-ai.json';

async function Interact(inputString) {
    const uri = logosAiConfig.url + 'api/interact?' + new URLSearchParams({
        input: encodeURIComponent(inputString)
    });
    console.log(uri);
    const result = await fetch(uri);
    const json = await result.json();
    return json.output;
}

export default Interact;