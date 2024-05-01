using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.CustomErrors
{
    public class CustomError : ActionResult
    {
        public string EMessage { get; }

        public CustomError(string errorMessage)
        {
            EMessage = errorMessage;
        }

        public override Task ExecuteResultAsync(ActionContext context)
        {
            var objectResult = new ObjectResult(new { error = EMessage })
            {
                StatusCode = StatusCodes.Status404NotFound
            };

            return objectResult.ExecuteResultAsync(context);
        }
    }
}
