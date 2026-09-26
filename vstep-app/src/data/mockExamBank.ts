import { ListeningTest, ReadingPassage, WritingTask, SpeakingTopic } from './vstepData';
import { listeningTests } from './listeningData';
import { readingPassages } from './readingData';
import { writingTasks } from './writingData';
import { speakingTopics } from './speakingData';

export interface MockExamSet {
  id: string;
  code: string;
  title: string;
  level: 'B1' | 'B2' | 'C1' | 'B1-B2-C1';
  targetBand: string;
  source: string;
  durationMinutes: number;
  totalQuestions: number;
  participantsCount: number;
  rating: number;
  tags: string[];
  description: string;
  listening: {
    part1: ListeningTest;
    part2: ListeningTest;
    part3: ListeningTest;
  };
  reading: {
    passages: ReadingPassage[];
  };
  writing: {
    task1: WritingTask;
    task2: WritingTask;
  };
  speaking: {
    part1: SpeakingTopic;
    part2: SpeakingTopic;
    part3: SpeakingTopic;
  };
}

// Helper lookup functions
const getPassage = (id: string): ReadingPassage => readingPassages.find(r => r.id === id) || readingPassages[0];
const getListening = (id: string): ListeningTest => listeningTests.find(l => l.id === id) || listeningTests[0];
const getWriting = (id: string): WritingTask => writingTasks.find(w => w.id === id) || writingTasks[0];
const getSpeaking = (id: string): SpeakingTopic => speakingTopics.find(s => s.id === id) || speakingTopics[0];

