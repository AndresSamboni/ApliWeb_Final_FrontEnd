
import forge from 'node-forge';

class UserSecurity {
  private publicKey: forge.pki.PublicKey;
  private privateKey: forge.pki.PrivateKey;

  constructor() {
    this.generateRSAKeys();
  }

  private generateRSAKeys(): void {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 256 });
    this.publicKey = keypair.publicKey;
    this.privateKey = keypair.privateKey;
  }

  public encodeFun(userPassword: string): string {
    // Encrypt the password using the public key
    const encryptedPassword = this.publicKey.encrypt(userPassword, 'RSA-OAEP');

    // Encode the encrypted password in base64 to ensure it is a string
    const encodedPassword = forge.util.encode64(encryptedPassword);

    // Ensure the encoded password is no more than 200 characters
    return encodedPassword.substring(0, 200);
  }
}

// Example usage
const userSecurity = new UserSecurity();
const userPassword = 'MySecurePassword123!';
const encodedPassword = userSecurity.encodeFun(userPassword);
console.log('Encoded Password:', encodedPassword);

export default UserSecurity;
