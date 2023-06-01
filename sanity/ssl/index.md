# SSL and Certificates

## Helpful SSL resources

This site explains the basics about SSL/TLS, private and public keys and what makes up a certificate:
http://www.steves-internet-guide.com/ssl-certificates-explained/

This site explains how to convert/bundle between different key and certificate formats using `openssl`:
https://www.sslshopper.com/ssl-converter.html

## Private vs Public keys
- `private` keys are kept secret, server side.
- `public` keys are created from private keys, distributed to clients.

Public keys can be used to decrypt, but not to encrypt.
Private keys can be used to encrypt.

## Formats

- `DER` = Binary (like pfx, p7b)
    - `p7b`: public key
    - `pfx`: private key

- `PEM` = ASCII
    - public key: `-----BEGIN CERTIFICATE-----`, or
    - private key: 
        - encrypted (with passphrase): 
            - `-----BEGIN ENCRYPTED PRIVATE KEY-----`
        - unencrypted: 
            - `-----BEGIN RSA PRIVATE KEY-----`
        - To decrypt Private Key:
            - `openssl rsa -in encrypted-private-key.pem -out private-key.pem`