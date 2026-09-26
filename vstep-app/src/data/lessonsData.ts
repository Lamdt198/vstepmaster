// ═══════════════════ English VSTEP Lessons Data ═══════════════════

export interface Lesson {
  id: string;
  title: string;
  level: 'B1' | 'B2' | 'C1';
  category: 'listening' | 'reading' | 'writing' | 'speaking' | 'grammar' | 'vocabulary';
  videoUrl: string; // YouTube embed URL
  duration: string; // e.g. "15:30"
  description: string;
  content: string; // Lesson notes/content below video
}

export const englishLessons: Lesson[] = [
  {
    id: 'en-l1',
    title: 'VSTEP Listening - Chiến thuật Part 1',
    level: 'B1',
    category: 'listening',
    videoUrl: 'https://www.youtube.com/embed/XGK84Poeynk',
    duration: '12:45',
    description: 'Hướng dẫn chiến thuật làm Part 1 Listening VSTEP - nghe thông báo ngắn, cách đọc câu hỏi trước và bắt keyword.',
    content: `## Chiến thuật Part 1 - Listening VSTEP

**Cấu trúc:** 8 đoạn thông báo ngắn, mỗi đoạn 1 câu hỏi (A/B/C/D)

### Bước 1: Đọc câu hỏi trước (48 giây)
- Gạch chân từ khóa trong câu hỏi
- Dự đoán nội dung sẽ nghe
- Chú ý: What, When, Where, Why, How much/many

### Bước 2: Nghe và chọn đáp án
- Đáp án thường nằm ở giữa hoặc cuối đoạn
- Cẩn thận distractor (thông tin sai lệch)
- Nếu không chắc, loại trừ đáp án sai trước

### Bước 3: Không dừng lại
- Nếu lỡ 1 câu, bỏ qua ngay
- Tập trung vào câu tiếp theo
- KHÔNG để 1 câu khó ảnh hưởng các câu sau

### Lưu ý quan trọng:
- Part 1 chỉ nghe 1 LẦN
- Tốc độ nói: bình thường đến hơi nhanh
- Dạng thường gặp: thông báo sân bay, trường học, bệnh viện, siêu thị`
  },
  {
    id: 'en-l2',
    title: 'VSTEP Reading - Kỹ thuật Skimming & Scanning',
    level: 'B1',
    category: 'reading',
    videoUrl: 'https://www.youtube.com/embed/ZwEquW_Yij0',
    duration: '18:20',
    description: 'Học cách đọc nhanh (skimming) để nắm ý chính và đọc quét (scanning) để tìm thông tin chi tiết trong bài đọc VSTEP.',
    content: `## Kỹ thuật Skimming & Scanning

### Skimming (Đọc lướt - nắm ý chính)
**Khi nào dùng:** Đọc lần đầu, nắm bố cục bài
**Cách làm:**
1. Đọc title
2. Đọc câu đầu mỗi paragraph (topic sentence)
3. Đọc câu cuối paragraph cuối (conclusion)
4. Chú ý từ in đậm, in nghiêng, số liệu

**Thời gian:** ~2 phút cho 1 passage

### Scanning (Đọc quét - tìm chi tiết)
**Khi nào dùng:** Tìm đáp án cho câu hỏi cụ thể
**Cách làm:**
1. Xác định keyword từ câu hỏi
2. Quét bài tìm keyword hoặc synonym
3. Đọc kỹ 2-3 câu xung quanh keyword
4. Chọn đáp án

**Tips cho VSTEP Reading:**
- 60 phút / 4 passages / 40 câu = 15 phút/passage
- Đọc câu hỏi TRƯỚC, đọc bài SAU
- Đáp án thường paraphrase (dùng từ đồng nghĩa)
- "Not Given" ≠ "False"`
  },
  {
    id: 'en-l3',
    title: 'VSTEP Writing Task 2 - Cấu trúc Essay',
    level: 'B2',
    category: 'writing',
    videoUrl: 'https://www.youtube.com/embed/TYmIQC1BLqo',
    duration: '22:10',
    description: 'Cách viết essay VSTEP Task 2: cấu trúc 4 đoạn, thesis statement, topic sentences, và linking words.',
    content: `## Cấu trúc Essay VSTEP Task 2 (~250 từ, 40 phút)

### Paragraph 1: Introduction (3-4 câu)
- Sentence 1: Hook/Background (giới thiệu chủ đề)
- Sentence 2: Paraphrase đề bài
- Sentence 3: Thesis statement (nêu quan điểm rõ ràng)

**Template:**
> In recent years, [topic] has become a subject of debate. While some people believe [view A], others argue [view B]. In my opinion, [your position].

### Paragraph 2: Body 1 (5-6 câu)
- Topic sentence (ý chính)
- Explanation (giải thích)
- Example (ví dụ cụ thể)
- Link back (liên kết lại thesis)

### Paragraph 3: Body 2 (5-6 câu)
- Cấu trúc tương tự Body 1
- Hoặc: Counterargument + Refutation

### Paragraph 4: Conclusion (2-3 câu)
- Paraphrase thesis
- Tóm tắt ý chính
- Final thought / Recommendation

### Linking Words quan trọng:
| Mục đích | Từ nối |
|----------|--------|
| Thêm ý | Moreover, Furthermore, In addition |
| Tương phản | However, Nevertheless, On the other hand |
| Kết quả | Therefore, Consequently, As a result |
| Ví dụ | For instance, For example, Such as |
| Kết luận | In conclusion, To sum up, Overall |`
  },
  {
    id: 'en-l4',
    title: 'VSTEP Speaking Part 3 - Topic Development',
    level: 'B2',
    category: 'speaking',
    videoUrl: 'https://www.youtube.com/embed/KYOhAwIwirQ',
    duration: '15:50',
    description: 'Chiến thuật Speaking Part 3 VSTEP: cách phát triển ý, đưa quan điểm + ví dụ + kết luận trong 3 phút.',
    content: `## Speaking Part 3: Topic Development (5 phút)

**Format:** 2 phút chuẩn bị + 3 phút nói

### Cấu trúc trả lời (OREO method):
1. **O**pinion - Đưa quan điểm
2. **R**eason - Giải thích lý do
3. **E**xample - Đưa ví dụ cụ thể
4. **O**pinion - Nhắc lại quan điểm

### Mở đầu (10-15 giây):
- "In my opinion, I believe that..."
- "From my perspective, I would say that..."
- "I strongly agree/disagree with the idea that..."

### Phát triển ý (2 phút):
- Đưa 2-3 lý do
- Mỗi lý do kèm 1 ví dụ
- Dùng connectors: Firstly... Secondly... Finally...

### Kết luận (15-20 giây):
- "To conclude, I believe..."
- "All in all, I think..."

### Tips quan trọng:
- Nói RÕ RÀNG hơn là nói NHANH
- Tự sửa lỗi: "Sorry, what I mean is..."
- Fillers tự nhiên: "Well...", "Let me think...", "That's an interesting point..."
- Nếu hết ý: đưa ví dụ cá nhân, so sánh VN vs nước khác`
  },
  {
    id: 'en-l5',
    title: 'Grammar: Tenses cho VSTEP Writing',
    level: 'B1',
    category: 'grammar',
    videoUrl: 'https://www.youtube.com/embed/bWvhqVXKyQQ',
    duration: '20:00',
    description: 'Ôn tập 12 thì tiếng Anh và cách dùng đúng trong bài viết VSTEP để đạt điểm Grammatical Range cao.',
    content: `## 12 Thì tiếng Anh cho VSTEP Writing

### Nhóm hiện tại:
| Thì | Cấu trúc | Dùng khi |
|-----|-----------|----------|
| Present Simple | S + V(s/es) | Sự thật, thói quen |
| Present Continuous | S + am/is/are + V-ing | Đang xảy ra, xu hướng |
| Present Perfect | S + have/has + V3 | Quá khứ → hiện tại |
| Present Perfect Cont. | S + have been + V-ing | Kéo dài đến hiện tại |

### Nhóm quá khứ:
| Thì | Cấu trúc | Dùng khi |
|-----|-----------|----------|
| Past Simple | S + V2/ed | Đã xảy ra, kết thúc |
| Past Continuous | S + was/were + V-ing | Đang xảy ra trong QK |
| Past Perfect | S + had + V3 | Trước 1 mốc QK |

### Nhóm tương lai:
| Thì | Cấu trúc | Dùng khi |
|-----|-----------|----------|
| Future Simple | S + will + V | Dự đoán, quyết định |
| Be going to | S + am/is/are going to + V | Kế hoạch |

### Tips cho VSTEP Writing:
- **Task 1 (Email):** Dùng nhiều Present/Future Simple
- **Task 2 (Essay):** Mix nhiều thì = điểm Grammar cao hơn
- Tránh lặp lại 1 thì suốt bài
- Signal words: since, for, already (Present Perfect), yesterday, last (Past Simple)`
  },
  {
    id: 'en-l6',
    title: 'Vocabulary: Linking Words & Academic Phrases',
    level: 'B2',
    category: 'vocabulary',
    videoUrl: 'https://www.youtube.com/embed/3sARVt0Fbn4',
    duration: '16:30',
    description: 'Từ vựng academic và linking words cần thiết cho VSTEP Writing & Speaking để đạt điểm Lexical Resource cao.',
    content: `## Academic Vocabulary & Linking Words cho VSTEP

### 1. Giving opinions:
- I firmly believe that...
- It is widely acknowledged that...
- From my standpoint / perspective...
- There is no doubt that...

### 2. Adding information:
- Furthermore / Moreover / In addition
- Besides / What is more
- Not only... but also...
- On top of that...

### 3. Contrasting:
- However / Nevertheless / Nonetheless
- On the other hand / In contrast
- Despite / In spite of + N/V-ing
- Although / Even though + S + V

### 4. Cause & Effect:
- Therefore / Consequently / As a result
- Due to / Owing to + N
- This leads to / results in...
- One consequence of this is...

### 5. Giving examples:
- For instance / For example
- A case in point is...
- To illustrate this point...
- ...such as / including...

### 6. Concluding:
- In conclusion / To sum up / All in all
- Taking everything into account...
- On balance, I believe...
- In light of the above discussion...

### Tips:
- Học theo CẶP (However ↔ Moreover)
- Mỗi ngày dùng 3-5 từ mới trong writing practice
- Đọc bài mẫu band 7-8 để thấy cách dùng tự nhiên`
  },
];


