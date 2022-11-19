import http from 'http';


export const processApi = async (options: string | http.RequestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    let data = '';
    const request = http.request(options, (response) => {
      // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
      response.setEncoding('utf8');
  
      // As data starts streaming in, add each chunk to "data"
      response.on('data', (chunk) => {
        data += chunk;
      });
  
      // The whole response has been received. Print out the result.
      response.on('end', () => {
        resolve(data)
      });
    });
  
    // Log errors if any occur
    request.on('error', (error) => {
      reject(error)
    });
  
    // End the request
    request.end();
  })
  
}