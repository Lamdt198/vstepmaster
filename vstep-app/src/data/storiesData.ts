export interface Story {
  id: string;
  title: string;
  level: 'B1' | 'B2' | 'C1';
  category: 'story' | 'article' | 'news';
  readTime: number; // minutes
  content: string;
  vocabulary: Record<string, string>; // word -> Vietnamese meaning
}

export const stories: Story[] = [
  {
    id: 'st1',
    title: 'The Lost Dog',
    level: 'B1',
    category: 'story',
    readTime: 3,
    content: `One rainy afternoon, a little girl named Lily found a small dog sitting alone under a tree in the park. The dog was shivering and looked very hungry. It had no collar and seemed completely lost.

Lily felt sorry for the dog and decided to take it home. She wrapped it in her jacket and carried it carefully. When she arrived home, her mother was surprised but agreed to let the dog stay for the night.

They gave the dog some warm milk and leftover chicken. The dog ate eagerly and then fell asleep on a soft blanket near the fireplace. Lily named him Lucky because she felt lucky to have found him.

The next morning, Lily and her mother put up posters around the neighborhood asking if anyone had lost a dog. They also posted on social media. Three days later, an elderly man called them. He was overjoyed to hear that his dog had been found.

When the man came to pick up Lucky, Lily felt sad but also happy that the dog was going home. The old man thanked her many times and said she was a very kind girl. He promised that Lily could visit Lucky anytime she wanted.

From that day on, Lily and the old man became good friends. She visited Lucky every weekend, and sometimes the old man would tell her wonderful stories about his adventures when he was young.`,
    vocabulary: {
      'shivering': 'run rẩy',
      'collar': 'vòng cổ (cho chó)',
      'wrapped': 'quấn, bọc',
      'leftover': 'thức ăn thừa',
      'eagerly': 'háo hức, ngấu nghiến',
      'fireplace': 'lò sưởi',
      'neighborhood': 'khu phố',
      'elderly': 'lớn tuổi',
      'overjoyed': 'vô cùng vui mừng',
      'adventures': 'cuộc phiêu lưu',
    }
  },
  {
    id: 'st2',
    title: 'Why Sleep Matters for Students',
    level: 'B2',
    category: 'article',
    readTime: 4,
    content: `Sleep is one of the most important factors in academic success, yet it is often the first thing students sacrifice when they feel overwhelmed by deadlines and exams. Research consistently shows that adequate sleep is essential not only for physical health but also for cognitive function, memory consolidation, and emotional well-being.

During sleep, the brain processes and organizes information gathered throughout the day. This process, known as memory consolidation, converts short-term memories into long-term ones. Studies at Harvard Medical School have demonstrated that students who get at least seven hours of sleep after learning new material retain significantly more information than those who stay up all night studying.

Furthermore, sleep deprivation has been linked to decreased attention span, impaired decision-making, and reduced creativity. A study published in the journal Nature found that after just one night of poor sleep, cognitive performance can decrease by up to 25 percent. This means that the extra hours spent studying instead of sleeping may actually be counterproductive.

The relationship between sleep and mental health is equally concerning. Chronic sleep deprivation increases the risk of anxiety and depression, conditions that are already prevalent among university students. The pressure to maintain high grades while balancing social life and part-time work often leads to a vicious cycle of poor sleep habits.

Experts recommend that young adults aim for seven to nine hours of quality sleep per night. Establishing a consistent sleep schedule, avoiding screens before bedtime, and creating a comfortable sleep environment are simple strategies that can make a significant difference in both academic performance and overall well-being.`,
    vocabulary: {
      'sacrifice': 'hy sinh',
      'overwhelmed': 'quá tải, choáng ngợp',
      'adequate': 'đầy đủ, thỏa đáng',
      'consolidation': 'sự củng cố',
      'retain': 'giữ lại, ghi nhớ',
      'deprivation': 'sự thiếu hụt',
      'impaired': 'bị suy giảm',
      'counterproductive': 'phản tác dụng',
      'prevalent': 'phổ biến',
      'vicious cycle': 'vòng luẩn quẩn',
      'establishing': 'thiết lập',
      'consistent': 'nhất quán, đều đặn',
    }
  },
  {
    id: 'st3',
    title: 'The Coffee Shop Encounter',
    level: 'B1',
    category: 'story',
    readTime: 3,
    content: `Every morning, David went to the same coffee shop on his way to work. He always ordered a large black coffee and sat by the window, reading the newspaper on his phone. The barista, a friendly young woman named Mai, always greeted him with a warm smile.

One Tuesday morning, David noticed something different. There was a woman sitting in his usual spot. She had long dark hair and was reading a thick novel. David felt slightly annoyed but chose another table nearby.

As he was drinking his coffee, he accidentally knocked over the sugar container. The sugar spilled all over the table and onto the floor. He felt embarrassed and quickly tried to clean it up. The woman from his usual table stood up and helped him.

"Don't worry, it happens to everyone," she said with a kind smile. Her name was Sarah, and she was new to the city. She had just moved here for a teaching job at the local university.

They started talking and discovered they had many things in common. Both loved reading, enjoyed hiking on weekends, and had traveled to Japan the previous year. By the time they finished their coffees, they had exchanged phone numbers.

From that day on, David never minded when someone else sat in his usual spot. Sometimes, the best things in life happen when our routine is disrupted.`,
    vocabulary: {
      'barista': 'nhân viên pha cà phê',
      'greeted': 'chào đón',
      'slightly': 'hơi, một chút',
      'annoyed': 'khó chịu, bực mình',
      'accidentally': 'vô tình',
      'knocked over': 'làm đổ',
      'spilled': 'đổ, tràn',
      'embarrassed': 'xấu hổ, ngại',
      'exchanged': 'trao đổi',
      'disrupted': 'bị phá vỡ, gián đoạn',
      'routine': 'thói quen, lịch trình',
    }
  },
  {
    id: 'st4',
    title: 'The Future of Remote Work',
    level: 'B2',
    category: 'article',
    readTime: 5,
    content: `The COVID-19 pandemic fundamentally transformed the way millions of people work. What was once considered a rare privilege has become the new normal for many professionals worldwide. As we move further from the pandemic era, the debate about the future of remote work continues to evolve.

Proponents of remote work point to numerous advantages. Employees save time and money on commuting, enjoy greater flexibility in managing their schedules, and often report higher job satisfaction. Companies benefit from reduced overhead costs, access to a global talent pool, and in many cases, increased productivity.

However, critics argue that remote work comes with significant drawbacks. The lack of face-to-face interaction can lead to feelings of isolation and disconnection from colleagues. Collaboration and spontaneous creativity may suffer when team members cannot easily gather in the same physical space. Additionally, the boundaries between work and personal life often become blurred, leading to burnout.

Recent surveys suggest that the most popular model going forward is a hybrid approach, where employees split their time between the office and home. According to a 2024 McKinsey report, approximately 58 percent of workers now have the option to work remotely at least one day per week, while 35 percent can work from home full-time.

The implications extend beyond individual workers and companies. Remote work is reshaping urban planning, transportation systems, and even the housing market. Smaller cities and rural areas are experiencing population growth as workers discover they no longer need to live near their offices.

Whatever the future holds, it is clear that the traditional nine-to-five office model will never fully return. The challenge for organizations is to find the right balance that maximizes productivity while maintaining employee well-being and company culture.`,
    vocabulary: {
      'fundamentally': 'về cơ bản',
      'privilege': 'đặc quyền',
      'proponents': 'người ủng hộ',
      'commuting': 'đi lại (làm việc)',
      'overhead costs': 'chi phí vận hành',
      'drawbacks': 'nhược điểm',
      'isolation': 'sự cô lập',
      'spontaneous': 'tự phát, ngẫu hứng',
      'blurred': 'mờ nhạt, không rõ ràng',
      'burnout': 'kiệt sức',
      'hybrid': 'kết hợp, lai',
      'implications': 'hàm ý, tác động',
      'reshaping': 'định hình lại',
    }
  },
  {
    id: 'st5',
    title: 'The Digital Divide in Education',
    level: 'C1',
    category: 'article',
    readTime: 6,
    content: `The rapid digitalization of education has brought unprecedented opportunities for learning, but it has simultaneously exposed and exacerbated existing inequalities. The digital divide—the gap between those who have access to technology and those who do not—has become one of the most pressing challenges in contemporary education policy.

In developing nations, millions of students lack basic internet connectivity, let alone access to devices suitable for online learning. During the pandemic, UNESCO estimated that approximately 1.6 billion learners were affected by school closures, and a significant proportion of these students had no means to continue their education remotely. This disparity disproportionately affects children from low-income families, rural communities, and marginalized groups.

Even in affluent societies, the divide manifests in subtler ways. While most households may have internet access, the quality of that connection, the availability of a quiet study space, and the level of parental support vary enormously. Students who share a single device among several siblings or who rely on mobile data with limited bandwidth are at a considerable disadvantage compared to peers with dedicated laptops and high-speed fiber connections.

The consequences extend far beyond academic performance. Students on the wrong side of the digital divide miss out on developing crucial twenty-first-century skills: digital literacy, online collaboration, information evaluation, and technological fluency. These competencies are increasingly prerequisites for employment in the modern economy.

Addressing this challenge requires a multifaceted approach. Governments must invest in broadband infrastructure, particularly in underserved areas. Schools need sustainable funding for devices and technical support. Teacher training programs should incorporate digital pedagogy as a core component. And technology companies have a responsibility to develop accessible, low-bandwidth solutions that do not require expensive hardware.

The stakes could not be higher. If the digital divide in education is not addressed urgently, we risk creating a generation permanently locked out of economic opportunity—a outcome that would undermine social cohesion and democratic participation for decades to come.`,
    vocabulary: {
      'unprecedented': 'chưa từng có',
      'exacerbated': 'làm trầm trọng thêm',
      'contemporary': 'đương đại',
      'connectivity': 'khả năng kết nối',
      'disparity': 'sự chênh lệch',
      'disproportionately': 'không cân xứng',
      'marginalized': 'bị gạt ra ngoài lề',
      'affluent': 'giàu có',
      'manifests': 'biểu hiện',
      'bandwidth': 'băng thông',
      'competencies': 'năng lực',
      'prerequisites': 'điều kiện tiên quyết',
      'multifaceted': 'đa chiều, nhiều khía cạnh',
      'pedagogy': 'phương pháp sư phạm',
      'cohesion': 'sự gắn kết',
      'undermine': 'làm suy yếu',
    }
  },
];
