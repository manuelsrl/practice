const whitelist = [
  // domain "https://www.website.com"
  "http://127.0.0.1:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  optionsSuccesStatus: 200,
};

export default corsOptions;
