function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and the server responded with a status code that is not in the range of 2**

    errorMsg = error.response.data;
    console.error("Error response", errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // the request was made, but no response was received
    errorMsg = error.request;
    console.error("Error request");
  } else {
    //   sth else happened in making the request that triggered an error
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }

  displayError(errorMsg);
}

export default catchErrors;
