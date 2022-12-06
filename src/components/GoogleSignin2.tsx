
//generate this id(web oauth) from google console
const initGoogleGSI = () => {
    console.log("initGoogleGSI SDK initialized");
  };

const createScript = () => {
  // load the sdk
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.onload = initGoogleGSI;
  document.body.appendChild(script);
};

createScript();




export const loginUser = async () => {
    //@ts-ignore
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: `https://www.googleapis.com/auth/analytics.readonly`,
    callback: "", // defined at request time
  });
  const tokenResponse = await new Promise((resolve, reject) => {
    try {
      // Settle this promise in the response callback for requestAccessToken()
      client.callback = (resp : any) => {
        if (resp.error !== undefined) {
          reject(resp);
        }

        console.log("client resp",resp);
        resolve(resp);
      };
      console.log("client",client);
      client.requestAccessToken({ prompt: "consent" });
    } catch (err) {
      console.log(err);
    }
  });
  return tokenResponse;
};
export const SignUpUser = async () => {
const SCOPES = ["email",
  "profile",
  "https://www.googleapis.com/auth/books"
].join(" ");

//@ts-ignore
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined at request time
  });
  const tokenResponse = await new Promise((resolve, reject) => {
    try {
      // Settle this promise in the response callback for requestAccessToken()
      client.callback = (resp: any) => {
        if (resp.error !== undefined) {
          reject(resp);
        }

        // console.log("client resp",resp);
        resolve(resp);
      };
      // console.log("client",client);
      client.requestAccessToken({ prompt: "consent" });
    } catch (err) {
      console.log(err);
    }
  });
  return tokenResponse;
};



export const loginUser2 = async () => {
  const tokenResponse = await new Promise((resolve, reject) => {
    try {
        //@ts-ignore
      const goog = window.google.accounts.id;
      const client = goog.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        //@ts-ignore
        scope: `https://www.googleapis.com/auth/books`,
        callback: handleCredentialResponse, // defined at request time
      });
      // Settle this promise in the response callback for requestAccessToken()
      function handleCredentialResponse(resp: any) {
        if (resp.error !== undefined) {
          reject(resp);
        }

        console.log("client resp",resp);
        resolve(resp);
      }
      console.log("client",client);
      //@ts-ignore
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            //@ts-ignore
          window.google.accounts.id.prompt();
          console.log("Prompt cancelled by user");
          resolve(loginUser());
        }
      });
    } catch (err) {
      console.log("loginUser2 err", err);
    }
  });
  return tokenResponse;
};


const handleResponse = async () => {
    try {
        let data = await loginUser()
        console.log(data);
        
    } catch (e) {
        console.log('eerror');
    }
}

const GoogleSignin2 = () => {
  return (
    <button onClick={handleResponse}>SignIn</button>
  )
}

export default GoogleSignin2