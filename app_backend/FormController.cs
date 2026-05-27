using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using appbackend.Models;

namespace appbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase
    {
        // Set our file path to generate in the root of the project. Will show up as a singular Json file.
        private readonly string _filePath = "submissions.json";

        // Using post method to receive data from the Angular frontend and save it to a JSON file.
        [HttpPost]
        public IActionResult Submit([FromBody] FormSubObj submission)
        {
            // Load the existing submissions from file (if it exists)
            List<FormSubObj> submissions = new List<FormSubObj>();

            //If there is an existing file, read it and deserialize the JSON data into a list of FormSubObj
            if (System.IO.File.Exists(_filePath))
            {
                var existing = System.IO.File.ReadAllText(_filePath);
                submissions = JsonSerializer.Deserialize<List<FormSubObj>>(existing) 
                                                                    ?? new List<FormSubObj>();
            }

            // Add our new submission
            submission.Id = submissions.Count + 1; // Simple ID generation based on count. Will be used for sorting later on.
            submissions.Add(submission);

            //Save the updated list back to the file as JSON
            var json = JsonSerializer.Serialize(submissions, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            System.IO.File.WriteAllText(_filePath, json);

            return Ok(new { message = "Submission received and saved." });
        }
    }
}