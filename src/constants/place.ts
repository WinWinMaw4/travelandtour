export interface Place {
  name: { en: string; mm: string };
  city: { en: string; mm: string };
  description: { en: string; mm: string };
  image: string;
}

export const places: Place[] = [
  {
    name: {
      en: "Masjid al-Haram",
      mm: "မစ်စဂျစ် အယ်လ်-ဟာရမ်",
    },
    city: {
      en: "Makkah",
      mm: "မက်ကာ",
    },
    description: {
      en: "The holiest mosque in Islam, home of the Kaaba, visited by millions of pilgrims during Hajj and Umrah.",
      mm: "အစ္စလမ်တွင် အကျော်ကြားဆုံးကျောင်းတော်ဖြစ်ပြီး၊ ကာအဘာရှိရာနေရာ၊ ဟတ်ချ်နှင့်အူမာအတွင်း လာရောက်သည့် ဧည့်သည်များအများဆုံးနေရာဖြစ်သည်။",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Great_Mosque_of_Mecca1.jpg/500px-Great_Mosque_of_Mecca1.jpg",
  },
  {
    name: {
      en: "Masjid an-Nabawi",
      mm: "မစ်စဂျစ် အန်-နဘဝီ",
    },
    city: {
      en: "Madinah",
      mm: "မဒီးနာ",
    },
    description: {
      en: "The Prophet’s Mosque, established by Prophet Muhammad (PBUH). A place of deep historical and spiritual significance.",
      mm: "တရားမူဆလင်များအတွက် အလွန်အရေးကြီးသောနေရာဖြစ်ပြီး၊ မဟာမက်နဘီ (ဆွလျ) တည်ထောင်ခဲ့သည့်ကျောင်းတော်ဖြစ်သည်။",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Al-Masjid_An-Nabawi.jpg",
  },
  {
    name: {
      en: "Mount Uhud",
      mm: "ဦဟုဒ်တောင်",
    },
    city: {
      en: "Madinah",
      mm: "မဒီးနာ",
    },
    description: {
      en: "Historical site of the Battle of Uhud, where early Muslims defended Islam against Quraysh.",
      mm: "ဦဟုဒ်စစ်ပွဲဖြစ်ပွားခဲ့သည့်နေရာဖြစ်ပြီး၊ ပထမဦးဆုံးမူဆလင်များသည် ဂူရိုင်ရှ်များကို တိုက်ခိုက်ကာ အစ္စလမ်ကို ကာကွယ်ခဲ့သည်။",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Mount_Uhud.jpg",
  },
];
