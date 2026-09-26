import { SpeakingTopic } from './vstepData';

export const speakingTopics: SpeakingTopic[] = [
  {
    id: 's1',
    title: 'Part 1: Social Interaction - Giới thiệu bản thân',
    part: 1,
    level: 'B1',
    prompt: 'Tell me about yourself. What do you do? What are your hobbies and interests?',
    followUpQuestions: [
      'What do you like most about your job/studies?',
      'How do you usually spend your weekends?',
      'Do you prefer indoor or outdoor activities? Why?'
    ],
    sampleAnswer: `My name is [name] and I'm currently a third-year student at Hanoi University of Science and Technology, majoring in Information Technology. I chose this field because I've always been fascinated by how technology can solve real-world problems.

In my free time, I enjoy reading books, particularly science fiction novels. I also like playing badminton with my friends on weekends. It's a great way to stay active and socialize at the same time.

What I like most about my studies is the practical projects we work on. Last semester, we built a mobile app for a local community, which was very rewarding.`,
    prepTime: 30,
    speakTime: 120
  },
  {
    id: 's2',
    title: 'Part 2: Solution Discussion - Lên kế hoạch',
    part: 2,
    level: 'B1',
    prompt: 'Your university is organizing a charity event to raise money for children in rural areas. You and a classmate need to discuss and decide:\n- What type of event to organize (concert, sports day, food fair, etc.)\n- When and where to hold it\n- How to attract students to participate\n\nDiscuss with the examiner and come to an agreement.',
    followUpQuestions: [
      'Do you prefer traveling alone or with others?',
      'What do you think makes a trip memorable?',
      'How has travel changed in recent years?'
    ],
    sampleAnswer: `I'd like to talk about a trip I took to Da Nang last summer with my university friends. We spent five days there exploring the city and nearby attractions.

The trip was particularly memorable because it was the first time all five of us traveled together. We visited the Marble Mountains, which had stunning views from the top. We also spent a day at Ba Na Hills and walked across the famous Golden Bridge.

What made it truly special was the time we spent at My Khe Beach. We woke up early every morning to watch the sunrise and swim in the crystal-clear water. In the evenings, we explored local street food and tried dishes like Mi Quang and Banh Xeo.

This trip is memorable because of the quality time we shared together. We laughed, took hundreds of photos, and created memories that I still cherish today.`,
    prepTime: 60,
    speakTime: 180
  },
  {
    id: 's3',
    title: 'Part 3: Topic Development - Công nghệ & Xã hội',
    part: 3,
    level: 'B2',
    prompt: 'Some people think that technology is making people less sociable. Do you agree or disagree? Give reasons for your answer.',
    followUpQuestions: [
      'How has technology changed the way people communicate?',
      'Do you think social media brings people together or pushes them apart?',
      'What can be done to maintain face-to-face relationships in the digital age?'
    ],
    sampleAnswer: `This is an interesting topic that many people debate about. I partially agree that technology can make some people less sociable, but I don't think it's entirely negative.

On one hand, it's true that many people now spend too much time on their phones, even when they're with friends or family. You can see this in restaurants where everyone is looking at screens instead of talking to each other. This kind of behavior definitely reduces the quality of face-to-face interaction.

However, I also believe technology has helped many people become more connected. For example, introverted people might find it easier to express themselves online. Video calls allow families separated by distance to stay close. Social media helps us maintain friendships that might otherwise fade over time.

I think the key is balance. Technology should be a tool that enhances our social lives, not a replacement for real human connection. People need to be more mindful about when and how they use their devices.`,
    prepTime: 60,
    speakTime: 180
  },
  {
    id: 's4',
    title: 'Part 2: Solution Discussion - Chọn quà tặng',
    part: 2,
    level: 'B2',
    prompt: 'Your class wants to buy a farewell gift for a teacher who is retiring. You and your classmate need to discuss:\n- What kind of gift to buy (a book, a painting, a tech gadget, a trip voucher, etc.)\n- How much money to collect from each student\n- How to present the gift at the farewell party\n\nDiscuss the options and reach a decision.',
    followUpQuestions: [
      'Why do you think role models are important?',
      'Do celebrities make good role models?',
      'How do parents influence their children\'s choices?'
    ],
    sampleAnswer: `I'd like to talk about my high school English teacher, Ms. Lan. She taught me English from grade 10 to grade 12 and had a profound impact on my life.

What made her special was her teaching approach. Unlike other teachers who focused purely on grammar and exams, she encouraged us to think critically and express our opinions in English. She organized debate clubs, movie discussions, and even helped us pen pal with students abroad.

She particularly influenced me when I was struggling with confidence in speaking English. She noticed that I was shy and afraid of making mistakes. Instead of pushing me in front of the class, she started with small group discussions and gradually helped me build confidence.

Her most impactful lesson was when she told me, "Making mistakes is not failure - it's learning." This changed my entire perspective on language learning. I stopped being afraid of errors and started focusing on communication instead of perfection.

Thanks to her encouragement, I developed a genuine love for English and eventually decided to pursue international studies. She showed me that a good teacher doesn't just teach a subject - they inspire a lifelong passion for learning.`,
    prepTime: 60,
    speakTime: 180
  },
  {
    id: 's5',
    title: 'Part 3: Topic Development - Môi trường đô thị',
    part: 3,
    level: 'C1',
    prompt: 'Many cities around the world are facing serious environmental problems. What do you think are the main environmental challenges facing cities today, and what solutions would you suggest?',
    followUpQuestions: [
      'Should individuals or governments take more responsibility for environmental protection?',
      'How can technology help solve environmental problems?',
      'Do you think economic growth and environmental protection can coexist?'
    ],
    sampleAnswer: `Cities today face numerous interconnected environmental challenges that require urgent attention. I believe the three most pressing issues are air pollution, waste management, and the urban heat island effect.

Air pollution is perhaps the most immediate threat to public health. The concentration of vehicles and industrial activities in urban areas creates dangerous levels of particulate matter and nitrogen dioxide. To address this, cities should invest heavily in public transportation and cycling infrastructure, while gradually phasing out fossil-fuel vehicles through incentives for electric vehicles and congestion charges.

Waste management is another critical challenge. As urban populations grow, cities produce increasing amounts of waste that overwhelms landfills. The solution lies in implementing comprehensive recycling programs, promoting a circular economy, and investing in waste-to-energy technologies.

The urban heat island effect, where cities become significantly warmer than surrounding rural areas due to concrete and asphalt surfaces, can be mitigated through green infrastructure. This includes creating more parks, implementing green roofs, and planting street trees.

What's crucial is that these solutions require coordinated action between government, businesses, and citizens. No single approach will solve these problems; we need integrated strategies that address environmental, social, and economic dimensions simultaneously.`,
    prepTime: 60,
    speakTime: 240
  }
,
// ═══════════════════ AUTHENTIC VSTEP SPEAKING PART 1: PUBLIC TRANSIT & HEALTH (ULIS / MOET) ═══════════════════
  {
    id: 's6',
    title: 'Part 1: Social Interaction - Public Transportation & Health',
    part: 1,
    level: 'B1',
    prompt: `Topic 1: Public Transportation
- How do you usually travel to school or work every day?
- What are the advantages of using public transport like buses or trains?
- Do you think private motorbikes will still be popular in cities in the future?

Topic 2: Healthy Habits
- What physical activities do you do to keep fit?
- How do you manage stress after a demanding workday or exam period?`,
    followUpQuestions: [
      'Is traffic congestion a major problem in your city?',
      'Do you prefer walking or cycling for short trips? Why?',
      'How important is getting adequate sleep for mental health?'
    ],
    sampleAnswer: `Regarding transportation, I commute to university daily using the public bus system. Although buses can be crowded during rush hours, I appreciate that they are extremely economical and allow me to review lecture notes during the journey. Furthermore, public transport reduces carbon emissions and mitigates traffic gridlock compared to private vehicles. While motorbikes remain ubiquitous in Vietnamese cities today due to their unmatched convenience in narrow alleyways, I believe the expansion of urban metro transit systems will gradually persuade more citizens to transition toward clean public transportation.

In terms of personal wellness, I maintain a consistent routine of jogging for thirty minutes every morning around the neighborhood park. Regular cardiovascular exercise not only enhances my physical stamina but also stimulates endorphin production, which sharpens my focus throughout the day. When facing intense academic deadlines, I alleviate stress by listening to instrumental classical music and practicing deep-breathing meditation. Maintaining consistent sleep patterns is equally paramount, as cognitive recovery depends upon restorative rest.`,
    prepTime: 30,
    speakTime: 180
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING PART 2: UPGRADING CAMPUS FACILITIES (HCMUE / B2) ═══════════════════
  {
    id: 's7',
    title: 'Part 2: Solution Discussion - Đầu tư cơ sở vật chất sinh viên',
    part: 2,
    level: 'B2',
    prompt: `Situation: Your university faculty has received a grant of 30 million VND to upgrade student facilities. Three options are proposed:
1. Equipping the student library with high-speed computers
2. Constructing an outdoor sports and fitness corner
3. Setting up a multimedia foreign language self-study lab

Which option do you think is the best choice? Explain your choice and state why the other two options are less suitable.`,
    followUpQuestions: [
      'How does modern technology assist students in self-directed learning?',
      'Why is physical fitness important for university students facing academic pressure?',
      'Should universities solicit direct student voting before funding campus projects?'
    ],
    sampleAnswer: `If our faculty is awarded a 30-million VND grant, I firmly believe that setting up a multimedia foreign language self-study lab is the optimal investment.

First and foremost, in an increasingly globalized job market, foreign language proficiency is an indispensable graduation benchmark for undergraduates. A dedicated multimedia language lab equipped with specialized pronunciation software, noise-canceling headsets, and interactive simulation tools provides students with an immersive language acquisition environment that conventional classrooms cannot deliver. This facility directly enhances students' career employability and international communication competence.

While I acknowledge the merits of the other two proposals, both exhibit substantial shortcomings. Equipping the library with high-speed computers is somewhat redundant today, as the overwhelming majority of modern undergraduates already possess personal laptops and smartphones; what students require is dependable high-speed Wi-Fi rather than stationary desktop towers. On the other hand, while an outdoor fitness corner promotes physical well-being, outdoor sports equipment is perpetually susceptible to weathering, rust, and tropical monsoon rains, requiring prohibitive long-term maintenance expenditures that exceed our finite grant.

Therefore, allocating the grant to a multimedia foreign language lab maximizes academic utility and delivers enduring benefits to the entire student body.`,
    prepTime: 60,
    speakTime: 180
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING PART 3: E-LEARNING TRANSFORMATION (HUCFL / C1) ═══════════════════
  {
    id: 's8',
    title: 'Part 3: Topic Development - Chuyển đổi Giáo dục Trực tuyến',
    part: 3,
    level: 'C1',
    prompt: `Topic Development: E-learning is profoundly transforming modern higher education.
- Temporal and geographic flexibility
- Cost-effectiveness for learners and institutions
- Universal access to premier global academic resources
- [Your own idea]

Discuss the implications of this digital transition and answer follow-up examiner questions.`,
    followUpQuestions: [
      'Can virtual classrooms ever completely replace the traditional physical university experience?',
      'What psychological challenges do students encounter in fully remote learning environments?',
      'How can educational authorities bridge the digital divide for disadvantaged rural students?'
    ],
    sampleAnswer: `The digital transformation of education through e-learning represents one of the most consequential paradigm shifts of the 21st century, fundamentally reshaping pedagogical delivery across higher education.

Foremost among its advantages is unparalleled temporal and geographical flexibility. Asynchronous digital courses liberate learners from the rigid constraints of physical timetables, enabling working professionals and non-traditional students to balance vocational commitments while mastering course modules at their idiosyncratic cognitive pace.

Secondly, digital education drastically reduces systemic expenditures. By eliminating infrastructural overhead, campus utility fees, and daily transportation costs, academic institutions can offer credentialed degree pathways at a fraction of traditional tuition rates, thereby democratizing tertiary education for broader socioeconomic demographics.

Thirdly, virtual platforms provide universal access to world-class academic knowledge. A student residing in a developing nation can now access open-source lectures from Oxford or MIT, bridging historical disparities in educational capital. Furthermore, in my view, e-learning fosters self-regulated metacognitive discipline, cultivating independent research acumen vital for lifelong career adaptability.

Nevertheless, digital education is not without formidable limitations. Fully virtual instruction frequently exacerbates social alienation, diminishing the spontaneous peer camaraderie and collaborative interpersonal skills cultivated on traditional campuses. Moreover, hands-on empirical disciplines—such as surgical medicine, biochemical laboratory experimentation, and mechanical engineering—defy complete virtualization. Consequently, the future of higher education undoubtedly lies in synergistic blended learning frameworks that synthesize digital accessibility with meaningful in-person engagement.`,
    prepTime: 60,
    speakTime: 300
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING PART 2: 50TH ANNIVERSARY VACATION (UFL / B2) ═══════════════════
  {
    id: 's9',
    title: 'Part 2: Solution Discussion - Kỳ nghỉ kỷ niệm ngày cưới của bố mẹ',
    part: 2,
    level: 'B2',
    prompt: `Situation: You and your family are organizing a 3-day vacation to celebrate your parents' 50th golden wedding anniversary. Three destinations are proposed:
1. A coastal beach resort in Nha Trang
2. A tranquil mountain retreat in Da Lat
3. A luxury sightseeing cruise along Ha Long Bay

Which destination do you choose as the most suitable celebration? Explain your choice and compare it against the other alternatives.`,
    followUpQuestions: [
      'What factors should be prioritized when planning vacations for elderly relatives?',
      'Do you prefer travel packages or self-guided vacations with family?',
      'Why are family milestone celebrations culturally important in Vietnam?'
    ],
    sampleAnswer: `For my parents' 50th golden wedding anniversary, I would unequivocally choose a luxury sightseeing cruise along Ha Long Bay.

A golden wedding anniversary is an extraordinary milestone that demands a truly memorable, serene, and elegant celebration. A luxury cruise in Ha Long Bay offers an all-inclusive, leisurely itinerary where our parents can relax on spacious sun decks, savor gourmet meals, and admire breathtaking UNESCO World Heritage limestone karsts without the exhausting physical exertion of continuous transit. Everything—from luxury suites to live traditional musical performances—is situated directly onboard, ensuring maximum comfort and safety for elderly travelers.

In contrast, the other two options present notable disadvantages. A coastal resort in Nha Trang often involves sweltering tropical heat, crowded tourist beaches, and turbulent waves, which may be fatiguing rather than restorative for older family members. On the other hand, while Da Lat boasts a pleasantly cool climate, its hilly topography requires extensive steep walking, and the damp chill in the evenings can aggravate joint and rheumatic pain common in seniors.

Consequently, a luxury Ha Long Bay cruise strikes the quintessential balance between luxurious celebration, effortless mobility, and picturesque tranquility for our parents' milestone anniversary.`,
    prepTime: 60,
    speakTime: 180
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING PART 3: PRESERVING CULTURAL HERITAGE (HANU / C1) ═══════════════════
  {
    id: 's10',
    title: 'Part 3: Topic Development - Bảo tồn di sản văn hóa trong đô thị hiện đại',
    part: 3,
    level: 'C1',
    prompt: `Topic Development: Preserving historical and cultural heritage sites in rapidly modernizing cities is crucial.
- Fostering civic pride and cultural identity
- Stimulating sustainable tourism revenue
- Architectural and educational value for future generations
- [Your own idea]

Discuss the challenges and strategic solutions for heritage preservation, and answer follow-up examiner questions.`,
    followUpQuestions: [
      'How can urban planners balance modern high-rise development with historical architectural conservation?',
      'Should private enterprises be permitted to commercialize ancient temples or historical monuments?',
      'What role can digital technologies like 3D scanning and virtual reality play in heritage preservation?'
    ],
    sampleAnswer: `In an era characterized by relentless urban expansion and architectural homogenization, preserving historical and cultural heritage sites within modern cities has emerged as an imperative civic priority.

Primarily, historic monuments anchor community identity and nurture civic pride. In our globalized milieu, distinct architectural landmarks—such as ancient citadels, historic temples, and colonial facades—serve as tangible links to our ancestral heritage, reminding citizens of the cultural resilience and artistic ingenuity that shaped their nation.

Secondly, well-preserved cultural heritage generates substantial, sustainable economic dividends through heritage tourism. Discerning international travelers increasingly seek authentic historical experiences rather than generic commercial attractions. Revenue accrued from cultural tourism can subsequently be reinvested into urban infrastructure and conservation research.

Thirdly, heritage architecture serves an irreplaceable educational function for upcoming generations. Physical encounters with historical spaces evoke emotional and intellectual resonances that textbooks cannot reproduce. Furthermore, in my estimation, traditional vernacular architecture embodies invaluable ancestral wisdom regarding bioclimatic ventilation, passive cooling, and local material resilience, offering critical lessons for sustainable contemporary construction.

Nevertheless, preservation initiatives confront severe challenges, particularly aggressive commercial real estate speculation that threatens to demolish historical quarters for commercial high-rises. To counteract this destruction, municipal authorities must enact strict zoning legislation, provide tax incentives for architectural restoration, and leverage cutting-edge 3D laser-scanning technologies to create digital archives of vulnerable monuments for posterity.`,
    prepTime: 60,
    speakTime: 300
  },
  // ═══════════════════ AUTHENTIC VSTEP SPEAKING 11: PART 1 COMMUTE & PUBLIC TRANSPORT ═══════════════════
  {
    id: 's11',
    title: 'Part 1: Social Interaction - Public Transport & Daily Commute',
    part: 1,
    level: 'B1',
    prompt: `Let's talk about public transport and your daily commute. How do you usually travel to work or school? What do you think of the public transport system in your city?`,
    followUpQuestions: [
      `Do you prefer taking the bus, driving a motorbike, or walking? Why?`,
      `How has public transportation improved in your city over recent years?`,
      `What improvements would you like to see in your local transport infrastructure?`
    ],
    sampleAnswer: `I usually travel to my university by electric motorbike because it is economical, environmentally friendly, and remarkably convenient for navigating through narrow city alleys. However, whenever it rains heavily, I prefer taking the public bus.

Regarding the public transport system in Hanoi, I think it has made admirable strides recently, especially with the introduction of new elevated metro lines and modern electric bus routes. These vehicles are clean, air-conditioned, and punctual.

In the future, I would love to see our urban transport network expanded with more feeder routes connecting suburban neighborhoods directly to metro stations, alongside safer dedicated cycling lanes to encourage green active commuting.`,
    prepTime: 30,
    speakTime: 120
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING 12: PART 2 FAREWELL GIFT FOR A COLLEAGUE ═══════════════════
  {
    id: 's12',
    title: 'Part 2: Solution Discussion - Quà tặng chia tay đồng nghiệp chuyển công tác',
    part: 2,
    level: 'B2',
    prompt: `Situation: A highly respected senior colleague who has mentored you for three years is transferring to the company's overseas branch. You and your team are choosing a farewell gift among three options:
1. An engraved luxury wristwatch
2. A customized leather-bound photo album with handwritten messages
3. A shopping gift voucher

Discuss all three options and decide which is the most meaningful choice.`,
    followUpQuestions: [
      `Why are farewell gifts important in corporate team culture?`,
      `How do you maintain long-distance professional connections?`,
      `What attributes make a colleague a great workplace mentor?`
    ],
    sampleAnswer: `In this situation, our team is selecting a farewell gift for a dedicated senior mentor who is relocating to an overseas branch. Between the three proposals, I firmly believe that the customized leather-bound photo album with handwritten messages is the most fitting and meaningful choice.

Let us evaluate the alternatives first. A shopping voucher, while undeniably practical, feels impersonal and transactional. It lacks emotional warmth and does not convey our deep gratitude for three years of patient mentorship. On the other hand, a luxury engraved wristwatch is undoubtedly prestigious; however, luxury watches can be prohibitively expensive, and choosing a style that matches someone's personal aesthetic taste is notoriously difficult.

In contrast, a customized leather-bound photo album offers unmatched sentimental value. It can be compiled with photographs from team building retreats, successful project milestones, and warm handwritten appreciation notes from every team member. When our colleague encounters challenges in their new overseas role, opening this album will serve as an enduring reminder of their cherished friendships and achievements back home.

Therefore, for emotional depth and lasting significance, the personalized photo album is unequivocally the superior option.`,
    prepTime: 60,
    speakTime: 180
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING 13: PART 3 REMOTE & HYBRID WORK MODELS ═══════════════════
  {
    id: 's13',
    title: 'Part 3: Topic Development - Mô hình làm việc từ xa (Remote & Hybrid Work)',
    part: 3,
    level: 'B2',
    prompt: `Remote and hybrid work models are increasingly replacing conventional office routines. Discuss the benefits and potential drawbacks of remote working. You can consider:
- Flexibility & work-life balance
- Commuting time and carbon footprint reduction
- Collaboration challenges and professional isolation

Present your viewpoint clearly and answer follow-up questions.`,
    followUpQuestions: [
      `Do you believe complete remote work is suitable for all professions? Why or why not?`,
      `How can corporate managers effectively evaluate employee productivity without physical surveillance?`,
      `What impact does prolonged remote work have on corporate team cohesion and culture?`
    ],
    sampleAnswer: `The widespread adoption of remote and hybrid work models represents one of the most transformative cultural shifts in modern professional life. In my view, while telecommuting confers immense advantages regarding autonomy and environmental sustainability, it also introduces nuanced challenges that require mindful organizational management.

To begin with the tangible benefits, remote work dramatically enhances personal flexibility. Employees can eliminate agonizing daily traffic commutes, saving hours each week which can be reinvested into family time, fitness, and professional development. Furthermore, eliminating millions of daily vehicle commutes significantly reduces urban traffic congestion and greenhouse gas emissions. For enterprises, remote capabilities broaden talent acquisition, allowing firms to hire exceptional specialists regardless of geographic borders while substantially reducing office leasing overheads.

Conversely, several drawbacks must not be overlooked. The blurring boundary between personal and professional life frequently results in digital burnout, where employees feel compelled to respond to messages at all hours. Additionally, the lack of spontaneous corridor interactions can erode team camaraderie, complicate mentoring for junior employees, and lead to acute feelings of workplace isolation.

In conclusion, I believe a hybrid arrangement—where employees spend two to three days in the physical office for collaborative brainstorming and remaining days working remotely for focused deep work—strikes the optimal balance between productivity, personal well-being, and social connection.`,
    prepTime: 60,
    speakTime: 180
  },

  // ═══════════════════ AUTHENTIC VSTEP SPEAKING 14: PART 2 CAMPUS ECO-CAMPAIGN PROMOTION ═══════════════════
  {
    id: 's14',
    title: 'Part 2: Solution Discussion - Chiến dịch giảm rác thải nhựa trường đại học',
    part: 2,
    level: 'B2',
    prompt: `Situation: Your student union is launching a month-long campaign to eliminate single-use plastics on campus. You are evaluating three promotion strategies:
1. Organizing a viral social media short-video challenge
2. Distributing printed informational flyers and banners around cafeterias
3. Hosting a live workshop with interactive zero-waste game booths

Discuss all three alternatives and decide which strategy will maximize student engagement.`,
    followUpQuestions: [
      `Why is student involvement critical for environmental sustainability?`,
      `How can university cafeterias eliminate plastic containers effectively?`,
      `What incentives encourage young people to adopt eco-friendly habits?`
    ],
    sampleAnswer: `When launching a campus-wide environmental initiative to eliminate single-use plastics, selecting an engaging promotional medium is pivotal to capturing student attention. Among the three options presented, I strongly recommend organizing a viral social media short-video challenge.

First, let us examine printed flyers and banners. Distributing paper flyers in an anti-plastic campaign is deeply contradictory and environmentally counterproductive, as paper handouts inevitably become discarded litter within hours. Second, while a live workshop with interactive booths is educational, its reach is inherently limited only to students who happen to walk past during specific hours, often attracting only students who are already environmentally conscious.

In stark contrast, a viral short-video competition on platforms like TikTok and Instagram resonates effortlessly with the daily media consumption habits of university students. It encourages participants to unleash their creative energy—crafting engaging, humorous, or informative clips showcasing reusable coffee cups, eco-friendly food containers, and sustainable shopping bags. Furthermore, social media algorithms amplify student-generated content across peer networks, creating genuine viral excitement and peer-to-peer influence across the entire student population.

For these reasons, the viral video challenge offers the widest reach, highest engagement, and greatest cost-effectiveness for our green campaign.`,
    prepTime: 60,
    speakTime: 180
  }
];
