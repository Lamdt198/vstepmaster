using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using VstepBackend.DTOs;

namespace VstepBackend.Services
{
    public interface IAiService
    {
        SpeakingAnalysisResponse AnalyzeSpeaking(SpeakingAnalysisRequest request);
        EssayEvaluationResponse EvaluateEssay(EssayEvaluationRequest request);
    }

    public class VstepAiService : IAiService
    {
        public SpeakingAnalysisResponse AnalyzeSpeaking(SpeakingAnalysisRequest request)
        {
            var text = request.Transcript?.Trim() ?? string.Empty;
            if (string.IsNullOrEmpty(text))
            {
                return new SpeakingAnalysisResponse
                {
                    Transcript = string.Empty,
                    Feedback = "Vui lòng cung cấp văn bản bài nói để phân tích."
                };
            }

            var errors = new List<SpeechErrorDto>();

            // Rule 1: she/he don't -> doesn't
            if (Regex.IsMatch(text, @"\b(she|he|it)\s+(don't)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "don't",
                    Correction = "doesn't",
                    Type = "grammar",
                    Explanation = "Chủ ngữ ngôi thứ 3 số ít (he/she/it) phải đi với trợ động từ 'doesn't', không dùng 'don't'."
                });
            }

            // Rule 2: discuss about -> discuss
            if (Regex.IsMatch(text, @"\b(discuss\s+about)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "discuss about",
                    Correction = "discuss",
                    Type = "grammar",
                    Explanation = "Động từ 'discuss' là ngoại động từ trực tiếp, không đi kèm giới từ 'about'."
                });
            }

            // Rule 3: yesterday I go -> went
            if (Regex.IsMatch(text, @"\b(yesterday|last\s+\w+)\b[^.?!]*?\b(I|we|they|he|she)\s+(go)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "go",
                    Correction = "went",
                    Type = "grammar",
                    Explanation = "Có trạng từ thời gian quá khứ, động từ cần chia ở thì Quá khứ đơn (went)."
                });
            }

            // Rule 4: informations -> information
            if (Regex.IsMatch(text, @"\b(informations)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "informations",
                    Correction = "information",
                    Type = "grammar",
                    Explanation = "Danh từ 'information' là danh từ không đếm được, không thêm 's'."
                });
            }

            // Rule 5: do a mistake -> make a mistake
            if (Regex.IsMatch(text, @"\b(do\s+a\s+mistake)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "do a mistake",
                    Correction = "make a mistake",
                    Type = "vocabulary",
                    Explanation = "Collocation chuẩn là 'make a mistake', không dùng động từ 'do'."
                });
            }

            // Rule 6: comfortable pronunciation
            if (Regex.IsMatch(text, @"\b(comfortable)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "comfortable",
                    Correction = "/ˈkʌmftəbl/",
                    Type = "pronunciation",
                    Explanation = "Từ này chỉ có 3 âm tiết /ˈkʌmftəbl/. Chú ý không đọc thành 4 âm tiết."
                });
            }

            // Rule 7: environment pronunciation
            if (Regex.IsMatch(text, @"\b(environment)\b", RegexOptions.IgnoreCase))
            {
                errors.Add(new SpeechErrorDto
                {
                    Id = Guid.NewGuid().ToString(),
                    Original = "environment",
                    Correction = "/ɪnˈvaɪrənmənt/",
                    Type = "pronunciation",
                    Explanation = "Trọng âm rơi vào âm tiết thứ hai. Phát âm rõ âm đuôi /nt/."
                });
            }

            int wordCount = text.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
            double score = errors.Count == 0 ? 7.5 : Math.Max(4.5, 7.5 - errors.Count * 0.4);
            string cefr = score >= 8.5 ? "C1 (Bậc 5)" : score >= 6.0 ? "B2 (Bậc 4)" : "B1 (Bậc 3)";

            return new SpeakingAnalysisResponse
            {
                Transcript = text,
                VietnameseTranslation = $"Bản dịch nghĩa: Ý kiến trình bày đã thể hiện được nội dung cơ bản của bài nói.",
                C1PolishedVersion = $"Speaking from an academic standpoint, {text}. Furthermore, empirical evidence demonstrates that maintaining such consistency yields long-term cognitive and practical benefits.",
                Errors = errors,
                OverallScore = Math.Round(score, 1),
                CefrLevel = cefr,
                FluencyScore = Math.Round(Math.Min(9.0, 6.0 + wordCount / 40.0), 1),
                GrammarScore = Math.Round(Math.Max(4.0, 7.5 - errors.Count * 0.5), 1),
                LexicalScore = Math.Round(Math.Max(4.5, 7.0 - errors.Count * 0.3), 1),
                PronunciationScore = 7.0,
                Feedback = errors.Count == 0 
                    ? "Bài nói diễn đạt trôi chảy, đúng trọng tâm và không phát hiện lỗi cơ bản."
                    : $"Đã phát hiện {errors.Count} điểm cần lưu ý về Ngữ pháp, Từ vựng hoặc Phát âm.",
                Suggestions = new List<string>
                {
                    "Sử dụng thêm các liên từ chỉ sự tương phản (However, In contrast).",
                    "Nâng cao độ chính xác thì quá khứ và sự hòa hợp chủ - vị."
                }
            };
        }

        public EssayEvaluationResponse EvaluateEssay(EssayEvaluationRequest request)
        {
            int words = request.Essay?.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length ?? 0;
            double score = words >= 250 ? 7.5 : words >= 150 ? 6.5 : 5.0;
            string band = score >= 8.5 ? "C1" : score >= 6.0 ? "B2" : "B1";

            return new EssayEvaluationResponse
            {
                OverallScore = score,
                CefrBand = band,
                TaskScore = score,
                CoherenceScore = score + 0.2,
                LexicalScore = score,
                GrammarScore = score - 0.2,
                Feedback = $"Bài viết đạt yêu cầu độ dài ({words} từ). Lập luận rõ ràng, cấu trúc đoạn mạch lạc chuẩn VSTEP {band}.",
                ImprovedSample = $"Regarding the prompt: Candidates are encouraged to synthesize theoretical frameworks with empirical illustrations."
            };
        }
    }
}
