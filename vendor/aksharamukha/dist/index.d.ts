import * as fs from 'fs';
import * as pyodide from 'pyodide';
import { PyodideInterface } from 'pyodide';

declare enum ScriptIndic {
    Ahom = "Ahom",
    Ariyaka = "Ariyaka",
    Assamese = "Assamese",
    Avestan = "Avestan",
    Balinese = "Balinese",
    BatakKaro = "BatakKaro",
    BatakMandailing = "BatakManda",
    BatakPakpak = "BatakPakpak",
    BatakSimalungun = "BatakSima",
    BatakToba = "BatakToba",
    BengaliBangla = "Bengali",
    Bhaiksuki = "Bhaiksuki",
    Brahmi = "Brahmi",
    BugineseLontara = "Buginese",
    Buhid = "Buhid",
    BurmeseMyanmar = "Burmese",
    Chakma = "Chakma",
    Cham = "Cham",
    Devanagari = "Devanagari",
    DivesAkuru = "DivesAkuru",
    Dogra = "Dogra",
    GondiGunjala = "GunjalaGondi",
    GondiMasaram = "MasaramGondi",
    Grantha = "Grantha",
    GranthaPandya = "GranthaPandya",
    Gujarati = "Gujarati",
    Hanunoo = "Hanunoo",
    Hebrew = "Hebrew",
    JapaneseHiragana = "Hiragana",
    JapaneseKatakana = "Katakana",
    Javanese = "Javanese",
    Kaithi = "Kaithi",
    Kannada = "Kannada",
    Kawi = "Kawi",
    KhamtiShan = "KhamtiShan",
    Kharoshthi = "Kharoshthi",
    KhmerCambodian = "Khmer",
    Khojki = "Khojki",
    KhomThai = "KhomThai",
    Khudawadi = "Khudawadi",
    Lao = "Lao",
    LaoPali = "LaoPali",
    Lepcha = "Lepcha",
    Limbu = "Limbu",
    Mahajani = "Mahajani",
    Makasar = "Makasar",
    Malayalam = "Malayalam",
    Marchen = "Marchen",
    MeeteiMayekManipuri = "MeeteiMayek",
    Modi = "Modi",
    Mon = "Mon",
    MongolianAliGali = "Mongolian",
    Mro = "Mro",
    Multani = "Multani",
    Nandinagari = "Nandinagari",
    NewaNepalBhasa = "Newa",
    OldPersian = "OldPersian",
    OriyaOdia = "Oriya",
    Pallava = "Pallava",
    PhagsPa = "PhagsPa",
    PunjabiGurmukhi = "Gurmukhi",
    RanjanaLantsa = "Ranjana",
    Rejang = "Rejang",
    RohingyaHanifi = "HanifiRohingya",
    SantaliOlChiki = "Santali",
    Saurashtra = "Saurashtra",
    Shahmukhi = "Shahmukhi",
    Shan = "Shan",
    Sharada = "Sharada",
    Siddham = "Siddham",
    Sinhala = "Sinhala",
    SoraSompeng = "SoraSompeng",
    Soyombo = "Soyombo",
    Sundanese = "Sundanese",
    SylotiNagari = "SylotiNagri",
    Tagalog = "Tagalog",
    Tagbanwa = "Tagbanwa",
    TaiLaing = "TaiLaing",
    Takri = "Takri",
    Tamil = "Tamil",
    TamilBrahmi = "TamilBrahmi",
    TamilExtended = "TamilExtended",
    Telugu = "Telugu",
    ThaanaDhivehi = "Thaana",
    Thai = "Thai",
    ThamLanna = "TaiTham",
    ThamLao = "LaoTham",
    ThamTaiKhuen = "KhuenTham",
    ThamTaiLue = "LueTham",
    Tibetan = "Tibetan",
    TirhutaMaithili = "Tirhuta",
    TolongSiki = "TolongSiki",
    Urdu = "Urdu",
    Vatteluttu = "Vatteluttu",
    Wancho = "Wancho",
    WarangCiti = "WarangCiti",
    ZanabazarSquare = "ZanabazarSquare"
}
declare enum ScriptSemitic {
    Arabic = "Arab",
    ArabicShahmukhi = "Arab-Pa",
    ArabicUrdu = "Arab-Ur",
    Elymaic = "Elym",
    EthiopicAbjad = "Ethi",
    Hatran = "Hatr",
    HebrewJudeoArabic = "Hebr-Ar",
    ImperialAramaic = "Armi",
    InscriptionalPahlavi = "Phli",
    InscriptionalParthian = "Prti",
    Manichaean = "Mani",
    Nabataean = "Nbat",
    OldNorthArabian = "Narb",
    OldSogdian = "Sogo",
    OldSouthArabian = "Sarb",
    Palmyrene = "Palm",
    Persian = "Arab-Fa",
    Phoenician = "Phnx",
    PsalterPahlavi = "Phlp",
    Samaritan = "Samr",
    SemiticHebrew = "Hebr",
    SemiticThaanaDhivehi = "Thaa",
    Sogdian = "Sogd",
    SyriacEastern = "Syrn",
    SyriacEstrangela = "Syre",
    SyriacWestern = "Syrj",
    Ugaritic = "Ugar"
}
declare enum ScriptLatin {
    CyrillicRussian = "RussianCyrillic",
    RomanBarahaNorth = "BarahaNorth",
    RomanBarahaSouth = "BarahaSouth",
    RomanColloquial = "RomanColloquial",
    RomanDINArabic = "ArabicDIN",
    RomanDMGPersian = "PersianDMG",
    RomanHarvardKyoto = "HK",
    RomanIAST = "IAST",
    RomanIASTPI = "IASTPali",
    RomanIPAIndic = "IPA",
    RomanISO15919Indic = "ISO",
    RomanISO15919PI = "ISOPali",
    RomanISO233Arabic = "ISO233",
    RomanISO259Hebrew = "ISO259",
    RomanITRANS = "Itrans",
    RomanLibraryOfCongress = "RomanLoC",
    RomanReadable = "RomanReadable",
    RomanSBLHebrew = "HebrewSBL",
    RomanSemitic = "Latn",
    RomanSemiticTypeable = "Type",
    RomanSLP1 = "SLP1",
    RomanTitus = "Titus",
    RomanVelthuis = "Velthuis",
    RomanWX = "WX"
}
declare enum ScriptSemiticLatin {
    DMGPersian = "PersianDMG",
    ISO233Arabic = "ISO233",
    ISO259Hebrew = "ISO259",
    SBLHebrew = "HebrewSBL",
    SemiticAksharamukha = "Latn",
    SemiticTypeableAksharamukha = "Type"
}
declare enum ScriptRomanization {
    HarvardKyoto = "HK",
    IAST = "IAST",
    IASTPI = "IASTPali",
    ISO = "ISO",
    ISOPI = "ISOPali",
    ITRANS = "Itrans",
    RomanColloquial = "RomanColloquial",
    RomanLibraryOfCongress = "RomanLoC",
    RomanReadable = "RomanReadable",
    SLP1 = "SLP1",
    Titus = "Titus",
    Velthuis = "Velthuis",
    WX = "WX"
}
declare enum ScriptIME {
    Devanagari = "Devanagari",
    HarvardKyoto = "HK",
    ITRANS = "Itrans",
    Velthuis = "Velthuis"
}
declare enum ScriptsExtra {
    AutoDetect = "autodetect"
}
declare const Scripts: {
    readonly AutoDetect: ScriptsExtra.AutoDetect;
    readonly Devanagari: ScriptIME.Devanagari;
    readonly HarvardKyoto: ScriptIME.HarvardKyoto;
    readonly ITRANS: ScriptIME.ITRANS;
    readonly Velthuis: ScriptIME.Velthuis;
    readonly IAST: ScriptRomanization.IAST;
    readonly IASTPI: ScriptRomanization.IASTPI;
    readonly ISO: ScriptRomanization.ISO;
    readonly ISOPI: ScriptRomanization.ISOPI;
    readonly RomanColloquial: ScriptRomanization.RomanColloquial;
    readonly RomanLibraryOfCongress: ScriptRomanization.RomanLibraryOfCongress;
    readonly RomanReadable: ScriptRomanization.RomanReadable;
    readonly SLP1: ScriptRomanization.SLP1;
    readonly Titus: ScriptRomanization.Titus;
    readonly WX: ScriptRomanization.WX;
    readonly DMGPersian: ScriptSemiticLatin.DMGPersian;
    readonly ISO233Arabic: ScriptSemiticLatin.ISO233Arabic;
    readonly ISO259Hebrew: ScriptSemiticLatin.ISO259Hebrew;
    readonly SBLHebrew: ScriptSemiticLatin.SBLHebrew;
    readonly SemiticAksharamukha: ScriptSemiticLatin.SemiticAksharamukha;
    readonly SemiticTypeableAksharamukha: ScriptSemiticLatin.SemiticTypeableAksharamukha;
    readonly CyrillicRussian: ScriptLatin.CyrillicRussian;
    readonly RomanBarahaNorth: ScriptLatin.RomanBarahaNorth;
    readonly RomanBarahaSouth: ScriptLatin.RomanBarahaSouth;
    readonly RomanDINArabic: ScriptLatin.RomanDINArabic;
    readonly RomanDMGPersian: ScriptLatin.RomanDMGPersian;
    readonly RomanHarvardKyoto: ScriptLatin.RomanHarvardKyoto;
    readonly RomanIAST: ScriptLatin.RomanIAST;
    readonly RomanIASTPI: ScriptLatin.RomanIASTPI;
    readonly RomanIPAIndic: ScriptLatin.RomanIPAIndic;
    readonly RomanISO15919Indic: ScriptLatin.RomanISO15919Indic;
    readonly RomanISO15919PI: ScriptLatin.RomanISO15919PI;
    readonly RomanISO233Arabic: ScriptLatin.RomanISO233Arabic;
    readonly RomanISO259Hebrew: ScriptLatin.RomanISO259Hebrew;
    readonly RomanITRANS: ScriptLatin.RomanITRANS;
    readonly RomanSBLHebrew: ScriptLatin.RomanSBLHebrew;
    readonly RomanSemitic: ScriptLatin.RomanSemitic;
    readonly RomanSemiticTypeable: ScriptLatin.RomanSemiticTypeable;
    readonly RomanSLP1: ScriptLatin.RomanSLP1;
    readonly RomanTitus: ScriptLatin.RomanTitus;
    readonly RomanVelthuis: ScriptLatin.RomanVelthuis;
    readonly RomanWX: ScriptLatin.RomanWX;
    readonly Arabic: ScriptSemitic.Arabic;
    readonly ArabicShahmukhi: ScriptSemitic.ArabicShahmukhi;
    readonly ArabicUrdu: ScriptSemitic.ArabicUrdu;
    readonly Elymaic: ScriptSemitic.Elymaic;
    readonly EthiopicAbjad: ScriptSemitic.EthiopicAbjad;
    readonly Hatran: ScriptSemitic.Hatran;
    readonly HebrewJudeoArabic: ScriptSemitic.HebrewJudeoArabic;
    readonly ImperialAramaic: ScriptSemitic.ImperialAramaic;
    readonly InscriptionalPahlavi: ScriptSemitic.InscriptionalPahlavi;
    readonly InscriptionalParthian: ScriptSemitic.InscriptionalParthian;
    readonly Manichaean: ScriptSemitic.Manichaean;
    readonly Nabataean: ScriptSemitic.Nabataean;
    readonly OldNorthArabian: ScriptSemitic.OldNorthArabian;
    readonly OldSogdian: ScriptSemitic.OldSogdian;
    readonly OldSouthArabian: ScriptSemitic.OldSouthArabian;
    readonly Palmyrene: ScriptSemitic.Palmyrene;
    readonly Persian: ScriptSemitic.Persian;
    readonly Phoenician: ScriptSemitic.Phoenician;
    readonly PsalterPahlavi: ScriptSemitic.PsalterPahlavi;
    readonly Samaritan: ScriptSemitic.Samaritan;
    readonly SemiticHebrew: ScriptSemitic.SemiticHebrew;
    readonly SemiticThaanaDhivehi: ScriptSemitic.SemiticThaanaDhivehi;
    readonly Sogdian: ScriptSemitic.Sogdian;
    readonly SyriacEastern: ScriptSemitic.SyriacEastern;
    readonly SyriacEstrangela: ScriptSemitic.SyriacEstrangela;
    readonly SyriacWestern: ScriptSemitic.SyriacWestern;
    readonly Ugaritic: ScriptSemitic.Ugaritic;
    readonly Ahom: ScriptIndic.Ahom;
    readonly Ariyaka: ScriptIndic.Ariyaka;
    readonly Assamese: ScriptIndic.Assamese;
    readonly Avestan: ScriptIndic.Avestan;
    readonly Balinese: ScriptIndic.Balinese;
    readonly BatakKaro: ScriptIndic.BatakKaro;
    readonly BatakMandailing: ScriptIndic.BatakMandailing;
    readonly BatakPakpak: ScriptIndic.BatakPakpak;
    readonly BatakSimalungun: ScriptIndic.BatakSimalungun;
    readonly BatakToba: ScriptIndic.BatakToba;
    readonly BengaliBangla: ScriptIndic.BengaliBangla;
    readonly Bhaiksuki: ScriptIndic.Bhaiksuki;
    readonly Brahmi: ScriptIndic.Brahmi;
    readonly BugineseLontara: ScriptIndic.BugineseLontara;
    readonly Buhid: ScriptIndic.Buhid;
    readonly BurmeseMyanmar: ScriptIndic.BurmeseMyanmar;
    readonly Chakma: ScriptIndic.Chakma;
    readonly Cham: ScriptIndic.Cham;
    readonly DivesAkuru: ScriptIndic.DivesAkuru;
    readonly Dogra: ScriptIndic.Dogra;
    readonly GondiGunjala: ScriptIndic.GondiGunjala;
    readonly GondiMasaram: ScriptIndic.GondiMasaram;
    readonly Grantha: ScriptIndic.Grantha;
    readonly GranthaPandya: ScriptIndic.GranthaPandya;
    readonly Gujarati: ScriptIndic.Gujarati;
    readonly Hanunoo: ScriptIndic.Hanunoo;
    readonly Hebrew: ScriptIndic.Hebrew;
    readonly JapaneseHiragana: ScriptIndic.JapaneseHiragana;
    readonly JapaneseKatakana: ScriptIndic.JapaneseKatakana;
    readonly Javanese: ScriptIndic.Javanese;
    readonly Kaithi: ScriptIndic.Kaithi;
    readonly Kannada: ScriptIndic.Kannada;
    readonly Kawi: ScriptIndic.Kawi;
    readonly KhamtiShan: ScriptIndic.KhamtiShan;
    readonly Kharoshthi: ScriptIndic.Kharoshthi;
    readonly KhmerCambodian: ScriptIndic.KhmerCambodian;
    readonly Khojki: ScriptIndic.Khojki;
    readonly KhomThai: ScriptIndic.KhomThai;
    readonly Khudawadi: ScriptIndic.Khudawadi;
    readonly Lao: ScriptIndic.Lao;
    readonly LaoPali: ScriptIndic.LaoPali;
    readonly Lepcha: ScriptIndic.Lepcha;
    readonly Limbu: ScriptIndic.Limbu;
    readonly Mahajani: ScriptIndic.Mahajani;
    readonly Makasar: ScriptIndic.Makasar;
    readonly Malayalam: ScriptIndic.Malayalam;
    readonly Marchen: ScriptIndic.Marchen;
    readonly MeeteiMayekManipuri: ScriptIndic.MeeteiMayekManipuri;
    readonly Modi: ScriptIndic.Modi;
    readonly Mon: ScriptIndic.Mon;
    readonly MongolianAliGali: ScriptIndic.MongolianAliGali;
    readonly Mro: ScriptIndic.Mro;
    readonly Multani: ScriptIndic.Multani;
    readonly Nandinagari: ScriptIndic.Nandinagari;
    readonly NewaNepalBhasa: ScriptIndic.NewaNepalBhasa;
    readonly OldPersian: ScriptIndic.OldPersian;
    readonly OriyaOdia: ScriptIndic.OriyaOdia;
    readonly Pallava: ScriptIndic.Pallava;
    readonly PhagsPa: ScriptIndic.PhagsPa;
    readonly PunjabiGurmukhi: ScriptIndic.PunjabiGurmukhi;
    readonly RanjanaLantsa: ScriptIndic.RanjanaLantsa;
    readonly Rejang: ScriptIndic.Rejang;
    readonly RohingyaHanifi: ScriptIndic.RohingyaHanifi;
    readonly SantaliOlChiki: ScriptIndic.SantaliOlChiki;
    readonly Saurashtra: ScriptIndic.Saurashtra;
    readonly Shahmukhi: ScriptIndic.Shahmukhi;
    readonly Shan: ScriptIndic.Shan;
    readonly Sharada: ScriptIndic.Sharada;
    readonly Siddham: ScriptIndic.Siddham;
    readonly Sinhala: ScriptIndic.Sinhala;
    readonly SoraSompeng: ScriptIndic.SoraSompeng;
    readonly Soyombo: ScriptIndic.Soyombo;
    readonly Sundanese: ScriptIndic.Sundanese;
    readonly SylotiNagari: ScriptIndic.SylotiNagari;
    readonly Tagalog: ScriptIndic.Tagalog;
    readonly Tagbanwa: ScriptIndic.Tagbanwa;
    readonly TaiLaing: ScriptIndic.TaiLaing;
    readonly Takri: ScriptIndic.Takri;
    readonly Tamil: ScriptIndic.Tamil;
    readonly TamilBrahmi: ScriptIndic.TamilBrahmi;
    readonly TamilExtended: ScriptIndic.TamilExtended;
    readonly Telugu: ScriptIndic.Telugu;
    readonly ThaanaDhivehi: ScriptIndic.ThaanaDhivehi;
    readonly Thai: ScriptIndic.Thai;
    readonly ThamLanna: ScriptIndic.ThamLanna;
    readonly ThamLao: ScriptIndic.ThamLao;
    readonly ThamTaiKhuen: ScriptIndic.ThamTaiKhuen;
    readonly ThamTaiLue: ScriptIndic.ThamTaiLue;
    readonly Tibetan: ScriptIndic.Tibetan;
    readonly TirhutaMaithili: ScriptIndic.TirhutaMaithili;
    readonly TolongSiki: ScriptIndic.TolongSiki;
    readonly Urdu: ScriptIndic.Urdu;
    readonly Vatteluttu: ScriptIndic.Vatteluttu;
    readonly Wancho: ScriptIndic.Wancho;
    readonly WarangCiti: ScriptIndic.WarangCiti;
    readonly ZanabazarSquare: ScriptIndic.ZanabazarSquare;
};
type Script = typeof Scripts[keyof typeof Scripts];

