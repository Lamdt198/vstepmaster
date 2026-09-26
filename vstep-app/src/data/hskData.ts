// ═══════════════════ HSK (Chinese) Data - Completely separate from VSTEP ═══════════════════

export interface HskWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
  example?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
}

export interface HskLevel {
  id: string;
  level: number; // 1-6
  title: string;
  words: HskWord[];
}

export interface HskGrammar {
  id: string;
  level: number;
  title: string;
  structure: string;
  explanation: string;
  examples: { chinese: string; pinyin: string; meaning: string }[];
}

export interface HskReading {
  id: string;
  level: number;
  title: string;
  text: string;
  pinyin: string;
  translation: string;
  questions: { question: string; options: string[]; correctAnswer: number }[];
}


// ═══════════════════ HSK 1 Vocabulary (150 words) - Sample 30 ═══════════════════
export const hskVocabulary: HskLevel[] = [
  {
    id: 'hsk1',
    level: 1,
    title: 'HSK 1 - Cơ bản',
    words: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'xin chào', example: '你好，我是小明。', examplePinyin: 'Nǐ hǎo, wǒ shì Xiǎo Míng.', exampleMeaning: 'Xin chào, tôi là Tiểu Minh.' },
      { hanzi: '谢谢', pinyin: 'xiè xie', meaning: 'cảm ơn', example: '谢谢你的帮助。', examplePinyin: 'Xiè xie nǐ de bāngzhù.', exampleMeaning: 'Cảm ơn sự giúp đỡ của bạn.' },
      { hanzi: '再见', pinyin: 'zài jiàn', meaning: 'tạm biệt', example: '明天再见！', examplePinyin: 'Míngtiān zàijiàn!', exampleMeaning: 'Ngày mai gặp lại!' },
      { hanzi: '我', pinyin: 'wǒ', meaning: 'tôi', example: '我是学生。', examplePinyin: 'Wǒ shì xuéshēng.', exampleMeaning: 'Tôi là học sinh.' },
      { hanzi: '你', pinyin: 'nǐ', meaning: 'bạn', example: '你叫什么名字？', examplePinyin: 'Nǐ jiào shénme míngzi?', exampleMeaning: 'Bạn tên gì?' },
      { hanzi: '他', pinyin: 'tā', meaning: 'anh ấy', example: '他是我的朋友。', examplePinyin: 'Tā shì wǒ de péngyou.', exampleMeaning: 'Anh ấy là bạn của tôi.' },
      { hanzi: '她', pinyin: 'tā', meaning: 'cô ấy', example: '她很漂亮。', examplePinyin: 'Tā hěn piàoliang.', exampleMeaning: 'Cô ấy rất đẹp.' },
      { hanzi: '是', pinyin: 'shì', meaning: 'là', example: '这是我的书。', examplePinyin: 'Zhè shì wǒ de shū.', exampleMeaning: 'Đây là sách của tôi.' },
      { hanzi: '不', pinyin: 'bù', meaning: 'không', example: '我不喝咖啡。', examplePinyin: 'Wǒ bù hē kāfēi.', exampleMeaning: 'Tôi không uống cà phê.' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'tốt', example: '今天天气很好。', examplePinyin: 'Jīntiān tiānqì hěn hǎo.', exampleMeaning: 'Hôm nay thời tiết rất tốt.' },
      { hanzi: '人', pinyin: 'rén', meaning: 'người', example: '这个人是谁？', examplePinyin: 'Zhège rén shì shéi?', exampleMeaning: 'Người này là ai?' },
      { hanzi: '大', pinyin: 'dà', meaning: 'lớn', example: '这个房间很大。', examplePinyin: 'Zhège fángjiān hěn dà.', exampleMeaning: 'Phòng này rất lớn.' },
      { hanzi: '小', pinyin: 'xiǎo', meaning: 'nhỏ', example: '我有一只小猫。', examplePinyin: 'Wǒ yǒu yì zhī xiǎo māo.', exampleMeaning: 'Tôi có một con mèo nhỏ.' },
      { hanzi: '学生', pinyin: 'xuéshēng', meaning: 'học sinh', example: '我们都是学生。', examplePinyin: 'Wǒmen dōu shì xuéshēng.', exampleMeaning: 'Chúng tôi đều là học sinh.' },
      { hanzi: '老师', pinyin: 'lǎoshī', meaning: 'giáo viên', example: '她是我们的老师。', examplePinyin: 'Tā shì wǒmen de lǎoshī.', exampleMeaning: 'Cô ấy là giáo viên của chúng tôi.' },
      { hanzi: '朋友', pinyin: 'péngyou', meaning: 'bạn bè', example: '他是我最好的朋友。', examplePinyin: 'Tā shì wǒ zuì hǎo de péngyou.', exampleMeaning: 'Anh ấy là bạn thân nhất của tôi.' },
      { hanzi: '家', pinyin: 'jiā', meaning: 'nhà / gia đình', example: '我的家在河内。', examplePinyin: 'Wǒ de jiā zài Hénèi.', exampleMeaning: 'Nhà tôi ở Hà Nội.' },
      { hanzi: '水', pinyin: 'shuǐ', meaning: 'nước', example: '请给我一杯水。', examplePinyin: 'Qǐng gěi wǒ yì bēi shuǐ.', exampleMeaning: 'Xin cho tôi một cốc nước.' },
      { hanzi: '吃', pinyin: 'chī', meaning: 'ăn', example: '你想吃什么？', examplePinyin: 'Nǐ xiǎng chī shénme?', exampleMeaning: 'Bạn muốn ăn gì?' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'uống', example: '我喜欢喝茶。', examplePinyin: 'Wǒ xǐhuān hē chá.', exampleMeaning: 'Tôi thích uống trà.' },
      { hanzi: '看', pinyin: 'kàn', meaning: 'nhìn / xem', example: '我在看电视。', examplePinyin: 'Wǒ zài kàn diànshì.', exampleMeaning: 'Tôi đang xem TV.' },
      { hanzi: '听', pinyin: 'tīng', meaning: 'nghe', example: '我喜欢听音乐。', examplePinyin: 'Wǒ xǐhuān tīng yīnyuè.', exampleMeaning: 'Tôi thích nghe nhạc.' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'nói', example: '你会说中文吗？', examplePinyin: 'Nǐ huì shuō Zhōngwén ma?', exampleMeaning: 'Bạn biết nói tiếng Trung không?' },
      { hanzi: '读', pinyin: 'dú', meaning: 'đọc', example: '我每天读书。', examplePinyin: 'Wǒ měitiān dú shū.', exampleMeaning: 'Tôi đọc sách mỗi ngày.' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'viết', example: '请写你的名字。', examplePinyin: 'Qǐng xiě nǐ de míngzi.', exampleMeaning: 'Xin hãy viết tên của bạn.' },
      { hanzi: '今天', pinyin: 'jīntiān', meaning: 'hôm nay', example: '今天星期几？', examplePinyin: 'Jīntiān xīngqī jǐ?', exampleMeaning: 'Hôm nay thứ mấy?' },
      { hanzi: '明天', pinyin: 'míngtiān', meaning: 'ngày mai', example: '明天我不上班。', examplePinyin: 'Míngtiān wǒ bù shàngbān.', exampleMeaning: 'Ngày mai tôi không đi làm.' },
      { hanzi: '昨天', pinyin: 'zuótiān', meaning: 'hôm qua', example: '昨天我去了超市。', examplePinyin: 'Zuótiān wǒ qùle chāoshì.', exampleMeaning: 'Hôm qua tôi đi siêu thị.' },
      { hanzi: '钱', pinyin: 'qián', meaning: 'tiền', example: '这个多少钱？', examplePinyin: 'Zhège duōshao qián?', exampleMeaning: 'Cái này bao nhiêu tiền?' },
      { hanzi: '爱', pinyin: 'ài', meaning: 'yêu', example: '我爱我的家人。', examplePinyin: 'Wǒ ài wǒ de jiārén.', exampleMeaning: 'Tôi yêu gia đình tôi.' },
    ]
  },
  {
    id: 'hsk2',
    level: 2,
    title: 'HSK 2 - Sơ cấp',
    words: [
      { hanzi: '因为', pinyin: 'yīnwèi', meaning: 'bởi vì', example: '因为下雨，我没出门。', examplePinyin: 'Yīnwèi xià yǔ, wǒ méi chūmén.', exampleMeaning: 'Vì mưa nên tôi không ra ngoài.' },
      { hanzi: '所以', pinyin: 'suǒyǐ', meaning: 'cho nên', example: '我很累，所以想休息。', examplePinyin: 'Wǒ hěn lèi, suǒyǐ xiǎng xiūxi.', exampleMeaning: 'Tôi rất mệt, cho nên muốn nghỉ ngơi.' },
      { hanzi: '但是', pinyin: 'dànshì', meaning: 'nhưng mà', example: '他很忙，但是很开心。', examplePinyin: 'Tā hěn máng, dànshì hěn kāixīn.', exampleMeaning: 'Anh ấy rất bận, nhưng rất vui.' },
      { hanzi: '已经', pinyin: 'yǐjīng', meaning: 'đã rồi', example: '我已经吃过了。', examplePinyin: 'Wǒ yǐjīng chīguò le.', exampleMeaning: 'Tôi đã ăn rồi.' },
      { hanzi: '可能', pinyin: 'kěnéng', meaning: 'có thể', example: '明天可能下雨。', examplePinyin: 'Míngtiān kěnéng xià yǔ.', exampleMeaning: 'Ngày mai có thể mưa.' },
      { hanzi: '一起', pinyin: 'yìqǐ', meaning: 'cùng nhau', example: '我们一起去吧！', examplePinyin: 'Wǒmen yìqǐ qù ba!', exampleMeaning: 'Chúng ta cùng đi nhé!' },
      { hanzi: '准备', pinyin: 'zhǔnbèi', meaning: 'chuẩn bị', example: '你准备好了吗？', examplePinyin: 'Nǐ zhǔnbèi hǎo le ma?', exampleMeaning: 'Bạn chuẩn bị xong chưa?' },
      { hanzi: '问题', pinyin: 'wèntí', meaning: 'vấn đề / câu hỏi', example: '这个问题很难。', examplePinyin: 'Zhège wèntí hěn nán.', exampleMeaning: 'Câu hỏi này rất khó.' },
      { hanzi: '考试', pinyin: 'kǎoshì', meaning: 'thi / kiểm tra', example: '下周有考试。', examplePinyin: 'Xià zhōu yǒu kǎoshì.', exampleMeaning: 'Tuần sau có thi.' },
      { hanzi: '生日', pinyin: 'shēngrì', meaning: 'sinh nhật', example: '今天是我的生日。', examplePinyin: 'Jīntiān shì wǒ de shēngrì.', exampleMeaning: 'Hôm nay là sinh nhật tôi.' },
      { hanzi: '觉得', pinyin: 'juéde', meaning: 'cảm thấy / cho rằng', example: '我觉得这本书很好。', examplePinyin: 'Wǒ juéde zhè běn shū hěn hǎo.', exampleMeaning: 'Tôi thấy cuốn sách này rất hay.' },
      { hanzi: '知道', pinyin: 'zhīdao', meaning: 'biết', example: '你知道他在哪儿吗？', examplePinyin: 'Nǐ zhīdao tā zài nǎr ma?', exampleMeaning: 'Bạn biết anh ấy ở đâu không?' },
      { hanzi: '帮助', pinyin: 'bāngzhù', meaning: 'giúp đỡ', example: '谢谢你帮助我。', examplePinyin: 'Xiè xie nǐ bāngzhù wǒ.', exampleMeaning: 'Cảm ơn bạn giúp đỡ tôi.' },
      { hanzi: '快乐', pinyin: 'kuàilè', meaning: 'vui vẻ / hạnh phúc', example: '祝你生日快乐！', examplePinyin: 'Zhù nǐ shēngrì kuàilè!', exampleMeaning: 'Chúc bạn sinh nhật vui vẻ!' },
      { hanzi: '运动', pinyin: 'yùndòng', meaning: 'thể thao / vận động', example: '我每天做运动。', examplePinyin: 'Wǒ měitiān zuò yùndòng.', exampleMeaning: 'Tôi tập thể dục mỗi ngày.' },
    ]
  },
  {
    id: 'hsk3',
    level: 3,
    title: 'HSK 3 - Trung cấp',
    words: [
      { hanzi: '环境', pinyin: 'huánjìng', meaning: 'môi trường', example: '保护环境很重要。', examplePinyin: 'Bǎohù huánjìng hěn zhòngyào.', exampleMeaning: 'Bảo vệ môi trường rất quan trọng.' },
      { hanzi: '经济', pinyin: 'jīngjì', meaning: 'kinh tế', example: '中国经济发展很快。', examplePinyin: 'Zhōngguó jīngjì fāzhǎn hěn kuài.', exampleMeaning: 'Kinh tế Trung Quốc phát triển rất nhanh.' },
      { hanzi: '社会', pinyin: 'shèhuì', meaning: 'xã hội', example: '这是一个社会问题。', examplePinyin: 'Zhè shì yí gè shèhuì wèntí.', exampleMeaning: 'Đây là một vấn đề xã hội.' },
      { hanzi: '文化', pinyin: 'wénhuà', meaning: 'văn hóa', example: '中国文化很丰富。', examplePinyin: 'Zhōngguó wénhuà hěn fēngfù.', exampleMeaning: 'Văn hóa Trung Quốc rất phong phú.' },
      { hanzi: '教育', pinyin: 'jiàoyù', meaning: 'giáo dục', example: '教育对每个人都很重要。', examplePinyin: 'Jiàoyù duì měi gè rén dōu hěn zhòngyào.', exampleMeaning: 'Giáo dục rất quan trọng với mỗi người.' },
      { hanzi: '影响', pinyin: 'yǐngxiǎng', meaning: 'ảnh hưởng', example: '这件事影响了很多人。', examplePinyin: 'Zhè jiàn shì yǐngxiǎngle hěn duō rén.', exampleMeaning: 'Việc này ảnh hưởng nhiều người.' },
      { hanzi: '发展', pinyin: 'fāzhǎn', meaning: 'phát triển', example: '科技发展很快。', examplePinyin: 'Kējì fāzhǎn hěn kuài.', exampleMeaning: 'Khoa học công nghệ phát triển rất nhanh.' },
      { hanzi: '重要', pinyin: 'zhòngyào', meaning: 'quan trọng', example: '健康比金钱更重要。', examplePinyin: 'Jiànkāng bǐ jīnqián gèng zhòngyào.', exampleMeaning: 'Sức khỏe quan trọng hơn tiền bạc.' },
      { hanzi: '需要', pinyin: 'xūyào', meaning: 'cần', example: '我需要你的帮助。', examplePinyin: 'Wǒ xūyào nǐ de bāngzhù.', exampleMeaning: 'Tôi cần sự giúp đỡ của bạn.' },
      { hanzi: '机会', pinyin: 'jīhuì', meaning: 'cơ hội', example: '这是一个好机会。', examplePinyin: 'Zhè shì yí gè hǎo jīhuì.', exampleMeaning: 'Đây là một cơ hội tốt.' },
      { hanzi: '关系', pinyin: 'guānxi', meaning: 'mối quan hệ', example: '我们的关系很好。', examplePinyin: 'Wǒmen de guānxi hěn hǎo.', exampleMeaning: 'Mối quan hệ của chúng tôi rất tốt.' },
      { hanzi: '决定', pinyin: 'juédìng', meaning: 'quyết định', example: '我决定去中国留学。', examplePinyin: 'Wǒ juédìng qù Zhōngguó liúxué.', exampleMeaning: 'Tôi quyết định đi du học Trung Quốc.' },
      { hanzi: '经验', pinyin: 'jīngyàn', meaning: 'kinh nghiệm', example: '他有很多工作经验。', examplePinyin: 'Tā yǒu hěn duō gōngzuò jīngyàn.', exampleMeaning: 'Anh ấy có nhiều kinh nghiệm làm việc.' },
      { hanzi: '提高', pinyin: 'tígāo', meaning: 'nâng cao', example: '我想提高我的中文水平。', examplePinyin: 'Wǒ xiǎng tígāo wǒ de Zhōngwén shuǐpíng.', exampleMeaning: 'Tôi muốn nâng cao trình độ tiếng Trung.' },
      { hanzi: '解决', pinyin: 'jiějué', meaning: 'giải quyết', example: '我们必须解决这个问题。', examplePinyin: 'Wǒmen bìxū jiějué zhège wèntí.', exampleMeaning: 'Chúng ta phải giải quyết vấn đề này.' },
    ]
  },
];

