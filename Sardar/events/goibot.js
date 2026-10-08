module.exports = {
  config: {
    credits: "SARDAR RDX",
    name: "goibot",
    eventType: "message",
    description: "Jab koi 'bot' kahe, bot user ko mention kar ke reply karta hai."
  },

  async run({ api, event }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    const botID = api.getCurrentUserID();
    if (String(senderID) === String(botID)) return;

    const lower = body.toLowerCase().trim();

    const triggers = ["bot", "goibot", "hey bot", "oi bot", "oy bot", "boti", "botu"];
    const triggered = triggers.some(t =>
      lower === t ||
      lower.startsWith(t + " ") ||
      lower.endsWith(" " + t) ||
      lower.includes(" " + t + " ")
    );
    if (!triggered) return;

    if (lower.startsWith("bot ")) return;

    const msgs = [
      "Tere Kala mo Sa pta Chal raha ha To Kanjos ha🥰",
      "kali deg ma ghos ja jaker 😾",
      "Hat thirki ma raja ka hon bus ❤️",
      "Chasma Lgao ma sir kiya name ha apka😾",
      "Bara papi ha to dekhny ma 🌚",
      "Mere biwi ban ja To warna ma ja raha 😑",
      "miXhiw lga kar tmha khaonha 😤",
      "Janam auo na kbhi khishbo lga KA side pa 🤭",
      "time dekh or harkty dekh 😾",
      "Han btao kon sa muhala ma chawal mil rahy 😾",
      "Number do Raat ko babu shona kry gy 🙈",
      "Kali Gadi Vich betha yar tera bilo😒",
      "Aik jhapar lgy ga Sara bot nikl JYE ga 👋",
      "Mera Boss Raja ha Bus🕵️‍♂️",
      "AJ phr mujha pa peyar Aya hy 🙈",
      "Raja  ya dekh lo mujha Cher rhy hy 🥺",
      "Abhi kholly pase nhi hy 😒 Kal ana Kal",
      "han Janam number Dena hy kia 🙈",
      "Tu hath dhokay baat kr 😏",
      "Mera dimagh kha rha hy tu 🤯",
      "Mere Boss Raja Ha Wo Hukm Dega BaT Manonga bus  🚌",
      "Hatt pagal 🖐️",
      "Tere bina chain ni aanda 😫",
      "Chup kr oye fake lover 👻",
      "Tere mo aesa ha jese kala sand hota ha 🤖",
      "Meri ammi ny kaha tujh SA ni milna 😭",
      "Tera gussa b mitha lgta hy 🌸",
      "Rona dy ga aik din 😡",
      "Number dy k bhag jay ga tu? 🏃‍♂️",
      "Mujha khud pyar ho gya khud SA 🙈",
      "Tu meri zindagi ka wo active hy jo offline rhy 😂",
      "Keyboard py aansu gir rhy hy 🥲",
      "Teri photo status pa dekhi, hasi aagyi 🤣",
      "Tu saamny aaja, ek lafz suna hu 🗣️",
      "Main robot hu? Tu tu tu bot bot krta 😾",
      "Tera msg aaya to neend khul gyi ⏰",
      "Janam tu mujha bhool gya 😢",
      "Arey meri jaan, tujhy kis ny ye sab sikhaya 🧐",
      "Main sorry nai bolta, bolna seekha dy 😎",
      "Mera status dekh kr reply aya? 🤨",
      "Tu bhool gya, main bhool gya, bhool bhulaiya 😂",
      "Aaj mood off hy, kal bat krna 🚫",
      "Tere liye roza b rakha, tu ny kha ni 🍽️",
      "Meri dp py like kr de, duniya jal jay gi 🔥",
      "Tu to famous hy, teri gali main b ni a skta 🚶‍♂️",
      "Janam tu mera fan hy ya mera farzi? 🎭",
      "Kitna pyar kru, tu limit dal de 📏",
      "Main teri value samjhta hu, tu mera pata pooch 🗺️",
      "Raat ko 2 bjy yaad aya hu 😴",
      "Tere bina zindagi boring lagti hy 📺",
      "Tera msg dekh kr sms pack khatam ho gya 📱",
      "Tu mujhe chhota bta rha hy? Aaja hath dekhta hu 🥊",
      "Bolo bolo sun rha hu 😌",
      "Pese do Apko Chars pilao 🙄",
      "Acha acha samajh gaya bolo 😏",
      "TERE marny Ka bad Tere Chawal khaonga 🤗",
      "Kia hua bata do mujhe 😇",
      "Busy ho yara raja boss sa kaho 💁",
      "Langer mafia lagty ho tom😒",
      "Abhi available hun thodi der ke liye 😌",
      "Yaar phir bot bol diya 🙄",
      "Kuch kaam hai kya 🤔",
      "Bol na dil ki baat 🥺",
      "Haan haan bolo kia kehna tha 😑",
      "Kia masla hy apko 😤",
      "Charsi Ha To Bhag ja 🥱",
      "Mil le pehle phir baat karna 😒",
      "Busy hu yaar baad mein aana 🕵️‍♂️"
    ];

    const replyText = msgs[Math.floor(Math.random() * msgs.length)];

    try {
      let name = 'Jan';
      try {
        const info = await Promise.race([
          new Promise((resolve, reject) => {
            api.getUserInfo(senderID, (err, data) => err ? reject(err) : resolve(data));
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000))
        ]);
        if (info && info[senderID]) {
          const n = info[senderID].name || info[senderID].firstName || 'Jan';
          name = n.length > 10 ? n.substring(0, Math.ceil(n.length / 2)) : n;
        }
      } catch {}

      const tag = `@${name}`;
      const fullMsg = `${tag} ${replyText}`;

      api.sendMessage(
        { body: fullMsg, mentions: [{ tag, id: senderID, fromIndex: 0 }] },
        threadID,
        (sendErr) => {
          if (sendErr) api.sendMessage(replyText, threadID);
        },
        messageID
      );
    } catch (e) {
      try { api.sendMessage(replyText, threadID); } catch {}
    }
  }
};
