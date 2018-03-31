var url = 'https://newsapi.org/v2/everything?' +
    'q=bollywood&' +
    'apiKey=8f302ce5a8e9486dab884dd9071b971c';


export default {
    getNews(payload) {
        return fetch(new Request(`${url}&pageSize=${payload.pageSize}&page=${payload.pageNumber}`))
            .then(function (response) {
                return response.json();
            })
    }
}
