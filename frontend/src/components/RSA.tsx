import * as forge from 'node-forge';

//Clave publica RSA (debe ser proporcionada de manera segura)
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq5kM9arxAAkDZZ1xYQy5
kK9Fo5g6/oOOViGnFq5fOl5M8lYx0fZ9Ym1Fg1jF+y4f5HJAL5z+uRePscQpl8rW
QX1xKJ+R7DzDLzZx6KkT2TLQp29Cr6kHp6pniA9fM4/XULQy+LMzKgG8yxPOwIBH
8yRcmhZLsFqGhjUisUoM2M/2OvTVQ7Jbi3sm9JNd39TpE/7/zUpesBnRH+aWcAvf
1J1SbGriNoi64aXbXMO8Yx5hzXvFRW8tLJHp8O4A6pEj5ihm/0T6omIqxgwYZZFs
Xnl62jqDa5O5hGy4yKw9Ngl9FEh8mX5hhrZoXvPIUKZ8gCjPzW6Dd+2ty8uDdPYQ
wQIDAQAB
-----END PUBLIC KEY-----`;
export const encodeFun = (user_password: string): string => {
  //Convertir la clave puclica PEM a una clave puvlica RSA utilizable por forge
  const publickey = forge.pki.publickeyFromPem(publicKeyPem);

  //Citrar la contrasena utilizando la clave publica
  const encrypted = publickey.encrypt(user_password, 'RSA-oaep',{
    md:forge.md.sha256.create(), //usa SHA-256
  });

  const encryptedBase64 = forge.util.encode64(encrypted);

  return encryptedBase64.substring(0,200);
};