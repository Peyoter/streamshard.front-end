export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('user');
            }
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}