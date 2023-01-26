var axios =  require('axios');

async function main(){
    const login = await axios.post('http://127.0.0.1:8200/v1/auth/userpass/login/tallen',{
        password: 'thisisnotsecure' 
    })
    
    const token = login.data.auth.client_token

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    await axios.post('http://127.0.0.1:8200/v1/secret/data/test',{
        data: {
            hello: "World",
        }
    },config)

    const secret = await axios.get('http://127.0.0.1:8200/v1/secret/data/test',config);
    console.log(secret.data.data.data)

    const subkeys = await axios.get('http://127.0.0.1:8200/v1/secret/subkeys/test',config);
    console.log(subkeys.data.data.subkeys)

}
main();