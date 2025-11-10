/**
 * Translation file for English and Urdu
 */

export const translations = {
  en: {
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      submit: "Submit",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
    },
    // Navigation
    nav: {
      dashboard: "Dashboard",
      report: "Report Smog",
      health: "Health Guidance",
      map: "Regional Map",
      settings: "Settings",
      logout: "Logout",
      login: "Login",
      signup: "Sign Up",
    },
    // Auth
    auth: {
      welcomeBack: "Welcome back.",
      dontHaveAccount: "Don't have an account?",
      signUp: "Sign up",
      createAccount: "Create an Account",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      email: "Email",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone",
      agreeToTerms: "I agree to the terms and conditions",
      forgotPassword: "Forgot password?",
      rememberMe: "Remember me",
    },
    // Dashboard
    dashboard: {
      title: "Dashboard",
      currentLocation: "Current Location",
      aqi: "AQI",
      status: "Status",
      keyPollutants: "Key Pollutants",
      past24Hours: "Past 24 Hours",
      weeklyTrend: "Weekly Trend",
      month: "Month",
      week: "Week",
      monthlyInsight: "Monthly Insight",
      averageAQI: "Average AQI this month",
      weekendBetter: "Weekend air quality",
      seeHeavySmog: "See heavy smog? Help us track it.",
      reportNow: "Report Now",
      loadingLocation: "Loading location...",
      locationUnavailable: "Location unavailable",
      refreshAQI: "Refresh AQI",
      good: "Good",
      moderate: "Moderate",
      unhealthySensitive: "Unhealthy for Sensitive Groups",
      unhealthy: "Unhealthy",
      veryUnhealthy: "Very Unhealthy / Hazardous",
      alertVeryUnhealthy: "Remain indoors. Air quality is very unhealthy. Use air purifiers and avoid all outdoor activities.",
      alertUnhealthy: "Children and elderly should stay indoors. Wear a mask (N95) if going outside.",
      alertSensitive: "Sensitive individuals should reduce outdoor activities. Consider wearing a mask.",
      alertModerate: "Air quality is acceptable. Sensitive individuals may experience minor symptoms.",
      alertGood: "Air quality is good. Enjoy outdoor activities.",
    },
    // Report Smog
    report: {
      title: "Report Your Local Conditions",
      subtitle: "Upload a photo or short video (max 20MB).",
      dragDrop: "Drag and drop files here, or",
      clickToBrowse: "click to browse",
      supportedFormats: "Supported: JPG, PNG, MP4. Max 20MB",
      selected: "Selected",
      useCurrentLocation: "Use Current Location",
      gettingLocation: "Getting your location...",
      location: "Location",
      address: "Enter address...",
      latitude: "Latitude",
      longitude: "Longitude",
      city: "City (optional)",
      province: "Province (optional)",
      reportTitle: "Report Title (optional)",
      description: "Describe the conditions... (optional)",
      submitReport: "Submit Report",
      submitting: "Submitting...",
      success: "Report submitted successfully! It will be reviewed by officials.",
      error: "Failed to submit report. Please try again.",
      pleaseLogin: "Please login to submit a report",
      uploadRequired: "Please upload an image or video",
      locationRequired: "Please enable location access or enter location manually",
      addPrivateStation: "Add Private AQI Station",
      stationName: "Station Name (optional)",
      model: "Model (e.g., PurpleAir)",
      submitStation: "Submit Station for Verification",
    },
    // Health Guidance
    health: {
      title: "Health Guidance — Peshawar, Pakistan",
      currentAQI: "Current AQI",
      recommendedDos: "Recommended DO's",
      recommendedDonts: "Recommended DON'Ts",
      disclaimer: "These recommendations are tailored for residents of Peshawar and Pakistan. Follow local health advisories and consult healthcare professionals for personalized advice.",
      guidance: {
        good: {
          dos: [
            "Enjoy outdoor activities — air quality is good.",
            "Keep windows open for ventilation when comfortable.",
            "Maintain regular physical activity routines.",
            "Continue usual precautions for chronic conditions.",
            "Monitor air quality updates occasionally.",
          ],
          donts: [
            "No special precautions needed.",
            "Don't assume air quality will remain the same — check updates.",
            "Avoid complacency if symptoms arise.",
            "Don't ignore local advisories.",
            "Avoid burning waste even in good AQI to keep it that way.",
          ],
        },
        moderate: {
          dos: [
            "Limit prolonged outdoor exertion, especially near traffic.",
            "Prefer indoor activities during peak traffic hours.",
            "Keep windows closed if outdoor air appears dusty or smoky.",
            "Use a simple cloth mask if you feel irritated outdoors.",
            "Check air quality for your local area in Peshawar regularly.",
          ],
          donts: [
            "Don't engage in long outdoor workouts.",
            "Avoid open burning and smoke-producing activities.",
            "Don't ignore symptoms like throat irritation or cough.",
            "Avoid staying near heavy traffic for long periods.",
            "Don't assume indoor air is always safe — ventilate carefully.",
          ],
        },
        usg: {
          dos: [
            "Sensitive individuals should reduce time spent outdoors.",
            "Use air purifiers indoors if available.",
            "Keep windows and doors closed during high AQI hours.",
            "Have medications (inhalers) ready if prescribed.",
            "Consider wearing a properly fitted N95 mask when outside.",
          ],
          donts: [
            "Don't let children play outdoors for long periods.",
            "Avoid vigorous outdoor exercise.",
            "Don't burn trash or wood.",
            "Avoid open kitchen ventilation if outdoor smoke is heavy.",
            "Don't ignore persistent breathing issues — see a doctor.",
          ],
        },
        unhealthy: {
          dos: [
            "Avoid all strenuous outdoor activity.",
            "Stay indoors and use air purification where possible.",
            "Ensure windows and doors are sealed to reduce infiltration.",
            "Use N95/KN95 masks if you must go outside.",
            "Stay hydrated and follow doctor's advice if you have conditions.",
          ],
          donts: [
            "Don't exercise outdoors.",
            "Avoid taking children or elderly outside unnecessarily.",
            "Don't burn any waste or use open fires.",
            "Don't ignore severe symptoms — seek medical help.",
            "Avoid busy roads and highly polluted areas.",
          ],
        },
        very_unhealthy: {
          dos: [
            "Remain indoors with doors and windows closed.",
            "Use air purifiers and keep activity levels low.",
            "Seek medical advice if you have difficulty breathing.",
            "Use masks (N95/KN95) if you must go out for emergencies.",
            "Help neighbors who may be vulnerable (elderly/children).",
          ],
          donts: [
            "Don't go outside unless absolutely necessary.",
            "Avoid all outdoor exercise.",
            "Don't expose children, elderly or people with lung disease.",
            "Don't use unvented fuel-burning appliances indoors.",
            "Avoid travelling through heavily polluted zones.",
          ],
        },
      },
    },
    // Settings
    settings: {
      title: "Settings",
      profile: "Profile",
      language: "Language",
      notifications: "Notifications",
      privacy: "Privacy",
      account: "Account",
    },
  },
  ur: {
    // Common
    common: {
      loading: "لوڈ ہو رہا ہے...",
      error: "خرابی",
      success: "کامیابی",
      cancel: "منسوخ",
      save: "محفوظ کریں",
      delete: "حذف کریں",
      edit: "ترمیم",
      submit: "جمع کروائیں",
      back: "واپس",
      next: "اگلا",
      previous: "پچھلا",
      close: "بند کریں",
      search: "تلاش",
      filter: "فلٹر",
      refresh: "تازہ کریں",
    },
    // Navigation
    nav: {
      dashboard: "ڈیش بورڈ",
      report: "دھواں رپورٹ کریں",
      health: "صحت کی رہنمائی",
      map: "علاقائی نقشہ",
      settings: "ترتیبات",
      logout: "لاگ آؤٹ",
      login: "لاگ ان",
      signup: "سائن اپ",
    },
    // Auth
    auth: {
      welcomeBack: "خوش آمدید۔",
      dontHaveAccount: "اکاؤنٹ نہیں ہے؟",
      signUp: "سائن اپ کریں",
      createAccount: "اکاؤنٹ بنائیں",
      alreadyHaveAccount: "پہلے سے اکاؤنٹ ہے؟",
      login: "لاگ ان",
      email: "ای میل",
      password: "پاس ورڈ",
      firstName: "پہلا نام",
      lastName: "آخری نام",
      phone: "فون",
      agreeToTerms: "میں شرائط و ضوابط سے متفق ہوں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      rememberMe: "مجھے یاد رکھیں",
    },
    // Dashboard
    dashboard: {
      title: "ڈیش بورڈ",
      currentLocation: "موجودہ مقام",
      aqi: "ہوا کا معیار",
      status: "حالت",
      keyPollutants: "اہم آلودگی",
      past24Hours: "گزشتہ 24 گھنٹے",
      weeklyTrend: "ہفتہ وار رجحان",
      month: "مہینہ",
      week: "ہفتہ",
      monthlyInsight: "ماہانہ بصیرت",
      averageAQI: "اس مہینے اوسط ہوا کا معیار",
      weekendBetter: "ہفتے کے آخر میں ہوا کا معیار",
      seeHeavySmog: "بھاری دھواں دیکھا؟ ہمیں ٹریک کرنے میں مدد کریں۔",
      reportNow: "اب رپورٹ کریں",
      loadingLocation: "مقام لوڈ ہو رہا ہے...",
      locationUnavailable: "مقام دستیاب نہیں",
      refreshAQI: "ہوا کا معیار تازہ کریں",
      good: "اچھا",
      moderate: "متوسط",
      unhealthySensitive: "حساس گروپوں کے لیے غیر صحت بخش",
      unhealthy: "غیر صحت بخش",
      veryUnhealthy: "بہت غیر صحت بخش / خطرناک",
      alertVeryUnhealthy: "گھر کے اندر رہیں۔ ہوا کا معیار بہت غیر صحت بخش ہے۔ ایئر پیوریفائر استعمال کریں اور تمام بیرونی سرگرمیوں سے گریز کریں۔",
      alertUnhealthy: "بچے اور بزرگ گھر کے اندر رہیں۔ باہر جانے پر ماسک (N95) پہنیں۔",
      alertSensitive: "حساس افراد کو بیرونی سرگرمیاں کم کرنی چاہئیں۔ ماسک پہننے پر غور کریں۔",
      alertModerate: "ہوا کا معیار قابل قبول ہے۔ حساس افراد کو معمولی علامات کا سامنا ہو سکتا ہے۔",
      alertGood: "ہوا کا معیار اچھا ہے۔ بیرونی سرگرمیوں سے لطف اٹھائیں۔",
    },
    // Report Smog
    report: {
      title: "اپنی مقامی حالات کی رپورٹ کریں",
      subtitle: "ایک تصویر یا مختصر ویڈیو اپ لوڈ کریں (زیادہ سے زیادہ 20MB)۔",
      dragDrop: "فائلیں یہاں کھینچیں اور چھوڑیں، یا",
      clickToBrowse: "براؤز کرنے کے لیے کلک کریں",
      supportedFormats: "معاون: JPG, PNG, MP4. زیادہ سے زیادہ 20MB",
      selected: "منتخب",
      useCurrentLocation: "موجودہ مقام استعمال کریں",
      gettingLocation: "آپ کا مقام حاصل کیا جا رہا ہے...",
      location: "مقام",
      address: "پتہ درج کریں...",
      latitude: "عرض البلد",
      longitude: "طول البلد",
      city: "شہر (اختیاری)",
      province: "صوبہ (اختیاری)",
      reportTitle: "رپورٹ کا عنوان (اختیاری)",
      description: "حالات بیان کریں... (اختیاری)",
      submitReport: "رپورٹ جمع کروائیں",
      submitting: "جمع کیا جا رہا ہے...",
      success: "رپورٹ کامیابی سے جمع کر دی گئی! اہلکاروں کے ذریعہ اس کا جائزہ لیا جائے گا۔",
      error: "رپورٹ جمع کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔",
      pleaseLogin: "رپورٹ جمع کرنے کے لیے براہ کرم لاگ ان کریں",
      uploadRequired: "براہ کرم ایک تصویر یا ویڈیو اپ لوڈ کریں",
      locationRequired: "براہ کرم مقام کی رسائی فعال کریں یا دستی طور پر مقام درج کریں",
      addPrivateStation: "نجی ہوا کا معیار اسٹیشن شامل کریں",
      stationName: "اسٹیشن کا نام (اختیاری)",
      model: "ماڈل (مثال: PurpleAir)",
      submitStation: "تصدیق کے لیے اسٹیشن جمع کروائیں",
    },
    // Health Guidance
    health: {
      title: "صحت کی رہنمائی — پشاور، پاکستان",
      currentAQI: "موجودہ ہوا کا معیار",
      recommendedDos: "تجویز کردہ کرنے کے کام",
      recommendedDonts: "تجویز کردہ نہ کرنے کے کام",
      disclaimer: "یہ سفارشات پشاور اور پاکستان کے رہائشیوں کے لیے تیار کی گئی ہیں۔ مقامی صحت کے مشوروں پر عمل کریں اور ذاتی مشورے کے لیے صحت کے پیشہ ور افراد سے مشورہ کریں۔",
      guidance: {
        good: {
          dos: [
            "بیرونی سرگرمیوں سے لطف اٹھائیں — ہوا کا معیار اچھا ہے۔",
            "آرام دہ ہونے پر وینٹیلیشن کے لیے کھڑکیاں کھلی رکھیں۔",
            "باقاعدہ جسمانی سرگرمیوں کو برقرار رکھیں۔",
            "دائمی حالات کے لیے معمول کے احتیاطی تدابیر جاری رکھیں۔",
            "کبھی کبھار ہوا کے معیار کی اپ ڈیٹس چیک کریں۔",
          ],
          donts: [
            "کوئی خاص احتیاطی تدابیر کی ضرورت نہیں۔",
            "یہ نہ سمجھیں کہ ہوا کا معیار ایک جیسا رہے گا — اپ ڈیٹس چیک کریں۔",
            "اگر علامات ظاہر ہوں تو لاپروائی سے گریز کریں۔",
            "مقامی مشوروں کو نظر انداز نہ کریں۔",
            "اچھے AQI میں بھی کوڑا جلانے سے گریز کریں تاکہ یہ اچھا رہے۔",
          ],
        },
        moderate: {
          dos: [
            "طویل بیرونی مشقت کو محدود کریں، خاص طور پر ٹریفک کے قریب۔",
            "پیک ٹریفک کے اوقات میں اندرونی سرگرمیوں کو ترجیح دیں۔",
            "اگر باہر کی ہوا دھول یا دھواں دار لگے تو کھڑکیاں بند رکھیں۔",
            "اگر باہر جلن محسوس ہو تو سادہ کپڑے کا ماسک استعمال کریں۔",
            "پشاور میں اپنے مقامی علاقے کے لیے ہوا کے معیار کو باقاعدگی سے چیک کریں۔",
          ],
          donts: [
            "طویل بیرونی ورزش نہ کریں۔",
            "کھلی جلانے اور دھواں پیدا کرنے والی سرگرمیوں سے گریز کریں۔",
            "گلے میں جلن یا کھانسی جیسی علامات کو نظر انداز نہ کریں۔",
            "طویل عرصے تک بھاری ٹریفک کے قریب رہنے سے گریز کریں۔",
            "یہ نہ سمجھیں کہ اندرونی ہوا ہمیشہ محفوظ ہے — احتیاط سے وینٹیلیٹ کریں۔",
          ],
        },
        usg: {
          dos: [
            "حساس افراد کو باہر گزارے جانے والا وقت کم کرنا چاہیے۔",
            "اگر دستیاب ہو تو اندر ایئر پیوریفائر استعمال کریں۔",
            "اعلی AQI کے اوقات میں کھڑکیاں اور دروازے بند رکھیں۔",
            "اگر تجویز کی گئی ہو تو دوائیں (انسالرز) تیار رکھیں۔",
            "باہر جانے پر مناسب فٹ N95 ماسک پہننے پر غور کریں۔",
          ],
          donts: [
            "بچوں کو طویل عرصے تک باہر کھیلنے نہ دیں۔",
            "شدید بیرونی ورزش سے گریز کریں۔",
            "کوڑا یا لکڑی نہ جلائیں۔",
            "اگر باہر کا دھواں بھاری ہو تو کھلی باورچی خانے کی وینٹیلیشن سے گریز کریں۔",
            "مسلسل سانس لینے کے مسائل کو نظر انداز نہ کریں — ڈاکٹر سے ملاقات کریں۔",
          ],
        },
        unhealthy: {
          dos: [
            "تمام سخت بیرونی سرگرمیوں سے گریز کریں۔",
            "جہاں ممکن ہو گھر کے اندر رہیں اور ایئر پیوریفیکیشن استعمال کریں۔",
            "انفلٹریشن کو کم کرنے کے لیے کھڑکیاں اور دروازے سیل کریں۔",
            "اگر آپ کو باہر جانا پڑے تو N95/KN95 ماسک استعمال کریں۔",
            "ہائیڈریٹ رہیں اور اگر آپ کو حالات ہیں تو ڈاکٹر کے مشورے پر عمل کریں۔",
          ],
          donts: [
            "باہر ورزش نہ کریں۔",
            "بچوں یا بزرگوں کو غیر ضروری طور پر باہر لے جانے سے گریز کریں۔",
            "کوئی کوڑا نہ جلائیں یا کھلی آگ استعمال نہ کریں۔",
            "شدید علامات کو نظر انداز نہ کریں — طبی مدد حاصل کریں۔",
            "مصروف سڑکوں اور انتہائی آلودہ علاقوں سے گریز کریں۔",
          ],
        },
        very_unhealthy: {
          dos: [
            "دروازے اور کھڑکیاں بند کر کے گھر کے اندر رہیں۔",
            "ایئر پیوریفائر استعمال کریں اور سرگرمی کی سطح کم رکھیں۔",
            "اگر آپ کو سانس لینے میں دشواری ہو تو طبی مشورہ لیں۔",
            "اگر آپ کو ہنگامی صورت حال میں باہر جانا پڑے تو ماسک (N95/KN95) استعمال کریں۔",
            "جو کمزور ہو سکتے ہیں (بزرگ/بچے) ان پڑوسیوں کی مدد کریں۔",
          ],
          donts: [
            "جب تک بالکل ضروری نہ ہو باہر نہ جائیں۔",
            "تمام بیرونی ورزش سے گریز کریں۔",
            "بچوں، بزرگوں یا پھیپھڑوں کی بیماری والے لوگوں کو متعرض نہ کریں۔",
            "اندر غیر وینٹیڈ ایندھن جلانے والے آلات استعمال نہ کریں۔",
            "انتہائی آلودہ زون سے سفر کرنے سے گریز کریں۔",
          ],
        },
      },
    },
    // Settings
    settings: {
      title: "ترتیبات",
      profile: "پروفائل",
      language: "زبان",
      notifications: "اطلاعات",
      privacy: "پرائیویسی",
      account: "اکاؤنٹ",
    },
  },
};

/**
 * Get translation for a key
 * @param {string} lang - Language code ('en' or 'ur')
 * @param {string} key - Translation key (e.g., 'dashboard.title')
 * @param {Object} params - Parameters to replace in translation
 * @returns {string} Translated text
 */
export const t = (lang, key, params = {}) => {
  const keys = key.split('.');
  let value = translations[lang] || translations.en;
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const k2 of keys) {
        if (value && typeof value === 'object') {
          value = value[k2];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters
  return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
    return params[param] !== undefined ? params[param] : match;
  });
};

export default translations;

