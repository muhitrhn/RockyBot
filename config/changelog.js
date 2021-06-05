const client = require(`./emojis`)
module.exports = {

   avVersions: `0.18 ${client.emojis.yellowDot} 0.17`,

   v018: `
   ${client.emojis.world} ***Ukończono 0/4***

   ${client.emojis.blueDot} Komenda **rymowanka**:
   ${client.emojis.rverify} Większa baza rymowanek;
   
   ${client.emojis.blueDot} Komenda **meme**: 
   ${client.emojis.rverify} Wysyłanie memów z jakiejś strony;
   
   ${client.emojis.blueDot} **Ustawienia** serwerowe:
   ${client.emojis.rverify} Podłączenie bazy danych, 
   ${client.emojis.rverify} Zmiana prefixu;
   `,
   
   v0171: `    
   ${client.emojis.yellowDot} **Wersja 0.17~1:** 

   ${client.emojis.blueDot} Komenda **changelog**:
   ${client.emojis.grverify} Wyświetlanie changelogu wersji;
   `,

   v017: `
   ${client.emojis.yellowDot} **Wersja 0.17:** 

   ${client.emojis.blueDot} Komenda **clear**:
   ${client.emojis.grverify} Thunbail usunąć, image -> thunbail po usunięciu, 
   ${client.emojis.grverify} Zmiana czasu zniknięcia info o usunięciu wiadomości, z 5 na 8 sekund,
   ${client.emojis.grverify} Poprawka w embed.setDescription();

   ${client.emojis.blueDot} Komenda **info**:
   ${client.emojis.grverify} Ogólnodostępność, 
   ${client.emojis.grverify} Poprawka w embed.setDescription();
   
   ${client.emojis.blueDot} Komenda **rymowanka**:
   ${client.emojis.grverify} Wysyłanie śmiesznych rymowanek;
   `,
}