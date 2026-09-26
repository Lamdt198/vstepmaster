using System.Collections.Generic;

namespace VstepBackend.DTOs
{
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class SubmissionRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string ExamId { get; set; } = string.Empty;
        public Dictionary<string, string> Answers { get; set; } = new();
        public string? WritingTask1 { get; set; }
        public string? WritingTask2 { get; set; }
        public string? SpeakingTranscript { get; set; }
    }

    public class SubmissionResponse
    {
        public string SubmissionId { get; set; } = string.Empty;
        public double ObjectiveScore { get; set; }
        public double AiScore { get; set; }
        public double FinalScore { get; set; }
        public string CefrBand { get; set; } = "B2";
        public string Feedback { get; set; } = string.Empty;
    }

    public class SpeakingAnalysisRequest
    {
        public string Transcript { get; set; } = string.Empty;
        public string TopicPrompt { get; set; } = string.Empty;
    }

    public class SpeechErrorDto
    {
        public string Id { get; set; } = string.Empty;
        public string Original { get; set; } = string.Empty;
        public string Correction { get; set; } = string.Empty;
        public string Type { get; set; } = "grammar"; // grammar, vocabulary, pronunciation
        public string Explanation { get; set; } = string.Empty;
    }

    public class SpeakingAnalysisResponse
    {
        public string Transcript { get; set; } = string.Empty;
        public string VietnameseTranslation { get; set; } = string.Empty;
        public string C1PolishedVersion { get; set; } = string.Empty;
        public List<SpeechErrorDto> Errors { get; set; } = new();
        public double OverallScore { get; set; }
        public string CefrLevel { get; set; } = "B2";
        public double FluencyScore { get; set; }
        public double GrammarScore { get; set; }
        public double LexicalScore { get; set; }
        public double PronunciationScore { get; set; }
        public string Feedback { get; set; } = string.Empty;
        public List<string> Suggestions { get; set; } = new();
    }

    public class EssayEvaluationRequest
    {
        public string Prompt { get; set; } = string.Empty;
        public string Essay { get; set; } = string.Empty;
        public string TaskType { get; set; } = "TASK2";
    }

    public class EssayEvaluationResponse
    {
        public double OverallScore { get; set; }
        public string CefrBand { get; set; } = "B2";
        public double TaskScore { get; set; }
        public double CoherenceScore { get; set; }
        public double LexicalScore { get; set; }
        public double GrammarScore { get; set; }
        public string Feedback { get; set; } = string.Empty;
        public string ImprovedSample { get; set; } = string.Empty;
    }

    public class SaveVocabRequest
    {
        public string Word { get; set; } = string.Empty;
        public string? Phonetic { get; set; }
        public string? CefrLevel { get; set; } = "B2";
        public string? DefinitionVi { get; set; }
        public string? ExampleEn { get; set; }
        public string? Topic { get; set; } = "Academic VSTEP";
    }
}