declare enum PreOption {
    AlephMaterLectionis = "AlephMaterLectionis",
    AnuChandraEqDeva = "AnuChandraEqDeva",
    ArabicGimelJa = "ArabicGimelJa",
    BalineseMoveRepha = "BalineseMoveRepha",
    BengaliSubjoinedVa = "BengaliSubojinedVa",
    BengaliSwitchYaYYa = "BengaliSwitchYaYYa",
    BengaliTargetVa = "BengaliTargetVa",
    ChakmaPali = "ChakmaPali",
    CyrillicPali = "CyrillicPali",
    DivesAkuruAlternateIndVowels = "DivesAkuruAlternateIndVowels",
    Egrantamil = "egrantamil",
    Eiaudipthongs = "eiaudipthongs",
    HatrDalethResh = "HatrDalethResh",
    HindiMarathiRomanLoCFix = "HindiMarathiRomanLoCFix",
    Holamlong = "holamlong",
    InsertViramaSyriac = "insertViramaSyriac",
    JavaneseMoveRepha = "JavaneseMoveRepha",
    JoinVowelConsIAST = "joinVowelConsIAST",
    JoinVowelConsISO = "joinVowelConsISO",
    KawiMoveRepha = "KawiMoveRepha",
    KhmerWordSplit = "KhmerWordSplit",
    KhuenRaHaamKaren = "KhuenRaHaamKaren",
    LaoPhonetic = "LaoPhonetic",
    LaoSajhayaOrthography = "LaoSajhayaOrthography",
    LaoSajhayaOrthographywithA = "LaoSajhayaOrthographywithA",
    LaoTranscription = "LaoTranscription",
    LimbuDevanagariConvention = "LimbuDevanagariConvention",
    LimbuSpellingSaI = "LimbuSpellingSaI",
    LongEOISO = "longEOISO",
    MalayalamHalfu = "MalayalamHalfu",
    MalayalamPrakrit = "MalayalamPrakrit",
    MalayalamTranscribe = "MalayalamTranscribe",
    NovowelshebrewIndic = "novowelshebrewIndic",
    NovowelshebrewSemitic = "novowelshebrewSemitic",
    OriyaSubojinedVa = "OriyaSubojinedVa",
    OriyaTargetVa = "OriyaTargetVa",
    PhliWawAyinResh = "PhliWawAyinResh",
    PhlpMemQoph = "PhlpMemQoph",
    PhlpWawAyinResh = "PhlpWawAyinResh",
    RemoveFinalSchwaArab = "removeFinalSchwaArab",
    RemoveSchwaHindi = "RemoveSchwaHindi",
    RomanLoCSLaDotLaUnderscore = "RomanLoCSLaDotLaUnderscore",
    SaurastraHaaruColonTamil = "SaurastraHaaruColonTamil",
    SchwaFinalBengali = "SchwaFinalBengali",
    SchwaFinalGujarati = "SchwaFinalGujarati",
    SchwaFinalGurmukhi = "SchwaFinalGurmukhi",
    SchwaFinalWarangCiti = "SchwaFinalWarangCiti",
    SegmentBurmeseSyllables = "segmentBurmeseSyllables",
    SegmentShanSyllables = "segmentShanSyllables",
    SegmentThamSyllabes = "segmentThamSyllabes",
    ShowChillus = "ShowChillus",
    ShowKhandaTa = "ShowKhandaTa",
    Shvanakhall = "shvanakhall",
    Siddhammukta = "siddhammukta",
    SinhalaPali = "SinhalaPali",
    SogdReshAyin = "SogdReshAyin",
    SogoReshAyinDaleth = "SogoReshAyinDaleth",
    SwapEe = "swapEe",
    SwapEeItrans = "swapEeItrans",
    TakriArchaicKha = "TakriArchaicKha",
    TamilNumeralSub = "TamilNumeralSub",
    TamilTranscribe = "TamilTranscribe",
    TamilTranscribeDialect = "TamilTranscribeDialect",
    ThaiOrthography = "ThaiOrthography",
    ThaiPhonetic = "ThaiPhonetic",
    ThaiSajjhayaOrthography = "ThaiSajjhayaOrthography",
    ThaiSajjhayawithA = "ThaiSajjhayawithA",
    UrduShortNotShown = "UrduShortNotShown",
    Wasvnukta = "wasvnukta"
}

