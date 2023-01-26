# Vault Getting Started

## Install
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/vault
```

## Create Config File
```bash
tee config.hcl <<EOF
ui = true
disable_mlock = true

storage "raft" {
  path    = "./vault/data"
  node_id = "node1"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = "true"
}

api_addr = "http://127.0.0.1:8200"
cluster_addr = "https://127.0.0.1:8201"
EOF
```

## Create Vault Data Dir
```bash
mkdir -p vault/data
```

## Start Vault
```bash
vault server -config=config.hcl
```

## Start Vault Sev
```bash
vault server -dev
```

## Get Status (Dev Mode)
```bash
export VAULT_ADDR='http://127.0.0.1:8200'
vault status
```

# Secrets - KV
```bash
vault kv put -mount=secret foo bar=baz
vault kv get -mount=secret foo
vault kv metadata get -mount=secret foo
vault kv get -mount=secret -version=1 foo
vault kv get secret/foo

vault kv put -mount=secret hello foo=world excited=yes
vault kv get -mount=secret -field=excited hello
vault kv get -mount=secret -format=json hello | jq -r .data.data.excited

vault kv delete -mount=secret hello
vault kv get -mount=secret hello
vault kv undelete -mount=secret -versions=2 hello
```

## Enable Secrets Enginge - KV
```bash
vault secrets enable -path=kv kv
vault secrets list
```

# Authentication
```bash
vault token create
vault token revoke s.iyNUhq8Ov4hIAx6snw5mB2n
```

# Policy
```bash
vault policy write my-policy - << EOF
# Dev servers have version 2 of KV secrets engine mounted by default, so will
# need these paths to grant permissions:
path "secret/data/*" {
  capabilities = ["create", "update"]
}

path "secret/data/foo" {
  capabilities = ["read"]
}
EOF
```

```bash
vault policy list
vault policy read my-policy
```

```bash
export VAULT_TOKEN="$(vault token create -field token -policy=my-policy)"
```
