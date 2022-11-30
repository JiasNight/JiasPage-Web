import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

/**
 * aes加密
 */
export const aesUtil = {
  // 获取key，
  genKey: function (length = 16) {
    const random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str = str + random.charAt(Math.random() * random.length);
    }
    return str;
  },

  // 加密
  encrypt: function (plaintext: any, key: string) {
    if (plaintext instanceof Object) {
      // JSON.stringify
      plaintext = JSON.stringify(plaintext);
    }
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },

  // 解密
  decrypt: function (ciphertext: any, key: string) {
    const decrypt = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    let decString = CryptoJS.enc.Utf8.stringify(decrypt).toString();
    if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
      // JSON.parse
      decString = JSON.parse(decString);
    }
    return decString;
  }
};

/**
 * rsa加密
 */
export const rsaUtil: any = {
  // RSA 位数，这里要跟后端对应
  bits: 1024,

  // 当前JSEncrypted对象
  thisKeyPair: {},

  // 生成密钥对(公钥和私钥)
  genKeyPair: function (bits = rsaUtil.bits) {
    const genKeyPair: any = {};
    rsaUtil.thisKeyPair = new JSEncrypt({
      default_key_size: bits
    });
    // 这里项目使用的是静态秘钥，所以该方法在本地执行一次，获取到配对的公私钥保存下即可
    // 获取私钥
    genKeyPair.privateKey = rsaUtil.thisKeyPair.getPrivateKey();

    // 获取公钥
    genKeyPair.publicKey = rsaUtil.thisKeyPair.getPublicKey();

    return genKeyPair;
  },

  // 公钥加密
  encrypt: function (plaintext: any, publicKey: string) {
    // 由于秘钥已经生存一对保存在本地，该方法就在内部调用，生成setPublicKey方法
    this.genKeyPair();

    if (plaintext instanceof Object) {
      // 1、JSON.stringify
      plaintext = JSON.stringify(plaintext);
    }
    publicKey && rsaUtil.thisKeyPair.setPublicKey(publicKey);
    return rsaUtil.thisKeyPair.encrypt(JSON.stringify(plaintext));
  },

  // 私钥解密
  decrypt: function (ciphertext: any, privateKey: string) {
    privateKey && rsaUtil.thisKeyPair.setPrivateKey(privateKey);
    let decString = rsaUtil.thisKeyPair.decrypt(ciphertext);
    if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
      // JSON.parse
      decString = JSON.parse(decString);
    }
    return decString;
  }
};

/**
 * 本地rsa已经生成的秘钥，可以统一带-----BEGIN PUBLIC KEY-----/-----END PUBLIC KEY-----的前后缀，也可以不带
 */
const genKey = rsaUtil.genKeyPair();

export const publicKey = genKey.publicKey;

export const privateKey = genKey.privateKey;
