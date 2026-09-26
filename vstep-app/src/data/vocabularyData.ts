export interface VocabWord {
  word: string;
  meaning: string;
  example: string;
  phonetic?: string;
}

export interface VocabTopic {
  id: string;
  title: string;
  icon: string;
  level: 'B1' | 'B2' | 'C1';
  words: VocabWord[];
}

export const vocabTopics: VocabTopic[] = [
  {
    id: 'edu-b1',
    title: 'Education',
    icon: '🎓',
    level: 'B1',
    words: [
      { word: 'assignment', meaning: 'bài tập', example: 'I have to finish my assignment by Friday.', phonetic: '/əˈsaɪnmənt/' },
      { word: 'lecture', meaning: 'bài giảng', example: 'The professor gave an interesting lecture.', phonetic: '/ˈlektʃər/' },
      { word: 'semester', meaning: 'học kỳ', example: 'There are two semesters in a school year.', phonetic: '/sɪˈmestər/' },
      { word: 'scholarship', meaning: 'học bổng', example: 'She won a scholarship to study abroad.', phonetic: '/ˈskɒlərʃɪp/' },
      { word: 'graduate', meaning: 'tốt nghiệp', example: 'He graduated from university last year.', phonetic: '/ˈɡrædʒueɪt/' },
      { word: 'tuition', meaning: 'học phí', example: 'Tuition fees are increasing every year.', phonetic: '/tjuˈɪʃən/' },
      { word: 'dormitory', meaning: 'ký túc xá', example: 'Many students live in the dormitory.', phonetic: '/ˈdɔːrmɪtɔːri/' },
      { word: 'syllabus', meaning: 'đề cương môn học', example: 'The syllabus covers 12 topics.', phonetic: '/ˈsɪləbəs/' },
      { word: 'enroll', meaning: 'ghi danh / đăng ký', example: 'I want to enroll in the English course.', phonetic: '/ɪnˈroʊl/' },
      { word: 'certificate', meaning: 'chứng chỉ', example: 'She received a certificate after completing the course.', phonetic: '/sərˈtɪfɪkət/' },
    ]
  },
  {
    id: 'edu-b2',
    title: 'Education',
    icon: '🎓',
    level: 'B2',
    words: [
      { word: 'curriculum', meaning: 'chương trình giảng dạy', example: 'The curriculum was redesigned this year.', phonetic: '/kəˈrɪkjələm/' },
      { word: 'dissertation', meaning: 'luận văn', example: 'She is writing her dissertation on climate change.', phonetic: '/ˌdɪsərˈteɪʃən/' },
      { word: 'plagiarism', meaning: 'đạo văn', example: 'Plagiarism is a serious academic offense.', phonetic: '/ˈpleɪdʒərɪzəm/' },
      { word: 'undergraduate', meaning: 'sinh viên đại học', example: 'He is an undergraduate student majoring in IT.', phonetic: '/ˌʌndərˈɡrædʒuət/' },
      { word: 'postgraduate', meaning: 'sau đại học', example: 'She is doing postgraduate research.', phonetic: '/ˌpoʊstˈɡrædʒuət/' },
      { word: 'assessment', meaning: 'đánh giá', example: 'Continuous assessment helps track progress.', phonetic: '/əˈsesmənt/' },
      { word: 'extracurricular', meaning: 'ngoại khóa', example: 'Extracurricular activities build soft skills.', phonetic: '/ˌekstrəkəˈrɪkjələr/' },
      { word: 'discipline', meaning: 'kỷ luật / bộ môn', example: 'History is an important academic discipline.', phonetic: '/ˈdɪsəplɪn/' },
      { word: 'thesis', meaning: 'luận điểm / luận văn', example: 'His thesis argues that technology improves learning.', phonetic: '/ˈθiːsɪs/' },
      { word: 'accreditation', meaning: 'kiểm định chất lượng', example: 'The university received international accreditation.', phonetic: '/əˌkredɪˈteɪʃən/' },
    ]
  },
  {
    id: 'tech-b1',
    title: 'Technology',
    icon: '💻',
    level: 'B1',
    words: [
      { word: 'device', meaning: 'thiết bị', example: 'Smartphones are the most popular devices.', phonetic: '/dɪˈvaɪs/' },
      { word: 'software', meaning: 'phần mềm', example: 'We need to update the software.', phonetic: '/ˈsɒftweər/' },
      { word: 'password', meaning: 'mật khẩu', example: 'Never share your password with anyone.', phonetic: '/ˈpæswɜːrd/' },
      { word: 'download', meaning: 'tải xuống', example: 'You can download the app for free.', phonetic: '/ˈdaʊnloʊd/' },
      { word: 'connection', meaning: 'kết nối', example: 'The internet connection is very slow today.', phonetic: '/kəˈnekʃən/' },
      { word: 'website', meaning: 'trang web', example: 'Visit our website for more information.', phonetic: '/ˈwebsaɪt/' },
      { word: 'wireless', meaning: 'không dây', example: 'The cafe has free wireless internet.', phonetic: '/ˈwaɪərləs/' },
      { word: 'storage', meaning: 'bộ nhớ / lưu trữ', example: 'My phone is running out of storage.', phonetic: '/ˈstɔːrɪdʒ/' },
      { word: 'screen', meaning: 'màn hình', example: 'The laptop has a 15-inch screen.', phonetic: '/skriːn/' },
      { word: 'battery', meaning: 'pin', example: 'The battery lasts about 8 hours.', phonetic: '/ˈbætəri/' },
    ]
  },
  {
    id: 'tech-b2',
    title: 'Technology',
    icon: '💻',
    level: 'B2',
    words: [
      { word: 'artificial intelligence', meaning: 'trí tuệ nhân tạo', example: 'AI is transforming many industries.', phonetic: '/ˌɑːrtɪˈfɪʃəl ɪnˈtelɪdʒəns/' },
      { word: 'automation', meaning: 'tự động hóa', example: 'Automation may replace repetitive jobs.', phonetic: '/ˌɔːtəˈmeɪʃən/' },
      { word: 'cybersecurity', meaning: 'an ninh mạng', example: 'Cybersecurity threats are increasing.', phonetic: '/ˌsaɪbərsɪˈkjʊərəti/' },
      { word: 'innovation', meaning: 'đổi mới / sáng tạo', example: 'Innovation drives economic growth.', phonetic: '/ˌɪnəˈveɪʃən/' },
      { word: 'algorithm', meaning: 'thuật toán', example: 'Social media algorithms affect what we see.', phonetic: '/ˈælɡərɪðəm/' },
      { word: 'database', meaning: 'cơ sở dữ liệu', example: 'All customer data is stored in the database.', phonetic: '/ˈdeɪtəbeɪs/' },
      { word: 'obsolete', meaning: 'lỗi thời', example: 'Old technology quickly becomes obsolete.', phonetic: '/ˈɒbsəliːt/' },
      { word: 'breakthrough', meaning: 'bước đột phá', example: 'Scientists announced a major breakthrough.', phonetic: '/ˈbreɪkθruː/' },
      { word: 'digital literacy', meaning: 'kiến thức số', example: 'Digital literacy is essential for modern workers.', phonetic: '/ˈdɪdʒɪtəl ˈlɪtərəsi/' },
      { word: 'virtual reality', meaning: 'thực tế ảo', example: 'Virtual reality is used in education and gaming.', phonetic: '/ˈvɜːrtʃuəl riˈæləti/' },
    ]
  },
  {
    id: 'env-b1',
    title: 'Environment',
    icon: '🌍',
    level: 'B1',
    words: [
      { word: 'pollution', meaning: 'ô nhiễm', example: 'Air pollution is a big problem in cities.', phonetic: '/pəˈluːʃən/' },
      { word: 'recycle', meaning: 'tái chế', example: 'We should recycle plastic and paper.', phonetic: '/riːˈsaɪkəl/' },
      { word: 'climate', meaning: 'khí hậu', example: 'The climate is getting warmer every year.', phonetic: '/ˈklaɪmɪt/' },
      { word: 'wildlife', meaning: 'động vật hoang dã', example: 'We need to protect wildlife habitats.', phonetic: '/ˈwaɪldlaɪf/' },
      { word: 'waste', meaning: 'rác thải', example: 'Reducing waste helps the environment.', phonetic: '/weɪst/' },
      { word: 'energy', meaning: 'năng lượng', example: 'Solar energy is clean and renewable.', phonetic: '/ˈenərdʒi/' },
      { word: 'flood', meaning: 'lũ lụt', example: 'Heavy rain caused flooding in the city.', phonetic: '/flʌd/' },
      { word: 'drought', meaning: 'hạn hán', example: 'The drought destroyed many crops.', phonetic: '/draʊt/' },
      { word: 'forest', meaning: 'rừng', example: 'Tropical forests are home to many species.', phonetic: '/ˈfɒrɪst/' },
      { word: 'temperature', meaning: 'nhiệt độ', example: 'Global temperatures are rising.', phonetic: '/ˈtemprətʃər/' },
    ]
  },
  {
    id: 'env-b2',
    title: 'Environment',
    icon: '🌍',
    level: 'B2',
    words: [
      { word: 'sustainability', meaning: 'sự bền vững', example: 'Sustainability should be a priority for all businesses.', phonetic: '/səˌsteɪnəˈbɪləti/' },
      { word: 'carbon footprint', meaning: 'dấu chân carbon', example: 'Flying increases your carbon footprint significantly.', phonetic: '/ˈkɑːrbən ˈfʊtprɪnt/' },
      { word: 'deforestation', meaning: 'nạn phá rừng', example: 'Deforestation threatens biodiversity.', phonetic: '/diːˌfɒrɪˈsteɪʃən/' },
      { word: 'renewable energy', meaning: 'năng lượng tái tạo', example: 'Wind and solar are renewable energy sources.', phonetic: '/rɪˈnjuːəbəl ˈenərdʒi/' },
      { word: 'ecosystem', meaning: 'hệ sinh thái', example: 'Coral reefs are fragile ecosystems.', phonetic: '/ˈiːkoʊsɪstəm/' },
      { word: 'conservation', meaning: 'bảo tồn', example: 'Conservation efforts have saved many species.', phonetic: '/ˌkɒnsərˈveɪʃən/' },
      { word: 'emission', meaning: 'khí thải', example: 'We must reduce greenhouse gas emissions.', phonetic: '/ɪˈmɪʃən/' },
      { word: 'biodiversity', meaning: 'đa dạng sinh học', example: 'Biodiversity is essential for healthy ecosystems.', phonetic: '/ˌbaɪoʊdaɪˈvɜːrsəti/' },
      { word: 'endangered', meaning: 'có nguy cơ tuyệt chủng', example: 'Many animal species are endangered.', phonetic: '/ɪnˈdeɪndʒərd/' },
      { word: 'greenhouse effect', meaning: 'hiệu ứng nhà kính', example: 'The greenhouse effect causes global warming.', phonetic: '/ˈɡriːnhaʊs ɪˈfekt/' },
    ]
  },
  {
    id: 'health-b1',
    title: 'Health',
    icon: '🏥',
    level: 'B1',
    words: [
      { word: 'symptom', meaning: 'triệu chứng', example: 'Fever is a common symptom of flu.', phonetic: '/ˈsɪmptəm/' },
      { word: 'treatment', meaning: 'điều trị', example: 'The treatment lasts about two weeks.', phonetic: '/ˈtriːtmənt/' },
      { word: 'prescription', meaning: 'đơn thuốc', example: 'The doctor gave me a prescription.', phonetic: '/prɪˈskrɪpʃən/' },
      { word: 'exercise', meaning: 'tập thể dục', example: 'Regular exercise keeps you healthy.', phonetic: '/ˈeksərsaɪz/' },
      { word: 'diet', meaning: 'chế độ ăn', example: 'A balanced diet is important for health.', phonetic: '/ˈdaɪət/' },
      { word: 'appointment', meaning: 'cuộc hẹn (khám)', example: 'I have a doctor appointment at 3 PM.', phonetic: '/əˈpɔɪntmənt/' },
      { word: 'medicine', meaning: 'thuốc', example: 'Take this medicine three times a day.', phonetic: '/ˈmedɪsɪn/' },
      { word: 'injury', meaning: 'chấn thương', example: 'He suffered a knee injury while playing football.', phonetic: '/ˈɪndʒəri/' },
      { word: 'headache', meaning: 'đau đầu', example: 'I have a terrible headache today.', phonetic: '/ˈhedeɪk/' },
      { word: 'recovery', meaning: 'hồi phục', example: 'Her recovery from surgery was quick.', phonetic: '/rɪˈkʌvəri/' },
    ]
  },
  {
    id: 'health-b2',
    title: 'Health',
    icon: '🏥',
    level: 'B2',
    words: [
      { word: 'well-being', meaning: 'sức khỏe tinh thần & thể chất', example: 'Mental well-being is as important as physical health.', phonetic: '/ˌwel ˈbiːɪŋ/' },
      { word: 'sedentary', meaning: 'ít vận động', example: 'A sedentary lifestyle increases disease risk.', phonetic: '/ˈsedənteri/' },
      { word: 'nutrition', meaning: 'dinh dưỡng', example: 'Good nutrition is essential for children.', phonetic: '/njuˈtrɪʃən/' },
      { word: 'epidemic', meaning: 'dịch bệnh', example: 'The obesity epidemic affects many countries.', phonetic: '/ˌepɪˈdemɪk/' },
      { word: 'immunity', meaning: 'miễn dịch', example: 'Vaccines help build immunity.', phonetic: '/ɪˈmjuːnəti/' },
      { word: 'diagnosis', meaning: 'chẩn đoán', example: 'Early diagnosis improves survival rates.', phonetic: '/ˌdaɪəɡˈnoʊsɪs/' },
      { word: 'chronic', meaning: 'mãn tính', example: 'Chronic pain affects quality of life.', phonetic: '/ˈkrɒnɪk/' },
      { word: 'rehabilitation', meaning: 'phục hồi chức năng', example: 'Rehabilitation helped him walk again.', phonetic: '/ˌriːəˌbɪlɪˈteɪʃən/' },
      { word: 'obesity', meaning: 'béo phì', example: 'Obesity increases the risk of heart disease.', phonetic: '/oʊˈbiːsəti/' },
      { word: 'substance abuse', meaning: 'lạm dụng chất kích thích', example: 'Substance abuse is a serious social problem.', phonetic: '/ˈsʌbstəns əˈbjuːs/' },
    ]
  },
  {
    id: 'travel-b1',
    title: 'Travel & Tourism',
    icon: '✈️',
    level: 'B1',
    words: [
      { word: 'destination', meaning: 'điểm đến', example: 'Paris is a popular tourist destination.', phonetic: '/ˌdestɪˈneɪʃən/' },
      { word: 'accommodation', meaning: 'chỗ ở', example: 'We booked accommodation near the beach.', phonetic: '/əˌkɒməˈdeɪʃən/' },
      { word: 'luggage', meaning: 'hành lý', example: 'Please check your luggage before departure.', phonetic: '/ˈlʌɡɪdʒ/' },
      { word: 'passenger', meaning: 'hành khách', example: 'All passengers must wear seatbelts.', phonetic: '/ˈpæsɪndʒər/' },
      { word: 'departure', meaning: 'khởi hành', example: 'The departure time is 8:00 AM.', phonetic: '/dɪˈpɑːrtʃər/' },
      { word: 'itinerary', meaning: 'lịch trình', example: 'Our itinerary includes three cities.', phonetic: '/aɪˈtɪnəreri/' },
      { word: 'souvenir', meaning: 'quà lưu niệm', example: 'I bought some souvenirs for my family.', phonetic: '/ˌsuːvəˈnɪər/' },
      { word: 'reservation', meaning: 'đặt trước', example: 'Do you have a reservation?', phonetic: '/ˌrezərˈveɪʃən/' },
      { word: 'currency', meaning: 'tiền tệ', example: 'What currency do they use in Japan?', phonetic: '/ˈkɜːrənsi/' },
      { word: 'delay', meaning: 'sự chậm trễ', example: 'The flight was delayed by two hours.', phonetic: '/dɪˈleɪ/' },
    ]
  },
  {
    id: 'work-b1',
    title: 'Work & Career',
    icon: '💼',
    level: 'B1',
    words: [
      { word: 'salary', meaning: 'lương', example: 'The average salary has increased this year.', phonetic: '/ˈsæləri/' },
      { word: 'colleague', meaning: 'đồng nghiệp', example: 'My colleagues are very friendly.', phonetic: '/ˈkɒliːɡ/' },
      { word: 'interview', meaning: 'phỏng vấn', example: 'I have a job interview tomorrow.', phonetic: '/ˈɪntərvjuː/' },
      { word: 'resume', meaning: 'sơ yếu lý lịch', example: 'Please send your resume to our email.', phonetic: '/rɪˈzjuːmeɪ/' },
      { word: 'promotion', meaning: 'thăng chức', example: 'She got a promotion after two years.', phonetic: '/prəˈmoʊʃən/' },
      { word: 'deadline', meaning: 'hạn chót', example: 'The deadline for the project is Friday.', phonetic: '/ˈdedlaɪn/' },
      { word: 'employee', meaning: 'nhân viên', example: 'The company has 500 employees.', phonetic: '/ɪmˈplɔɪiː/' },
      { word: 'experience', meaning: 'kinh nghiệm', example: 'She has 5 years of teaching experience.', phonetic: '/ɪkˈspɪəriəns/' },
      { word: 'overtime', meaning: 'làm thêm giờ', example: 'I had to work overtime this week.', phonetic: '/ˈoʊvərtaɪm/' },
      { word: 'qualification', meaning: 'bằng cấp / trình độ', example: 'What qualifications do you have?', phonetic: '/ˌkwɒlɪfɪˈkeɪʃən/' },
    ]
  },
  {
    id: 'work-b2',
    title: 'Work & Career',
    icon: '💼',
    level: 'B2',
    words: [
      { word: 'entrepreneurship', meaning: 'tinh thần khởi nghiệp', example: 'Entrepreneurship is encouraged in many countries.', phonetic: '/ˌɒntrəprəˈnɜːrʃɪp/' },
      { word: 'redundancy', meaning: 'sa thải (vì dư thừa)', example: 'Many workers face redundancy due to automation.', phonetic: '/rɪˈdʌndənsi/' },
      { word: 'freelance', meaning: 'làm tự do', example: 'She works as a freelance designer.', phonetic: '/ˈfriːlæns/' },
      { word: 'productivity', meaning: 'năng suất', example: 'Technology can increase workplace productivity.', phonetic: '/ˌprɒdʌkˈtɪvəti/' },
      { word: 'networking', meaning: 'xây dựng mối quan hệ', example: 'Networking is important for career growth.', phonetic: '/ˈnetwɜːrkɪŋ/' },
      { word: 'outsourcing', meaning: 'thuê ngoài', example: 'Many companies outsource IT services.', phonetic: '/ˈaʊtsɔːrsɪŋ/' },
      { word: 'resignation', meaning: 'sự từ chức', example: 'He submitted his resignation letter.', phonetic: '/ˌrezɪɡˈneɪʃən/' },
      { word: 'internship', meaning: 'thực tập', example: 'She completed a summer internship at Google.', phonetic: '/ˈɪntɜːrnʃɪp/' },
      { word: 'collaborate', meaning: 'hợp tác', example: 'Teams collaborate across different departments.', phonetic: '/kəˈlæbəreɪt/' },
      { word: 'appraisal', meaning: 'đánh giá (nhân sự)', example: 'Annual appraisals help employees improve.', phonetic: '/əˈpreɪzəl/' },
    ]
  },
  {
    id: 'society-c1',
    title: 'Society & Culture',
    icon: '🏛️',
    level: 'C1',
    words: [
      { word: 'globalization', meaning: 'toàn cầu hóa', example: 'Globalization has both benefits and drawbacks.', phonetic: '/ˌɡloʊbəlaɪˈzeɪʃən/' },
      { word: 'inequality', meaning: 'bất bình đẳng', example: 'Income inequality is a growing concern.', phonetic: '/ˌɪnɪˈkwɒləti/' },
      { word: 'demographic', meaning: 'nhân khẩu học', example: 'Demographic changes affect economic policy.', phonetic: '/ˌdeməˈɡræfɪk/' },
      { word: 'infrastructure', meaning: 'cơ sở hạ tầng', example: 'The country needs better infrastructure.', phonetic: '/ˈɪnfrəstrʌktʃər/' },
      { word: 'bureaucracy', meaning: 'bộ máy hành chính', example: 'Excessive bureaucracy slows down progress.', phonetic: '/bjʊˈrɒkrəsi/' },
      { word: 'philanthropy', meaning: 'từ thiện', example: 'Philanthropy plays a role in social welfare.', phonetic: '/fɪˈlænθrəpi/' },
      { word: 'assimilation', meaning: 'sự hòa nhập', example: 'Cultural assimilation can be challenging for immigrants.', phonetic: '/əˌsɪmɪˈleɪʃən/' },
      { word: 'sovereignty', meaning: 'chủ quyền', example: 'National sovereignty is a sensitive political issue.', phonetic: '/ˈsɒvrɪnti/' },
      { word: 'legislation', meaning: 'pháp luật / luật pháp', example: 'New legislation was passed to protect workers.', phonetic: '/ˌledʒɪsˈleɪʃən/' },
      { word: 'advocacy', meaning: 'sự vận động / ủng hộ', example: 'Advocacy groups fight for human rights.', phonetic: '/ˈædvəkəsi/' },
    ]
  },
];
