var options = {
    apiVersion: 'v1', // default
    endpoint: 'http://127.0.0.1:8200', // default
  };
  
// get new instance of the client
var vault = require("node-vault")(options);

async function main(){
    const login = await vault.userpassLogin({
        username: "tallen",
        password: "thisisnotsecure"
    })
    
    await vault.write('secret/data/hello', { data: {
        hello: "world",
        hello1: "world"
    }})

    const secret = await vault.read("secret/data/hello")
    console.log(secret.data.data)
}
main()