export const initialMockExams: MockExamSet[] = [
  // ── ĐỀ 01: BỘ GD&ĐT CHUẨN QUỐC GIA 2026 ──────────────────────────────────────────
  {
    id: 'vstep-moet-01',
    code: 'DT-MOET-2026-01',
    title: 'Đề thi Chuẩn VSTEP 4 Kỹ năng (Bộ GD&ĐT - Đề Tổng hợp Quốc gia 2026)',
    level: 'B1-B2-C1',
    targetBand: 'B1 - C1 Chuẩn Quốc gia',
    source: 'Bộ Giáo dục & Đào tạo',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 8420,
    rating: 4.9,
    tags: ['Bộ GD&ĐT', 'Chuẩn VSTEP', 'Đầy đủ 4 kỹ năng', 'Đề chính thức'],
    description: 'Bộ đề thi thử tiêu chuẩn quốc gia bám sát định dạng VSTEP 3-5 của Bộ GD&ĐT. Bao gồm đầy đủ 3 phần Nghe (35 câu), 4 bài Đọc hiểu học thuật (40 câu), 2 bài Viết thư & Luận, 3 phần Nói tương tác.',
    listening: {
      part1: getListening('l1'),
      part2: getListening('l2'),
      part3: getListening('l4'),
    },
    reading: {
      passages: [
        getPassage('r4'), // Hong Kong (B1)
        getPassage('r5'), // Constellations (B2)
        getPassage('r6'), // Coffee Origin & Spread (B1-B2)
        getPassage('r7'), // Great Barrier Reef & Bleaching (B2)
      ]
    },
    writing: {
      task1: getWriting('w1'), // Leave request email
      task2: getWriting('w2'), // Social media essay
    },
    speaking: {
      part1: getSpeaking('s1'),
      part2: getSpeaking('s2'),
      part3: getSpeaking('s3'),
    }
  },

  // ── ĐỀ 02: ĐH NGOẠI NGỮ - ĐHQGHN (ULIS TEST 02) ──────────────────────────────────
  {
    id: 'vstep-ulis-02',
    code: 'DT-ULIS-B2-02',
    title: 'Đề Thi Thử VSTEP Chuyên Sâu ĐH Ngoại ngữ - ĐHQGHN (ULIS Test 02)',
    level: 'B2',
    targetBand: 'Mục tiêu B2 Vững vàng (6.0 - 8.0)',
    source: 'Trường ĐH Ngoại ngữ - ĐHQGHN',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 6810,
    rating: 4.9,
    tags: ['ULIS ĐHQGHN', 'B2 Trọng điểm', 'Nghe hội thoại dài', 'Đề Hot'],
    description: 'Bộ đề khảo sát năng lực tiếng Anh biên soạn bởi các chuyên gia khảo thí ULIS, chú trọng vào kỹ năng đọc hiểu văn bản khoa học tự nhiên, xã hội và thảo luận giải pháp nói Part 2.',
    listening: {
      part1: getListening('l8'),
      part2: getListening('l3'),
      part3: getListening('l5'),
    },
    reading: {
      passages: [
        getPassage('r8'),  // Sleep Architecture & Memory (B2)
        getPassage('r9'),  // Urban Heat Islands (C1)
        getPassage('r10'), // The Silk Road (B1-B2)
        getPassage('r11'), // Bioluminescence in Marine Organisms (B2)
      ]
    },
    writing: {
      task1: getWriting('w5'), // Keynote invitation
      task2: getWriting('w6'), // Remote work essay
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s4'),
      part3: getSpeaking('s5'),
    }
  },

  // ── ĐỀ 03: ĐH SƯ PHẠM TP.HCM (HCMUE OFFICIAL MOCK) ──────────────────────────────
  {
    id: 'vstep-hcmue-03',
    code: 'DT-HCMUE-2026-03',
    title: 'Bộ đề Khảo sát Năng lực VSTEP ĐH Sư Phạm TP.HCM (HCMUE Official Mock)',
    level: 'B1-B2-C1',
    targetBand: 'B1 - B2 Chuẩn Đầu ra & Thạc sĩ',
    source: 'Trường ĐH Sư phạm TP. Hồ Chí Minh',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 5290,
    rating: 4.8,
    tags: ['ĐH Sư Phạm TP.HCM', 'Đề chuẩn sư phạm', 'Từ vựng giáo dục', 'B1-B2'],
    description: 'Bộ đề chuẩn đánh giá đầu ra ngoại ngữ cử nhân và cao học của ĐH Sư phạm TP.HCM. Cấu trúc câu hỏi rõ ràng, bám sát các tình huống giáo dục và công sở thực tế.',
    listening: {
      part1: getListening('l9'),
      part2: getListening('l10'),
      part3: getListening('l7'),
    },
    reading: {
      passages: [
        getPassage('r12'), // Decision Fatigue (B2)
        getPassage('r13'), // Gutenberg Press (C1)
        getPassage('r4'),  // Hong Kong (B1)
        getPassage('r5'),  // Constellations (B2)
      ]
    },
    writing: {
      task1: getWriting('w3'), // Hotel complaint
      task2: getWriting('w4'), // Online education vs traditional
    },
    speaking: {
      part1: getSpeaking('s1'),
      part2: getSpeaking('s7'),
      part3: getSpeaking('s8'),
    }
  },

  // ── ĐỀ 04: ĐỀ HỌC THUẬT B2-C1 CHUYÊN SÂU ─────────────────────────────────────────
  {
    id: 'vstep-acad-04',
    code: 'DT-ACAD-C1-04',
    title: 'Đề Thi VSTEP B2-C1 Học Thuật Chuyên Sâu (Academic Master Exam)',
    level: 'C1',
    targetBand: 'C1 Cao cấp (8.5 - 10.0)',
    source: 'Hội đồng Khảo thí & Đánh giá Ngôn ngữ Quốc tế',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 4150,
    rating: 4.9,
    tags: ['C1 Mastery', 'Học thuật cao cấp', 'Viết luận phản biện', 'Thuyết trình Part 3'],
    description: 'Bộ đề độ khó cao dành cho ứng viên thi tuyển cao học, giảng viên và chuyên viên cần chứng chỉ C1 VSTEP. Đòi hỏi vốn từ vựng học thuật phong phú và tư duy phản biện sâu sắc.',
    listening: {
      part1: getListening('l9'),
      part2: getListening('l10'),
      part3: getListening('l11'),
    },
    reading: {
      passages: [
        getPassage('r8'),  // Sleep Architecture (B2-C1)
        getPassage('r9'),  // Urban Heat Islands (C1)
        getPassage('r11'), // Bioluminescence (B2-C1)
        getPassage('r12'), // Decision Fatigue (B2-C1)
      ]
    },
    writing: {
      task1: getWriting('w5'), // Keynote invitation
      task2: getWriting('w8'), // Fast fashion essay
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s7'),
      part3: getSpeaking('s10'),
    }
  },

  // ── ĐỀ 05: B1 CẤP TỐC & TRỌNG TÂM ────────────────────────────────────────────────
  {
    id: 'vstep-fast-05',
    code: 'DT-FAST-B1-05',
    title: 'Đề Thi Thử VSTEP B1 Tốc Độ Cao & Trọng Tâm (B1 Fast-track Exam)',
    level: 'B1',
    targetBand: 'B1 Đạt chuẩn đầu ra (4.0 - 5.5)',
    source: 'Trung tâm Luyện thi VSTEP Master',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 7120,
    rating: 4.8,
    tags: ['B1 Cấp tốc', 'Trọng tâm đạt chuẩn', 'Dễ ghi điểm', 'Phù hợp người mới'],
    description: 'Bộ đề tối ưu cho học viên cần bằng B1 gấp để tốt nghiệp hoặc thi công chức. Tỷ lệ câu hỏi nhận biết và thông hiểu cao, hướng dẫn chi tiết phương pháp làm bài.',
    listening: {
      part1: getListening('l1'),
      part2: getListening('l2'),
      part3: getListening('l4'),
    },
    reading: {
      passages: [
        getPassage('r6'),  // Coffee Origin (B1)
        getPassage('r7'),  // Great Barrier Reef (B2)
        getPassage('r10'), // The Silk Road (B1)
        getPassage('r13'), // Gutenberg Press (C1)
      ]
    },
    writing: {
      task1: getWriting('w1'), // Leave request
      task2: getWriting('w2'), // Social media
    },
    speaking: {
      part1: getSpeaking('s1'),
      part2: getSpeaking('s2'),
      part3: getSpeaking('s3'),
    }
  },

  // ── ĐỀ 06: ĐH NGOẠI NGỮ - ĐẠI HỌC HUẾ (HUCFL OFFICIAL MOCK) ──────────────────────
  {
    id: 'vstep-hue-06',
    code: 'DT-HUCFL-2026-06',
    title: 'Đề Thi Chuẩn VSTEP ĐH Ngoại ngữ - Đại học Huế (HUCFL Official Mock)',
    level: 'B2',
    targetBand: 'B2 Đạt chuẩn Giảng viên & Chuyên viên',
    source: 'Trường ĐH Ngoại ngữ - Đại học Huế',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 3940,
    rating: 4.9,
    tags: ['ĐH Huế - HUCFL', 'Đề chuẩn miền Trung', 'B2 Trọng tâm', 'Đề chính thức'],
    description: 'Bộ đề khảo thí chính thức của Trường Đại học Ngoại ngữ - Đại học Huế. Cấu trúc đề thi bám sát ngân hàng đề thi quốc gia, có độ phân hóa cao ở kỹ năng Đọc hiểu văn bản và Viết thư phản ánh dịch vụ.',
    listening: {
      part1: getListening('l9'),
      part2: getListening('l10'),
      part3: getListening('l11'),
    },
    reading: {
      passages: [
        getPassage('r7'),  // Great Barrier Reef & Bleaching (B2)
        getPassage('r4'),  // Hong Kong (B1)
        getPassage('r9'),  // Urban Heat Islands (C1)
        getPassage('r12'), // Decision Fatigue (B2-C1)
      ]
    },
    writing: {
      task1: getWriting('w7'), // Tour complaint letter
      task2: getWriting('w8'), // Fast fashion essay
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s7'),
      part3: getSpeaking('s8'),
    }
  },

  // ── ĐỀ 07: ĐH NGOẠI NGỮ - ĐẠI HỌC ĐÀ NẴNG (UFL STANDARD TEST) ────────────────────
  {
    id: 'vstep-danang-07',
    code: 'DT-UFL-2026-07',
    title: 'Đề Khảo Sát Năng Lực VSTEP ĐH Ngoại ngữ - ĐH Đà Nẵng (UFL Standard Test)',
    level: 'B1-B2-C1',
    targetBand: 'B1 - B2 Chuẩn Khảo thí Đà Nẵng',
    source: 'Trường ĐH Ngoại ngữ - Đại học Đà Nẵng',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 4620,
    rating: 4.8,
    tags: ['UFL Đà Nẵng', 'Khảo thí miền Trung', 'Nghe chuẩn giọng đọc', 'B1-B2-C1'],
    description: 'Bộ đề thi do Trung tâm Khảo thí ĐH Ngoại ngữ - ĐH Đà Nẵng thiết kế, kiểm tra toàn diện 4 kỹ năng ngôn ngữ với các chủ đề đa dạng từ khoa học vũ trụ, lịch sử giao thương đến bảo tồn di sản.',
    listening: {
      part1: getListening('l1'),
      part2: getListening('l3'),
      part3: getListening('l11'),
    },
    reading: {
      passages: [
        getPassage('r5'),  // Constellations (B2)
        getPassage('r8'),  // Sleep Architecture (B2)
        getPassage('r10'), // The Silk Road (B1-B2)
        getPassage('r13'), // Gutenberg Press (C1)
      ]
    },
    writing: {
      task1: getWriting('w5'), // Keynote invitation
      task2: getWriting('w6'), // Remote work essay
    },
    speaking: {
      part1: getSpeaking('s1'),
      part2: getSpeaking('s9'),
      part3: getSpeaking('s10'),
    }
  },

  // ── ĐỀ 08: ĐH HÀ NỘI (HANU ADVANCED MOCK) ─────────────────────────────────────────
  {
    id: 'vstep-hanu-08',
    code: 'DT-HANU-B2C1-08',
    title: 'Đề Thi Đánh Giá Năng Lực Tiếng Anh VSTEP ĐH Hà Nội (HANU Advanced Mock)',
    level: 'C1',
    targetBand: 'B2 - C1 Thành thạo & Dịch thuật',
    source: 'Trường Đại học Hà Nội (HANU)',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 3580,
    rating: 4.9,
    tags: ['HANU Hà Nội', 'Học thuật C1', 'Độ phân hóa cao', 'Đề Chuyên sâu'],
    description: 'Bộ đề luyện thi cao cấp chuẩn HANU chú trọng ngữ liệu học thuật chất lượng cao: sinh học đại dương sâu, đảo nhiệt đô thị, tâm lý học quyết định, viết thư học thuật và phát triển chủ đề di sản.',
    listening: {
      part1: getListening('l9'),
      part2: getListening('l10'),
      part3: getListening('l7'),
    },
    reading: {
      passages: [
        getPassage('r6'),  // Coffee Origin (B1)
        getPassage('r9'),  // Urban Heat Islands (C1)
        getPassage('r11'), // Bioluminescence (B2-C1)
        getPassage('r12'), // Decision Fatigue (B2-C1)
      ]
    },
    writing: {
      task1: getWriting('w5'), // Keynote invitation
      task2: getWriting('w8'), // Fast fashion essay
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s7'),
      part3: getSpeaking('s10'),
    }
  },

  // ── ĐỀ 09: ĐH SƯ PHẠM HÀ NỘI (HNUE OFFICIAL TEST) ─────────────────────────────────
  {
    id: 'vstep-hnue-09',
    code: 'DT-HNUE-2026-09',
    title: 'Bộ Đề Chuẩn Khảo Thí VSTEP ĐH Sư phạm Hà Nội (HNUE Official Test)',
    level: 'B1-B2-C1',
    targetBand: 'B1 - B2 Chuẩn Sư phạm & Tốt nghiệp',
    source: 'Trường ĐH Sư phạm Hà Nội',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 4890,
    rating: 4.8,
    tags: ['ĐH Sư Phạm Hà Nội', 'Chuẩn giáo viên tiếng Anh', 'Nghe rõ ràng', 'B1-B2'],
    description: 'Đề thi khảo thí năng lực VSTEP của ĐH Sư phạm Hà Nội. Bài đọc phong phú về lịch sử, y tế, trí nhớ và tuyến đường tơ lụa. Bài viết phân tích các mô hình làm việc hiện đại và thảo luận giáo dục.',
    listening: {
      part1: getListening('l8'),
      part2: getListening('l6'),
      part3: getListening('l4'),
    },
    reading: {
      passages: [
        getPassage('r4'),  // Hong Kong (B1)
        getPassage('r6'),  // Coffee Origin (B1)
        getPassage('r8'),  // Sleep Architecture (B2)
        getPassage('r10'), // The Silk Road (B1-B2)
      ]
    },
    writing: {
      task1: getWriting('w7'), // Tour complaint
      task2: getWriting('w6'), // Remote work essay
    },
    speaking: {
      part1: getSpeaking('s1'),
      part2: getSpeaking('s2'),
      part3: getSpeaking('s8'),
    }
  },

  // ── ĐỀ 10: TUYỂN CHỌN 10 BỘ ĐỀ NXB ĐHQGHN (VNU MASTER TEST 10) ────────────────────
  {
    id: 'vstep-vnu-10',
    code: 'DT-VNU-MASTER-10',
    title: 'Đề Tuyển Chọn Tinh Hoa VSTEP 10 Bộ Đề NXB ĐHQGHN (VNU Master Test 10)',
    level: 'B1-B2-C1',
    targetBand: 'Tổng hợp Toàn diện B1 - C1',
    source: 'NXB Đại học Quốc gia Hà Nội',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 9150,
    rating: 5.0,
    tags: ['NXB ĐHQGHN', '10 Bộ đề tinh hoa', 'Bán chạy nhất', 'Chuẩn 100%'],
    description: 'Đề thi tổng hợp tinh tuyển từ bộ sách "10 Bộ Đề Thi Chuẩn VSTEP B1-B2-C1" phát hành bởi NXB Đại học Quốc gia Hà Nội. Đề thi có độ chuẩn xác và phủ rộng tuyệt đối theo ma trận đề thi quốc gia.',
    listening: {
      part1: getListening('l9'),
      part2: getListening('l10'),
      part3: getListening('l11'),
    },
    reading: {
      passages: [
        getPassage('r7'),  // Great Barrier Reef (B2)
        getPassage('r9'),  // Urban Heat Islands (C1)
        getPassage('r11'), // Bioluminescence (B2-C1)
        getPassage('r13'), // Gutenberg Press (C1)
      ]
    },
    writing: {
      task1: getWriting('w5'), // Keynote invitation
      task2: getWriting('w8'), // Fast fashion essay
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s9'),
      part3: getSpeaking('s10'),
    }
  },
  // ── ĐỀ 11: ĐH CẦN THƠ (CTU MEKONG DELTA OFFICIAL TEST) ──────────────────────────
  {
    id: 'vstep-ctu-11',
    code: 'DT-CTU-2026-11',
    title: 'Đề Thi Chuẩn VSTEP ĐH Cần Thơ (CTU Mekong Delta Official Test)',
    level: 'B1-B2-C1',
    targetBand: 'B1 - B2 Chuẩn Đồng Bằng Sông Cửu Long',
    source: 'Trường Đại học Cần Thơ (CTU)',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 5240,
    rating: 4.8,
    tags: ['ĐH Cần Thơ', 'Đề chuẩn miền Tây', 'B1-B2 Trọng điểm', 'Đề chính thức'],
    description: 'Bộ đề thi chuẩn VSTEP do Trung tâm Khảo thí ĐH Cần Thơ biên soạn. Ngữ liệu thực tế bám sát các chủ đề phát triển bền vững, du lịch sinh thái sông nước và chuyển đổi số.',
    listening: {
      part1: getListening('l12'),
      part2: getListening('l13'),
      part3: getListening('l14'),
    },
    reading: {
      passages: [
        getPassage('r14'), // Ecotourism in Southeast Asia (B1)
        getPassage('r15'), // Renewable Energy & Smart Grids (B2)
        getPassage('r6'),  // Coffee Origin & Spread (B1-B2)
        getPassage('r7'),  // Great Barrier Reef (B2)
      ]
    },
    writing: {
      task1: getWriting('w9'),  // Complaint conference equipment
      task2: getWriting('w10'), // Smartphone ban essay
    },
    speaking: {
      part1: getSpeaking('s11'), // Public transport
      part2: getSpeaking('s12'), // Farewell gift
      part3: getSpeaking('s13'), // Remote work
    }
  },

  // ── ĐỀ 12: HỌC VIỆN AN NINH NHÂN DÂN (T31 POLICE ACADEMY EXAM) ────────────────
  {
    id: 'vstep-t31-12',
    code: 'DT-ANND-2026-12',
    title: `Đề Khảo Sát Năng Lực VSTEP Học Viện An Ninh Nhân Dân (People's Police Academy Exam)`,
    level: 'C1',
    targetBand: 'B2 - C1 Sĩ quan, Cán bộ & Cao học',
    source: 'Học viện An ninh Nhân dân (T31)',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 4680,
    rating: 4.9,
    tags: ['Học Viện An Ninh', 'Độ chuẩn xác cao', 'Học thuật B2-C1', 'Đề chọn lọc'],
    description: 'Bộ đề thi thử tuyển chọn chuẩn hóa năng lực tiếng Anh cán bộ và học viên Học viện An ninh Nhân dân. Chú trọng vào tư duy lập luận pháp lý, công nghệ thông tin và bản quyền số.',
    listening: {
      part1: getListening('l9'),
      part2: getListening('l10'),
      part3: getListening('l15'), // Solid-state battery
    },
    reading: {
      passages: [
        getPassage('r15'), // Renewable Energy & Smart Grids (B2)
        getPassage('r16'), // Neuroplasticity (B2-C1)
        getPassage('r17'), // AI & Copyright (C1)
        getPassage('r11'), // Bioluminescence (B2-C1)
      ]
    },
    writing: {
      task1: getWriting('w11'), // Advisory travel letter
      task2: getWriting('w12'), // Ocean plastic crisis essay
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s14'), // Campus eco-campaign
      part3: getSpeaking('s10'),
    }
  },

  // ── ĐỀ 13: ĐH THÁI NGUYÊN (TNU NORTHERN REGIONAL EXAM) ──────────────────────────
  {
    id: 'vstep-tnus-13',
    code: 'DT-TNUS-2026-13',
    title: 'Đề Thi Chuẩn VSTEP ĐH Thái Nguyên (TNU Northern Regional Exam)',
    level: 'B1-B2-C1',
    targetBand: 'B1 - B2 Chuẩn Khu vực Trung Du & Miền Núi Phía Bắc',
    source: 'Đại học Thái Nguyên (TNU)',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 6150,
    rating: 4.8,
    tags: ['ĐH Thái Nguyên', 'Chuẩn vùng phía Bắc', 'B1-B2 Dễ tiếp cận', 'Đề chính thức'],
    description: 'Bộ đề khảo thí năng lực tiếng Anh bậc 3-5 Đại học Thái Nguyên. Phù hợp cho sinh viên thi chuẩn đầu ra và giáo viên phổ thông chuẩn hóa ngạch chức danh nghề nghiệp.',
    listening: {
      part1: getListening('l8'),
      part2: getListening('l2'),
      part3: getListening('l14'), // AI in healthcare
    },
    reading: {
      passages: [
        getPassage('r14'), // Ecotourism in Southeast Asia (B1)
        getPassage('r4'),  // Hong Kong (B1)
        getPassage('r5'),  // Constellations (B2)
        getPassage('r15'), // Renewable Energy & Microgrids (B2)
      ]
    },
    writing: {
      task1: getWriting('w1'),
      task2: getWriting('w4'),
    },
    speaking: {
      part1: getSpeaking('s1'),
      part2: getSpeaking('s2'),
      part3: getSpeaking('s13'),
    }
  },

  // ── ĐỀ 14: ĐH BÁCH KHOA HÀ NỘI (HUST TECHNICAL & ACADEMIC MOCK) ─────────────────
  {
    id: 'vstep-hust-14',
    code: 'DT-HUST-2026-14',
    title: 'Đề Đánh Giá Năng Lực Tiếng Anh Kỹ Thuật ĐH Bách Khoa Hà Nội (HUST Technical & Academic Mock)',
    level: 'C1',
    targetBand: 'B2 - C1 Kỹ sư Quốc tế & Thạc sĩ',
    source: 'Đại học Bách Khoa Hà Nội (HUST)',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 7890,
    rating: 4.9,
    tags: ['ĐH Bách Khoa HN', 'Kỹ thuật công nghệ', 'Học thuật B2-C1', 'Đề Hot'],
    description: 'Bộ đề thi chuẩn phân hóa cao được biên soạn cho kỹ sư chất lượng cao và cao học Bách Khoa. Chủ đề khoa học kỹ thuật, pin năng lượng, trí tuệ nhân tạo và dẻo dai thần kinh.',
    listening: {
      part1: getListening('l12'),
      part2: getListening('l3'),
      part3: getListening('l15'), // Solid-state battery
    },
    reading: {
      passages: [
        getPassage('r15'), // Renewable Energy & Grids (B2)
        getPassage('r8'),  // Sleep Architecture & Memory (B2)
        getPassage('r16'), // Neuroplasticity (B2-C1)
        getPassage('r17'), // AI & Copyright (C1)
      ]
    },
    writing: {
      task1: getWriting('w5'),
      task2: getWriting('w10'), // Smartphone ban
    },
    speaking: {
      part1: getSpeaking('s6'),
      part2: getSpeaking('s12'), // Farewell gift
      part3: getSpeaking('s5'),
    }
  },

  // ── ĐỀ 15: ĐH KINH TẾ TP.HCM (UEH BUSINESS & ECONOMIC ENGLISH EXAM) ──────────────
  {
    id: 'vstep-ueh-15',
    code: 'DT-UEH-2026-15',
    title: 'Bộ Đề Chuẩn VSTEP ĐH Kinh Tế TP.HCM (UEH Business & Economic English Exam)',
    level: 'B1-B2-C1',
    targetBand: 'Tổng hợp Toàn diện B1 - C1 Kinh tế & Quản trị',
    source: 'Đại học Kinh tế TP. Hồ Chí Minh (UEH)',
    durationMinutes: 180,
    totalQuestions: 80,
    participantsCount: 8940,
    rating: 5.0,
    tags: ['ĐH Kinh Tế TP.HCM', 'Kinh tế & Quản trị', 'Đề bán chạy', 'B1-B2-C1'],
    description: 'Đề thi VSTEP chuyên sâu bám sát ngữ cảnh thương mại, kinh tế số và quản trị tổ chức của UEH. Bài đọc phong phú về mệt mỏi quyết định, du lịch sinh thái, thần kinh học và quyền sở hữu trí tuệ.',
    listening: {
      part1: getListening('l12'),
      part2: getListening('l13'), // Academic conversation
      part3: getListening('l7'),
    },
    reading: {
      passages: [
        getPassage('r12'), // Decision Fatigue (B2)
        getPassage('r14'), // Ecotourism in SE Asia (B1)
        getPassage('r16'), // Neuroplasticity (B2-C1)
        getPassage('r17'), // AI & Copyright Law (C1)
      ]
    },
    writing: {
      task1: getWriting('w9'),  // Technical failure complaint
      task2: getWriting('w6'),  // Remote work
    },
    speaking: {
      part1: getSpeaking('s11'), // Public transport
      part2: getSpeaking('s7'),
      part3: getSpeaking('s13'), // Remote work development
    }
  }
];

