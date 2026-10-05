# Weekend Studio

แอปวางแผนทริปวันหยุดภาษาไทย สำหรับ demo public deploy เป็น **frontend ล้วน** (HTML/CSS/JavaScript) ไม่มี backend, DB, API, login, API key หรือ runtime dependency ภายนอก Nginx ทำหน้าที่เสิร์ฟไฟล์ static เท่านั้น

## ฟีเจอร์

- เลือกเชียงใหม่ กรุงเทพฯ หรือหัวหิน พร้อมกิจกรรมตัวอย่าง 18 รายการ
- กรองธรรมชาติ คาเฟ่/อาหาร และศิลปะ/วัฒนธรรม
- วางแผน 1–3 วัน เพิ่มกิจกรรมเอง จัดลำดับและลบกิจกรรม
- คำนวณงบรวมโดยประมาณ และดาวน์โหลดแผนเป็นไฟล์ข้อความภาษาไทย
- เก็บแผนด้วย localStorage ในเบราว์เซอร์เดิม ไม่แชร์ข้อมูลข้ามผู้ใช้หรืออุปกรณ์
- รองรับมือถือ คีย์บอร์ด และ reduced motion

รูปกิจกรรมเป็นภาพประกอบ CSS/emoji ไม่มี remote fonts, รูปภายนอก หรือ analytics ราคาและกิจกรรมเป็นข้อมูลตัวอย่าง ไม่ใช่ราคา/ตารางเปิดทำการจริง ถ้า browser ปิดกั้น storage แอปยังใช้งานในหน้านั้นได้ แต่ข้อมูลอาจไม่อยู่หลัง reload

## รันในเครื่อง

ต้องมี Node.js 22 ขึ้นไป ไม่ต้อง npm install เพราะไม่มี dependencies

```sh
npm run dev
```

เปิด http://localhost:5174

```sh
npm run check
npm run build
npm run preview
```

Build ได้ไฟล์ static ใน `dist/` สามารถเสิร์ฟด้วย static hosting ได้ทันที สคริปต์ dev/preview เป็นตัวเสิร์ฟไฟล์สำหรับพัฒนาเท่านั้น ไม่ได้ถูกรวมใน runtime image

## Docker

```sh
docker build -t weekend-studio:1.0.0 .
docker run --rm -p 8080:8080 weekend-studio:1.0.0
```

เปิด http://localhost:8080 ตรวจสุขภาพที่ `/healthz` image ใช้ multi-stage build: Node สำหรับ build และ Nginx สำหรับ runtime รันเป็น user 101 (non-root), ฟัง `0.0.0.0:8080`, เขียน runtime files ใน `/tmp` และส่ง log ไป stdout/stderr

## Deploy บน Kubly

ใช้ repo นี้เป็น source ของแอป container และตั้งค่าที่เทียบเท่าดังนี้ (ชื่อช่องใน Kubly อาจต่างกันตามรุ่น):

| ค่า | ตั้งเป็น |
| --- | --- |
| Build context / root directory | `.` (root ของ repo weekend-studio) |
| Dockerfile path | `Dockerfile` |
| Container / target port | `8080` |
| Health / readiness path | `/healthz` |
| Public domain | ใช้ domain ที่ Kubly จัดให้ หรือตั้ง domain ของคุณ |
| Environment variables / secrets | ไม่ต้องตั้ง |
| Database / volume | ไม่ต้องใช้ |

ถ้า source เป็น repo รวม ให้ตั้ง build context เป็น `weekend-studio` แทน root ของ repo รวม จากนั้นสั่ง Build & Deploy และเปิด public URL ของ Kubly ตัวแอปไม่ต้องทราบ URL ล่วงหน้า เพราะใช้ relative asset paths ทั้งหมด

ไม่ได้รวมชื่อช่องที่ยืนยันจาก Kubly รุ่นเฉพาะ หรือการสร้าง service จริง การ push Git remote และ deploy ต้องใช้บัญชี/โปรเจกต์ปลายทางของคุณ HTTPS ให้ terminate ที่ ingress ของแพลตฟอร์ม หากบังคับ read-only root filesystem ให้ mount writable `/tmp` (เช่น emptyDir) ด้วย

## โครงสร้าง

- `index.html` — หน้าแอปและฟอร์ม
- `style.css` — responsive layout และภาพประกอบในตัว
- `app.js` — กิจกรรม แผนรายวัน localStorage และ export
- `scripts/` — build และ local static preview ไม่มี dependencies
- `Dockerfile`, `nginx.conf` — production container และ health check

## ข้อมูลสำหรับเดโมสาธารณะ

ผู้ใช้แต่ละเบราว์เซอร์มีแผนของตนเอง ข้อมูลไม่ได้ส่งไป server การล้าง site data จะลบแผน และ localStorage แยกตาม origin/domain การเปลี่ยน domain จะไม่ย้ายข้อมูลเดิมให้อัตโนมัติ
