using Microsoft.AspNetCore.Mvc;
using VstepBackend.DTOs;
using VstepBackend.Services;

namespace VstepBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("evaluate-speaking")]
        public IActionResult EvaluateSpeaking([FromBody] SpeakingAnalysisRequest req)
        {
            var result = _aiService.AnalyzeSpeaking(req);
            return Ok(result);
        }

        [HttpPost("evaluate-essay")]
        public IActionResult EvaluateEssay([FromBody] EssayEvaluationRequest req)
        {
            var result = _aiService.EvaluateEssay(req);
            return Ok(result);
        }
    }
}
