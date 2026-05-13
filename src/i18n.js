import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "common": {
        "yes": "Yes",
        "no": "No",
        "back": "Back",
        "submit": "Submit",
        "cancel": "Cancel",
        "loading": "Loading...",
        "save": "Save",
        "next": "Next Step",
        "prev": "Previous"
      },
      "navbar": {
        "login": "Login",
        "get_started": "Get Started",
        "logout": "Logout"
      },
      "hero": {
        "title": "Empowering Sri Lankan Families Through",
        "subtitle": "AI-Driven ASD Detection",
        "description": "A state-of-the-art diagnostic companion using advanced SVM models to provide early insights into Autism Spectrum Disorder with clinical-grade accuracy.",
        "start_assessment": "Start Assessment",
        "how_it_works": "Learn How It Works"
      },
      "features": {
        "title": "Why Choose ASD Sense?",
        "subtitle": "Advanced technology meets compassionate care.",
        "secure": {
          "title": "Secure & Private",
          "desc": "Your data is encrypted and handled with the highest medical standards."
        },
        "intelligence": {
          "title": "SVM Intelligence",
          "desc": "Powered by a Kaggle-trained SVM model for reliable and consistent results."
        },
        "parent_focused": {
          "title": "Parent Focused",
          "desc": "Designed specifically for simple, intuitive use by parents and caregivers."
        }
      },
      "footer": {
        "rights": "© 2026 ASD Sense AI. All rights reserved."
      },
      "login": {
        "title": "Welcome Back",
        "subtitle": "Login to access your dashboard",
        "email": "Email Address",
        "password": "Password",
        "btn": "Login",
        "logging_in": "Logging in...",
        "no_account": "Don't have an account?",
        "signup": "Sign up"
      },
      "register": {
        "title": "Create Account",
        "subtitle": "Join our community for early ASD support",
        "first_name": "First Name",
        "last_name": "Last Name",
        "email": "Email Address",
        "password": "Password",
        "confirm_password": "Confirm Password",
        "btn": "Register",
        "creating": "Creating account...",
        "have_account": "Already have an account?",
        "login_link": "Login",
        "password_short": "Password must be at least 6 characters long",
        "password_mismatch": "Passwords do not match"
      },
      "dashboard": {
        "title": "ASD Dashboard",
        "tab_overview": "Overview",
        "tab_assessment": "New Assessment",
        "tab_children": "Children",
        "tab_profile": "Profile",
        "tab_settings": "Settings",
        "welcome_back": "Welcome back",
        "overview_msg": "Here's what's happening with your assessments today.",
        "manage_settings": "Manage your {{tab}} settings here.",
        "profile_info": "Profile Information",
        "profile_sub": "Update your personal details",
        "profile_success": "Profile updated successfully!",
        "profile_error": "Update failed",
        "save": "Save Changes",
        "saving": "Saving...",
        "security": "Security",
        "security_sub": "Manage your account security",
        "password_success": "Password changed successfully!",
        "password_error": "Password change failed",
        "curr_pass": "Current Password",
        "new_pass": "New Password",
        "confirm_pass": "Confirm New Password",
        "update_pass": "Update Password",
        "updating": "Updating...",
        "clinical_data_prompt": "Do you have clinical data?",
        "assessment_type_sub": "Select the assessment type that best matches your available records.",
        "yes_clinical": "Yes, I do",
        "no_clinical": "No, I don't",
        "full_model": "Full clinical model with 23 specific indicators",
        "quick_behavioral": "Quick behavioral screening (Standard A1-A10)",
        "back_to_selection": "BACK TO TYPE SELECTION",
        "total_assessments": "Total Assessments",
        "positive_traits": "Positive Traits",
        "accuracy_rate": "Accuracy Rate",
        "start_first": "Start Your First Assessment",
        "start_first_sub": "Complete a quick 10-minute assessment to get insights into ASD traits using our AI model.",
        "begin_now": "Begin Now"
      },
      "screening": {
        "basic_title": "Basic ASD Screening",
        "basic_sub": "Q-CHAT standardized behavioral assessment",
        "advanced_title": "Advanced Clinical Profile",
        "advanced_sub": "Comprehensive Autism Spectrum Assessment",
        "progress": "PROGRESS",
        "generate": "Generate Screening Result",
        "run_model": "Run Advanced Clinical Model",
        "age": "Age",
        "sex": "Sex",
        "male": "Male",
        "female": "Female",
        "ethnicity": "Ethnicity",
        "relationship": "Relationship",
        "choose": "Choose...",
        "select": "Select...",
        "questions": {
          "A1": "Does the child notice small sounds when others do not?",
          "A2": "Does the child focus more on the whole picture rather than small details?",
          "A3": "In a social group, can the child keep track of several different conversations?",
          "A4": "Does the child find it easy to go back and forth between different activities?",
          "A5": "Does the child know how to keep a conversation going with peers?",
          "A6": "Is the child good at social chit-chat?",
          "A7": "When reading a story, does the child find it difficult to work out characters’ intentions?",
          "A8": "Did the child enjoy playing pretend games with other children in preschool?",
          "A9": "Does the child find it easy to know what someone is thinking just by looking at their face?",
          "A10": "Does the child find it hard to make new friends?"
        },
        "clinical": {
          "speechDelay": "Speech Delay?",
          "learningDisorder": "Learning Disorder?",
          "geneticDisorders": "Genetic Disorder?",
          "depression": "Depression?",
          "iddd": "Dev Delay/ID?",
          "socialBehavioralIssues": "Social Issues?",
          "anxiety": "Anxiety?",
          "jaundice": "Jaundice?",
          "familyASD": "Family ASD?"
        },
        "ethnicities": {
          "0": "Sinhalese",
          "1": "Tamil",
          "2": "Moor",
          "3": "Burgher",
          "4": "Malay",
          "5": "Vedda",
          "6": "Other"
        },
        "relationships": {
          "Parent": "Parent",
          "Healthcare Professional": "Healthcare Professional",
          "Relative": "Relative",
          "Self": "Self"
        },
        "error": "Failed to process assessment. Please ensure all services are running and try again.",
        "success": "Assessment processed successfully!"
      }
    }
  },
  si: {
    translation: {
      "common": {
        "yes": "ඔව්",
        "no": "නැත",
        "back": "ආපසු",
        "submit": "යොමු කරන්න",
        "cancel": "අවලංගු කරන්න",
        "loading": "පූරණය වෙමින්...",
        "save": "සුරකින්න",
        "next": "මීළඟ පියවර",
        "prev": "පෙර"
      },
      "navbar": {
        "login": "ඇතුල් වන්න",
        "get_started": "ආරම්භ කරමු",
        "logout": "පිටවන්න"
      },
      "hero": {
        "title": "කෘතිම බුද්ධිය හරහා ASD හඳුනා ගැනීමෙන්",
        "subtitle": "ශ්‍රී ලාංකික පවුල් සවිබල ගැන්වීම",
        "description": "ඔටිසම් වර්ණාවලි ආබාධය පිළිබඳ මුල් අවබෝධයක් ලබා දීම සඳහා උසස් SVM මාදිලි භාවිතා කරන නවීන රෝග විනිශ්චය සහකාරියකි.",
        "start_assessment": "පරීක්ෂණය ආරම්භ කරන්න",
        "how_it_works": "එය ක්‍රියා කරන ආකාරය"
      },
      "features": {
        "title": "ASD Sense තෝරා ගන්නේ ඇයි?",
        "subtitle": "උසස් තාක්ෂණය සහ මානුෂීය සැලකිල්ල එක්වෙයි.",
        "secure": {
          "title": "ආරක්ෂිත සහ පෞද්ගලික",
          "desc": "ඔබගේ දත්ත සංකේතනය කර ඇති අතර ඉහළම වෛද්‍ය ප්‍රමිතීන්ට අනුව හසුරුවනු ලැබේ."
        },
        "intelligence": {
          "title": "SVM බුද්ධිය",
          "desc": "විශ්වාසදායක සහ ස්ථාවර ප්‍රතිඵල සඳහා Kaggle-පුහුණු SVM ආකෘතියක් මගින් බල ගැන්වේ."
        },
        "parent_focused": {
          "title": "දෙමාපියන් කෙරෙහි අවධානය",
          "desc": "දෙමාපියන් සහ රැකබලා ගන්නන් විසින් සරල, අවබෝධාත්මක භාවිතය සඳහා විෙශේෂෙයන් නිර්මාණය කර ඇත."
        }
      },
      "footer": {
        "rights": "© 2026 ASD Sense AI. සියලුම හිමිකම් ඇවිරිණි."
      },
      "login": {
        "title": "නැවත සාදරයෙන් පිළිගනිමු",
        "subtitle": "ඔබගේ උපකරණ පුවරුවට පිවිසීමට ඇතුල් වන්න",
        "email": "විද්‍යුත් තැපෑල",
        "password": "මුරපදය",
        "btn": "ඇතුල් වන්න",
        "logging_in": "ඇතුල් වෙමින්...",
        "no_account": "ගිණුමක් නොමැතිද?",
        "signup": "ලියාපදිංචි වන්න"
      },
      "register": {
        "title": "ගිණුමක් සාදන්න",
        "subtitle": "මුල් ASD සහාය සඳහා අපගේ ප්‍රජාවට එකතු වන්න",
        "first_name": "මුල් නම",
        "last_name": "වාසගම",
        "email": "විද්‍යුත් තැපෑල",
        "password": "මුරපදය",
        "confirm_password": "මුරපදය තහවුරු කරන්න",
        "btn": "ලියාපදිංචි වන්න",
        "creating": "ගිණුම සාදමින්...",
        "have_account": "දැනටමත් ගිණුමක් තිබේද?",
        "login_link": "ඇතුල් වන්න",
        "password_short": "මුරපදය අවම වශයෙන් අක්ෂර 6 ක් විය යුතුය",
        "password_mismatch": "මුරපද නොගැලපේ"
      },
      "dashboard": {
        "title": "ASD උපකරණ පුවරුව",
        "tab_overview": "දළ විශ්ලේෂණය",
        "tab_assessment": "නව පරීක්ෂණය",
        "tab_children": "දරුවන්",
        "tab_profile": "පැතිකඩ",
        "tab_settings": "සැකසුම්",
        "welcome_back": "නැවත සාදරයෙන් පිළිගනිමු",
        "overview_msg": "ඔබගේ පරීක්ෂණ සම්බන්ධ වර්තමාන තත්වය මෙන්න.",
        "manage_settings": "ඔබගේ {{tab}} සැකසුම් මෙතැනින් කළමනාකරණය කරන්න.",
        "profile_info": "පැතිකඩ තොරතුරු",
        "profile_sub": "ඔබගේ පුද්ගලික තොරතුරු යාවත්කාලීන කරන්න",
        "profile_success": "පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී!",
        "profile_error": "යාවත්කාලීන කිරීම අසාර්ථක විය",
        "save": "වෙනස්කම් සුරකින්න",
        "saving": "සුරකිමින්...",
        "security": "ආරක්ෂාව",
        "security_sub": "ඔබගේ ගිණුමේ ආරක්ෂාව කළමනාකරණය කරන්න",
        "password_success": "මුරපදය සාර්ථකව වෙනස් කරන ලදී!",
        "password_error": "මුරපදය වෙනස් කිරීම අසාර්ථක විය",
        "curr_pass": "වත්මන් මුරපදය",
        "new_pass": "නව මුරපදය",
        "confirm_pass": "නව මුරපදය තහවුරු කරන්න",
        "update_pass": "මුරපදය යාවත්කාලීන කරන්න",
        "updating": "යාවත්කාලීන කරමින්...",
        "clinical_data_prompt": "ඔබ සතුව සායනික දත්ත තිබේද?",
        "assessment_type_sub": "ඔබ සතුව ඇති වාර්තා වලට වඩාත්ම ගැලපෙන පරීක්ෂණ වර්ගය තෝරන්න.",
        "yes_clinical": "ඔව්, මා සතුව ඇත",
        "no_clinical": "නැත, මා සතුව නැත",
        "full_model": "විශේෂිත දර්ශක 23 ක් සහිත සම්පූර්ණ සායනික ආකෘතිය",
        "quick_behavioral": "ඉක්මන් චර්යාත්මක පරීක්ෂාව (Standard A1-A10)",
        "back_to_selection": "නැවත තේරීම වෙත",
        "total_assessments": "මුළු පරීක්ෂණ",
        "positive_traits": "ධනාත්මක ලක්ෂණ",
        "accuracy_rate": "නිරවද්‍යතා අනුපාතය",
        "start_first": "ඔබගේ පළමු පරීක්ෂණය ආරම්භ කරන්න",
        "start_first_sub": "අපගේ AI ආකෘතිය භාවිතයෙන් ASD ලක්ෂණ පිළිබඳ අවබෝධයක් ලබා ගැනීමට ඉක්මන් මිනිත්තු 10 ක පරීක්ෂණයක් සම්පූර්ණ කරන්න.",
        "begin_now": "දැන් ආරම්භ කරන්න"
      },
      "screening": {
        "basic_title": "මූලික ASD පරීක්ෂාව",
        "basic_sub": "Q-CHAT සම්මත චර්යාත්මක තක්සේරුව",
        "advanced_title": "උසස් සායනික පැතිකඩ",
        "advanced_sub": "සම්පූර්ණ ඔටිසම් වර්ණාවලි තක්සේරුව",
        "progress": "ප්‍රගතිය",
        "generate": "පරීක්ෂණ ප්‍රතිඵලය ලබා ගන්න",
        "run_model": "උසස් සායනික ආකෘතිය ක්‍රියාත්මක කරන්න",
        "age": "වයස",
        "sex": "ස්ත්‍රී/පුරුෂ භාවය",
        "male": "පුරුෂ",
        "female": "ස්ත්‍රී",
        "ethnicity": "ජාතිකත්වය",
        "relationship": "සම්බන්ධතාවය",
        "choose": "තෝරන්න...",
        "select": "තෝරන්න...",
        "questions": {
          "A1": "අන් අයට නොඇසෙන කුඩා ශබ්ද දරුවාට ඇසෙනවාද?",
          "A2": "දරුවා කුඩා තොරතුරු වලට වඩා සම්පූර්ණ පින්තූරය කෙරෙහි වැඩි අවධානයක් යොමු කරනවාද?",
          "A3": "සමාජ කණ්ඩායමක් තුළ, දරුවාට විවිධ සංවාද කිහිපයක් පිළිබඳව අවධානය යොමු කළ හැකිද?",
          "A4": "විවිධ ක්‍රියාකාරකම් අතර මාරුවීම දරුවාට පහසුද?",
          "A5": "සම වයසේ මිතුරන් සමඟ සංවාදයක් පවත්වා ගෙන යාමට දරුවා දන්නවාද?",
          "A6": "සමාජීය වශයෙන් සුහදව කතාබස් කිරීමට දරුවා දක්ෂද?",
          "A7": "කතාවක් කියවන විට, චරිතවල අදහස් තේරුම් ගැනීමට දරුවාට අපහසුද?",
          "A8": "පෙර පාසල් වියේදී අනෙකුත් දරුවන් සමඟ මවාපෑමේ ක්‍රීඩා (pretend games) කිරීමට දරුවා කැමති වුණාද?",
          "A9": "කෙනෙකුගේ මුහුණ දෙස බැලීමෙන් පමණක් ඔවුන් සිතන දේ දැන ගැනීම දරුවාට පහසුද?",
          "A10": "අලුත් මිතුරන් ඇති කර ගැනීම දරුවාට අපහසුද?"
        },
        "clinical": {
          "speechDelay": "කථන ප්‍රමාදයක් තිබේද?",
          "learningDisorder": "ඉගෙනීමේ ආබාධයක් තිබේද?",
          "geneticDisorders": "ජානමය ආබාධ තිබේද?",
          "depression": "විසදය (Depression) තිබේද?",
          "iddd": "වර්ධන ප්‍රමාදය/බුද්ධිමය ආබාධ තිබේද?",
          "socialBehavioralIssues": "සමාජීය චර්යාත්මක ගැටළු තිබේද?",
          "anxiety": "කාන්සාව (Anxiety) තිබේද?",
          "jaundice": "ප්‍රපාතය (Jaundice) තිබේද?",
          "familyASD": "පවුලේ ASD ඉතිහාසයක් තිබේද?"
        },
        "ethnicities": {
          "0": "සිංහල",
          "1": "දෙමළ",
          "2": "මුස්ලිම්",
          "3": "බර්ගර්",
          "4": "මැලේ",
          "5": "වැදි",
          "6": "වෙනත්"
        },
        "relationships": {
          "Parent": "දෙමාපියන්",
          "Healthcare Professional": "සෞඛ්‍ය වෘත්තිකයන්",
          "Relative": "ඥාතියෙකු",
          "Self": "තමන්"
        },
        "error": "පරීක්ෂණය සම්පූර්ණ කිරීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.",
        "success": "පරීක්ෂණය සාර්ථකව අවසන් කරන ලදී!"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
