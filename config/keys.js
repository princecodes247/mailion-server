//OFFLINE USE

dbPassword = "process.env.DB_KEY";
if (process.env.APP_ENV == "development") {
  dbPassword = "mongodb://127.0.0.1/mailion";
}
// process.env.DB_KEY ||
module.exports = {
  mongoURI: dbPassword,
};

//+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true'
