import { WritingTask } from './vstepData';

export const writingTasks: WritingTask[] = [
  {
    id: 'w1',
    title: 'Email xin nghỉ phép',
    task: 1,
    level: 'B1',
    prompt: 'You work at a company and need to take three days off next week for a family event. Write an email to your manager to request leave. In your email, you should:\n- State the reason for your leave\n- Specify the dates\n- Explain how your work will be covered',
    guidelines: [
      'Viết đúng format email (greeting, body, closing)',
      'Nêu rõ lý do xin nghỉ',
      'Đề xuất cách giải quyết công việc khi vắng',
      'Sử dụng ngôn ngữ lịch sự, formal'
    ],
    sampleAnswer: `Dear Mr. Johnson,

I am writing to request three days of leave from Monday, March 15th to Wednesday, March 17th. My younger sister is getting married on March 16th, and I need to help with the preparations and attend the ceremony.

I have already spoken with my colleague, Sarah, who has kindly agreed to handle my ongoing projects during my absence. I will complete all urgent tasks before I leave and prepare a detailed handover document for Sarah.

I will also be available by email for any critical matters that may arise. I hope this arrangement is acceptable, and I would be grateful if you could approve my leave request.

Thank you for your understanding.

Best regards,
[Your name]`,
    wordCount: { min: 120, max: 150 }
  },
  {
    id: 'w2',
    title: 'Essay: Advantages and Disadvantages of Social Media',
    task: 2,
    level: 'B2',
    prompt: 'Some people believe that social media has more advantages than disadvantages for young people. Do you agree or disagree? Write an essay of about 250 words to express your opinion. Give reasons and examples to support your answer.',
    guidelines: [
      'Viết đủ 4 phần: Introduction, Body 1, Body 2, Conclusion',
      'Nêu rõ quan điểm trong phần mở bài',
      'Mỗi body paragraph có topic sentence, supporting details, examples',
      'Sử dụng linking words: However, Furthermore, In addition, etc.',
      'Kết luận tóm tắt lại quan điểm'
    ],
    sampleAnswer: `Social media has become an integral part of young people's lives. While some argue that it brings more benefits, I believe that social media has both significant advantages and disadvantages, and its impact depends largely on how it is used.

On the one hand, social media offers numerous benefits for young people. It provides a platform for communication and helps maintain relationships regardless of distance. Students can use social media for educational purposes, joining study groups and accessing learning resources. Furthermore, it allows young people to express their creativity and develop digital skills that are increasingly valuable in the job market.

On the other hand, excessive use of social media can have negative consequences. Research has shown that spending too much time on social platforms can lead to anxiety, depression, and low self-esteem, particularly when young people compare themselves to others. Additionally, social media can be a source of cyberbullying and exposure to inappropriate content. It can also be highly addictive, reducing time spent on physical activities and face-to-face interactions.

In conclusion, while social media certainly offers valuable opportunities for connection and learning, young people should be educated about its potential risks. Parents and educators play a crucial role in helping young people develop healthy digital habits and critical thinking skills to navigate social media responsibly.`,
    wordCount: { min: 220, max: 260 }
  },
  {
    id: 'w3',
    title: 'Thư phàn nàn về dịch vụ',
    task: 1,
    level: 'B2',
    prompt: 'You recently stayed at a hotel and had a very disappointing experience. Write a letter of complaint to the hotel manager. In your letter:\n- Describe the problems you experienced\n- Explain how they affected your stay\n- State what action you expect the hotel to take',
    guidelines: [
      'Sử dụng formal tone',
      'Mô tả cụ thể các vấn đề (ít nhất 2-3 vấn đề)',
      'Giải thích tác động đến kỳ nghỉ',
      'Đề xuất giải pháp hợp lý (hoàn tiền, voucher, etc.)'
    ],
    sampleAnswer: `Dear Sir/Madam,

I am writing to express my dissatisfaction with my recent stay at your hotel from July 10th to July 13th (Booking reference: HT2024-789).

Firstly, when I arrived at the hotel, I was informed that my reserved room was not available, and I was given a smaller room instead without any prior notice. The room I was assigned had a broken air conditioner, which made it extremely uncomfortable during the hot summer weather.

Secondly, the room was not properly cleaned upon arrival. There were stains on the bedsheets and the bathroom had not been sanitized. Despite reporting this to the front desk, it took over four hours for housekeeping to address the issue.

Furthermore, the noise from ongoing construction next to the hotel was not mentioned anywhere on your website or during booking. This made it impossible to sleep past 7 AM, completely ruining our planned relaxation.

These issues significantly affected our holiday experience, which was meant to be a celebration of our wedding anniversary. Given the multiple problems we encountered, I would like to request a partial refund of at least 50% of our booking cost, or alternatively, a complimentary stay at your hotel to compensate for our disappointing experience.

I look forward to hearing from you within 14 days.

Yours faithfully,
[Your name]`,
    wordCount: { min: 150, max: 200 }
  },
  {
    id: 'w4',
    title: 'Essay: Online Education vs Traditional Education',
    task: 2,
    level: 'C1',
    prompt: 'In recent years, online education has grown significantly. Some people think online education will eventually replace traditional classroom learning. To what extent do you agree or disagree? Write an essay of about 250 words.',
    guidelines: [
      'Trình bày luận điểm rõ ràng và có hệ thống',
      'Sử dụng academic vocabulary',
      'Phân tích nhiều khía cạnh của vấn đề',
      'Đưa ra ví dụ cụ thể để minh họa',
      'Kết luận mạnh mẽ, logic'
    ],
    sampleAnswer: `The rapid advancement of technology has transformed the educational landscape, with online learning platforms becoming increasingly sophisticated. While I acknowledge the growing importance of online education, I firmly believe that it will complement rather than replace traditional classroom learning.

Online education undeniably offers significant advantages. It provides flexibility, allowing students to learn at their own pace and from any location. This democratizes access to education, particularly for those in remote areas or with physical disabilities. Moreover, the cost-effectiveness of online courses makes quality education more accessible to a wider population.

However, traditional classroom education possesses irreplaceable qualities. Face-to-face interaction between teachers and students facilitates immediate feedback, spontaneous discussion, and the development of critical social skills. Laboratory work, group projects, and hands-on activities are difficult to replicate in a virtual environment. Furthermore, the structured routine of physical attendance helps develop discipline and time management skills, particularly in younger learners.

The most effective approach, I would argue, is a hybrid model that combines the strengths of both systems. Universities and schools worldwide are increasingly adopting blended learning approaches, where online resources enhance classroom instruction. This allows educators to leverage technology while maintaining the human connection that is fundamental to effective teaching and learning.

In conclusion, rather than viewing online and traditional education as competing forces, we should recognize their complementary nature and work toward integrating them effectively.`,
    wordCount: { min: 220, max: 280 }
  }
,
// ═══════════════════ AUTHENTIC VSTEP WRITING TASK 1: KEYNOTE INVITATION (ULIS / VNU) ═══════════════════
  {
    id: 'w5',
    title: 'Formal Letter: Thư mời diễn giả hội thảo khoa học',
    task: 1,
    level: 'B2',
    prompt: `You are the president of the International Students' Association at your university. Your association is organizing an annual academic symposium on "Sustainable Development and Climate Resilience in Southeast Asia." 
Write a formal letter of invitation to Dr. Arthur Davies, a renowned climate scientist at Cambridge University. In your letter, you should:
- Explain the purpose and themes of the symposium
- Specify the proposed date, venue, and speaking duration
- Inquire about his availability and offer to cover travel and accommodation expenses`,
    guidelines: [
      'Use proper formal letter etiquette (formal salutation, body paragraphs, and professional sign-off)',
      'Clearly articulate the theme and significance of the event',
      'Detail event logistics (date, time, venue, keynote duration)',
      'Politely state the provisions for flight, lodging, and honorarium'
    ],
    sampleAnswer: `Dear Dr. Davies,

On behalf of the International Students' Association at the National University, I have the distinct honor of inviting you as the keynote speaker at our upcoming International Academic Symposium on "Sustainable Development and Climate Resilience in Southeast Asia."

The symposium is scheduled to take place on November 18th, 2026, at the University Grand Hall. The primary objective of this event is to convene scholars, policymakers, and graduate researchers to deliberate on practical mitigation strategies for coastal regions affected by climate volatility. Given your seminal publications on tropical marine ecology, your insights would provide immense academic value to our 400 delegates.

We would be deeply grateful if you could deliver a 45-minute keynote address, followed by a 15-minute interactive question-and-answer session with the audience. Please be assured that the university committee will fully finance your business-class round-trip airfare, five-star hotel lodging, and provide a distinguished speaker honorarium.

Could you kindly inform us of your availability by October 15th? Should you require further information, please do not hesitate to contact me at this email address.

Thank you very much for your consideration, and we look forward to the possibility of welcoming you to our campus.

Yours sincerely,
Nguyen Van An
President, International Students' Association`,
    wordCount: { min: 140, max: 180 }
  },

  // ═══════════════════ AUTHENTIC VSTEP WRITING TASK 2: REMOTE WORK VS OFFICE WORK (HCMUE / MOET) ═══════════════════
  {
    id: 'w6',
    title: 'Essay: Remote Working vs Traditional Office Work',
    task: 2,
    level: 'B2',
    prompt: `In recent years, remote working and telecommuting have become widespread across many corporate sectors. Some people argue that working from home delivers superior advantages for both employees and companies, while others contend that traditional office environments remain indispensable for organizational productivity and collaboration.
Discuss both views and give your own perspective. Write an academic essay of at least 250 words.`,
    guidelines: [
      'Clear introductory paragraph containing a balanced thesis statement',
      'Body paragraph 1: Objective examination of the benefits of remote work (flexibility, zero commute stress, cost reduction)',
      'Body paragraph 2: In-depth analysis of office work merits (spontaneous collaboration, corporate culture, work-life boundaries)',
      'Conclusion summarizing both stances and clearly articulating your nuanced perspective'
    ],
    sampleAnswer: `The proliferation of digital communication technologies has revolutionized contemporary employment paradigms, sparking vigorous contention between proponents of remote working and advocates of conventional office structures. While telecommuting undeniably offers remarkable flexibility and cost efficiencies, I believe that a hybrid model integrating both modalities provides the optimal balance for long-term organizational success.

On the one hand, remote working yields substantial benefits for both labor forces and corporate entities. From the employee perspective, telecommuting obliterates arduous daily commutes, thereby reducing transit-related stress, fuel expenditures, and carbon emissions. This newfound temporal autonomy enables professionals to balance familial commitments more effectively and structure their working hours around individual peak productivity cycles. For employers, permitting telework drastically curtails capital expenditures on commercial real estate leases, facility maintenance, and office utilities, while simultaneously broadening their talent recruitment pool beyond immediate geographical boundaries.

On the other hand, the traditional physical office fulfills social and psychological functions that virtual platforms cannot fully replicate. Spontaneous interactions—such as impromptu discussions by the watercooler—frequently foster creative brainstorming, innovative problem-solving, and organic team cohesion that scheduled video conferences stifle. Furthermore, junior employees benefit exponentially from in-person observation and informal mentorship under veteran colleagues. A physical separation between the office and home also safeguards psychological boundaries, preventing the common occupational burnout caused when professional duties perpetually intrude into domestic life.

In conclusion, while remote work undeniably maximizes individual autonomy and reduces organizational overhead, physical offices remain paramount for fostering vibrant team cultures and collaborative innovation. Therefore, enterprises that adopt flexible hybrid frameworks—combining telework efficiency with regular in-person teamwork—will be best positioned to thrive in the modern economic era.`,
    wordCount: { min: 250, max: 320 }
  },

  // ═══════════════════ AUTHENTIC VSTEP WRITING TASK 1: TOUR PACKAGE COMPLAINT (HUCFL / B2) ═══════════════════
  {
    id: 'w7',
    title: 'Formal Letter: Thư khiếu nại dịch vụ tour du lịch trọn gói',
    task: 1,
    level: 'B2',
    prompt: `You recently purchased a 4-day premium tour package to Da Nang from Sunrise Travel Agency (Booking Reference: ST-9082). However, the actual tour experience was far below the standards advertised in the brochure: the 4-star beach resort was substituted with a budget hostel under construction, two scheduled sightseeing excursions were abruptly canceled without notice, and the tour guide lacked foreign language proficiency.
Write a formal letter of complaint to the Customer Service Director. In your letter:
- State the booking details and purpose of writing
- Describe the specific discrepancies between the brochure and the actual tour
- Explain the negative impact on your family vacation
- State the compensation or resolution you expect to receive`,
    guidelines: [
      'Maintain an assertive yet strictly professional and polite tone throughout',
      'Enumerate specific contractual discrepancies clearly with reference numbers',
      'Articulate the emotional and financial disruption caused to your holiday',
      'Demand specific restitution (partial refund or financial voucher)'
    ],
    sampleAnswer: `Dear Customer Service Director,

I am writing to express my profound dissatisfaction with the "4-Day Da Nang Luxury Getaway" package purchased from Sunrise Travel Agency (Booking Reference: ST-9082), which my family and I attended from August 12th to 15th.

According to your promotional brochure and contractual agreement, our party was guaranteed accommodation at the four-star Ocean View Beach Resort. Upon arrival, however, we were unilaterally relocated without explanation to a budget hostel situated three kilometers from the coast, which was undergoing disruptive interior renovations throughout our stay.

Furthermore, two premier itinerary excursions—the guided visit to Ba Na Hills and the Marble Mountains sunrise tour—were canceled abruptly by the tour coordinator citing vague logistical constraints, with no alternative activities or refunds offered. To compound our frustration, the assigned tour guide exhibited minimal command of English, rendering communication impossible for my foreign relatives who accompanied me.

This litany of unresolved shortcomings completely undermined what was intended to be a celebratory holiday for my parents' retirement. Given the blatant divergence from your advertised commitments, I request a refund of 50 percent of the total package fee (equivalent to 12,000,000 VND) within fourteen business days. Should this matter fail to receive prompt resolution, I will be compelled to escalate this formal complaint to the Municipal Tourism Department and Consumer Protection Agency.

I look forward to your swift and constructive reply.

Yours sincerely,
Tran Duc Minh`,
    wordCount: { min: 150, max: 190 }
  },

  // ═══════════════════ AUTHENTIC VSTEP WRITING TASK 2: FAST FASHION & ENVIRONMENT (UFL / C1) ═══════════════════
  {
    id: 'w8',
    title: 'Essay: Fast Fashion and Environmental Degradation',
    task: 2,
    level: 'C1',
    prompt: `In recent years, the exponential growth of the "fast fashion" business model has made trendy clothing remarkably inexpensive and disposable. However, environmental scientists report that this industry generates catastrophic amounts of textile waste, microplastic pollution, and toxic chemical runoff.
What are the underlying causes of this unsustainable trend, and what viable policy and consumer measures can be enacted to mitigate its adverse environmental impact? Write an academic essay of at least 250 words.`,
    guidelines: [
      'Academic introduction defining fast fashion and framing both causes and corrective measures',
      'Cause analysis: ultra-fast manufacturing cycles, social media consumerism, planned obsolescence, synthetic fabrics',
      'Solution analysis: governmental textile regulations, producer responsibility laws, circular fashion economy, conscious consumerism',
      'Strong evaluative conclusion synthesizing systemic and personal interventions'
    ],
    sampleAnswer: `The contemporary retail landscape is increasingly dominated by "fast fashion"—a business paradigm characterized by rapid replication of runway aesthetics produced at nominal costs using low-durability synthetic textiles. While this model democratizes access to current sartorial trends, it has precipitated unprecedented ecological crises. Identifying the root drivers of this pervasive consumer phenomenon is imperative to formulating effective regulatory and cultural remedies.

The rapid proliferation of fast fashion is fundamentally propelled by aggressive digital marketing and planned obsolescence. E-commerce platforms and social media influencers continuously cultivate an artificial culture of hyper-consumerism, where garments are psychologically coded as single-use items to be discarded after a solitary photograph. Economically, globalized supply chains exploit low-wage labor and cheap petro-chemical synthetics, such as polyester and nylon, drastically compressing production cycles to mere days. Because these garments are deliberately engineered with poor structural resilience, they rapidly degrade, compelling consumers into continuous cycles of repurchasing and generating millions of tons of non-biodegradable landfill waste and microplastic oceanic pollution annually.

Addressing this ecological emergency necessitates concerted systemic interventions from both regulatory bodies and civil society. Foremost, governments must institute Extended Producer Responsibility (EPR) legislation, mandating that garment manufacturers bear financial accountability for the end-of-life recycling and disposal of their merchandise. Stringent environmental tariffs should also be levied against brands utilizing toxic dye chemicals or non-recycled synthetics. Simultaneously, consumers must cultivate conscious wardrobe ethics by embracing the circular economy—championing vintage clothing, fabric upcycling, and prioritizing durable organic textiles over ephemeral synthetic trends.

In conclusion, the environmental havoc wrought by fast fashion stems from unchecked commercial greed and algorithmic hyper-consumption. Reversing this trajectory demands robust governmental accountability alongside a fundamental paradigm shift toward sustainable, circular sartorial consumption.`,
    wordCount: { min: 260, max: 320 }
  },
  // ═══════════════════ AUTHENTIC VSTEP WRITING 09: TASK 1 FORMAL COMPLAINT & REFUND ═══════════════════
  {
    id: 'w9',
    title: 'Thư phàn nàn sự cố thiết bị hội nghị & yêu cầu hoàn phí',
    task: 1,
    level: 'B1',
    prompt: `You recently booked an executive conference hall at a premier hotel to host an important seminar for your corporate clients. However, the event encountered serious technical and service problems. Write a letter of complaint to the hotel general manager. In your letter:
- Provide the details of your reservation and event date
- Describe the specific technical and catering failures you experienced
- State the exact corrective action or refund compensation you expect from the hotel`,
    guidelines: [
      'Sử dụng giọng văn trang trọng (formal business tone)',
      'Nêu rõ mã đặt phòng, ngày tổ chức và mục đích sự kiện',
      'Liệt kê ít nhất 2 sự cố cụ thể (âm thanh, máy chiếu, tiệc teabreak)',
      'Đề xuất mức bồi thường / hoàn phí hợp lý và thời hạn phản hồi'
    ],
    sampleAnswer: `Dear General Manager,

I am writing to formally register my severe disappointment with the conference services provided by your establishment during our corporate seminar on Friday, October 12th (Booking Reference: CF-8892).

Our company reserved the Diamond Ballroom to host eighty prospective clients for an annual technology showcase. Regrettably, several egregious issues compromised the professional execution of our event. Firstly, the high-definition projection system and main audio mixer suffered intermittent electrical failures, leaving our keynote presenter unable to display critical slide decks for over forty minutes. Secondly, the pre-arranged tea-break catering arrived thirty minutes behind schedule, with insufficient refreshments for our guests.

These compounding failures caused considerable embarrassment to our corporate reputation and disrupted our business agenda. Consequently, I request a formal written explanation from your technical department alongside a 50 percent refund of the total reservation fee.

I trust you will treat this matter with the utmost urgency and look forward to receiving your prompt resolution within five business days.

Yours sincerely,
[Your Name]
Corporate Events Coordinator`,
    wordCount: { min: 120, max: 150 }
  },

  // ═══════════════════ AUTHENTIC VSTEP WRITING 10: TASK 2 ESSAY SMARTPHONE BAN IN SCHOOLS ═══════════════════
  {
    id: 'w10',
    title: 'Essay: Cấm điện thoại thông minh tại trường học (Smartphone Ban)',
    task: 2,
    level: 'B2',
    prompt: `In recent years, an increasing number of educational authorities have instituted blanket bans on smartphones in primary and secondary schools. While proponents argue this boosts academic focus and reduces cyberbullying, critics maintain that smartphones are indispensable modern pedagogical tools. Discuss both views and give your own reasoned opinion in an essay of about 250 words.`,
    guidelines: [
      'Cấu trúc 4 phần chặt chẽ: Introduction, 2 Body paragraphs, Conclusion',
      'Phân tích khách quan luận điểm ủng hộ cấm (tập trung học tập, giảm nghiện màn hình, giao tiếp trực tiếp)',
      'Phân tích luận điểm phản đối (ứng dụng tra cứu học tập, liên lạc khẩn cấp, kỹ năng số)',
      'Đưa ra lập trường cá nhân rõ ràng cùng giải pháp dung hòa (quy định sử dụng có kiểm soát)'
    ],
    sampleAnswer: `The ubiquitous presence of smartphones among adolescents has sparked fierce debate regarding their appropriate role in educational institutions. While several jurisdictions have implemented total prohibitions on mobile devices during school hours, others advocate for their structured integration. In my perspective, while unrestricted phone usage undeniably impairs classroom discipline, a balanced policy emphasizing regulated educational use is superior to an outright ban.

On the one hand, advocates of smartphone bans present compelling pedagogical arguments. Mobile devices represent constant sources of digital distraction, inundating pupils with social media notifications and gaming temptations that diminish concentration and information retention. Furthermore, excessive phone immersion during recess fosters social isolation and exacerbates online peer harassment and cyberbullying. Empirical studies from schools implementing phone restrictions demonstrate measurable enhancements in standardized test scores and noticeable resurgences in face-to-face interpersonal interactions among students.

On the other hand, opponents contend that blanket bans are anachronistic and disregard the tremendous instructional utility of modern digital technology. Smartphones offer instantaneous access to reputable online encyclopedias, interactive scientific simulations, and collaborative language learning platforms. Prohibiting mobile technology fails to equip pupils with essential digital literacy and self-regulatory discipline required in twenty-first-century workplaces. Moreover, smartphones provide an invaluable emergency communication lifeline between pupils and parents.

In conclusion, while the hazards of smartphone misuse in educational environments are undeniable, prohibiting them entirely is a simplistic reaction to a complex modern challenge. Educational institutions should adopt pragmatic guidelines—such as requiring phones to be stowed in dedicated classroom lockers during instructional periods while permitting supervised educational usage—thereby cultivating digital responsibility without sacrificing academic focus.`,
    wordCount: { min: 250, max: 300 }
  },

  // ═══════════════════ AUTHENTIC VSTEP WRITING 11: TASK 1 ADVISORY TRAVEL LETTER ═══════════════════
  {
    id: 'w11',
    title: 'Thư tư vấn lịch trình văn hóa & ẩm thực cho đối tác quốc tế',
    task: 1,
    level: 'B2',
    prompt: `An international colleague from your company's head office in Canada is visiting Hanoi for three days after completing a business conference. Write an email to recommend an itinerary. In your email, you should:
- Suggest top cultural and historical landmarks to visit
- Recommend authentic culinary specialties they should experience
- Provide practical advice regarding transportation and weather precautions`,
    guidelines: [
      'Giọng văn thân thiện, chuyên nghiệp (semi-formal colleague tone)',
      'Lên lịch trình hợp lý cho chuyến tham quan 3 ngày',
      'Giới thiệu địa danh nổi tiếng (Văn Miếu, Phố Cổ, Bảo tàng Dân tộc học)',
      'Đề xuất món ăn đặc sản (Phở, Bún chả, Cà phê trứng)'
    ],
    sampleAnswer: `Dear Marcus,

I was delighted to hear that you will have three leisure days to explore Hanoi following our regional symposium next week! I have curated a personalized cultural and culinary itinerary to ensure your visit is unforgettable.

On your first day, I highly recommend immersing yourself in the historic heart of the capital. Begin with a morning stroll around Hoan Kiem Lake, followed by a visit to the Temple of Literature—Vietnam's very first university, established in 1070. For lunch, you must savor authentic Bun Cha on Hang Manh Street, followed by a creamy egg coffee at a lakeside café.

On day two, visit the Vietnam Museum of Ethnology to admire the rich heritage of Vietnam's 54 ethnic groups. In the evening, explore the vibrant culinary delights of the Old Quarter night market. On your final day, a peaceful cycling tour around West Lake and a visit to Tran Quoc Pagoda will provide a serene conclusion to your trip.

For transportation, I strongly suggest utilizing ride-hailing apps like Grab for safety and fixed fares. Since autumn weather in Hanoi can be humid with occasional afternoon showers, carrying a compact umbrella and light cotton attire is advisable.

Please let me know if you need any further assistance. Enjoy your stay in Hanoi!

Warm regards,
[Your Name]`,
    wordCount: { min: 120, max: 160 }
  },

  // ═══════════════════ AUTHENTIC VSTEP WRITING 12: TASK 2 ESSAY OCEAN PLASTIC CRISIS ═══════════════════
  {
    id: 'w12',
    title: 'Essay: Khủng hoảng rác thải nhựa đại dương & Giải pháp',
    task: 2,
    level: 'C1',
    prompt: `Marine plastic pollution has reached crisis levels globally, threatening aquatic ecosystems and contaminating human food supplies. Many experts argue that individual lifestyle changes alone are insufficient, and that systemic international regulation must be enacted. Examine the primary causes of this environmental crisis and propose effective multi-sectoral solutions in an essay of about 250 words.`,
    guidelines: [
      'Phân tích sâu sắc nguyên nhân gốc rễ (sản xuất nhựa dùng một lần, hệ thống thu gom rác yếu kém)',
      'Phân tích tác động sinh thái (chuỗi thức ăn, hạt vi nhựa microplastics)',
      'Đề xuất giải pháp toàn diện: Trách nhiệm mở rộng của nhà sản xuất (EPR), hiệp ước quốc tế, công nghệ vật liệu sinh học phân hủy'
    ],
    sampleAnswer: `The catastrophic accumulation of non-biodegradable synthetic polymers across the world's oceans constitutes one of the most perilous ecological crises of the Anthropocene. Millions of tons of post-consumer plastics enter marine habitats annually, fragmenting into hazardous microplastics that decimate biodiversity and bioaccumulate across the global trophic web. While voluntary consumer conservation is laudable, mitigating this existential threat necessitates profound structural, legislative, and technological interventions.

The proliferation of oceanic plastic stems primarily from industrial reliance on single-use packaging and fundamentally deficient waste management infrastructure in developing coastal nations. Polymer manufacturing continues to accelerate due to low petrochemical production costs, outpacing municipal recycling capacities. When discarded improperly, synthetic debris drifts into oceanic gyres, where pelagic fauna mistake particulate fragments for sustenance, resulting in chronic starvation, entanglement, and toxic chemical contamination.

To remediate this environmental catastrophe, governments must transition from individualistic blame toward Extended Producer Responsibility (EPR) frameworks. Under legally mandated EPR legislation, plastic manufacturers must bear the complete financial burden of collecting, recycling, or safely processing end-of-life packaging. Tax levies on virgin petroleum-derived plastics should be levied to subsidize research into biodegradable algae-based polymers. Furthermore, high-income nations must finance waste reclamation infrastructure in vulnerable river basin hotspots, preventing urban runoff from entering marine biomes.

Finally, an internationally binding treaty—analogous to the Montreal Protocol for ozone depletion—is imperative to establish standardized production caps and eliminate hazardous disposable polymers. In conclusion, reversing ocean degradation demands an immediate cessation of the throwaway culture through robust regulatory enforcement, circular economic restructuring, and sustainable material innovation.`,
    wordCount: { min: 260, max: 320 }
  }
];
