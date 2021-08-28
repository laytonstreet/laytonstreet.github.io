const isDevEnvironment = window.location.hostname == "localhost";

function forEnv<T>({ dev, prd }: { dev: T, prd: T }): T {
    return isDevEnvironment ? dev : prd;
}

export default {
    backendApiUrl: forEnv({ dev: "http://localhost:8080", prd: "https://api.laytonstreet.co.uk" })
}
