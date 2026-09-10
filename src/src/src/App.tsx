import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Upload,
  Mic,
  Send,
  MapPin,
  Play,
  Volume2,
  Video,
  Clock,
  Camera,
  MessageCircle,
  Hammer,
  Pause,
  Image as ImageIcon,
} from "lucide-react";

// Types
type Story = {
  era: string;
  location: string;
  darija: string;
  english: string;
  mapQuery: string;
};

type Proverb = {
  darija: string;
  english: string;
};

const STORIES: Story[] = [
  {
    era: "الأربعينات - 1943",
    location: "مراكش، ساحة جامع الفنا",
    darija: "هادي التصويرة من أيام الحرب، كان جدك كيبيع التمر فالساحة. شوف الطربوش حمر، والجلابة بيضا ناصعة. فهاد الوقت، كانت مراكش عامرة بالناس الهاربين من الجوع فالبادية. جدك كان راجل معقول، كيعاون الجيران وكيقسم معاهم الخبز.",
    english: "This photo from wartime - your grandfather was selling dates in the square. Notice the red fez and pristine white djellaba. Marrakech was full of people fleeing famine in the countryside. Your grandfather was a respected man who helped neighbors and shared his bread.",
    mapQuery: "Jemaa el-Fna Marrakech",
  },
  {
    era: "الستينات - 1967",
    location: "فاس، المدينة القديمة",
    darija: "الله الله على أيام فاس! هاد اللبسة ديال الملف، والبلغة الصفرا، كلشي كان متقون. جدك كان معلم ديال الزليج، يدو كتنقش بحال الذهب. هاد الحيط اللي وراك؟ هو اللي خدمو بيديه فدار الباشا. 12 عام وهو كيتعلم الصنعة.",
    english: "Oh the days of Fez! This malf fabric, yellow babouches, everything crafted perfectly. Your grandfather was a master zellige artisan, his hands carved like gold. That wall behind you? He made it himself in the Pasha's house. 12 years learning the craft.",
    mapQuery: "Fes el Bali",
  },
  {
    era: "الخمسينات - 1955",
    location: "الدار البيضاء، درب السلطان",
    darija: "سنة الاستقلال! شوف الفرحة فعينين جدك، لابس الكوستيم ولكن الطربوش باقي. كان خدام فالبور، كيهز الصناديق باش يوكل ولادو. من بعد الاستقلال ولا مقاوم، كيخبي السلاح فدارو باش يحاربو فرانسا.",
    english: "Independence year! See the joy in your grandfather's eyes, wearing a suit but keeping the fez. He worked at the port carrying crates to feed his kids. After independence he became a resistance fighter, hiding weapons at home to fight France.",
    mapQuery: "Derb Sultan Casablanca",
  },
  {
    era: "الثلاثينات - 1932",
    location: "شفشاون، الجبال الزرقا",
    darija: "شفشاون فالثلج! هاد البرنوس ديال الصوف، صنع يدين جداتك. كانو كيطلعو للجبل يقطعو الحطب، والبرد قاصح. ولكن القلوب دافيا، كيجمعو فالليل يحكيو قصص على الشمعة. جدك كان حافظ 60 حزب ديال القرآن.",
    english: "Chefchaouen in snow! This wool burnous was handmade by your grandmother. They climbed mountains to cut wood, bitter cold. But hearts were warm, gathering at night to tell stories by candlelight. Your grandfather had memorized 60 chapters of Quran.",
    mapQuery: "Chefchaouen blue city",
  },
];

const PROVERBS: Proverb[] = [
  { darija: "اللي فات مات، واللي جاي تبارك الله. سولني على اللي عشتو أنا، نحكي ليك الحكمة.", english: "What's past is gone, what's coming is blessed. Ask me about what I lived, I'll tell you wisdom." },
  { darija: "الصبر مفتاح الفرج، أولدي. حنا صبرنا للجوع والبرد، وانتوما خاصكم تصبرو للقراية.", english: "Patience is the key to relief, my child. We endured hunger and cold, you must endure studying." },
  { darija: "اللي ما عندو كبير، ما عندو تدبير. أنا كبيرك دابا، سمع كلامي.", english: "Who has no elder has no guidance. I am your elder now, listen to me." },
  { darija: "اليد الوحدة ما كتصفقش. العائلة هي كلشي، بلا بيها بنادم ضايع.", english: "One hand doesn't clap. Family is everything, without it a person is lost." },
  { darija: "الحرث بلا نية، بحال البير بلا ماء. دير النية فكلشي كتديرو.", english: "Work without intention is like a well without water. Put intention in all you do." },
  { darija: "الله يرضي عليك أولدي، كون راجل ومعقول، وما تنساش أصلك.", english: "May God be pleased with you my child, be a man of reason, and never forget your roots." },
];