declare enum PostOption {
    AlephAyinLatnAlternate = "alephAyinLatnAlternate",
    AlephAyinLatnAlternate2 = "alephAyinLatnAlternate2",
    AlephMaterLectionis = "AlephMaterLectionis",
    AnusvaraAsN = "AnusvaraAsN",
    AnusvaratoNasalASTISO = "AnusvaratoNasalASTISO",
    ArabAtoAleph = "ArabAtoAleph",
    ArabicRemoveAdditionsPhonetic = "arabicRemoveAdditionsPhonetic",
    ArchaicAIAU = "archaicAIAU",
    BalineseArchaicJNA = "BalineseArchaicJNA",
    BalineseAvowels = "BalineseAvowels",
    BalineseMoveRepha = "BalineseMoveRepha",
    BalineseSimplified = "BalineseSimplified",
    BengaliIntervocalicDDA = "BengaliIntervocalicDDA",
    BengaliOldRA = "BengaliOldRA",
    BengaliRaBa = "BengaliRaBa",
    BengaliSwitchYaYYa = "BengaliSwitchYaYYa",
    BengaliYYA = "BengaliYYA",
    BhaiksukiRetainSpace = "BhaiksukiRetainSpace",
    CapitalizeSentence = "capitalizeSentence",
    ChakmaEnableAllConjuncts = "ChakmaEnableAllConjuncts",
    ChakmaPali = "ChakmaPali",
    ChakmaVowelsIndependent = "ChakmaVowelsIndependent",
    ContextualLLa = "ContextualLLa",
    CyrillicPali = "CyrillicPali",
    DevanagariACandra = "DevanagariACandra",
    DevanagariAnusvara = "DevanagariAnusvara",
    Devanagaribalbodh = "devanagaribalbodh",
    Devanagarijain = "devanagarijain",
    Devanagarinepali = "devanagarinepali",
    DevanagariPrishtamatra = "DevanagariPrishtamatra",
    Devanagariuttara = "devanagariuttara",
    DivesAkuruAlternateIndVowels = "DivesAkuruAlternateIndVowels",
    DivesAkuruHomoOrganNasal = "DivesAkuruHomoOrganNasal",
    DograShaKha = "DograShaKha",
    DotReph = "dotReph",
    Egrantamil = "egrantamil",
    FinalNNa = "FinalNNa",
    GainGimel = "gainGimel",
    Granthafinal = "granthafinal",
    GranthaOldau = "GranthaOldau",
    GranthaPrakrit = "GranthaPrakrit",
    Granthaserif = "granthaserif",
    GurmukhiYakaash = "GurmukhiYakaash",
    HebrewQoph = "HeberewQoph",
    HebrewShortO = "HebewShortO",
    HindiMarathiRomanLoCFix = "HindiMarathiRomanLoCFix",
    HistoricChillu = "historicChillu",
    InherentAO = "inherentAO",
    JainomDevangari = "jainomDevangari",
    JavaneseArchaicJNA = "JavaneseArchaicJNA",
    JavaneseAvowels = "JavaneseAvowels",
    JavaneseMoveRepha = "JavaneseMoveRepha",
    JavaneseSimplified = "JavaneseSimplified",
    KaithiRetainSpace = "KaithiRetainSpace",
    KannadaNakaraPollu = "KannadaNakaraPollu",
    KannadaNotRepha = "KannadaNotRepha",
    KannadaSpacingCandrabindu = "KannadaSpacingCandrabindu",
    KawiAltAiAU = "KawiAltAiAU",
    KawiArchaicJNA = "KawiArchaicJNA",
    KawiDecomposedVowel = "KawiDecomposedVowel",
    KawiMoveRepha = "KawiMoveRepha",
    Kawitan = "kawitan",
    KhamiShanMyanmarNumerals = "KhamiShanMyanmarNumerals",
    KhamtiShanRa = "KhamtiShanRa",
    Khandatabatova = "khandatabatova",
    KhojkiQa = "KhojkiQa",
    KhojkiRetainSpace = "KhojkiRetainSpace",
    LaoNative = "LaoNative",
    LaoPhonetic = "LaoPhonetic",
    LaoSajjhaya = "LaoSajjhaya",
    LaoSajjhayawithA = "LaoSajjhayawithA",
    LaoTranscription = "LaoTranscription",
    LimbuDevanagariConvention = "LimbuDevanagariConvention",
    LimbuSpellingSaI = "LimbuSpellingSaI",
    LoCMarc8 = "LoCMarc8",
    MalayalamCircVirama = "MalayalamCircVirama",
    MalayalamLineVirama = "MalayalamLineVirama",
    MalayalamPrakrit = "MalayalamPrakrit",
    MalayalamTTNTA = "MalayalamTTNTA",
    MarchenSanskritPalatals = "MarchenSanskritPalatals",
    MDotAboveToBelow = "mDotAboveToBelow",
    MongolianSyllabize = "MongolianSyllabize",
    NandinagariPrishtamatra = "NandinagariPrishtamatra",
    NasalTilde = "NasalTilde",
    Nepaldevafont = "nepaldevafont",
    NewaDisableRepha = "NewaDisableRepha",
    NewaMurmurConsonants = "NewaMurmurConsonants",
    NewaSpecialTa = "NewaSpecialTa",
    NoLongEO = "noLongEO",
    Olddogra = "olddogra",
    Oldtamilortho = "oldtamilortho",
    OriyaVaAlt = "OriyaVaAlt",
    OriyaYYA = "OriyaYYA",
    PersianPaGaFaJa = "persianPaGaFaJa",
    PhagsPaSeal = "PhagsPaSeal",
    PhagsPaTib = "PhagsPaTib",
    QafTwodot = "qafTwodot",
    Ranjanalantsa = "ranjanalantsa",
    Ranjanawartu = "ranjanawartu",
    ReadableItrans = "readableItrans",
    RemoveDiacritics = "removeDiacritics",
    RemoveDiacriticsArabic = "removeDiacriticsArabic",
    RemoveMajliyana = "removeMajliyana",
    RemoveNikkud = "removeNikkud",
    RemovePaliAhom = "removePaliAhom",
    RemoveQussaya = "removeQussaya",
    RemoveRukkaka = "removeRukkaka",
    RemoveSegmentSpacesBurmese = "removeSegmentSpacesBurmese",
    RemoveSukunEnd = "removeSukunEnd",
    Removetddash = "removetddash",
    RemoveVowelsSyriac = "removeVowelsSyriac",
    RephaDoubleMalayalam = "RephaDoubleMalayalam",
    RomanLoCSLaDotLaUnderscore = "RomanLoCSLaDotLaUnderscore",
    RomanReadableLongEO = "RomanReadableLongEO",
    SaurastraHaaruColon = "SaurastraHaaruColon",
    ShowSchwaHindi = "ShowSchwaHindi",
    Siddhammukta = "siddhammukta",
    Siddhamap = "siddhamap",
    SinhalaConjuncts = "SinhalaConjuncts",
    SinhalaPali = "SinhalaPali",
    SogdReshAyin = "SogdReshAyin",
    SogoReshAyinDaleth = "SogoReshAyinDaleth",
    SoyomboFinals = "SoyomboFinals",
    SoyomboInitials = "SoyomboInitials",
    SoyomboSanskritPalatals = "SoyomboSanskritPalatals",
    SoyomboSpaceTscheg = "SoyomboSpaceTscheg",
    SoyomboSyllabize = "SoyomboSyllabize",
    SundaneseHistoricConjuncts = "SundaneseHistoricConjuncts",
    Sundapura = "sundapura",
    SwapEe = "swapEe",
    SwapEeItrans = "swapEeItrans",
    SyriacRoman = "syriacRoman",
    TakriArchaicKha = "TakriArchaicKha",
    TakriRemoveGemination = "TakriRemoveGemination",
    TamilAddFirstVarga = "TamilAddFirstVarga",
    TamilDisableSHA = "TamilDisableSHA",
    TamilExtendedAnusvara = "TamilExtendedAnusvara",
    TamilExtendedNNA = "TamilExtendedNNA",
    TamilGranthaVisarga = "TamilGranthaVisarga",
    TamilOmDisable = "TamilOmDisable",
    TamilRemoveApostrophe = "TamilRemoveApostrophe",
    TamilRemoveNumbers = "TamilRemoveNumbers",
    TamilStyleUUCore = "TamilStyleUUCore",
    TamilStyleUUOther = "TamilStyleUUOther",
    TamilSubScript = "TamilSubScript",
    TavThreedot = "tavThreedot",
    TavTwodot = "tavTwodot",
    TeluguArasunnaChandrabindu = "TeluguArasunnaChandrabindu",
    TeluguNakaraPollu = "TeluguNakaraPollu",
    TeluguReph = "TeluguReph",
    TeluguTamilRra = "TeluguTamilRra",
    TeluguTamilZha = "TeluguTamilZha",
    ThaiNativeConsonants = "ThaiNativeConsonants",
    ThaiSajjhayaOrthography = "ThaiSajjhayaOrthography",
    ThaiSajjhayawithA = "ThaiSajjhayawithA",
    ThaiTranscription = "ThaiTranscription",
    ThaiVisargaSaraA = "ThaiVisargaSaraA",
    ThamShiftMaiKangLai = "ThamShiftMaiKangLai",
    ThamTallADisable = "ThamTallADisable",
    ThamTallAOthers = "ThamTallAOthers",
    Tibetandbumed = "tibetandbumed",
    TibetanNada = "TibetanNada",
    TibetanSanskritPalatals = "TibetanSanskritPalatals",
    TibetanSyllabize = "TibetanSyllabize",
    TibetanTsheg = "TibetanTsheg",
    TradOrtho = "tradOrtho",
    UrduRemoveInherent = "urduRemoveInherent",
    UrduRemoveShortVowels = "UrduRemoveShortVowels",
    UseAlternateI1 = "UseAlternateI1",
    UseAlternateI2 = "UseAlternateI2",
    UseAlternateII = "UseAlternateII",
    UseAlternateo1 = "UseAlternateo1",
    UseAlternateo2 = "UseAlternateo2",
    UseAlternateU = "UseAlternateU",
    UseAlternateVSU = "UseAlternateVSU",
    UseAlternateVSUU = "UseAlternateVSUU",
    UseAlternateYA = "UseAlternateYA",
    VerticalKana = "verticalKana",
    VtobJapanese = "vtobJapanese",
    ZanabazarSanskritPalatals = "ZanabazarSanskritPalatals",
    ZanabazarSquareAiAu = "ZanabazarSquareAiAu",
    ZanabazarSquareContextual = "ZanabazarSquareContextual",
    ZanabazarSquareMongolianFinal = "ZanabazarSquareMongolianFinal",
    ZanzabarSpaceTsheg = "ZanzabarSpaceTsheg"
}
declare function fixPostOptions(options: PostOption[]): PostOption[];

