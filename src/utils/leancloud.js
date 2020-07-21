import AV from 'leancloud-storage'
import { Realtime, TextMessage, Event } from 'leancloud-realtime'
// import { LEANCLOUD } from '@/config/index'
// import { decrypt, encrypt} from "@/modules/utils/crypto.js";
import { decrypt} from "@/modules/utils/crypto.js";

// alert(encrypt(LEANCLOUD))
// console.log(encrypt(LEANCLOUD),'111');

const LEANCLOUD1 = 'ofrsR3JqClqm6Lg3oyn/Ef3BJgqeYU8/fz3xYL9lBgI18yJKa1NkdaQJtfkCoO30B0KYdBgOMPfe/NAJWrdkXLeNoDstDfSNVN6t+4888WpYHyHpGAq58/OHf2a2KBJlyzpX25MaOFkGLJV6UVNqE4BGCum65stjGyKOfkjpWGZb4E8Vc/SEN/It3DQwf/b3qA6+z/OBqZjlWlOMFwqU5DgtR56NbNu8D93ppdZg1Zk+jIn5P6RLtIXxpWxngpgJ+1IycwLmGQIl3iMUp5Kc8s44YmoskYkC0OnzeqBmb9P82z84TQMCih0+R7S73Gf03iMSi0plGeqxdtpqEC7UTr0BtWBlFWZaxsjbQI6kjs0='
console.log(JSON.parse(decrypt(LEANCLOUD1)))
console.log(JSON.parse(decrypt(LEANCLOUD1))[process.env.VUE_APP_CONFIG_ENV],'JSON.parse(decrypt(LEANCLOUD1))[process.env.VUE_APP_CONFIG_ENV]');
console.log(111,process.env.VUE_APP_CONFIG_ENV)
console.log(222,process.env.NODE_ENV)
console.log(333,process.env.VUE_APP_ZY_API)
console.log(process.env)


export const { Query, User } = AV

// console.log(encrypt('',JSON.stringify(LEANCLOUD)),'11223123')
// console.log(JSON.parse(decrypt(LEANCLOUD1))[process.env.VUE_APP_CONFIG_ENV],'decrypt')

export const realTime = new Realtime(JSON.parse(decrypt(LEANCLOUD1))[process.env.NODE_ENV])
// export const realTime = new Realtime(JSON.parse(decrypt(LEANCLOUD))[process.env.VUE_APP_CONFIG_ENV])
// export const realTime = new Realtime({
//   appId: "YHz9zkHxEbyArSGzt3K8hsIt-9Nh9j0Va",
//   appKey: "htgG1qAVhuLKLvCwpb6PhIVz",
//   masterKey: "EfpYEthDqR8Esldz09eswmqG",
//   server: "https://chat.likedu.top"
// })
export const Message = TextMessage

export const event = Event
