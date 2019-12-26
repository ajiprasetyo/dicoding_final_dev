var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBhhMjAZKAAXXmEy6QUuZAkq8-2u2aQoQsmezTZ8kn3dR6yj8Sof6WVUxOKsDehKvyrXdtZhr_V5WUDeMu1-Bbs",
   "privateKey": "P7bjwqw57pOzmQambub7WrHPaMNBVtHqmYkNyz9KOhM"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cRGb5yJUiEs:APA91bHVIOFw-XgxfTK79U1IUpDEkHuJYoKyXC-5jPfbHhc3Jg5Z6GL6HI_ReC5QWxclXVg0cbuTBwREYzbe8AIQyFIk0bHc3jEwLC0OH-CbePGuNfPLNiruH1xi29eAYzGiVLVdu9UU",
   "keys": {
       "p256dh": "BE+yFxv5/7NYVlQTu37SqDant7RAOd0Jz7IfmzZ7Q9/ZAIdJCf6eWWMAwXbM/vFPAPlMFXDVz6Ea3BcXKdeIfNg=",
       "auth": "2bFy66MSQIZ79/lP9oPwYA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '31322102898',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);