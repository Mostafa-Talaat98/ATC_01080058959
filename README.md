AreebEvents - Event Management Platform
AreebEvents هو نظام متكامل لإدارة الأحداث والفعاليات، يسمح للمستخدمين باكتشاف، وحجز، وإدارة الأحداث بسهولة. الواجهة الأمامية مبنية بريأكت، والباك اند باستخدام Node.js وExpress مع تخزين البيانات في ملفات JSON محليًا.

المتطلبات
قبل البدء، يجب التأكد من توفر ما يلي:

Node.js وnpm مثبتين على الجهاز.

Git مثبت على نظام التشغيل.

تنصيب AreebEvents
لتثبيت المشروع، اتبع الخطوات التالية:

bash
git clone https://github.com/your-username/AreebEvents.git
cd AreebEvents
نظرة عامة على المشروع
الفرونت اند: تطبيق React حديث يتضمن تسجيل دخول، تصفح الأحداث، والحجز، مع إدارة متكاملة للأدمن.

الباك اند: REST API باستخدام Express, Node.js مع تخزين البيانات محليًا في ملفات JSON.

المزايا
تسجيل مستخدمين ودخول آمن

تصفح، بحث، وتصفية الأحداث

إمكانية حجز وإدارة الحجوزات

لوحة تحكم للأدمن لإدارة الأحداث

تصميم متجاوب مع دعم الوضع الليلي/النهاري

لا حاجة لإعداد قاعدة بيانات (التخزين محلي)

التقنيات المستخدمة
الفرونت اند: React, React Router, Context API, TailwindCSS, React Testing Library, Jest

الباك اند: Node.js, Express, CORS, body-parser

التخزين: ملفات JSON (users.json, events.json)

هيكلية المجلدات
text
AreebEvents/
├── backend/
│   ├── server.js
│   ├── users.json
│   └── events.json
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── App.tsx
│   └── ...
├── public/
├── package.json
└── README.md
بدء الاستخدام
1. إعداد الباك اند
bash
cd backend
npm install
node server.js
يعمل السيرفر على http://localhost:5000

البيانات محفوظة في users.json و events.json

2. إعداد الفرونت اند
bash
npm install
npm start
الفرونت اند يعمل على http://localhost:3000

تأكد أن طلبات الـ API موجهة إلى http://localhost:5000/api/...

بيانات دخول الأدمن الافتراضي
User: admin@example.com

Pass: password

واجهات الـ API (الباك اند)
POST /api/register — تسجيل مستخدم جديد

POST /api/login — تسجيل الدخول

GET /api/events — جميع الأحداث

POST /api/events — إضافة حدث جديد

PUT /api/events/:id — تعديل حدث

DELETE /api/events/:id — حذف حدث

أدوار المستخدمين
User: تسجيل، دخول، تصفح، حجز فعاليات

Admin: إضافة/تعديل/حذف الأحداث (بيانات الدخول بالأعلى)

الاختبارات
تم كتابة اختبارات وحدات باستخدام React Testing Library وJest

للتشغيل:

bash
npm test
المساهمة في المشروع
اعمل fork للريبو

أنشئ فرع جديد لميزتك (git checkout -b feature/your-feature)

نفذ التغييرات (git commit -am 'Add new feature')

ادفع الفرع (git push origin feature/your-feature)

افتح Pull Request

التواصل
Email: mtlt278@gmail.com

WhatsApp: 01080058959

استمتع باستخدام AreebEvents! 🎉