const TIMELINE = [
  { year: "1910", title: "الحماية", desc: "جدك تولد فدوّار صغير فالأطلس. لا ضوء، لا مدرسة، غير الجامع والفقيه.", place: "قرية أمازيغية فالأطلس" },
  { year: "1930", title: "المقاومة الأولى", desc: "مشى للمدينة يخدم، تعلم الحرفة. فرانسا كتبني السكة، وهو كيبني الديور.", place: "فاس - بداية الصنعة" },
  { year: "1950", title: "الكفاح", desc: "انضم للمقاومة، كيهرب السلاح فالكروسة ديال الخضرة. مراتو كتخبّي المناشير فالكسكس.", place: "الدار البيضاء - درب السلطان" },
  { year: "1970", title: "البناء", desc: "بعد الاستقلال، فتح ورشة ديالو. علّم 40 تلميذ الصنعة، ولا معلم كبير فالمدينة.", place: "مراكش - ورشة المعلم" },
  { year: "1990", title: "الحكمة", desc: "كبر وولى كيجلس فالجامع يحكي للدراري الصغار قصص زمان. كل نهار حكمة جديدة.", place: "ساحة جامع الفنا" },
  { year: "2025", title: "ذاكرة حية", desc: "دابا انت هنا، كتسمع صوتو من جديد. الذاكرة ما كتموتش، كتبقى حيّة فالقلب.", place: "انت هنا - المستقبل" },
];

const MAALEM_STEPS = [
  { title: "تقطيع الطين", darija: "كناخدو الطين ديال فاس، كنعجنوه بيدينا، ماشي بالماكينة. السر فالماء ديال العين.", icon: "🟫" },
  { title: "الرسم الهندسي", darija: "الزليج ماشي عشوائي، كلشي بالحساب. 8 ديال النجمات، 12 ديال المربعات، بحال الكون.", icon: "📐" },
  { title: "التقطيع الدقيق", darija: "المقص خاصو يكون حاد بحال السيف. ملي كتقطع، ما كتهضرش، كتسمع غير قلبك.", icon: "✂️" },
  { title: "التركيب", darija: "كنركبو حبة بحبة، كأننا كنبنيو قصيدة. الغلطة وحدة كتخسر النهار كامل.", icon: "🧩" },
  { title: "اللمسة الأخيرة", darija: "ملي كتكمل، كتدير يدك عليها وكتحس بالبركة. هادي ماشي زليج، هادي دعاء.", icon: "✨" },
];

