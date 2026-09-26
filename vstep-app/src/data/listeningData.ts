import { ListeningTest } from './vstepData';

export const listeningTests: ListeningTest[] = [
  // ═══════════════════ PART 1: Short announcements / instructions (8 questions) ═══════════════════
  {
    id: 'l1',
    title: 'Part 1: Thông báo & Hướng dẫn ngắn',
    part: 1,
    level: 'B1',
    description: 'Nghe 8 đoạn thông báo/hướng dẫn ngắn, mỗi đoạn 1 câu hỏi. Chọn đáp án A, B, C hoặc D.',
    audioDescription: '8 đoạn thông báo ngắn tại trường học, sân bay, bệnh viện, siêu thị...',
    transcript: `Announcement 1:
Attention all students. Due to the heavy snowfall last night, all classes have been cancelled for today. The campus will reopen tomorrow at 8 AM, weather permitting. Please check your email for updates from your professors regarding any assignment deadline changes.

Announcement 2:
Good evening, shoppers. The store will be closing in 15 minutes. Please bring your final selections to the checkout counter. We remind you that we offer a 20 percent discount on all winter clothing items this week. Thank you for shopping with us today.

Announcement 3:
Attention passengers on Flight VN256 to Ho Chi Minh City. Your flight has been delayed by approximately 45 minutes due to air traffic congestion. The new departure time is 3:45 PM. We apologize for the inconvenience and ask that you remain in the terminal area.

Announcement 4:
Welcome to the City Museum. Today's guided tour will begin in 10 minutes at the main entrance. The tour lasts approximately 90 minutes and covers the ancient history exhibition on the second floor. Photography is permitted but please do not use flash.

Announcement 5:
This is a message for all hospital visitors. Visiting hours end at 8 PM. Please note that only two visitors are allowed per patient at any one time. We kindly ask you to keep noise levels down in the corridors and to use hand sanitizer when entering and leaving the wards.

Announcement 6:
Good morning, commuters. Due to engineering works on the central line, there will be no service between Central Station and Park Street this weekend. Replacement bus services will operate every 10 minutes. We apologize for any inconvenience caused.

Announcement 7:
Attention all staff. There will be a mandatory fire drill at 2 PM today. When you hear the alarm, please leave the building immediately using the nearest emergency exit. Do not use the elevators. Assemble in the car park and wait for further instructions from the fire wardens.

Announcement 8:
Hello, and welcome to English Language Radio. Before we begin today's program, a quick reminder that our annual speaking competition is now open for registration. The deadline to sign up is March 15th. Entry forms are available on our website. The competition will take place on April 5th at the City Convention Center.`,
    questions: [
      {
        id: 'l1q1',
        question: 'Why have classes been cancelled today?',
        options: ['Due to a power outage', 'Due to heavy snowfall', 'Due to a teachers\' meeting', 'Due to building maintenance'],
        correctAnswer: 1,
        explanation: 'The announcement says "Due to the heavy snowfall last night, all classes have been cancelled."'
      },
      {
        id: 'l1q2',
        question: 'What discount is the store offering?',
        options: ['10% on all items', '15% on summer clothing', '20% on winter clothing', '25% on all clothing'],
        correctAnswer: 2,
        explanation: 'The announcement mentions "a 20 percent discount on all winter clothing items this week."'
      },
      {
        id: 'l1q3',
        question: 'How long is Flight VN256 delayed?',
        options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'],
        correctAnswer: 1,
        explanation: 'The announcement states the flight is delayed "by approximately 45 minutes."'
      },
      {
        id: 'l1q4',
        question: 'How long does the museum tour last?',
        options: ['60 minutes', '75 minutes', '90 minutes', '120 minutes'],
        correctAnswer: 2,
        explanation: 'The announcement says "The tour lasts approximately 90 minutes."'
      },
      {
        id: 'l1q5',
        question: 'How many visitors are allowed per patient at one time?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctAnswer: 1,
        explanation: '"Only two visitors are allowed per patient at any one time."'
      },
      {
        id: 'l1q6',
        question: 'What will replace train services this weekend?',
        options: ['Taxi services', 'Replacement bus services', 'Walking routes', 'Bicycle rentals'],
        correctAnswer: 1,
        explanation: '"Replacement bus services will operate every 10 minutes."'
      },
      {
        id: 'l1q7',
        question: 'What time is the fire drill?',
        options: ['1 PM', '2 PM', '3 PM', '4 PM'],
        correctAnswer: 1,
        explanation: '"There will be a mandatory fire drill at 2 PM today."'
      },
      {
        id: 'l1q8',
        question: 'When is the deadline to register for the speaking competition?',
        options: ['March 5th', 'March 15th', 'April 5th', 'April 15th'],
        correctAnswer: 1,
        explanation: '"The deadline to sign up is March 15th."'
      }
    ]
  },

  // ═══════════════════ PART 2: Longer conversations (12 questions = 3 conversations x 4) ═══════════════════
  {
    id: 'l2',
    title: 'Part 2: Hội thoại dài - Conversation 1',
    part: 2,
    level: 'B2',
    description: 'Nghe đoạn hội thoại dài giữa 2 người. Trả lời 4 câu hỏi.',
    audioDescription: 'Hội thoại giữa sinh viên và giáo viên hướng dẫn về luận văn',
    transcript: `Student: Professor Williams, do you have a moment? I'd like to discuss my dissertation topic with you.
Professor: Of course, Sarah. Come in. So, have you decided on a topic yet?
Student: Well, I've been thinking about researching the impact of social media on teenagers' mental health. There's been a lot in the news about it lately.
Professor: That's certainly a relevant topic. But I have to warn you, it's also very popular. At least three other students in your department are working on similar themes. You'd need to find a unique angle.
Student: I was thinking of focusing specifically on the relationship between Instagram use and body image issues among girls aged 13 to 16.
Professor: Now that's more specific. What methodology are you considering?
Student: I'm planning to use a mixed-methods approach. I'd like to conduct surveys with about 200 participants, and then follow up with in-depth interviews with about 20 of them.
Professor: That sounds ambitious but achievable. How much time do you have?
Student: I have 8 months until submission. I was hoping to complete the data collection in the first 4 months, then spend the remaining time on analysis and writing.
Professor: That's a realistic timeline. I'd suggest you also review the existing literature on media influence and adolescent psychology. The work by Dr. Chen at Oxford is particularly relevant. She published a major study last year.
Student: Thank you so much. I'll look that up right away. Can I schedule another meeting for next week to show you my literature review plan?
Professor: Absolutely. How about Tuesday at 2?
Student: Perfect. Thank you, Professor.`,
    questions: [
      {
        id: 'l2q1',
        question: 'What is Sarah\'s proposed dissertation topic?',
        options: [
          'The effect of television on children',
          'Social media\'s impact on teenagers\' mental health',
          'How parents monitor social media use',
          'The history of social media platforms'
        ],
        correctAnswer: 1,
        explanation: 'Sarah says she wants to research "the impact of social media on teenagers\' mental health."'
      },
      {
        id: 'l2q2',
        question: 'What concern does Professor Williams raise about the topic?',
        options: [
          'It is too difficult to research',
          'It is not relevant anymore',
          'Many other students are working on similar themes',
          'There is not enough existing literature'
        ],
        correctAnswer: 2,
        explanation: 'The professor says "At least three other students in your department are working on similar themes."'
      },
      {
        id: 'l2q3',
        question: 'How many participants does Sarah plan to survey?',
        options: ['20', '100', '200', '300'],
        correctAnswer: 2,
        explanation: 'Sarah says she plans to "conduct surveys with about 200 participants."'
      },
      {
        id: 'l2q4',
        question: 'What does the professor recommend Sarah review?',
        options: [
          'Recent news articles about social media',
          'The work by Dr. Chen at Oxford',
          'Government statistics on teen health',
          'Other students\' dissertations'
        ],
        correctAnswer: 1,
        explanation: 'The professor suggests reviewing "the work by Dr. Chen at Oxford" who "published a major study last year."'
      }
    ]
  },
  {
    id: 'l3',
    title: 'Part 2: Hội thoại dài - Conversation 2',
    part: 2,
    level: 'B2',
    description: 'Nghe đoạn hội thoại dài giữa 2 người. Trả lời 4 câu hỏi.',
    audioDescription: 'Hội thoại giữa hai đồng nghiệp về dự án công ty',
    transcript: `Tom: Hey Lisa, have you seen the email about the new client project? It sounds like a big one.
Lisa: Yes, I just read it. They want us to redesign their entire website and develop a mobile app. The deadline is quite tight though - only 3 months.
Tom: Three months for both a website and an app? That's going to be challenging. Do we know the budget?
Lisa: The project manager mentioned around 50,000 dollars. It's decent but we'll need to be smart about resource allocation. I think we should use a template-based approach for the website to save time.
Tom: Good idea. What about the app? Native or cross-platform?
Lisa: The client wants it available on both iOS and Android, so I'd recommend React Native. We can build for both platforms simultaneously, which will save us at least a month compared to native development.
Tom: Makes sense. Who's going to lead the project?
Lisa: Actually, the project manager asked if one of us would be interested in taking the lead role. It comes with a 15 percent bonus.
Tom: Wow, that's tempting. But honestly, I've got too much on my plate right now with the Henderson account. Would you want to take it?
Lisa: I was hoping you'd say that! Yes, I'd love to lead this one. I've been looking for an opportunity to move into project management.
Tom: You'd be great at it. Count me in for the technical architecture side though. I can handle the backend development.
Lisa: Perfect. Let's set up a kick-off meeting with the team for Thursday morning.`,
    questions: [
      {
        id: 'l3q1',
        question: 'What does the new client project involve?',
        options: [
          'Only a website redesign',
          'Only a mobile app',
          'A website redesign and a mobile app',
          'A marketing campaign'
        ],
        correctAnswer: 2,
        explanation: 'Lisa says "They want us to redesign their entire website and develop a mobile app."'
      },
      {
        id: 'l3q2',
        question: 'What is the project budget?',
        options: ['$30,000', '$40,000', '$50,000', '$60,000'],
        correctAnswer: 2,
        explanation: 'Lisa mentions "around 50,000 dollars."'
      },
      {
        id: 'l3q3',
        question: 'Why does Lisa recommend React Native?',
        options: [
          'It is the cheapest option',
          'It can build for both iOS and Android at once',
          'The client specifically requested it',
          'Tom is an expert in it'
        ],
        correctAnswer: 1,
        explanation: '"We can build for both platforms simultaneously, which will save us at least a month."'
      },
      {
        id: 'l3q4',
        question: 'Why does Tom decline the lead role?',
        options: [
          'He doesn\'t want the bonus',
          'He is not qualified',
          'He is too busy with another account',
          'He is planning to leave the company'
        ],
        correctAnswer: 2,
        explanation: 'Tom says "I\'ve got too much on my plate right now with the Henderson account."'
      }
    ]
  },

  // ═══════════════════ PART 3: Academic lectures/talks (5 questions each) ═══════════════════
  {
    id: 'l4',
    title: 'Part 3: Bài giảng học thuật - Lecture 1',
    part: 3,
    level: 'B2',
    description: 'Nghe bài giảng/thuyết trình học thuật. Trả lời 5 câu hỏi.',
    audioDescription: 'Bài giảng đại học về ảnh hưởng của giấc ngủ đến việc học',
    transcript: `Good morning, everyone. Today I want to talk about something that directly affects every single one of you as students: the relationship between sleep and learning.

Now, most of you probably think that staying up late to study is a good strategy before exams. In fact, research consistently shows the opposite. Let me share some key findings.

First, memory consolidation - the process of converting short-term memories into long-term ones - primarily occurs during deep sleep, specifically during what we call slow-wave sleep, which happens in the first half of the night. If you cut your sleep short, you're literally preventing your brain from storing what you studied.

Second, a landmark study at Harvard Medical School found that students who slept at least 7 hours after learning new material performed 40 percent better on tests the following day compared to those who stayed up all night studying the same material. Let me repeat that: 40 percent better.

Third, sleep deprivation doesn't just affect memory. It impairs your ability to concentrate, solve problems, and think creatively. A study from the University of Pennsylvania showed that after just four nights of sleeping only 6 hours, cognitive performance drops to the same level as someone who has been awake for 24 hours straight.

So what's the recommendation? For optimal learning, you should aim for 7 to 9 hours of sleep per night. The most critical period is the 24 hours after learning something new. If you must choose between studying for an extra two hours and sleeping, choose sleep.

I'd also recommend what researchers call "spaced repetition with sleep." Instead of cramming everything into one night, study a little each day and sleep on it. Your brain will do the heavy lifting of organizing and storing that information during the night.

Are there any questions?`,
    questions: [
      {
        id: 'l4q1',
        question: 'When does memory consolidation primarily occur?',
        options: [
          'During light sleep',
          'During REM sleep',
          'During deep slow-wave sleep',
          'When you first fall asleep'
        ],
        correctAnswer: 2,
        explanation: '"Memory consolidation primarily occurs during deep sleep, specifically during slow-wave sleep."'
      },
      {
        id: 'l4q2',
        question: 'According to the Harvard study, how much better did well-rested students perform?',
        options: ['20 percent', '30 percent', '40 percent', '50 percent'],
        correctAnswer: 2,
        explanation: '"Students who slept at least 7 hours performed 40 percent better on tests."'
      },
      {
        id: 'l4q3',
        question: 'After how many nights of 6-hour sleep does cognitive performance significantly drop?',
        options: ['Two nights', 'Three nights', 'Four nights', 'Five nights'],
        correctAnswer: 2,
        explanation: '"After just four nights of sleeping only 6 hours, cognitive performance drops significantly."'
      },
      {
        id: 'l4q4',
        question: 'How many hours of sleep does the lecturer recommend?',
        options: ['5 to 6 hours', '6 to 7 hours', '7 to 9 hours', '9 to 10 hours'],
        correctAnswer: 2,
        explanation: '"You should aim for 7 to 9 hours of sleep per night."'
      },
      {
        id: 'l4q5',
        question: 'What study technique does the lecturer recommend?',
        options: [
          'Cramming before the exam',
          'Studying all night',
          'Spaced repetition with sleep',
          'Reading notes once before bed'
        ],
        correctAnswer: 2,
        explanation: '"I\'d recommend spaced repetition with sleep - study a little each day and sleep on it."'
      }
    ]
  },
  {
    id: 'l5',
    title: 'Part 3: Bài giảng học thuật - Lecture 2',
    part: 3,
    level: 'B2',
    description: 'Nghe bài giảng/thuyết trình học thuật. Trả lời 5 câu hỏi.',
    audioDescription: 'Bài thuyết trình về ô nhiễm nhựa đại dương',
    transcript: `Thank you for having me today. I'm here to talk about one of the most pressing environmental issues of our time: plastic pollution in our oceans.

Let me start with some shocking numbers. Every year, approximately 8 million tons of plastic waste enters our oceans. That's equivalent to dumping one garbage truck full of plastic into the ocean every single minute. And this number is expected to double by 2030 if we don't take action.

Where does all this plastic come from? Research shows that about 80 percent of ocean plastic originates from land-based sources. The top contributors are countries in Southeast Asia, particularly Indonesia, the Philippines, and Vietnam, largely because these countries lack adequate waste management infrastructure. However, it's important to note that much of this plastic was originally manufactured in and exported by wealthier nations.

The impact on marine life is devastating. Over 700 marine species are known to be affected by plastic pollution. Sea turtles mistake plastic bags for jellyfish, their natural food source. Seabirds feed plastic fragments to their chicks. And perhaps most concerning, microplastics - tiny particles less than 5 millimeters in size - have been found in the stomachs of fish that humans consume.

What about solutions? There are several approaches being explored. First, reducing plastic production and consumption through bans on single-use plastics. Over 60 countries have now implemented such bans with varying degrees of success. Second, improving waste management systems, particularly in developing countries. Third, developing biodegradable alternatives to conventional plastics. And fourth, cleaning up existing ocean plastic through technologies like The Ocean Cleanup project, which uses floating barriers to collect plastic from ocean currents.

But ultimately, the most effective solution is prevention. Once plastic enters the ocean, removing it is extremely difficult and expensive. We need to stop the problem at its source.`,
    questions: [
      {
        id: 'l5q1',
        question: 'How much plastic waste enters the ocean each year?',
        options: ['4 million tons', '6 million tons', '8 million tons', '12 million tons'],
        correctAnswer: 2,
        explanation: '"Every year, approximately 8 million tons of plastic waste enters our oceans."'
      },
      {
        id: 'l5q2',
        question: 'What percentage of ocean plastic comes from land-based sources?',
        options: ['60 percent', '70 percent', '80 percent', '90 percent'],
        correctAnswer: 2,
        explanation: '"About 80 percent of ocean plastic originates from land-based sources."'
      },
      {
        id: 'l5q3',
        question: 'How many marine species are affected by plastic pollution?',
        options: ['Over 300', 'Over 500', 'Over 700', 'Over 1000'],
        correctAnswer: 2,
        explanation: '"Over 700 marine species are known to be affected by plastic pollution."'
      },
      {
        id: 'l5q4',
        question: 'How many countries have banned single-use plastics?',
        options: ['Over 30', 'Over 40', 'Over 60', 'Over 80'],
        correctAnswer: 2,
        explanation: '"Over 60 countries have now implemented such bans."'
      },
      {
        id: 'l5q5',
        question: 'What does the speaker say is the most effective solution?',
        options: [
          'Ocean cleanup technology',
          'Biodegradable plastics',
          'Prevention - stopping plastic at the source',
          'Recycling programs'
        ],
        correctAnswer: 2,
        explanation: '"The most effective solution is prevention. We need to stop the problem at its source."'
      }
    ]
  },

  // ═══════════════════ Part 2: Conversation 3 ═══════════════════
  {
    id: 'l6',
    title: 'Part 2: Hội thoại dài - Conversation 3',
    part: 2,
    level: 'B2',
    description: 'Nghe đoạn hội thoại dài giữa 2 người. Trả lời 4 câu hỏi.',
    audioDescription: 'Hội thoại giữa bác sĩ và bệnh nhân về kết quả xét nghiệm',
    transcript: `Doctor: Good afternoon, Mr. Thompson. Please have a seat. I've got your test results back.
Patient: Thank you, Doctor. I've been quite worried actually. I haven't been feeling well for the past few weeks.
Doctor: I understand your concern. Let me go through the results with you. Your blood pressure is slightly elevated - 145 over 92. That's above the normal range of 120 over 80.
Patient: Is that serious?
Doctor: It's not critical yet, but it does need attention. If left untreated, high blood pressure can lead to heart disease or stroke over time. The good news is that in many cases, it can be managed through lifestyle changes before we need to consider medication.
Patient: What kind of changes do you suggest?
Doctor: First, I'd recommend reducing your salt intake. You mentioned you eat a lot of processed food - that's a major source of hidden salt. Second, regular exercise - at least 30 minutes of moderate activity, five days a week. Even brisk walking makes a significant difference.
Patient: I used to walk every morning, but I stopped about six months ago when I changed jobs.
Doctor: That timing actually matches when your blood pressure likely started rising. I'd strongly encourage you to restart that habit. Third, I notice you're about 12 kilograms over your ideal weight. Losing even 5 kilograms could bring your blood pressure down noticeably.
Patient: Should I come back for another check?
Doctor: Yes, I'd like to see you again in 8 weeks. If we don't see improvement by then, we may need to discuss medication options. In the meantime, I'll refer you to our nutritionist who can help with a meal plan.
Patient: Thank you, Doctor. I'll do my best to make those changes.`,
    questions: [
      {
        id: 'l6q1',
        question: "What is Mr. Thompson's blood pressure reading?",
        options: ['120 over 80', '135 over 88', '145 over 92', '150 over 95'],
        correctAnswer: 2,
        explanation: 'The doctor says "Your blood pressure is slightly elevated - 145 over 92."'
      },
      {
        id: 'l6q2',
        question: 'How much exercise does the doctor recommend per week?',
        options: ['20 minutes, 3 days', '30 minutes, 5 days', '45 minutes, 3 days', '60 minutes, 7 days'],
        correctAnswer: 1,
        explanation: '"At least 30 minutes of moderate activity, five days a week."'
      },
      {
        id: 'l6q3',
        question: 'How much weight does the doctor say Mr. Thompson needs to lose to see results?',
        options: ['3 kilograms', '5 kilograms', '10 kilograms', '12 kilograms'],
        correctAnswer: 1,
        explanation: '"Losing even 5 kilograms could bring your blood pressure down noticeably."'
      },
      {
        id: 'l6q4',
        question: 'When should Mr. Thompson return for a follow-up?',
        options: ['In 2 weeks', 'In 4 weeks', 'In 8 weeks', 'In 12 weeks'],
        correctAnswer: 2,
        explanation: '"I\'d like to see you again in 8 weeks."'
      }
    ]
  },

  // ═══════════════════ Part 3: Lecture 3 ═══════════════════
  {
    id: 'l7',
    title: 'Part 3: Bài giảng học thuật - Lecture 3',
    part: 3,
    level: 'C1',
    description: 'Nghe bài giảng/thuyết trình học thuật. Trả lời 5 câu hỏi.',
    audioDescription: 'Bài giảng về tác động của trí tuệ nhân tạo đến thị trường lao động',
    transcript: `Good afternoon, everyone. Today's lecture focuses on a topic that has generated enormous debate in recent years: the impact of artificial intelligence on the labor market.

Let me begin with some projections. According to a report by McKinsey Global Institute, by 2030, up to 375 million workers worldwide - roughly 14 percent of the global workforce - may need to switch occupational categories as automation and AI transform the nature of work. That's a staggering number.

Now, there's a common misconception that AI will simply eliminate jobs. The reality is more nuanced. Historically, every major technological revolution has displaced certain types of work while creating new ones. The industrial revolution eliminated many agricultural jobs but created manufacturing jobs. The digital revolution eliminated many manufacturing jobs but created service and technology jobs.

What makes AI different, however, is the speed and breadth of disruption. Previous technological shifts played out over generations. AI-driven changes are happening within years, not decades. And unlike previous automation which primarily affected manual, routine tasks, AI can now perform cognitive tasks - writing, analysis, even creative work.

So which jobs are most at risk? Research from Oxford University suggests that jobs involving routine data processing, basic customer service, and standard administrative tasks face the highest risk of automation - approximately 47 percent of current jobs in the United States fall into this high-risk category.

However, jobs requiring complex social interaction, creative problem-solving, and physical dexterity in unpredictable environments remain difficult for AI to replicate. Healthcare workers, educators, social workers, artists, and skilled tradespeople are relatively protected.

What should governments and educational institutions do? Three things. First, invest heavily in reskilling programs for displaced workers. Second, reform education systems to emphasize creativity, critical thinking, and emotional intelligence - skills that complement rather than compete with AI. Third, consider policy interventions such as universal basic income or robot taxation to address potential inequality.

The key message here is that AI doesn't have to mean mass unemployment, but it will require unprecedented levels of adaptation from individuals, organizations, and societies. Those who prepare now will thrive; those who ignore the change will struggle.`,
    questions: [
      {
        id: 'l7q1',
        question: 'According to McKinsey, how many workers may need to change occupations by 2030?',
        options: ['Up to 175 million', 'Up to 275 million', 'Up to 375 million', 'Up to 475 million'],
        correctAnswer: 2,
        explanation: '"Up to 375 million workers worldwide may need to switch occupational categories."'
      },
      {
        id: 'l7q2',
        question: 'What percentage of the global workforce does this represent?',
        options: ['8 percent', '14 percent', '20 percent', '25 percent'],
        correctAnswer: 1,
        explanation: '"Roughly 14 percent of the global workforce."'
      },
      {
        id: 'l7q3',
        question: 'What makes AI different from previous technological revolutions?',
        options: [
          'It only affects manual labor',
          'It creates more jobs than it destroys',
          'The speed of change and ability to perform cognitive tasks',
          'It is limited to manufacturing industries'
        ],
        correctAnswer: 2,
        explanation: '"AI-driven changes are happening within years, not decades" and "AI can now perform cognitive tasks."'
      },
      {
        id: 'l7q4',
        question: 'What percentage of US jobs are at high risk of automation according to Oxford University?',
        options: ['27 percent', '37 percent', '47 percent', '57 percent'],
        correctAnswer: 2,
        explanation: '"Approximately 47 percent of current jobs in the United States fall into this high-risk category."'
      },
      {
        id: 'l7q5',
        question: 'Which is NOT mentioned as a recommended government response?',
        options: [
          'Investing in reskilling programs',
          'Banning AI in certain industries',
          'Reforming education systems',
          'Considering universal basic income'
        ],
        correctAnswer: 1,
        explanation: 'The speaker mentions reskilling, education reform, and policy interventions like UBI, but does NOT mention banning AI.'
      }
    ]
  },

  // ═══════════════════ Part 1: Test 2 - More announcements ═══════════════════
  {
    id: 'l8',
    title: 'Part 1: Thông báo & Hướng dẫn (Bộ 2)',
    part: 1,
    level: 'B2',
    description: 'Nghe 8 đoạn thông báo/hướng dẫn ngắn, mỗi đoạn 1 câu hỏi.',
    audioDescription: '8 đoạn thông báo tại công ty, trung tâm thể thao, sự kiện...',
    transcript: `Announcement 1:
Good morning, everyone. This is a reminder that the company's annual health checkup is scheduled for next Wednesday. All employees must register online by Friday this week. The checkup will take place at the medical center on the third floor between 9 AM and 4 PM. Please bring your employee ID card.

Announcement 2:
Attention gym members. Starting next month, we will be extending our opening hours. The gym will now open at 5:30 AM instead of 6:30 AM, and close at 11 PM instead of 10 PM. Monthly membership fees will remain unchanged. We hope the extended hours better accommodate your busy schedules.

Announcement 3:
Ladies and gentlemen, welcome to tonight's charity concert. Before the performance begins, please note that the concert will last approximately two and a half hours, with a 20-minute intermission. Food and beverages are available in the lobby. Please silence your mobile phones and refrain from taking photographs during the performance.

Announcement 4:
Good afternoon, residents. The annual community clean-up day will take place this Saturday from 8 AM to 12 noon. Volunteers will meet at the community center. Gloves and trash bags will be provided. Last year, 85 volunteers participated and collected over 200 bags of litter. Let's try to beat that record this year.

Announcement 5:
Attention all drivers. Due to the marathon taking place this Sunday, several roads in the city center will be closed from 6 AM to 2 PM. Alternative routes will be clearly signposted. We strongly advise using public transport if you need to travel through the affected areas.

Announcement 6:
Welcome to the National Library. Our new exhibition, "The History of Vietnamese Literature," opens today on the fourth floor. The exhibition is free to all visitors and will run until December 31st. Guided tours are available at 10 AM and 2 PM daily. No booking is required.

Announcement 7:
This is a message for all tenants in Building C. The water supply will be temporarily shut off tomorrow between 10 AM and 3 PM for essential maintenance work. Please store enough water for your needs during this period. We apologize for the inconvenience.

Announcement 8:
Good evening, and welcome aboard flight BA789 to Singapore. Our estimated flying time is 3 hours and 45 minutes. We will be cruising at an altitude of 35,000 feet. The weather in Singapore is currently 31 degrees Celsius with some cloud cover. Please keep your seatbelt fastened whenever seated.`,
    questions: [
      {
        id: 'l8q1',
        question: 'When must employees register for the health checkup?',
        options: ['By Wednesday', 'By Thursday', 'By Friday', 'By next Monday'],
        correctAnswer: 2,
        explanation: '"All employees must register online by Friday this week."'
      },
      {
        id: 'l8q2',
        question: 'What time will the gym open starting next month?',
        options: ['5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM'],
        correctAnswer: 1,
        explanation: '"The gym will now open at 5:30 AM instead of 6:30 AM."'
      },
      {
        id: 'l8q3',
        question: 'How long is the intermission during the concert?',
        options: ['10 minutes', '15 minutes', '20 minutes', '30 minutes'],
        correctAnswer: 2,
        explanation: '"A 20-minute intermission."'
      },
      {
        id: 'l8q4',
        question: 'How many volunteers participated in last year\'s community clean-up?',
        options: ['65', '75', '85', '95'],
        correctAnswer: 2,
        explanation: '"Last year, 85 volunteers participated."'
      },
      {
        id: 'l8q5',
        question: 'Until what time will roads be closed on Sunday for the marathon?',
        options: ['12 PM', '1 PM', '2 PM', '4 PM'],
        correctAnswer: 2,
        explanation: '"Roads in the city center will be closed from 6 AM to 2 PM."'
      },
      {
        id: 'l8q6',
        question: 'On which floor is the library exhibition?',
        options: ['Second floor', 'Third floor', 'Fourth floor', 'Fifth floor'],
        correctAnswer: 2,
        explanation: '"Opens today on the fourth floor."'
      },
      {
        id: 'l8q7',
        question: 'How long will the water be shut off in Building C?',
        options: ['3 hours', '4 hours', '5 hours', '6 hours'],
        correctAnswer: 2,
        explanation: '"Between 10 AM and 3 PM" = 5 hours.'
      },
      {
        id: 'l8q8',
        question: 'What is the flying time to Singapore?',
        options: ['2 hours 45 minutes', '3 hours 15 minutes', '3 hours 45 minutes', '4 hours 15 minutes'],
        correctAnswer: 2,
        explanation: '"Our estimated flying time is 3 hours and 45 minutes."'
      }
    ]
  }
,
// ═══════════════════ AUTHENTIC VSTEP LISTENING SET 3: PART 1 (ANNOUNCEMENTS - 8 QUESTIONS) ═══════════════════
  {
    id: 'l9',
    title: 'Part 1: Thông báo & Chỉ dẫn Hàng ngày (Khảo thí Chuẩn Quốc Gia)',
    part: 1,
    level: 'B1',
    description: 'Nghe 8 đoạn thông báo/chỉ dẫn ngắn, mỗi đoạn 1 câu hỏi. Chọn đáp án A, B, C hoặc D.',
    audioDescription: '8 đoạn thông báo âm thanh thực tế: Cửa sổ sân bay, thư viện, thời tiết, giao thông...',
    transcript: `Announcement 1:
Good afternoon passengers on Vietnam Airlines Flight VN612 to Da Nang. We wish to inform you that the boarding gate has been changed from Gate 4 to Gate 14 due to an aircraft turnaround. Boarding will commence at 2:15 PM. Please have your boarding passes and personal identification ready for inspection at Gate 14.

Announcement 2:
Attention shoppers at Metro Supermarket. Today we are having a special flash clearance in our dairy and bakery aisles. All organic milk cartons, imported cheeses, and freshly baked artisanal bread are now available at a 20 percent discount. This promotional offer is valid until 9:00 PM tonight or while supplies last.

Announcement 3:
Welcome to the Central University Library. As final examination week approaches, the library will be extending its operating hours. Starting this Monday, the study halls and computer stations on the second and third floors will remain open until 11:00 PM daily. Please remember to maintain absolute silence and dispose of all beverages in sealed containers.

Announcement 4:
This is an urgent weather advisory from the National Meteorological Center. Tropical Depression Nine has intensified over the East Sea and is projected to make landfall along the central coast tomorrow morning. Gusts of wind up to 75 kilometers per hour and torrential rainfall are anticipated. All maritime ferry operations between the mainland and offshore islands have been suspended until further notice.

Announcement 5:
Good morning bus commuters. Due to ongoing emergency water pipeline maintenance on Nguyen Trai Avenue, Bus Route 26 heading toward the National University terminal will be temporarily detoured via Le Van Luong Street. Three stops along Nguyen Trai Avenue will not be served today. Normal routing is scheduled to resume by tomorrow morning.

Announcement 6:
Attention visitors to the Municipal Museum of Fine Arts. Today's special curator tour of the French Impressionist collection will begin promptly at 10:00 AM in Gallery Room 302 on the third floor. Audio guides in English, French, and Japanese are available at the front desk for a refundable deposit of 100,000 VND.

Announcement 7:
Notice to all building tenants of the Diamond Plaza office tower. Engineering staff will be conducting scheduled load tests on the backup diesel generators today between 2:00 PM and 2:30 PM. The passenger elevators will be briefly taken out of service during the switchover. We encourage everyone to utilize the stairwells during this 30-minute maintenance window.

Announcement 8:
Welcome to the Westlake Community Recreation Center. Registration for our spring swimming instruction and adult yoga workshops closes this Friday at 5:00 PM. Classes will be held on Tuesday and Thursday evenings starting next month. Space is strictly limited to 15 participants per session to ensure personalized instructor feedback.`,
    questions: [
      { id: 'l9q1', question: 'Where should passengers for Flight VN612 to Da Nang now board?', options: ['Gate 4', 'Gate 14', 'Gate 24', 'Gate 40'], correctAnswer: 1, explanation: 'The announcement clearly states: "the boarding gate has been changed from Gate 4 to Gate 14."' },
      { id: 'l9q2', question: 'What items are offered at a 20 percent discount at the supermarket?', options: ['Electronic appliances and home goods', 'Dairy and freshly baked bakery items', 'Fresh seafood and meats', 'Canned beverages only'], correctAnswer: 1, explanation: '"All organic milk cartons, imported cheeses, and freshly baked artisanal bread are now available at a 20 percent discount."' },
      { id: 'l9q3', question: 'Until what time will the university library remain open during exam week?', options: ['8:00 PM', '9:30 PM', '10:00 PM', '11:00 PM'], correctAnswer: 3, explanation: '"Starting this Monday, the study halls... will remain open until 11:00 PM daily."' },
      { id: 'l9q4', question: 'Why have maritime ferry operations been suspended?', options: ["Due to a workers' strike", 'Due to high fuel costs', 'Due to an approaching tropical depression with strong winds and heavy rain', 'Due to mechanical repairs on the boats'], correctAnswer: 2, explanation: 'A tropical depression is projected to make landfall with gusts up to 75 km/h, leading to ferry suspension.' },
      { id: 'l9q5', question: 'Why is Bus Route 26 being detoured today?', options: ['Due to a sports marathon', 'Due to emergency water pipeline maintenance', 'Because the driver took a wrong turn', 'Due to a national holiday parade'], correctAnswer: 1, explanation: '"Due to ongoing emergency water pipeline maintenance on Nguyen Trai Avenue."' },
      { id: 'l9q6', question: 'Where will the art museum curator tour take place?', options: ['Gallery Room 101 on the first floor', 'Gallery Room 204 on the second floor', 'Gallery Room 302 on the third floor', 'The outdoor sculpture garden'], correctAnswer: 2, explanation: 'The tour will begin "in Gallery Room 302 on the third floor."' },
      { id: 'l9q7', question: 'How long will the elevator maintenance test last in the office building?', options: ['15 minutes', '30 minutes', '1 hour', 'The entire afternoon'], correctAnswer: 1, explanation: 'The test is scheduled "between 2:00 PM and 2:30 PM" (30 minutes).' },
      { id: 'l9q8', question: 'When is the deadline to register for spring swimming and yoga workshops?', options: ['Today at noon', 'Wednesday at 3:00 PM', 'This Friday at 5:00 PM', 'Next Monday morning'], correctAnswer: 2, explanation: 'Registration "closes this Friday at 5:00 PM."' }
    ]
  },

  // ═══════════════════ AUTHENTIC VSTEP LISTENING SET 3: PART 2 (CONVERSATIONS - 12 QUESTIONS) ═══════════════════
  {
    id: 'l10',
    title: 'Part 2: Hội thoại Dài Chuyên Sâu (3 Đoạn x 4 Câu)',
    part: 2,
    level: 'B2',
    description: 'Nghe 3 cuộc hội thoại dài. Mỗi cuộc hội thoại có 4 câu hỏi trắc nghiệm.',
    audioDescription: '3 cuộc hội thoại: Tư vấn học vụ đại học, Thuê căn hộ & sửa chữa, Dự án môi trường sinh viên.',
    transcript: `Conversation 1 (Questions 1 to 4):
Male Student: Good morning, Professor Evans. Thanks for meeting with me during your office hours.
Female Advisor: Good morning, David. What can I do for you today?
Male Student: Well, I'm reviewing my academic plan for next semester. I need to complete my graduation requirements in Business Administration, and I was wondering whether I should register for the corporate internship credit or take the advanced marketing analytics course.
Female Advisor: That depends largely on your immediate career ambitions. The corporate internship provides invaluable hands-on industry exposure and networking with corporate executives, whereas marketing analytics is quite rigorous in quantitative modeling and statistical programming, which is crucial if you are applying for analytical consulting roles.
Male Student: I really want to gain practical office experience since I have not worked in an enterprise yet. How many hours per week does the internship require?
Female Advisor: To receive three academic credits, you must log at least 150 verified working hours throughout the 15-week term, which works out to roughly 10 hours per week. You will also need to submit a comprehensive reflective report and an evaluation from your company supervisor by the end of week 14.
Male Student: That sounds very manageable alongside my other three courses. Where can I find the list of pre-approved sponsor companies?
Female Advisor: You can access the complete employer database directly on our departmental career portal. Just make sure to submit your employer confirmation agreement to the registrar\'s office by December 15th.

Conversation 2 (Questions 5 to 8):
Female Tenant: Hello, Mr. Thompson. This is Sarah Miller from apartment 4B. Do you have a quick moment?
Male Landlord: Hi, Sarah. Yes, of course. How are things at the apartment?
Female Tenant: Overall everything is fine, but my current twelve-month lease expires at the end of next month, on November 30th. I'd really like to renew it for another year, but there are two maintenance concerns I was hoping could be resolved first.
Male Landlord: Certainly, Sarah. You've been a wonderful tenant. What seems to be the problem?
Female Tenant: First, the hot water heater in the secondary bathroom has been leaking steadily underneath the sink, and it makes a loud hissing noise whenever the shower is running. Second, the seal along the master bedroom window seems loose, letting in cold drafts and street noise.
Male Landlord: I appreciate you letting me know immediately. I will send our certified plumber, Jack, to inspect the water heater on Thursday morning at 9:30 AM. For the window seal, our carpenter can come by on Friday afternoon. If you\'re willing to sign a two-year extension rather than a one-year lease, I can keep the monthly rental rate at $1,200 without the scheduled 5 percent annual increase.
Female Tenant: That is an excellent offer! A two-year lease works perfectly for me since my work contract here runs for three more years.

Conversation 3 (Questions 9 to 12):
Male Student: Hey, Jessica! Did you finish drafting the outline for our student sustainability project presentation?
Female Student: Almost done, Mark! I divided our presentation into three sections: plastic waste audit in the campus cafeteria, student awareness survey results, and our proposal for compostable packaging.
Male Student: That sounds comprehensive! What did the survey results show? Were people actually willing to sort their garbage?
Female Student: Interestingly, over 82 percent of the 400 respondents said they want to recycle, but they pointed out that our university currently lacks clearly labeled dual-stream recycling bins near dormitory entrances and lecture halls. Most people end up tossing compostable food containers and aluminum cans into the general trash because the recycling bins are overflowing or too far away.
Male Student: That provides solid empirical evidence for our recommendation! How much would it cost to install color-coded sorting stations across the campus?
Female Student: According to the facilities management quote, 20 complete sets of color-coded outdoor bins will cost roughly $3,200. We could propose that the Student Union fund half from their annual environmental budget, and we could seek green grant matching funds from the university sustainability office.
Male Student: Brilliant idea! Let's rehearse our 10-minute slide presentation tomorrow afternoon at the library study room.`,
    questions: [
      { id: 'l10q1', question: 'Why does David visit Professor Evans?', options: ['To drop out of university', 'To discuss course selection and graduation requirements', 'To complain about an exam grade', 'To apply for a teaching assistant post'], correctAnswer: 1, explanation: 'David visits to review his academic plan: "whether I should register for the corporate internship credit or take the advanced marketing analytics course."' },
      { id: 'l10q2', question: 'How many total verified working hours are required for the 3-credit internship?', options: ['50 hours', '100 hours', 'At least 150 hours', '300 hours'], correctAnswer: 2, explanation: '"You must log at least 150 verified working hours throughout the 15-week term."' },
      { id: 'l10q3', question: 'What document must David submit by the end of week 14?', options: ['A tax declaration', 'A comprehensive reflective report and supervisor evaluation', 'A video presentation', 'A letter of resignation'], correctAnswer: 1, explanation: '"submit a comprehensive reflective report and an evaluation from your company supervisor by the end of week 14."' },
      { id: 'l10q4', question: 'When is the deadline to submit the employer agreement to the registrar?', options: ['November 1st', 'December 15th', 'January 1st', 'February 28th'], correctAnswer: 1, explanation: '"submit your employer confirmation agreement to the registrar\'s office by December 15th."' },
      { id: 'l10q5', question: 'When does Sarah\'s current apartment lease expire?', options: ['October 15th', 'November 30th', 'December 31st', 'January 15th'], correctAnswer: 1, explanation: 'She states: "my current twelve-month lease expires at the end of next month, on November 30th."' },
      { id: 'l10q6', question: 'What two maintenance issues does Sarah report to the landlord?', options: ['Broken refrigerator and dim lights', 'Leaking water heater and loose window seal letting in cold drafts', 'Faulty air conditioner and clogged toilet', 'Damaged front door and insect infestation'], correctAnswer: 1, explanation: 'She reports a leaking hot water heater with hissing noise and a loose window seal in the master bedroom.' },
      { id: 'l10q7', question: 'When will the plumber visit the apartment?', options: ['Wednesday afternoon', 'Thursday morning at 9:30 AM', 'Friday night', 'Saturday morning'], correctAnswer: 1, explanation: 'The landlord states: "I will send our certified plumber, Jack, to inspect the water heater on Thursday morning at 9:30 AM."' },
      { id: 'l10q8', question: 'What incentive does the landlord offer for signing a two-year lease extension?', options: ['One month free rent', 'Free parking garage access', 'Waiving the scheduled 5% rent increase and keeping it at $1,200', 'Providing new kitchen appliances'], correctAnswer: 2, explanation: '"If you\'re willing to sign a two-year extension... I can keep the monthly rental rate at $1,200 without the scheduled 5 percent annual increase."' },
      { id: 'l10q9', question: 'How many students participated in the sustainability survey?', options: ['150 students', '250 students', '400 students', '820 students'], correctAnswer: 2, explanation: 'Jessica mentions: "over 82 percent of the 400 respondents said they want to recycle."' },
      { id: 'l10q10', question: 'What was the main reason students did not recycle properly on campus?', options: ['They did not care about the environment', 'Lack of convenient and clearly labeled sorting bins', 'Recycling was forbidden by university rules', 'Trash bins were locked at night'], correctAnswer: 1, explanation: 'Students pointed out that "our university currently lacks clearly labeled dual-stream recycling bins near dormitory entrances."' },
      { id: 'l10q11', question: 'How much will 20 sets of color-coded bins cost according to the quote?', options: ['$1,000', '$1,600', '$3,200', '$5,000'], correctAnswer: 2, explanation: 'Facilities management quoted: "20 complete sets of color-coded outdoor bins will cost roughly $3,200."' },
      { id: 'l10q12', question: 'How do Mark and Jessica plan to finance the new bins?', options: ['Asking students to pay an entrance fee', 'Splitting the cost between the Student Union and university green matching grants', 'Borrowing money from a bank', 'Selling discarded plastic bottles'], correctAnswer: 1, explanation: 'They propose the Student Union fund half and seek green grant matching funds from the university sustainability office.' }
    ]
  },

  // ═══════════════════ AUTHENTIC VSTEP LISTENING SET 3: PART 3 (LECTURES - 15 QUESTIONS) ═══════════════════
  {
    id: 'l11',
    title: 'Part 3: Bài Giảng Học Thuật & Chuyên Đề (3 Bài x 5 Câu)',
    part: 3,
    level: 'C1',
    description: 'Nghe 3 bài nói chuyện/bài giảng học thuật. Mỗi bài có 5 câu hỏi trắc nghiệm.',
    audioDescription: '3 bài giảng: Ô nhiễm hạt vi nhựa, Kỹ thuật xây cầu dẫn nước La Mã, Giai đoạn vàng phát triển ngôn ngữ.',
    transcript: `Lecture 1: Environmental Science - Microplastics in Marine Ecosystems (Questions 1 to 5)
Professor: Good morning, everyone. Today we are examining one of the most insidious anthropogenic threats facing modern marine biospheres: microplastic contamination. 
Microplastics are defined as synthetic polymeric particles measuring less than five millimeters in diameter. Climatologists and oceanographers categorize them into two distinct origins: primary and secondary microplastics. Primary microplastics are intentionally manufactured at sub-millimeter scales, including microbeads formerly utilized in exfoliants and cosmetics, as well as industrial plastic pellets, often known as "nurdles," which serve as raw feedstocks for plastic manufacturing. Secondary microplastics, by contrast, originate from the fragmentation of macroscopic debris—such as discarded polyethylene fishing nets, synthetic textile fibers shed during domestic laundry, and car tires degraded by road abrasion.
What makes microplastics profoundly perilous is their surface chemistry. Being hydrophobic, these polymers readily adsorb persistent organic pollutants (POPs), including polychlorinated biphenyls (PCBs) and heavy metals dissolved in seawater. When filter-feeding zooplankton, bivalves, and small pelagic fish inadvertently ingest these micro-particulates, toxic compounds desorb within digestive tracts, triggering endocrine disruption, gastrointestinal lacerations, and cellular inflammation. Through trophic biomagnification, these toxins accumulate progressively up the marine food web, culminating in high concentrations within apex predators and seafood consumed by humans.

Lecture 2: Architectural History - Engineering Roman Aqueducts (Questions 6 to 10)
Professor: Today we turn our attention to classical Roman civil engineering, specifically the gravity-fed aqueduct systems that sustained imperial civilization.
To supply millions of liters of potable fresh water daily to public baths, decorative fountains, and private villas, Roman engineers constructed extensive conduit networks stretching over tens of kilometers. Contrary to the widespread popular conception that Roman aqueducts were predominantly towering stone arches marching across open plains, over 80 percent of the total 800-kilometer water network around Rome was actually buried underground. Subterranean tunneling served multiple strategic functions: it protected the water supply from contamination, minimized evaporative loss during scorching summers, and prevented catastrophic structural damage from seismic tremors or military sieges.
When engineers were forced to bridge steep river canyons, they deployed monumental multi-tiered arcades, exemplary among which is the famous Pont du Gard in southern France. Built without any binding mortar, this three-tiered limestone masterpiece relies strictly on the physics of the semicircular arch and hydraulic gradient precision. Roman surveyors utilized an instrument called the chorobates—a wooden leveling bench equipped with water troughs and plumb bobs—to maintain a uniform slope gradient as gentle as one in three thousand, ensuring water flowed at an optimal velocity: fast enough to prevent stagnation and silt buildup, yet slow enough to prevent scouring the interior hydraulic cement lining.

Lecture 3: Cognitive Linguistics - The Critical Period Hypothesis (Questions 11 to 15)
Professor: In this morning's linguistics seminar, we will debate one of the most seminal propositions in cognitive neuroscience: Eric Lenneberg\'s Critical Period Hypothesis for language acquisition.
Formulated in 1967, Lenneberg posited that human language acquisition is biologically constrained by an innate maturational timetable. He hypothesized that the human brain possesses heightened neuroplasticity specifically tailored for spontaneous, effortless language internalization from infancy until puberty. During this window, the cerebral hemispheres undergo rapid synaptic arborization and lateralization, with the left hemisphere typically establishing dominance over syntactic processing and phonological encoding.
According to the hypothesis, following puberty and the completion of hemispheric lateralization, neural circuits lose their epigenetic flexibility. Consequently, individuals attempting to master a second language post-puberty must rely on conscious declarative memory systems and explicit pedagogical grammar rules, which accounts for the persistent foreign accents and syntactic fossilization observed in adult learners. While critics point to neuroimaging evidence demonstrating lifelong neuroplasticity, empirical studies of deaf children without early sign exposure provide compelling validation that early sensory and linguistic immersion remains indispensable for native-level linguistic fluency.`,
    questions: [
      { id: 'l11q1', question: 'How are microplastics scientifically defined in terms of size?', options: ['Particles larger than 10 centimeters', 'Synthetic polymer particles measuring less than 5 millimeters in diameter', 'Soluble liquid chemicals', 'Organic plant seeds'], correctAnswer: 1, explanation: 'Microplastics are defined as "synthetic polymeric particles measuring less than five millimeters in diameter."' },
      { id: 'l11q2', question: 'What is the distinction between primary and secondary microplastics?', options: ['Primary are made of metal; secondary are made of wood', 'Primary are intentionally manufactured at sub-millimeter scales; secondary result from fragmentation of larger items', 'Primary float in air; secondary sink in water', 'Primary are harmless; secondary are deadly'], correctAnswer: 1, explanation: 'Primary are manufactured at tiny scales (microbeads, nurdles); secondary result from fragmentation of macroscopic debris.' },
      { id: 'l11q3', question: 'Why do microplastics absorb persistent organic pollutants (POPs) in seawater?', options: ['Because they are magnetic', 'Because their hydrophobic surface chemistry readily attracts and adsorbs dissolved toxins', 'Because they produce sugar', 'Because they are heated by underwater volcanoes'], correctAnswer: 1, explanation: 'The text notes: "Being hydrophobic, these polymers readily adsorb persistent organic pollutants (POPs)."' },
      { id: 'l11q4', question: 'What biological phenomenon causes toxins to accumulate at higher trophic levels in the food chain?', options: ['Photosynthesis', 'Trophic biomagnification', 'Thermal evaporation', 'Cellular hibernation'], correctAnswer: 1, explanation: 'The lecture explains: "Through trophic biomagnification, these toxins accumulate progressively up the marine food web."' },
      { id: 'l11q5', question: 'Which health impact on marine organisms is NOT cited in the lecture?', options: ['Endocrine disruption', 'Gastrointestinal lacerations', 'Cellular inflammation', 'Enhanced reproductive fertility'], correctAnswer: 3, explanation: 'Ingesting microplastics harms organisms; it does NOT enhance fertility.' },
      { id: 'l11q6', question: 'What percentage of Roman aqueducts were actually constructed underground?', options: ['Less than 10 percent', 'About 30 percent', 'Over 80 percent', 'Exactly 100 percent'], correctAnswer: 2, explanation: '"over 80 percent of the total 800-kilometer water network around Rome was actually buried underground."' },
      { id: 'l11q7', question: 'What was a primary benefit of burying aqueducts underground?', options: ['It was cheaper than digging ditches', 'Protecting water from contamination, heat evaporation, and military siege damage', 'Allowing fish to live inside the conduits', 'Hiding gold from enemy armies'], correctAnswer: 1, explanation: 'Burying protected water from contamination, minimized evaporation, and prevented damage from quakes or sieges.' },
      { id: 'l11q8', question: 'What famous three-tiered limestone aqueduct in southern France is highlighted by the professor?', options: ['The Colosseum', 'The Pont du Gard', 'The Pantheon', 'The Appian Way'], correctAnswer: 1, explanation: 'The professor cites "the famous Pont du Gard in southern France."' },
      { id: 'l11q9', question: 'What surveying instrument did Roman engineers use to maintain precise water slope gradients?', options: ['The telescope', 'The magnetic compass', 'The chorobates', 'The mercury barometer'], correctAnswer: 2, explanation: 'Roman surveyors "utilized an instrument called the chorobates—a wooden leveling bench."' },
      { id: 'l11q10', question: 'Why was maintaining an optimal hydraulic gradient essential?', options: ['To make the water taste sweeter', 'To keep water flowing fast enough to prevent stagnation, but slow enough to avoid scouring conduit walls', 'To freeze the water in winter', 'To generate electric power for Roman mills'], correctAnswer: 1, explanation: 'The gradient ensured velocity was "fast enough to prevent stagnation... yet slow enough to prevent scouring."' },
      { id: 'l11q11', question: 'Who formulated the Critical Period Hypothesis for language acquisition in 1967?', options: ['Noam Chomsky', 'Eric Lenneberg', 'B.F. Skinner', 'Sigmund Freud'], correctAnswer: 1, explanation: 'The lecture states: "Eric Lenneberg\'s Critical Period Hypothesis for language acquisition... Formulated in 1967."' },
      { id: 'l11q12', question: 'According to the hypothesis, what biological timeframe represents the optimal window for native language acquisition?', options: ['Between ages 20 and 35', 'From infancy until the onset of puberty', 'During the prenatal phase only', 'Throughout entire adulthood'], correctAnswer: 1, explanation: 'Lenneberg hypothesized a window "specifically tailored for spontaneous, effortless language internalization from infancy until puberty."' },
      { id: 'l11q13', question: 'Which brain hemisphere typically establishes dominance over syntactic and phonological processing?', options: ['The cerebellum', 'The right hemisphere', 'The left hemisphere', 'The occipital lobe'], correctAnswer: 2, explanation: 'The text states "with the left hemisphere typically establishing dominance over syntactic processing and phonological encoding."' },
      { id: 'l11q14', question: 'How do adult second-language learners differ neurologically from young children after puberty?', options: ['Adults learn ten times faster without effort', 'Adults must rely on conscious declarative memory systems and explicit grammatical rules', 'Adults forget their native language completely', 'Adults have higher neuroplasticity in the auditory cortex'], correctAnswer: 1, explanation: 'Adults "must rely on conscious declarative memory systems and explicit pedagogical grammar rules."' },
      { id: 'l11q15', question: 'What empirical evidence strongly supports the validity of the Critical Period Hypothesis?', options: ['Studies of deaf children who experienced delayed early sign language exposure', 'Studies of bilingual babies watching television', 'Memory tests conducted on elderly mathematicians', 'Surveys of tourists learning greetings on vacations'], correctAnswer: 0, explanation: '"empirical studies of deaf children without early sign exposure provide compelling validation that early sensory and linguistic immersion remains indispensable."' }
    ]
  },
  // ═══════════════════ AUTHENTIC VSTEP LISTENING 12: PART 1 SHORT ANNOUNCEMENTS ═══════════════════
  {
    id: 'l12',
    title: 'Part 1: Thông báo & Hướng dẫn nơi công cộng & Công sở',
    part: 1,
    level: 'B1',
    description: 'Nghe 8 đoạn thông báo ngắn tại nhà ga điện ngầm, sân bay, hội thảo trường đại học, bệnh viện, phòng họp... Mỗi câu 1 câu hỏi trắc nghiệm.',
    audioDescription: '8 đoạn thông báo chuẩn VSTEP Part 1: Subway, Airport, Seminar, Clinic, Booking...',
    transcript: `Announcement 1:
Attention passengers on the Green Line metro. Due to unscheduled track inspections between West Lake and Central Plaza, train frequency will be reduced to one train every 15 minutes until 2 PM today. Commuters are advised to consider feeder buses stationed outside Gate B.

Announcement 2:
Good afternoon, passengers arriving on flight SQ178 from Singapore. Please be advised that baggage retrieval for your flight has been reassigned to carousel number 5 in the international arrivals hall. Ground personnel are standing by at the information desk to assist with oversize luggage.

Announcement 3:
Welcome to the Hanoi University Faculty of Foreign Languages Academic Symposium. The keynote lecture on Modern Lexicography originally scheduled for Room 204 has been relocated to the Main Auditorium on the ground floor to accommodate additional attendees. Please ensure mobile devices are muted.

Announcement 4:
Attention clinic patients. Please note that the laboratory specimen collection counter will cease operating at 11:30 AM today for mandatory sterilization and system calibration. Patients requiring routine blood draws should report to Counter 3 tomorrow morning commencing at 7:30 AM.

Announcement 5:
This is an urgent internal message for the sales team. The video conference with the European marketing director has been pushed back from 3:00 PM to 4:30 PM due to a technical outage on our central conference server. Please review the updated slide deck on our cloud portal prior to the meeting.

Announcement 6:
Attention library visitors. As part of our commitment to sustainable energy, the third-floor silent study annex will be closed this Saturday and Sunday for the installation of smart LED lighting and solar rooftop sensors. All reserved reference books may be checked out at the primary circulation desk on Level 1.

Announcement 7:
National Meteorological Bureau Weather Advisory: Tropical depression Number 4 is intensifying in the East Sea, generating gale-force squalls and localized torrential rainfall across coastal provinces. Coastal maritime vessels are instructed to return to sheltered harbors before 6 PM this evening.

Announcement 8:
Attention university administrative staff. Annual health examination schedules have been finalized. Department members with surnames beginning from A to M will be screened on Thursday morning at the University Health Center, while surnames N to Z will be received on Friday afternoon. Fasting for eight hours prior to arrival is strictly required.`,
    questions: [
      { id: 'l12q1', question: `Why is Green Line metro train frequency reduced today?`, options: [`Due to a sudden power outage`, `Due to unscheduled track inspections`, `Due to a strike by transit workers`, `Because a new train station opened`], correctAnswer: 1, explanation: `The announcer states: "Due to unscheduled track inspections between West Lake and Central Plaza."` },
      { id: 'l12q2', question: `Where should passengers from Flight SQ178 claim their baggage?`, options: [`At Carousel number 2`, `At Carousel number 5`, `At the main departures counter`, `At the customs inspection exit`], correctAnswer: 1, explanation: `The message informs passengers that "baggage retrieval has been reassigned to carousel number 5."` },
      { id: 'l12q3', question: `Where has the keynote symposium lecture been relocated?`, options: [`To Room 204 on the second floor`, `To the Main Auditorium on the ground floor`, `To the outdoor sports field`, `To the library seminar room`], correctAnswer: 1, explanation: `The keynote lecture "has been relocated to the Main Auditorium on the ground floor to accommodate additional attendees."` },
      { id: 'l12q4', question: `When will the clinic specimen collection counter reopen for routine blood tests?`, options: [`At 2:00 PM this afternoon`, `Tomorrow morning at 7:30 AM`, `Next Monday morning`, `Immediately after lunch`], correctAnswer: 1, explanation: `The announcer advises patients to report "tomorrow morning commencing at 7:30 AM."` },
      { id: 'l12q5', question: `What is the new scheduled time for the sales video conference?`, options: [`3:00 PM`, `3:30 PM`, `4:30 PM`, `5:00 PM`], correctAnswer: 2, explanation: `The conference "has been pushed back from 3:00 PM to 4:30 PM due to a technical outage."` },
      { id: 'l12q6', question: `Why is the library third-floor study annex closing this weekend?`, options: [`For painting the walls`, `For installing smart LED lighting and solar sensors`, `To clean the carpets`, `Because books were damaged by rain`], correctAnswer: 1, explanation: `The annex is closing "for the installation of smart LED lighting and solar rooftop sensors."` },
      { id: 'l12q7', question: `What instruction is given to maritime vessels in the weather advisory?`, options: [`To speed up to international waters`, `To return to sheltered harbors before 6 PM`, `To anchor in deep open ocean`, `To turn off their radio transmitters`], correctAnswer: 1, explanation: `Vessels are instructed "to return to sheltered harbors before 6 PM this evening."` },
      { id: 'l12q8', question: `What requirement must university staff follow before their health examination?`, options: [`Wear formal athletic clothing`, `Fast for eight hours prior to arrival`, `Bring their family medical records`, `Pay an entry fee at the gate`], correctAnswer: 1, explanation: `The announcement states: "Fasting for eight hours prior to arrival is strictly required."` }
    ]
  },

  // ═══════════════════ AUTHENTIC VSTEP LISTENING 13: PART 2 ACADEMIC CONVERSATION ═══════════════════
  {
    id: 'l13',
    title: 'Part 2: Hội thoại Học thuật - Nghiên cứu Khoa học & Luận văn',
    part: 2,
    level: 'B2',
    description: 'Hội thoại dài giữa Giáo sư Davis và nữ sinh viên Emily về việc hoàn thiện đề cương luận văn tốt nghiệp và xin duyệt đạo đức nghiên cứu.',
    audioDescription: 'Hội thoại học thuật giữa giảng viên và sinh viên: Research Methodology & Ethics Review (4 câu hỏi)',
    transcript: `Professor Davis: Come in, Emily. Have a seat. I have reviewed the revised draft of your undergraduate dissertation proposal on consumer attitudes toward plant-based protein alternatives. You have made commendable progress since our last consultation.

Emily: Thank you, Professor Davis! I incorporated your suggestions regarding the literature review and expanded the theoretical framework to include the Theory of Planned Behavior. However, I am still wrestling with the sampling methodology.

Professor Davis: Yes, that was precisely the primary issue I highlighted in my annotations. In your initial draft, you proposed administering an online questionnaire solely to undergraduate peers on campus. While convenient, convenience sampling among 18-to-22-year-olds will introduce profound selection bias. Plant-based dietary transitions are heavily influenced by household disposable income, family culinary traditions, and age demographics.

Emily: That makes complete sense. If I want generalizable findings across Hanoi urban consumers, I should probably utilize stratified random sampling across diverse age brackets and income quartiles. Would a sample size of 300 respondents suffice?

Professor Davis: 300 statistically representative responses would be robust for an undergraduate thesis. But remember, Emily, collecting in-person survey data at commercial supermarkets or community centers requires institutional ethics approval and site permissions. Have you submitted your documentation to the University Institutional Review Board yet?

Emily: Not yet, Professor. I was waiting for your approval of the questionnaire items before filing the IRB application. The deadline is next Friday, correct?

Professor Davis: Indeed, the IRB committee convenes on the third Monday of each month. If you submit by next Friday, your application will be evaluated this month. Once approved, you can commence empirical fieldwork immediately at the start of next month. Let us review your individual questionnaire construct measurements now.`,
    questions: [
      { id: 'l13q1', question: `What is the topic of Emily's undergraduate dissertation research?`, options: [`Renewable wind energy in rural Vietnam`, `Consumer attitudes toward plant-based protein alternatives`, `The history of university campus dining halls`, `The psychological impacts of online gaming`], correctAnswer: 1, explanation: `Professor Davis mentions her proposal on "consumer attitudes toward plant-based protein alternatives."` },
      { id: 'l13q2', question: `What fundamental flaw did Professor Davis identify in Emily's original sampling strategy?`, options: [`The questionnaire was far too lengthy`, `Sampling exclusively undergraduate peers creates profound demographic selection bias`, `She forgot to write an introduction`, `Online surveys are illegal in universities`], correctAnswer: 1, explanation: `The professor warns that "convenience sampling among 18-to-22-year-olds will introduce profound selection bias."` },
      { id: 'l13q3', question: `What revised sampling technique does Emily plan to adopt to improve generalizability?`, options: [`Stratified random sampling across various age and income brackets`, `Interviewing only her close family members`, `Asking random people on social media chat rooms`, `Surveying foreign tourists at the international airport`], correctAnswer: 0, explanation: `Emily states: "I should probably utilize stratified random sampling across diverse age brackets and income quartiles."` },
      { id: 'l13q4', question: `When does the University Institutional Review Board (IRB) committee convene?`, options: [`Every single morning at 8 AM`, `On the third Monday of each month`, `Only once per academic semester`, `At the end of the calendar year in December`], correctAnswer: 1, explanation: `Professor Davis states: "the IRB committee convenes on the third Monday of each month."` }
    ]
  },

  // ═══════════════════ AUTHENTIC VSTEP LISTENING 14: PART 3 AI IN HEALTHCARE LECTURE ═══════════════════
  {
    id: 'l14',
    title: 'Part 3: Bài giảng Học thuật - Ứng dụng AI trong Y tế & Chẩn đoán',
    part: 3,
    level: 'B2',
    description: 'Bài giảng chuyên sâu của Giáo sư Y sinh về việc tích hợp mạng thần kinh tích chập (CNN) và máy học vào chẩn đoán hình ảnh và phát hiện sớm ung thư.',
    audioDescription: 'Bài giảng học thuật đại học: Artificial Intelligence in Modern Medical Diagnostics (5 câu hỏi)',
    transcript: `Good morning, graduate students in biomedical engineering. Today we delve into one of the most transformative frontiers of modern healthcare: the deployment of deep learning algorithms in clinical diagnostic radiology.

For decades, the interpretation of radiographic imaging—whether plain X-rays, computerized tomography (CT) scans, or magnetic resonance imaging (MRI)—depended entirely upon the discerning eyes of specialist physicians. However, clinical radiologists face staggering caseloads, leading to cognitive fatigue that inevitably increases the statistical likelihood of false-negative oversights, particularly in early-stage oncology where micro-calcifications or subtle pulmonary nodules measure less than a millimeter across.

Enter deep convolutional neural networks, or CNNs. By training on multimillion-image annotated repositories from global biobanks, advanced diagnostic algorithms have achieved diagnostic sensitivity and specificity on par with, and in several benchmark trials exceeding, senior attending board-certified radiologists. In dermatological screening, for instance, CNN architectures evaluate microscopic dermatoscope images of melanomas, distinguishing benign pigmented lesions from aggressive malignant carcinomas in seconds.

Crucially, however, the integration of AI into hospital ecosystems is not designed to replace physicians, but rather to establish a model of clinical augmentation. The prevailing paradigm is the "human-in-the-loop" framework. When a hospital radiologist opens a patient file, the AI serves as a tireless secondary screener. It flags suspicious anomalies, highlights subtle density variations with heat-map bounding boxes, and triages emergency scans—ensuring that a critical acute intracerebral hemorrhage is escalated to the neurosurgeon's workstation within minutes, rather than languishing in an unread queue for hours.

Nevertheless, significant bioethical and technical hurdles persist. Foremost is the "black-box" problem. Because deep neural networks synthesize millions of hyper-dimensional parameter weights, clinicians cannot always decipher the precise causal logic underpinning an algorithmic prognosis. Furthermore, models trained predominantly on Caucasian cohorts in Western academic medical centers frequently suffer algorithmic bias, dropping significantly in diagnostic accuracy when deployed in diverse Asian or African populations with differing epidemiology. Overcoming these disparities through heterogeneous cross-validation will be your primary challenge as future biomedical researchers.`,
    questions: [
      { id: 'l14q1', question: `What primary clinical challenge confronting human radiologists is identified in the lecture?`, options: [`Lack of proper medical textbooks in libraries`, `High caseloads and cognitive fatigue leading to potential diagnostic oversights`, `Hospitals refusing to purchase computer monitors`, `Radiologists having no medical school training`], correctAnswer: 1, explanation: `The lecturer highlights that "radiologists face staggering caseloads, leading to cognitive fatigue that inevitably increases the statistical likelihood of false-negative oversights."` },
      { id: 'l14q2', question: `What specific computational architecture is cited as revolutionizing medical image analysis?`, options: [`Simple spreadsheet formulas`, `Deep convolutional neural networks (CNNs)`, `Mechanical calculators`, `Manual database indexing`], correctAnswer: 1, explanation: `The professor specifically cites "deep convolutional neural networks, or CNNs."` },
      { id: 'l14q3', question: `What is the primary role envisioned for artificial intelligence in hospital ecosystems?`, options: [`To fire and replace all human doctors immediately`, `To serve as a clinical augmentation tool in a "human-in-the-loop" framework`, `To bill patients higher insurance fees`, `To operate hospital cafeterias`], correctAnswer: 1, explanation: `The integration is designed "not to replace physicians, but rather to establish a model of clinical augmentation... a 'human-in-the-loop' framework."` },
      { id: 'l14q4', question: `What is the "black-box" problem mentioned in the lecture?`, options: [`The physical casing of hospital computer monitors is black`, `The inability of clinicians to interpret the internal causal reasoning behind deep neural network decisions`, `Computers crashing when black patients are scanned`, `Hospitals operating without electrical lighting`], correctAnswer: 1, explanation: `The black-box problem is that "clinicians cannot always decipher the precise causal logic underpinning an algorithmic prognosis."` },
      { id: 'l14q5', question: `Why do algorithms trained on Western cohorts face difficulties when deployed in diverse global regions?`, options: [`Western software is illegal abroad`, `Algorithmic bias and reduced accuracy when applied to diverse populations with different epidemiological profiles`, `Tropical weather destroys the hard drives`, `Different languages prevent computers from scanning images`], correctAnswer: 1, explanation: `Models trained on homogenous cohorts "suffer algorithmic bias, dropping significantly in diagnostic accuracy when deployed in diverse Asian or African populations."` }
    ]
  },

  // ═══════════════════ AUTHENTIC VSTEP LISTENING 15: PART 3 SOLID-STATE BATTERY INNOVATION ═══════════════════
  {
    id: 'l15',
    title: 'Part 3: Thuyết trình Khoa học - Đột phá Pin thể rắn & Năng lượng sạch',
    part: 3,
    level: 'C1',
    description: 'Thuyết trình chuyên sâu tại hội nghị năng lượng quốc tế về công nghệ Pin thể rắn (Solid-State Batteries), cơ chế điện phân và tác động đến xe điện.',
    audioDescription: 'Thuyết trình công nghệ năng lượng: Next-Generation Solid-State Battery Innovations (5 câu hỏi)',
    transcript: `Distinguished colleagues, welcome to Session 4 of the International Clean Transportation Summit. Today, I am privileged to present our research team's latest developmental milestones in solid-state lithium-metal battery architecture—a technology widely heralded as the holy grail of electrochemical energy storage.

To appreciate the quantum leap solid-state represents, we must first examine the inherent limitations of conventional lithium-ion batteries that currently propel commercial electric vehicles and consumer electronics. Conventional cells utilize liquid organic electrolytes—typically volatile solvent mixtures containing lithium hexafluorophosphate. While these liquid electrolytes facilitate rapid ionic conductivity, they pose grave safety hazards. In the event of internal short-circuits, manufacturing defects, or high-velocity collisions, these volatile organic solvents can undergo exothermic runaway, resulting in ferocious battery fires that burn at temperatures exceeding 800 degrees Celsius and are notoriously difficult to extinguish.

Solid-state batteries revolutionize this architecture by replacing the flammable liquid electrolyte and polymer separator with a non-flammable solid electrolyte separator—typically composed of engineered ceramic oxides, sulfides, or solid polymeric matrices. This chemical transition confers three monumental advantages.

First is quintessential safety. Solid ceramic electrolytes are inherently non-combustible and thermally stable up to several hundred degrees, completely neutralizing the risk of catastrophic thermal runaway.

Second is unprecedented volumetric energy density. By substituting standard graphite or silicon-graphite anodes with pure, ultra-thin lithium-metal foils, solid-state cells can achieve energy densities in excess of 450 to 500 watt-hours per kilogram. For an electric vehicle, this translates to a driving range exceeding 800 kilometers on a single charge—comparable to, or even surpassing, traditional internal combustion engines.

Third is revolutionary fast-charging kinetics. Because solid electrolytes can tolerate higher current densities without forming destructive lithium dendrites—microscopic needle-like metallic fibers that pierce traditional liquid separators—solid-state battery packs can recharge from 10 to 80 percent in under 12 minutes.

Naturally, formidable commercial hurdles remain. Manufacturing continuous, defect-free ceramic electrolyte ribbons at gigawatt-hour scale without micro-fractures requires specialized cleanroom roll-to-roll pressing equipment. However, with leading automotive consortia establishing pilot production lines in 2026, the era of truly green, high-range electromobility is no longer a distant theoretical ambition, but an imminent industrial reality.`,
    questions: [
      { id: 'l15q1', question: `What is the primary safety hazard associated with conventional lithium-ion batteries?`, options: [`They are too heavy to transport`, `Their volatile liquid organic electrolytes can ignite in catastrophic exothermic runaway fires`, `They cannot function in cold weather`, `They emit dangerous radioactive gamma rays`], correctAnswer: 1, explanation: `The speaker explains that conventional liquid organic electrolytes "can undergo exothermic runaway, resulting in ferocious battery fires."` },
      { id: 'l15q2', question: `What component in solid-state batteries replaces both the liquid electrolyte and polymer separator?`, options: [`A non-flammable solid electrolyte separator made of ceramic oxides, sulfides, or polymers`, `Ordinary sea water and sand`, `An extra layer of heavy steel armor`, `A wooden insulator block`], correctAnswer: 0, explanation: `The technology replaces liquid electrolytes "with a non-flammable solid electrolyte separator—typically composed of engineered ceramic oxides, sulfides, or solid polymeric matrices."` },
      { id: 'l15q3', question: `What anode material enables solid-state cells to achieve energy densities above 450 Wh/kg?`, options: [`Pure, ultra-thin lithium-metal foil`, `Heavy lead and sulfuric acid`, `Recycled aluminum cans`, `Natural carbon charcoal`], correctAnswer: 0, explanation: `The speaker notes that "substituting standard graphite anodes with pure, ultra-thin lithium-metal foils" enables high energy density.` },
      { id: 'l15q4', question: `What are "lithium dendrites" and why are they dangerous in traditional liquid batteries?`, options: [`Toxic gases released during charging`, `Microscopic needle-like metallic fibers that pierce separators and cause short circuits`, `Bacteria that eat battery terminals`, `Software bugs in the vehicle dashboard`], correctAnswer: 1, explanation: `Dendrites are defined as "microscopic needle-like metallic fibers that pierce traditional liquid separators."` },
      { id: 'l15q5', question: `What is highlighted as the primary ongoing engineering hurdle for solid-state batteries?`, options: [`Drivers refusing to buy electric cars`, `Manufacturing continuous, defect-free ceramic electrolyte ribbons at gigawatt-hour industrial scale`, `The total absence of lithium on Earth`, `Governments making batteries illegal`], correctAnswer: 1, explanation: `The speaker concludes that "manufacturing continuous, defect-free ceramic electrolyte ribbons at gigawatt-hour scale without micro-fractures" is the primary hurdle.` }
    ]
  }
];
