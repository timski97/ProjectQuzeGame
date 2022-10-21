export const getScreens = () => {
  const apiUrl =
    'https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=20';
  return new Promise(function (resolve, reject) {
    fetch(apiUrl, {
      method: 'GET',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.json().then(data => {
          // console.warn( JSON.stringify(data.notifications));
          if (data) {
            resolve(data);
            // console.log(data)
          } else {
            reject(data.error);
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  });
};