type ProcessArgs = {
    src: Script;
    tgt: Script;
    txt: string;
    props: ProcessProps;
};
type AutoDetectArgs = {
    txt: string;
    plugin: boolean;
};
type ProcessProps = {
    nativize: boolean;
    param: ProcessParam;
    preOptions: PreOption[];
    postOptions: PostOption[];
};
declare const ProcessParams: {
    readonly default: "default";
    readonly scriptCode: "script_code";
    readonly langCode: "lang_code";
    readonly langName: "lang_name";
};
type ProcessParam = typeof ProcessParams[keyof typeof ProcessParams];
declare const defaultProcessProps: ProcessProps;
type AksharamukhaInitOptions = {
    pyodide?: PyodideInterface;
};
declare class Aksharamukha {
    static _loadPyodideRef: typeof pyodide['loadPyodide'] | undefined;
    static _currentScript: HTMLScriptElement;
    pyodide: PyodideInterface;
    static _isTestEnv: boolean;
    static _testLoadPyodide: typeof pyodide['loadPyodide'];
    static _testFS: typeof fs;
    private constructor();
    static _setCurrentScript(script: HTMLScriptElement): void;
    private static getCurrentScriptPath;
    private static getLoadPyodide;
    static new(opts?: AksharamukhaInitOptions): Promise<Aksharamukha>;
    test(): Promise<void>;
    process(src: Script, tgt: Script, txt: string, { nativize, param, preOptions, postOptions }?: ProcessProps): string;
    processAsync(src: Script, tgt: Script, txt: string, { nativize, param, preOptions, postOptions }?: ProcessProps): Promise<string>;
    autoDetect(txt: string, plugin?: boolean): string;
    autoDetectAsync(txt: string, plugin?: boolean): Promise<string>;
}

export { type AksharamukhaInitOptions, type AutoDetectArgs, PostOption, PreOption, type ProcessArgs, type ProcessParam, ProcessParams, type ProcessProps, type Script, ScriptIME, ScriptIndic, ScriptLatin, ScriptRomanization, ScriptSemitic, ScriptSemiticLatin, Scripts, ScriptsExtra, Aksharamukha as default, defaultProcessProps, fixPostOptions };
