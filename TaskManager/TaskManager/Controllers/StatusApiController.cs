using Microsoft.AspNetCore.Mvc;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusApiController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetApiStatus()
        {
            return Ok("Healthy");
        }
    }
}