// ═══════════════════ Chinese HSK Lessons Data ═══════════════════
export interface ChineseLesson {
  id: string;
  title: string;
  level: number; // HSK 1-6
  category: 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'conversation';
  videoUrl: string;
  duration: string;
  description: string;
  content: string;
}

export const chineseLessons: ChineseLesson[] = [
  {
    id: 'zh-l1',
    title: 'HSK1 - Bài 1: 你好 Xin chào',
    level: 1,
    category: 'conversation',
    videoUrl: 'https://www.youtube.com/embed/RhUGDRGkKr8',
    duration: '10:20',
    description: 'Bài giảng đầu tiên: chào hỏi, giới thiệu bản thân, hỏi tên bằng tiếng Trung.',
    content: `## Bài 1: 你好 - Xin chào

### Từ vựng mới:
| Hán tự | Pinyin | Nghĩa |
|--------|--------|--------|
| 你好 | nǐ hǎo | xin chào |
| 我 | wǒ | tôi |
| 你 | nǐ | bạn |
| 是 | shì | là |
| 叫 | jiào | tên là / gọi |
| 什么 | shénme | cái gì |
| 名字 | míngzi | tên |

### Mẫu câu:
1. **你好！** - Nǐ hǎo! - Xin chào!
2. **你叫什么名字？** - Nǐ jiào shénme míngzi? - Bạn tên gì?
3. **我叫小明。** - Wǒ jiào Xiǎo Míng. - Tôi tên Tiểu Minh.
4. **你是学生吗？** - Nǐ shì xuéshēng ma? - Bạn là học sinh không?
5. **是的，我是学生。** - Shì de, wǒ shì xuéshēng. - Vâng, tôi là học sinh.

### Ngữ pháp:
- **吗 (ma):** Đặt cuối câu để tạo câu hỏi Yes/No
- **叫 (jiào):** Dùng để nói tên: 我叫... = Tôi tên là...
- **是 (shì):** A 是 B = A là B`
  },
  {
    id: 'zh-l2',
    title: 'HSK1 - Bài 2: 数字 Số đếm 1-100',
    level: 1,
    category: 'vocabulary',
    videoUrl: 'https://www.youtube.com/embed/iFPosZRGSss',
    duration: '12:00',
    description: 'Học đếm số từ 1 đến 100 bằng tiếng Trung, cách nói giá tiền và số điện thoại.',
    content: `## Bài 2: 数字 (Shùzì) - Số đếm

### Số 1-10:
| Số | Hán tự | Pinyin |
|----|--------|--------|
| 1 | 一 | yī |
| 2 | 二 | èr |
| 3 | 三 | sān |
| 4 | 四 | sì |
| 5 | 五 | wǔ |
| 6 | 六 | liù |
| 7 | 七 | qī |
| 8 | 八 | bā |
| 9 | 九 | jiǔ |
| 10 | 十 | shí |

### Quy tắc đếm 11-99:
- 11 = 十一 (shí yī) = 10 + 1
- 20 = 二十 (èr shí) = 2 × 10
- 35 = 三十五 (sān shí wǔ) = 3×10 + 5
- 100 = 一百 (yì bǎi)

### Hỏi giá tiền:
- **多少钱？** (Duōshao qián?) - Bao nhiêu tiền?
- **十五块。** (Shíwǔ kuài.) - 15 tệ.

### Hỏi số điện thoại:
- **你的电话号码是多少？** 
- Nǐ de diànhuà hàomǎ shì duōshao?
- Số điện thoại của bạn là bao nhiêu?`
  },
  {
    id: 'zh-l3',
    title: 'HSK2 - Ngữ pháp: 了/过/着',
    level: 2,
    category: 'grammar',
    videoUrl: 'https://www.youtube.com/embed/uNRNjneBZCU',
    duration: '18:45',
    description: 'Phân biệt 3 trợ từ quan trọng nhất: 了 (hoàn thành), 过 (kinh nghiệm), 着 (trạng thái).',
    content: `## Phân biệt 了 / 过 / 着

### 1. 了 (le) - Hoàn thành / Thay đổi
**Dùng khi:** Hành động đã hoàn thành hoặc tình huống thay đổi

- 我吃**了**早饭。(Wǒ chī**le** zǎofàn.) - Tôi đã ăn sáng rồi.
- 他走**了**。(Tā zǒu**le**.) - Anh ấy đi rồi.
- 天气冷**了**。(Tiānqì lěng**le**.) - Trời lạnh rồi. (thay đổi)

### 2. 过 (guò) - Kinh nghiệm
**Dùng khi:** Đã từng trải nghiệm (không quan trọng khi nào)

- 我去**过**中国。(Wǒ qù**guò** Zhōngguó.) - Tôi đã từng đi Trung Quốc.
- 你吃**过**火锅吗？(Nǐ chī**guò** huǒguō ma?) - Bạn đã ăn lẩu bao giờ chưa?
- 我没看**过**这部电影。- Tôi chưa từng xem phim này.

### 3. 着 (zhe) - Trạng thái đang diễn ra
**Dùng khi:** Mô tả trạng thái hiện tại

- 门开**着**。(Mén kāi**zhe**.) - Cửa đang mở.
- 他穿**着**红色衣服。(Tā chuān**zhe** hóngsè yīfu.) - Anh ấy đang mặc áo đỏ.
- 墙上挂**着**一幅画。- Trên tường treo một bức tranh.

### So sánh:
| | 了 | 过 | 着 |
|--|----|----|-----|
| Nghĩa | đã xong | đã từng | đang (trạng thái) |
| Focus | kết quả | kinh nghiệm | trạng thái |
| Phủ định | 没 + V | 没 + V + 过 | 没 + V + 着 |`
  },
  {
    id: 'zh-l4',
    title: 'HSK3 - Đọc hiểu & Từ vựng nâng cao',
    level: 3,
    category: 'reading',
    videoUrl: 'https://www.youtube.com/embed/7FMNq1VBfXE',
    duration: '25:00',
    description: 'Luyện đọc hiểu HSK3 với các đoạn văn về cuộc sống, công việc, và xã hội. Mở rộng từ vựng 600 từ.',
    content: `## HSK3 Reading - Chiến thuật đọc hiểu

### Dạng bài HSK3 Reading:
1. **Nối câu** (5 câu) - Chọn câu phù hợp với ngữ cảnh
2. **Đọc đoạn ngắn** (5 câu) - Chọn đáp án đúng
3. **Đọc đoạn dài** (5 câu) - Trả lời câu hỏi

### Chiến thuật:
- Đọc câu hỏi trước, đọc bài sau
- Tìm keyword trong câu hỏi
- Loại trừ đáp án sai
- Chú ý: 但是/可是 (nhưng) thường dẫn đến đáp án

### Từ vựng HSK3 theo chủ đề:

**Công việc:**
- 工作 (gōngzuò) - công việc
- 公司 (gōngsī) - công ty
- 经理 (jīnglǐ) - giám đốc
- 会议 (huìyì) - cuộc họp
- 加班 (jiābān) - làm thêm giờ

**Sức khỏe:**
- 身体 (shēntǐ) - cơ thể
- 锻炼 (duànliàn) - tập luyện
- 医院 (yīyuàn) - bệnh viện
- 感冒 (gǎnmào) - cảm cúm

**Du lịch:**
- 旅游 (lǚyóu) - du lịch
- 护照 (hùzhào) - hộ chiếu
- 飞机 (fēijī) - máy bay
- 酒店 (jiǔdiàn) - khách sạn`
  },
];