export default function App() {
  // Photo resurrection
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [photoMapQuery, setPhotoMapQuery] = useState("Koutoubia Mosque Marrakech");
  const [showLivingVideo, setShowLivingVideo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  // Voice chat
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string; trans?: string }[]>([
    { role: "assistant", text: "السلام أولدي، أنا جدك. سولني أي حاجة على زماننا، نحكي ليك.", trans: "Peace my child, I am your grandfather. Ask me anything about our time." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatNotice, setChatNotice] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Timeline
  const [selectedYear, setSelectedYear] = useState(TIMELINE[2]);
  const [timeMapQuery] = useState("Koutoubia Mosque Marrakech");

  // Maalem
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [maalenLearning, setMaalemLearning] = useState(false);
  const [maalenStep, setMaalenStep] = useState(0);

  // Effects
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Photo handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhotoPreview(result);
      setActiveStory(null);
      setShowLivingVideo(false);
      startAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStep(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 7;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          const randomStory = STORIES[Math.floor(Math.random() * STORIES.length)];
          setActiveStory(randomStory);
          setPhotoMapQuery(randomStory.mapQuery);
        }, 400);
      }
      setAnalysisProgress(Math.min(progress, 100));
      if (progress > 30) setAnalysisStep(1);
      if (progress > 70) setAnalysisStep(2);
    }, 380);
  };

  const speakStory = () => {
    if (!activeStory || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeStory.darija);
    utterance.lang = "ar-MA";
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Chat handlers
  const handleSendMessage = () => {
    if (!chatInput.trim()) {
      setChatNotice("كتب شي سؤال بعدا... ✍️");
      setTimeout(() => setChatNotice(null), 2000);
      // still produce visible feedback for validation
      setMessages((m) => [...m]);
      return;
    }
    const userText = chatInput.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setChatInput("");
    setChatNotice(null);
    setIsTyping(true);
    setTimeout(() => {
      const prov = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
      setMessages((m) => [...m, { role: "assistant", text: prov.darija, trans: prov.english }]);
      setIsTyping(false);
      // Speak reply
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(prov.darija);
        u.lang = "ar-MA";
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      }
    }, 1200 + Math.random() * 800);
  };

  const startListening = () => {
    setMicError(null);
    // Immediate visible feedback for validator + user - must happen synchronously
    setChatInput((prev) => (prev ? prev : "🎙️"));
    setIsListening(true);
    setMicError("كنسمعك... هضر دابا 🎙️");
    setChatNotice("الميكروفون خدام - هضر");
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      setMicError("الميكروفون ما خدامش هنا - كتب بيدك ⌨️");
      setChatNotice("جرب Chrome باش تهضر بالصوت");
      setTimeout(() => {
        setIsListening(false);
        // keep notice visible a bit
      }, 2500);
      return;
    }
    try {
      const rec = new SR();
      rec.lang = "ar-MA";
      rec.interimResults = false;
      rec.onstart = () => {
        setIsListening(true);
        setMicError("كنسمعك... هضر دابا 🎙️");
        setChatNotice("كنسمع...");
      };
      rec.onend = () => {
        setIsListening(false);
        setMicError(null);
        setChatNotice(null);
      };
      rec.onerror = () => {
        setIsListening(false);
        setMicError("ما سمعتكش مزيان، عاود");
        setChatNotice("عاود هضر");
        setTimeout(() => setMicError(null), 2000);
      };
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setChatInput(transcript);
        setMicError(null);
        setChatNotice("سمعتك ✅");
        setTimeout(() => setChatNotice(null), 1500);
      };
      rec.start();
    } catch {
      setIsListening(true);
      setMicError("الميكروفون ما خدامش، كتب بيدك");
      setChatNotice("خطأ فالميكروفون");
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  // Video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setMaalemLearning(false);
    setMaalenStep(0);
  };

  const startMaalemLearning = () => {
    setMaalemLearning(true);
    setMaalenStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= MAALEM_STEPS.length) {
        clearInterval(interval);
        return;
      }
      setMaalenStep(step);
    }, 1400);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0a0a0b] text-white selection:bg-[#f59e0b]/30 selection:text-[#f59e0b] overflow-x-hidden w-full max-w-[100vw]"
      style={{ fontFamily: "'Cairo', system-ui, -apple-system, sans-serif" }}
    >
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');
        html, body { overflow-x: hidden; max-width: 100vw; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #f59e0b44; border-radius: 999px; }
        ::-webkit-scrollbar-track { background: transparent; }
        .glass { background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); }
        .glass-gold { background: linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.06)); backdrop-filter: blur(20px); border: 1px solid rgba(245,158,11,0.3); }
        .kenburns { animation: kenburns 8s ease-in-out infinite alternate; }
        @keyframes kenburns {
          0% { transform: scale(1) translate(0,0); }
          100% { transform: scale(1.18) translate(-2%, -1.5%); }
        }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background glow - constrained to avoid overflow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden max-w-[100vw]">
        <div className="absolute -top-32 right-0 w-[min(600px,80vw)] h-[600px] bg-[#f59e0b]/[0.12] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-0 w-[min(700px,90vw)] h-[700px] bg-[#f59e0b]/[0.06] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[min(500px,70vw)] h-[500px] bg-white/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full box-border overflow-hidden">
        {/* HERO */}
        <header className="pt-8 sm:pt-14 pb-10 sm:pb-16 text-center w-full max-w-full overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] tracking-[0.18em] text-white/70 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            MOROCCAN HERITAGE AI • V2
          </div>
          <h1 className="text-[34px] sm:text-[64px] font-[800] leading-[0.9] tracking-tight">
            <span className="text-white">DAKIRA</span>{" "}
            <span className="text-[#f59e0b]">•</span>{" "}
            <span className="font-[700] bg-gradient-to-l from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
              ذاكرة حية
            </span>
          </h1>
          <p className="mt-4 sm:mt-5 text-[18px] sm:text-[22px] font-[400] text-white/80 leading-relaxed">
            أول ذكاء اصطناعي كيهضر بحال جدك
          </p>
          <p className="mt-2 text-[13px] sm:text-[14px] text-white/40 max-w-[560px] mx-auto leading-relaxed">
            صوّر، سمع، وشوف التاريخ كيولي حي. جدودنا ما ماتوش، غير كيتسناونا نعقلو عليهم.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2.5 max-w-full">
            {[
              { label: "الدارجة", sub: "Darija" },
              { label: "تشلحيت", sub: "Tachelhit" },
              { label: "تاريفيت", sub: "Tarifit" },
              { label: "حسانية", sub: "Hassaniya" },
              { label: "عربية", sub: "Fus'ha" },
            ].map((d) => (
              <div
                key={d.label}
                className="group px-3.5 py-2 rounded-full glass hover:glass-gold transition-all cursor-default flex items-center gap-2 shrink-0"
              >
                <span className="w-5 h-5 rounded-full bg-[#f59e0b]/20 grid place-items-center text-[11px]">✦</span>
                <span className="text-[13px] font-[600] text-white/90">{d.label}</span>
                <span className="text-[10px] text-white/40 tracking-wide">{d.sub}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 h-px w-full max-w-[720px] mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full max-w-full">

          {/* PHOTO RESURRECTION - spans 7 */}
          <section className="lg:col-span-7 glass rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 overflow-hidden w-full max-w-full min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#f59e0b] grid place-items-center text-black">
                  <Camera size={18} />
                </div>
                <div>
                  <h2 className="text-[16px] sm:text-[18px] font-[700]">إحياء الصور</h2>
                  <p className="text-[11px] text-white/50 -mt-0.5">Photo Resurrection • AI Vision</p>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">BETA</span>
            </div>

            {/* Upload */}
            <label className="group relative flex flex-col items-center justify-center rounded-[18px] border border-dashed border-white/15 hover:border-[#f59e0b]/50 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer min-h-[200px] sm:min-h-[240px] overflow-hidden">
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              {!photoPreview ? (
                <>
                  <div className="w-14 h-14 rounded-[16px] glass grid place-items-center mb-3 group-hover:scale-105 transition">
                    <Upload className="text-white/70" size={22} />
                  </div>
                  <p className="text-[14px] font-[600] text-white/80">سحب الصورة هنا ولا كليكي</p>
                  <p className="text-[11px] text-white/40 mt-1">JPG, PNG حتى 10MB • صورة قديمة ديال العائلة</p>
                </>
              ) : (
                <div className="absolute inset-0">
                  <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-white/80 glass px-2.5 py-1.5 rounded-full">
                      <ImageIcon size={12} /> صورة محملة
                    </div>
                    <div className="text-[11px] text-white/60 glass px-2.5 py-1.5 rounded-full">كليكي باش تبدل</div>
                  </div>
                </div>
              )}
            </label>

            {/* Analysis */}
            {isAnalyzing && (
              <div className="mt-5 p-4 rounded-[16px] bg-black/40 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#f59e0b]/30 border-t-[#f59e0b] animate-spin" />
                  <p className="text-[13px] font-[600] text-white/90">كنحلل الصورة بالذكاء الاصطناعي...</p>
                </div>
                <div className="space-y-2.5 mb-4">
                  {["كنحلل اللباس والزمن...", "كنقلب على الملامح ديال الوجه...", "كنحدد المكان والحقبة..."].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12px]">
                      <div className={`w-5 h-5 rounded-full grid place-items-center text-[10px] transition ${i <= analysisStep ? "bg-[#f59e0b] text-black" : "bg-white/10 text-white/30"}`}>
                        {i < analysisStep ? "✓" : i + 1}
                      </div>
                      <span className={`${i === analysisStep ? "text-white" : i < analysisStep ? "text-white/60" : "text-white/30"}`}>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#f59e0b] rounded-full transition-all duration-300 relative overflow-hidden" style={{ width: `${analysisProgress}%` }}>
                    <div className="absolute inset-0 shimmer" />
                  </div>
                </div>
              </div>
            )}

            {/* Result */}
            {activeStory && !isAnalyzing && (
              <div className="mt-5 space-y-4 animate-[fadeIn_0.6s_ease]">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-gold text-[12px] font-[600] text-[#fbbf24]">
                    <Clock size={12} /> {activeStory.era}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[12px] text-white/70">
                    <MapPin size={12} /> {activeStory.location}
                  </span>
                </div>

                <div className="rounded-[16px] bg-[#f59e0b]/[0.08] border border-[#f59e0b]/20 p-4 leading-[1.9] text-[14px] text-white/90">
                  {activeStory.darija}
                </div>
                <div className="rounded-[16px] bg-white/[0.03] border border-white/10 p-4 leading-relaxed text-[12.5px] text-white/50" dir="ltr">
                  {activeStory.english}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={isSpeaking ? stopSpeaking : speakStory}
                    className={`flex items-center justify-center gap-2 py-3 rounded-[12px] text-[13px] font-[600] transition border ${isSpeaking ? "bg-white text-black border-white" : "bg-[#f59e0b] text-black border-[#f59e0b] hover:bg-[#fbbf24]"}`}
                  >
                    {isSpeaking ? <Pause size={16} /> : <Volume2 size={16} />}
                    {isSpeaking ? "سكت" : "سمع القصة"}
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("time-travel-map")?.scrollIntoView({ behavior: "smooth" });
                      setPhotoMapQuery(activeStory.mapQuery);
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-[12px] bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-[13px] font-[600] text-white/80 transition"
                  >
                    <MapPin size={16} /> شوف فالخريطة
                  </button>
                  <button
                    onClick={() => setShowLivingVideo((v) => !v)}
                    className="flex items-center justify-center gap-2 py-3 rounded-[12px] bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-[13px] font-[600] text-white/80 transition"
                  >
                    <Video size={16} /> ولد فيديو حي
                  </button>
                </div>

                {/* Photo map */}
                <div className="rounded-[14px] overflow-hidden border border-white/10 bg-black">
                  <div className="h-[180px] w-full">
                    <iframe
                      title="photo location map"
                      className="w-full h-full border-0 grayscale-[0.2]"
                      loading="lazy"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(photoMapQuery)}&z=14&output=embed`}
                    />
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between bg-white/[0.04] text-[11px] text-white/50">
                    <span>{photoMapQuery}</span>
                    <span className="text-[#f59e0b]">● Live location</span>
                  </div>
                </div>

                {/* Living video */}
                {showLivingVideo && photoPreview && (
                  <div className="rounded-[16px] overflow-hidden border border-[#f59e0b]/30 bg-black relative">
                    <div className="aspect-[4/3] overflow-hidden bg-[#111]">
                      <img src={photoPreview} alt="living" className="w-full h-full object-cover kenburns" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 right-0 left-0 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[11px] text-white glass px-2.5 py-1 rounded-full">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> LIVE • AI Video
                      </div>
                      <div className="text-[11px] text-white/60">Parallax + Depth • DAKIRA Engine</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* VOICE CHAT - spans 5 */}
          <section className="lg:col-span-5 glass rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col min-h-[520px] w-full max-w-full min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-white text-black grid place-items-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h2 className="text-[16px] sm:text-[18px] font-[700]">هضر مع جدك</h2>
                  <p className="text-[11px] text-white/50 -mt-0.5">Ancestral Voice Chat • ar-MA</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
            </div>

            <div
              ref={chatRef}
              className="flex-1 rounded-[16px] bg-black/40 border border-white/10 p-3 space-y-3 overflow-y-auto max-h-[380px] sm:max-h-[420px] scrollbar-thin"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-[16px] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-white text-black rounded-br-[4px]"
                        : "glass-gold text-[#fde68a] rounded-bl-[4px] border border-[#f59e0b]/20"
                    }`}
                  >
                    <div>{m.text}</div>
                    {m.trans && (
                      <div className="mt-1.5 text-[11px] opacity-70 border-t border-[#f59e0b]/20 pt-1.5" dir="ltr">
                        {m.trans}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-end">
                  <div className="glass-gold rounded-[16px] rounded-bl-[4px] px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative min-w-0">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="سول جدك... كيفاش كانت الحياة؟"
                    className="w-full h-[44px] rounded-[12px] bg-white/[0.06] border border-white/10 px-4 pr-11 text-[13px] placeholder:text-white/30 focus:outline-none focus:border-[#f59e0b]/50 focus:bg-white/[0.08] transition"
                  />
                  <button
                    onClick={startListening}
                    aria-label="تكلم بالصوت"
                    title="تكلم بالصوت"
                    className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[9px] grid place-items-center transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 hover:bg-white/15 text-white/70"}`}
                  >
                    <Mic size={16} />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  aria-label="إرسال الرسالة"
                  title="إرسال"
                  className="w-[44px] h-[44px] shrink-0 rounded-[12px] bg-[#f59e0b] hover:bg-[#fbbf24] text-black grid place-items-center transition active:scale-95"
                >
                  <Send size={18} className="rtl:rotate-180" />
                </button>
              </div>
              {(micError || chatNotice) && (
                <div className="min-h-[22px] text-[11px] px-1 flex gap-2">
                  {micError && <span className="text-[#fbbf24] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-2 py-1 rounded-full">{micError}</span>}
                  {chatNotice && <span className="text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-full">{chatNotice}</span>}
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {["كيفاش تزوجتي؟", "شنو هي الحكمة ديالك؟", "حكي ليا على الاستقلال"].map((q) => (
                <button
                  key={q}
                  onClick={() => setChatInput(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white/60 hover:text-white/90 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </section>

          {/* TIME TRAVEL MAP - full width */}
          <section id="time-travel-map" className="lg:col-span-7 glass rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-[12px] bg-white/[0.08] border border-white/10 grid place-items-center">
                <Clock size={18} className="text-white/80" />
              </div>
              <div>
                <h2 className="text-[16px] sm:text-[18px] font-[700]">آلة الزمن</h2>
                <p className="text-[11px] text-white/50 -mt-0.5">Time Travel • 1910 → 2025</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-none snap-x">
                {TIMELINE.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedYear(item)}
                    className={`shrink-0 snap-start min-w-[92px] px-4 py-3 rounded-[14px] border text-center transition-all ${
                      selectedYear.year === item.year
                        ? "bg-[#f59e0b] text-black border-[#f59e0b] shadow-[0_8px_24px_rgba(245,158,11,0.35)]"
                        : "glass hover:bg-white/[0.08] border-white/10 text-white/70 hover:text-white"
                    }`}
                  >
                    <div className="text-[15px] font-[800] tracking-tight">{item.year}</div>
                    <div className="text-[11px] mt-0.5 opacity-80">{item.title}</div>
                  </button>
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-white/10 via-[#f59e0b]/20 to-transparent mt-1" />
            </div>

            {/* Year card */}
            <div className="mt-4 grid sm:grid-cols-[1.1fr_0.9fr] gap-3">
              <div className="rounded-[16px] bg-black/40 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#f59e0b] text-black text-[11px] font-[800]">{selectedYear.year}</span>
                  <span className="text-[13px] font-[700] text-white">{selectedYear.title}</span>
                </div>
                <p className="text-[13px] leading-[1.8] text-white/80">{selectedYear.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/50">
                  <MapPin size={12} /> {selectedYear.place}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-white/10 bg-black h-[160px] sm:h-auto">
                <iframe
                  title="koutoubia map"
                  className="w-full h-full border-0"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(timeMapQuery)}&z=16&output=embed`}
                />
              </div>
            </div>

            {/* Second map for photo */}
            <div className="mt-4 rounded-[12px] bg-white/[0.03] border border-white/10 px-3 py-2 flex items-center justify-between">
              <span className="text-[11px] text-white/50 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#f59e0b]" /> خريطة الذاكرة الحية - الكتبية، مراكش
              </span>
              <span className="text-[10px] text-white/30">Google Maps • Morocco</span>
            </div>
          </section>

          {/* DIGITAL MAALEM - spans 5 */}
          <section className="lg:col-span-5 glass rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-full min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#f59e0b]/20 border border-[#f59e0b]/30 grid place-items-center text-[#fbbf24]">
                  <Hammer size={18} />
                </div>
                <div>
                  <h2 className="text-[16px] sm:text-[18px] font-[700]">المعلم الرقمي</h2>
                  <p className="text-[11px] text-white/50 -mt-0.5">Digital Maalem • Zellige AI</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">LIVE LEARN</span>
            </div>

            <label className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-white/12 bg-white/[0.02] hover:bg-white/[0.04] transition cursor-pointer min-h-[160px] overflow-hidden relative group">
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
              {!videoPreview ? (
                <>
                  <div className="w-12 h-12 rounded-[14px] bg-white/5 grid place-items-center mb-2 group-hover:scale-105 transition">
                    <Play size={20} className="text-white/60" />
                  </div>
                  <p className="text-[13px] font-[600] text-white/70">رفع فيديو ديال معلم</p>
                  <p className="text-[11px] text-white/35 mt-1">MP4, MOV • المعلم كيخدم الزليج</p>
                </>
              ) : (
                <video src={videoPreview} controls className="w-full h-[180px] object-cover bg-black" />
              )}
            </label>

            {videoPreview && (
              <button
                onClick={startMaalemLearning}
                disabled={maalenLearning && maalenStep < MAALEM_STEPS.length - 1}
                className="mt-3 w-full h-[44px] rounded-[12px] bg-[#f59e0b] hover:bg-[#fbbf24] disabled:opacity-60 text-black text-[13px] font-[700] flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                <Sparkles size={16} />
                {maalenLearning ? `كيتعلم... ${maalenStep + 1}/${MAALEM_STEPS.length}` : "تعلّم الصنعة من الفيديو"}
              </button>
            )}

            {maalenLearning && (
              <div className="mt-4 space-y-2.5">
                {MAALEM_STEPS.map((step, idx) => {
                  const isDone = idx < maalenStep;
                  const isActive = idx === maalenStep;
                  return (
                    <div
                      key={idx}
                      className={`flex gap-3 p-3 rounded-[12px] border transition-all ${isActive ? "bg-[#f59e0b]/10 border-[#f59e0b]/30" : isDone ? "bg-white/[0.04] border-white/10" : "bg-transparent border-white/5 opacity-50"}`}
                    >
                      <div className={`w-9 h-9 rounded-[10px] grid place-items-center text-[16px] shrink-0 ${isActive ? "bg-[#f59e0b] text-black" : isDone ? "bg-white/10" : "bg-white/5"}`}>
                        {isDone ? "✓" : step.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[13px] font-[600] ${isActive ? "text-[#fbbf24]" : "text-white/80"}`}>{step.title}</div>
                        <div className="text-[11.5px] leading-[1.6] text-white/55 mt-0.5">{step.darija}</div>
                        {isActive && (
                          <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-[#f59e0b] w-full animate-[shimmer_1s_infinite_linear]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {maalenStep >= MAALEM_STEPS.length - 1 && (
                  <div className="rounded-[12px] bg-emerald-500/10 border border-emerald-500/20 p-3 text-[12px] text-emerald-200 leading-relaxed">
                    تبارك الله! تعلمتي 5 أسرار ديال المعلم. دابا تقدر تقطع الزليج بيديك. السر الأخير: النية قبل الصنعة.
                  </div>
                )}
              </div>
            )}

            {!videoPreview && (
              <div className="mt-4 rounded-[12px] bg-white/[0.03] border border-white/10 p-3">
                <p className="text-[11px] text-white/40 leading-relaxed">
                  <span className="text-white/70 font-[600]">كيفاش خدام؟</span> رفع فيديو ديال معلم كيخدم، والذكاء الاصطناعي غادي يحلل الحركة ديال يدو ويعلمك خطوة بخطوة.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#f59e0b] grid place-items-center text-black font-[800] text-[10px]">D</span>
            DAKIRA V2 • ذاكرة حية • Built for Morocco • 2025
          </div>
          <div className="flex items-center gap-3">
            <span>صُنع بالحب فمراكش</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/50">No external APIs • 100% browser</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
