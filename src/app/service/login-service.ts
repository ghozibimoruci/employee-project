export const getTokenLogin = () => {
    return JSON.parse(localStorage.getItem('tokenLogin'));
}