// ═══════════════════ HSK Grammar ═══════════════════
export const hskGrammar: HskGrammar[] = [
  {
    id: 'g1', level: 1, title: 'Câu khẳng định với 是 (shì)',
    structure: 'A + 是 + B',
    explanation: '是 (shì) dùng để nối chủ ngữ với danh từ/cụm danh từ, tương tự "là" trong tiếng Việt.',
    examples: [
      { chinese: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', meaning: 'Tôi là học sinh.' },
      { chinese: '他是中国人。', pinyin: 'Tā shì Zhōngguó rén.', meaning: 'Anh ấy là người Trung Quốc.' },
      { chinese: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', meaning: 'Đây là sách của tôi.' },
    ]
  },
  {
    id: 'g2', level: 1, title: 'Phủ định với 不 (bù)',
    structure: 'Chủ ngữ + 不 + Động từ/Tính từ',
    explanation: '不 đặt trước động từ hoặc tính từ để phủ định. Lưu ý: trước 是 dùng 不是, trước 有 dùng 没有.',
    examples: [
      { chinese: '我不是医生。', pinyin: 'Wǒ bú shì yīshēng.', meaning: 'Tôi không phải bác sĩ.' },
      { chinese: '他不喝咖啡。', pinyin: 'Tā bù hē kāfēi.', meaning: 'Anh ấy không uống cà phê.' },
      { chinese: '今天不冷。', pinyin: 'Jīntiān bù lěng.', meaning: 'Hôm nay không lạnh.' },
    ]
  },
  {
    id: 'g3', level: 2, title: 'Bổ ngữ kết quả (结果补语)',
    structure: 'Động từ + 结果补语 (好/完/到/见...)',
    explanation: 'Bổ ngữ kết quả đặt sau động từ để chỉ kết quả của hành động.',
    examples: [
      { chinese: '我做完作业了。', pinyin: 'Wǒ zuòwán zuòyè le.', meaning: 'Tôi làm xong bài tập rồi.' },
      { chinese: '我听到了。', pinyin: 'Wǒ tīngdào le.', meaning: 'Tôi nghe thấy rồi.' },
      { chinese: '饭做好了。', pinyin: 'Fàn zuòhǎo le.', meaning: 'Cơm nấu xong rồi.' },
    ]
  },
  {
    id: 'g4', level: 2, title: 'So sánh với 比 (bǐ)',
    structure: 'A + 比 + B + Tính từ',
    explanation: '比 dùng để so sánh hơn giữa hai đối tượng.',
    examples: [
      { chinese: '他比我高。', pinyin: 'Tā bǐ wǒ gāo.', meaning: 'Anh ấy cao hơn tôi.' },
      { chinese: '今天比昨天热。', pinyin: 'Jīntiān bǐ zuótiān rè.', meaning: 'Hôm nay nóng hơn hôm qua.' },
      { chinese: '中文比英文难。', pinyin: 'Zhōngwén bǐ Yīngwén nán.', meaning: 'Tiếng Trung khó hơn tiếng Anh.' },
    ]
  },
  {
    id: 'g5', level: 3, title: '把 (bǎ) - Câu xử trí',
    structure: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Bổ ngữ',
    explanation: '把 dùng khi muốn nhấn mạnh hành động tác động lên đối tượng cụ thể, thường có kết quả rõ ràng.',
    examples: [
      { chinese: '请把门关上。', pinyin: 'Qǐng bǎ mén guānshang.', meaning: 'Xin hãy đóng cửa lại.' },
      { chinese: '我把作业做完了。', pinyin: 'Wǒ bǎ zuòyè zuòwán le.', meaning: 'Tôi đã làm xong bài tập.' },
      { chinese: '他把书放在桌子上。', pinyin: 'Tā bǎ shū fàng zài zhuōzi shàng.', meaning: 'Anh ấy đặt sách lên bàn.' },
    ]
  },
];


// ═══════════════════ HSK Reading Passages ═══════════════════
export const hskReadings: HskReading[] = [
  {
    id: 'hr1', level: 1, title: '我的一天',
    text: '我每天早上七点起床。起床以后，我先洗脸刷牙，然后吃早饭。我八点去学校上课。中午十二点吃午饭。下午五点回家。晚上我做作业，看电视，十点睡觉。',
    pinyin: 'Wǒ měitiān zǎoshang qī diǎn qǐchuáng. Qǐchuáng yǐhòu, wǒ xiān xǐliǎn shuāyá, ránhòu chī zǎofàn. Wǒ bā diǎn qù xuéxiào shàngkè. Zhōngwǔ shí\'èr diǎn chī wǔfàn. Xiàwǔ wǔ diǎn huí jiā. Wǎnshang wǒ zuò zuòyè, kàn diànshì, shí diǎn shuìjiào.',
    translation: 'Mỗi ngày tôi dậy lúc 7 giờ sáng. Sau khi dậy, tôi rửa mặt đánh răng trước, sau đó ăn sáng. 8 giờ tôi đến trường học. Trưa 12 giờ ăn trưa. Chiều 5 giờ về nhà. Tối tôi làm bài tập, xem TV, 10 giờ đi ngủ.',
    questions: [
      { question: '他几点起床？', options: ['六点', '七点', '八点', '九点'], correctAnswer: 1 },
      { question: '他起床以后先做什么？', options: ['吃早饭', '洗脸刷牙', '去学校', '做作业'], correctAnswer: 1 },
      { question: '他几点去学校？', options: ['七点', '七点半', '八点', '八点半'], correctAnswer: 2 },
      { question: '他晚上做什么？', options: ['上课', '做作业和看电视', '去超市', '运动'], correctAnswer: 1 },
    ]
  },
  {
    id: 'hr2', level: 2, title: '去超市买东西',
    text: '昨天下午，我和妈妈一起去超市买东西。超市里的东西很多，有水果、蔬菜、肉和饮料。妈妈买了苹果、鸡蛋和牛奶。我买了一瓶果汁和一包饼干。超市的东西不太贵，我们一共花了八十五块钱。回家以后，妈妈做了一顿很好吃的晚饭。',
    pinyin: 'Zuótiān xiàwǔ, wǒ hé māma yìqǐ qù chāoshì mǎi dōngxi. Chāoshì lǐ de dōngxi hěn duō, yǒu shuǐguǒ, shūcài, ròu hé yǐnliào. Māma mǎile píngguǒ, jīdàn hé niúnǎi. Wǒ mǎile yì píng guǒzhī hé yì bāo bǐnggān. Chāoshì de dōngxi bú tài guì, wǒmen yígòng huāle bāshíwǔ kuài qián. Huí jiā yǐhòu, māma zuòle yí dùn hěn hǎochī de wǎnfàn.',
    translation: 'Chiều hôm qua, tôi cùng mẹ đi siêu thị mua đồ. Siêu thị có rất nhiều thứ: hoa quả, rau, thịt và đồ uống. Mẹ mua táo, trứng gà và sữa bò. Tôi mua một chai nước ép và một gói bánh quy. Đồ trong siêu thị không đắt lắm, tổng cộng chúng tôi tiêu 85 tệ. Về nhà, mẹ nấu một bữa tối rất ngon.',
    questions: [
      { question: '他们什么时候去超市？', options: ['今天上午', '昨天上午', '昨天下午', '今天下午'], correctAnswer: 2 },
      { question: '妈妈买了什么？', options: ['果汁和饼干', '苹果、鸡蛋和牛奶', '蔬菜和肉', '水果和饮料'], correctAnswer: 1 },
      { question: '他们一共花了多少钱？', options: ['58块', '75块', '85块', '95块'], correctAnswer: 2 },
      { question: '回家以后谁做了晚饭？', options: ['他', '爸爸', '妈妈', '他们一起'], correctAnswer: 2 },
    ]
  },
];