export function getMockExamBank(): MockExamSet[] {
  try {
    const customJson = localStorage.getItem('vstep_custom_parsed_exams');
    if (customJson) {
      const customList = JSON.parse(customJson);
      if (Array.isArray(customList) && customList.length > 0) {
        const customExamSets: MockExamSet[] = customList.map((c, idx) => ({
          id: c.id || `custom-${idx + 1}`,
          code: c.id || `CUSTOM-${idx + 1}`,
          title: c.name || `Đề bóc tách tự tạo ${idx + 1}`,
          level: 'B2',
          targetBand: 'B2 Linh hoạt',
          source: 'Tự tạo từ Word/PDF bóc tách',
          durationMinutes: 180,
          totalQuestions: c.questions ? c.questions.length : 40,
          participantsCount: 1,
          rating: 5.0,
          tags: ['Tự tạo', 'Word/PDF', 'Custom Exam'],
          description: `Đề thi bóc tách từ tệp ${c.name || 'Word/PDF'} với độ tin cậy bóc tách cao.`,
          listening: initialMockExams[0].listening,
          reading: initialMockExams[0].reading,
          writing: initialMockExams[0].writing,
          speaking: initialMockExams[0].speaking,
        }));
        return [...initialMockExams, ...customExamSets];
      }
    }
  } catch (e) {
    console.error('Error loading custom exams', e);
  }
  return initialMockExams;
}

export function getMockExamById(id: string): MockExamSet {
  const bank = getMockExamBank();
  return bank.find(e => e.id === id) || bank[0];
}
