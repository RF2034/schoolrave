/** 組ごとの順番。公開した人の次をメンションする。5組の釖(KTN)は順番に入れない。 */

const ROTATION: Record<string, Array<{ names: string[]; userId: string }>> = {
  "1組": [
    { names: ["モリキリデコイツ"], userId: "258972154421444609" },
    { names: ["BigMaus"], userId: "607596921577537557" },
    { names: ["うさえ"], userId: "231585635381542913" },
    { names: ["Neruyo"], userId: "624628070414024717" },
    { names: ["しゃげ"], userId: "523095960050597889" },
    { names: ["よほた"], userId: "559009226618437642" },
  ],
  "2組": [
    { names: ["SUGACHAN", "༒༽ SUGACHAN༼༒"], userId: "493664722118377474" },
    { names: ["えもじ"], userId: "992361066732453938" },
    { names: ["ようぜお", "youzeo4"], userId: "394806015452905473" },
    { names: ["さばみそ"], userId: "439009179827699712" },
    { names: ["ron3lyscript"], userId: "307163554279194625" },
    { names: ["がんも"], userId: "412124878641168385" },
    { names: ["s3atake"], userId: "134983599270264832" },
  ],
  "3組": [
    { names: ["SMACK17"], userId: "307161223311523860" },
    { names: ["あまのがわ"], userId: "325945987954638851" },
    { names: ["うさぎつね", "Oage"], userId: "249196362955096076" },
    { names: ["ADOL"], userId: "710437686229467236" },
    { names: ["茅野Chino"], userId: "869222360006410290" },
    { names: ["ジャック"], userId: "387261715428933632" },
    { names: ["まーしぃ"], userId: "561010990393851959" },
  ],
  "4組": [
    { names: ["kurank"], userId: "438171926481993728" },
    { names: ["TamolarM"], userId: "422741468030173196" },
    { names: ["ちくわぶ"], userId: "404952149953609738" },
    { names: ["サファリ"], userId: "1303348238866321484" },
    { names: ["ふにゃ"], userId: "254215883478663170" },
    { names: ["業者"], userId: "270857258244505602" },
    { names: ["まいんず"], userId: "507037527308238848" },
  ],
  "5組": [
    { names: ["まーぴょん"], userId: "477111503548579843" },
    { names: ["あお"], userId: "1271668648137855039" },
    { names: ["twoway15"], userId: "727459210589372467" },
    { names: ["三角", "🔺三角🔺"], userId: "235021051128446976" },
    { names: ["そるびー"], userId: "552713578772430848" },
    { names: ["メジェド", "メジエド"], userId: "471601317853397003" },
  ],
  "6組": [
    { names: ["きゅーまるさま"], userId: "366867831184424973" },
    { names: ["MTTS", "みっちゃん"], userId: "438334362191134730" },
    { names: ["ひろろく"], userId: "508608221632659466" },
    { names: ["kaki0121"], userId: "707236648781480069" },
    { names: ["正宗"], userId: "249160824944328706" },
    { names: ["オガ@Nero"], userId: "737280113229693020" },
  ],
};

const SITE = "https://schoolrave.net";

export function normalizeDiaryName(value: string): string {
  return value.normalize("NFKC").trim();
}

/** 同じ組の次の人。名前が表に無ければ null。組をまたがない。 */
export function nextDiaryMention(kumi: string, name: string): string | null {
  const group = ROTATION[kumi.trim()];
  if (!group) return null;
  const key = normalizeDiaryName(name);
  if (!key) return null;
  const index = group.findIndex((person) =>
    person.names.some((alias) => normalizeDiaryName(alias) === key),
  );
  if (index < 0) return null;
  return group[(index + 1) % group.length].userId;
}

export function diaryDiscordPayload(input: {
  title: string;
  kumi: string;
  name: string;
  slug: string;
}): { content: string; allowed_mentions: { parse: []; users: string[] } } {
  const title = input.title.replace(/\s+/g, " ").trim().slice(0, 200);
  const kumi = input.kumi.trim();
  const name = input.name.trim();
  const userId = nextDiaryMention(kumi, name);
  const who = [kumi, name].filter(Boolean).join(" ");
  const head = who && title ? `${who}「${title}」` : who || title || "交換日記";
  const path = input.slug.trim()
    ? `/portal/diary/${encodeURIComponent(input.slug.trim())}`
    : "/portal/diary";
  const lines = ["交換日記が公開されました", head, `${SITE}${path}`];
  if (userId) lines.push(`<@${userId}>`);
  return {
    content: lines.join("\n"),
    allowed_mentions: { parse: [], users: userId ? [userId] : [] },
  };
}
