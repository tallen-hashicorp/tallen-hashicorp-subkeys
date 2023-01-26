# Example Node App writing a kv to vault

## PreReqs
```bash
vault auth enable userpass

vault policy write node-app - << EOF
path "secret/*" {
  capabilities = ["create", "update", "read"]
}
EOF

vault write auth/userpass/users/tallen \
    password=thisisnotsecure \
    policies=node-app
```