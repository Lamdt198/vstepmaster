using System;
using System.Linq;
using VstepBackend.Models;

namespace VstepBackend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // 1. Roles
            if (!context.Roles.Any())
            {
                context.Roles.AddRange(
                    new Role { RoleId = "ROLE_ADMIN", RoleName = "Quản trị viên", Description = "Toàn quyền điều hành hệ thống VSTEP" },
                    new Role { RoleId = "ROLE_STUDENT", RoleName = "Học viên", Description = "Luyện thi và tham gia khảo thí năng lực VSTEP" }
                );
                context.SaveChanges();
            }

            // 2. Users (Admin: admin/123, Student: student/123)
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {
                        UserId = "user-admin-01",
                        Username = "admin",
                        PasswordHash = "123", // In production hash with BCrypt
                        FullName = "Quản trị viên SuperAdmin",
                        Email = "admin@vstepmaster.edu.vn",
                        RoleId = "ROLE_ADMIN",
                        IsActive = true
                    },
                    new User
                    {
                        UserId = "user-student-01",
                        Username = "student",
                        PasswordHash = "123",
                        FullName = "Nguyễn Văn An",
                        Email = "student@vstepmaster.edu.vn",
                        RoleId = "ROLE_STUDENT",
                        IsActive = true
                    },
                    new User
                    {
                        UserId = "user-hocvien-02",
                        Username = "hocvien",
                        PasswordHash = "123",
                        FullName = "Trần Thị Mai (Học viên VIP)",
                        Email = "hocvien.vip@vstepmaster.edu.vn",
                        RoleId = "ROLE_STUDENT",
                        IsActive = true
                    }
                );
                context.SaveChanges();
            }

            // 3. Exams
            if (!context.Exams.Any())
            {
                var exam1 = new Exam
                {
                    ExamId = "vstep-moet-01",
                    Code = "DT-MOET-2026-01",
                    Title = "Đề thi Chuẩn VSTEP 4 Kỹ năng (Bộ GD&ĐT - Đề Tổng hợp 2026)",
                    Level = "all",
                    TargetBand = "B1 - C1 Chuẩn Quốc gia",
                    Source = "Bộ Giáo dục & Đào tạo",
                    Description = "Bộ đề thi thử tiêu chuẩn quốc gia bám sát định dạng VSTEP 3-5 của Bộ GD&ĐT. Bao gồm 3 phần nghe, 4 bài đọc hiểu học thuật, 2 phần viết luận và 3 phần nói phỏng vấn.",
                    Rating = 4.9,
                    ParticipantsCount = 3820,
                    DurationMinutes = 180,
                    Tags = "Bộ GD&ĐT,Chuẩn VSTEP,Đầy đủ 4 kỹ năng"
                };

                var exam2 = new Exam
                {
                    ExamId = "vstep-ulis-02",
                    Code = "DT-ULIS-B2-02",
                    Title = "Đề Thi Thử VSTEP Chuyên Sâu ĐH Ngoại ngữ - ĐHQGHN (ULIS Test 02)",
                    Level = "B2",
                    TargetBand = "Mục tiêu B2 Vững vàng (6.0 - 8.0)",
                    Source = "Trường ĐH Ngoại ngữ - ĐHQGHN",
                    Description = "Bộ đề khảo sát năng lực tiếng Anh biên soạn bởi các chuyên gia khảo thí ULIS, chú trọng vào kỹ năng Đọc hiểu suy luận và Viết luận giải pháp xã hội Task 2.",
                    Rating = 4.8,
                    ParticipantsCount = 2450,
                    DurationMinutes = 180,
                    Tags = "ULIS ĐHQGHN,B2 Trọng điểm,Nghe hội thoại dài"
                };

                var exam3 = new Exam
                {
                    ExamId = "vstep-hcmue-03",
                    Code = "DT-HCMUE-2026-03",
                    Title = "Bộ đề Khảo sát Năng lực VSTEP ĐH Sư Phạm TP.HCM (HCMUE Official Mock)",
                    Level = "B2",
                    TargetBand = "B1 - B2 Chuẩn Đầu ra & Thạc sĩ",
                    Source = "Trường ĐH Sư phạm TP. Hồ Chí Minh",
                    Description = "Bộ đề chuẩn đánh giá đầu ra ngoại ngữ cử nhân và cao học của ĐH Sư phạm TP.HCM. Cấu trúc câu hỏi bám sát thực tế, phần Nghe Part 2 và Đọc hiểu chủ đề Giáo dục.",
                    Rating = 4.7,
                    ParticipantsCount = 1890,
                    DurationMinutes = 180,
                    Tags = "ĐH Sư Phạm TP.HCM,Đề chuẩn sư phạm,Từ vựng giáo dục"
                };

                
                var exam4 = new Exam
                {
                    ExamId = "vstep-acad-04",
                    Code = "DT-ACAD-C1-04",
                    Title = "Đề Thi VSTEP B2-C1 Học Thuật Chuyên Sâu (Academic Master Exam)",
                    Level = "C1",
                    TargetBand = "C1 Cao cấp (8.5 - 10.0)",
                    Source = "Hội đồng Khảo thí & Đánh giá Ngôn ngữ Quốc tế",
                    Description = "Bộ đề độ khó cao dành cho ứng viên thi tuyển cao học, giảng viên và chuyên viên cần chứng chỉ C1 VSTEP. Ngữ liệu chuyên khảo: Cấu trúc giấc ngủ, Đảo nhiệt đô thị, Sinh học phát quang.",
                    Rating = 4.9,
                    ParticipantsCount = 4150,
                    DurationMinutes = 180,
                    Tags = "C1 Mastery,Học thuật cao cấp,Viết luận phản biện,Thuyết trình Part 3"
                };

                var exam5 = new Exam
                {
                    ExamId = "vstep-fast-05",
                    Code = "DT-FAST-B1-05",
                    Title = "Đề Thi Thử VSTEP B1 Tốc Độ Cao & Trọng Tâm (B1 Fast-track Exam)",
                    Level = "B1",
                    TargetBand = "B1 Đạt chuẩn đầu ra (4.0 - 5.5)",
                    Source = "Trung tâm Luyện thi VSTEP Master",
                    Description = "Bộ đề tối ưu cho học viên cần bằng B1 gấp để tốt nghiệp hoặc thi công chức. Tỷ lệ câu hỏi nhận biết và thông hiểu cao, hướng dẫn chi tiết phương pháp làm bài.",
                    Rating = 4.8,
                    ParticipantsCount = 7120,
                    DurationMinutes = 180,
                    Tags = "B1 Cấp tốc,Trọng tâm đạt chuẩn,Dễ ghi điểm,Phù hợp người mới"
                };

                var exam6 = new Exam
                {
                    ExamId = "vstep-hue-06",
                    Code = "DT-HUCFL-2026-06",
                    Title = "Đề Thi Chuẩn VSTEP ĐH Ngoại ngữ - Đại học Huế (HUCFL Official Mock)",
                    Level = "B2",
                    TargetBand = "B2 Đạt chuẩn Giảng viên & Chuyên viên",
                    Source = "Trường ĐH Ngoại ngữ - Đại học Huế",
                    Description = "Bộ đề khảo thí chính thức của Trường Đại học Ngoại ngữ - Đại học Huế. Cấu trúc đề thi bám sát ngân hàng đề thi quốc gia, có độ phân hóa cao ở kỹ năng Đọc hiểu văn bản và Viết thư.",
                    Rating = 4.9,
                    ParticipantsCount = 3940,
                    DurationMinutes = 180,
                    Tags = "ĐH Huế - HUCFL,Đề chuẩn miền Trung,B2 Trọng tâm,Đề chính thức"
                };

                var exam7 = new Exam
                {
                    ExamId = "vstep-danang-07",
                    Code = "DT-UFL-2026-07",
                    Title = "Đề Khảo Sát Năng Lực VSTEP ĐH Ngoại ngữ - ĐH Đà Nẵng (UFL Standard Test)",
                    Level = "B2",
                    TargetBand = "B1 - B2 Chuẩn Khảo thí Đà Nẵng",
                    Source = "Trường ĐH Ngoại ngữ - Đại học Đà Nẵng",
                    Description = "Bộ đề thi do Trung tâm Khảo thí ĐH Ngoại ngữ - ĐH Đà Nẵng thiết kế, kiểm tra toàn diện 4 kỹ năng ngôn ngữ với các chủ đề đa dạng từ thiên văn học đến bảo tồn di sản.",
                    Rating = 4.8,
                    ParticipantsCount = 4620,
                    DurationMinutes = 180,
                    Tags = "UFL Đà Nẵng,Khảo thí miền Trung,Nghe chuẩn giọng đọc,B1-B2-C1"
                };

                var exam8 = new Exam
                {
                    ExamId = "vstep-hanu-08",
                    Code = "DT-HANU-B2C1-08",
                    Title = "Đề Thi Đánh Giá Năng Lực Tiếng Anh VSTEP ĐH Hà Nội (HANU Advanced Mock)",
                    Level = "C1",
                    TargetBand = "B2 - C1 Thành thạo & Dịch thuật",
                    Source = "Trường Đại học Hà Nội (HANU)",
                    Description = "Bộ đề luyện thi cao cấp chuẩn HANU chú trọng ngữ liệu học thuật chất lượng cao: sinh học đại dương sâu, đảo nhiệt đô thị, tâm lý học quyết định, viết thư học thuật.",
                    Rating = 4.9,
                    ParticipantsCount = 3580,
                    DurationMinutes = 180,
                    Tags = "HANU Hà Nội,Học thuật C1,Độ phân hóa cao,Đề Chuyên sâu"
                };

                var exam9 = new Exam
                {
                    ExamId = "vstep-hnue-09",
                    Code = "DT-HNUE-2026-09",
                    Title = "Bộ Đề Chuẩn Khảo Thí VSTEP ĐH Sư phạm Hà Nội (HNUE Official Test)",
                    Level = "B2",
                    TargetBand = "B1 - B2 Chuẩn Sư phạm & Tốt nghiệp",
                    Source = "Trường ĐH Sư phạm Hà Nội",
                    Description = "Đề thi khảo thí năng lực VSTEP của ĐH Sư phạm Hà Nội. Bài đọc phong phú về lịch sử, y tế, trí nhớ và tuyến đường tơ lụa. Bài viết phân tích các mô hình làm việc hiện đại.",
                    Rating = 4.8,
                    ParticipantsCount = 4890,
                    DurationMinutes = 180,
                    Tags = "ĐH Sư Phạm Hà Nội,Chuẩn giáo viên tiếng Anh,Nghe rõ ràng,B1-B2"
                };

                var exam10 = new Exam
                {
                    ExamId = "vstep-vnu-10",
                    Code = "DT-VNU-MASTER-10",
                    Title = "Đề Tuyển Chọn Tinh Hoa VSTEP 10 Bộ Đề NXB ĐHQGHN (VNU Master Test 10)",
                    Level = "all",
                    TargetBand = "Tổng hợp Toàn diện B1 - C1",
                    Source = "NXB Đại học Quốc gia Hà Nội",
                    Description = "Đề thi tổng hợp tinh tuyển từ bộ sách '10 Bộ Đề Thi Chuẩn VSTEP B1-B2-C1' phát hành bởi NXB Đại học Quốc gia Hà Nội. Độ chuẩn xác và phủ rộng tuyệt đối.",
                    Rating = 5.0,
                    ParticipantsCount = 9150,
                    DurationMinutes = 180,
                    Tags = "NXB ĐHQGHN,10 Bộ đề tinh hoa,Bán chạy nhất,Chuẩn 100%"
                };
                var exam11 = new Exam
                {
                    ExamId = "vstep-ctu-11",
                    Code = "DT-CTU-2026-11",
                    Title = "Đề Thi Chuẩn VSTEP ĐH Cần Thơ (CTU Mekong Delta Official Test)",
                    Level = "all",
                    TargetBand = "B1 - B2 Chuẩn Đồng Bằng Sông Cửu Long",
                    Source = "Trường Đại học Cần Thơ (CTU)",
                    Description = "Bộ đề thi chuẩn VSTEP do Trung tâm Khảo thí ĐH Cần Thơ biên soạn. Ngữ liệu thực tế bám sát các chủ đề phát triển bền vững, du lịch sinh thái sông nước và chuyển đổi số.",
                    Rating = 4.8,
                    ParticipantsCount = 5240,
                    DurationMinutes = 180,
                    Tags = "ĐH Cần Thơ,Đề chuẩn miền Tây,B1-B2 Trọng điểm,Đề chính thức"
                };

                var exam12 = new Exam
                {
                    ExamId = "vstep-t31-12",
                    Code = "DT-ANND-2026-12",
                    Title = "Đề Khảo Sát Năng Lực VSTEP Học Viện An Ninh Nhân Dân (People's Police Academy Exam)",
                    Level = "C1",
                    TargetBand = "B2 - C1 Sĩ quan, Cán bộ & Cao học",
                    Source = "Học viện An ninh Nhân dân (T31)",
                    Description = "Bộ đề thi thử tuyển chọn chuẩn hóa năng lực tiếng Anh cán bộ và học viên Học viện An ninh Nhân dân. Chú trọng vào tư duy lập luận pháp lý, công nghệ thông tin và bản quyền số.",
                    Rating = 4.9,
                    ParticipantsCount = 4680,
                    DurationMinutes = 180,
                    Tags = "Học Viện An Ninh,Độ chuẩn xác cao,Học thuật B2-C1,Đề chọn lọc"
                };

                var exam13 = new Exam
                {
                    ExamId = "vstep-tnus-13",
                    Code = "DT-TNUS-2026-13",
                    Title = "Đề Thi Chuẩn VSTEP ĐH Thái Nguyên (TNU Northern Regional Exam)",
                    Level = "all",
                    TargetBand = "B1 - B2 Chuẩn Khu vực Trung Du & Miền Núi Phía Bắc",
                    Source = "Đại học Thái Nguyên (TNU)",
                    Description = "Bộ đề khảo thí năng lực tiếng Anh bậc 3-5 Đại học Thái Nguyên. Phù hợp cho sinh viên thi chuẩn đầu ra và giáo viên phổ thông chuẩn hóa ngạch chức danh nghề nghiệp.",
                    Rating = 4.8,
                    ParticipantsCount = 6150,
                    DurationMinutes = 180,
                    Tags = "ĐH Thái Nguyên,Chuẩn vùng phía Bắc,B1-B2 Dễ tiếp cận,Đề chính thức"
                };

                var exam14 = new Exam
                {
                    ExamId = "vstep-hust-14",
                    Code = "DT-HUST-2026-14",
                    Title = "Đề Đánh Giá Năng Lực Tiếng Anh Kỹ Thuật ĐH Bách Khoa Hà Nội (HUST Technical & Academic Mock)",
                    Level = "C1",
                    TargetBand = "B2 - C1 Kỹ sư Quốc tế & Thạc sĩ",
                    Source = "Đại học Bách Khoa Hà Nội (HUST)",
                    Description = "Bộ đề thi chuẩn phân hóa cao được biên soạn cho kỹ sư chất lượng cao và cao học Bách Khoa. Chủ đề khoa học kỹ thuật, pin năng lượng, trí tuệ nhân tạo và dẻo dai thần kinh.",
                    Rating = 4.9,
                    ParticipantsCount = 7890,
                    DurationMinutes = 180,
                    Tags = "ĐH Bách Khoa HN,Kỹ thuật công nghệ,Học thuật B2-C1,Đề Hot"
                };

                var exam15 = new Exam
                {
                    ExamId = "vstep-ueh-15",
                    Code = "DT-UEH-2026-15",
                    Title = "Bộ Đề Chuẩn VSTEP ĐH Kinh Tế TP.HCM (UEH Business & Economic English Exam)",
                    Level = "all",
                    TargetBand = "Tổng hợp Toàn diện B1 - C1 Kinh tế & Quản trị",
                    Source = "Đại học Kinh tế TP. Hồ Chí Minh (UEH)",
                    Description = "Đề thi VSTEP chuyên sâu bám sát ngữ cảnh thương mại, kinh tế số và quản trị tổ chức của UEH. Bài đọc phong phú về mệt mỏi quyết định, du lịch sinh thái, thần kinh học và quyền sở hữu trí tuệ.",
                    Rating = 5.0,
                    ParticipantsCount = 8940,
                    DurationMinutes = 180,
                    Tags = "ĐH Kinh Tế TP.HCM,Kinh tế & Quản trị,Đề bán chạy,B1-B2-C1"
                };

                context.Exams.AddRange(exam1, exam2, exam3, exam4, exam5, exam6, exam7, exam8, exam9, exam10, exam11, exam12, exam13, exam14, exam15);
                context.SaveChanges();

                // Seed some sections & sample questions for exam1
                var secListening = new Section
                {
                    SectionId = Guid.NewGuid().ToString(),
                    ExamId = exam1.ExamId,
                    SkillType = "LISTENING",
                    PartNumber = 1,
                    Title = "Part 1: Short Announcements",
                    PassageContent = "You will hear 8 short announcements or instructions.",
                    AudioUrl = "audio/moet-sample-audio.mp3"
                };
                context.Sections.Add(secListening);
                context.SaveChanges();

                var q1 = new Question
                {
                    QuestionId = Guid.NewGuid().ToString(),
                    SectionId = secListening.SectionId,
                    QuestionNumber = 1,
                    Content = "Where is the announcement taking place?",
                    CorrectAnswer = "B",
                    Explanation = "The speaker specifically mentions gate boarding at the international airport."
                };
                context.Questions.Add(q1);
                context.SaveChanges();

                context.QuestionOptions.AddRange(
                    new QuestionOption { OptionId = Guid.NewGuid().ToString(), QuestionId = q1.QuestionId, OptionLabel = "A", OptionText = "At a train station" },
                    new QuestionOption { OptionId = Guid.NewGuid().ToString(), QuestionId = q1.QuestionId, OptionLabel = "B", OptionText = "At an airport terminal" },
                    new QuestionOption { OptionId = Guid.NewGuid().ToString(), QuestionId = q1.QuestionId, OptionLabel = "C", OptionText = "At a bus stop" },
                    new QuestionOption { OptionId = Guid.NewGuid().ToString(), QuestionId = q1.QuestionId, OptionLabel = "D", OptionText = "In a library" }
                );
                context.SaveChanges();
            }

            // 4. Vocabulary
            if (!context.Vocabularies.Any())
            {
                context.Vocabularies.AddRange(
                    new Vocabulary
                    {
                        VocabId = Guid.NewGuid().ToString(),
                        Word = "Comprehensive",
                        Phonetic = "/ˌkɒm.prɪˈhen.sɪv/",
                        CefrLevel = "B2",
                        DefinitionVi = "Toàn diện, bao hàm nhiều khía cạnh",
                        ExampleEn = "The VSTEP exam provides a comprehensive evaluation of all four language skills.",
                        Topic = "Education"
                    },
                    new Vocabulary
                    {
                        VocabId = Guid.NewGuid().ToString(),
                        Word = "Proficiency",
                        Phonetic = "/prəˈfɪʃ.ən.si/",
                        CefrLevel = "C1",
                        DefinitionVi = "Sự thành thạo, năng lực ngôn ngữ điêu luyện",
                        ExampleEn = "Achieving high proficiency in English opens up international academic opportunities.",
                        Topic = "Education"
                    },
                    new Vocabulary
                    {
                        VocabId = Guid.NewGuid().ToString(),
                        Word = "Sustainable",
                        Phonetic = "/səˈsteɪ.nə.bəl/",
                        CefrLevel = "B2",
                        DefinitionVi = "Bền vững, thân thiện với môi trường",
                        ExampleEn = "Modern architecture emphasizes sustainable materials to conserve natural resources.",
                        Topic = "Environment"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
