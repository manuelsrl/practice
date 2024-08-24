const whitelist = [
  // domain "https://www.website.com"
  // http:217.0.0.1:5173 for Vite project
  "http://127.0.0.1:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccesStatus: 200,
};

export default corsOptions;
